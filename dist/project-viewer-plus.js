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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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


  activate(serialized) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.subscriptions = new _atom.CompositeDisposable(atom.workspace.addOpener(uri => _this.mainOpener(uri)), new _atom.Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof _main.default) {
            item.destroy();
          }
        });
      }));

      _state.default.activate();

      if (atom.workspace.paneForURI(_base.DOCK_URI)) {
        _this.mainContainer.activate();
      }

      _this.readState(serialized.state);

      _this.addCommands(); // this.addList();

    })();
  }
  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */


  deactivate() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.subscriptions.dispose();

      _state.default.deactivate(); // this.selectList.destroy();

    })();
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


  addList() {
    // this compoment has performance issues
    this.selectList = new _selectList.default();
  }
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
    var item = new _confirmDelete.default(id);
    atom.workspace.addModalPanel({
      item
    });
  }
  /**
   * Handler to register commands
   */


  addCommands() {
    var _this3 = this;

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
      'project-viewer-plus:read-file': function () {
        var _projectViewerPlusReadFile = _asyncToGenerator(function* () {
          var content = yield _this3.readFile();

          _state.default.initializeState(content, true);
        });

        function projectViewerPlusReadFile() {
          return _projectViewerPlusReadFile.apply(this, arguments);
        }

        return projectViewerPlusReadFile;
      }(),
      'project-viewer-plus:read-legacy-file': function () {
        var _projectViewerPlusReadLegacyFile = _asyncToGenerator(function* () {
          var content = yield _this3.readLegacyFile();

          _state.default.initializeState((0, _legacy.transformLegacyContent)(content.root), true);
        });

        function projectViewerPlusReadLegacyFile() {
          return _projectViewerPlusReadLegacyFile.apply(this, arguments);
        }

        return projectViewerPlusReadLegacyFile;
      }(),
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
    var filePath = _path.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }
  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */


  readLegacyFile() {
    var filePath = _path.default.join(atom.getConfigDirPath(), _base.LEGACY_DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }
  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */


  readState(currentState) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      try {
        return _state.default.initializeState(currentState, true);
      } catch (err) {
        currentState = yield _this4.readFile();
      }

      try {
        return _state.default.initializeState(currentState, true);
      } catch (err) {
        var content = yield _this4.readLegacyFile();
        currentState = (0, _legacy.transformLegacyContent)(content.root);
      }

      try {
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
        console.log('something really wrong');
      }
    })();
  }
  /**
   * handler to save the current state to the file.
   * @param {string} id - the entry id if in edit mode
   */


  saveFile() {
    return _asyncToGenerator(function* () {
      var filePath = _path.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);

      yield (0, _file.saveFile)(filePath, JSON.stringify(_state.default.serializeGroupById(NaN, false), null, 2));
    })();
  }
  /**
   * handler to open the Editor view.
   */


  editFile() {
    return _asyncToGenerator(function* () {
      var filePath = _path.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);

      atom.workspace.open(filePath);
    })();
  }
  /**
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
   * @param {string} parentId - the entry parent id if in edit mode
   */


  openEditor(id, parentId) {
    return _asyncToGenerator(function* () {
      atom.workspace.open((yield new _editor.default(id, parentId)));
    })();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjcmVhdGVNYWluVmlldyIsImFkZExpc3QiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJhZGRFbnRyeSIsInBhcmVudElkIiwib3BlbkVkaXRvciIsImVkaXRFbnRyeSIsImlkIiwiZGVsZXRlRW50cnkiLCJDb25maXJtRGVsZXRlIiwiYWRkTW9kYWxQYW5lbCIsImFkZCIsImNvbW1hbmRzIiwiY2xlYXJTdGF0ZSIsInNhdmVGaWxlIiwiZWRpdEZpbGUiLCJjb250ZW50IiwicmVhZEZpbGUiLCJpbml0aWFsaXplU3RhdGUiLCJyZWFkTGVnYWN5RmlsZSIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsIk5hTiIsInRvZ2dsZSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJEQVRBQkFTRV9GSUxFIiwiTEVHQUNZX0RBVEFCQVNFX0ZJTEUiLCJjdXJyZW50U3RhdGUiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5Iiwic2VyaWFsaXplR3JvdXBCeUlkIiwib3BlbiIsIkVkaXRvckNvbnRhaW5lciIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplciIsImRlc2VyaWFsaXplUHJvamVjdFZpZXdlclBsdXNWaWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBTUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLEdBQU4sQ0FBVTtBQUN2Qjs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU9DLGVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1NQyxFQUFBQSxRQUFOLENBQWdCQyxVQUFoQixFQUE0QjtBQUFBOztBQUFBO0FBQzFCLE1BQUEsS0FBSSxDQUFDQyxhQUFMLEdBQXFCLElBQUlDLHlCQUFKLENBQ25CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUMsU0FBZixDQUF5QkMsR0FBRyxJQUFJLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBaEMsQ0FEbUIsRUFFbkIsSUFBSUUsZ0JBQUosQ0FBZSxNQUFNO0FBQ25CTCxRQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZUssWUFBZixHQUE4QkMsT0FBOUIsQ0FBc0NDLElBQUksSUFBSTtBQUM1QyxjQUFJQSxJQUFJLFlBQVlDLGFBQXBCLEVBQW1DO0FBQ2pDRCxZQUFBQSxJQUFJLENBQUNFLE9BQUw7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5ELENBRm1CLENBQXJCOztBQVdBQyxxQkFBTWYsUUFBTjs7QUFFQSxVQUFJSSxJQUFJLENBQUNDLFNBQUwsQ0FBZVcsVUFBZixDQUEwQkMsY0FBMUIsQ0FBSixFQUF5QztBQUN2QyxRQUFBLEtBQUksQ0FBQ0MsYUFBTCxDQUFtQmxCLFFBQW5CO0FBQ0Q7O0FBRUQsTUFBQSxLQUFJLENBQUNtQixTQUFMLENBQWVsQixVQUFVLENBQUNjLEtBQTFCOztBQUNBLE1BQUEsS0FBSSxDQUFDSyxXQUFM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LGtCQUFOLENBQXlCakIsR0FBekIsRUFBOEIsS0FBOUIsQ0FBZixFQUFxRCxJQUFyRCxFQUEyRCxDQUEzRCxDQUZJLENBQU47QUFGZ0I7QUFNakI7QUFFRDs7Ozs7QUFHTVosRUFBQUEsUUFBTixHQUFrQjtBQUFBO0FBQ2hCLFVBQU1lLFFBQVEsR0FBR0MsY0FBS0MsSUFBTCxDQUFVckQsSUFBSSxDQUFDc0QsZ0JBQUwsRUFBVixFQUFtQ0MsbUJBQW5DLENBQWpCOztBQUNBdkQsTUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVpRSxJQUFmLENBQW9CZixRQUFwQjtBQUZnQjtBQUdqQjtBQUVEOzs7Ozs7O0FBS016QixFQUFBQSxVQUFOLENBQWtCRSxFQUFsQixFQUFzQkgsUUFBdEIsRUFBZ0M7QUFBQTtBQUM5QnpCLE1BQUFBLElBQUksQ0FBQ0MsU0FBTCxDQUFlaUUsSUFBZixRQUEwQixJQUFJQyxlQUFKLENBQW9CdkMsRUFBcEIsRUFBd0JILFFBQXhCLENBQTFCO0FBRDhCO0FBRS9CO0FBRUQ7Ozs7OztBQUlBMkMsRUFBQUEsU0FBUyxHQUFJO0FBQ1gsV0FBTztBQUNMekQsTUFBQUEsS0FBSyxFQUFFQSxlQUFNc0Qsa0JBQU4sRUFERjtBQUVMSSxNQUFBQSxZQUFZLEVBQUU7QUFGVCxLQUFQO0FBSUQ7QUFFRDs7O0FBQ0FDLEVBQUFBLGdDQUFnQyxDQUFFekUsVUFBRixFQUFjO0FBQzVDLFdBQU8sS0FBS3NCLGNBQUwsRUFBUDtBQUNEOztBQXZQc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUsIERpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcblxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHtcbiAgUExVR0lOX05BTUUsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIExFR0FDWV9EQVRBQkFTRV9GSUxFLFxuICBET0NLX1VSSVxufSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCB7IHJlYWRGaWxlLCBzYXZlRmlsZSB9IGZyb20gJy4vc2VydmljZXMvZmlsZSc7XG5pbXBvcnQgeyB0cmFuc2Zvcm1MZWdhY3lDb250ZW50IH0gZnJvbSAnLi9zZXJ2aWNlcy9sZWdhY3knO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL2VkaXRvcic7XG5pbXBvcnQgQ29uZmlybURlbGV0ZSBmcm9tICcuL2NvbXBvbmVudHMvY29uZmlybS1kZWxldGUnO1xuXG4vKipcbiAqIFBhY2thZ2UncyBlbnRyeSBwb2ludCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQVlAge1xuICAvKipcbiAgICogUmV0dXJucyB0aGlzIHBhY2thZ2UgY29uZmlndXJhdGlvbiBvYmplY3Qgc3BlY2lmaWMgdG8gQXRvbVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkIHNlcmlhbGl6ZWQgY29udGVudCwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWQuc3RhdGUgY3VycmVudCBzdGF0ZVxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHNlcmlhbGl6ZWQpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZShcbiAgICAgIGF0b20ud29ya3NwYWNlLmFkZE9wZW5lcih1cmkgPT4gdGhpcy5tYWluT3BlbmVyKHVyaSkpLFxuICAgICAgbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRQYW5lSXRlbXMoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgTWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgaXRlbS5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHN0YXRlLmFjdGl2YXRlKCk7XG5cbiAgICBpZiAoYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShET0NLX1VSSSkpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVhZFN0YXRlKHNlcmlhbGl6ZWQuc3RhdGUpO1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICAvLyB0aGlzLmFkZExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIHN0YXRlLmRlYWN0aXZhdGUoKTtcbiAgICAvLyB0aGlzLnNlbGVjdExpc3QuZGVzdHJveSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgbWFpbk9wZW5lciAodXJpKSB7XG4gICAgaWYgKHVyaSA9PT0gRE9DS19VUkkpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSh0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlTWFpblZpZXcgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIC8vIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAocGFyZW50SWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IobnVsbCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUoaWQpO1xuICAgIGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpjbGVhci1jdXJyZW50LXN0YXRlJzogKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2F2ZUZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdEZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1sZWdhY3ktZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAgICAgPyBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQgOiBOYU5cbiAgICAgICAgICApLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgKGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKSkgJiZcbiAgICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIChldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykpICYmXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUoRE9DS19VUkkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICBpZiAodGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBMRUdBQ1lfREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIHJlYWRTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIHJlYWxseSB3cm9uZycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNhdmUgdGhlIGN1cnJlbnQgc3RhdGUgdG8gdGhlIGZpbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIHNhdmVGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG4gICAgYXdhaXQgc2F2ZUZpbGUoXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZChOYU4sIGZhbHNlKSwgbnVsbCwgMilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBlZGl0RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gdGhlIGVudHJ5IHBhcmVudCBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIG9wZW5FZGl0b3IgKGlkLCBwYXJlbnRJZCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcihpZCwgcGFyZW50SWQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiBzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSxcbiAgICAgIGRlc2VyaWFsaXplcjogJ3Byb2plY3Qtdmlld2VyLXBsdXMvbWFpbidcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVzZXJpYWxpemVQcm9qZWN0Vmlld2VyUGx1c1ZpZXcgKHNlcmlhbGl6ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVNYWluVmlldygpO1xuICB9XG59XG4iXX0=