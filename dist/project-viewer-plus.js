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
  addEntry(id) {
    const resource = _state2.default.getEntry(id);
    console.log('addEntry', id, resource);
    this.openEditor();
  }

  /* eslint-disable-next-line require-jsdoc */
  editEntry(id) {
    const resource = _state2.default.getEntry(id);
    console.log('editEntry', id, resource);
    this.openEditor();
  }

  /* eslint-disable-next-line require-jsdoc */
  deleteEntry(id) {
    _state2.default.deleteEntry(id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFkZEl0ZW1Ub0RvY2siLCJhZGRMaXN0IiwiY29uc29sZSIsImxvZyIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJpZCIsInJlc291cmNlIiwiZ2V0RW50cnkiLCJvcGVuRWRpdG9yIiwiZWRpdEVudHJ5IiwiZGVsZXRlRW50cnkiLCJhZGQiLCJjb21tYW5kcyIsImNvbnRlbnQiLCJyZWFkRmlsZSIsImluaXRpYWxpemVTdGF0ZSIsInJlYWRMZWdhY3lGaWxlIiwicm9vdCIsInRvZ2dsZU1haW5WaXNpYmlsaXR5IiwidG9nZ2xlTWFpbkZvY3VzIiwiZXZ0IiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJjbG9zZXN0IiwiTmFOIiwiZWxlbWVudCIsIndvcmtzcGFjZSIsImdldExlZnREb2NrIiwib25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSIsIml0ZW0iLCJzZXQiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLFk7O0FBRVo7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUMsR0FBTixDQUFVO0FBQ3ZCOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBT0MsZ0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxRQUFOLENBQWdCQyxZQUFoQixFQUE4QjtBQUM1QixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5COztBQUVBLFVBQU1QLGFBQWFRLE9BQWIsQ0FBcUJDLGlCQUFyQixDQUFOOztBQUVBQyxTQUFLQyxRQUFMLENBQWNDLDRCQUFkLENBQTJDLE1BQU07QUFDL0MsV0FBS0MsYUFBTDtBQUNBLFdBQUtDLE9BQUw7QUFDQUMsY0FBUUMsR0FBUixDQUFZLGNBQVosRUFBNEJYLFlBQTVCO0FBQ0EsV0FBS1ksU0FBTCxDQUFlWixZQUFmO0FBQ0EsV0FBS2EsV0FBTDtBQUNBLFdBQUtDLGNBQUw7QUFDRCxLQVBEO0FBUUQ7O0FBRUQ7OztBQUdBQyxlQUFjO0FBQ1osU0FBS0MsYUFBTCxDQUFtQkMsZUFBbkI7QUFDQSxTQUFLQyxVQUFMLENBQWdCQyxPQUFoQjtBQUNBQyxvQkFBTUwsVUFBTjtBQUNBLFNBQUtkLFdBQUwsQ0FBaUJvQixPQUFqQjtBQUNEOztBQUVEOzs7O0FBSUFDLGNBQWE7QUFDWCxXQUFPRixnQkFBTUcsa0JBQU4sRUFBUDtBQUNEOztBQUVEO0FBQ0FmLGtCQUFpQjtBQUNmLFNBQUtRLGFBQUwsR0FBcUIsSUFB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T3RCLGdCQUFNb0IsZUFBTixDQUFzQnhDLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT3NFLEdBQVAsRUFBWTtBQUNWdEUscUJBQWUsRUFBRXVFLFFBQVEsRUFBVixFQUFjQyxVQUFVLEVBQXhCLEVBQWY7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBT3BELGdCQUFNb0IsZUFBTixDQUFzQnhDLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT3NFLEdBQVAsRUFBWTtBQUNWNUQsY0FBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7QUFDRjs7QUFFRDs7O0FBR0EsUUFBTXNCLFVBQU4sR0FBb0I7QUFDbEI1QixTQUFLOEMsU0FBTCxDQUFlc0IsSUFBZixFQUFvQixNQUFNLElBQUlDLGdCQUFKLEVBQTFCO0FBQ0Q7QUF2UXNCO2tCQUFKOUUsRyIsImZpbGUiOiJwcm9qZWN0LXZpZXdlci1wbHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuXG4vKipcbiAqIFBhY2thZ2UncyBlbnRyeSBwb2ludCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQVlAge1xuICAvKipcbiAgICogUmV0dXJucyB0aGlzIHBhY2thZ2UgY29uZmlndXJhdGlvbiBvYmplY3Qgc3BlY2lmaWMgdG8gQXRvbVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcblxuICAgIGF3YWl0IGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcblxuICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PiB7XG4gICAgICB0aGlzLmFkZEl0ZW1Ub0RvY2soKTtcbiAgICAgIHRoaXMuYWRkTGlzdCgpO1xuICAgICAgY29uc29sZS5sb2coJ3N0b3JlZCBzdGF0ZScsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICB0aGlzLnJlYWRTdGF0ZShjdXJyZW50U3RhdGUpO1xuICAgICAgdGhpcy5hZGRDb21tYW5kcygpO1xuICAgICAgdGhpcy5hZGRDb250ZXh0TWVudSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgZGVhY3RpdmF0ZWRcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICB0aGlzLnNlbGVjdExpc3QuZGVzdHJveSgpO1xuICAgIHN0YXRlLmRlYWN0aXZhdGUoKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkSXRlbVRvRG9jayAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB0aGlzLm1haW5Db250YWluZXIuYWRkTWFpbkl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAoaWQpIHtcbiAgICBjb25zdCByZXNvdXJjZSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICBjb25zb2xlLmxvZygnYWRkRW50cnknLCBpZCwgcmVzb3VyY2UpO1xuICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIGNvbnN0IHJlc291cmNlID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGNvbnNvbGUubG9nKCdlZGl0RW50cnknLCBpZCwgcmVzb3VyY2UpO1xuICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgc3RhdGUuZGVsZXRlRW50cnkoaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1sZWdhY3ktZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyA/IGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCA6IE5hTlxuICAgICAgICAgICksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmVkaXRFbnRyeShldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5tYWluQ29udGFpbmVyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXVwJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbSAhPT0gdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICdsZWZ0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ3JpZ2h0Jyk7XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgKCkgPT4ge1xuICAgICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRG9jaygpO1xuICAgICAgICB0aGlzLnJlYWRTdGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRDb250ZXh0TWVudSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbnRleHRNZW51LmFkZCh7XG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdBZGQgZ3JvdXAvcHJvamVjdC4uLicsXG4gICAgICAgICAgICBzaG91bGREaXNwbGF5OiBldnQgPT5cbiAgICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1VMJyB8fFxuICAgICAgICAgICAgICAhZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmNsYXNzTmFtZS5pbmNsdWRlcygncHYtcHJvamVjdCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LWdyb3VwJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IGdyb3VwLi4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIGdyb3VwLi4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1wcm9qZWN0JzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IHByb2plY3QuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgcHJvamVjdC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgY3VycmVudCBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLFxuICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXMuanNvbidcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCAncHJvamVjdC12aWV3ZXIuanNvbicpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyByZWFkU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyByZWFsbHkgd3JvbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICovXG4gIGFzeW5jIG9wZW5FZGl0b3IgKCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcigpKTtcbiAgfVxufVxuIl19