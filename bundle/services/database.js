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
   *
   * @param {Object} state - last state from previous Atom instance
   */
  constructor(state) {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;

    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    this.loading = true;

    if (state) {
      this.content = state;
      this.emitter.emit(_base.EMITTER.CHANGE_CONTENT, this.content);
    }
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
   *
   * @returns {Promise} description
   */
  initialize() {
    console.log(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`));
    console.log(_base.DATABASE_FILE);
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
    return { deserializer: _base.DESERIALIZER, data: this.content };
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
   *
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
    const { groups, projects } = content,
          model = _objectWithoutProperties(content, ['groups', 'projects']);

    const subContent = {
      id: (0, _uuid2.default)(),
      type,
      expanded: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwic3RhdGUiLCJpbnN0YW5jZSIsImRpc3Bvc2FibGVzIiwiZW1pdHRlciIsImxvYWRpbmciLCJjb250ZW50IiwiZW1pdCIsIkNIQU5HRV9DT05URU5UIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiY29uc29sZSIsImxvZyIsImF0b20iLCJjb25maWciLCJnZXQiLCJEQl9GSUxFIiwiam9pbiIsImV2ZW50cyIsImV2ZW50IiwicGF0aCIsImFjdGlvbiIsIk1PRElGSUVEIiwiUkVOQU1FRCIsInJlYWRDb250ZW50IiwiREVMRVRFRCIsIm9sZFBhdGgiLCJ1bmRlZmluZWQiLCJ1cGRhdGUiLCJ0aGVuIiwicGF0aFdhdGNoZXIiLCJmaWxlIiwiYWRkIiwiZXhpc3RzIiwiUHJvbWlzZSIsInJlamVjdCIsImNhdGNoIiwiRVJST1IiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkYXRhIiwib3BlbkZpbGUiLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiY3JlYXRlRGF0YWJhc2UiLCJjcmVhdGUiLCJ3cml0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJncm91cHMiLCJwcm9qZWN0cyIsInJlY292ZXJEYXRhYmFzZSIsImRlbm9ybWFsaXplQ29udGVudCIsInBhcmVudEdyb3VwIiwiZGVub3JtYWxpemVkIiwibW9kZWwiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZElkIiwiY2hpbGQiLCJtYXAiLCJwdXNoIiwibm9ybWFsaXplQ29udGVudCIsInBhcmVudElkIiwic3ViQ29udGVudCIsImlkIiwiZXhwYW5kZWQiLCJpZHMiLCJncm91cCIsInByb2plY3QiLCJwcm9jZXNzQ29udGVudCIsInBhcnNlZCIsInNlbGVjdGVkSWQiLCJwYXJzZSIsIm1lc3NhZ2UiLCJyZWFkIiwic2F2ZUNvbnRlbnQiLCJwYXJlbnRHcm91cElkIiwiZmluZCIsIm5vcm1hbGl6ZWQiLCJ0cmFuc2Zvcm1MZWdhY3lDb250ZW50IiwibGVnYWN5Q29udGVudCIsIml0ZW0iLCJuYW1lIiwic29ydEJ5IiwiaWNvbiIsImluY2x1ZGVzIiwibGlzdCIsInBhdGhzIiwicmVhZExlZ2FjeUNvbnRlbnQiLCJsZWdhY3lGaWxlIiwibmV3Q29udGVudCIsInJvb3QiLCJlIiwiTUVTU0FHRVMiLCJFTUlUVEVSIiwiQkFEX0xFR0FDWV9DT05URU5UIiwiaW1wb3J0Q29udGVudCIsIkxFR0FDWV9EQl9GSUxFIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIk5PX0xFR0FDWV9EQiIsInNldEluaXRpYWxTZWxlY3RlZFByb2plY3QiLCJjdXJyZW50U3RhdGVLZXkiLCJnZXRTdGF0ZUtleSIsImdldFBhdGhzIiwic29tZSIsInNlbGVjdGVkIiwib25EaWRDaGFuZ2UiLCJjYWxsYmFjayIsIm9uZVRpbWUiLCJvbmNlIiwib24iLCJvbkRpZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQVFBOzs7Ozs7OztBQUVBOzs7O0lBSU1BLFEsR0FBTixNQUFNQSxRQUFOLENBQWU7O0FBR2I7Ozs7O0FBS0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsUUFBSUYsU0FBU0csUUFBYixFQUF1QjtBQUNyQixhQUFPSCxTQUFTRyxRQUFoQjtBQUNEO0FBQ0RILGFBQVNHLFFBQVQsR0FBb0IsSUFBcEI7O0FBRUEsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsbUJBQWY7O0FBRUEsU0FBS0MsT0FBTCxHQUFlLElBQWY7O0FBRUEsUUFBSUosS0FBSixFQUFXO0FBQ1QsV0FBS0ssT0FBTCxHQUFlTCxLQUFmO0FBQ0EsV0FBS0csT0FBTCxDQUFhRyxJQUFiLENBQWtCLGNBQVFDLGNBQTFCLEVBQTBDLEtBQUtGLE9BQS9DO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7QUFLQUcsWUFB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dUcsUUFBeEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLM0csT0FBTCxDQUFhOEcsRUFBYixDQUFnQixjQUFRNUUsS0FBeEIsRUFBK0J5RSxRQUEvQjtBQUNEO0FBellZLEM7a0JBNFlBaEgsUSIsImZpbGUiOiJkYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtaXR0ZXIsIEZpbGUsIENvbXBvc2l0ZURpc3Bvc2FibGUsIHdhdGNoUGF0aCB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi9kZXZsb2cnO1xuaW1wb3J0IHtcbiAgUExVR0lOX05BTUUsXG4gIERFU0VSSUFMSVpFUixcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEUsXG4gIEFDVElPTixcbiAgRU1JVFRFUlxufSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBpY29ucyBmcm9tICcuLy4uL2NvbnN0YW50cy9pY29ucyc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGxhc3Qgc3RhdGUgZnJvbSBwcmV2aW91cyBBdG9tIGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc3RhdGUpIHtcbiAgICBpZiAoRGF0YWJhc2UuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBEYXRhYmFzZS5pbnN0YW5jZTtcbiAgICB9XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIHRoaXMuY29udGVudCA9IHN0YXRlO1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgdGhpcy5jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgZGV2bG9nKCdkYXRhYmFzZSBkZXN0cm95ZWQnKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpbml0aWFsaXplICgpIHtcbiAgICBjb25zb2xlLmxvZyhhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApKTtcbiAgICBjb25zb2xlLmxvZyhEQVRBQkFTRV9GSUxFKTtcbiAgICBjb25zdCBEQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIERBVEFCQVNFX0ZJTEVcbiAgICApO1xuXG4gICAgcmV0dXJuIHdhdGNoUGF0aChcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICB7fSxcbiAgICAgIGV2ZW50cyA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uTU9ESUZJRUQpIHx8XG4gICAgICAgICAgICAoZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uUkVOQU1FRCAmJiBldmVudC5wYXRoID09PSBEQl9GSUxFKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5yZWFkQ29udGVudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLkRFTEVURUQpIHx8XG4gICAgICAgICAgICAoZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uUkVOQU1FRCAmJiBldmVudC5vbGRQYXRoID09PSBEQl9GSUxFKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG4gICAgICAudGhlbihwYXRoV2F0Y2hlciA9PiB7XG4gICAgICAgIHRoaXMuZmlsZSA9IG5ldyBGaWxlKERCX0ZJTEUpO1xuICAgICAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChwYXRoV2F0Y2hlcik7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlLmV4aXN0cygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGV4aXN0cyA9PiAoZXhpc3RzID8gdGhpcy5yZWFkQ29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSkpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUiwge1xuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ05vIGRhdGFiYXNlIGZpbGUgd2FzIGZvdW5kLidcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7IGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLCBkYXRhOiB0aGlzLmNvbnRlbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBvcGVuRmlsZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIGlmICghREJfRklMRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oREJfRklMRSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGV4dGVybmFsIGNoYW5nZXMgdG8gdGhlIGRhdGFiYXNlXG4gICAqIGZpbGUgZXhpc3RzIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IGtub3cgd2hhdCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIGRldmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgdGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjcmVhdGVEYXRhYmFzZSAoKSB7XG4gICAgZGV2bG9nKCdjcmVhdGVkJyk7XG4gICAgdGhpcy5maWxlXG4gICAgICAuY3JlYXRlKClcbiAgICAgIC50aGVuKCgpID0+XG4gICAgICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeSh7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9LCBudWxsLCAyKSlcbiAgICAgIClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucmVhZENvbnRlbnQoKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVjb3ZlckRhdGFiYXNlICgpIHtcbiAgICBkZXZsb2coJ3JlY292ZXJlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudEdyb3VwIC0gY3VycmVudCBwYXJlbnQgZ3JvdXAgY29udGVudFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZW5vcm1hbGl6ZWQgb2JqZWN0IGNvbnRlbnQgdG8gYmUgc2F2ZWRcbiAgICovXG4gIGRlbm9ybWFsaXplQ29udGVudCAocGFyZW50R3JvdXApIHtcbiAgICBjb25zdCBkZW5vcm1hbGl6ZWQgPSB7XG4gICAgICAuLi5wYXJlbnRHcm91cC5tb2RlbCxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuXG4gICAgcGFyZW50R3JvdXAuY2hpbGRyZW4uZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jb250ZW50Lm1hcFtjaGlsZElkXTtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5ncm91cHMucHVzaCh0aGlzLmRlbm9ybWFsaXplQ29udGVudChjaGlsZCkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5wcm9qZWN0cy5wdXNoKHsgLi4uY2hpbGQubW9kZWwgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIG1hZGUgbm9ybWFsaXpyIHRvIGZpdCB0aGUgcHVycG9zZS5cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAdG9kbyBub3JtYWxpemUgbW9kZWwgY29udGVudCBzdWNoIGFzIHByb2plY3QgLT4gcGF0aHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBhIHJlcHJlc2VudGF0aW9uIG9mIGEgZGVub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gZGVzY3JpYmVzIGlmIGNvbnRlbnQgaXMgYSBncm91cCBvciBhIHByb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZCAtIGlmIHRoZSBjb250ZW50IGJlbG9uZ3MgdG8gYSBncm91cC5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIGN1cnJlbnQgbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKi9cbiAgbm9ybWFsaXplQ29udGVudCAoY29udGVudCwgdHlwZSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCB7IGdyb3VwcywgcHJvamVjdHMsIC4uLm1vZGVsIH0gPSBjb250ZW50O1xuXG4gICAgY29uc3Qgc3ViQ29udGVudCA9IHtcbiAgICAgIGlkOiB1dWlkKCksXG4gICAgICB0eXBlLFxuICAgICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgICBtb2RlbCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcblxuICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0gPSBzdWJDb250ZW50O1xuICAgIHRoaXMuY29udGVudC5pZHMucHVzaChzdWJDb250ZW50LmlkKTtcblxuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQoZ3JvdXAsICdncm91cCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcm9qZWN0cykge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQocHJvamVjdCwgJ3Byb2plY3QnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgLSBjb250ZW50IHRoYXQgd2FzIHJldHJpZXZlZCBmcm9tIHRoZSBmaWxlKCkgPT4oKSAuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyc2VkIC0gaWYgY29udGVudCBpcyBhbHJlYWR5IHBhcnNlZCAoZXg6IGltcG9ydClcbiAgICovXG4gIHByb2Nlc3NDb250ZW50IChjb250ZW50LCBwYXJzZWQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZW50ID0ge1xuICAgICAgICBtYXA6IHt9LFxuICAgICAgICBpZHM6IFtdLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWRJZDogbnVsbFxuICAgICAgfTtcbiAgICAgIHRoaXMubm9ybWFsaXplQ29udGVudChwYXJzZWQgPyBjb250ZW50IDogSlNPTi5wYXJzZShjb250ZW50KSwgJ2dyb3VwJyk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNhdGNoIChtZXNzYWdlKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkQ29udGVudCAoKSB7XG4gICAgdGhpcy5maWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQoY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLmNvbnRlbnQubWFwW2lkXS5wYXJlbnRJZCA9PT0gdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlbm9ybWFsaXplQ29udGVudCh0aGlzLmNvbnRlbnQubWFwW3BhcmVudEdyb3VwSWRdKTtcblxuICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeShub3JtYWxpemVkLCBudWxsLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGxlZ2FjeUNvbnRlbnQgLSBsZWdhY3kgZGF0YWJhc2Ugb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGEgbm9ybWFsaXplZCBzdWJDb250ZW50XG4gICAqL1xuICB0cmFuc2Zvcm1MZWdhY3lDb250ZW50IChsZWdhY3lDb250ZW50KSB7XG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuICAgIGxlZ2FjeUNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgY29udGVudC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgIHNvcnRCeTogaXRlbS5zb3J0QnksXG4gICAgICAgICAgaWNvbjogaWNvbnMuZmluZChpY29uID0+IGl0ZW0uaWNvbi5pbmNsdWRlcyhpY29uKSkgfHwgJycsXG4gICAgICAgICAgLi4udGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGl0ZW0ubGlzdClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBjb250ZW50LnByb2plY3RzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICBwYXRoczogaXRlbS5wYXRocyxcbiAgICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkTGVnYWN5Q29udGVudCAoKSB7XG4gICAgdGhpcy5sZWdhY3lGaWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxlZ2FjeUNvbnRlbnQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBuZXdDb250ZW50ID0gdGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGxlZ2FjeUNvbnRlbnQucm9vdCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQobmV3Q29udGVudCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbnRlbnQoKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuRVJST1IsIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBNRVNTQUdFUy5FTUlUVEVSLkJBRF9MRUdBQ1lfQ09OVEVOVFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaW1wb3J0Q29udGVudCAoKSB7XG4gICAgY29uc3QgTEVHQUNZX0RCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmdldENvbmZpZ0RpclBhdGgoKSxcbiAgICAgIExFR0FDWV9EQVRBQkFTRV9GSUxFXG4gICAgKTtcbiAgICB0aGlzLmxlZ2FjeUZpbGUgPSBuZXcgRmlsZShMRUdBQ1lfREJfRklMRSk7XG5cbiAgICB0aGlzLmxlZ2FjeUZpbGVcbiAgICAgIC5leGlzdHMoKVxuICAgICAgLnRoZW4oZXhpc3RzID0+IChleGlzdHMgPyB0aGlzLnJlYWRMZWdhY3lDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuRVJST1IsIHtcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgZGVzY3JpcHRpb246IE1FU1NBR0VTLkVNSVRURVIuTk9fTEVHQUNZX0RCXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCAoKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlS2V5ID0gYXRvbS5nZXRTdGF0ZUtleShhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSk7XG5cbiAgICB0aGlzLmNvbnRlbnQuaWRzLnNvbWUoaWQgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC5tYXBbaWRdO1xuXG4gICAgICBpZiAoY29udGVudC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZUtleSA9PT0gYXRvbS5nZXRTdGF0ZUtleShjb250ZW50Lm1vZGVsLnBhdGhzKSkge1xuICAgICAgICBjb250ZW50LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNlbGVjdGVkSWQgPSBpZDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb25lVGltZSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZENoYW5nZSAoY2FsbGJhY2ssIG9uZVRpbWUpIHtcbiAgICBpZiAob25lVGltZSkge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uY2UoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbihFTUlUVEVSLkNIQU5HRV9DT05URU5ULCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRFcnJvciAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oRU1JVFRFUi5FUlJPUiwgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFiYXNlO1xuIl19