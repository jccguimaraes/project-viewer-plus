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
      'project-viewer-plus:add-entry': evt => this.addEntry(evt.target.nodeName !== 'UL' && evt.target.closest('li') ? evt.target.closest('li').id : NaN),
      'project-viewer-plus:edit-entry': evt => evt.target.closest('li') && this.editEntry(evt.target.closest('li').id),
      'project-viewer-plus:delete-entry': evt => evt.target.closest('li') && this.deleteEntry(evt.target.closest('li').id)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjcmVhdGVNYWluVmlldyIsImFkZExpc3QiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJwYXJlbnRJZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJpZCIsImRlbGV0ZUVudHJ5IiwiQ29uZmlybURlbGV0ZSIsImFkZE1vZGFsUGFuZWwiLCJhZGQiLCJjb21tYW5kcyIsImNsZWFyU3RhdGUiLCJzYXZlRmlsZSIsImVkaXRGaWxlIiwiY29udGVudCIsInJlYWRGaWxlIiwiaW5pdGlhbGl6ZVN0YXRlIiwicmVhZExlZ2FjeUZpbGUiLCJyb290IiwidG9nZ2xlTWFpblZpc2liaWxpdHkiLCJldnQiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNsb3Nlc3QiLCJOYU4iLCJ0b2dnbGUiLCJ0b2dnbGVNYWluRm9jdXMiLCJ0b2dnbGVGb2N1cyIsImZpbGVQYXRoIiwicGF0aCIsImpvaW4iLCJnZXRDb25maWdEaXJQYXRoIiwiREFUQUJBU0VfRklMRSIsIkxFR0FDWV9EQVRBQkFTRV9GSUxFIiwiY3VycmVudFN0YXRlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxlQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsUUFBTixDQUFnQkMsVUFBaEIsRUFBNEI7QUFBQTs7QUFBQTtBQUMxQixNQUFBLEtBQUksQ0FBQ0MsYUFBTCxHQUFxQixJQUFJQyx5QkFBSixDQUNuQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVDLFNBQWYsQ0FBeUJDLEdBQUcsSUFBSSxLQUFJLENBQUNDLFVBQUwsQ0FBZ0JELEdBQWhCLENBQWhDLENBRG1CLEVBRW5CLElBQUlFLGdCQUFKLENBQWUsTUFBTTtBQUNuQkwsUUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVLLFlBQWYsR0FBOEJDLE9BQTlCLENBQXNDQyxJQUFJLElBQUk7QUFDNUMsY0FBSUEsSUFBSSxZQUFZQyxhQUFwQixFQUFtQztBQUNqQ0QsWUFBQUEsSUFBSSxDQUFDRSxPQUFMO0FBQ0Q7QUFDRixTQUpEO0FBS0QsT0FORCxDQUZtQixDQUFyQjs7QUFXQUMscUJBQU1mLFFBQU47O0FBRUEsVUFBSUksSUFBSSxDQUFDQyxTQUFMLENBQWVXLFVBQWYsQ0FBMEJDLGNBQTFCLENBQUosRUFBeUM7QUFDdkMsUUFBQSxLQUFJLENBQUNDLGFBQUwsQ0FBbUJsQixRQUFuQjtBQUNEOztBQUVELE1BQUEsS0FBSSxDQUFDbUIsU0FBTCxDQUFlbEIsVUFBVSxDQUFDYyxLQUExQjs7QUFDQSxNQUFBLEtBQUksQ0FB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ckQsRUFBMkQsQ0FBM0QsQ0FGSSxDQUFOO0FBRmdCO0FBTWpCO0FBRUQ7Ozs7O0FBR01YLEVBQUFBLFFBQU4sR0FBa0I7QUFBQTtBQUNoQixVQUFNZSxRQUFRLEdBQUdDLGNBQUtDLElBQUwsQ0FBVXRELElBQUksQ0FBQ3VELGdCQUFMLEVBQVYsRUFBbUNDLG1CQUFuQyxDQUFqQjs7QUFDQXhELE1BQUFBLElBQUksQ0FBQ0MsU0FBTCxDQUFla0UsSUFBZixDQUFvQmYsUUFBcEI7QUFGZ0I7QUFHakI7QUFFRDs7Ozs7OztBQUtNekIsRUFBQUEsVUFBTixDQUFrQkUsRUFBbEIsRUFBc0JILFFBQXRCLEVBQWdDO0FBQUE7QUFDOUIxQixNQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZWtFLElBQWYsUUFBMEIsSUFBSUMsZUFBSixDQUFvQnZDLEVBQXBCLEVBQXdCSCxRQUF4QixDQUExQjtBQUQ4QjtBQUUvQjtBQUVEOzs7Ozs7QUFJQTJDLEVBQUFBLFNBQVMsR0FBSTtBQUNYLFdBQU87QUFDTDFELE1BQUFBLEtBQUssRUFBRUEsZUFBTXVELGtCQUFOLEVBREY7QUFFTEksTUFBQUEsWUFBWSxFQUFFO0FBRlQsS0FBUDtBQUlEO0FBRUQ7OztBQUNBQyxFQUFBQSxnQ0FBZ0MsQ0FBRTFFLFVBQUYsRUFBYztBQUM1QyxXQUFPLEtBQUtzQixjQUFMLEVBQVA7QUFDRDs7QUF6UHNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5cbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRSxcbiAgRE9DS19VUklcbn0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgeyByZWFkRmlsZSwgc2F2ZUZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZCBzZXJpYWxpemVkIGNvbnRlbnQsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkLnN0YXRlIGN1cnJlbnQgc3RhdGVcbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChzZXJpYWxpemVkKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoXG4gICAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIodXJpID0+IHRoaXMubWFpbk9wZW5lcih1cmkpKSxcbiAgICAgIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UGFuZUl0ZW1zKCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIE1haW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzdGF0ZS5hY3RpdmF0ZSgpO1xuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkoRE9DS19VUkkpKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlYWRTdGF0ZShzZXJpYWxpemVkLnN0YXRlKTtcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgLy8gdGhpcy5hZGRMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG4gICAgLy8gdGhpcy5zZWxlY3RMaXN0LmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG1haW5PcGVuZXIgKHVyaSkge1xuICAgIGlmICh1cmkgPT09IERPQ0tfVVJJKSB7XG4gICAgICB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuYWN0aXZhdGUodHJ1ZSk7XG4gICAgICByZXR1cm4gdGhpcy5tYWluQ29udGFpbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNyZWF0ZU1haW5WaWV3ICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKHBhcmVudElkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKG51bGwsIHBhcmVudElkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGVkaXRFbnRyeSAoaWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKGlkKTtcbiAgICBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIHJlZ2lzdGVyIGNvbW1hbmRzXG4gICAqL1xuICBhZGRDb21tYW5kcyAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6Y2xlYXItY3VycmVudC1zdGF0ZSc6ICgpID0+IHtcbiAgICAgICAgICBzdGF0ZS5jbGVhclN0YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnNhdmUtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnNhdmVGaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmVkaXRGaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZWRpdG9yJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtbGVnYWN5LWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUodHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PlxuICAgICAgICAgIHRoaXMudG9nZ2xlTWFpblZpc2liaWxpdHkoKSxcbiAgICAgICAgLy8gJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4gdGhpcy50b2dnbGVNYWluRm9jdXMoKSxcbiAgICAgICAgLy8gJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWxpc3QnOiAoKSA9PiB0aGlzLnRvZ2dsZVNlbGVjdExpc3QoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6YWRkLWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgdGhpcy5hZGRFbnRyeShcbiAgICAgICAgICAgIGV2dC50YXJnZXQubm9kZU5hbWUgIT09ICdVTCcgJiYgZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgICAgID8gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkIDogTmFOXG4gICAgICAgICAgKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIChldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykpICYmXG4gICAgICAgICAgICB0aGlzLmVkaXRFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknOiBldnQgPT5cbiAgICAgICAgICAoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpKSAmJlxuICAgICAgICAgICAgdGhpcy5kZWxldGVFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluVmlzaWJpbGl0eSAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKERPQ0tfVVJJKTtcbiAgICAvLyBpZiAoIXRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgIC8vICAgdGhpcy5jcmVhdGVNYWluVmlldygpO1xuICAgIC8vIH1cbiAgICAvLyB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgY3VycmVudCBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBsZWdhY3kgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkTGVnYWN5RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIExFR0FDWV9EQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgcmVhZFN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzb21ldGhpbmcgcmVhbGx5IHdyb25nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2F2ZSB0aGUgY3VycmVudCBzdGF0ZSB0byB0aGUgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgc2F2ZUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcbiAgICBhd2FpdCBzYXZlRmlsZShcbiAgICAgIGZpbGVQYXRoLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKE5hTiwgZmFsc2UpLCBudWxsLCAyKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICovXG4gIGFzeW5jIGVkaXRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSB0aGUgZW50cnkgcGFyZW50IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoaWQsIHBhcmVudElkKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKGlkLCBwYXJlbnRJZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpLFxuICAgICAgZGVzZXJpYWxpemVyOiAncHJvamVjdC12aWV3ZXItcGx1cy9tYWluJ1xuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyAoc2VyaWFsaXplZCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gIH1cbn1cbiJdfQ==