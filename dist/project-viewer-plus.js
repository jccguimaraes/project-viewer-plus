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

    atom.packages.onDidActivateInitialPackages(() => {
      this.addItemToDock();
      this.addList();
      console.log('stored state', currentState);
      this.readState(currentState);
      this.addCommands();
      this.addContextMenu();
    });
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
  addItemToDock() {
    this.mainContainer = new _main2.default();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFkZEl0ZW1Ub0RvY2siLCJhZGRMaXN0IiwiY29uc29sZSIsImxvZyIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJpZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJkZWxldGVFbnRyeSIsIml0ZW0iLCJDb25maXJtRGVsZXRlIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImFkZCIsImNvbW1hbmRzIiwiZWRpdEZpbGUiLCJjb250ZW50IiwicmVhZEZpbGUiLCJpbml0aWFsaXplU3RhdGUiLCJyZWFkTGVnYWN5RmlsZSIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsIk5hTiIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJzZXQiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJEQVRBQkFTRV9GSUxFIiwiTEVHQUNZX0RBVEFCQVNFX0ZJTEUiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFk7O0FBRVo7Ozs7QUFDQTs7QUFLQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQyxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxnQkFBUDtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLFFBQU4sQ0FBZ0JDLFlBQWhCLEVBQThCO0FBQzVCLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7O0FBRUEsVUFBTVAsYUFBYVEsT0FBYixDQUFxQkMsaUJBQXJCLENBQU47O0FBRUFDLFNBQUtDLFFBQUwsQ0FBY0MsNEJBQWQsQ0FBMkMsTUFBTTtBQUMvQyxXQUFLQyxhQUFMO0FBQ0EsV0FBS0MsT0FBTDtBQUNBQyxjQUFRQyxHQUFSLENBQVksY0FBWixFQUE0QlgsWUFBNUI7QUFDQSxXQUFLWSxTQUFMLENBQWVaLFlBQWY7QUFDQSxXQUFLYSxXQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNELEtBUEQ7QUFRRDs7QUFFRDs7O0FBR0FDLGVBQWM7QUFDWixTQUFLQyxhQUFMLENBQW1CQyxlQUFuQjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JDLE9BQWhCO0FBQ0FDLG9CQUFNTCxVQUFOO0FBQ0EsU0FBS2QsV0FBTCxDQUFpQm9CLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsY0FBYTtBQUNYLFdBQU9G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QVFJLElBQS9CLENBQWY7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBT3pCLGdCQUFNdUIsZUFBTixDQUFzQjNDLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT3lFLEdBQVAsRUFBWTtBQUNWekUscUJBQWUsRUFBRTBFLFFBQVEsRUFBVixFQUFjQyxVQUFVLEVBQXhCLEVBQWY7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBT3ZELGdCQUFNdUIsZUFBTixDQUFzQjNDLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT3lFLEdBQVAsRUFBWTtBQUNWL0QsY0FBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBLFFBQU02QixRQUFOLEdBQWtCO0FBQ2hCLFVBQU0yQixXQUFXQyxlQUFLQyxJQUFMLENBQVVoRSxLQUFLaUUsZ0JBQUwsRUFBVixFQUFtQ0MsbUJBQW5DLENBQWpCO0FBQ0FsRSxTQUFLK0IsU0FBTCxDQUFld0MsSUFBZixDQUFvQlQsUUFBcEI7QUFDRDs7QUFFRDs7OztBQUlBLFFBQU1wQyxVQUFOLENBQWtCRCxFQUFsQixFQUFzQjtBQUNwQnpCLFNBQUsrQixTQUFMLENBQWV3QyxJQUFmLEVBQW9CLE1BQU0sSUFBSUMsZ0JBQUosQ0FBb0IvQyxFQUFwQixDQUExQjtBQUNEO0FBL1FzQjtrQkFBSmxDLEciLCJmaWxlIjoicHJvamVjdC12aWV3ZXItcGx1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcblxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHtcbiAgUExVR0lOX05BTUUsXG4gIERBVEFCQVNFX0ZJTEUsXG4gIExFR0FDWV9EQVRBQkFTRV9GSUxFXG59IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICBhd2FpdCBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoKCkgPT4ge1xuICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICB0aGlzLmFkZExpc3QoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yZWQgc3RhdGUnLCBjdXJyZW50U3RhdGUpO1xuICAgICAgdGhpcy5yZWFkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICAgIHRoaXMuYWRkQ29udGV4dE1lbnUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBkZWFjdGl2YXRlICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0LmRlc3Ryb3koKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiBzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEl0ZW1Ub0RvY2sgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKGlkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKGlkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlbGV0ZUVudHJ5IChpZCkge1xuICAgIGNvbnN0IGl0ZW0gPSBuZXcgQ29uZmlybURlbGV0ZShpZCk7XG4gICAgYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW0gfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byByZWdpc3RlciBjb21tYW5kc1xuICAgKi9cbiAgYWRkQ29tbWFuZHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJyk7XG4gICAgICAgICAgdGhpcy5lZGl0RmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoXG4gICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lICE9PSAnVUwnID8gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkIDogTmFOXG4gICAgICAgICAgKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZGVsZXRlRW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLm1haW5Db250YWluZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ2xlZnQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAncmlnaHQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICAgIHRoaXMucmVhZFN0YXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbnRleHRNZW51ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29udGV4dE1lbnUuYWRkKHtcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZCBncm91cC9wcm9qZWN0Li4uJyxcbiAgICAgICAgICAgIHNob3VsZERpc3BsYXk6IGV2dCA9PlxuICAgICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVUwnIHx8XG4gICAgICAgICAgICAgICFldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuY2xhc3NOYW1lLmluY2x1ZGVzKCdwdi1wcm9qZWN0JylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtZ3JvdXAnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgZ3JvdXAuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgZ3JvdXAuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LXByb2plY3QnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgcHJvamVjdC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpblZpc2liaWxpdHkgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluRm9jdXMgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBjdXJyZW50IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGxlZ2FjeSBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRMZWdhY3lGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgTEVHQUNZX0RBVEFCQVNFX0ZJTEUpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyByZWFkU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyByZWFsbHkgd3JvbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgZWRpdEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCBEQVRBQkFTRV9GSUxFKTtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yIChpZCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcihpZCkpO1xuICB9XG59XG4iXX0=