"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _atom = require("atom");

var dependencies = _interopRequireWildcard(require("atom-package-deps"));

var _config = _interopRequireDefault(require("./constants/config"));

var _base = require("./constants/base");

var _state = _interopRequireDefault(require("./services/state"));

var _file = require("./services/file");

var _legacy = require("./services/legacy");

var _main = _interopRequireDefault(require("./containers/main"));

var _selectList = _interopRequireDefault(require("./containers/select-list"));

var _editor = _interopRequireDefault(require("./containers/editor"));

var _confirmDelete = _interopRequireDefault(require("./components/confirm-delete"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
      yield dependencies.install(_base.PLUGIN_NAME);

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


  toggleSelectList() {
    this.selectList.show();
  }
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
      // 'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      // 'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
      'project-viewer-plus:add-entry': evt => this.addEntry(evt.target.nodeName !== 'UL' ? evt.target.closest('li').id : NaN),
      'project-viewer-plus:edit-entry': evt => this.editEntry(evt.target.closest('li').id),
      'project-viewer-plus:delete-entry': evt => this.deleteEntry(evt.target.closest('li').id)
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainVisibility() {
    atom.workspace.toggle(_base.DOCK_URI); // if (!this.mainContainer) {
    //   this.createMainView();
    // }
    // this.mainContainer.toggleVisibility();
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainFocus() {
    this.mainContainer.toggleFocus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsImRlcGVuZGVuY2llcyIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjcmVhdGVNYWluVmlldyIsImFkZExpc3QiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJwYXJlbnRJZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJpZCIsImRlbGV0ZUVudHJ5IiwiQ29uZmlybURlbGV0ZSIsImFkZE1vZGFsUGFuZWwiLCJhZGQiLCJjb21tYW5kcyIsImNsZWFyU3RhdGUiLCJzYXZlRmlsZSIsImVkaXRGaWxlIiwiY29udGVudCIsInJlYWRGaWxlIiwiaW5pdGlhbGl6ZVN0YXRlIiwicmVhZExlZ2FjeUZpbGUiLCJyb290IiwidG9nZ2xlTWFpblZpc2liaWxpdHkiLCJldnQiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNsb3Nlc3QiLCJOYU4iLCJ0b2dnbGUiLCJ0b2dnbGVNYWluRm9jdXMiLCJ0b2dnbGVGb2N1cyIsImZpbGVQYXRoIiwicGF0aCIsImpvaW4iLCJnZXRDb25maWdEaXJQYXRoIiwiREFUQUJBU0VfRklMRSIsIkxFR0FDWV9EQVRBQkFTRV9GSUxFIiwiY3VycmVudFN0YXRlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLEdBQU4sQ0FBVTtBQUN2Qjs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU9DLGVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1NQyxFQUFBQSxRQUFOLENBQWdCQyxVQUFoQixFQUE0QjtBQUFBOztBQUFBO0FBQzFCLE1BQUEsS0FBSSxDQUFDQyxhQUFMLEdBQXFCLElBQUlDLHlCQUFKLENBQ25CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUMsU0FBZixDQUF5QkMsR0FBRyxJQUFJLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBaEMsQ0FEbUIsRUFFbkIsSUFBSUUsZ0JBQUosQ0FBZSxNQUFNO0FBQ25CTCxRQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZUssWUFBZixHQUE4QkMsT0FBOUIsQ0FBc0NDLElBQUksSUFBSTtBQUM1QyxjQUFJQSxJQUFJLFlBQVlDLGFBQXBCLEVBQW1DO0FBQ2pDRCxZQUFBQSxJQUFJLENBQUNFLE9BQUw7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5ELENBRm1CLENBQXJCO0FBV0EsWUFBTUMsWUFBWSxDQUFDQyxPQUFiLENBQXFCQyxpQkFBckIsQ0FBTjs7QUFFQUMscUJBQU1sQixRQUFOOztBQUVBLFVBQUlJLElBQUksQ0FBQ0MsU0FBTCxDQUFlYyxVQUFmLENBQTBCQyxjQUExQixDQUFKLEVBQXlDO0FBQ3ZDLFFBQUEsS0FBSSxDQUFDQyxh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QSxRQUFOLEdBQWtCO0FBQUE7QUFDaEIsVUFBTWUsUUFBUSxHQUFHQyxjQUFLQyxJQUFMLENBQVV6RCxJQUFJLENBQUMwRCxnQkFBTCxFQUFWLEVBQW1DQyxtQkFBbkMsQ0FBakI7O0FBQ0EzRCxNQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZXFFLElBQWYsQ0FBb0JmLFFBQXBCO0FBRmdCO0FBR2pCO0FBRUQ7Ozs7Ozs7QUFLTXpCLEVBQUFBLFVBQU4sQ0FBa0JFLEVBQWxCLEVBQXNCSCxRQUF0QixFQUFnQztBQUFBO0FBQzlCN0IsTUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVxRSxJQUFmLFFBQTBCLElBQUlDLGVBQUosQ0FBb0J2QyxFQUFwQixFQUF3QkgsUUFBeEIsQ0FBMUI7QUFEOEI7QUFFL0I7QUFFRDs7Ozs7O0FBSUEyQyxFQUFBQSxTQUFTLEdBQUk7QUFDWCxXQUFPO0FBQ0wxRCxNQUFBQSxLQUFLLEVBQUVBLGVBQU11RCxrQkFBTixFQURGO0FBRUxJLE1BQUFBLFlBQVksRUFBRTtBQUZULEtBQVA7QUFJRDtBQUVEOzs7QUFDQUMsRUFBQUEsZ0NBQWdDLENBQUU3RSxVQUFGLEVBQWM7QUFDNUMsV0FBTyxLQUFLeUIsY0FBTCxFQUFQO0FBQ0Q7O0FBeFBzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcblxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHtcbiAgUExVR0lOX05BTUUsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIExFR0FDWV9EQVRBQkFTRV9GSUxFLFxuICBET0NLX1VSSVxufSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCB7IHJlYWRGaWxlLCBzYXZlRmlsZSB9IGZyb20gJy4vc2VydmljZXMvZmlsZSc7XG5pbXBvcnQgeyB0cmFuc2Zvcm1MZWdhY3lDb250ZW50IH0gZnJvbSAnLi9zZXJ2aWNlcy9sZWdhY3knO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL2VkaXRvcic7XG5pbXBvcnQgQ29uZmlybURlbGV0ZSBmcm9tICcuL2NvbXBvbmVudHMvY29uZmlybS1kZWxldGUnO1xuXG4vKipcbiAqIFBhY2thZ2UncyBlbnRyeSBwb2ludCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQVlAge1xuICAvKipcbiAgICogUmV0dXJucyB0aGlzIHBhY2thZ2UgY29uZmlndXJhdGlvbiBvYmplY3Qgc3BlY2lmaWMgdG8gQXRvbVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkIHNlcmlhbGl6ZWQgY29udGVudCwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWQuc3RhdGUgY3VycmVudCBzdGF0ZVxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHNlcmlhbGl6ZWQpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZShcbiAgICAgIGF0b20ud29ya3NwYWNlLmFkZE9wZW5lcih1cmkgPT4gdGhpcy5tYWluT3BlbmVyKHVyaSkpLFxuICAgICAgbmV3IERpc3Bvc2FibGUoKCkgPT4ge1xuICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRQYW5lSXRlbXMoKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgTWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgICAgaXRlbS5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGF3YWl0IGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcblxuICAgIHN0YXRlLmFjdGl2YXRlKCk7XG5cbiAgICBpZiAoYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShET0NLX1VSSSkpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVhZFN0YXRlKHNlcmlhbGl6ZWQuc3RhdGUpO1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICAvLyB0aGlzLmFkZExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIHN0YXRlLmRlYWN0aXZhdGUoKTtcbiAgICAvLyB0aGlzLnNlbGVjdExpc3QuZGVzdHJveSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgbWFpbk9wZW5lciAodXJpKSB7XG4gICAgaWYgKHVyaSA9PT0gRE9DS19VUkkpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSh0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlTWFpblZpZXcgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAocGFyZW50SWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IobnVsbCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUoaWQpO1xuICAgIGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpjbGVhci1jdXJyZW50LXN0YXRlJzogKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2F2ZUZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdEZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1sZWdhY3ktZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAvLyAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAvLyAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyA/IGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCA6IE5hTlxuICAgICAgICAgICksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmVkaXRFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUoRE9DS19VUkkpO1xuICAgIC8vIGlmICghdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgLy8gICB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gICAgLy8gfVxuICAgIC8vIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluRm9jdXMgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBjdXJyZW50IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGxlZ2FjeSBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRMZWdhY3lGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgTEVHQUNZX0RBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyByZWFkU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyByZWFsbHkgd3JvbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzYXZlIHRoZSBjdXJyZW50IHN0YXRlIHRvIHRoZSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBzYXZlRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuICAgIGF3YWl0IHNhdmVGaWxlKFxuICAgICAgZmlsZVBhdGgsXG4gICAgICBKU09OLnN0cmluZ2lmeShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoTmFOLCBmYWxzZSksIG51bGwsIDIpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKi9cbiAgYXN5bmMgZWRpdEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRJZCAtIHRoZSBlbnRyeSBwYXJlbnQgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yIChpZCwgcGFyZW50SWQpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoaWQsIHBhcmVudElkKSk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0ZTogc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCksXG4gICAgICBkZXNlcmlhbGl6ZXI6ICdwcm9qZWN0LXZpZXdlci1wbHVzL21haW4nXG4gICAgfTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlc2VyaWFsaXplUHJvamVjdFZpZXdlclBsdXNWaWV3IChzZXJpYWxpemVkKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgfVxufVxuIl19