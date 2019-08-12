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
          console.log(e);
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
          console.log(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkTGlzdCIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwicGFuZSIsImNyZWF0ZU1haW5WaWV3IiwidG9nZ2xlU2VsZWN0TGlzdCIsImFkZEVudHJ5IiwicGFyZW50SWQiLCJvcGVuRWRpdG9yIiwiZWRpdEVudHJ5IiwiaWQiLCJkZWxldGVFbnRyeSIsIkNvbmZpcm1EZWxldGUiLCJhZGRNb2RhbFBhbmVsIiwiYWRkIiwiY29tbWFuZHMiLCJjbGVhclN0YXRlIiwic2F2ZUZpbGUiLCJlZGl0RmlsZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsIm5vdGlmaWNhdGlvbnMiLCJhZGRFcnJvciIsImljb24iLCJpbml0aWFsaXplU3RhdGUiLCJlIiwiY29uc29sZSIsImxvZyIsInJlYWRMZWdhY3lGaWxlIiwiYWRkSW5mbyIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsIk5hTiIsInRvZ2dsZSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldCIsIlBMVUdJTl9OQU1FIiwiTEVHQUNZX0RBVEFCQVNFX0ZJTEUiLCJjdXJyZW50U3RhdGUiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXJpYWxpemVHcm91cEJ5SWQiLCJvcGVuIiwiRWRpdG9yQ29udGFpbmVyIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVyIiwiZGVzZXJpYWxpemVQcm9qZWN0Vmlld2VyUGx1c1ZpZXciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFNQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7QUFHZSxNQUFNQSxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxlQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxRQUFNQyxRQUFOLENBQWdCQyxVQUFoQixFQUE0QjtBQUMxQixTQUFLQyxhQUFMLEdBQXFCLElBQUlDLHlCQUFKLENBQ25CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUMsU0FBZixDQUF5QkMsR0FBRyxJQUFJLEtBQUtDLFVBQUwsQ0FBZ0JELEdBQWhCLENBQWhDLENBRG1CLEVBRW5CLElBQUlFLGdCQUFKLENBQWUsTUFBTTtBQUNuQkwsTUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVLLFlBQWYsR0FBOEJDLE9BQTlCLENBQXNDQyxJQUFJLElBQUk7QUFDNUMsWUFBSUEsSUFBSSxZQUFZQyxhQUFwQixFQUFtQztBQUNqQ0QsVUFBQUEsSUFBSSxDQUFDRSxPQUFMO0FBQ0Q7QUFDRixPQUpEO0FBS0QsS0FORCxDQUZtQixDQUFyQjs7QUFXQUMsbUJBQU1mLFFBQU47O0FBRUEsUUFBSUksSUFBSSxDQUFDQyxTQUFMLENBQWVXLFVBQWYsQ0FBMEJDLGNBQTFCLENBQUosRUFBeUM7QUFDdkMsV0FBS0MsYUFBTCxDQUFtQmxCLFFBQW5CO0FBQ0Q7O0FBRUQsU0FBS21CLFNBQUwsQ0FBZWxCLFVBQVUsQ0FBQ2MsS0FBMUI7QUFDQSxTQUFLSyxXQUFMO0FBQ0EsU0FBS0MsT0FBTDtBQUNEO0FBRUQ7Ozs7O0FBR0EsUUFBTUMsVUFBTixH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U0FBTCxDQUFlcUUsSUFBZixDQUFvQmIsUUFBcEI7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsUUFBTWhDLFVBQU4sQ0FBa0JFLEVBQWxCLEVBQXNCSCxRQUF0QixFQUFnQztBQUM5QnhCLElBQUFBLElBQUksQ0FBQ0MsU0FBTCxDQUFlcUUsSUFBZixFQUFvQixNQUFNLElBQUlDLGVBQUosQ0FBb0I1QyxFQUFwQixFQUF3QkgsUUFBeEIsQ0FBMUI7QUFDRDtBQUVEOzs7Ozs7QUFJQWdELEVBQUFBLFNBQVMsR0FBSTtBQUNYLFdBQU87QUFDTDdELE1BQUFBLEtBQUssRUFBRUEsZUFBTTBELGtCQUFOLEVBREY7QUFFTEksTUFBQUEsWUFBWSxFQUFFO0FBRlQsS0FBUDtBQUlEO0FBRUQ7OztBQUNBQyxFQUFBQSxnQ0FBZ0MsQ0FBRTdFLFVBQUYsRUFBYztBQUM1QyxXQUFPLEtBQUt3QixjQUFMLEVBQVA7QUFDRDs7QUFwU3NCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5cbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRSxcbiAgRE9DS19VUklcbn0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgeyByZWFkRmlsZSwgc2F2ZUZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZCBzZXJpYWxpemVkIGNvbnRlbnQsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkLnN0YXRlIGN1cnJlbnQgc3RhdGVcbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChzZXJpYWxpemVkKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoXG4gICAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIodXJpID0+IHRoaXMubWFpbk9wZW5lcih1cmkpKSxcbiAgICAgIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UGFuZUl0ZW1zKCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIE1haW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzdGF0ZS5hY3RpdmF0ZSgpO1xuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkoRE9DS19VUkkpKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlYWRTdGF0ZShzZXJpYWxpemVkLnN0YXRlKTtcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgdGhpcy5hZGRMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG5cbiAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShET0NLX1VSSSk7XG5cbiAgICBpZiAocGFuZSkge1xuICAgICAgcGFuZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgbWFpbk9wZW5lciAodXJpKSB7XG4gICAgaWYgKHVyaSA9PT0gRE9DS19VUkkpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSh0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlTWFpblZpZXcgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICAvLyB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIC8vIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAocGFyZW50SWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IobnVsbCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUoaWQpO1xuICAgIGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpjbGVhci1jdXJyZW50LXN0YXRlJzogKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2F2ZUZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdEZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcihcbiAgICAgICAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6IG5vICoqZGF0YWJhc2UqKiBmaWxlIGZvdW5kJyxcbiAgICAgICAgICAgICAgeyBpY29uOiAnYm9va21hcmsnIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY29udGVudCwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtbGVnYWN5LWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkSW5mbyhcbiAgICAgICAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6IG5vICoqbGVnYWN5KiogZGF0YWJhc2UgZmlsZSBmb3VuZCcsXG4gICAgICAgICAgICAgIHsgaWNvbjogJ2Jvb2ttYXJrJyB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoXG4gICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lICE9PSAnVUwnICYmIGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKVxuICAgICAgICAgICAgICA/IGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCA6IE5hTlxuICAgICAgICAgICksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICAoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpKSAmJlxuICAgICAgICAgICAgdGhpcy5lZGl0RW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgKGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKSkgJiZcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpblZpc2liaWxpdHkgKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnRvZ2dsZShET0NLX1VSSSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluRm9jdXMgKCkge1xuICAgIGlmICh0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgY3VycmVudCBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmZpbGVOYW1lYClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIExFR0FDWV9EQVRBQkFTRV9GSUxFXG4gICAgKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgcmVhZFN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICBsZXQgY29udGVudDtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCk7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czogY291bGQgbm90IGNyZWF0ZSBzdGF0ZScsXG4gICAgICAgIHsgaWNvbjogJ2Jvb2ttYXJrJyB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNhdmUgdGhlIGN1cnJlbnQgc3RhdGUgdG8gdGhlIGZpbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIHNhdmVGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZGF0YWJhc2UubG9jYWxQYXRoYCksXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmZpbGVOYW1lYClcbiAgICApO1xuXG4gICAgYXdhaXQgc2F2ZUZpbGUoXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZChOYU4sIGZhbHNlKSwgbnVsbCwgMilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBlZGl0RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5maWxlTmFtZWApXG4gICAgKTtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZCAtIHRoZSBlbnRyeSBwYXJlbnQgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yIChpZCwgcGFyZW50SWQpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoaWQsIHBhcmVudElkKSk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCksXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdwcm9qZWN0LXZpZXdlci1wbHVzL21haW4nXG4gICAgfTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlc2VyaWFsaXplUHJvamVjdFZpZXdlclBsdXNWaWV3IChzZXJpYWxpemVkKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgfVxufVxuIl19