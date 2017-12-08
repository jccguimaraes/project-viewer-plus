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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6WyJEYXRhYmFzZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJhZGQiLCJkZXN0cm95IiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2UiLCJpbml0aWFsaXplIiwiREJfRklMRSIsImpvaW4iLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwiZXZlbnRzIiwiZXZlbnQiLCJwYXRoIiwiYWN0aW9uIiwiTU9ESUZJRUQiLCJSRU5BTUVEIiwicmVhZENvbnRlbnQiLCJERUxFVEVEIiwib2xkUGF0aCIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJ1cGRhdGUiLCJ0aGVuIiwicGF0aFdhdGNoZXIiLCJmaWxlIiwiZXhpc3RzIiwiUHJvbWlzZSIsInJlamVjdCIsImNhdGNoIiwiZW1pdCIsInR5cGUiLCJkZXNjcmlwdGlvbiIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplciIsImRhdGEiLCJjcmVhdGVEYXRhYmFzZSIsImNyZWF0ZSIsIndyaXRlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdyb3VwcyIsInByb2plY3RzIiwicmVjb3ZlckRhdGFiYXNlIiwiZGVub3JtYWxpemVDb250ZW50IiwicGFyZW50R3JvdXAiLCJkZW5vcm1hbGl6ZWQiLCJtb2RlbCIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImNoaWxkSWQiLCJjaGlsZCIsIm1hcCIsInB1c2giLCJub3JtYWxpemVDb250ZW50IiwicGFyZW50SWQiLCJzdWJDb250ZW50IiwiaWQiLCJpZHMiLCJncm91cCIsInByb2plY3QiLCJwcm9jZXNzQ29udGVudCIsInNlbGVjdGVkSWQiLCJwYXJzZSIsImUiLCJyZWFkIiwic2F2ZUNvbnRlbnQiLCJwYXJlbnRHcm91cElkIiwiZmluZCIsIm5vcm1hbGl6ZWQiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0IiwiY3VycmVudFN0YXRlS2V5IiwiZ2V0U3RhdGVLZXkiLCJnZXRQYXRocyIsInNvbWUiLCJwYXRocyIsInNlbGVjdGVkIiwib25EaWRDaGFuZ2UiLCJjYWxsYmFjayIsIm9uZVRpbWUiLCJvbmNlIiwib24iLCJvbkRpZEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUlBOzs7O0lBSU1BLFEsR0FBTixNQUFNQSxRQUFOLENBQWU7O0FBSWI7Ozs7O0FBS0FDLGdCQUFlO0FBQ2IsUUFBSUQsU0FBU0UsUUFBYixFQUF1QjtBQUNyQixhQUFPRixTQUFTRSxRQUFoQjtBQUNEOztBQUVERixhQUFTRSxRQUFULEdBQW9CLElBQXBCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsbUJBQWY7O0FBRUEsU0FBS0QsV0FBTCxDQUFpQkUsR0FBakIsQ0FBcUIsS0FBS0QsT0FBMUI7QUFDRDs7QUFFRDs7Ozs7QUFLQUUsWUFBVztBQUNUQyxZQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQSxTQUFLTCxXQUFMLENBQWlCTSxPQUFqQjtBQUNBVCxhQUFTRSxRQUFULEdBQW9CLElBQXBCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BUSxlQUFjO0FBQ1osVUFBTUMsVUFBVSxlQUFLQyxJQUFMLENBQ2RDLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFpQixHQUFELGlCQUFlLHFCQUEvQixDQURjLHNCQUFoQjs7QUFLQSxXQUFPLHFCQUNMRixLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBaUIsR0FBRCxpQkFBZSxxQkFBL0IsQ0FESyxFQUNpRCxFQURqRCxFQUNxREMsVUFBVTtBQUNsRSxXQUFLLE1BQU1DLEtBQVgsSUFBb0JELE1BQXBCLEVBQTRCO0FBQzFCLFlBQ0dDLE1BQU1DLElBQU4sS0FBZVAsT0FBZixJQUEwQk0sTUFBTUUsTUFBTixLQUFpQixhQUFPQyxRQUFuRCxJQUNDSCxNQUFNRSxNQUFOLEtBQWlCLGFBQU9FLE9BQXhCLElBQW1DSixNQUFNQyxJQUFOLEtBQWVQLE9BRnJELEVBR0U7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MkIsS0FBUixDQUFjNEIsS0FBL0IsQ0FBeEIsRUFBK0Q7QUFDN0R2RCxnQkFBUXdELFFBQVIsR0FBbUIsSUFBbkI7QUFDQSxhQUFLeEQsT0FBTCxDQUFhMEMsVUFBYixHQUEwQkwsRUFBMUI7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGLEtBWkQ7QUFhRDs7QUFFRDs7Ozs7OztBQU9Bb0IsY0FBYUMsUUFBYixFQUF1QkMsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBS2hGLE9BQUwsQ0FBYWlGLElBQWIsQ0FBa0Isb0JBQWxCLEVBQXdDRixRQUF4QztBQUNELEtBRkQsTUFHSztBQUNILFdBQUsvRSxPQUFMLENBQWFrRixFQUFiLENBQWdCLG9CQUFoQixFQUFzQ0gsUUFBdEM7QUFDRDtBQUNGOztBQUVEOzs7Ozs7QUFNQUksYUFBWUosUUFBWixFQUFzQjtBQUNwQixTQUFLL0UsT0FBTCxDQUFha0YsRUFBYixDQUFnQixXQUFoQixFQUE2QkgsUUFBN0I7QUFDRDtBQW5TWSxDO2tCQXNTQW5GLFEiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSwgREVTRVJJQUxJWkVSLCBEQVRBQkFTRV9GSUxFLCBBQ1RJT05cbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQSBzaW5nbGV0b24gY2xhc3MgcmVwcmVzZW50aW5nIGFsbCByZWxhdGVkIG9wZXJhdGlvbnNcbiAqIHdpdGggdGhlIGNvbnRlbnQgbWFuYWdlbWVudC5cbiAqL1xuY2xhc3MgRGF0YWJhc2Uge1xuXG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChEYXRhYmFzZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIERhdGFiYXNlLmluc3RhbmNlO1xuICAgIH1cblxuICAgIERhdGFiYXNlLmluc3RhbmNlID0gdGhpcztcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQodGhpcy5lbWl0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGF0YWJhc2UgZGVzdHJveWVkJyk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgRGF0YWJhc2UuaW5zdGFuY2UgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpbml0aWFsaXplICgpIHtcbiAgICBjb25zdCBEQl9GSUxFID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIERBVEFCQVNFX0ZJTEVcbiAgICApO1xuXG4gICAgcmV0dXJuIHdhdGNoUGF0aChcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksIHt9LCBldmVudHMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLk1PRElGSUVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQucGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucmVhZENvbnRlbnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAoZXZlbnQucGF0aCA9PT0gREJfRklMRSAmJiBldmVudC5hY3Rpb24gPT09IEFDVElPTi5ERUxFVEVEKSB8fFxuICAgICAgICAgICAgKGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLlJFTkFNRUQgJiYgZXZlbnQub2xkUGF0aCA9PT0gREJfRklMRSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnRoZW4ocGF0aFdhdGNoZXIgPT4ge1xuICAgICAgICB0aGlzLmZpbGUgPSBuZXcgRmlsZShEQl9GSUxFKTtcbiAgICAgICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQocGF0aFdhdGNoZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlLmV4aXN0cygpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGV4aXN0cyA9PiBleGlzdHMgPyB0aGlzLnJlYWRDb250ZW50KCkgOiBQcm9taXNlLnJlamVjdCgpKVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1lcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdObyBkYXRhYmFzZSBmaWxlIHdhcyBmb3VuZC4nLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHsgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsIGRhdGE6IHRoaXMuY29udGVudCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBleHRlcm5hbCBjaGFuZ2VzIHRvIHRoZSBkYXRhYmFzZVxuICAgKiBmaWxlIGV4aXN0cyBiZWNhdXNlIHRoZXJlIGlzIG5vIHdheSBrbm93IHdoYXQgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgdXBkYXRlICgpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlJyk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2UtY29udGVudCcsIHRoaXMuY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY3JlYXRlRGF0YWJhc2UgKCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkJyk7XG4gICAgdGhpcy5maWxlLmNyZWF0ZSgpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBncm91cHM6IFtdLFxuICAgICAgICBwcm9qZWN0czogW11cbiAgICAgIH0sIG51bGwsIDIpKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVjb3ZlckRhdGFiYXNlICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVjb3ZlcmVkJyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50R3JvdXAgLSBjdXJyZW50IHBhcmVudCBncm91cCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlbm9ybWFsaXplZCBvYmplY3QgY29udGVudCB0byBiZSBzYXZlZFxuICAgKi9cbiAgZGVub3JtYWxpemVDb250ZW50IChwYXJlbnRHcm91cCkge1xuICAgIGNvbnN0IGRlbm9ybWFsaXplZCA9IHtcbiAgICAgIC4uLnBhcmVudEdyb3VwLm1vZGVsLFxuICAgICAgZ3JvdXBzOiBbXSxcbiAgICAgIHByb2plY3RzOiBbXVxuICAgIH07XG5cbiAgICBwYXJlbnRHcm91cC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNvbnRlbnQubWFwW2NoaWxkSWRdO1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLmdyb3Vwcy5wdXNoKHRoaXMuZGVub3JtYWxpemVDb250ZW50KGNoaWxkKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChjaGlsZC50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgZGVub3JtYWxpemVkLnByb2plY3RzLnB1c2goeyAuLi5jaGlsZC5tb2RlbCB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkZW5vcm1hbGl6ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQSBjdXN0b20gbWFkZSBub3JtYWxpenIgdG8gZml0IHRoZSBwdXJwb3NlLlxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEB0b2RvIG5vcm1hbGl6ZSBtb2RlbCBjb250ZW50IHN1Y2ggYXMgcHJvamVjdCAtPiBwYXRoc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIGEgcmVwcmVzZW50YXRpb24gb2YgYSBkZW5vcm1hbGl6ZWQgZ3JvdXAvcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBkZXNjcmliZXMgaWYgY29udGVudCBpcyBhIGdyb3VwIG9yIGEgcHJvamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gaWYgdGhlIGNvbnRlbnQgYmVsb25ncyB0byBhIGdyb3VwLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgY3VycmVudCBub3JtYWxpemVkIGdyb3VwL3Byb2plY3QuXG4gICAqL1xuICBub3JtYWxpemVDb250ZW50IChjb250ZW50LCB0eXBlLCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IHsgZ3JvdXBzLCBwcm9qZWN0cywgLi4ubW9kZWwgfSA9IGNvbnRlbnQ7XG5cbiAgICBjb25zdCBzdWJDb250ZW50ID0ge1xuICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgIHR5cGUsXG4gICAgICBtb2RlbCxcbiAgICAgIGNoaWxkcmVuOsKgW10sXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG5cbiAgICB0aGlzLmNvbnRlbnQubWFwW3N1YkNvbnRlbnQuaWRdID0gc3ViQ29udGVudDtcbiAgICB0aGlzLmNvbnRlbnQuaWRzLnB1c2goc3ViQ29udGVudC5pZCk7XG5cbiAgICBpZiAoZ3JvdXBzKSB7XG4gICAgICBncm91cHMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KGdyb3VwLCAnZ3JvdXAnLCBzdWJDb250ZW50LmlkKTtcbiAgICAgICAgdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXS5jaGlsZHJlbi5wdXNoKGNoaWxkLmlkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJvamVjdHMpIHtcbiAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5ub3JtYWxpemVDb250ZW50KHByb2plY3QsICdwcm9qZWN0Jywgc3ViQ29udGVudC5pZCk7XG4gICAgICAgIHRoaXMuY29udGVudC5tYXBbc3ViQ29udGVudC5pZF0uY2hpbGRyZW4ucHVzaChjaGlsZC5pZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250ZW50Lm1hcFtzdWJDb250ZW50LmlkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0gY29udGVudCB0aGF0IHdhcyByZXRyaWV2ZWQgZnJvbSB0aGUgZmlsZSgpID0+KCkgLlxuICAgKi9cbiAgcHJvY2Vzc0NvbnRlbnQgKGNvbnRlbnQpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZW50ID0ge1xuICAgICAgICBtYXA6IHt9LFxuICAgICAgICBpZHM6IFtdLFxuICAgICAgICBwYXJlbnRJZDogbnVsbCxcbiAgICAgICAgc2VsZWN0ZWRJZDogbnVsbFxuICAgICAgfTtcbiAgICAgIHRoaXMubm9ybWFsaXplQ29udGVudChKU09OLnBhcnNlKGNvbnRlbnQpLCAnZ3JvdXAnKTtcblxuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICByZWFkQ29udGVudCAoKSB7XG4gICAgdGhpcy5maWxlLnJlYWQodHJ1ZSkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc0NvbnRlbnQoY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoaWQgPT5cbiAgICAgIHRoaXMuY29udGVudC5tYXBbaWRdLnBhcmVudElkID09PSB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHRoaXMuZGVub3JtYWxpemVDb250ZW50KFxuICAgICAgdGhpcy5jb250ZW50Lm1hcFtwYXJlbnRHcm91cElkXVxuICAgICk7XG5cbiAgICB0aGlzLmZpbGUud3JpdGUoSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZCwgbnVsbCwgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIHNldEluaXRpYWxTZWxlY3RlZFByb2plY3QgKCkge1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZUtleSA9IGF0b20uZ2V0U3RhdGVLZXkoYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkpO1xuXG4gICAgdGhpcy5jb250ZW50Lmlkcy5zb21lKGlkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnQubWFwW2lkXTtcblxuICAgICAgaWYgKGNvbnRlbnQudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50U3RhdGVLZXkgPT09IGF0b20uZ2V0U3RhdGVLZXkoY29udGVudC5tb2RlbC5wYXRocykpIHtcbiAgICAgICAgY29udGVudC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGVudC5zZWxlY3RlZElkID0gaWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9uZVRpbWUgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRDaGFuZ2UgKGNhbGxiYWNrLCBvbmVUaW1lKSB7XG4gICAgaWYgKG9uZVRpbWUpIHtcbiAgICAgIHRoaXMuZW1pdHRlci5vbmNlKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRFcnJvciAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1lcnJvcicsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhYmFzZTtcbiJdfQ==