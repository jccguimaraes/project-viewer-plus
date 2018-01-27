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

    this.disposables.add(this.emitter);
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
    this.file.create().then(() => this.file.write(JSON.stringify({ groups: [], projects: [] }, null, 2)));
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
   */
  processContent(content) {
    try {
      this.content = {
        map: {},
        ids: [],
        parentId: null,
        selectedId: null
      };
      this.normalizeContent(JSON.parse(content), 'group');

      this.update();
    } catch (e) {
      this.emitter.emit('did-error', {
        type: 'info',
        description: e
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGQiLCJkZXN0cm95IiwiZGlzcG9zZSIsImluaXRpYWxpemUiLCJEQl9GSUxFIiwiam9pbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJldmVudHMiLCJldmVudCIsInBhdGgiLCJhY3Rpb24iLCJNT0RJRklFRCIsIlJFTkFNRUQiLCJyZWFkQ29udGVudCIsIkRFTEVURUQiLCJvbGRQYXRoIiwiY29udGVudCIsInVuZGVmaW5lZCIsInVwZGF0ZSIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJleGlzdHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY2F0Y2giLCJlbWl0IiwidHlwZSIsImRlc2NyaXB0aW9uIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVyIiwiZGF0YSIsIm9wZW5GaWxlIiwid29ya3NwYWNlIiwib3BlbiIsImNyZWF0ZURhdGFiYXNlIiwiY3JlYXRlIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJyZWNvdmVyRGF0YWJhc2UiLCJkZW5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRHcm91cCIsImRlbm9ybWFsaXplZCIsIm1vZGVsIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGRJZCIsImNoaWxkIiwibWFwIiwicHVzaCIsIm5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRJZCIsInN1YkNvbnRlbnQiLCJpZCIsImlkcyIsImdyb3VwIiwicHJvamVjdCIsInByb2Nlc3NDb250ZW50Iiwic2VsZWN0ZWRJZCIsInBhcnNlIiwiZSIsInJlYWQiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJmaW5kIiwibm9ybWFsaXplZCIsInNldEluaXRpYWxTZWxlY3RlZFByb2plY3QiLCJjdXJyZW50U3RhdGVLZXkiLCJnZXRTdGF0ZUtleSIsImdldFBhdGhzIiwic29tZSIsInBhdGhzIiwic2VsZWN0ZWQiLCJvbkRpZENoYW5nZSIsImNhbGxiYWNrIiwib25lVGltZSIsIm9uY2UiLCJvbiIsIm9uRGlkRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQU9BOzs7O0lBSU1BLFEsR0FBTixNQUFNQSxRQUFOLENBQWU7O0FBR2I7Ozs7O0FBS0FDLGdCQUFlO0FBQ2IsUUFBSUQsU0FBU0UsUUFBYixFQUF1QjtBQUNyQixhQUFPRixTQUFTRSxRQUFoQjtBQUNEO0FBQ0RGLGFBQVNFLFFBQVQsR0FBb0IsSUFBcEI7O0FBRUEsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsbUJBQWY7O0FBRUEsU0FBS0QsV0FBTCxDQUFpQkUsR0FBakIsQ0FBcUIsS0FBS0QsT0FBMUI7QUFDRDs7QUFFRDs7Ozs7QUFLQUUsWUFBVztBQUNULDBCQUFPLG9CQUFQO0FBQ0EsU0FBS0gsV0FBTCxDQUFpQkksT0FBakI7QUFDQVAsYUFBU0UsUUFBVCxHQUFvQixJQUFwQjtBQUNEOztBQUVEOzs7Ozs7QUFNQU0sZUFBYztBQUNaLFVBQU1DLFVBQVUsZUFBS0MsSUFBTCxDQUNkQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBaUIsR0FBRCxpQkFBZSxxQkFBL0IsQ0FEYyxzQkFBaEI7O0FBS0EsV0FBTyxxQkFDTEYsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWlCLEdBQUQsaUJBQWUscUJBQS9CLENBREssRUFFTCxFQUZLLEVBR0xDLFVBQVU7QUFDUixXQUFLLE1BQU1DLEtBQVgsSUFBb0JELE1BQXBCLEVBQTRCO0FBQzFCLFlBQ0dDLE1BQU1DLElBQU4sS0FBZVAsT0FBZixJQUEwQk0sTUFBTUUsTUFBTixLQUFpQixhQUFPQyxRQUFuRCxJQUNDSCxNQUFNRSxNQUFOLEtBQWlCLGFBQU9FLE9BQXhCLElBQW1DSixNQUFNQyxJQUFOLEtBQWVQLE9B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TUFBTTtBQUMxQixZQUFNeEMsVUFBVSxLQUFLQSxPQUFMLENBQWFtQyxHQUFiLENBQWlCSyxFQUFqQixDQUFoQjs7QUFFQSxVQUFJeEMsUUFBUVcsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUM1QixlQUFPLEtBQVA7QUFDRDs7QUFFRCxVQUFJMkMsb0JBQW9CbEUsS0FBS21FLFdBQUwsQ0FBaUJ2RCxRQUFROEIsS0FBUixDQUFjNEIsS0FBL0IsQ0FBeEIsRUFBK0Q7QUFDN0QxRCxnQkFBUTJELFFBQVIsR0FBbUIsSUFBbkI7QUFDQSxhQUFLM0QsT0FBTCxDQUFhNkMsVUFBYixHQUEwQkwsRUFBMUI7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDs7Ozs7OztBQU9Bb0IsY0FBYUMsUUFBYixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBS2pGLE9BQUwsQ0FBYWtGLElBQWIsQ0FBa0Isb0JBQWxCLEVBQXdDRixRQUF4QztBQUNELEtBRkQsTUFHSztBQUNILFdBQUtoRixPQUFMLENBQWFtRixFQUFiLENBQWdCLG9CQUFoQixFQUFzQ0gsUUFBdEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLaEYsT0FBTCxDQUFhbUYsRUFBYixDQUFnQixXQUFoQixFQUE2QkgsUUFBN0I7QUFDRDtBQXJUWSxDO2tCQXdUQXBGLFEiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vZGV2bG9nJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBERVNFUklBTElaRVIsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIEFDVElPTlxufSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBBIHNpbmdsZXRvbiBjbGFzcyByZXByZXNlbnRpbmcgYWxsIHJlbGF0ZWQgb3BlcmF0aW9uc1xuICogd2l0aCB0aGUgY29udGVudCBtYW5hZ2VtZW50LlxuICovXG5jbGFzcyBEYXRhYmFzZSB7XG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZXZsb2coJ2RhdGFiYXNlIGRlc3Ryb3llZCcpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIERhdGFiYXNlLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIHJldHVybiB3YXRjaFBhdGgoXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAge30sXG4gICAgICBldmVudHMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLk1PRElGSUVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQucGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVhZENvbnRlbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5ERUxFVEVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQub2xkUGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKVxuICAgICAgLnRoZW4ocGF0aFdhdGNoZXIgPT4ge1xuICAgICAgICB0aGlzLmZpbGUgPSBuZXcgRmlsZShEQl9GSUxFKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocGF0aFdhdGNoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlLmV4aXN0cygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGV4aXN0cyA9PiAoZXhpc3RzID8gdGhpcy5yZWFkQ29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSkpXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWVycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ05vIGRhdGFiYXNlIGZpbGUgd2FzIGZvdW5kLidcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7IGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLCBkYXRhOiB0aGlzLmNvbnRlbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBvcGVuRmlsZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIGlmICghREJfRklMRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oREJfRklMRSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGV4dGVybmFsIGNoYW5nZXMgdG8gdGhlIGRhdGFiYXNlXG4gICAqIGZpbGUgZXhpc3RzIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IGtub3cgd2hhdCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIGRldmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2UtY29udGVudCcsIHRoaXMuY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY3JlYXRlRGF0YWJhc2UgKCkge1xuICAgIGRldmxvZygnY3JlYXRlZCcpO1xuICAgIHRoaXMuZmlsZVxuICAgICAgLmNyZWF0ZSgpXG4gICAgICAudGhlbigoKSA9PlxuICAgICAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkoeyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfSwgbnVsbCwgMikpXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlY292ZXJEYXRhYmFzZSAoKSB7XG4gICAgZGV2bG9nKCdyZWNvdmVyZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRHcm91cCAtIGN1cnJlbnQgcGFyZW50IGdyb3VwIGNvbnRlbnRcbiAgICogQHJldHVybnMge09iamVjdH0gZGVub3JtYWxpemVkIG9iamVjdCBjb250ZW50IHRvIGJlIHNhdmVkXG4gICAqL1xuICBkZW5vcm1hbGl6ZUNvbnRlbnQgKHBhcmVudEdyb3VwKSB7XG4gICAgY29uc3QgZGVub3JtYWxpemVkID0ge1xuICAgICAgLi4ucGFyZW50R3JvdXAubW9kZWwsXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgcHJvamVjdHM6IFtdXG4gICAgfTtcblxuICAgIHBhcmVudEdyb3VwLmNoaWxkcmVuLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY29udGVudC5tYXBbY2hpbGRJZF07XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQuZ3JvdXBzLnB1c2godGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQoY2hpbGQpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNoaWxkLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQucHJvamVjdHMucHVzaCh7IC4uLmNoaWxkLm1vZGVsIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlbm9ybWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBtYWRlIG5vcm1hbGl6ciB0byBmaXQgdGhlIHB1cnBvc2UuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHRvZG8gbm9ybWFsaXplIG1vZGVsIGNvbnRlbnQgc3VjaCBhcyBwcm9qZWN0IC0+IHBhdGhzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50IC0gYSByZXByZXNlbnRhdGlvbiBvZiBhIGRlbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIGRlc2NyaWJlcyBpZiBjb250ZW50IGlzIGEgZ3JvdXAgb3IgYSBwcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSBpZiB0aGUgY29udGVudCBiZWxvbmdzIHRvIGEgZ3JvdXAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBjdXJyZW50IG5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICovXG4gIG5vcm1hbGl6ZUNvbnRlbnQgKGNvbnRlbnQsIHR5cGUsIHBhcmVudElkKSB7XG4gICAgY29uc3QgeyBncm91cHMsIHByb2plY3RzLCAuLi5tb2RlbCB9ID0gY29udGVudDtcblxuICAgIGNvbnN0IHN1YkNvbnRlbnQgPSB7XG4gICAgICBpZDogdXVpZCgpLFxuICAgICAgdHlwZSxcbiAgICAgIG1vZGVsLFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXSA9IHN1YkNvbnRlbnQ7XG4gICAgdGhpcy5jb250ZW50Lmlkcy5wdXNoKHN1YkNvbnRlbnQuaWQpO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChncm91cCwgJ2dyb3VwJywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByb2plY3RzKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChwcm9qZWN0LCAncHJvamVjdCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGNvbnRlbnQgdGhhdCB3YXMgcmV0cmlldmVkIGZyb20gdGhlIGZpbGUoKSA9PigpIC5cbiAgICovXG4gIHByb2Nlc3NDb250ZW50IChjb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGVudCA9IHtcbiAgICAgICAgbWFwOiB7fSxcbiAgICAgICAgaWRzOiBbXSxcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXG4gICAgICAgIHNlbGVjdGVkSWQ6IG51bGxcbiAgICAgIH07XG4gICAgICB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQoSlNPTi5wYXJzZShjb250ZW50KSwgJ2dyb3VwJyk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWVycm9yJywge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVhZENvbnRlbnQgKCkge1xuICAgIHRoaXMuZmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NDb250ZW50KGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNhdmVDb250ZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnRHcm91cElkID0gdGhpcy5jb250ZW50Lmlkcy5maW5kKFxuICAgICAgaWQgPT4gdGhpcy5jb250ZW50Lm1hcFtpZF0ucGFyZW50SWQgPT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gdGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQodGhpcy5jb250ZW50Lm1hcFtwYXJlbnRHcm91cElkXSk7XG5cbiAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZCwgbnVsbCwgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNldEluaXRpYWxTZWxlY3RlZFByb2plY3QgKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZUtleSA9IGF0b20uZ2V0U3RhdGVLZXkoYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkpO1xuXG4gICAgdGhpcy5jb250ZW50Lmlkcy5zb21lKGlkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubWFwW2lkXTtcblxuICAgICAgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50U3RhdGVLZXkgPT09IGF0b20uZ2V0U3RhdGVLZXkoY29udGVudC5tb2RlbC5wYXRocykpIHtcbiAgICAgICAgY29udGVudC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5zZWxlY3RlZElkID0gaWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9uZVRpbWUgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRDaGFuZ2UgKGNhbGxiYWNrLCBvbmVUaW1lKSB7XG4gICAgaWYgKG9uZVRpbWUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbmNlKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRFcnJvciAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1lcnJvcicsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZTtcbiJdfQ==