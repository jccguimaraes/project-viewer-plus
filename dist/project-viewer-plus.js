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
  addEntry(id) {
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
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFjdGl2YXRpb25Jbml0aWFsaXphdGlvbiIsImRlYWN0aXZhdGUiLCJtYWluQ29udGFpbmVyIiwiZGVzdHJveU1haW5JdGVtIiwic2VsZWN0TGlzdCIsImRlc3Ryb3kiLCJzdGF0ZSIsImRpc3Bvc2UiLCJzZXJpYWxpemUiLCJzZXJpYWxpemVHcm91cEJ5SWQiLCJhZGRJdGVtVG9Eb2NrIiwiYWRkTGlzdCIsImNvbnNvbGUiLCJsb2ciLCJyZWFkU3RhdGUiLCJhZGRDb21tYW5kcyIsImFkZENvbnRleHRNZW51IiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJpZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJkZWxldGVFbnRyeSIsIml0ZW0iLCJDb25maXJtRGVsZXRlIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImFkZCIsImNvbW1hbmRzIiwiZWRpdEZpbGUiLCJjb250ZW50IiwicmVhZEZpbGUiLCJpbml0aWFsaXplU3RhdGUiLCJyZWFkTGVnYWN5RmlsZSIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsIk5hTiIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJzZXQiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJEQVRBQkFTRV9GSUxFIiwiTEVHQUNZX0RBVEFCQVNFX0ZJTEUiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFk7O0FBRVo7Ozs7QUFDQTs7QUFLQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQyxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxnQkFBUDtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLFFBQU4sQ0FBZ0JDLFlBQWhCLEVBQThCO0FBQzVCLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7O0FBRUEsVUFBTVAsYUFBYVEsT0FBYixDQUFxQkMsaUJBQXJCLENBQU47O0FBRUFDLFNBQUtDLFFBQUwsQ0FBY0MsNEJBQWQsQ0FDRSxNQUFNLEtBQUtDLHdCQUFMLENBQThCUixZQUE5QixDQURSO0FBR0Q7O0FBRUQ7OztBQUdBUyxlQUFjO0FBQ1osU0FBS0MsYUFBTCxDQUFtQkMsZUFBbkI7QUFDQSxTQUFLQyxVQUFMLENBQWdCQyxPQUFoQjtBQUNBQyxvQkFBTUwsVUFBTjtBQUNBLFNBQUtSLFdBQUwsQ0FBaUJjLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsY0FBYTtBQUNYLFdBQU9GLGdCQUFNRyxrQkFBTixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQVQsMkJBQTBCUixZQUExQixFQUF3QztBQUN0QyxTQUFLa0IsYUFBTDtBQUNBLFNBQUtDLE9B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WUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPMEUsR0FBUCxFQUFZO0FBQ1YsWUFBTWhDLFVBQVUsTUFBTSxLQUFLRyxjQUFMLEVBQXRCO0FBQ0E3QyxxQkFBZSxvQ0FBdUIwQyxRQUFRSSxJQUEvQixDQUFmO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGLGFBQU9oQyxnQkFBTThCLGVBQU4sQ0FBc0I1QyxZQUF0QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0QsS0FGRCxDQUdBLE9BQU8wRSxHQUFQLEVBQVk7QUFDVjFFLHFCQUFlLEVBQUUyRSxRQUFRLEVBQVYsRUFBY0MsVUFBVSxFQUF4QixFQUFmO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGLGFBQU85RCxnQkFBTThCLGVBQU4sQ0FBc0I1QyxZQUF0QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0QsS0FGRCxDQUdBLE9BQU8wRSxHQUFQLEVBQVk7QUFDVnRELGNBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7QUFJQSxRQUFNb0IsUUFBTixHQUFrQjtBQUNoQixVQUFNMkIsV0FBV0MsZUFBS0MsSUFBTCxDQUFVakUsS0FBS2tFLGdCQUFMLEVBQVYsRUFBbUNDLG1CQUFuQyxDQUFqQjtBQUNBbkUsU0FBS2dDLFNBQUwsQ0FBZXdDLElBQWYsQ0FBb0JULFFBQXBCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxRQUFNcEMsVUFBTixDQUFrQkQsRUFBbEIsRUFBc0I7QUFDcEIxQixTQUFLZ0MsU0FBTCxDQUFld0MsSUFBZixFQUFvQixNQUFNLElBQUlDLGdCQUFKLENBQW9CL0MsRUFBcEIsQ0FBMUI7QUFDRDtBQXJSc0I7a0JBQUpuQyxHIiwiZmlsZSI6InByb2plY3Qtdmlld2VyLXBsdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCAqIGFzIGRlcGVuZGVuY2llcyBmcm9tICdhdG9tLXBhY2thZ2UtZGVwcyc7XG5cbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRVxufSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlJztcbmltcG9ydCB7IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2xlZ2FjeSc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcbmltcG9ydCBDb25maXJtRGVsZXRlIGZyb20gJy4vY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZSc7XG5cbi8qKlxuICogUGFja2FnZSdzIGVudHJ5IHBvaW50IGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBWUCB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoaXMgcGFja2FnZSBjb25maWd1cmF0aW9uIG9iamVjdCBzcGVjaWZpYyB0byBBdG9tXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuXG4gICAgYXdhaXQgZGVwZW5kZW5jaWVzLmluc3RhbGwoUExVR0lOX05BTUUpO1xuXG4gICAgYXRvbS5wYWNrYWdlcy5vbkRpZEFjdGl2YXRlSW5pdGlhbFBhY2thZ2VzKFxuICAgICAgKCkgPT4gdGhpcy5hY3RpdmF0aW9uSW5pdGlhbGl6YXRpb24oY3VycmVudFN0YXRlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmRlc3Ryb3lNYWluSXRlbSgpO1xuICAgIHRoaXMuc2VsZWN0TGlzdC5kZXN0cm95KCk7XG4gICAgc3RhdGUuZGVhY3RpdmF0ZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhY3RpdmF0aW9uSW5pdGlhbGl6YXRpb24gKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRoaXMuYWRkSXRlbVRvRG9jaygpO1xuICAgIHRoaXMuYWRkTGlzdCgpO1xuICAgIGNvbnNvbGUubG9nKCdzdG9yZWQgc3RhdGUnLCBjdXJyZW50U3RhdGUpO1xuICAgIHRoaXMucmVhZFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgdGhpcy5hZGRDb21tYW5kcygpO1xuICAgIHRoaXMuYWRkQ29udGV4dE1lbnUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEl0ZW1Ub0RvY2sgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgY29uc29sZS5sb2coJ01BSU4nKTtcbiAgICB0aGlzLm1haW5Db250YWluZXIuYWRkTWFpbkl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAoaWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGVkaXRFbnRyeSAoaWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKGlkKTtcbiAgICBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIHJlZ2lzdGVyIGNvbW1hbmRzXG4gICAqL1xuICBhZGRDb21tYW5kcyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWZpbGUnKTtcbiAgICAgICAgICB0aGlzLmVkaXRGaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZWRpdG9yJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtbGVnYWN5LWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUodHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PlxuICAgICAgICAgIHRoaXMudG9nZ2xlTWFpblZpc2liaWxpdHkoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4gdGhpcy50b2dnbGVNYWluRm9jdXMoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWxpc3QnOiAoKSA9PiB0aGlzLnRvZ2dsZVNlbGVjdExpc3QoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6YWRkLWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgdGhpcy5hZGRFbnRyeShcbiAgICAgICAgICAgIGV2dC50YXJnZXQubm9kZU5hbWUgIT09ICdVTCcgPyBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQgOiBOYU5cbiAgICAgICAgICApLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgdGhpcy5lZGl0RW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgdGhpcy5kZWxldGVFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpXG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMubWFpbkNvbnRhaW5lci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS11cCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAnbGVmdCcpO1xuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICdyaWdodCcpO1xuICAgICAgfSksXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICgpID0+IHtcbiAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmRlc3Ryb3lNYWluSXRlbSgpO1xuICAgICAgICB0aGlzLmFkZEl0ZW1Ub0RvY2soKTtcbiAgICAgICAgdGhpcy5yZWFkU3RhdGUoc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkQ29udGV4dE1lbnUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb250ZXh0TWVudS5hZGQoe1xuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6YWRkLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQWRkIGdyb3VwL3Byb2plY3QuLi4nLFxuICAgICAgICAgICAgc2hvdWxkRGlzcGxheTogZXZ0ID0+XG4gICAgICAgICAgICAgIGV2dC50YXJnZXQubm9kZU5hbWUgPT09ICdVTCcgfHxcbiAgICAgICAgICAgICAgIWV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5jbGFzc05hbWUuaW5jbHVkZXMoJ3B2LXByb2plY3QnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1ncm91cCc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRWRpdCBncm91cC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBncm91cC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtcHJvamVjdCc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRWRpdCBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIHByb2plY3QuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluVmlzaWJpbGl0eSAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5Gb2N1cyAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZUZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBMRUdBQ1lfREFUQUJBU0VfRklMRSk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIHJlYWRTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIHJlYWxseSB3cm9uZycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBlZGl0RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIERBVEFCQVNFX0ZJTEUpO1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBlbnRyeSBpZCBpZiBpbiBlZGl0IG1vZGVcbiAgICovXG4gIGFzeW5jIG9wZW5FZGl0b3IgKGlkKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKGlkKSk7XG4gIH1cbn1cbiJdfQ==