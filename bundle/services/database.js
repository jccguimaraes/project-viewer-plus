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
    (0, _devlog2.default)(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`));
    (0, _devlog2.default)(_base.DATABASE_FILE);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwic3RhdGUiLCJpbnN0YW5jZSIsImRpc3Bvc2FibGVzIiwiZW1pdHRlciIsImxvYWRpbmciLCJjb250ZW50IiwiZW1pdCIsIkNIQU5HRV9DT05URU5UIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiYXRvbSIsImNvbmZpZyIsImdldCIsIkRCX0ZJTEUiLCJqb2luIiwiZXZlbnRzIiwiZXZlbnQiLCJwYXRoIiwiYWN0aW9uIiwiTU9ESUZJRUQiLCJSRU5BTUVEIiwicmVhZENvbnRlbnQiLCJERUxFVEVEIiwib2xkUGF0aCIsInVuZGVmaW5lZCIsInVwZGF0ZSIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJhZGQiLCJleGlzdHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY2F0Y2giLCJFUlJPUiIsInR5cGUiLCJkZXNjcmlwdGlvbiIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplciIsImRhdGEiLCJvcGVuRmlsZSIsIndvcmtzcGFjZSIsIm9wZW4iLCJjcmVhdGVEYXRhYmFzZSIsImNyZWF0ZSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdyb3VwcyIsInByb2plY3RzIiwicmVjb3ZlckRhdGFiYXNlIiwiZGVub3JtYWxpemVDb250ZW50IiwicGFyZW50R3JvdXAiLCJkZW5vcm1hbGl6ZWQiLCJtb2RlbCIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkSWQiLCJjaGlsZCIsIm1hcCIsInB1c2giLCJub3JtYWxpemVDb250ZW50IiwicGFyZW50SWQiLCJzdWJDb250ZW50IiwiaWQiLCJleHBhbmRlZCIsImlkcyIsImdyb3VwIiwicHJvamVjdCIsInByb2Nlc3NDb250ZW50IiwicGFyc2VkIiwic2VsZWN0ZWRJZCIsInBhcnNlIiwibWVzc2FnZSIsInJlYWQiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJmaW5kIiwibm9ybWFsaXplZCIsInRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQiLCJsZWdhY3lDb250ZW50IiwiaXRlbSIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwiaW5jbHVkZXMiLCJsaXN0IiwicGF0aHMiLCJyZWFkTGVnYWN5Q29udGVudCIsImxlZ2FjeUZpbGUiLCJuZXdDb250ZW50Iiwicm9vdCIsImUiLCJNRVNTQUdFUyIsIkVNSVRURVIiLCJCQURfTEVHQUNZX0NPTlRFTlQiLCJpbXBvcnRDb250ZW50IiwiTEVHQUNZX0RCX0ZJTEUiLCJnZXRDb25maWdEaXJQYXRoIiwiTk9fTEVHQUNZX0RCIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsImN1cnJlbnRTdGF0ZUtleSIsImdldFN0YXRlS2V5IiwiZ2V0UGF0aHMiLCJzb21lIiwic2VsZWN0ZWQiLCJvbkRpZENoYW5nZSIsImNhbGxiYWNrIiwib25lVGltZSIsIm9uY2UiLCJvbiIsIm9uRGlkRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBUUE7Ozs7Ozs7O0FBRUE7Ozs7SUFJTUEsUSxHQUFOLE1BQU1BLFFBQU4sQ0FBZTs7QUFHYjs7Ozs7QUFLQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixRQUFJRixTQUFTRyxRQUFiLEVBQXVCO0FBQ3JCLGFBQU9ILFNBQVNHLFFBQWhCO0FBQ0Q7QUFDREgsYUFBU0csUUFBVCxHQUFvQixJQUFwQjs7QUFFQSxTQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxtQkFBZjs7QUFFQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjs7QUFFQSxRQUFJSixLQUFKLEVBQVc7QUFDVCxXQUFLSyxPQUFMLEdBQWVMLEtBQWY7QUFDQSxXQUFLRyxPQUFMLENBQWFHLElBQWIsQ0FBa0IsY0FBUUMsY0FBMUIsRUFBMEMsS0FBS0YsT0FBL0M7QUFDRDtBQUNGOztBQUVEOzs7OztBQUtBRyxZQUFXO0FBQ1QsMEJBQU8sb0JB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WUosUUFBWixFQUFzQjtBQUNwQixTQUFLekcsT0FBTCxDQUFhNEcsRUFBYixDQUFnQixjQUFRNUUsS0FBeEIsRUFBK0J5RSxRQUEvQjtBQUNEO0FBellZLEM7a0JBNFlBOUcsUSIsImZpbGUiOiJkYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtaXR0ZXIsIEZpbGUsIENvbXBvc2l0ZURpc3Bvc2FibGUsIHdhdGNoUGF0aCB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi9kZXZsb2cnO1xuaW1wb3J0IHtcbiAgUExVR0lOX05BTUUsXG4gIERFU0VSSUFMSVpFUixcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEUsXG4gIEFDVElPTixcbiAgRU1JVFRFUlxufSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBpY29ucyBmcm9tICcuLy4uL2NvbnN0YW50cy9pY29ucyc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGxhc3Qgc3RhdGUgZnJvbSBwcmV2aW91cyBBdG9tIGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc3RhdGUpIHtcbiAgICBpZiAoRGF0YWJhc2UuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBEYXRhYmFzZS5pbnN0YW5jZTtcbiAgICB9XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG5cbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIHRoaXMuY29udGVudCA9IHN0YXRlO1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5DSEFOR0VfQ09OVEVOVCwgdGhpcy5jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgZGV2bG9nKCdkYXRhYmFzZSBkZXN0cm95ZWQnKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpbml0aWFsaXplICgpIHtcbiAgICBkZXZsb2coYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSk7XG4gICAgZGV2bG9nKERBVEFCQVNFX0ZJTEUpO1xuICAgIGNvbnN0IERCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICByZXR1cm4gd2F0Y2hQYXRoKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIHt9LFxuICAgICAgZXZlbnRzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5NT0RJRklFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50LnBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uREVMRVRFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50Lm9sZFBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIClcbiAgICAgIC50aGVuKHBhdGhXYXRjaGVyID0+IHtcbiAgICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHBhdGhXYXRjaGVyKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGUuZXhpc3RzKCk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oZXhpc3RzID0+IChleGlzdHMgPyB0aGlzLnJlYWRDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm8gZGF0YWJhc2UgZmlsZSB3YXMgZm91bmQuJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHsgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsIGRhdGE6IHRoaXMuY29udGVudCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIG9wZW5GaWxlICgpIHtcbiAgICBjb25zdCBEQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIERBVEFCQVNFX0ZJTEVcbiAgICApO1xuXG4gICAgaWYgKCFEQl9GSUxFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihEQl9GSUxFKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gZXh0ZXJuYWwgY2hhbmdlcyB0byB0aGUgZGF0YWJhc2VcbiAgICogZmlsZSBleGlzdHMgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkga25vdyB3aGF0IGhhcyBiZWVuIGNoYW5nZWQuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHVwZGF0ZSAoKSB7XG4gICAgZGV2bG9nKCd1cGRhdGUnKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkNIQU5HRV9DT05URU5ULCB0aGlzLmNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNyZWF0ZURhdGFiYXNlICgpIHtcbiAgICBkZXZsb2coJ2NyZWF0ZWQnKTtcbiAgICB0aGlzLmZpbGVcbiAgICAgIC5jcmVhdGUoKVxuICAgICAgLnRoZW4oKCkgPT5cbiAgICAgICAgdGhpcy5maWxlLndyaXRlKEpTT04uc3RyaW5naWZ5KHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH0sIG51bGwsIDIpKVxuICAgICAgKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5yZWFkQ29udGVudCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWNvdmVyRGF0YWJhc2UgKCkge1xuICAgIGRldmxvZygncmVjb3ZlcmVkJyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50R3JvdXAgLSBjdXJyZW50IHBhcmVudCBncm91cCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlbm9ybWFsaXplZCBvYmplY3QgY29udGVudCB0byBiZSBzYXZlZFxuICAgKi9cbiAgZGVub3JtYWxpemVDb250ZW50IChwYXJlbnRHcm91cCkge1xuICAgIGNvbnN0IGRlbm9ybWFsaXplZCA9IHtcbiAgICAgIC4uLnBhcmVudEdyb3VwLm1vZGVsLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIHByb2plY3RzOiBbXVxuICAgIH07XG5cbiAgICBwYXJlbnRHcm91cC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNvbnRlbnQubWFwW2NoaWxkSWRdO1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLmdyb3Vwcy5wdXNoKHRoaXMuZGVub3JtYWxpemVDb250ZW50KGNoaWxkKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaGlsZC50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLnByb2plY3RzLnB1c2goeyAuLi5jaGlsZC5tb2RlbCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkZW5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSBjdXN0b20gbWFkZSBub3JtYWxpenIgdG8gZml0IHRoZSBwdXJwb3NlLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEB0b2RvIG5vcm1hbGl6ZSBtb2RlbCBjb250ZW50IHN1Y2ggYXMgcHJvamVjdCAtPiBwYXRoc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIGEgcmVwcmVzZW50YXRpb24gb2YgYSBkZW5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBkZXNjcmliZXMgaWYgY29udGVudCBpcyBhIGdyb3VwIG9yIGEgcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gaWYgdGhlIGNvbnRlbnQgYmVsb25ncyB0byBhIGdyb3VwLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqL1xuICBub3JtYWxpemVDb250ZW50IChjb250ZW50LCB0eXBlLCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IHsgZ3JvdXBzLCBwcm9qZWN0cywgLi4ubW9kZWwgfSA9IGNvbnRlbnQ7XG5cbiAgICBjb25zdCBzdWJDb250ZW50ID0ge1xuICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgIHR5cGUsXG4gICAgICBleHBhbmRlZDogdHJ1ZSxcbiAgICAgIG1vZGVsLFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXSA9IHN1YkNvbnRlbnQ7XG4gICAgdGhpcy5jb250ZW50Lmlkcy5wdXNoKHN1YkNvbnRlbnQuaWQpO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChncm91cCwgJ2dyb3VwJywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByb2plY3RzKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChwcm9qZWN0LCAncHJvamVjdCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGNvbnRlbnQgdGhhdCB3YXMgcmV0cmlldmVkIGZyb20gdGhlIGZpbGUoKSA9PigpIC5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJzZWQgLSBpZiBjb250ZW50IGlzIGFscmVhZHkgcGFyc2VkIChleDogaW1wb3J0KVxuICAgKi9cbiAgcHJvY2Vzc0NvbnRlbnQgKGNvbnRlbnQsIHBhcnNlZCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRlbnQgPSB7XG4gICAgICAgIG1hcDoge30sXG4gICAgICAgIGlkczogW10sXG4gICAgICAgIHBhcmVudElkOiBudWxsLFxuICAgICAgICBzZWxlY3RlZElkOiBudWxsXG4gICAgICB9O1xuICAgICAgdGhpcy5ub3JtYWxpemVDb250ZW50KHBhcnNlZCA/IGNvbnRlbnQgOiBKU09OLnBhcnNlKGNvbnRlbnQpLCAnZ3JvdXAnKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuRVJST1IsIHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogbWVzc2FnZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlYWRDb250ZW50ICgpIHtcbiAgICB0aGlzLmZpbGUucmVhZCh0cnVlKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzQ29udGVudChjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBzYXZlQ29udGVudCAoKSB7XG4gICAgY29uc3QgcGFyZW50R3JvdXBJZCA9IHRoaXMuY29udGVudC5pZHMuZmluZChcbiAgICAgIGlkID0+IHRoaXMuY29udGVudC5tYXBbaWRdLnBhcmVudElkID09PSB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHRoaXMuZGVub3JtYWxpemVDb250ZW50KHRoaXMuY29udGVudC5tYXBbcGFyZW50R3JvdXBJZF0pO1xuXG4gICAgdGhpcy5maWxlLndyaXRlKEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWQsIG51bGwsIDIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gbGVnYWN5Q29udGVudCAtIGxlZ2FjeSBkYXRhYmFzZSBvYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gYSBub3JtYWxpemVkIHN1YkNvbnRlbnRcbiAgICovXG4gIHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgKGxlZ2FjeUNvbnRlbnQpIHtcbiAgICBjb25zdCBjb250ZW50ID0ge1xuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIHByb2plY3RzOiBbXVxuICAgIH07XG4gICAgbGVnYWN5Q29udGVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBjb250ZW50Lmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgICAgc29ydEJ5OiBpdGVtLnNvcnRCeSxcbiAgICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJyxcbiAgICAgICAgICAuLi50aGlzLnRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoaXRlbS5saXN0KVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGNvbnRlbnQucHJvamVjdHMucHVzaCh7XG4gICAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBpdGVtLnBhdGhzLFxuICAgICAgICAgIGljb246IGljb25zLmZpbmQoaWNvbiA9PiBpdGVtLmljb24uaW5jbHVkZXMoaWNvbikpIHx8ICcnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlYWRMZWdhY3lDb250ZW50ICgpIHtcbiAgICB0aGlzLmxlZ2FjeUZpbGUucmVhZCh0cnVlKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbGVnYWN5Q29udGVudCA9IEpTT04ucGFyc2UoY29udGVudCk7XG4gICAgICAgIGNvbnN0IG5ld0NvbnRlbnQgPSB0aGlzLnRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQobGVnYWN5Q29udGVudC5yb290KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ29udGVudChuZXdDb250ZW50LCB0cnVlKTtcbiAgICAgICAgdGhpcy5zYXZlQ29udGVudCgpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUiwge1xuICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgZGVzY3JpcHRpb246IE1FU1NBR0VTLkVNSVRURVIuQkFEX0xFR0FDWV9DT05URU5UXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBpbXBvcnRDb250ZW50ICgpIHtcbiAgICBjb25zdCBMRUdBQ1lfREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLFxuICAgICAgTEVHQUNZX0RBVEFCQVNFX0ZJTEVcbiAgICApO1xuICAgIHRoaXMubGVnYWN5RmlsZSA9IG5ldyBGaWxlKExFR0FDWV9EQl9GSUxFKTtcblxuICAgIHRoaXMubGVnYWN5RmlsZVxuICAgICAgLmV4aXN0cygpXG4gICAgICAudGhlbihleGlzdHMgPT4gKGV4aXN0cyA/IHRoaXMucmVhZExlZ2FjeUNvbnRlbnQoKSA6IFByb21pc2UucmVqZWN0KCkpKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUiwge1xuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogTUVTU0FHRVMuRU1JVFRFUi5OT19MRUdBQ1lfREJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0ICgpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVLZXkgPSBhdG9tLmdldFN0YXRlS2V5KGF0b20ucHJvamVjdC5nZXRQYXRocygpKTtcblxuICAgIHRoaXMuY29udGVudC5pZHMuc29tZShpZCA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm1hcFtpZF07XG5cbiAgICAgIGlmIChjb250ZW50LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFN0YXRlS2V5ID09PSBhdG9tLmdldFN0YXRlS2V5KGNvbnRlbnQubW9kZWwucGF0aHMpKSB7XG4gICAgICAgIGNvbnRlbnQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGlkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBvbmVUaW1lIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkQ2hhbmdlIChjYWxsYmFjaywgb25lVGltZSkge1xuICAgIGlmIChvbmVUaW1lKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub25jZShFTUlUVEVSLkNIQU5HRV9DT05URU5ULCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uKEVNSVRURVIuQ0hBTkdFX0NPTlRFTlQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZEVycm9yIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbihFTUlUVEVSLkVSUk9SLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YWJhc2U7XG4iXX0=