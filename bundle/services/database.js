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
   * This method should only be invoked when external changes to the database
   * file exists because there is no way know what has been changed.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGQiLCJkZXN0cm95IiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiREJfRklMRSIsImpvaW4iLCJhdG9tIiwiY29uZmlnRGlyUGF0aCIsImV2ZW50cyIsImV2ZW50IiwicGF0aCIsImFjdGlvbiIsIk1PRElGSUVEIiwiUkVOQU1FRCIsInJlYWRDb250ZW50IiwiREVMRVRFRCIsIm9sZFBhdGgiLCJjb250ZW50IiwidW5kZWZpbmVkIiwidXBkYXRlIiwidGhlbiIsInBhdGhXYXRjaGVyIiwiZmlsZSIsImV4aXN0cyIsIlByb21pc2UiLCJyZWplY3QiLCJjYXRjaCIsImVtaXQiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkYXRhIiwiY3JlYXRlRGF0YWJhc2UiLCJjcmVhdGUiLCJ3cml0ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJncm91cHMiLCJwcm9qZWN0cyIsInJlY292ZXJEYXRhYmFzZSIsImRlbm9ybWFsaXplQ29udGVudCIsInBhcmVudEdyb3VwIiwiZGVub3JtYWxpemVkIiwibW9kZWwiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZElkIiwiY2hpbGQiLCJtYXAiLCJwdXNoIiwibm9ybWFsaXplQ29udGVudCIsInBhcmVudElkIiwic3ViQ29udGVudCIsImlkIiwiaWRzIiwiZ3JvdXAiLCJwcm9qZWN0IiwicHJvY2Vzc0NvbnRlbnQiLCJzZWxlY3RlZElkIiwicGFyc2UiLCJlIiwicmVhZCIsInNhdmVDb250ZW50IiwicGFyZW50R3JvdXBJZCIsImZpbmQiLCJub3JtYWxpemVkIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsImN1cnJlbnRTdGF0ZUtleSIsImdldFN0YXRlS2V5IiwiZ2V0UGF0aHMiLCJzb21lIiwicGF0aHMiLCJzZWxlY3RlZCIsIm9uRGlkQ2hhbmdlIiwiY2FsbGJhY2siLCJvbmVUaW1lIiwib25jZSIsIm9uIiwib25EaWRFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztJQUlNQSxRLEdBQU4sTUFBTUEsUUFBTixDQUFlOztBQUliOzs7OztBQUtBQyxnQkFBZTtBQUNiLFFBQUlELFNBQVNFLFFBQWIsRUFBdUI7QUFDckIsYUFBT0YsU0FBU0UsUUFBaEI7QUFDRDs7QUFFREYsYUFBU0UsUUFBVCxHQUFvQixJQUFwQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBLFNBQUtELFdBQUwsQ0FBaUJFLEdBQWpCLENBQXFCLEtBQUtELE9BQTFCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FFLFlBQVc7QUFDVEMsWUFBUUMsR0FBUixDQUFZLG9CQUFaO0FBQ0EsU0FBS0wsV0FBTCxDQUFpQk0sT0FBakI7QUFDQVQsYUFBU0UsUUFBVCxHQUFvQixJQUFwQjtBQUNEOztBQUVEOzs7Ozs7QUFNQVEsZUFBYztBQUNaLFVBQU1DLFVBQVUsZUFBS0MsSUFBTCxDQUFVQyxLQUFLQyxhQUFmLHNCQUFoQjs7QUFFQSxXQUFPLHFCQUFVRCxLQUFLQyxhQUFmLEVBQThCLEVBQTlCLEVBQWtDQyxVQUFVO0FBQ2pELFdBQUssTUFBTUMsS0FBWCxJQUFvQkQsTUFBcEIsRUFBNEI7QUFDMUIsWUFDR0MsTUFBTUMsSUFBTixLQUFlTixPQUFmLElBQTBCSyxNQUFNRSxNQUFOLEtBQWlCLGFBQU9DLFFBQW5ELElBQ0NILE1BQU1FLE1BQU4sS0FBaUIsYUFBT0UsT0FBeEIsSUFBbUNKLE1BQU1DLElBQU4sS0FBZU4sT0FGckQsRUFHRTtBQUNBLGVBQUtVLFdBQUw7QUFDRCxTQUxELE1BTUssSUFDRkwsTUFBTUMsSUFBTixLQUFlTixPQUFmLElBQTBCSyxNQUFNRSxNQUFOLEtB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QUFMLENBQWEwQyxVQUFiLEdBQTBCTCxFQUExQjtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0YsS0FaRDtBQWFEOztBQUVEOzs7Ozs7O0FBT0FvQixjQUFhQyxRQUFiLEVBQXVCQyxPQUF2QixFQUFnQztBQUM5QixRQUFJQSxPQUFKLEVBQWE7QUFDWCxXQUFLL0UsT0FBTCxDQUFhZ0YsSUFBYixDQUFrQixvQkFBbEIsRUFBd0NGLFFBQXhDO0FBQ0QsS0FGRCxNQUdLO0FBQ0gsV0FBSzlFLE9BQUwsQ0FBYWlGLEVBQWIsQ0FBZ0Isb0JBQWhCLEVBQXNDSCxRQUF0QztBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OztBQU1BSSxhQUFZSixRQUFaLEVBQXNCO0FBQ3BCLFNBQUs5RSxPQUFMLENBQWFpRixFQUFiLENBQWdCLFdBQWhCLEVBQTZCSCxRQUE3QjtBQUNEO0FBL1JZLEM7a0JBa1NBbEYsUSIsImZpbGUiOiJkYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtaXR0ZXIsIEZpbGUsIENvbXBvc2l0ZURpc3Bvc2FibGUsIHdhdGNoUGF0aCB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IERFU0VSSUFMSVpFUiwgREFUQUJBU0VfRklMRSwgQUNUSU9OIH0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuXG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cblxuICAgIERhdGFiYXNlLmluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGF0YWJhc2UgZGVzdHJveWVkJyk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpbml0aWFsaXplICgpIHtcbiAgICBjb25zdCBEQl9GSUxFID0gcGF0aC5qb2luKGF0b20uY29uZmlnRGlyUGF0aCwgREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gd2F0Y2hQYXRoKGF0b20uY29uZmlnRGlyUGF0aCwge30sIGV2ZW50cyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uTU9ESUZJRUQpIHx8XG4gICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQucGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5yZWFkQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLkRFTEVURUQpIHx8XG4gICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQub2xkUGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4ocGF0aFdhdGNoZXIgPT4ge1xuICAgICAgICB0aGlzLmZpbGUgPSBuZXcgRmlsZShEQl9GSUxFKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocGF0aFdhdGNoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlLmV4aXN0cygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGV4aXN0cyA9PiBleGlzdHMgPyB0aGlzLnJlYWRDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1lcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdObyBkYXRhYmFzZSBmaWxlIHdhcyBmb3VuZC4nLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHsgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsIGRhdGE6IHRoaXMuY29udGVudCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBleHRlcm5hbCBjaGFuZ2VzIHRvIHRoZSBkYXRhYmFzZVxuICAgKiBmaWxlIGV4aXN0cyBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSBrbm93IHdoYXQgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgdXBkYXRlICgpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2UtY29udGVudCcsIHRoaXMuY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY3JlYXRlRGF0YWJhc2UgKCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkJyk7XG4gICAgdGhpcy5maWxlLmNyZWF0ZSgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBncm91cHM6IFtdLFxuICAgICAgICBwcm9qZWN0czogW11cbiAgICAgIH0sIG51bGwsIDIpKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVjb3ZlckRhdGFiYXNlICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVjb3ZlcmVkJyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50R3JvdXAgLSBjdXJyZW50IHBhcmVudCBncm91cCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlbm9ybWFsaXplZCBvYmplY3QgY29udGVudCB0byBiZSBzYXZlZFxuICAgKi9cbiAgZGVub3JtYWxpemVDb250ZW50IChwYXJlbnRHcm91cCkge1xuICAgIGNvbnN0IGRlbm9ybWFsaXplZCA9IHtcbiAgICAgIC4uLnBhcmVudEdyb3VwLm1vZGVsLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIHByb2plY3RzOiBbXVxuICAgIH07XG5cbiAgICBwYXJlbnRHcm91cC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNvbnRlbnQubWFwW2NoaWxkSWRdO1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLmdyb3Vwcy5wdXNoKHRoaXMuZGVub3JtYWxpemVDb250ZW50KGNoaWxkKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaGlsZC50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLnByb2plY3RzLnB1c2goeyAuLi5jaGlsZC5tb2RlbCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkZW5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSBjdXN0b20gbWFkZSBub3JtYWxpenIgdG8gZml0IHRoZSBwdXJwb3NlLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEB0b2RvIG5vcm1hbGl6ZSBtb2RlbCBjb250ZW50IHN1Y2ggYXMgcHJvamVjdCAtPiBwYXRoc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIGEgcmVwcmVzZW50YXRpb24gb2YgYSBkZW5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBkZXNjcmliZXMgaWYgY29udGVudCBpcyBhIGdyb3VwIG9yIGEgcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gaWYgdGhlIGNvbnRlbnQgYmVsb25ncyB0byBhIGdyb3VwLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqL1xuICBub3JtYWxpemVDb250ZW50IChjb250ZW50LCB0eXBlLCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IHsgZ3JvdXBzLCBwcm9qZWN0cywgLi4ubW9kZWwgfSA9IGNvbnRlbnQ7XG5cbiAgICBjb25zdCBzdWJDb250ZW50ID0ge1xuICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgIHR5cGUsXG4gICAgICBtb2RlbCxcbiAgICAgIGNoaWxkcmVuOsKgW10sXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdID0gc3ViQ29udGVudDtcbiAgICB0aGlzLmNvbnRlbnQuaWRzLnB1c2goc3ViQ29udGVudC5pZCk7XG5cbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBncm91cHMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KGdyb3VwLCAnZ3JvdXAnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJvamVjdHMpIHtcbiAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KHByb2plY3QsICdwcm9qZWN0Jywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gY29udGVudCB0aGF0IHdhcyByZXRyaWV2ZWQgZnJvbSB0aGUgZmlsZSgpID0+KCkgLlxuICAgKi9cbiAgcHJvY2Vzc0NvbnRlbnQgKGNvbnRlbnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZW50ID0ge1xuICAgICAgICBtYXA6IHt9LFxuICAgICAgICBpZHM6IFtdLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWRJZDogbnVsbFxuICAgICAgfTtcbiAgICAgIHRoaXMubm9ybWFsaXplQ29udGVudChKU09OLnBhcnNlKGNvbnRlbnQpLCAnZ3JvdXAnKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkQ29udGVudCAoKSB7XG4gICAgdGhpcy5maWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQoY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoaWQgPT5cbiAgICAgIHRoaXMuY29udGVudC5tYXBbaWRdLnBhcmVudElkID09PSB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHRoaXMuZGVub3JtYWxpemVDb250ZW50KFxuICAgICAgdGhpcy5jb250ZW50Lm1hcFtwYXJlbnRHcm91cElkXVxuICAgICk7XG5cbiAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZCwgbnVsbCwgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNldEluaXRpYWxTZWxlY3RlZFByb2plY3QgKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZUtleSA9IGF0b20uZ2V0U3RhdGVLZXkoYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkpO1xuXG4gICAgdGhpcy5jb250ZW50Lmlkcy5zb21lKGlkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubWFwW2lkXTtcblxuICAgICAgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50U3RhdGVLZXkgPT09IGF0b20uZ2V0U3RhdGVLZXkoY29udGVudC5tb2RlbC5wYXRocykpIHtcbiAgICAgICAgY29udGVudC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5zZWxlY3RlZElkID0gaWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9uZVRpbWUgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRDaGFuZ2UgKGNhbGxiYWNrLCBvbmVUaW1lKSB7XG4gICAgaWYgKG9uZVRpbWUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbmNlKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRFcnJvciAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1lcnJvcicsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZTtcbiJdfQ==