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
   * @param {string} id - the entry id if in edit mode
   */
  async openEditor(id) {
    atom.workspace.open((await new _editor2.default(id)));
  }
}
exports.default = PVP;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFkZEl0ZW1Ub0RvY2siLCJhZGRMaXN0IiwiY29uc29sZSIsImxvZyIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJkZWFjdGl2YXRlIiwibWFpbkNvbnRhaW5lciIsImRlc3Ryb3lNYWluSXRlbSIsInNlbGVjdExpc3QiLCJkZXN0cm95Iiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiU2VsZWN0TGlzdCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93IiwiYWRkRW50cnkiLCJpZCIsIm9wZW5FZGl0b3IiLCJlZGl0RW50cnkiLCJkZWxldGVFbnRyeSIsIml0ZW0iLCJDb25maXJtRGVsZXRlIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsImFkZCIsImNvbW1hbmRzIiwiY29udGVudCIsInJlYWRGaWxlIiwiaW5pdGlhbGl6ZVN0YXRlIiwicmVhZExlZ2FjeUZpbGUiLCJyb290IiwidG9nZ2xlTWFpblZpc2liaWxpdHkiLCJ0b2dnbGVNYWluRm9jdXMiLCJldnQiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNsb3Nlc3QiLCJOYU4iLCJlbGVtZW50IiwiZ2V0TGVmdERvY2siLCJvbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtIiwic2V0IiwiZ2V0UmlnaHREb2NrIiwib25EaWRDaGFuZ2UiLCJjb250ZXh0TWVudSIsImNvbW1hbmQiLCJsYWJlbCIsInNob3VsZERpc3BsYXkiLCJjbGFzc05hbWUiLCJpbmNsdWRlcyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ0b2dnbGVGb2N1cyIsImZpbGVQYXRoIiwicGF0aCIsImpvaW4iLCJnZXRDb25maWdEaXJQYXRoIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJvcGVuIiwiRWRpdG9yQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztJQUFZQSxZOztBQUVaOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUMsR0FBTixDQUFVO0FBQ3ZCOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBT0MsZ0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxRQUFOLENBQWdCQyxZQUFoQixFQUE4QjtBQUM1QixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5COztBQUVBLFVBQU1QLGFBQWFRLE9BQWIsQ0FBcUJDLGlCQUFyQixDQUFOOztBQUVBQyxTQUFLQyxRQUFMLENBQWNDLDRCQUFkLENBQTJDLE1BQU07QUFDL0MsV0FBS0MsYUFBTDtBQUNBLFdBQUtDLE9BQUw7QUFDQUMsY0FBUUMsR0FBUixDQUFZLGNBQVosRUFBNEJYLFlBQTVCO0FBQ0EsV0FBS1ksU0FBTCxDQUFlWixZQUFmO0FBQ0EsV0FBS2EsV0FBTDtBQUNBLFdBQUtDLGNBQUw7QUFDRCxLQVBEO0FBUUQ7O0FBRUQ7OztBQUdBQyxlQUFjO0FBQ1osU0FBS0MsYUFBTCxDQUFtQkMsZUFBbkI7QUFDQSxTQUFLQyxVQUFMLENBQWdCQyxPQUFoQjtBQUNBQyxvQkFBTUwsVUFBTjtBQUNBLFNBQUtkLFdBQUwsQ0FBaUJvQixPQUFqQjtBQUNEOztBQUVEOzs7O0FBSUFDLGNBQWE7QUFDWCxXQUFPRixnQkFBTUcsa0JBQU4sRUFBUDtBQUNEOztBQUVEO0FBQ0FmLGtCQUFpQjtBQUNmLFNBQUtRLGFBQUwsR0FBcUIsSUFBSVEsY0FBSixFQUFyQjtBQUNBLFNBQUtSLGFBQUwsQ0FBbUJTLFdBQW5CO0FBQ0Q7O0FBRUQ7QUFDQWhCLFlBQVc7QUFDVDtBQUNBLFNBQUtTLFVBQUwsR0FBa0IsSUFBSVEsb0JBQUosRUFBbEI7QUFDRDs7QUFFRDs7O0FBR0FDLHFCQUFvQjtBQUNsQixTQUFLVCxVQUFMLENBQWdCVSxJQUFoQjtBQUNEOztBQUVEO0FBQ0FDLFdBQVVDLEVBQVYsRUFBYztBQUNaLFNBQUtDLFVBQUw7QUFDRDs7QUFFRDtBQUNBQyxZQUFXRixFQUFYLEVBQWU7QUFDYixTQUFLQyxVQUFMLENBQWdCRCxFQUFoQjtBQUNEOztBQUVEO0FBQ0FHLGNBQWFILEVBQWIsRUFBaUI7QUFDZixVQUFNSSxPQUFPLElBQUlDLHVCQUFKLENBQWtCTCxFQUFsQixDQUFiO0FBQ0F6QixTQUFLK0IsU0FBTCxDQUFlQyxhQUFmLENBQTZCLEVBQUVILElBQUYsRUFBN0I7QUFDRDs7QUFFRDs7O0FBR0FyQixnQkFBZTtBQUNiLFNBQUtaLFdBQUwsQ0FBaUJxQyxHQUFqQixDQUNFakMsS0FBS2tDLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFDbEMseUNBQW1DLE1BQU07QUFDdkMsYUFBS1AsVUFBTDtBQUNELE9BSGlDO0FBSWxDLHVDQUFpQyxZQUFZO0FBQzNDLGNBQU1TLFVBQVUsTUFBTSxLQUFLQyxRQUFMLEVBQXRCO0FBQ0FyQix3QkFBTXNCLGVBQU4sQ0FBc0JGLE9BQXRCLEVBQStCLElBQS9CO0FBQ0QsT0FQaUM7QUFRbEMsOENBQXdDLFlBQVk7QUFDbEQsY0FBTUEsVUFBVSxNQUFNLEtBQUtHLGNBQUwsRUFBdEI7QUFDQXZCLHdCQUFNc0IsZUFBTixDQUFzQixvQ0FBdUJGLFFBQVFJLElBQS9CLENBQXRCLEVBQTRELElBQTVEO0FBQ0QsT0FYaUM7QUFZbEMsK0NBQXlDLE1BQ3ZDLEtBQUtDLG9CQUFMLEVBYmdDO0FBY2xDLDBDQUFvQyxNQUFNLEtBQUtDLGVBQUwsRUFkUjtBQWVsQyx5Q0FBbUMsTUFBTSxLQUFLbkIsZ0JBQUwsRUFmUDtBQWdCbEMsdUNBQWlDb0IsT0FDL0IsS0FBS2xCLFFBQUwsQ0FDRWtCLElBQUlDLE1BQUosQ0FBV0MsUUFBWCxLQUF3QixJQUF4QixHQUErQkYsSUFBSUMsTUFBSixDQUFXRSxPQUFYLENBQW1CLElBQW5CLEVBQXlCcEIsRUFBeEQsR0FBNkRxQixHQUQvRCxDQWpCZ0M7QUFvQmxDLHdDQUFrQ0osT0FDaEMsS0FBS2YsU0FBTCxDQUFlZSxJQUFJQyxNQUFKLENBQVdFLE9BQVgsQ0FBbUIsSUFBbkIsRUFBeUJwQixFQUF4QyxDQXJCZ0M7QUFzQmxDLDBDQUFvQ2lCLE9BQ2xDLEtBQUtkLFdBQUwsQ0FBaUJjLElBQUlDLE1BQUosQ0FBV0UsT0FBWCxDQUFtQixJQUFuQixFQUF5QnBCLEVBQTFDO0FBdkJnQyxLQUFwQyxDQURGLEVBMEJFekIsS0FBS2tDLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixLQUFLdEIsYUFBTCxDQUFtQm9DLE9BQXJDLEVBQThDO0FBQzVDLHNCQUFnQixZQUFZO0FBQzFCMUMsZ0JBQVFDLEdBQVIsQ0FBWSxjQUFaO0FBQ0QsT0FIMkM7QUFJNUMsd0JBQWtCLFlBQVk7QUFDNUJELGdCQUFRQyxHQUFSLENBQVksZ0JBQVo7QUFDRCxPQU4yQztBQU81Qyx3QkFBa0IsWUFBWTtBQUM1QkQsZ0JBQVFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNELE9BVDJDO0FBVTVDLHlCQUFtQixZQUFZO0FBQzdCRCxnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0QsT0FaMkM7QUFhNUMsc0JBQWdCLFlBQVk7QUFDMUJELGdCQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEO0FBZjJDLEtBQTlDLENBMUJGLEVBMkNFTixLQUFLK0IsU0FBTCxDQUFlaUIsV0FBZixHQUE2QkMsK0JBQTdCLENBQTZEcEIsUUFBUTtBQUNuRSxVQUFJQSxTQUFTLEtBQUtsQixhQUFsQixFQUFpQztBQUMvQjtBQUNEO0FBQ0RYLFdBQUtSLE1BQUwsQ0FBWTBELEdBQVosQ0FBaUIsR0FBRW5ELGlCQUFZLGdCQUEvQixFQUFnRCxNQUFoRDtBQUNELEtBTEQsQ0EzQ0YsRUFpREVDLEtBQUsrQixTQUFMLENBQWVvQixZQUFmLEdBQThCRiwrQkFBOUIsQ0FBOERwQixRQUFRO0FBQ3BFLFVBQUlBLFNBQVMsS0FBS2xCLGFBQWxCLEVBQWlDO0FBQy9CO0FBQ0Q7QUFDRFgsV0FBS1IsTUFBTCxDQUFZMEQsR0FBWixDQUFpQixHQUFFbkQsaUJBQVksZ0JBQS9CLEVBQWdELE9BQWhEO0FBQ0QsS0FMRCxDQWpERixFQXVERUMsS0FBS1IsTUFBTCxDQUFZNEQsV0FBWixDQUF5QixHQUFFckQsaUJBQVksZ0JBQXZDLEVBQXdELE1BQU07QUFDNUQsV0FBS1ksYUFBTCxDQUFtQkMsZUFBbkI7QUFDQSxXQUFLVCxhQUFMO0FBQ0EsV0FBS0ksU0FBTCxDQUFlUSxnQkFBTUcsa0JBQU4sRUFBZjtBQUNELEtBSkQsQ0F2REY7QUE2REQ7O0FBRUQ7QUFDQVQsbUJBQWtCO0FBQ2hCLFNBQUtiLFdBQUwsQ0FBaUJxQyxHQUFqQixDQUNFakMsS0FBS3FELFdBQUwsQ0FBaUJwQixHQUFqQixDQUFxQjtBQUNuQiw4QkFBd0IsQ0FDdEI7QUFDRXFCLGlCQUFTLCtCQURYO0FBRUVDLGVBQU8sc0JBRlQ7QUFHRUMsdUJBQWVkLE9BQ2JBLElBQUlDLE1BQUosQ0FBV0MsUUFBWCxLQUF3QixJQUF4QixJQUNBLENBQUNGLElBQUlDLE1BQUosQ0FBV0UsT0FBWCxDQUFtQixJQUFuQixFQUF5QlksU0FBekIsQ0FBbUNDLFFBQW5DLENBQTRDLFlBQTVDO0FBTEwsT0FEc0IsQ0FETDtBQVVuQix3Q0FBa0MsQ0FDaEM7QUFDRUosaUJBQVMsZ0NBRFg7QUFFRUMsZUFBTztBQUZULE9BRGdDLEVBS2hDO0FBQ0VELGlCQUFTLGtDQURYO0FBRUVDLGVBQU87QUFGVCxPQUxnQyxDQVZmO0FBb0JuQiwwQ0FBb0MsQ0FDbEM7QUFDRUQsaUJBQVMsZ0NBRFg7QUFFRUMsZUFBTztBQUZULE9BRGtDLEVBS2xDO0FBQ0VELGlCQUFTLGtDQURYO0FBRUVDLGVBQU87QUFGVCxPQUxrQztBQXBCakIsS0FBckIsQ0FERjtBQWlDRDs7QUFFRDtBQUNBZix5QkFBd0I7QUFDdEIsU0FBSzdCLGFBQUwsQ0FBbUJnRCxnQkFBbkI7QUFDRDs7QUFFRDtBQUNBbEIsb0JBQW1CO0FBQ2pCLFNBQUs5QixhQUFMLENBQW1CaUQsV0FBbkI7QUFDRDs7QUFFRDs7OztBQUlBeEIsYUFBWTtBQUNWLFVBQU15QixXQUFXQyxlQUFLQyxJQUFMLENBQ2YvRCxLQUFLZ0UsZ0JBQUwsRUFEZSxFQUVmLDBCQUZlLENBQWpCOztBQUtBLFdBQU8sb0JBQVNILFFBQVQsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUF2QixtQkFBa0I7QUFDaEIsVUFBTXVCLFdBQVdDLGVBQUtDLElBQUwsQ0FBVS9ELEtBQUtnRSxnQkFBTCxFQUFWLEVBQW1DLHFCQUFuQyxDQUFqQjs7QUFFQSxXQUFPLG9CQUFTSCxRQUFULENBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNdEQsU0FBTixDQUFpQlosWUFBakIsRUFBK0I7QUFDN0IsUUFBSTtBQUNGLGFBQU9vQixnQkFBTXNCLGVBQU4sQ0FBc0IxQyxZQUF0QixFQUFvQyxJQUFwQyxDQUFQO0FBQ0QsS0FGRCxDQUdBLE9BQU9zRSxHQUFQLEVBQVk7QUFDVnRFLHFCQUFlLE1BQU0sS0FBS3lDLFFBQUwsRUFBckI7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBT3JCLGdCQUFNc0IsZUFBTixDQUFzQjFDLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT3NFLEdBQVAsRUFBWTtBQUNWLFlBQU05QixVQUFVLE1BQU0sS0FBS0csY0FBTCxFQUF0QjtBQUNBM0MscUJBQWUsb0NBQXVCd0MsUUFBUUksSUFBL0IsQ0FBZjtBQUNEOztBQUVELFFBQUk7QUFDRixhQUFPeEIsZ0JBQU1zQixlQUFOLENBQXNCMUMsWUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPc0UsR0FBUCxFQUFZO0FBQ1Z0RSxxQkFBZSxFQUFFdUUsUUFBUSxFQUFWLEVBQWNDLFVBQVUsRUFBeEIsRUFBZjtBQUNEOztBQUVELFFBQUk7QUFDRixhQUFPcEQsZ0JBQU1zQixlQUFOLENBQXNCMUMsWUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPc0UsR0FBUCxFQUFZO0FBQ1Y1RCxjQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDRDtBQUNGOztBQUVEOzs7O0FBSUEsUUFBTW9CLFVBQU4sQ0FBa0JELEVBQWxCLEVBQXNCO0FBQ3BCekIsU0FBSytCLFNBQUwsQ0FBZXFDLElBQWYsRUFBb0IsTUFBTSxJQUFJQyxnQkFBSixDQUFvQjVDLEVBQXBCLENBQTFCO0FBQ0Q7QUFyUXNCO2tCQUFKbEMsRyIsImZpbGUiOiJwcm9qZWN0LXZpZXdlci1wbHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICBhd2FpdCBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoKCkgPT4ge1xuICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICB0aGlzLmFkZExpc3QoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yZWQgc3RhdGUnLCBjdXJyZW50U3RhdGUpO1xuICAgICAgdGhpcy5yZWFkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICAgIHRoaXMuYWRkQ29udGV4dE1lbnUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGRlYWN0aXZhdGVkXG4gICAqL1xuICBkZWFjdGl2YXRlICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveU1haW5JdGVtKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0LmRlc3Ryb3koKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiBzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEl0ZW1Ub0RvY2sgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRMaXN0ICgpIHtcbiAgICAvLyB0aGlzIGNvbXBvbWVudCBoYXMgcGVyZm9ybWFuY2UgaXNzdWVzXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKGlkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkKSB7XG4gICAgdGhpcy5vcGVuRWRpdG9yKGlkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlbGV0ZUVudHJ5IChpZCkge1xuICAgIGNvbnN0IGl0ZW0gPSBuZXcgQ29uZmlybURlbGV0ZShpZCk7XG4gICAgYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW0gfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byByZWdpc3RlciBjb21tYW5kc1xuICAgKi9cbiAgYWRkQ29tbWFuZHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWxlZ2FjeS1maWxlJzogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICAgICAgc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KSwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT5cbiAgICAgICAgICB0aGlzLnRvZ2dsZU1haW5WaXNpYmlsaXR5KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHRoaXMudG9nZ2xlTWFpbkZvY3VzKCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1saXN0JzogKCkgPT4gdGhpcy50b2dnbGVTZWxlY3RMaXN0KCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuYWRkRW50cnkoXG4gICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lICE9PSAnVUwnID8gZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkIDogTmFOXG4gICAgICAgICAgKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIHRoaXMuZGVsZXRlRW50cnkoZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmlkKVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLm1haW5Db250YWluZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtICE9PSB0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgJ2xlZnQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+IHtcbiAgICAgICAgaWYgKGl0ZW0gIT09IHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAncmlnaHQnKTtcbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICAgIHRoaXMucmVhZFN0YXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbnRleHRNZW51ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29udGV4dE1lbnUuYWRkKHtcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZCBncm91cC9wcm9qZWN0Li4uJyxcbiAgICAgICAgICAgIHNob3VsZERpc3BsYXk6IGV2dCA9PlxuICAgICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVUwnIHx8XG4gICAgICAgICAgICAgICFldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuY2xhc3NOYW1lLmluY2x1ZGVzKCdwdi1wcm9qZWN0JylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtZ3JvdXAnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgZ3JvdXAuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgZ3JvdXAuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LXByb2plY3QnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgcHJvamVjdC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpblZpc2liaWxpdHkgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVNYWluRm9jdXMgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBjdXJyZW50IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZEZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5nZXRDb25maWdEaXJQYXRoKCksXG4gICAgICAncHJvamVjdC12aWV3ZXItcGx1cy5qc29uJ1xuICAgICk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBsZWdhY3kgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkTGVnYWN5RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksICdwcm9qZWN0LXZpZXdlci5qc29uJyk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBsaWZlY3ljbGUgbWV0aG9kIHdoaWNoIGdldHMgY2FsbGVkIHdoZW4gdGhlIHBhY2thZ2UgaXMgYWN0aXZhdGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY3VycmVudFN0YXRlXSBjdXJyZW50IHN0YXRlLCBzaG91bGQgYmUgZGVhbHQgYnkgYXRvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzZXJpYWxpemF0aW9uIHByb2Nlc3NcbiAgICovXG4gIGFzeW5jIHJlYWRTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCB0aGlzLnJlYWRMZWdhY3lGaWxlKCk7XG4gICAgICBjdXJyZW50U3RhdGUgPSB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY3VycmVudFN0YXRlID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnc29tZXRoaW5nIHJlYWxseSB3cm9uZycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgZW50cnkgaWQgaWYgaW4gZWRpdCBtb2RlXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yIChpZCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcihpZCkpO1xuICB9XG59XG4iXX0=