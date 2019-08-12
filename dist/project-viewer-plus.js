"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _atom = require("atom");

var _config = _interopRequireDefault(require("./constants/config"));

var _base = require("./constants/base");

var _state = _interopRequireDefault(require("./services/state"));

var _file = require("./services/file");

var _legacy = require("./services/legacy");

var _main = _interopRequireDefault(require("./containers/main"));

var _selectList = _interopRequireDefault(require("./containers/select-list"));

var _editor = _interopRequireDefault(require("./containers/editor"));

var _confirmDelete = _interopRequireDefault(require("./components/confirm-delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Package's entry point class
 */
class PVP {
  /**
   * Returns this package configuration object specific to Atom
   * @returns {Object} the package configuration
   */
  get config() {
    return _config.default;
  }
  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} serialized serialized content, should be dealt by atom
   * deserialization process
   * @param {Object} serialized.state current state
   */


  async activate(serialized) {
    this.subscriptions = new _atom.CompositeDisposable(atom.workspace.addOpener(uri => this.mainOpener(uri)), new _atom.Disposable(() => {
      atom.workspace.getPaneItems().forEach(item => {
        if (item instanceof _main.default) {
          item.destroy();
        }
      });
    }));

    _state.default.activate();

    if (atom.workspace.paneForURI(_base.DOCK_URI)) {
      this.mainContainer.activate();
    }

    this.readState(serialized.state);
    this.addCommands();
    this.addList();
  }
  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */


  async deactivate() {
    this.subscriptions.dispose();

    _state.default.deactivate();

    const pane = atom.workspace.paneForURI(_base.DOCK_URI);

    if (pane) {
      pane.destroy();
    }
  }
  /* eslint-disable-next-line require-jsdoc */


  mainOpener(uri) {
    if (uri === _base.DOCK_URI) {
      this.createMainView();
      this.mainContainer.activate(true);
      return this.mainContainer;
    }
  }
  /* eslint-disable-next-line require-jsdoc */


  createMainView() {
    this.mainContainer = new _main.default();
    return this.mainContainer;
  }
  /* eslint-disable-next-line require-jsdoc */


  addList() {} // this compoment has performance issues
  // this.selectList = new SelectList();

  /**
   * handler to show the Select List view.
   */


  toggleSelectList() {} // this.selectList.show();

  /* eslint-disable-next-line require-jsdoc */


  addEntry(parentId) {
    this.openEditor(null, parentId);
  }
  /* eslint-disable-next-line require-jsdoc */


  editEntry(id) {
    this.openEditor(id);
  }
  /* eslint-disable-next-line require-jsdoc */


  deleteEntry(id) {
    const item = new _confirmDelete.default(id);
    atom.workspace.addModalPanel({
      item
    });
  }
  /**
   * Handler to register commands
   */


  addCommands() {
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'project-viewer-plus:clear-current-state': () => {
        _state.default.clearState();
      },
      'project-viewer-plus:save-file': () => {
        this.saveFile();
      },
      'project-viewer-plus:edit-file': () => {
        this.editFile();
      },
      'project-viewer-plus:open-editor': () => {
        this.openEditor();
      },
      'project-viewer-plus:read-file': async () => {
        const content = await this.readFile();

        if (!content) {
          return atom.notifications.addError('project-viewer-plus: no **database** file found', {
            icon: 'bookmark'
          });
        }

        try {
          _state.default.initializeState(content, true);
        } catch (e) {
          atom.notifications.addError('project-viewer-plus: error reading **database** from file', {
            icon: 'bookmark'
          });
        }
      },
      'project-viewer-plus:read-legacy-file': async () => {
        const content = await this.readLegacyFile();

        if (!content) {
          return atom.notifications.addInfo('project-viewer-plus: no **legacy** database file found', {
            icon: 'bookmark'
          });
        }

        try {
          _state.default.initializeState((0, _legacy.transformLegacyContent)(content.root), true);
        } catch (e) {
          atom.notifications.addError('project-viewer-plus: error reading **database** from file', {
            icon: 'bookmark'
          });
        }
      },
      'project-viewer-plus:toggle-visibility': () => this.toggleMainVisibility(),
      'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
      'project-viewer-plus:add-entry': evt => this.addEntry(evt.target.nodeName !== 'UL' && evt.target.closest('li') ? evt.target.closest('li').id : NaN),
      'project-viewer-plus:edit-entry': evt => evt.target.closest('li') && this.editEntry(evt.target.closest('li').id),
      'project-viewer-plus:delete-entry': evt => evt.target.closest('li') && this.deleteEntry(evt.target.closest('li').id)
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainVisibility() {
    atom.workspace.toggle(_base.DOCK_URI);
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainFocus() {
    if (this.mainContainer) {
      this.mainContainer.toggleFocus();
    }
  }
  /**
   * handler to read from the current file schema
   * @returns {Object} JSON parsed file content
   */


  readFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), atom.config.get(`${_base.PLUGIN_NAME}.database.fileName`));

    return (0, _file.readFile)(filePath);
  }
  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */


  readLegacyFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.LEGACY_DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }
  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */


  async readState(currentState) {
    let content;

    try {
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      currentState = await this.readFile();
    }

    try {
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      content = await this.readLegacyFile();
    }

    try {
      currentState = (0, _legacy.transformLegacyContent)(content.root);
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      currentState = {
        groups: [],
        projects: []
      };
    }

    try {
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      atom.notifications.addError('project-viewer-plus: could not create state', {
        icon: 'bookmark'
      });
    }
  }
  /**
   * handler to save the current state to the file.
   * @param {string} id - the entry id if in edit mode
   */


  async saveFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), atom.config.get(`${_base.PLUGIN_NAME}.database.fileName`));

    await (0, _file.saveFile)(filePath, JSON.stringify(_state.default.serializeGroupById(NaN, false), null, 2));
  }
  /**
   * handler to open the Editor view.
   */


  async editFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), atom.config.get(`${_base.PLUGIN_NAME}.database.fileName`));

    atom.workspace.open(filePath);
  }
  /**
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
   * @param {string} parentId - the entry parent id if in edit mode
   */


  async openEditor(id, parentId) {
    atom.workspace.open((await new _editor.default(id, parentId)));
  }
  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */


  serialize() {
    return {
      state: _state.default.serializeGroupById(),
      deserializer: 'project-viewer-plus/main'
    };
  }
  /* eslint-disable-next-line require-jsdoc */


  deserializeProjectViewerPlusView(serialized) {
    return this.createMainView();
  }

}

exports.default = PVP;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkTGlzdCIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwicGFuZSIsImNyZWF0ZU1haW5WaWV3IiwidG9nZ2xlU2VsZWN0TGlzdCIsImFkZEVudHJ5IiwicGFyZW50SWQiLCJvcGVuRWRpdG9yIiwiZWRpdEVudHJ5IiwiaWQiLCJkZWxldGVFbnRyeSIsIkNvbmZpcm1EZWxldGUiLCJhZGRNb2RhbFBhbmVsIiwiYWRkIiwiY29tbWFuZHMiLCJjbGVhclN0YXRlIiwic2F2ZUZpbGUiLCJlZGl0RmlsZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsIm5vdGlmaWNhdGlvbnMiLCJhZGRFcnJvciIsImljb24iLCJpbml0aWFsaXplU3RhdGUiLCJlIiwicmVhZExlZ2FjeUZpbGUiLCJhZGRJbmZvIiwicm9vdCIsInRvZ2dsZU1haW5WaXNpYmlsaXR5IiwidG9nZ2xlTWFpbkZvY3VzIiwiZXZ0IiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJjbG9zZXN0IiwiTmFOIiwidG9nZ2xlIiwidG9nZ2xlRm9jdXMiLCJmaWxlUGF0aCIsInBhdGgiLCJqb2luIiwiZ2V0IiwiUExVR0lOX05BTUUiLCJMRUdBQ1lfREFUQUJBU0VfRklMRSIsImN1cnJlbnRTdGF0ZSIsImVyciIsImdyb3VwcyIsInByb2plY3RzIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7OztBQUdlLE1BQU1BLEdBQU4sQ0FBVTtBQUN2Qjs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU9DLGVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFFBQU1DLFFBQU4sQ0FBZ0JDLFVBQWhCLEVBQTRCO0FBQzFCLFNBQUtDLGFBQUwsR0FBcUIsSUFBSUMseUJBQUosQ0FDbkJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlQyxTQUFmLENBQXlCQyxHQUFHLElBQUksS0FBS0MsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBaEMsQ0FEbUIsRUFFbkIsSUFBSUUsZ0JBQUosQ0FBZSxNQUFNO0FBQ25CTCxNQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZUssWUFBZixHQUE4QkMsT0FBOUIsQ0FBc0NDLElBQUksSUFBSTtBQUM1QyxZQUFJQSxJQUFJLFlBQVlDLGFBQXBCLEVBQW1DO0FBQ2pDRCxVQUFBQSxJQUFJLENBQUNFLE9BQUw7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLQU5ELENBRm1CLENBQXJCOztBQVdBQyxtQkFBTWYsUUFBTjs7QUFFQSxRQUFJSSxJQUFJLENBQUNDLFNBQUwsQ0FBZVcsVUFBZixDQUEwQkMsY0FBMUIsQ0FBSixFQUF5QztBQUN2QyxXQUFLQyxhQUFMLENBQW1CbEIsUUFBbkI7QUFDRDs7QUFFRCxTQUFLbUIsU0FBTCxDQUFlbEIsVUFBVSxDQUFDYyxLQUExQjtBQUNBLFNBQUtLLFdBQUw7QUFDQSxTQUFLQyxPQUFMO0FBQ0Q7QUFFRDs7Ozs7QUFHQSxRQUFNQyxVQUFOLEdBQW9CO0FBQ2xCLFNBQUtw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QUFJLENBQUNOLE1BQUwsQ0FBWWdFLEdBQVosQ0FBaUIsR0FBRUMsaUJBQVksb0JBQS9CLENBRmUsQ0FBakI7O0FBSUEzRCxJQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZW1FLElBQWYsQ0FBb0JiLFFBQXBCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU05QixVQUFOLENBQWtCRSxFQUFsQixFQUFzQkgsUUFBdEIsRUFBZ0M7QUFDOUJ4QixJQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZW1FLElBQWYsRUFBb0IsTUFBTSxJQUFJQyxlQUFKLENBQW9CMUMsRUFBcEIsRUFBd0JILFFBQXhCLENBQTFCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUE4QyxFQUFBQSxTQUFTLEdBQUk7QUFDWCxXQUFPO0FBQ0wzRCxNQUFBQSxLQUFLLEVBQUVBLGVBQU13RCxrQkFBTixFQURGO0FBRUxJLE1BQUFBLFlBQVksRUFBRTtBQUZULEtBQVA7QUFJRDtBQUVEOzs7QUFDQUMsRUFBQUEsZ0NBQWdDLENBQUUzRSxVQUFGLEVBQWM7QUFDNUMsV0FBTyxLQUFLd0IsY0FBTCxFQUFQO0FBQ0Q7O0FBMVNzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEUsXG4gIERPQ0tfVVJJXG59IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IHsgcmVhZEZpbGUsIHNhdmVGaWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlJztcbmltcG9ydCB7IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2xlZ2FjeSc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcbmltcG9ydCBDb25maXJtRGVsZXRlIGZyb20gJy4vY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZSc7XG5cbi8qKlxuICogUGFja2FnZSdzIGVudHJ5IHBvaW50IGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBWUCB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoaXMgcGFja2FnZSBjb25maWd1cmF0aW9uIG9iamVjdCBzcGVjaWZpYyB0byBBdG9tXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWQgc2VyaWFsaXplZCBjb250ZW50LCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZC5zdGF0ZSBjdXJyZW50IHN0YXRlXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc2VyaWFsaXplZCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKHVyaSA9PiB0aGlzLm1haW5PcGVuZXIodXJpKSksXG4gICAgICBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIGF0b20ud29ya3NwYWNlLmdldFBhbmVJdGVtcygpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBNYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgc3RhdGUuYWN0aXZhdGUoKTtcblxuICAgIGlmIChhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKERPQ0tfVVJJKSkge1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkU3RhdGUoc2VyaWFsaXplZC5zdGF0ZSk7XG4gICAgdGhpcy5hZGRDb21tYW5kcygpO1xuICAgIHRoaXMuYWRkTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgZGVhY3RpdmF0ZWRcbiAgICovXG4gIGFzeW5jIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gICAgc3RhdGUuZGVhY3RpdmF0ZSgpO1xuXG4gICAgY29uc3QgcGFuZSA9IGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkoRE9DS19VUkkpO1xuXG4gICAgaWYgKHBhbmUpIHtcbiAgICAgIHBhbmUuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG1haW5PcGVuZXIgKHVyaSkge1xuICAgIGlmICh1cmkgPT09IERPQ0tfVVJJKSB7XG4gICAgICB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuYWN0aXZhdGUodHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5tYWluQ29udGFpbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNyZWF0ZU1haW5WaWV3ICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgLy8gdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICAvLyB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKHBhcmVudElkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKG51bGwsIHBhcmVudElkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGVkaXRFbnRyeSAoaWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKGlkKTtcbiAgICBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIHJlZ2lzdGVyIGNvbW1hbmRzXG4gICAqL1xuICBhZGRDb21tYW5kcyAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6Y2xlYXItY3VycmVudC1zdGF0ZSc6ICgpID0+IHtcbiAgICAgICAgICBzdGF0ZS5jbGVhclN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnNhdmUtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNhdmVGaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmVkaXRGaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZWRpdG9yJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXG4gICAgICAgICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOiBubyAqKmRhdGFiYXNlKiogZmlsZSBmb3VuZCcsXG4gICAgICAgICAgICAgIHsgaWNvbjogJ2Jvb2ttYXJrJyB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czogZXJyb3IgcmVhZGluZyAqKmRhdGFiYXNlKiogZnJvbSBmaWxlJyxcbiAgICAgICAgICAgICAgeyBpY29uOiAnYm9va21hcmsnIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oXG4gICAgICAgICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOiBubyAqKmxlZ2FjeSoqIGRhdGFiYXNlIGZpbGUgZm91bmQnLFxuICAgICAgICAgICAgICB7IGljb246ICdib29rbWFyaycgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czogZXJyb3IgcmVhZGluZyAqKmRhdGFiYXNlKiogZnJvbSBmaWxlJyxcbiAgICAgICAgICAgICAgeyBpY29uOiAnYm9va21hcmsnIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAgICAgPyBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQgOiBOYU5cbiAgICAgICAgICApLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgKGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKSkgJiZcbiAgICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIChldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykpICYmXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUoRE9DS19VUkkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICBpZiAodGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5maWxlTmFtZWApXG4gICAgKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGxlZ2FjeSBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRMZWdhY3lGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBMRUdBQ1lfREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIHJlYWRTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgbGV0IGNvbnRlbnQ7XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6IGNvdWxkIG5vdCBjcmVhdGUgc3RhdGUnLFxuICAgICAgICB7IGljb246ICdib29rbWFyaycgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzYXZlIHRoZSBjdXJyZW50IHN0YXRlIHRvIHRoZSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBzYXZlRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5maWxlTmFtZWApXG4gICAgKTtcblxuICAgIGF3YWl0IHNhdmVGaWxlKFxuICAgICAgZmlsZVBhdGgsXG4gICAgICBKU09OLnN0cmluZ2lmeShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoTmFOLCBmYWxzZSksIG51bGwsIDIpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKi9cbiAgYXN5bmMgZWRpdEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UuZmlsZU5hbWVgKVxuICAgICk7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSB0aGUgZW50cnkgcGFyZW50IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoaWQsIHBhcmVudElkKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKGlkLCBwYXJlbnRJZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpLFxuICAgICAgZGVzZXJpYWxpemVyOiAncHJvamVjdC12aWV3ZXItcGx1cy9tYWluJ1xuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyAoc2VyaWFsaXplZCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gIH1cbn1cbiJdfQ==