'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _atom = require('atom');

var _atomPackageDeps = require('atom-package-deps');

var dependencies = _interopRequireWildcard(_atomPackageDeps);

var _config = require('./constants/config');

var _config2 = _interopRequireDefault(_config);

var _base = require('./constants/base');

var _state = require('./services/state');

var _state2 = _interopRequireDefault(_state);

var _file = require('./services/file');

var _legacy = require('./services/legacy');

var _main = require('./containers/main');

var _main2 = _interopRequireDefault(_main);

var _selectList = require('./containers/select-list');

var _selectList2 = _interopRequireDefault(_selectList);

var _editor = require('./containers/editor');

var _editor2 = _interopRequireDefault(_editor);

var _confirmDelete = require('./components/confirm-delete');

var _confirmDelete2 = _interopRequireDefault(_confirmDelete);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    return _config2.default;
  }

  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */
  async activate(currentState) {
    console.log('state', currentState);
    this.disposables = new _atom.CompositeDisposable();

    await dependencies.install(_base.PLUGIN_NAME);

    atom.packages.onDidActivateInitialPackages(() => this.activationInitialization(currentState));
  }

  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */
  deactivate() {
    this.mainContainer.destroyMainItem();
    this.selectList.destroy();
    _state2.default.deactivate();
    this.disposables.dispose();
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  serialize() {
    return _state2.default.serializeGroupById();
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
    this.mainContainer = new _main2.default();
    console.log('MAIN');
    this.mainContainer.addMainItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  addList() {
    // this compoment has performance issues
    this.selectList = new _selectList2.default();
  }

  /**
   * handler to show the Select List view.
   */
  toggleSelectList() {
    this.selectList.show();
  }

  /* eslint-disable-next-line require-jsdoc */
  addEntry() {
    this.openEditor();
  }

  /* eslint-disable-next-line require-jsdoc */
  editEntry(id) {
    this.openEditor(id);
  }

  /* eslint-disable-next-line require-jsdoc */
  deleteEntry(id) {
    const item = new _confirmDelete2.default(id);
    atom.workspace.addModalPanel({ item });
  }

  /**
   * Handler to register commands
   */
  addCommands() {
    this.disposables.add(atom.commands.add('atom-workspace', {
      'project-viewer-plus:clear-current-state': () => {
        console.log('project-viewer-plus:clear-current-state');
        _state2.default.clearState();
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
      'project-viewer-plus:read-file': async () => {
        const content = await this.readFile();
        _state2.default.initializeState(content, true);
      },
      'project-viewer-plus:read-legacy-file': async () => {
        const content = await this.readLegacyFile();
        _state2.default.initializeState((0, _legacy.transformLegacyContent)(content.root), true);
      },
      'project-viewer-plus:toggle-visibility': () => this.toggleMainVisibility(),
      'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
      'project-viewer-plus:add-entry': evt => this.addEntry(evt.target.nodeName !== 'UL' ? evt.target.closest('li').id : NaN),
      'project-viewer-plus:edit-entry': evt => this.editEntry(evt.target.closest('li').id),
      'project-viewer-plus:delete-entry': evt => this.deleteEntry(evt.target.closest('li').id)
    }), atom.commands.add(this.mainContainer.element, {
      'core:move-up': function () {
        console.log('core:move-up');
      },
      'core:move-down': function () {
        console.log('core:move-down');
      },
      'core:move-left': function () {
        console.log('core:move-left');
      },
      'core:move-right': function () {
        console.log('core:move-right');
      },
      'core:confirm': function () {
        console.log('core:confirm');
      }
    }), atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(item => {
      if (item !== this.mainContainer) {
        return;
      }
      atom.config.set(`${_base.PLUGIN_NAME}.dock.position`, 'left');
    }), atom.workspace.getRightDock().onDidStopChangingActivePaneItem(item => {
      if (item !== this.mainContainer) {
        return;
      }
      atom.config.set(`${_base.PLUGIN_NAME}.dock.position`, 'right');
    }), atom.config.onDidChange(`${_base.PLUGIN_NAME}.dock.position`, () => {
      this.mainContainer.destroyMainItem();
      this.addItemToDock();
      this.readState(_state2.default.serializeGroupById());
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
    const filePath = _path2.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }

  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */
  readLegacyFile() {
    const filePath = _path2.default.join(atom.getConfigDirPath(), _base.LEGACY_DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }

  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */
  async readState(currentState) {
    try {
      return _state2.default.initializeState(currentState, true);
    } catch (err) {
      currentState = await this.readFile();
    }

    try {
      return _state2.default.initializeState(currentState, true);
    } catch (err) {
      const content = await this.readLegacyFile();
      currentState = (0, _legacy.transformLegacyContent)(content.root);
    }

    try {
      return _state2.default.initializeState(currentState, true);
    } catch (err) {
      currentState = { groups: [], projects: [] };
    }

    try {
      return _state2.default.initializeState(currentState, true);
    } catch (err) {
      console.log('something really wrong');
    }
  }

  /**
   * handler to save the current state to the file.
   * @param {string} id - the entry id if in edit mode
   */
  async saveFile() {
    const filePath = _path2.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);
    await (0, _file.saveFile)(filePath, JSON.stringify(_state2.default.serializeGroupById(NaN, false), null, 2));
  }

  /**
   * handler to open the Editor view.
   */
  async editFile() {
    const filePath = _path2.default.join(atom.getConfigDirPath(), _base.DATABASE_FILE);
    atom.workspace.open(filePath);
  }

  /**
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
   */
  async openEditor(id) {
    atom.workspace.open((await new _editor2.default(id)));
  }
}
exports.default = PVP;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiY29uc29sZSIsImxvZyIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImF0b20iLCJwYWNrYWdlcyIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJhY3RpdmF0aW9uSW5pdGlhbGl6YXRpb24iLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiYWRkSXRlbVRvRG9jayIsImFkZExpc3QiLCJyZWFkU3RhdGUiLCJhZGRDb21tYW5kcyIsImFkZENvbnRleHRNZW51IiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJvcGVuRWRpdG9yIiwiZWRpdEVudHJ5IiwiaWQiLCJkZWxldGVFbnRyeSIsIml0ZW0iLCJDb25maXJtRGVsZXRlIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImFkZCIsImNvbW1hbmRzIiwiY2xlYXJTdGF0ZSIsInNhdmVGaWxlIiwiZWRpdEZpbGUiLCJjb250ZW50IiwicmVhZEZpbGUiLCJpbml0aWFsaXplU3RhdGUiLCJyZWFkTGVnYWN5RmlsZSIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsIk5hTiIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJzZXQiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJEQVRBQkFTRV9GSUxFIiwiTEVHQUNZX0RBVEFCQVNFX0ZJTEUiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIkpTT04iLCJzdHJpbmdpZnkiLCJvcGVuIiwiRWRpdG9yQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxZOztBQUVaOzs7O0FBQ0E7O0FBS0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUMsR0FBTixDQUFVO0FBQ3ZCOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBT0MsZ0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxRQUFOLENBQWdCQyxZQUFoQixFQUE4QjtBQUM1QkMsWUFBUUMsR0FBUixDQUFZLE9BQVosRUFBcUJGLFlBQXJCO0FBQ0EsU0FBS0csV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjs7QUFFQSxVQUFNVCxhQUFhVSxPQUFiLENBQXFCQyxpQkFBckIsQ0FBTjs7QUFFQUMsU0FBS0MsUUFBTCxDQUFjQyw0QkFBZCxDQUNFLE1BQU0sS0FBS0Msd0JBQUwsQ0FBOEJWLFlBQTlCLENBRFI7QUFHRDs7QUFFRDs7O0FBR0FXLGVBQWM7QUFDWixTQUFLQyxhQUFMLENBQW1CQyxlQUFuQjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JDLE9BQWhCO0FBQ0FDLG9CQUFNTCxVQUFOO0FBQ0EsU0FBS1IsV0FBTCxDQUFpQmMsT0FBakI7QUFDRDs7QUFFRDs7OztBQUlBQyxjQUFhO0FBQ1gsV0FBT0YsZ0JB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O0FBRUQ7OztBQUdBLFFBQU1aLFFBQU4sR0FBa0I7QUFDaEIsVUFBTTJCLFdBQVdDLGVBQUtDLElBQUwsQ0FBVWpFLEtBQUtrRSxnQkFBTCxFQUFWLEVBQW1DQyxtQkFBbkMsQ0FBakI7QUFDQW5FLFNBQUs4QixTQUFMLENBQWU0QyxJQUFmLENBQW9CWCxRQUFwQjtBQUNEOztBQUVEOzs7O0FBSUEsUUFBTXZDLFVBQU4sQ0FBa0JFLEVBQWxCLEVBQXNCO0FBQ3BCMUIsU0FBSzhCLFNBQUwsQ0FBZTRDLElBQWYsRUFBb0IsTUFBTSxJQUFJQyxnQkFBSixDQUFvQmpELEVBQXBCLENBQTFCO0FBQ0Q7QUF6U3NCO2tCQUFKckMsRyIsImZpbGUiOiJwcm9qZWN0LXZpZXdlci1wbHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQge1xuICBQTFVHSU5fTkFNRSxcbiAgREFUQUJBU0VfRklMRSxcbiAgTEVHQUNZX0RBVEFCQVNFX0ZJTEVcbn0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgeyByZWFkRmlsZSwgc2F2ZUZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXRlJywgY3VycmVudFN0YXRlKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcblxuICAgIGF3YWl0IGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcblxuICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyhcbiAgICAgICgpID0+IHRoaXMuYWN0aXZhdGlvbkluaXRpYWxpemF0aW9uKGN1cnJlbnRTdGF0ZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgZGVhY3RpdmF0ZWRcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICB0aGlzLnNlbGVjdExpc3QuZGVzdHJveSgpO1xuICAgIHN0YXRlLmRlYWN0aXZhdGUoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWN0aXZhdGlvbkluaXRpYWxpemF0aW9uIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmFkZEl0ZW1Ub0RvY2soKTtcbiAgICB0aGlzLmFkZExpc3QoKTtcbiAgICBjb25zb2xlLmxvZygnc3RvcmVkIHN0YXRlJywgY3VycmVudFN0YXRlKTtcbiAgICB0aGlzLnJlYWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICB0aGlzLmFkZENvbnRleHRNZW51KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRJdGVtVG9Eb2NrICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIGNvbnNvbGUubG9nKCdNQUlOJyk7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKCkge1xuICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUoaWQpO1xuICAgIGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6Y2xlYXItY3VycmVudC1zdGF0ZSc6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdC12aWV3ZXItcGx1czpjbGVhci1jdXJyZW50LXN0YXRlJyk7XG4gICAgICAgICAgc3RhdGUuY2xlYXJTdGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpzYXZlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJyk7XG4gICAgICAgICAgdGhpcy5zYXZlRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJyk7XG4gICAgICAgICAgdGhpcy5lZGl0RmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoXG4gICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lICE9PSAnVUwnID8gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkIDogTmFOXG4gICAgICAgICAgKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZGVsZXRlRW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLm1haW5Db250YWluZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ2xlZnQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAncmlnaHQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICAgIHRoaXMucmVhZFN0YXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbnRleHRNZW51ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29udGV4dE1lbnUuYWRkKHtcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZCBncm91cC9wcm9qZWN0Li4uJyxcbiAgICAgICAgICAgIHNob3VsZERpc3BsYXk6IGV2dCA9PlxuICAgICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVUwnIHx8XG4gICAgICAgICAgICAgICFldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuY2xhc3NOYW1lLmluY2x1ZGVzKCdwdi1wcm9qZWN0JylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtZ3JvdXAnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgZ3JvdXAuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgZ3JvdXAuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LXByb2plY3QnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgcHJvamVjdC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpblZpc2liaWxpdHkgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluRm9jdXMgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBjdXJyZW50IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGxlZ2FjeSBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRMZWdhY3lGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgTEVHQUNZX0RBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyByZWFkU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyByZWFsbHkgd3JvbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzYXZlIHRoZSBjdXJyZW50IHN0YXRlIHRvIHRoZSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBzYXZlRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuICAgIGF3YWl0IHNhdmVGaWxlKFxuICAgICAgZmlsZVBhdGgsXG4gICAgICBKU09OLnN0cmluZ2lmeShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoTmFOLCBmYWxzZSksIG51bGwsIDIpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKi9cbiAgYXN5bmMgZWRpdEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yIChpZCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcihpZCkpO1xuICB9XG59XG4iXX0=