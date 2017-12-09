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
    this.file.create().then(() => this.file.write(JSON.stringify({
      groups: [],
      projects: []
    }, null, 2)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGQiLCJkZXN0cm95IiwiZGlzcG9zZSIsImluaXRpYWxpemUiLCJEQl9GSUxFIiwiam9pbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJldmVudHMiLCJldmVudCIsInBhdGgiLCJhY3Rpb24iLCJNT0RJRklFRCIsIlJFTkFNRUQiLCJyZWFkQ29udGVudCIsIkRFTEVURUQiLCJvbGRQYXRoIiwiY29udGVudCIsInVuZGVmaW5lZCIsInVwZGF0ZSIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJleGlzdHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY2F0Y2giLCJlbWl0IiwidHlwZSIsImRlc2NyaXB0aW9uIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVyIiwiZGF0YSIsImNyZWF0ZURhdGFiYXNlIiwiY3JlYXRlIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJyZWNvdmVyRGF0YWJhc2UiLCJkZW5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRHcm91cCIsImRlbm9ybWFsaXplZCIsIm1vZGVsIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGRJZCIsImNoaWxkIiwibWFwIiwicHVzaCIsIm5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRJZCIsInN1YkNvbnRlbnQiLCJpZCIsImlkcyIsImdyb3VwIiwicHJvamVjdCIsInByb2Nlc3NDb250ZW50Iiwic2VsZWN0ZWRJZCIsInBhcnNlIiwiZSIsInJlYWQiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJmaW5kIiwibm9ybWFsaXplZCIsInNldEluaXRpYWxTZWxlY3RlZFByb2plY3QiLCJjdXJyZW50U3RhdGVLZXkiLCJnZXRTdGF0ZUtleSIsImdldFBhdGhzIiwic29tZSIsInBhdGhzIiwic2VsZWN0ZWQiLCJvbkRpZENoYW5nZSIsImNhbGxiYWNrIiwib25lVGltZSIsIm9uY2UiLCJvbiIsIm9uRGlkRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFJQTs7OztJQUlNQSxRLEdBQU4sTUFBTUEsUUFBTixDQUFlOztBQUliOzs7OztBQUtBQyxnQkFBZTtBQUNiLFFBQUlELFNBQVNFLFFBQWIsRUFBdUI7QUFDckIsYUFBT0YsU0FBU0UsUUFBaEI7QUFDRDtBQUNERixhQUFTRSxRQUFULEdBQW9CLElBQXBCOztBQUVBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBLFNBQUtELFdBQUwsQ0FBaUJFLEdBQWpCLENBQXFCLEtBQUtELE9BQTFCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FFLFlBQVc7QUFDVCwwQkFBTyxvQkFBUDtBQUNBLFNBQUtILFdBQUwsQ0FBaUJJLE9BQWpCO0FBQ0FQLGFBQVNFLFFBQVQsR0FBb0IsSUFBcEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUFNLGVBQWM7QUFDWixVQUFNQyxVQUFVLGVBQUtDLElBQUwsQ0FDZEMsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWlCLEdBQUQsaUJBQWUscUJBQS9CLENBRGMsc0JBQWhCOztBQUtBLFdBQU8scUJBQ0xGLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFpQixHQUFELGlCQUFlLHFCQUEvQixDQURLLEVBQ2lELEVBRGpELEVBQ3FEQyxVQUFVO0FBQ2xFLFdBQUssTUFBTUMsS0FBWCxJQUFvQkQsTUFBcEIsRUFBNEI7QUFDMUIsWUFDR0MsTUFBTUMsSUFBTixLQUFlUCxPQUFmLElBQTBCTSxNQUFNRSxNQUFOLEtBQWlCLGFBQU9DLFFBQW5ELElBQ0NILE1BQU1FLE1BQU4sS0FBaUIsYUFBT0UsT0FBeEIsSUFBbUNKLE1BQU1DLElBQU4sS0FBZVAsT0FGckQsRUFHRTtBQUNBLGVBQUtXLFdBQUw7QUFD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QW1CLElBQW5CO0FBQ0EsYUFBS3hELE9BQUwsQ0FBYTBDLFVBQWIsR0FBMEJMLEVBQTFCO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRixLQVpEO0FBYUQ7O0FBRUQ7Ozs7Ozs7QUFPQW9CLGNBQWFDLFFBQWIsRUFBdUJDLE9BQXZCLEVBQWdDO0FBQzlCLFFBQUlBLE9BQUosRUFBYTtBQUNYLFdBQUs5RSxPQUFMLENBQWErRSxJQUFiLENBQWtCLG9CQUFsQixFQUF3Q0YsUUFBeEM7QUFDRCxLQUZELE1BR0s7QUFDSCxXQUFLN0UsT0FBTCxDQUFhZ0YsRUFBYixDQUFnQixvQkFBaEIsRUFBc0NILFFBQXRDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7O0FBTUFJLGFBQVlKLFFBQVosRUFBc0I7QUFDcEIsU0FBSzdFLE9BQUwsQ0FBYWdGLEVBQWIsQ0FBZ0IsV0FBaEIsRUFBNkJILFFBQTdCO0FBQ0Q7QUFuU1ksQztrQkFzU0FqRixRIiwiZmlsZSI6ImRhdGFiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1pdHRlciwgRmlsZSwgQ29tcG9zaXRlRGlzcG9zYWJsZSwgd2F0Y2hQYXRoIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuL2RldmxvZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSwgREVTRVJJQUxJWkVSLCBEQVRBQkFTRV9GSUxFLCBBQ1RJT05cbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuXG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZXZsb2coJ2RhdGFiYXNlIGRlc3Ryb3llZCcpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIERhdGFiYXNlLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIHJldHVybiB3YXRjaFBhdGgoXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLCB7fSwgZXZlbnRzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5NT0RJRklFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50LnBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uREVMRVRFRCkgfHxcbiAgICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50Lm9sZFBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKHBhdGhXYXRjaGVyID0+IHtcbiAgICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHBhdGhXYXRjaGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZS5leGlzdHMoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihleGlzdHMgPT4gZXhpc3RzID8gdGhpcy5yZWFkQ29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZXJyb3InLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm8gZGF0YWJhc2UgZmlsZSB3YXMgZm91bmQuJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7IGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLCBkYXRhOiB0aGlzLmNvbnRlbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gZXh0ZXJuYWwgY2hhbmdlcyB0byB0aGUgZGF0YWJhc2VcbiAgICogZmlsZSBleGlzdHMgYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkga25vdyB3aGF0IGhhcyBiZWVuIGNoYW5nZWQuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHVwZGF0ZSAoKSB7XG4gICAgZGV2bG9nKCd1cGRhdGUnKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1jb250ZW50JywgdGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjcmVhdGVEYXRhYmFzZSAoKSB7XG4gICAgZGV2bG9nKCdjcmVhdGVkJyk7XG4gICAgdGhpcy5maWxlLmNyZWF0ZSgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBncm91cHM6IFtdLFxuICAgICAgICBwcm9qZWN0czogW11cbiAgICAgIH0sIG51bGwsIDIpKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVjb3ZlckRhdGFiYXNlICgpIHtcbiAgICBkZXZsb2coJ3JlY292ZXJlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudEdyb3VwIC0gY3VycmVudCBwYXJlbnQgZ3JvdXAgY29udGVudFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZW5vcm1hbGl6ZWQgb2JqZWN0IGNvbnRlbnQgdG8gYmUgc2F2ZWRcbiAgICovXG4gIGRlbm9ybWFsaXplQ29udGVudCAocGFyZW50R3JvdXApIHtcbiAgICBjb25zdCBkZW5vcm1hbGl6ZWQgPSB7XG4gICAgICAuLi5wYXJlbnRHcm91cC5tb2RlbCxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuXG4gICAgcGFyZW50R3JvdXAuY2hpbGRyZW4uZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jb250ZW50Lm1hcFtjaGlsZElkXTtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5ncm91cHMucHVzaCh0aGlzLmRlbm9ybWFsaXplQ29udGVudChjaGlsZCkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5wcm9qZWN0cy5wdXNoKHsgLi4uY2hpbGQubW9kZWwgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIG1hZGUgbm9ybWFsaXpyIHRvIGZpdCB0aGUgcHVycG9zZS5cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAdG9kbyBub3JtYWxpemUgbW9kZWwgY29udGVudCBzdWNoIGFzIHByb2plY3QgLT4gcGF0aHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBhIHJlcHJlc2VudGF0aW9uIG9mIGEgZGVub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gZGVzY3JpYmVzIGlmIGNvbnRlbnQgaXMgYSBncm91cCBvciBhIHByb2plY3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZCAtIGlmIHRoZSBjb250ZW50IGJlbG9uZ3MgdG8gYSBncm91cC5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIGN1cnJlbnQgbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKi9cbiAgbm9ybWFsaXplQ29udGVudCAoY29udGVudCwgdHlwZSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCB7IGdyb3VwcywgcHJvamVjdHMsIC4uLm1vZGVsIH0gPSBjb250ZW50O1xuXG4gICAgY29uc3Qgc3ViQ29udGVudCA9IHtcbiAgICAgIGlkOiB1dWlkKCksXG4gICAgICB0eXBlLFxuICAgICAgbW9kZWwsXG4gICAgICBjaGlsZHJlbjrCoFtdLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXSA9IHN1YkNvbnRlbnQ7XG4gICAgdGhpcy5jb250ZW50Lmlkcy5wdXNoKHN1YkNvbnRlbnQuaWQpO1xuXG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChncm91cCwgJ2dyb3VwJywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHByb2plY3RzKSB7XG4gICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMubm9ybWFsaXplQ29udGVudChwcm9qZWN0LCAncHJvamVjdCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIGNvbnRlbnQgdGhhdCB3YXMgcmV0cmlldmVkIGZyb20gdGhlIGZpbGUoKSA9PigpIC5cbiAgICovXG4gIHByb2Nlc3NDb250ZW50IChjb250ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGVudCA9IHtcbiAgICAgICAgbWFwOiB7fSxcbiAgICAgICAgaWRzOiBbXSxcbiAgICAgICAgcGFyZW50SWQ6IG51bGwsXG4gICAgICAgIHNlbGVjdGVkSWQ6IG51bGxcbiAgICAgIH07XG4gICAgICB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQoSlNPTi5wYXJzZShjb250ZW50KSwgJ2dyb3VwJyk7XG5cbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWVycm9yJywge1xuICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVhZENvbnRlbnQgKCkge1xuICAgIHRoaXMuZmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0aGlzLnByb2Nlc3NDb250ZW50KGNvbnRlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNhdmVDb250ZW50ICgpIHtcbiAgICBjb25zdCBwYXJlbnRHcm91cElkID0gdGhpcy5jb250ZW50Lmlkcy5maW5kKGlkID0+XG4gICAgICB0aGlzLmNvbnRlbnQubWFwW2lkXS5wYXJlbnRJZCA9PT0gdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlbm9ybWFsaXplQ29udGVudChcbiAgICAgIHRoaXMuY29udGVudC5tYXBbcGFyZW50R3JvdXBJZF1cbiAgICApO1xuXG4gICAgdGhpcy5maWxlLndyaXRlKEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWQsIG51bGwsIDIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0ICgpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVLZXkgPSBhdG9tLmdldFN0YXRlS2V5KGF0b20ucHJvamVjdC5nZXRQYXRocygpKTtcblxuICAgIHRoaXMuY29udGVudC5pZHMuc29tZShpZCA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm1hcFtpZF07XG5cbiAgICAgIGlmIChjb250ZW50LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFN0YXRlS2V5ID09PSBhdG9tLmdldFN0YXRlS2V5KGNvbnRlbnQubW9kZWwucGF0aHMpKSB7XG4gICAgICAgIGNvbnRlbnQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGlkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBvbmVUaW1lIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkQ2hhbmdlIChjYWxsYmFjaywgb25lVGltZSkge1xuICAgIGlmIChvbmVUaW1lKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub25jZSgnZGlkLWNoYW5nZS1jb250ZW50JywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWNoYW5nZS1jb250ZW50JywgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkRXJyb3IgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtZXJyb3InLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YWJhc2U7XG4iXX0=