'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _atom = require('atom');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _devlog = require('./devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _base = require('./../constants/base');

var _icons = require('./../constants/icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * A singleton class representing all related operations
 * with the content management.
 */
let Database = class Database {

  /**
   * description
   */
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    (0, _devlog2.default)('database:constructor');
    Database.instance = this;

    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    this.loading = true;
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  destroy() {
    (0, _devlog2.default)('database destroyed');
    this.disposables.dispose();
    Database.instance = null;
  }

  /**
   * description
   * @param {Object} state - serialized content retrieved from Atom
   * @returns {Promise} description
   */
  initialize(state) {
    (0, _devlog2.default)('database:initialize', 'localPath', atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`));
    (0, _devlog2.default)('database:initialize', 'database_file', _base.DATABASE_FILE);

    if (state) {
      this.content = this.processContent(state, true);
    }

    if (this.content) {
      this.update();
      this.loading = false;
      return Promise.resolve();
    }

    const DB_FILE = _path2.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    return (0, _atom.watchPath)(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), {}, events => {
      for (const event of events) {
        if (event.path === DB_FILE && event.action === _base.ACTION.MODIFIED || event.action === _base.ACTION.RENAMED && event.path === DB_FILE) {
          this.readContent();
        } else if (event.path === DB_FILE && event.action === _base.ACTION.DELETED || event.action === _base.ACTION.RENAMED && event.oldPath === DB_FILE) {
          this.content = undefined;
          this.update();
        }
      }
    }).then(pathWatcher => {
      this.file = new _atom.File(DB_FILE);
      this.disposables.add(pathWatcher);
      this.loading = false;
      return this.file.exists();
    }).then(exists => exists ? this.readContent() : Promise.reject()).catch(() => {
      this.loading = false;
      this.emitter.emit(_base.EMITTER.ERROR, {
        type: 'info',
        description: 'No database file was found.'
      });
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @returns {Object} description
   */
  serialize() {
    const parentGroupId = this.content.ids.find(id => this.content.map[id].parentId === undefined);

    return {
      deserializer: _base.DESERIALIZER,
      data: this.content,
      db: this.denormalizeContent(this.content.map[parentGroupId])
    };
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  openFile() {
    const DB_FILE = _path2.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    if (!DB_FILE) {
      return;
    }

    atom.workspace.open(DB_FILE);
  }

  /**
   * description
   * This method should only be invoked when external changes to the database
   * file exists because there is no way know what has been changed.
   * @todo improve JSDoc
   */
  update() {
    (0, _devlog2.default)('update');
    this.emitter.emit(_base.EMITTER.CHANGE_CONTENT, this.content);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  createDatabase() {
    (0, _devlog2.default)('created');
    this.file.create().then(() => this.file.write(JSON.stringify({ groups: [], projects: [] }, null, 2))).then(() => this.readContent());
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  recoverDatabase() {
    (0, _devlog2.default)('recovered');
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Object} parentGroup - current parent group content
   * @returns {Object} denormalized object content to be saved
   */
  denormalizeContent(parentGroup) {
    const denormalized = _extends({}, parentGroup.model, {
      expanded: parentGroup.expanded,
      groups: [],
      projects: []
    });

    parentGroup.children.forEach(childId => {
      const child = this.content.map[childId];
      if (child.type === 'group') {
        denormalized.groups.push(this.denormalizeContent(child));
      } else if (child.type === 'project') {
        denormalized.projects.push(_extends({}, child.model));
      }
    });

    return denormalized;
  }

  /**
   * A custom made normalizr to fit the purpose.
   *
   * @todo improve JSDoc
   * @todo normalize model content such as project -> paths
   *
   * @param {Object} content - a representation of a denormalized group/project.
   * @param {string} type - describes if content is a group or a project.
   * @param {string} parentId - if the content belongs to a group.
   *
   * @returns {Object} the current normalized group/project.
   */
  normalizeContent(content, type, parentId) {
    const { groups, projects, expanded } = content,
          model = _objectWithoutProperties(content, ['groups', 'projects', 'expanded']);

    const subContent = {
      id: (0, _uuid2.default)(),
      type,
      expanded,
      model,
      children: [],
      parentId
    };

    this.content.map[subContent.id] = subContent;
    this.content.ids.push(subContent.id);

    if (groups) {
      groups.forEach(group => {
        const child = this.normalizeContent(group, 'group', subContent.id);
        this.content.map[subContent.id].children.push(child.id);
      });
    }
    if (projects) {
      projects.forEach(project => {
        const child = this.normalizeContent(project, 'project', subContent.id);
        this.content.map[subContent.id].children.push(child.id);
      });
    }

    return this.content.map[subContent.id];
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {string} content - content that was retrieved from the file() =>() .
   * @param {boolean} parsed - if content is already parsed (ex: import)
   */
  processContent(content, parsed) {
    try {
      this.content = {
        map: {},
        ids: [],
        parentId: null,
        selectedId: null
      };
      this.normalizeContent(parsed ? content : JSON.parse(content), 'group');

      this.update();
    } catch (message) {
      this.emitter.emit(_base.EMITTER.ERROR, {
        type: 'info',
        description: message
      });
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  readContent() {
    this.file.read(true).then(content => {
      this.processContent(content);
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  saveContent() {
    const parentGroupId = this.content.ids.find(id => this.content.map[id].parentId === undefined);

    const normalized = this.denormalizeContent(this.content.map[parentGroupId]);

    this.file.write(JSON.stringify(normalized, null, 2));
  }

  /**
   *
   * @param {Object} legacyContent - legacy database object
   * @returns {Object} a normalized subContent
   */
  transformLegacyContent(legacyContent) {
    const content = {
      groups: [],
      projects: []
    };
    legacyContent.forEach(item => {
      if (item.type === 'group') {
        content.groups.push(_extends({
          name: item.name,
          sortBy: item.sortBy,
          icon: _icons2.default.find(icon => item.icon.includes(icon)) || ''
        }, this.transformLegacyContent(item.list)));
      } else if (item.type === 'project') {
        content.projects.push({
          name: item.name,
          paths: item.paths,
          icon: _icons2.default.find(icon => item.icon.includes(icon)) || ''
        });
      }
    });
    return content;
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  readLegacyContent() {
    this.legacyFile.read(true).then(content => {
      try {
        const legacyContent = JSON.parse(content);
        const newContent = this.transformLegacyContent(legacyContent.root);
        this.processContent(newContent, true);
        this.saveContent();
      } catch (e) {
        this.emitter.emit(_base.EMITTER.ERROR, {
          type: 'error',
          description: MESSAGES.EMITTER.BAD_LEGACY_CONTENT
        });
      }
    });
  }

  /**
   *
   */
  importContent() {
    const LEGACY_DB_FILE = _path2.default.join(atom.getConfigDirPath(), _base.LEGACY_DATABASE_FILE);
    this.legacyFile = new _atom.File(LEGACY_DB_FILE);

    this.legacyFile.exists().then(exists => exists ? this.readLegacyContent() : Promise.reject()).catch(() => {
      this.emitter.emit(_base.EMITTER.ERROR, {
        type: 'info',
        description: MESSAGES.EMITTER.NO_LEGACY_DB
      });
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  setInitialSelectedProject() {
    const currentStateKey = atom.getStateKey(atom.project.getPaths());

    this.content.ids.some(id => {
      const content = this.content.map[id];

      if (content.type === 'group') {
        return false;
      }

      if (currentStateKey === atom.getStateKey(content.model.paths)) {
        content.selected = true;
        this.content.selectedId = id;
        return true;
      }
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   * @param {boolean} oneTime - description
   */
  onDidChange(callback, oneTime) {
    if (oneTime) {
      this.emitter.once(_base.EMITTER.CHANGE_CONTENT, callback);
    } else {
      this.emitter.on(_base.EMITTER.CHANGE_CONTENT, callback);
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidError(callback) {
    this.emitter.on(_base.EMITTER.ERROR, callback);
  }
};
exports.default = Database;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImxvYWRpbmciLCJkZXN0cm95IiwiZGlzcG9zZSIsImluaXRpYWxpemUiLCJzdGF0ZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkRBVEFCQVNFX0ZJTEUiLCJjb250ZW50IiwicHJvY2Vzc0NvbnRlbnQiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIkRCX0ZJTEUiLCJwYXRoIiwiam9pbiIsImV2ZW50cyIsImV2ZW50IiwiYWN0aW9uIiwiQUNUSU9OIiwiTU9ESUZJRUQiLCJSRU5BTUVEIiwicmVhZENvbnRlbnQiLCJERUxFVEVEIiwib2xkUGF0aCIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJGaWxlIiwiYWRkIiwiZXhpc3RzIiwicmVqZWN0IiwiY2F0Y2giLCJlbWl0IiwiRU1JVFRFUiIsIkVSUk9SIiwidHlwZSIsImRlc2NyaXB0aW9uIiwic2VyaWFsaXplIiwicGFyZW50R3JvdXBJZCIsImlkcyIsImZpbmQiLCJpZCIsIm1hcCIsInBhcmVudElkIiwiZGVzZXJpYWxpemVyIiwiREVTRVJJQUxJWkVSIiwiZGF0YSIsImRiIiwiZGVub3JtYWxpemVDb250ZW50Iiwib3BlbkZpbGUiLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiQ0hBTkdFX0NPTlRFTlQiLCJjcmVhdGVEYXRhYmFzZSIsImNyZWF0ZSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdyb3VwcyIsInByb2plY3RzIiwicmVjb3ZlckRhdGFiYXNlIiwicGFyZW50R3JvdXAiLCJkZW5vcm1hbGl6ZWQiLCJtb2RlbCIsImV4cGFuZGVkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGRJZCIsImNoaWxkIiwicHVzaCIsIm5vcm1hbGl6ZUNvbnRlbnQiLCJzdWJDb250ZW50IiwiZ3JvdXAiLCJwcm9qZWN0IiwicGFyc2VkIiwic2VsZWN0ZWRJZCIsInBhcnNlIiwibWVzc2FnZSIsInJlYWQiLCJzYXZlQ29udGVudCIsIm5vcm1hbGl6ZWQiLCJ0cmFuc2Zvcm1MZWdhY3lDb250ZW50IiwibGVnYWN5Q29udGVudCIsIml0ZW0iLCJuYW1lIiwic29ydEJ5IiwiaWNvbiIsImljb25zIiwiaW5jbHVkZXMiLCJsaXN0IiwicGF0aHMiLCJyZWFkTGVnYWN5Q29udGVudCIsImxlZ2FjeUZpbGUiLCJuZXdDb250ZW50Iiwicm9vdCIsImUiLCJNRVNTQUdFUyIsIkJBRF9MRUdBQ1lfQ09OVEVOVCIsImltcG9ydENvbnRlbnQiLCJMRUdBQ1lfREJfRklMRSIsImdldENvbmZpZ0RpclBhdGgiLCJMRUdBQ1lfREFUQUJBU0VfRklMRSIsIk5PX0xFR0FDWV9EQiIsInNldEluaXRpYWxTZWxlY3RlZFByb2plY3QiLCJjdXJyZW50U3RhdGVLZXkiLCJnZXRTdGF0ZUtleSIsImdldFBhdGhzIiwic29tZSIsInNlbGVjdGVkIiwib25EaWRDaGFuZ2UiLCJjYWxsYmFjayIsIm9uZVRpbWUiLCJvbmNlIiwib24iLCJvbkRpZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQVFBOzs7Ozs7OztBQUVBOzs7O0lBSU1BLFEsR0FBTixNQUFNQSxRQUFOLENBQWU7O0FBR2I7OztBQUdBQyxnQkFBZTtBQUNiLFFBQUlELFNBQVNFLFFBQWIsRUFBdUI7QUFDckIsYUFBT0YsU0FBU0UsUUFBaEI7QUFDRDtBQUNELDBCQUFPLHNCQUFQO0FBQ0FGLGFBQVNFLFFBQVQsR0FBb0IsSUFBcEI7O0FBRUEsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUEsU0FBS0MsT0FBTCxHQUFl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QUFrQnZHLEtBQUt3RyxXQUFMLENBQWlCeEcsS0FBS3dFLE9BQUwsQ0FBYWlDLFFBQWIsRUFBakIsQ0FBeEI7O0FBRUEsU0FBS3BHLE9BQUwsQ0FBYWlDLEdBQWIsQ0FBaUJvRSxJQUFqQixDQUFzQmxFLE1BQU07QUFDMUIsWUFBTW5DLFVBQVUsS0FBS0EsT0FBTCxDQUFhb0MsR0FBYixDQUFpQkQsRUFBakIsQ0FBaEI7O0FBRUEsVUFBSW5DLFFBQVE2QixJQUFSLEtBQWlCLE9BQXJCLEVBQThCO0FBQzVCLGVBQU8sS0FBUDtBQUNEOztBQUVELFVBQUlxRSxvQkFBb0J2RyxLQUFLd0csV0FBTCxDQUFpQm5HLFFBQVF5RCxLQUFSLENBQWMyQixLQUEvQixDQUF4QixFQUErRDtBQUM3RHBGLGdCQUFRc0csUUFBUixHQUFtQixJQUFuQjtBQUNBLGFBQUt0RyxPQUFMLENBQWFxRSxVQUFiLEdBQTBCbEMsRUFBMUI7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDs7Ozs7OztBQU9Bb0UsY0FBYUMsUUFBYixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBS3JILE9BQUwsQ0FBYXNILElBQWIsQ0FBa0IvRSxjQUFRbUIsY0FBMUIsRUFBMEMwRCxRQUExQztBQUNELEtBRkQsTUFHSztBQUNILFdBQUtwSCxPQUFMLENBQWF1SCxFQUFiLENBQWdCaEYsY0FBUW1CLGNBQXhCLEVBQXdDMEQsUUFBeEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLcEgsT0FBTCxDQUFhdUgsRUFBYixDQUFnQmhGLGNBQVFDLEtBQXhCLEVBQStCNEUsUUFBL0I7QUFDRDtBQTFaWSxDO2tCQTZaQXpILFEiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vZGV2bG9nJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBERVNFUklBTElaRVIsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIExFR0FDWV9EQVRBQkFTRV9GSUxFLFxuICBBQ1RJT04sXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi8uLi9jb25zdGFudHMvaWNvbnMnO1xuXG4vKipcbiAqIEEgc2luZ2xldG9uIGNsYXNzIHJlcHJlc2VudGluZyBhbGwgcmVsYXRlZCBvcGVyYXRpb25zXG4gKiB3aXRoIHRoZSBjb250ZW50IG1hbmFnZW1lbnQuXG4gKi9cbmNsYXNzIERhdGFiYXNlIHtcbiAgc3RhdGljIGluc3RhbmNlO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cbiAgICBkZXZsb2coJ2RhdGFiYXNlOmNvbnN0cnVjdG9yJyk7XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgZGV2bG9nKCdkYXRhYmFzZSBkZXN0cm95ZWQnKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gc2VyaWFsaXplZCBjb250ZW50IHJldHJpZXZlZCBmcm9tIEF0b21cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpbml0aWFsaXplIChzdGF0ZSkge1xuICAgIGRldmxvZyhcbiAgICAgICdkYXRhYmFzZTppbml0aWFsaXplJyxcbiAgICAgICdsb2NhbFBhdGgnLFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKVxuICAgICk7XG4gICAgZGV2bG9nKCdkYXRhYmFzZTppbml0aWFsaXplJywgJ2RhdGFiYXNlX2ZpbGUnLCBEQVRBQkFTRV9GSUxFKTtcblxuICAgIGlmIChzdGF0ZSkge1xuICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5wcm9jZXNzQ29udGVudChzdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IERCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICByZXR1cm4gd2F0Y2hQYXRoKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIHt9LFxuICAgICAgZXZlbnRzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5NT0RJRklFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50LnBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uREVMRVRFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50Lm9sZFBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICAgIC50aGVuKHBhdGhXYXRjaGVyID0+IHtcbiAgICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHBhdGhXYXRjaGVyKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGUuZXhpc3RzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZXhpc3RzID0+IChleGlzdHMgPyB0aGlzLnJlYWRDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm8gZGF0YWJhc2UgZmlsZSB3YXMgZm91bmQuJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgY29uc3QgcGFyZW50R3JvdXBJZCA9IHRoaXMuY29udGVudC5pZHMuZmluZChcbiAgICAgIGlkID0+IHRoaXMuY29udGVudC5tYXBbaWRdLnBhcmVudElkID09PSB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLFxuICAgICAgZGF0YTogdGhpcy5jb250ZW50LFxuICAgICAgZGI6IHRoaXMuZGVub3JtYWxpemVDb250ZW50KHRoaXMuY29udGVudC5tYXBbcGFyZW50R3JvdXBJZF0pXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBvcGVuRmlsZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIGlmICghREJfRklMRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oREJfRklMRSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGV4dGVybmFsIGNoYW5nZXMgdG8gdGhlIGRhdGFiYXNlXG4gICAqIGZpbGUgZXhpc3RzIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IGtub3cgd2hhdCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIGRldmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgdGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjcmVhdGVEYXRhYmFzZSAoKSB7XG4gICAgZGV2bG9nKCdjcmVhdGVkJyk7XG4gICAgdGhpcy5maWxlXG4gICAgICAuY3JlYXRlKClcbiAgICAgIC50aGVuKCgpID0+XG4gICAgICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeSh7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9LCBudWxsLCAyKSlcbiAgICAgIClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucmVhZENvbnRlbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVjb3ZlckRhdGFiYXNlICgpIHtcbiAgICBkZXZsb2coJ3JlY292ZXJlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudEdyb3VwIC0gY3VycmVudCBwYXJlbnQgZ3JvdXAgY29udGVudFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZW5vcm1hbGl6ZWQgb2JqZWN0IGNvbnRlbnQgdG8gYmUgc2F2ZWRcbiAgICovXG4gIGRlbm9ybWFsaXplQ29udGVudCAocGFyZW50R3JvdXApIHtcbiAgICBjb25zdCBkZW5vcm1hbGl6ZWQgPSB7XG4gICAgICAuLi5wYXJlbnRHcm91cC5tb2RlbCxcbiAgICAgIGV4cGFuZGVkOiBwYXJlbnRHcm91cC5leHBhbmRlZCxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuXG4gICAgcGFyZW50R3JvdXAuY2hpbGRyZW4uZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jb250ZW50Lm1hcFtjaGlsZElkXTtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5ncm91cHMucHVzaCh0aGlzLmRlbm9ybWFsaXplQ29udGVudChjaGlsZCkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5wcm9qZWN0cy5wdXNoKHsgLi4uY2hpbGQubW9kZWwgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIG1hZGUgbm9ybWFsaXpyIHRvIGZpdCB0aGUgcHVycG9zZS5cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAdG9kbyBub3JtYWxpemUgbW9kZWwgY29udGVudCBzdWNoIGFzIHByb2plY3QgLT4gcGF0aHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBhIHJlcHJlc2VudGF0aW9uIG9mIGEgZGVub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gZGVzY3JpYmVzIGlmIGNvbnRlbnQgaXMgYSBncm91cCBvciBhIHByb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZCAtIGlmIHRoZSBjb250ZW50IGJlbG9uZ3MgdG8gYSBncm91cC5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIGN1cnJlbnQgbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKi9cbiAgbm9ybWFsaXplQ29udGVudCAoY29udGVudCwgdHlwZSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCB7IGdyb3VwcywgcHJvamVjdHMsIGV4cGFuZGVkLCAuLi5tb2RlbCB9ID0gY29udGVudDtcblxuICAgIGNvbnN0IHN1YkNvbnRlbnQgPSB7XG4gICAgICBpZDogdXVpZCgpLFxuICAgICAgdHlwZSxcbiAgICAgIGV4cGFuZGVkLFxuICAgICAgbW9kZWwsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdID0gc3ViQ29udGVudDtcbiAgICB0aGlzLmNvbnRlbnQuaWRzLnB1c2goc3ViQ29udGVudC5pZCk7XG5cbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBncm91cHMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KGdyb3VwLCAnZ3JvdXAnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJvamVjdHMpIHtcbiAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KHByb2plY3QsICdwcm9qZWN0Jywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gY29udGVudCB0aGF0IHdhcyByZXRyaWV2ZWQgZnJvbSB0aGUgZmlsZSgpID0+KCkgLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcnNlZCAtIGlmIGNvbnRlbnQgaXMgYWxyZWFkeSBwYXJzZWQgKGV4OiBpbXBvcnQpXG4gICAqL1xuICBwcm9jZXNzQ29udGVudCAoY29udGVudCwgcGFyc2VkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGVudCA9IHtcbiAgICAgICAgbWFwOiB7fSxcbiAgICAgICAgaWRzOiBbXSxcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXG4gICAgICAgIHNlbGVjdGVkSWQ6IG51bGxcbiAgICAgIH07XG4gICAgICB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQocGFyc2VkID8gY29udGVudCA6IEpTT04ucGFyc2UoY29udGVudCksICdncm91cCcpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBjYXRjaCAobWVzc2FnZSkge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUiwge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBtZXNzYWdlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVhZENvbnRlbnQgKCkge1xuICAgIHRoaXMuZmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NDb250ZW50KGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNhdmVDb250ZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnRHcm91cElkID0gdGhpcy5jb250ZW50Lmlkcy5maW5kKFxuICAgICAgaWQgPT4gdGhpcy5jb250ZW50Lm1hcFtpZF0ucGFyZW50SWQgPT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gdGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQodGhpcy5jb250ZW50Lm1hcFtwYXJlbnRHcm91cElkXSk7XG5cbiAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZCwgbnVsbCwgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBsZWdhY3lDb250ZW50IC0gbGVnYWN5IGRhdGFiYXNlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhIG5vcm1hbGl6ZWQgc3ViQ29udGVudFxuICAgKi9cbiAgdHJhbnNmb3JtTGVnYWN5Q29udGVudCAobGVnYWN5Q29udGVudCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB7XG4gICAgICBncm91cHM6IFtdLFxuICAgICAgcHJvamVjdHM6IFtdXG4gICAgfTtcbiAgICBsZWdhY3lDb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnRlbnQuZ3JvdXBzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICBzb3J0Qnk6IGl0ZW0uc29ydEJ5LFxuICAgICAgICAgIGljb246IGljb25zLmZpbmQoaWNvbiA9PiBpdGVtLmljb24uaW5jbHVkZXMoaWNvbikpIHx8ICcnLFxuICAgICAgICAgIC4uLnRoaXMudHJhbnNmb3JtTGVnYWN5Q29udGVudChpdGVtLmxpc3QpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgY29udGVudC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgcGF0aHM6IGl0ZW0ucGF0aHMsXG4gICAgICAgICAgaWNvbjogaWNvbnMuZmluZChpY29uID0+IGl0ZW0uaWNvbi5pbmNsdWRlcyhpY29uKSkgfHwgJydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVhZExlZ2FjeUNvbnRlbnQgKCkge1xuICAgIHRoaXMubGVnYWN5RmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBsZWdhY3lDb250ZW50ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IHRoaXMudHJhbnNmb3JtTGVnYWN5Q29udGVudChsZWdhY3lDb250ZW50LnJvb3QpO1xuICAgICAgICB0aGlzLnByb2Nlc3NDb250ZW50KG5ld0NvbnRlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLnNhdmVDb250ZW50KCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogTUVTU0FHRVMuRU1JVFRFUi5CQURfTEVHQUNZX0NPTlRFTlRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGltcG9ydENvbnRlbnQgKCkge1xuICAgIGNvbnN0IExFR0FDWV9EQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICBMRUdBQ1lfREFUQUJBU0VfRklMRVxuICAgICk7XG4gICAgdGhpcy5sZWdhY3lGaWxlID0gbmV3IEZpbGUoTEVHQUNZX0RCX0ZJTEUpO1xuXG4gICAgdGhpcy5sZWdhY3lGaWxlXG4gICAgICAuZXhpc3RzKClcbiAgICAgIC50aGVuKGV4aXN0cyA9PiAoZXhpc3RzID8gdGhpcy5yZWFkTGVnYWN5Q29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSkpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBNRVNTQUdFUy5FTUlUVEVSLk5PX0xFR0FDWV9EQlxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNldEluaXRpYWxTZWxlY3RlZFByb2plY3QgKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZUtleSA9IGF0b20uZ2V0U3RhdGVLZXkoYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkpO1xuXG4gICAgdGhpcy5jb250ZW50Lmlkcy5zb21lKGlkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubWFwW2lkXTtcblxuICAgICAgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50U3RhdGVLZXkgPT09IGF0b20uZ2V0U3RhdGVLZXkoY29udGVudC5tb2RlbC5wYXRocykpIHtcbiAgICAgICAgY29udGVudC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5zZWxlY3RlZElkID0gaWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9uZVRpbWUgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRDaGFuZ2UgKGNhbGxiYWNrLCBvbmVUaW1lKSB7XG4gICAgaWYgKG9uZVRpbWUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbmNlKEVNSVRURVIuQ0hBTkdFX0NPTlRFTlQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub24oRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkRXJyb3IgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKEVNSVRURVIuRVJST1IsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZTtcbiJdfQ==