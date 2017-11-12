Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _atom = require('atom');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

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
    console.log('database destroyed');
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
    const DB_FILE = _path2.default.join(atom.configDirPath, _base.DATABASE_FILE);

    return (0, _atom.watchPath)(atom.configDirPath, {}, events => {
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
  update() {
    console.log('update');
    this.emitter.emit('did-change-content', this.content);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  createDatabase() {
    console.log('created');
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
    console.log('recovered');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGQiLCJkZXN0cm95IiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiREJfRklMRSIsImpvaW4iLCJhdG9tIiwiY29uZmlnRGlyUGF0aCIsImV2ZW50cyIsImV2ZW50IiwicGF0aCIsImFjdGlvbiIsIk1PRElGSUVEIiwiUkVOQU1FRCIsInJlYWRDb250ZW50IiwiREVMRVRFRCIsIm9sZFBhdGgiLCJjb250ZW50IiwidW5kZWZpbmVkIiwidXBkYXRlIiwidGhlbiIsInBhdGhXYXRjaGVyIiwiZmlsZSIsImV4aXN0cyIsIlByb21pc2UiLCJyZWplY3QiLCJjYXRjaCIsImVtaXQiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkYXRhIiwiY3JlYXRlRGF0YWJhc2UiLCJjcmVhdGUiLCJ3cml0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJncm91cHMiLCJwcm9qZWN0cyIsInJlY292ZXJEYXRhYmFzZSIsImRlbm9ybWFsaXplQ29udGVudCIsInBhcmVudEdyb3VwIiwiZGVub3JtYWxpemVkIiwibW9kZWwiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZElkIiwiY2hpbGQiLCJtYXAiLCJwdXNoIiwibm9ybWFsaXplQ29udGVudCIsInBhcmVudElkIiwic3ViQ29udGVudCIsImlkIiwiaWRzIiwiZ3JvdXAiLCJwcm9qZWN0IiwicHJvY2Vzc0NvbnRlbnQiLCJzZWxlY3RlZElkIiwicGFyc2UiLCJlIiwicmVhZCIsInNhdmVDb250ZW50IiwicGFyZW50R3JvdXBJZCIsImZpbmQiLCJub3JtYWxpemVkIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsImN1cnJlbnRTdGF0ZUtleSIsImdldFN0YXRlS2V5IiwiZ2V0UGF0aHMiLCJzb21lIiwicGF0aHMiLCJzZWxlY3RlZCIsIm9uRGlkQ2hhbmdlIiwiY2FsbGJhY2siLCJvbmVUaW1lIiwib25jZSIsIm9uIiwib25EaWRFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztJQUlNQSxRLEdBQU4sTUFBTUEsUUFBTixDQUFlOztBQUliOzs7OztBQUtBQyxnQkFBZTtBQUNiLFFBQUlELFNBQVNFLFFBQWIsRUFBdUI7QUFDckIsYUFBT0YsU0FBU0UsUUFBaEI7QUFDRDs7QUFFREYsYUFBU0UsUUFBVCxHQUFvQixJQUFwQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBLFNBQUtELFdBQUwsQ0FBaUJFLEdBQWpCLENBQXFCLEtBQUtELE9BQTFCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FFLFlBQVc7QUFDVEMsWUFBUUMsR0FBUixDQUFZLG9CQUFaO0FBQ0EsU0FBS0wsV0FBTCxDQUFpQk0sT0FBakI7QUFDQVQsYUFBU0UsUUFBVCxHQUFvQixJQUFwQjtBQUNEOztBQUVEOzs7Ozs7QUFNQVEsZUFBYztBQUNaLFVBQU1DLFVBQVUsZUFBS0MsSUFBTCxDQUFVQyxLQUFLQyxhQUFmLHNCQUFoQjs7QUFFQSxXQUFPLHFCQUFVRCxLQUFLQyxhQUFmLEVBQThCLEVBQTlCLEVBQWtDQyxVQUFVO0FBQ2pELFdBQUssTUFBTUMsS0FBWCxJQUFvQkQsTUFBcEIsRUFBNEI7QUFDMUIsWUFDR0MsTUFBTUMsSUFBTixLQUFlTixPQUFmLElBQTBCSyxNQUFNRSxNQUFOLEtBQWlCLGFBQU9DLFFBQW5ELElBQ0NILE1BQU1FLE1BQU4sS0FBaUIsYUFBT0UsT0FBeEIsSUFBbUNKLE1BQU1DLElBQU4sS0FBZU4sT0FGckQsRUFHRTtBQUNBLGVBQUtVLFdBQUw7QUFDRCxTQUxELE1BTUssSUFDRkwsTUFBTUMsSUFBTixLQUFlTixPQUFmLElBQTBCSyxNQUFNRSxNQUFOLEtB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TCxDQUFhMEMsVUFBYixHQUEwQkwsRUFBMUI7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDs7Ozs7OztBQU9Bb0IsY0FBYUMsUUFBYixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBSy9FLE9BQUwsQ0FBYWdGLElBQWIsQ0FBa0Isb0JBQWxCLEVBQXdDRixRQUF4QztBQUNELEtBRkQsTUFHSztBQUNILFdBQUs5RSxPQUFMLENBQWFpRixFQUFiLENBQWdCLG9CQUFoQixFQUFzQ0gsUUFBdEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLOUUsT0FBTCxDQUFhaUYsRUFBYixDQUFnQixXQUFoQixFQUE2QkgsUUFBN0I7QUFDRDtBQTdSWSxDO2tCQWdTQWxGLFEiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBERVNFUklBTElaRVIsIERBVEFCQVNFX0ZJTEUsIEFDVElPTiB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIEEgc2luZ2xldG9uIGNsYXNzIHJlcHJlc2VudGluZyBhbGwgcmVsYXRlZCBvcGVyYXRpb25zXG4gKiB3aXRoIHRoZSBjb250ZW50IG1hbmFnZW1lbnQuXG4gKi9cbmNsYXNzIERhdGFiYXNlIHtcblxuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoRGF0YWJhc2UuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBEYXRhYmFzZS5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBEYXRhYmFzZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHRoaXMuZW1pdHRlcik7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2RhdGFiYXNlIGRlc3Ryb3llZCcpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIERhdGFiYXNlLmluc3RhbmNlID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihhdG9tLmNvbmZpZ0RpclBhdGgsIERBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHdhdGNoUGF0aChhdG9tLmNvbmZpZ0RpclBhdGgsIHt9LCBldmVudHMgPT4ge1xuICAgICAgZm9yIChjb25zdCBldmVudCBvZiBldmVudHMpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLk1PRElGSUVEKSB8fFxuICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50LnBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMucmVhZENvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5ERUxFVEVEKSB8fFxuICAgICAgICAgIChldmVudC5hY3Rpb24gPT09IEFDVElPTi5SRU5BTUVEICYmIGV2ZW50Lm9sZFBhdGggPT09IERCX0ZJTEUpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHBhdGhXYXRjaGVyID0+IHtcbiAgICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKHBhdGhXYXRjaGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZS5leGlzdHMoKTtcbiAgICAgIH0pXG4gICAgICAudGhlbihleGlzdHMgPT4gZXhpc3RzID8gdGhpcy5yZWFkQ29udGVudCgpIDogUHJvbWlzZS5yZWplY3QoKSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZXJyb3InLCB7XG4gICAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTm8gZGF0YWJhc2UgZmlsZSB3YXMgZm91bmQuJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7IGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLCBkYXRhOiB0aGlzLmNvbnRlbnQgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGUnKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1jb250ZW50JywgdGhpcy5jb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjcmVhdGVEYXRhYmFzZSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQnKTtcbiAgICB0aGlzLmZpbGUuY3JlYXRlKClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGdyb3VwczogW10sXG4gICAgICAgIHByb2plY3RzOiBbXVxuICAgICAgfSwgbnVsbCwgMikpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWNvdmVyRGF0YWJhc2UgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZWNvdmVyZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRHcm91cCAtIGN1cnJlbnQgcGFyZW50IGdyb3VwIGNvbnRlbnRcbiAgICogQHJldHVybnMge09iamVjdH0gZGVub3JtYWxpemVkIG9iamVjdCBjb250ZW50IHRvIGJlIHNhdmVkXG4gICAqL1xuICBkZW5vcm1hbGl6ZUNvbnRlbnQgKHBhcmVudEdyb3VwKSB7XG4gICAgY29uc3QgZGVub3JtYWxpemVkID0ge1xuICAgICAgLi4ucGFyZW50R3JvdXAubW9kZWwsXG4gICAgICBncm91cHM6IFtdLFxuICAgICAgcHJvamVjdHM6IFtdXG4gICAgfTtcblxuICAgIHBhcmVudEdyb3VwLmNoaWxkcmVuLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IHRoaXMuY29udGVudC5tYXBbY2hpbGRJZF07XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQuZ3JvdXBzLnB1c2godGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQoY2hpbGQpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNoaWxkLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBkZW5vcm1hbGl6ZWQucHJvamVjdHMucHVzaCh7IC4uLmNoaWxkLm1vZGVsIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRlbm9ybWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBtYWRlIG5vcm1hbGl6ciB0byBmaXQgdGhlIHB1cnBvc2UuXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHRvZG8gbm9ybWFsaXplIG1vZGVsIGNvbnRlbnQgc3VjaCBhcyBwcm9qZWN0IC0+IHBhdGhzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50IC0gYSByZXByZXNlbnRhdGlvbiBvZiBhIGRlbm9ybWFsaXplZCBncm91cC9wcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIGRlc2NyaWJlcyBpZiBjb250ZW50IGlzIGEgZ3JvdXAgb3IgYSBwcm9qZWN0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSBpZiB0aGUgY29udGVudCBiZWxvbmdzIHRvIGEgZ3JvdXAuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBjdXJyZW50IG5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICovXG4gIG5vcm1hbGl6ZUNvbnRlbnQgKGNvbnRlbnQsIHR5cGUsIHBhcmVudElkKSB7XG4gICAgY29uc3QgeyBncm91cHMsIHByb2plY3RzLCAuLi5tb2RlbCB9ID0gY29udGVudDtcblxuICAgIGNvbnN0IHN1YkNvbnRlbnQgPSB7XG4gICAgICBpZDogdXVpZCgpLFxuICAgICAgdHlwZSxcbiAgICAgIG1vZGVsLFxuICAgICAgY2hpbGRyZW46wqBbXSxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcblxuICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0gPSBzdWJDb250ZW50O1xuICAgIHRoaXMuY29udGVudC5pZHMucHVzaChzdWJDb250ZW50LmlkKTtcblxuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQoZ3JvdXAsICdncm91cCcsIHN1YkNvbnRlbnQuaWQpO1xuICAgICAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdLmNoaWxkcmVuLnB1c2goY2hpbGQuaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwcm9qZWN0cykge1xuICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLm5vcm1hbGl6ZUNvbnRlbnQocHJvamVjdCwgJ3Byb2plY3QnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgLSBjb250ZW50IHRoYXQgd2FzIHJldHJpZXZlZCBmcm9tIHRoZSBmaWxlKCkgPT4oKSAuXG4gICAqL1xuICBwcm9jZXNzQ29udGVudCAoY29udGVudCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRlbnQgPSB7XG4gICAgICAgIG1hcDoge30sXG4gICAgICAgIGlkczogW10sXG4gICAgICAgIHBhcmVudElkOiBudWxsLFxuICAgICAgICBzZWxlY3RlZElkOiBudWxsXG4gICAgICB9O1xuICAgICAgdGhpcy5ub3JtYWxpemVDb250ZW50KEpTT04ucGFyc2UoY29udGVudCksICdncm91cCcpO1xuXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1lcnJvcicsIHtcbiAgICAgICAgdHlwZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHJlYWRDb250ZW50ICgpIHtcbiAgICB0aGlzLmZpbGUucmVhZCh0cnVlKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy5wcm9jZXNzQ29udGVudChjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBzYXZlQ29udGVudCAoKSB7XG4gICAgY29uc3QgcGFyZW50R3JvdXBJZCA9IHRoaXMuY29udGVudC5pZHMuZmluZChpZCA9PlxuICAgICAgdGhpcy5jb250ZW50Lm1hcFtpZF0ucGFyZW50SWQgPT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gdGhpcy5kZW5vcm1hbGl6ZUNvbnRlbnQoXG4gICAgICB0aGlzLmNvbnRlbnQubWFwW3BhcmVudEdyb3VwSWRdXG4gICAgKTtcblxuICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeShub3JtYWxpemVkLCBudWxsLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCAoKSB7XG4gICAgY29uc3QgY3VycmVudFN0YXRlS2V5ID0gYXRvbS5nZXRTdGF0ZUtleShhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSk7XG5cbiAgICB0aGlzLmNvbnRlbnQuaWRzLnNvbWUoaWQgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC5tYXBbaWRdO1xuXG4gICAgICBpZiAoY29udGVudC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRTdGF0ZUtleSA9PT0gYXRvbS5nZXRTdGF0ZUtleShjb250ZW50Lm1vZGVsLnBhdGhzKSkge1xuICAgICAgICBjb250ZW50LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jb250ZW50LnNlbGVjdGVkSWQgPSBpZDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb25lVGltZSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZENoYW5nZSAoY2FsbGJhY2ssIG9uZVRpbWUpIHtcbiAgICBpZiAob25lVGltZSkge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uY2UoJ2RpZC1jaGFuZ2UtY29udGVudCcsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2UtY29udGVudCcsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZEVycm9yIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWVycm9yJywgY2FsbGJhY2spO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFiYXNlO1xuIl19