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
      'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjcmVhdGVNYWluVmlldyIsImFkZExpc3QiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJwYXJlbnRJZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJpZCIsImRlbGV0ZUVudHJ5IiwiQ29uZmlybURlbGV0ZSIsImFkZE1vZGFsUGFuZWwiLCJhZGQiLCJjb21tYW5kcyIsImNsZWFyU3RhdGUiLCJzYXZlRmlsZSIsImVkaXRGaWxlIiwiY29udGVudCIsInJlYWRGaWxlIiwiaW5pdGlhbGl6ZVN0YXRlIiwicmVhZExlZ2FjeUZpbGUiLCJyb290IiwidG9nZ2xlTWFpblZpc2liaWxpdHkiLCJ0b2dnbGVNYWluRm9jdXMiLCJldnQiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNsb3Nlc3QiLCJOYU4iLCJ0b2dnbGUiLCJ0b2dnbGVGb2N1cyIsImZpbGVQYXRoIiwicGF0aCIsImpvaW4iLCJnZXRDb25maWdEaXJQYXRoIiwiREFUQUJBU0VfRklMRSIsIkxFR0FDWV9EQVRBQkFTRV9GSUxFIiwiY3VycmVudFN0YXRlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLEdBQU4sQ0FBVTtBQUN2Qjs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU9DLGVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1NQyxFQUFBQSxRQUFOLENBQWdCQyxVQUFoQixFQUE0QjtBQUFBOztBQUFBO0FBQzFCLE1BQUEsS0FBSSxDQUFDQyxhQUFMLEdBQXFCLElBQUlDLHlCQUFKLENBQ25CQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUMsU0FBZixDQUF5QkMsR0FBRyxJQUFJLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBaEMsQ0FEbUIsRUFFbkIsSUFBSUUsZ0JBQUosQ0FBZSxNQUFNO0FBQ25CTCxRQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZUssWUFBZixHQUE4QkMsT0FBOUIsQ0FBc0NDLElBQUksSUFBSTtBQUM1QyxjQUFJQSxJQUFJLFlBQVlDLGFBQXBCLEVBQW1DO0FBQ2pDRCxZQUFBQSxJQUFJLENBQUNFLE9BQUw7QUFDRDtBQUNGLFNBSkQ7QUFLRCxPQU5ELENBRm1CLENBQXJCOztBQVdBQyxxQkFBTWYsUUFBTjs7QUFFQSxVQUFJSSxJQUFJLENBQUNDLFNBQUwsQ0FBZVcsVUFBZixDQUEwQkMsY0FBMUIsQ0FBSixFQUF5QztBQUN2QyxRQUFBLEtBQUksQ0FBQ0MsYUFBTCxDQUFtQmxCLFFBQW5CO0FBQ0Q7O0FBRUQsTUFBQSxLQUFJLENBQUNtQixTQUFMLENBQWVsQixVQUFVLENBQUNjLEtBQTFCOztBQUNBLE1BQUEs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QixVQUFNZSxRQUFRLEdBQUdDLGNBQUtDLElBQUwsQ0FBVXRELElBQUksQ0FBQ3VELGdCQUFMLEVBQVYsRUFBbUNDLG1CQUFuQyxDQUFqQjs7QUFDQXhELE1BQUFBLElBQUksQ0FBQ0MsU0FBTCxDQUFla0UsSUFBZixDQUFvQmYsUUFBcEI7QUFGZ0I7QUFHakI7QUFFRDs7Ozs7OztBQUtNekIsRUFBQUEsVUFBTixDQUFrQkUsRUFBbEIsRUFBc0JILFFBQXRCLEVBQWdDO0FBQUE7QUFDOUIxQixNQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZWtFLElBQWYsUUFBMEIsSUFBSUMsZUFBSixDQUFvQnZDLEVBQXBCLEVBQXdCSCxRQUF4QixDQUExQjtBQUQ4QjtBQUUvQjtBQUVEOzs7Ozs7QUFJQTJDLEVBQUFBLFNBQVMsR0FBSTtBQUNYLFdBQU87QUFDTDFELE1BQUFBLEtBQUssRUFBRUEsZUFBTXVELGtCQUFOLEVBREY7QUFFTEksTUFBQUEsWUFBWSxFQUFFO0FBRlQsS0FBUDtBQUlEO0FBRUQ7OztBQUNBQyxFQUFBQSxnQ0FBZ0MsQ0FBRTFFLFVBQUYsRUFBYztBQUM1QyxXQUFPLEtBQUtzQixjQUFMLEVBQVA7QUFDRDs7QUF0UHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEUsXG4gIERPQ0tfVVJJXG59IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IHsgcmVhZEZpbGUsIHNhdmVGaWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlJztcbmltcG9ydCB7IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2xlZ2FjeSc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcbmltcG9ydCBDb25maXJtRGVsZXRlIGZyb20gJy4vY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZSc7XG5cbi8qKlxuICogUGFja2FnZSdzIGVudHJ5IHBvaW50IGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBWUCB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoaXMgcGFja2FnZSBjb25maWd1cmF0aW9uIG9iamVjdCBzcGVjaWZpYyB0byBBdG9tXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWQgc2VyaWFsaXplZCBjb250ZW50LCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZC5zdGF0ZSBjdXJyZW50IHN0YXRlXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc2VyaWFsaXplZCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKFxuICAgICAgYXRvbS53b3Jrc3BhY2UuYWRkT3BlbmVyKHVyaSA9PiB0aGlzLm1haW5PcGVuZXIodXJpKSksXG4gICAgICBuZXcgRGlzcG9zYWJsZSgoKSA9PiB7XG4gICAgICAgIGF0b20ud29ya3NwYWNlLmdldFBhbmVJdGVtcygpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBNYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgc3RhdGUuYWN0aXZhdGUoKTtcblxuICAgIGlmIChhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKERPQ0tfVVJJKSkge1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWFkU3RhdGUoc2VyaWFsaXplZC5zdGF0ZSk7XG4gICAgdGhpcy5hZGRDb21tYW5kcygpO1xuICAgIC8vIHRoaXMuYWRkTGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgZGVhY3RpdmF0ZWRcbiAgICovXG4gIGFzeW5jIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gICAgc3RhdGUuZGVhY3RpdmF0ZSgpO1xuICAgIC8vIHRoaXMuc2VsZWN0TGlzdC5kZXN0cm95KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBtYWluT3BlbmVyICh1cmkpIHtcbiAgICBpZiAodXJpID09PSBET0NLX1VSSSkge1xuICAgICAgdGhpcy5jcmVhdGVNYWluVmlldygpO1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmFjdGl2YXRlKHRydWUpO1xuICAgICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjcmVhdGVNYWluVmlldyAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICByZXR1cm4gdGhpcy5tYWluQ29udGFpbmVyO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkTGlzdCAoKSB7XG4gICAgLy8gdGhpcyBjb21wb21lbnQgaGFzIHBlcmZvcm1hbmNlIGlzc3Vlc1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzaG93IHRoZSBTZWxlY3QgTGlzdCB2aWV3LlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEVudHJ5IChwYXJlbnRJZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihudWxsLCBwYXJlbnRJZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKGlkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlbGV0ZUVudHJ5IChpZCkge1xuICAgIGNvbnN0IGl0ZW0gPSBuZXcgQ29uZmlybURlbGV0ZShpZCk7XG4gICAgYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW0gfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byByZWdpc3RlciBjb21tYW5kc1xuICAgKi9cbiAgYWRkQ29tbWFuZHMgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmNsZWFyLWN1cnJlbnQtc3RhdGUnOiAoKSA9PiB7XG4gICAgICAgICAgc3RhdGUuY2xlYXJTdGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpzYXZlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zYXZlRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lZGl0RmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoXG4gICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lICE9PSAnVUwnID8gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkIDogTmFOXG4gICAgICAgICAgKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZGVsZXRlRW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpblZpc2liaWxpdHkgKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnRvZ2dsZShET0NLX1VSSSk7XG4gICAgLy8gaWYgKCF0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAvLyAgIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgICAvLyB9XG4gICAgLy8gdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5Gb2N1cyAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZUZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBMRUdBQ1lfREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIHJlYWRTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIHJlYWxseSB3cm9uZycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNhdmUgdGhlIGN1cnJlbnQgc3RhdGUgdG8gdGhlIGZpbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIHNhdmVGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG4gICAgYXdhaXQgc2F2ZUZpbGUoXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZChOYU4sIGZhbHNlKSwgbnVsbCwgMilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBlZGl0RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudElkIC0gdGhlIGVudHJ5IHBhcmVudCBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIG9wZW5FZGl0b3IgKGlkLCBwYXJlbnRJZCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcihpZCwgcGFyZW50SWQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXRlOiBzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSxcbiAgICAgIGRlc2VyaWFsaXplcjogJ3Byb2plY3Qtdmlld2VyLXBsdXMvbWFpbidcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVzZXJpYWxpemVQcm9qZWN0Vmlld2VyUGx1c1ZpZXcgKHNlcmlhbGl6ZWQpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVNYWluVmlldygpO1xuICB9XG59XG4iXX0=