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

var _base = require('./../constants/base');

var _icons = require('./../constants/icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A class representing all related operations with file content management.
 */
class FileContent {
  /**
   * description
   */
  constructor() {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.loading = false;
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  destroy() {
    this.disposables.dispose();
  }

  /**
   * @returns {Promise} description
   */
  watcher() {
    const DB_FILE = _path2.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    this.loading = true;

    return (0, _atom.watchPath)(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), {}, async events => {
      for (const event of events) {
        if (event.path === DB_FILE && event.action === _base.ACTION.MODIFIED || event.action === _base.ACTION.RENAMED && event.path === DB_FILE) {
          this.emitter.emit('file-content-change', (await this.readFile()));
        } else if (event.path === DB_FILE && event.action === _base.ACTION.DELETED || event.action === _base.ACTION.RENAMED && event.oldPath === DB_FILE) {
          this.content = undefined;
          this.emitter.emit('file-content-change', undefined);
          // this.update();
        }
      }
    }).then(pathWatcher => {
      this.file = new _atom.File(DB_FILE);
      this.disposables.add(pathWatcher);
      this.loading = false;
    });
  }

  /**
   * description
   */
  async initialize() {
    await this.watcher();
  }

  /**
   *
   * @returns {Promise}
   */
  async readFile() {
    return await this.file.exists().then(exists => exists ? this.readContent() : Promise.reject());
  }

  /**
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
    this.emitter.emit(_base.EMITTER.CHANGE_CONTENT, this.content);
  }

  /**
   * @todo improve JSDoc
   */
  async createDatabase() {
    this.file.exists().then(exists => exists ? this.file.create() : Promise.reject()).then(() => this.file.write(JSON.stringify({ groups: [], projects: [] }, null, 2))).then(() => {
      console.log('created');
      // this.readContent()
    }).catch(() => {
      console.log('not created');
    });
  }

  /**
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
   * description
   *
   * @todo improve JSDoc
   * @returns {Promise}
   */
  async readContent() {
    return await this.file.read(true).then(content => {
      try {
        return JSON.parse(content);
      } catch (e) {
        return;
      }

      // const root = {
      //   id: uuid(),
      //   type: 'group',
      //   expanded: true,
      //   model: {},
      //   children: [],
      //   parentId: undefined
      // };
      //
      // const ids = [root.id];
      // const map = Array.from(this.state.list()).reduce(
      //   (acc, val) => {
      //     const id = val[0];
      //     const resource = {
      //       ...val[1],
      //       id
      //     };
      //     acc[id] = resource;
      //     ids.push(id);
      //
      //     if (resource.type === 'group') {
      //       acc[id].children = [];
      //     }
      //     if (resource.parentId) {
      //       acc[resource.parentId].children.push(id);
      //     }
      //     else {
      //       acc[root.id].children.push(id);
      //     }
      //     return acc;
      //   },
      //   { [root.id]: root }
      // );
      //
      // this.content = {
      //   ids,
      //   map,
      //   parentId: null,
      //   selectedId: null
      // };
      // this.update();
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
   * @todo improve JSDoc
   */
  readLegacyContent() {
    this.legacyFile.read(true).then(content => {
      try {
        const legacyContent = JSON.parse(content);
        console.log('readLegacyContent', legacyContent);
      } catch (e) {
        this.emitter.emit(_base.EMITTER.ERROR, {
          type: 'error',
          description: MESSAGES.EMITTER.BAD_LEGACY_CONTENT
        });
      }
    });
  }

  /**
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidFileContentChange(callback) {
    this.emitter.on('file-content-change', callback);
  }

  /**
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
}
exports.default = FileContent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLWNvbnRlbnQuanMiXSwibmFtZXMiOlsiRmlsZUNvbnRlbnQiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwibG9hZGluZyIsImRlc3Ryb3kiLCJkaXNwb3NlIiwid2F0Y2hlciIsIkRCX0ZJTEUiLCJwYXRoIiwiam9pbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkRBVEFCQVNFX0ZJTEUiLCJldmVudHMiLCJldmVudCIsImFjdGlvbiIsIkFDVElPTiIsIk1PRElGSUVEIiwiUkVOQU1FRCIsImVtaXQiLCJyZWFkRmlsZSIsIkRFTEVURUQiLCJvbGRQYXRoIiwiY29udGVudCIsInVuZGVmaW5lZCIsInRoZW4iLCJwYXRoV2F0Y2hlciIsImZpbGUiLCJGaWxlIiwiYWRkIiwiaW5pdGlhbGl6ZSIsImV4aXN0cyIsInJlYWRDb250ZW50IiwiUHJvbWlzZSIsInJlamVjdCIsIm9wZW5GaWxlIiwid29ya3NwYWNlIiwib3BlbiIsInVwZGF0ZSIsIkVNSVRURVIiLCJDSEFOR0VfQ09OVEVOVCIsImNyZWF0ZURhdGFiYXNlIiwiY3JlYXRlIiwid3JpdGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJkZW5vcm1hbGl6ZUNvbnRlbnQiLCJwYXJlbnRHcm91cCIsImRlbm9ybWFsaXplZCIsIm1vZGVsIiwiZXhwYW5kZWQiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZElkIiwiY2hpbGQiLCJtYXAiLCJ0eXBlIiwicHVzaCIsInJlYWQiLCJwYXJzZSIsImUiLCJzYXZlQ29udGVudCIsInBhcmVudEdyb3VwSWQiLCJpZHMiLCJmaW5kIiwiaWQiLCJwYXJlbnRJZCIsIm5vcm1hbGl6ZWQiLCJyZWFkTGVnYWN5Q29udGVudCIsImxlZ2FjeUZpbGUiLCJsZWdhY3lDb250ZW50IiwiRVJST1IiLCJkZXNjcmlwdGlvbiIsIk1FU1NBR0VTIiwiQkFEX0xFR0FDWV9DT05URU5UIiwib25EaWRGaWxlQ29udGVudENoYW5nZSIsImNhbGxiYWNrIiwib24iLCJvbkRpZENoYW5nZSIsIm9uZVRpbWUiLCJvbmNlIiwib25EaWRFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBUUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxXQUFOLENBQWtCO0FBQy9COzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFlBQVc7QUFDVCxTQUFLTCxXQUFMLENBQWlCTSxPQUFqQjtBQUNEOztBQUVEOzs7QUFHQUMsWUFBVztBQUNULFVBQU1DLFVBQVVDLGVBQUtDLElBQUwsQ0FDZEMsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWlCLEdBQUVDLGlCQUFZLHFCQUEvQixDQURjLEVBRWRDLG1CQUZjLENBQWhCOztBQUtBLFNBQUtYLE9BQUwsR0FBZSxJQUFmOztBQUVBLFdBQU8scUJBQ0xPLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFpQixHQUFFQyxpQkFBWSxxQkFBL0IsQ0FESyxFQUVMLEVBRkssRUFHTCxNQUFNRSxNQUFOLElBQWdCO0FBQ2QsV0FBSyxNQUFNQyxLQUFYLElBQW9CRCxNQUFwQixFQUE0QjtBQUMxQixZQUNHQyxNQUFNUixJQUFOLEtBQWVELE9BQWYsSUFBMEJTLE1BQU1DLE1BQU4sS0FBaUJDLGFBQU9DLFFBQW5ELElBQ0NILE1BQU1DLE1BQU4sS0FBaUJDLGFBQU9FLE9BQXhCLElBQW1DSixNQUFNUixJQUFOLEtBQWVELE9BRnJELEVBR0U7QUFDQSxlQUFLTixPQUFMLENBQWFvQixJQUFiLENBQWtCLHFCQUFsQixH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SUFBM0IsQ0FBZ0NGLFdBQVc7QUFDekMsVUFBSTtBQUNGLGNBQU1vRCxnQkFBZ0IvQixLQUFLb0IsS0FBTCxDQUFXekMsT0FBWCxDQUF0QjtBQUNBeUIsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQzBCLGFBQWpDO0FBQ0QsT0FIRCxDQUlBLE9BQU9WLENBQVAsRUFBVTtBQUNSLGFBQUtsRSxPQUFMLENBQWFvQixJQUFiLENBQWtCb0IsY0FBUXFDLEtBQTFCLEVBQWlDO0FBQy9CZixnQkFBTSxPQUR5QjtBQUUvQmdCLHVCQUFhQyxTQUFTdkMsT0FBVCxDQUFpQndDO0FBRkMsU0FBakM7QUFJRDtBQUNGLEtBWEQ7QUFZRDs7QUFFRDs7OztBQUlBQyx5QkFBd0JDLFFBQXhCLEVBQWtDO0FBQ2hDLFNBQUtsRixPQUFMLENBQWFtRixFQUFiLENBQWdCLHFCQUFoQixFQUF1Q0QsUUFBdkM7QUFDRDs7QUFFRDs7Ozs7QUFLQUUsY0FBYUYsUUFBYixFQUF1QkcsT0FBdkIsRUFBZ0M7QUFDOUIsUUFBSUEsT0FBSixFQUFhO0FBQ1gsV0FBS3JGLE9BQUwsQ0FBYXNGLElBQWIsQ0FBa0I5QyxjQUFRQyxjQUExQixFQUEwQ3lDLFFBQTFDO0FBQ0QsS0FGRCxNQUdLO0FBQ0gsV0FBS2xGLE9BQUwsQ0FBYW1GLEVBQWIsQ0FBZ0IzQyxjQUFRQyxjQUF4QixFQUF3Q3lDLFFBQXhDO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs7O0FBTUFLLGFBQVlMLFFBQVosRUFBc0I7QUFDcEIsU0FBS2xGLE9BQUwsQ0FBYW1GLEVBQWIsQ0FBZ0IzQyxjQUFRcUMsS0FBeEIsRUFBK0JLLFFBQS9CO0FBQ0Q7QUE1UThCO2tCQUFadEYsVyIsImZpbGUiOiJmaWxlLWNvbnRlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWl0dGVyLCBGaWxlLCBDb21wb3NpdGVEaXNwb3NhYmxlLCB3YXRjaFBhdGggfSBmcm9tICdhdG9tJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREVTRVJJQUxJWkVSLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRSxcbiAgQUNUSU9OLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcblxuLyoqXG4gKiBBIGNsYXNzIHJlcHJlc2VudGluZyBhbGwgcmVsYXRlZCBvcGVyYXRpb25zIHdpdGggZmlsZSBjb250ZW50IG1hbmFnZW1lbnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVDb250ZW50IHtcbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHdhdGNoZXIgKCkge1xuICAgIGNvbnN0IERCX0ZJTEUgPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgcmV0dXJuIHdhdGNoUGF0aChcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICB7fSxcbiAgICAgIGFzeW5jIGV2ZW50cyA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGV2ZW50LnBhdGggPT09IERCX0ZJTEUgJiYgZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uTU9ESUZJRUQpIHx8XG4gICAgICAgICAgICAoZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uUkVOQU1FRCAmJiBldmVudC5wYXRoID09PSBEQl9GSUxFKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2ZpbGUtY29udGVudC1jaGFuZ2UnLCBhd2FpdCB0aGlzLnJlYWRGaWxlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChldmVudC5wYXRoID09PSBEQl9GSUxFICYmIGV2ZW50LmFjdGlvbiA9PT0gQUNUSU9OLkRFTEVURUQpIHx8XG4gICAgICAgICAgICAoZXZlbnQuYWN0aW9uID09PSBBQ1RJT04uUkVOQU1FRCAmJiBldmVudC5vbGRQYXRoID09PSBEQl9GSUxFKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2ZpbGUtY29udGVudC1jaGFuZ2UnLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgLy8gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApLnRoZW4ocGF0aFdhdGNoZXIgPT4ge1xuICAgICAgdGhpcy5maWxlID0gbmV3IEZpbGUoREJfRklMRSk7XG4gICAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChwYXRoV2F0Y2hlcik7XG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy53YXRjaGVyKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBhc3luYyByZWFkRmlsZSAoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmlsZVxuICAgICAgLmV4aXN0cygpXG4gICAgICAudGhlbihleGlzdHMgPT4gKGV4aXN0cyA/IHRoaXMucmVhZENvbnRlbnQoKSA6IFByb21pc2UucmVqZWN0KCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBvcGVuRmlsZSAoKSB7XG4gICAgY29uc3QgREJfRklMRSA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBEQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIGlmICghREJfRklMRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oREJfRklMRSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICogVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGV4dGVybmFsIGNoYW5nZXMgdG8gdGhlIGRhdGFiYXNlXG4gICAqIGZpbGUgZXhpc3RzIGJlY2F1c2UgdGhlcmUgaXMgbm8gd2F5IGtub3cgd2hhdCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICB1cGRhdGUgKCkge1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KEVNSVRURVIuQ0hBTkdFX0NPTlRFTlQsIHRoaXMuY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgYXN5bmMgY3JlYXRlRGF0YWJhc2UgKCkge1xuICAgIHRoaXMuZmlsZVxuICAgICAgLmV4aXN0cygpXG4gICAgICAudGhlbihleGlzdHMgPT4gKGV4aXN0cyA/IHRoaXMuZmlsZS5jcmVhdGUoKSA6IFByb21pc2UucmVqZWN0KCkpKVxuICAgICAgLnRoZW4oKCkgPT5cbiAgICAgICAgdGhpcy5maWxlLndyaXRlKEpTT04uc3RyaW5naWZ5KHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH0sIG51bGwsIDIpKVxuICAgICAgKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlZCcpO1xuICAgICAgICAvLyB0aGlzLnJlYWRDb250ZW50KClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnbm90IGNyZWF0ZWQnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudEdyb3VwIC0gY3VycmVudCBwYXJlbnQgZ3JvdXAgY29udGVudFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZW5vcm1hbGl6ZWQgb2JqZWN0IGNvbnRlbnQgdG8gYmUgc2F2ZWRcbiAgICovXG4gIGRlbm9ybWFsaXplQ29udGVudCAocGFyZW50R3JvdXApIHtcbiAgICBjb25zdCBkZW5vcm1hbGl6ZWQgPSB7XG4gICAgICAuLi5wYXJlbnRHcm91cC5tb2RlbCxcbiAgICAgIGV4cGFuZGVkOiBwYXJlbnRHcm91cC5leHBhbmRlZCxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuXG4gICAgcGFyZW50R3JvdXAuY2hpbGRyZW4uZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jb250ZW50Lm1hcFtjaGlsZElkXTtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5ncm91cHMucHVzaCh0aGlzLmRlbm9ybWFsaXplQ29udGVudChjaGlsZCkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGRlbm9ybWFsaXplZC5wcm9qZWN0cy5wdXNoKHsgLi4uY2hpbGQubW9kZWwgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGVub3JtYWxpemVkO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBhc3luYyByZWFkQ29udGVudCAoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuZmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc3Qgcm9vdCA9IHtcbiAgICAgIC8vICAgaWQ6IHV1aWQoKSxcbiAgICAgIC8vICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIC8vICAgZXhwYW5kZWQ6IHRydWUsXG4gICAgICAvLyAgIG1vZGVsOiB7fSxcbiAgICAgIC8vICAgY2hpbGRyZW46IFtdLFxuICAgICAgLy8gICBwYXJlbnRJZDogdW5kZWZpbmVkXG4gICAgICAvLyB9O1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnN0IGlkcyA9IFtyb290LmlkXTtcbiAgICAgIC8vIGNvbnN0IG1hcCA9IEFycmF5LmZyb20odGhpcy5zdGF0ZS5saXN0KCkpLnJlZHVjZShcbiAgICAgIC8vICAgKGFjYywgdmFsKSA9PiB7XG4gICAgICAvLyAgICAgY29uc3QgaWQgPSB2YWxbMF07XG4gICAgICAvLyAgICAgY29uc3QgcmVzb3VyY2UgPSB7XG4gICAgICAvLyAgICAgICAuLi52YWxbMV0sXG4gICAgICAvLyAgICAgICBpZFxuICAgICAgLy8gICAgIH07XG4gICAgICAvLyAgICAgYWNjW2lkXSA9IHJlc291cmNlO1xuICAgICAgLy8gICAgIGlkcy5wdXNoKGlkKTtcbiAgICAgIC8vXG4gICAgICAvLyAgICAgaWYgKHJlc291cmNlLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIC8vICAgICAgIGFjY1tpZF0uY2hpbGRyZW4gPSBbXTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgICAgaWYgKHJlc291cmNlLnBhcmVudElkKSB7XG4gICAgICAvLyAgICAgICBhY2NbcmVzb3VyY2UucGFyZW50SWRdLmNoaWxkcmVuLnB1c2goaWQpO1xuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgICBlbHNlIHtcbiAgICAgIC8vICAgICAgIGFjY1tyb290LmlkXS5jaGlsZHJlbi5wdXNoKGlkKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgICAgcmV0dXJuIGFjYztcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICAgeyBbcm9vdC5pZF06IHJvb3QgfVxuICAgICAgLy8gKTtcbiAgICAgIC8vXG4gICAgICAvLyB0aGlzLmNvbnRlbnQgPSB7XG4gICAgICAvLyAgIGlkcyxcbiAgICAgIC8vICAgbWFwLFxuICAgICAgLy8gICBwYXJlbnRJZDogbnVsbCxcbiAgICAgIC8vICAgc2VsZWN0ZWRJZDogbnVsbFxuICAgICAgLy8gfTtcbiAgICAgIC8vIHRoaXMudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgc2F2ZUNvbnRlbnQgKCkge1xuICAgIGNvbnN0IHBhcmVudEdyb3VwSWQgPSB0aGlzLmNvbnRlbnQuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLmNvbnRlbnQubWFwW2lkXS5wYXJlbnRJZCA9PT0gdW5kZWZpbmVkXG4gICAgKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB0aGlzLmRlbm9ybWFsaXplQ29udGVudCh0aGlzLmNvbnRlbnQubWFwW3BhcmVudEdyb3VwSWRdKTtcblxuICAgIHRoaXMuZmlsZS53cml0ZShKU09OLnN0cmluZ2lmeShub3JtYWxpemVkLCBudWxsLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgcmVhZExlZ2FjeUNvbnRlbnQgKCkge1xuICAgIHRoaXMubGVnYWN5RmlsZS5yZWFkKHRydWUpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBsZWdhY3lDb250ZW50ID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlYWRMZWdhY3lDb250ZW50JywgbGVnYWN5Q29udGVudCk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SLCB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogTUVTU0FHRVMuRU1JVFRFUi5CQURfTEVHQUNZX0NPTlRFTlRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZEZpbGVDb250ZW50Q2hhbmdlIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbignZmlsZS1jb250ZW50LWNoYW5nZScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBvbmVUaW1lIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkQ2hhbmdlIChjYWxsYmFjaywgb25lVGltZSkge1xuICAgIGlmIChvbmVUaW1lKSB7XG4gICAgICB0aGlzLmVtaXR0ZXIub25jZShFTUlUVEVSLkNIQU5HRV9DT05URU5ULCBjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5lbWl0dGVyLm9uKEVNSVRURVIuQ0hBTkdFX0NPTlRFTlQsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZEVycm9yIChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbihFTUlUVEVSLkVSUk9SLCBjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==