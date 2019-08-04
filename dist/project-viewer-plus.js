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
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */


  activate(currentState) {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('state', currentState);
      _this.disposables = new _atom.CompositeDisposable();
      yield dependencies.install(_base.PLUGIN_NAME);
      atom.packages.onDidActivateInitialPackages(() => _this.activationInitialization(currentState));
    })();
  }
  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */


  deactivate() {
    this.mainContainer.destroyMainItem();
    this.selectList.destroy();

    _state.default.deactivate();

    this.disposables.dispose();
  }
  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */


  serialize() {
    return _state.default.serializeGroupById();
  }
  /* eslint-disable-next-line require-jsdoc */


  activationInitialization(currentState) {
    this.addItemToDock();
    this.addList();
    console.log('stored state', currentState);
    this.readState(currentState);
    this.addCommands();
    this.addContextMenu();
  }
  /* eslint-disable-next-line require-jsdoc */


  addItemToDock() {
    this.mainContainer = new _main.default();
    console.log('MAIN');
    this.mainContainer.addMainItem();
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
    var _this2 = this;

    this.disposables.add(atom.commands.add('atom-workspace', {
      'project-viewer-plus:clear-current-state': () => {
        console.log('project-viewer-plus:clear-current-state');

        _state.default.clearState();
      },
      'project-viewer-plus:save-file': () => {
        console.log('project-viewer-plus:save-file');
        this.saveFile();
      },
      'project-viewer-plus:edit-file': () => {
        console.log('project-viewer-plus:edit-file');
        this.editFile();
      },
      'project-viewer-plus:open-editor': () => {
        this.openEditor();
      },
      'project-viewer-plus:read-file': function () {
        var _projectViewerPlusReadFile = _asyncToGenerator(function* () {
          var content = yield _this2.readFile();

          _state.default.initializeState(content, true);
        });

        function projectViewerPlusReadFile() {
          return _projectViewerPlusReadFile.apply(this, arguments);
        }

        return projectViewerPlusReadFile;
      }(),
      'project-viewer-plus:read-legacy-file': function () {
        var _projectViewerPlusReadLegacyFile = _asyncToGenerator(function* () {
          var content = yield _this2.readLegacyFile();

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
    }), atom.commands.add(this.mainContainer.element, {
      'core:move-up': function coreMoveUp() {
        console.log('core:move-up');
      },
      'core:move-down': function coreMoveDown() {
        console.log('core:move-down');
      },
      'core:move-left': function coreMoveLeft() {
        console.log('core:move-left');
      },
      'core:move-right': function coreMoveRight() {
        console.log('core:move-right');
      },
      'core:confirm': function coreConfirm() {
        console.log('core:confirm');
      }
    }), atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(item => {
      if (item !== this.mainContainer) {
        return;
      }

      atom.config.set("".concat(_base.PLUGIN_NAME, ".dock.position"), 'left');
    }), atom.workspace.getRightDock().onDidStopChangingActivePaneItem(item => {
      if (item !== this.mainContainer) {
        return;
      }

      atom.config.set("".concat(_base.PLUGIN_NAME, ".dock.position"), 'right');
    }), atom.config.onDidChange("".concat(_base.PLUGIN_NAME, ".dock.position"), () => {
      this.mainContainer.destroyMainItem();
      this.addItemToDock();
      this.readState(_state.default.serializeGroupById());
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  addContextMenu() {
    this.disposables.add(atom.contextMenu.add({
      '.project-viewer-plus': [{
        command: 'project-viewer-plus:add-entry',
        label: 'Add group/project...',
        shouldDisplay: evt => evt.target.nodeName === 'UL' || !evt.target.closest('li').className.includes('pv-project')
      }],
      '.project-viewer-plus .pv-group': [{
        command: 'project-viewer-plus:edit-entry',
        label: 'Edit group...'
      }, {
        command: 'project-viewer-plus:delete-entry',
        label: 'Delete group...'
      }],
      '.project-viewer-plus .pv-project': [{
        command: 'project-viewer-plus:edit-entry',
        label: 'Edit project...'
      }, {
        command: 'project-viewer-plus:delete-entry',
        label: 'Delete project...'
      }]
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainVisibility() {
    this.mainContainer.toggleVisibility();
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
    var _this3 = this;

    return _asyncToGenerator(function* () {
      try {
        return _state.default.initializeState(currentState, true);
      } catch (err) {
        currentState = yield _this3.readFile();
      }

      try {
        return _state.default.initializeState(currentState, true);
      } catch (err) {
        var content = yield _this3.readLegacyFile();
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

}

exports.default = PVP;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImRlcGVuZGVuY2llcyIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImF0b20iLCJwYWNrYWdlcyIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJhY3RpdmF0aW9uSW5pdGlhbGl6YXRpb24iLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiYWRkSXRlbVRvRG9jayIsImFkZExpc3QiLCJyZWFkU3RhdGUiLCJhZGRDb21tYW5kcyIsImFkZENvbnRleHRNZW51IiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJwYXJlbnRJZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJpZCIsImRlbGV0ZUVudHJ5IiwiaXRlbSIsIkNvbmZpcm1EZWxldGUiLCJ3b3Jrc3BhY2UiLCJhZGRNb2RhbFBhbmVsIiwiYWRkIiwiY29tbWFuZHMiLCJjbGVhclN0YXRlIiwic2F2ZUZpbGUiLCJlZGl0RmlsZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsImluaXRpYWxpemVTdGF0ZSIsInJlYWRMZWdhY3lGaWxlIiwicm9vdCIsInRvZ2dsZU1haW5WaXNpYmlsaXR5IiwidG9nZ2xlTWFpbkZvY3VzIiwiZXZ0IiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJjbG9zZXN0IiwiTmFOIiwiZWxlbWVudCIsImdldExlZnREb2NrIiwib25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSIsInNldCIsImdldFJpZ2h0RG9jayIsIm9uRGlkQ2hhbmdlIiwiY29udGV4dE1lbnUiLCJjb21tYW5kIiwibGFiZWwiLCJzaG91bGREaXNwbGF5IiwiY2xhc3NOYW1lIiwiaW5jbHVkZXMiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJmaWxlUGF0aCIsInBhdGgiLCJqb2luIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIkRBVEFCQVNFX0ZJTEUiLCJMRUdBQ1lfREFUQUJBU0VfRklMRSIsImVyciIsImdyb3VwcyIsInByb2plY3RzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFLQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxlQUFQO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxRQUFOLENBQWdCQyxZQUFoQixFQUE4QjtBQUFBOztBQUFBO0FBQzVCQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCRixZQUFyQjtBQUNBLE1BQUEsS0FBSSxDQUFDRyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBRUEsWUFBTUMsWUFBWSxDQUFDQyxPQUFiLENBQXFCQyxpQkFBckIsQ0FBTjtBQUVBQyxNQUFBQSxJQUFJLENBQUNDLFFBQUwsQ0FBY0MsNEJBQWQsQ0FDRSxNQUFNLEtBQUksQ0FBQ0Msd0JBQUwsQ0FBOEJYLFlBQTlCLENBRFI7QUFONEI7QUFTN0I7QUFFRDs7Ozs7QUFHQVksRUFBQUEsVUFBVSxHQUFJO0FBQ1osU0FBS0MsYUFBTCxDQUFtQkMsZUFBbkI7QUFDQSxTQUFLQyxVQUFMLENBQWdCQyxPQUFoQjs7QUFDQUMsbUJBQU1MLFVBQU47O0FB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QyxJQUFMLENBQVVsRSxJQUFJLENBQUNtRSxnQkFBTCxFQUFWLEVBQW1DQyxtQkFBbkMsQ0FBakI7O0FBQ0FwRSxNQUFBQSxJQUFJLENBQUMrQixTQUFMLENBQWU0QyxJQUFmLENBQW9CWCxRQUFwQjtBQUZnQjtBQUdqQjtBQUVEOzs7Ozs7O0FBS012QyxFQUFBQSxVQUFOLENBQWtCRSxFQUFsQixFQUFzQkgsUUFBdEIsRUFBZ0M7QUFBQTtBQUM5QnhCLE1BQUFBLElBQUksQ0FBQytCLFNBQUwsQ0FBZTRDLElBQWYsUUFBMEIsSUFBSUMsZUFBSixDQUFvQmpELEVBQXBCLEVBQXdCSCxRQUF4QixDQUExQjtBQUQ4QjtBQUUvQjs7QUExU3NCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEVcbn0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgeyByZWFkRmlsZSwgc2F2ZUZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXRlJywgY3VycmVudFN0YXRlKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcblxuICAgIGF3YWl0IGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcblxuICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyhcbiAgICAgICgpID0+IHRoaXMuYWN0aXZhdGlvbkluaXRpYWxpemF0aW9uKGN1cnJlbnRTdGF0ZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgZGVhY3RpdmF0ZWRcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICB0aGlzLnNlbGVjdExpc3QuZGVzdHJveSgpO1xuICAgIHN0YXRlLmRlYWN0aXZhdGUoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWN0aXZhdGlvbkluaXRpYWxpemF0aW9uIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmFkZEl0ZW1Ub0RvY2soKTtcbiAgICB0aGlzLmFkZExpc3QoKTtcbiAgICBjb25zb2xlLmxvZygnc3RvcmVkIHN0YXRlJywgY3VycmVudFN0YXRlKTtcbiAgICB0aGlzLnJlYWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICB0aGlzLmFkZENvbnRleHRNZW51KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRJdGVtVG9Eb2NrICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIGNvbnNvbGUubG9nKCdNQUlOJyk7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKHBhcmVudElkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKG51bGwsIHBhcmVudElkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGVkaXRFbnRyeSAoaWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKGlkKTtcbiAgICBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIHJlZ2lzdGVyIGNvbW1hbmRzXG4gICAqL1xuICBhZGRDb21tYW5kcyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmNsZWFyLWN1cnJlbnQtc3RhdGUnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qtdmlld2VyLXBsdXM6Y2xlYXItY3VycmVudC1zdGF0ZScpO1xuICAgICAgICAgIHN0YXRlLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0LXZpZXdlci1wbHVzOnNhdmUtZmlsZScpO1xuICAgICAgICAgIHRoaXMuc2F2ZUZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZmlsZScpO1xuICAgICAgICAgIHRoaXMuZWRpdEZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1sZWdhY3ktZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyA/IGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCA6IE5hTlxuICAgICAgICAgICksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmVkaXRFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5tYWluQ29udGFpbmVyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXVwJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICdsZWZ0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ3JpZ2h0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRG9jaygpO1xuICAgICAgICB0aGlzLnJlYWRTdGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRDb250ZXh0TWVudSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbnRleHRNZW51LmFkZCh7XG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdBZGQgZ3JvdXAvcHJvamVjdC4uLicsXG4gICAgICAgICAgICBzaG91bGREaXNwbGF5OiBldnQgPT5cbiAgICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1VMJyB8fFxuICAgICAgICAgICAgICAhZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmNsYXNzTmFtZS5pbmNsdWRlcygncHYtcHJvamVjdCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LWdyb3VwJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IGdyb3VwLi4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIGdyb3VwLi4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1wcm9qZWN0JzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IHByb2plY3QuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgcHJvamVjdC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgY3VycmVudCBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBsZWdhY3kgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkTGVnYWN5RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIExFR0FDWV9EQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgcmVhZFN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzb21ldGhpbmcgcmVhbGx5IHdyb25nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2F2ZSB0aGUgY3VycmVudCBzdGF0ZSB0byB0aGUgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgc2F2ZUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcbiAgICBhd2FpdCBzYXZlRmlsZShcbiAgICAgIGZpbGVQYXRoLFxuICAgICAgSlNPTi5zdHJpbmdpZnkoc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKE5hTiwgZmFsc2UpLCBudWxsLCAyKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICovXG4gIGFzeW5jIGVkaXRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgREFUQUJBU0VfRklMRSk7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSB0aGUgZW50cnkgcGFyZW50IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoaWQsIHBhcmVudElkKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKGlkLCBwYXJlbnRJZCkpO1xuICB9XG59XG4iXX0=