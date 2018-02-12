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
      expanded: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwic3RhdGUiLCJpbnN0YW5jZSIsImRpc3Bvc2FibGVzIiwiZW1pdHRlciIsImxvYWRpbmciLCJjb250ZW50IiwiZW1pdCIsIkNIQU5HRV9DT05URU5UIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiREJfRklMRSIsImpvaW4iLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwiZXZlbnRzIiwiZXZlbnQiLCJwYXRoIiwiYWN0aW9uIiwiTU9ESUZJRUQiLCJSRU5BTUVEIiwicmVhZENvbnRlbnQiLCJERUxFVEVEIiwib2xkUGF0aCIsInVuZGVmaW5lZCIsInVwZGF0ZSIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJhZGQiLCJleGlzdHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY2F0Y2giLCJFUlJPUiIsInR5cGUiLCJkZXNjcmlwdGlvbiIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplciIsImRhdGEiLCJvcGVuRmlsZSIsIndvcmtzcGFjZSIsIm9wZW4iLCJjcmVhdGVEYXRhYmFzZSIsImNyZWF0ZSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdyb3VwcyIsInByb2plY3RzIiwicmVjb3ZlckRhdGFiYXNlIiwiZGVub3JtYWxpemVDb250ZW50IiwicGFyZW50R3JvdXAiLCJkZW5vcm1hbGl6ZWQiLCJtb2RlbCIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkSWQiLCJjaGlsZCIsIm1hcCIsInB1c2giLCJub3JtYWxpemVDb250ZW50IiwicGFyZW50SWQiLCJzdWJDb250ZW50IiwiaWQiLCJleHBhbmRlZCIsImlkcyIsImdyb3VwIiwicHJvamVjdCIsInByb2Nlc3NDb250ZW50IiwicGFyc2VkIiwic2VsZWN0ZWRJZCIsInBhcnNlIiwibWVzc2FnZSIsInJlYWQiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJmaW5kIiwibm9ybWFsaXplZCIsInRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQiLCJsZWdhY3lDb250ZW50IiwiaXRlbSIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwiaW5jbHVkZXMiLCJsaXN0IiwicGF0aHMiLCJyZWFkTGVnYWN5Q29udGVudCIsImxlZ2FjeUZpbGUiLCJuZXdDb250ZW50Iiwicm9vdCIsImUiLCJNRVNTQUdFUyIsIkVNSVRURVIiLCJCQURfTEVHQUNZX0NPTlRFTlQiLCJpbXBvcnRDb250ZW50IiwiTEVHQUNZX0RCX0ZJTEUiLCJnZXRDb25maWdEaXJQYXRoIiwiTk9fTEVHQUNZX0RCIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsImN1cnJlbnRTdGF0ZUtleSIsImdldFN0YXRlS2V5IiwiZ2V0UGF0aHMiLCJzb21lIiwic2VsZWN0ZWQiLCJvbkRpZENoYW5nZSIsImNhbGxiYWNrIiwib25lVGltZSIsIm9uY2UiLCJvbiIsIm9uRGlkRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBUUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsUSxHQUFOLE1BQU1BLFFBQU4sQ0FBZTs7QUFHYjs7Ozs7QUFLQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixRQUFJRixTQUFTRyxRQUFiLEVBQXVCO0FBQ3JCLGFBQU9ILFNBQVNHLFFBQWhCO0FBQ0Q7QUFDREgsYUFBU0csUUFBVCxHQUFvQixJQUFwQjs7QUFFQSxTQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxtQkFBZjs7QUFFQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxRQUFJSixLQUFKLEVBQVc7QUFDVCxXQUFLSyxPQUFMLEdBQWVMLEtBQWY7QUFDQSxXQUFLRyxPQUFMLENBQWFHLElBQWIsQ0FBa0IsY0FBUUMsY0FBMUIsRUFBMEMsS0FBS0YsT0FBL0M7QUFDRDtBQUNGOztBQUVEOzs7OztBQUtBRyxZQUFXO0FBQ1QsMEJBQU8sb0JB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QnlFLFFBQS9CO0FBQ0Q7QUF2WVksQztrQkEwWUE5RyxRIiwiZmlsZSI6ImRhdGFiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1pdHRlciwgRmlsZSwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgd2F0Y2hQYXRoIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuL2RldmxvZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREVTRVJJQUxJWkVSLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRSxcbiAgQUNUSU9OLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcblxuLyoqXG4gKiBBIHNpbmdsZXRvbiBjbGFzcyByZXByZXNlbnRpbmcgYWxsIHJlbGF0ZWQgb3BlcmF0aW9uc1xuICogd2l0aCB0aGUgY29udGVudCBtYW5hZ2VtZW50LlxuICovXG5jbGFzcyBEYXRhYmFzZSB7XG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gbGFzdCBzdGF0ZSBmcm9tIHByZXZpb3VzIEF0b20gaW5zdGFuY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdGF0ZSkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIGlmIChzdGF0ZSkge1xuICAgICAgdGhpcy5jb250ZW50ID0gc3RhdGU7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkNIQU5HRV9DT05URU5ULCB0aGlzLmNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZXZsb2coJ2RhdGFiYXNlIGRlc3Ryb3llZCcpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIERhdGFiYXNlLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGluaXRpYWxpemUgKCkge1xuICAgIGNvbnN0IERCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICByZXR1cm4gd2F0Y2hQYXRoKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIHt9LFxuICAgICAgZXZlbnRzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5NT0RJRklFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50LnBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uREVMRVRFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50Lm9sZFBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICAgIC50aGVuKHBhdGhXYXRjaGVyID0+IHtcbiAgICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHBhdGhXYXRjaGVyKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGUuZXhpc3RzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZXhpc3RzID0+IChleGlzdHMgPyB0aGlzLnJlYWRDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm8gZGF0YWJhc2UgZmlsZSB3YXMgZm91bmQuJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHsgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsIGRhdGE6IHRoaXMuY29udGVudCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIG9wZW5GaWxlICgpIHtcbiAgICBjb25zdCBEQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIERBVEFCQVNFX0ZJTEVcbiAgICApO1xuXG4gICAgaWYgKCFEQl9GSUxFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihEQl9GSUxFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gZXh0ZXJuYWwgY2hhbmdlcyB0byB0aGUgZGF0YWJhc2VcbiAgICogZmlsZSBleGlzdHMgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkga25vdyB3aGF0IGhhcyBiZWVuIGNoYW5nZWQuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHVwZGF0ZSAoKSB7XG4gICAgZGV2bG9nKCd1cGRhdGUnKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkNIQU5HRV9DT05URU5ULCB0aGlzLmNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNyZWF0ZURhdGFiYXNlICgpIHtcbiAgICBkZXZsb2coJ2NyZWF0ZWQnKTtcbiAgICB0aGlzLmZpbGVcbiAgICAgIC5jcmVhdGUoKVxuICAgICAgLnRoZW4oKCkgPT5cbiAgICAgICAgdGhpcy5maWxlLndyaXRlKEpTT04uc3RyaW5naWZ5KHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH0sIG51bGwsIDIpKVxuICAgICAgKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5yZWFkQ29udGVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWNvdmVyRGF0YWJhc2UgKCkge1xuICAgIGRldmxvZygncmVjb3ZlcmVkJyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50R3JvdXAgLSBjdXJyZW50IHBhcmVudCBncm91cCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlbm9ybWFsaXplZCBvYmplY3QgY29udGVudCB0byBiZSBzYXZlZFxuICAgKi9cbiAgZGVub3JtYWxpemVDb250ZW50IChwYXJlbnRHcm91cCkge1xuICAgIGNvbnN0IGRlbm9ybWFsaXplZCA9IHtcbiAgICAgIC4uLnBhcmVudEdyb3VwLm1vZGVsLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIHByb2plY3RzOiBbXVxuICAgIH07XG5cbiAgICBwYXJlbnRHcm91cC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNvbnRlbnQubWFwW2NoaWxkSWRdO1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLmdyb3Vwcy5wdXNoKHRoaXMuZGVub3JtYWxpemVDb250ZW50KGNoaWxkKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaGlsZC50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLnByb2plY3RzLnB1c2goeyAuLi5jaGlsZC5tb2RlbCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkZW5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSBjdXN0b20gbWFkZSBub3JtYWxpenIgdG8gZml0IHRoZSBwdXJwb3NlLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEB0b2RvIG5vcm1hbGl6ZSBtb2RlbCBjb250ZW50IHN1Y2ggYXMgcHJvamVjdCAtPiBwYXRoc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIGEgcmVwcmVzZW50YXRpb24gb2YgYSBkZW5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBkZXNjcmliZXMgaWYgY29udGVudCBpcyBhIGdyb3VwIG9yIGEgcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gaWYgdGhlIGNvbnRlbnQgYmVsb25ncyB0byBhIGdyb3VwLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqL1xuICBub3JtYWxpemVDb250ZW50IChjb250ZW50LCB0eXBlLCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IHsgZ3JvdXBzLCBwcm9qZWN0cywgLi4ubW9kZWwgfSA9IGNvbnRlbnQ7XG5cbiAgICBjb25zdCBzdWJDb250ZW50ID0ge1xuICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgIHR5cGUsXG4gICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICBtb2RlbCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcblxuICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0gPSBzdWJDb250ZW50O1xuICAgIHRoaXMuY29udGVudC5pZHMucHVzaChzdWJDb250ZW50LmlkKTtcblxuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQoZ3JvdXAsICdncm91cCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcm9qZWN0cykge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQocHJvamVjdCwgJ3Byb2plY3QnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgLSBjb250ZW50IHRoYXQgd2FzIHJldHJpZXZlZCBmcm9tIHRoZSBmaWxlKCkgPT4oKSAuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyc2VkIC0gaWYgY29udGVudCBpcyBhbHJlYWR5IHBhcnNlZCAoZXg6IGltcG9ydClcbiAgICovXG4gIHByb2Nlc3NDb250ZW50IChjb250ZW50LCBwYXJzZWQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZW50ID0ge1xuICAgICAgICBtYXA6IHt9LFxuICAgICAgICBpZHM6IFtdLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWRJZDogbnVsbFxuICAgICAgfTtcbiAgICAgIHRoaXMubm9ybWFsaXplQ29udGVudChwYXJzZWQgPyBjb250ZW50IDogSlNPTi5wYXJzZShjb250ZW50KSwgJ2dyb3VwJyk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNhdGNoIChtZXNzYWdlKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkQ29udGVudCAoKSB7XG4gICAgdGhpcy5maWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQoY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLmNvbnRlbnQubWFwW2lkXS5wYXJlbnRJZCA9PT0gdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlbm9ybWFsaXplQ29udGVudCh0aGlzLmNvbnRlbnQubWFwW3BhcmVudEdyb3VwSWRdKTtcblxuICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeShub3JtYWxpemVkLCBudWxsLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGxlZ2FjeUNvbnRlbnQgLSBsZWdhY3kgZGF0YWJhc2Ugb2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGEgbm9ybWFsaXplZCBzdWJDb250ZW50XG4gICAqL1xuICB0cmFuc2Zvcm1MZWdhY3lDb250ZW50IChsZWdhY3lDb250ZW50KSB7XG4gICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuICAgIGxlZ2FjeUNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgY29udGVudC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgIHNvcnRCeTogaXRlbS5zb3J0QnksXG4gICAgICAgICAgaWNvbjogaWNvbnMuZmluZChpY29uID0+IGl0ZW0uaWNvbi5pbmNsdWRlcyhpY29uKSkgfHwgJycsXG4gICAgICAgICAgLi4udGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGl0ZW0ubGlzdClcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBjb250ZW50LnByb2plY3RzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICBwYXRoczogaXRlbS5wYXRocyxcbiAgICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkTGVnYWN5Q29udGVudCAoKSB7XG4gICAgdGhpcy5sZWdhY3lGaWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGxlZ2FjeUNvbnRlbnQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICAgICAgICBjb25zdCBuZXdDb250ZW50ID0gdGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGxlZ2FjeUNvbnRlbnQucm9vdCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQobmV3Q29udGVudCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2F2ZUNvbnRlbnQoKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuRVJST1IsIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBNRVNTQUdFUy5FTUlUVEVSLkJBRF9MRUdBQ1lfQ09OVEVOVFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaW1wb3J0Q29udGVudCAoKSB7XG4gICAgY29uc3QgTEVHQUNZX0RCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmdldENvbmZpZ0RpclBhdGgoKSxcbiAgICAgIExFR0FDWV9EQVRBQkFTRV9GSUxFXG4gICAgKTtcbiAgICB0aGlzLmxlZ2FjeUZpbGUgPSBuZXcgRmlsZShMRUdBQ1lfREJfRklMRSk7XG5cbiAgICB0aGlzLmxlZ2FjeUZpbGVcbiAgICAgIC5leGlzdHMoKVxuICAgICAgLnRoZW4oZXhpc3RzID0+IChleGlzdHMgPyB0aGlzLnJlYWRMZWdhY3lDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuRVJST1IsIHtcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgZGVzY3JpcHRpb246IE1FU1NBR0VTLkVNSVRURVIuTk9fTEVHQUNZX0RCXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCAoKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlS2V5ID0gYXRvbS5nZXRTdGF0ZUtleShhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSk7XG5cbiAgICB0aGlzLmNvbnRlbnQuaWRzLnNvbWUoaWQgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC5tYXBbaWRdO1xuXG4gICAgICBpZiAoY29udGVudC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZUtleSA9PT0gYXRvbS5nZXRTdGF0ZUtleShjb250ZW50Lm1vZGVsLnBhdGhzKSkge1xuICAgICAgICBjb250ZW50LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNlbGVjdGVkSWQgPSBpZDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb25lVGltZSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZENoYW5nZSAoY2FsbGJhY2ssIG9uZVRpbWUpIHtcbiAgICBpZiAob25lVGltZSkge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uY2UoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbihFTUlUVEVSLkNIQU5HRV9DT05URU5ULCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRFcnJvciAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oRU1JVFRFUi5FUlJPUiwgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFiYXNlO1xuIl19