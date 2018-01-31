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
   * @todo improve JSDoc
   */
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;

    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
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
   * @todo improve JSDoc
   * @returns {Promise} description
   */
  initialize() {
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
      return this.file.exists();
    }).then(exists => exists ? this.readContent() : Promise.reject()).catch(() => {
      this.emitter.emit('did-error', {
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
    this.emitter.emit('did-change-content', this.content);
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
      this.emitter.emit('did-error', {
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
          icon: item.icon
        }, this.transformLegacyContent(item.list)));
      } else if (item.type === 'project') {
        content.projects.push({
          name: item.name,
          paths: item.paths,
          icon: item.icon
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
        this.emitter.emit('did-error', {
          type: 'error',
          description: 'Bad legacy database content.'
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
      this.emitter.emit('did-error', {
        type: 'info',
        description: 'No legacy database file found.'
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
      this.emitter.once('did-change-content', callback);
    } else {
      this.emitter.on('did-change-content', callback);
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidError(callback) {
    this.emitter.on('did-error', callback);
  }
};
exports.default = Database;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJkZXN0cm95IiwiZGlzcG9zZSIsImluaXRpYWxpemUiLCJEQl9GSUxFIiwiam9pbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJldmVudHMiLCJldmVudCIsInBhdGgiLCJhY3Rpb24iLCJNT0RJRklFRCIsIlJFTkFNRUQiLCJyZWFkQ29udGVudCIsIkRFTEVURUQiLCJvbGRQYXRoIiwiY29udGVudCIsInVuZGVmaW5lZCIsInVwZGF0ZSIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJhZGQiLCJleGlzdHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY2F0Y2giLCJlbWl0IiwidHlwZSIsImRlc2NyaXB0aW9uIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVyIiwiZGF0YSIsIm9wZW5GaWxlIiwid29ya3NwYWNlIiwib3BlbiIsImNyZWF0ZURhdGFiYXNlIiwiY3JlYXRlIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJyZWNvdmVyRGF0YWJhc2UiLCJkZW5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRHcm91cCIsImRlbm9ybWFsaXplZCIsIm1vZGVsIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGRJZCIsImNoaWxkIiwibWFwIiwicHVzaCIsIm5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRJZCIsInN1YkNvbnRlbnQiLCJpZCIsImlkcyIsImdyb3VwIiwicHJvamVjdCIsInByb2Nlc3NDb250ZW50IiwicGFyc2VkIiwic2VsZWN0ZWRJZCIsInBhcnNlIiwibWVzc2FnZSIsInJlYWQiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJmaW5kIiwibm9ybWFsaXplZCIsInRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQiLCJsZWdhY3lDb250ZW50IiwiaXRlbSIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwibGlzdCIsInBhdGhzIiwicmVhZExlZ2FjeUNvbnRlbnQiLCJsZWdhY3lGaWxlIiwibmV3Q29udGVudCIsInJvb3QiLCJlIiwiaW1wb3J0Q29udGVudCIsIkxFR0FDWV9EQl9GSUxFIiwiZ2V0Q29uZmlnRGlyUGF0aCIsInNldEluaXRpYWxTZWxlY3RlZFByb2plY3QiLCJjdXJyZW50U3RhdGVLZXkiLCJnZXRTdGF0ZUtleSIsImdldFBhdGhzIiwic29tZSIsInNlbGVjdGVkIiwib25EaWRDaGFuZ2UiLCJjYWxsYmFjayIsIm9uZVRpbWUiLCJvbmNlIiwib24iLCJvbkRpZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFRQTs7OztJQUlNQSxRLEdBQU4sTUFBTUEsUUFBTixDQUFlOztBQUdiOzs7OztBQUtBQyxnQkFBZTtBQUNiLFFBQUlELFNBQVNFLFFBQWIsRUFBdUI7QUFDckIsYUFBT0YsU0FBU0UsUUFBaEI7QUFDRDtBQUNERixhQUFTRSxRQUFULEdBQW9CLElBQXBCOztBQUVBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFlBQVc7QUFDVCwwQkFBTyxvQkFBUDtBQUNBLFNBQUtGLFdBQUwsQ0FBaUJHLE9BQWpCO0FBQ0FOLGFBQVNFLFFBQVQsR0FBb0IsSUFBcEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUFLLGVBQWM7QUFDWixVQUFNQyxVQUFVLGVBQUtDLElBQUwsQ0FDZEMsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWlCLEdBQUQsaUJBQWUscUJBQS9CLENBRGMsc0JBQWhCOztBQUtBLFdBQU8scUJBQ0xGLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFpQixHQUFELGlCQUFlLHFCQUEvQixDQURLLEVBRUwsRUFGSyxFQUdMQyxVQUFVO0FBQ1IsV0FBSyxNQUFNQyxL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QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDs7Ozs7OztBQU9Bb0MsY0FBYUMsUUFBYixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBS2pHLE9BQUwsQ0FBYWtHLElBQWIsQ0FBa0Isb0JBQWxCLEVBQXdDRixRQUF4QztBQUNELEtBRkQsTUFHSztBQUNILFdBQUtoRyxPQUFMLENBQWFtRyxFQUFiLENBQWdCLG9CQUFoQixFQUFzQ0gsUUFBdEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLaEcsT0FBTCxDQUFhbUcsRUFBYixDQUFnQixXQUFoQixFQUE2QkgsUUFBN0I7QUFDRDtBQTlYWSxDO2tCQWlZQXBHLFEiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vZGV2bG9nJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBERVNFUklBTElaRVIsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIExFR0FDWV9EQVRBQkFTRV9GSUxFLFxuICBBQ1RJT05cbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoRGF0YWJhc2UuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBEYXRhYmFzZS5pbnN0YW5jZTtcbiAgICB9XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZXZsb2coJ2RhdGFiYXNlIGRlc3Ryb3llZCcpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIERhdGFiYXNlLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIHJldHVybiB3YXRjaFBhdGgoXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAge30sXG4gICAgICBldmVudHMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLk1PRElGSUVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQucGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVhZENvbnRlbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5ERUxFVEVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQub2xkUGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgICAgLnRoZW4ocGF0aFdhdGNoZXIgPT4ge1xuICAgICAgICB0aGlzLmZpbGUgPSBuZXcgRmlsZShEQl9GSUxFKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocGF0aFdhdGNoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlLmV4aXN0cygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGV4aXN0cyA9PiAoZXhpc3RzID8gdGhpcy5yZWFkQ29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSkpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWVycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ05vIGRhdGFiYXNlIGZpbGUgd2FzIGZvdW5kLidcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7IGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLCBkYXRhOiB0aGlzLmNvbnRlbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBvcGVuRmlsZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIGlmICghREJfRklMRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oREJfRklMRSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGV4dGVybmFsIGNoYW5nZXMgdG8gdGhlIGRhdGFiYXNlXG4gICAqIGZpbGUgZXhpc3RzIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IGtub3cgd2hhdCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIGRldmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2UtY29udGVudCcsIHRoaXMuY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY3JlYXRlRGF0YWJhc2UgKCkge1xuICAgIGRldmxvZygnY3JlYXRlZCcpO1xuICAgIHRoaXMuZmlsZVxuICAgICAgLmNyZWF0ZSgpXG4gICAgICAudGhlbigoKSA9PlxuICAgICAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkoeyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfSwgbnVsbCwgMikpXG4gICAgICApXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnJlYWRDb250ZW50KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlY292ZXJEYXRhYmFzZSAoKSB7XG4gICAgZGV2bG9nKCdyZWNvdmVyZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRHcm91cCAtIGN1cnJlbnQgcGFyZW50IGdyb3VwIGNvbnRlbnRcbiAgICogQHJldHVybnMge09iamVjdH0gZGVub3JtYWxpemVkIG9iamVjdCBjb250ZW50IHRvIGJlIHNhdmVkXG4gICAqL1xuICBkZW5vcm1hbGl6ZUNvbnRlbnQgKHBhcmVudEdyb3VwKSB7XG4gICAgY29uc3QgZGVub3JtYWxpemVkID0ge1xuICAgICAgLi4ucGFyZW50R3JvdXAubW9kZWwsXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgcHJvamVjdHM6IFtdXG4gICAgfTtcblxuICAgIHBhcmVudEdyb3VwLmNoaWxkcmVuLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY29udGVudC5tYXBbY2hpbGRJZF07XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQuZ3JvdXBzLnB1c2godGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQoY2hpbGQpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNoaWxkLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQucHJvamVjdHMucHVzaCh7IC4uLmNoaWxkLm1vZGVsIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlbm9ybWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBtYWRlIG5vcm1hbGl6ciB0byBmaXQgdGhlIHB1cnBvc2UuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHRvZG8gbm9ybWFsaXplIG1vZGVsIGNvbnRlbnQgc3VjaCBhcyBwcm9qZWN0IC0+IHBhdGhzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50IC0gYSByZXByZXNlbnRhdGlvbiBvZiBhIGRlbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIGRlc2NyaWJlcyBpZiBjb250ZW50IGlzIGEgZ3JvdXAgb3IgYSBwcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSBpZiB0aGUgY29udGVudCBiZWxvbmdzIHRvIGEgZ3JvdXAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBjdXJyZW50IG5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICovXG4gIG5vcm1hbGl6ZUNvbnRlbnQgKGNvbnRlbnQsIHR5cGUsIHBhcmVudElkKSB7XG4gICAgY29uc3QgeyBncm91cHMsIHByb2plY3RzLCAuLi5tb2RlbCB9ID0gY29udGVudDtcblxuICAgIGNvbnN0IHN1YkNvbnRlbnQgPSB7XG4gICAgICBpZDogdXVpZCgpLFxuICAgICAgdHlwZSxcbiAgICAgIG1vZGVsLFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXSA9IHN1YkNvbnRlbnQ7XG4gICAgdGhpcy5jb250ZW50Lmlkcy5wdXNoKHN1YkNvbnRlbnQuaWQpO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChncm91cCwgJ2dyb3VwJywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByb2plY3RzKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChwcm9qZWN0LCAncHJvamVjdCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGNvbnRlbnQgdGhhdCB3YXMgcmV0cmlldmVkIGZyb20gdGhlIGZpbGUoKSA9PigpIC5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJzZWQgLSBpZiBjb250ZW50IGlzIGFscmVhZHkgcGFyc2VkIChleDogaW1wb3J0KVxuICAgKi9cbiAgcHJvY2Vzc0NvbnRlbnQgKGNvbnRlbnQsIHBhcnNlZCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRlbnQgPSB7XG4gICAgICAgIG1hcDoge30sXG4gICAgICAgIGlkczogW10sXG4gICAgICAgIHBhcmVudElkOiBudWxsLFxuICAgICAgICBzZWxlY3RlZElkOiBudWxsXG4gICAgICB9O1xuICAgICAgdGhpcy5ub3JtYWxpemVDb250ZW50KHBhcnNlZCA/IGNvbnRlbnQgOiBKU09OLnBhcnNlKGNvbnRlbnQpLCAnZ3JvdXAnKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkQ29udGVudCAoKSB7XG4gICAgdGhpcy5maWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQoY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLmNvbnRlbnQubWFwW2lkXS5wYXJlbnRJZCA9PT0gdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlbm9ybWFsaXplQ29udGVudCh0aGlzLmNvbnRlbnQubWFwW3BhcmVudEdyb3VwSWRdKTtcblxuICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeShub3JtYWxpemVkLCBudWxsLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGxlZ2FjeUNvbnRlbnQgLSBsZWdhY3kgZGF0YWJhc2Ugb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGEgbm9ybWFsaXplZCBzdWJDb250ZW50XG4gICAqL1xuICB0cmFuc2Zvcm1MZWdhY3lDb250ZW50IChsZWdhY3lDb250ZW50KSB7XG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuICAgIGxlZ2FjeUNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgY29udGVudC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgIHNvcnRCeTogaXRlbS5zb3J0QnksXG4gICAgICAgICAgaWNvbjogaXRlbS5pY29uLFxuICAgICAgICAgIC4uLnRoaXMudHJhbnNmb3JtTGVnYWN5Q29udGVudChpdGVtLmxpc3QpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXRlbS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgY29udGVudC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgcGF0aHM6IGl0ZW0ucGF0aHMsXG4gICAgICAgICAgaWNvbjogaXRlbS5pY29uXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlYWRMZWdhY3lDb250ZW50ICgpIHtcbiAgICB0aGlzLmxlZ2FjeUZpbGUucmVhZCh0cnVlKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGVnYWN5Q29udGVudCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSB0aGlzLnRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQobGVnYWN5Q29udGVudC5yb290KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29udGVudChuZXdDb250ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5zYXZlQ29udGVudCgpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1lcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmFkIGxlZ2FjeSBkYXRhYmFzZSBjb250ZW50LidcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGltcG9ydENvbnRlbnQgKCkge1xuICAgIGNvbnN0IExFR0FDWV9EQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICBMRUdBQ1lfREFUQUJBU0VfRklMRVxuICAgICk7XG4gICAgdGhpcy5sZWdhY3lGaWxlID0gbmV3IEZpbGUoTEVHQUNZX0RCX0ZJTEUpO1xuXG4gICAgdGhpcy5sZWdhY3lGaWxlXG4gICAgICAuZXhpc3RzKClcbiAgICAgIC50aGVuKGV4aXN0cyA9PiAoZXhpc3RzID8gdGhpcy5yZWFkTGVnYWN5Q29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSkpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWVycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ05vIGxlZ2FjeSBkYXRhYmFzZSBmaWxlIGZvdW5kLidcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0ICgpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVLZXkgPSBhdG9tLmdldFN0YXRlS2V5KGF0b20ucHJvamVjdC5nZXRQYXRocygpKTtcblxuICAgIHRoaXMuY29udGVudC5pZHMuc29tZShpZCA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm1hcFtpZF07XG5cbiAgICAgIGlmIChjb250ZW50LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFN0YXRlS2V5ID09PSBhdG9tLmdldFN0YXRlS2V5KGNvbnRlbnQubW9kZWwucGF0aHMpKSB7XG4gICAgICAgIGNvbnRlbnQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGlkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBvbmVUaW1lIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkQ2hhbmdlIChjYWxsYmFjaywgb25lVGltZSkge1xuICAgIGlmIChvbmVUaW1lKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub25jZSgnZGlkLWNoYW5nZS1jb250ZW50JywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWNoYW5nZS1jb250ZW50JywgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkRXJyb3IgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtZXJyb3InLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YWJhc2U7XG4iXX0=