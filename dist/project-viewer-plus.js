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
  deleteGroupOrProject(id) {
    const resource = _state2.default.deleteEntry(id);
  }

  /**
   * Handler to register commands
   */
  addCommands() {
    this.disposables.add(atom.commands.add('atom-workspace', {
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
      'project-viewer-plus:delete-component': evt => this.deleteGroupOrProject(evt.target.closest('li').id)
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
      '.project-viewer-plus .pv-group': [{
        command: 'project-viewer-plus:delete-component',
        label: 'Delete group'
      }],
      '.project-viewer-plus .pv-project': [{
        command: 'project-viewer-plus:delete-component',
        label: 'Delete project'
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
    const filePath = _path2.default.join(atom.getConfigDirPath(), 'project-viewer-plus.json');

    return (0, _file.readFile)(filePath);
  }

  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */
  readLegacyFile() {
    const filePath = _path2.default.join(atom.getConfigDirPath(), 'project-viewer.json');

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
   */
  async openEditor() {
    atom.workspace.open((await new _editor2.default()));
  }
}
exports.default = PVP;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFkZEl0ZW1Ub0RvY2siLCJhZGRMaXN0IiwiY29uc29sZSIsImxvZyIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiZGVsZXRlR3JvdXBPclByb2plY3QiLCJpZCIsInJlc291cmNlIiwiZGVsZXRlRW50cnkiLCJhZGQiLCJjb21tYW5kcyIsIm9wZW5FZGl0b3IiLCJjb250ZW50IiwicmVhZEZpbGUiLCJpbml0aWFsaXplU3RhdGUiLCJyZWFkTGVnYWN5RmlsZSIsInJvb3QiLCJ0b2dnbGVNYWluVmlzaWJpbGl0eSIsInRvZ2dsZU1haW5Gb2N1cyIsImV2dCIsInRhcmdldCIsImNsb3Nlc3QiLCJlbGVtZW50Iiwid29ya3NwYWNlIiwiZ2V0TGVmdERvY2siLCJvbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtIiwiaXRlbSIsInNldCIsImdldFJpZ2h0RG9jayIsIm9uRGlkQ2hhbmdlIiwiY29udGV4dE1lbnUiLCJjb21tYW5kIiwibGFiZWwiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJmaWxlUGF0aCIsInBhdGgiLCJqb2luIiwiZ2V0Q29uZmlnRGlyUGF0aCIsImVyciIsImdyb3VwcyIsInByb2plY3RzIiwib3BlbiIsIkVkaXRvckNvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsWTs7QUFFWjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQyxHQUFOLENBQVU7QUFDdkI7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxnQkFBUDtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLFFBQU4sQ0FBZ0JDLFlBQWhCLEVBQThCO0FBQzVCLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7O0FBRUEsVUFBTVAsYUFBYVEsT0FBYixDQUFxQkMsaUJBQXJCLENBQU47O0FBRUFDLFNBQUtDLFFBQUwsQ0FBY0MsNEJBQWQsQ0FBMkMsTUFBTTtBQUMvQyxXQUFLQyxhQUFMO0FBQ0EsV0FBS0MsT0FBTDtBQUNBQyxjQUFRQyxHQUFSLENBQVksY0FBWixFQUE0QlgsWUFBNUI7QUFDQSxXQUFLWSxTQUFMLENBQWVaLFlBQWY7QUFDQSxXQUFLYSxXQUFMO0FBQ0EsV0FBS0MsY0FBTDtBQUNELEtBUEQ7QUFRRDs7QUFFRDs7O0FBR0FDLGVBQWM7QUFDWixTQUFLQyxhQUFMLENBQW1CQyxlQUFuQjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JDLE9BQWhCO0FBQ0FDLG9CQUFNTCxVQUFOO0FBQ0EsU0FBS2QsV0FBTCxDQUFpQm9CLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsY0FBYTtBQUNYLFdBQU9GLGdCQUFNRyxrQkFBTixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQWYsa0JBQWlCO0FBQ2YsU0FBS1EsYUFBTCxHQUFxQixJQUFJUSxjQUFKLEVBQXJCO0FBQ0EsU0FBS1IsYUFBTCxDQUFtQlMsV0FBbkI7QUFDRDs7QUFFRDtBQUNBaEIsWUFBVztB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QUNGLGFBQU9wQixnQkFBTWtCLGVBQU4sQ0FBc0J0QyxZQUF0QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0QsS0FGRCxDQUdBLE9BQU8rRCxHQUFQLEVBQVk7QUFDVi9ELHFCQUFlLEVBQUVnRSxRQUFRLEVBQVYsRUFBY0MsVUFBVSxFQUF4QixFQUFmO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGLGFBQU83QyxnQkFBTWtCLGVBQU4sQ0FBc0J0QyxZQUF0QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0QsS0FGRCxDQUdBLE9BQU8rRCxHQUFQLEVBQVk7QUFDVnJELGNBQVFDLEdBQVIsQ0FBWSx3QkFBWjtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdBLFFBQU13QixVQUFOLEdBQW9CO0FBQ2xCOUIsU0FBSzBDLFNBQUwsQ0FBZW1CLElBQWYsRUFBb0IsTUFBTSxJQUFJQyxnQkFBSixFQUExQjtBQUNEO0FBbE9zQjtrQkFBSnZFLEciLCJmaWxlIjoicHJvamVjdC12aWV3ZXItcGx1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcblxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlJztcbmltcG9ydCB7IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2xlZ2FjeSc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICBhd2FpdCBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoKCkgPT4ge1xuICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICB0aGlzLmFkZExpc3QoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yZWQgc3RhdGUnLCBjdXJyZW50U3RhdGUpO1xuICAgICAgdGhpcy5yZWFkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICAgIHRoaXMuYWRkQ29udGV4dE1lbnUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBkZWFjdGl2YXRlICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0LmRlc3Ryb3koKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiBzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEl0ZW1Ub0RvY2sgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlR3JvdXBPclByb2plY3QgKGlkKSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBzdGF0ZS5kZWxldGVFbnRyeShpZCk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byByZWdpc3RlciBjb21tYW5kc1xuICAgKi9cbiAgYWRkQ29tbWFuZHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1jb21wb25lbnQnOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmRlbGV0ZUdyb3VwT3JQcm9qZWN0KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5tYWluQ29udGFpbmVyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXVwJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICdsZWZ0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ3JpZ2h0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRG9jaygpO1xuICAgICAgICB0aGlzLnJlYWRTdGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRDb250ZXh0TWVudSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbnRleHRNZW51LmFkZCh7XG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtZ3JvdXAnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWNvbXBvbmVudCcsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBncm91cCdcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtcHJvamVjdCc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtY29tcG9uZW50JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIHByb2plY3QnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluVmlzaWJpbGl0eSAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5Gb2N1cyAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZUZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmdldENvbmZpZ0RpclBhdGgoKSxcbiAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzLmpzb24nXG4gICAgKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGxlZ2FjeSBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRMZWdhY3lGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihhdG9tLmdldENvbmZpZ0RpclBhdGgoKSwgJ3Byb2plY3Qtdmlld2VyLmpzb24nKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgcmVhZFN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzb21ldGhpbmcgcmVhbGx5IHdyb25nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoKSk7XG4gIH1cbn1cbiJdfQ==