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


  async activate(serialized) {
    this.subscriptions = new _atom.CompositeDisposable(atom.workspace.addOpener(uri => this.mainOpener(uri)), new _atom.Disposable(() => {
      atom.workspace.getPaneItems().forEach(item => {
        if (item instanceof _main.default) {
          item.destroy();
        }
      });
    }));

    _state.default.activate();

    if (atom.workspace.paneForURI(_base.DOCK_URI)) {
      this.mainContainer.activate();
    }

    this.readState(serialized.state);
    this.addCommands();
    this.addList();
  }
  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */


  async deactivate() {
    this.subscriptions.dispose();

    _state.default.deactivate();

    const pane = atom.workspace.paneForURI(_base.DOCK_URI);

    if (pane) {
      pane.destroy();
    }
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


  addList() {} // this compoment has performance issues
  // this.selectList = new SelectList();

  /**
   * handler to show the Select List view.
   */


  toggleSelectList() {} // this.selectList.show();

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
    const item = new _confirmDelete.default(id);
    atom.workspace.addModalPanel({
      item
    });
  }
  /**
   * Handler to register commands
   */


  addCommands() {
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
      'project-viewer-plus:read-file': async () => {
        const content = await this.readFile();

        _state.default.initializeState(content, true);
      },
      'project-viewer-plus:read-legacy-file': async () => {
        const content = await this.readLegacyFile();

        _state.default.initializeState((0, _legacy.transformLegacyContent)(content.root), true);
      },
      'project-viewer-plus:toggle-visibility': () => this.toggleMainVisibility(),
      'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
      'project-viewer-plus:add-entry': evt => this.addEntry(evt.target.nodeName !== 'UL' && evt.target.closest('li') ? evt.target.closest('li').id : NaN),
      'project-viewer-plus:edit-entry': evt => evt.target.closest('li') && this.editEntry(evt.target.closest('li').id),
      'project-viewer-plus:delete-entry': evt => evt.target.closest('li') && this.deleteEntry(evt.target.closest('li').id)
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainVisibility() {
    atom.workspace.toggle(_base.DOCK_URI);
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleMainFocus() {
    if (this.mainContainer) {
      this.mainContainer.toggleFocus();
    }
  }
  /**
   * handler to read from the current file schema
   * @returns {Object} JSON parsed file content
   */


  readFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }
  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */


  readLegacyFile() {
    const filePath = _path.default.join(atom.getConfigDirPath(), _base.LEGACY_DATABASE_FILE);

    return (0, _file.readFile)(filePath);
  }
  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */


  async readState(currentState) {
    try {
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      currentState = await this.readFile();
    }

    try {
      return _state.default.initializeState(currentState, true);
    } catch (err) {
      const content = await this.readLegacyFile();
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
  }
  /**
   * handler to save the current state to the file.
   * @param {string} id - the entry id if in edit mode
   */


  async saveFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    await (0, _file.saveFile)(filePath, JSON.stringify(_state.default.serializeGroupById(NaN, false), null, 2));
  }
  /**
   * handler to open the Editor view.
   */


  async editFile() {
    const filePath = _path.default.join(atom.config.get(`${_base.PLUGIN_NAME}.database.localPath`), _base.DATABASE_FILE);

    atom.workspace.open(filePath);
  }
  /**
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
   * @param {string} parentId - the entry parent id if in edit mode
   */


  async openEditor(id, parentId) {
    atom.workspace.open((await new _editor.default(id, parentId)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwic2VyaWFsaXplZCIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiYXRvbSIsIndvcmtzcGFjZSIsImFkZE9wZW5lciIsInVyaSIsIm1haW5PcGVuZXIiLCJEaXNwb3NhYmxlIiwiZ2V0UGFuZUl0ZW1zIiwiZm9yRWFjaCIsIml0ZW0iLCJNYWluQ29udGFpbmVyIiwiZGVzdHJveSIsInN0YXRlIiwicGFuZUZvclVSSSIsIkRPQ0tfVVJJIiwibWFpbkNvbnRhaW5lciIsInJlYWRTdGF0ZSIsImFkZENvbW1hbmRzIiwiYWRkTGlzdCIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwicGFuZSIsImNyZWF0ZU1haW5WaWV3IiwidG9nZ2xlU2VsZWN0TGlzdCIsImFkZEVudHJ5IiwicGFyZW50SWQiLCJvcGVuRWRpdG9yIiwiZWRpdEVudHJ5IiwiaWQiLCJkZWxldGVFbnRyeSIsIkNvbmZpcm1EZWxldGUiLCJhZGRNb2RhbFBhbmVsIiwiYWRkIiwiY29tbWFuZHMiLCJjbGVhclN0YXRlIiwic2F2ZUZpbGUiLCJlZGl0RmlsZSIsImNvbnRlbnQiLCJyZWFkRmlsZSIsImluaXRpYWxpemVTdGF0ZSIsInJlYWRMZWdhY3lGaWxlIiwicm9vdCIsInRvZ2dsZU1haW5WaXNpYmlsaXR5IiwidG9nZ2xlTWFpbkZvY3VzIiwiZXZ0IiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJjbG9zZXN0IiwiTmFOIiwidG9nZ2xlIiwidG9nZ2xlRm9jdXMiLCJmaWxlUGF0aCIsInBhdGgiLCJqb2luIiwiZ2V0IiwiUExVR0lOX05BTUUiLCJEQVRBQkFTRV9GSUxFIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIkxFR0FDWV9EQVRBQkFTRV9GSUxFIiwiY3VycmVudFN0YXRlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQU1BOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7OztBQUdlLE1BQU1BLEdBQU4sQ0FBVTtBQUN2Qjs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU9DLGVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFFBQU1DLFFBQU4sQ0FBZ0JDLFVBQWhCLEVBQTRCO0FBQzFCLFNBQUtDLGFBQUwsR0FBcUIsSUFBSUMseUJBQUosQ0FDbkJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlQyxTQUFmLENBQXlCQyxHQUFHLElBQUksS0FBS0MsVUFBTCxDQUFnQkQsR0FBaEIsQ0FBaEMsQ0FEbUIsRUFFbkIsSUFBSUUsZ0JBQUosQ0FBZSxNQUFNO0FBQ25CTCxNQUFBQSxJQUFJLENBQUNDLFNBQUwsQ0FBZUssWUFBZixHQUE4QkMsT0FBOUIsQ0FBc0NDLElBQUksSUFBSTtBQUM1QyxZQUFJQSxJQUFJLFlBQVlDLGFBQXBCLEVBQW1DO0FBQ2pDRCxVQUFBQSxJQUFJLENBQUNFLE9BQUw7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLQU5ELENBRm1CLENBQXJCOztBQVdBQyxtQkFBTWYsUUFBTjs7QUFFQSxRQUFJSSxJQUFJLENBQUNDLFNBQUwsQ0FBZVcsVUFBZixDQUEwQkMsY0FBMUIsQ0FBSixFQUF5QztBQUN2QyxXQUFLQyxhQUFMLENBQW1CbEIsUUFBbkI7QUFDRDs7QUFFRCxTQUFLbUIsU0FBTCxDQUFlbEIsVUFBVSxDQUFDYyxLQUExQjtBQUNBLFNBQUtLLFdBQUw7QUFDQSxTQUFLQyxPQUFMO0FBQ0Q7QUFFRDs7Ozs7QUFHQSxRQUFNQyxVQUFOLEdBQW9CO0FBQ2xCLFNBQUtwQixhQUFMLENBQW1CcUIsT0FBbkI7O0FBQ0FSLG1CQUFNTyxVQUFOOztBQUVBLFVBQU1FLElBQUksR0FBR3BCLElBQUksQ0FBQ0MsU0FBTCxDQUFlVyxVQUFmLENBQTBCQyxjQUExQixDQUFiOztBQUVBLFFBQUlPLElBQUosRUFBVTtBQUNSQSxNQUFBQSxJQUFJLENBQUNWLE9BQUw7QUFDRDtBQUNGO0FBRUQ7OztBQUNBTixFQUFBQSxVQUFVLENBQUVELEdBQUYsRUFBTztBQUNmLFFBQUlBLEdBQUcsS0FBS1UsY0FBWixFQUFzQjtBQUNwQixXQUFLUSxjQUFMO0FBQ0EsV0FBS1AsYUFBTCxDQUFtQmxCLFFBQW5CLENBQTRCLElBQTVCO0FBQ0EsYUFBTyxLQUFLa0IsYUFBWjtBQUNEO0FBQ0Y7QUFFRDs7O0FBQ0FPLEVBQUFBLGNBQWMsR0FBSTtBQUNoQixTQUFLUCxhQUFMLEdBQXFCLElBQUlMLGFBQUosRUFBckI7QUFDQSxXQUFPLEtBQUtLLGFBQVo7QUFDRDtBQUVEOzs7QUFDQUcsRUFBQUEsT0FBTyxHQUFJLENBR1YsQ0FITSxDQUNMO0FBQ0E7O0FBR0Y7Ozs7O0FBR0FLLEVBQUFBLGdCQUFnQixHQUFJLENBRW5CLENBRmUsQ0FDZDs7QUFHRjs7O0FBQ0FDLEVBQUFBLFFBQVEsQ0FBRUMsUUFBRixFQUFZO0FBQ2xCLFNBQUtDLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0JELFFBQXRCO0FBQ0Q7QUFFRDs7O0FBQ0FFLEVBQUFBLFNBQVMsQ0FBRUMsRUFBRixFQUFNO0FBQ2IsU0FBS0YsVUFBTCxDQUFnQkUsRUFBaEI7QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsV0FBVyxDQUFFRCxFQUFGLEVBQU07QUFDZixVQUFNbkIsSUFBSSxHQUFHLElBQUlxQixzQkFBSixDQUFrQkYsRUFBbEIsQ0FBYjtBQUNBM0IsSUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWU2QixhQUFmLENBQTZCO0FBQUV0QixNQUFBQTtBQUFGLEtBQTdCO0FBQ0Q7QUFFRDs7Ozs7QUFHQVEsRUFBQUEsV0FBVyxHQUFJO0FBQ2IsU0FBS2xCLGFBQUwsQ0FBbUJpQyxHQUFuQixDQUNFL0IsSUFBSSxDQUFDZ0MsUUFBTCxDQUFjRCxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztBQUNsQyxpREFBMkMsTUFBTTtBQUMvQ3BCLHVCQUFNc0IsVUFBTjtBQUNELE9BSGlDO0FBSWxDLHVDQUFpQyxNQUFNO0FBQ3JDLGFBQUtDLFFBQUw7QUFDRCxPQU5pQztBQU9sQyx1Q0FBaUMsTUFBTTtBQUNyQyxhQUFLQyxRQUFMO0FBQ0QsT0FUaUM7QUFVbEMseUNBQW1DLE1BQU07QUFDdkMsYUFBS1YsVUFBTDtBQUNELE9BWmlDO0FBYWxDLHVDQUFpQyxZQUFZO0FBQzNDLGNBQU1XLE9BQU8sR0FBRyxNQUFNLEtBQUtDLFFBQUwsRUFBdEI7O0FBQ0ExQix1QkFBTTJCLGVBQU4sQ0FBc0JGLE9BQXRCLEVBQStCLElBQS9CO0FBQ0QsT0FoQmlDO0FBaUJsQyw4Q0FBd0MsWUFBWTtBQUNsRCxjQUFNQSxPQUFPLEdBQUcsTUFBTSxLQUFLRyxjQUFMLEVBQXRCOztBQUNBNUIsdUJBQU0yQixlQUFOLENBQXNCLG9DQUF1QkYsT0FBTyxDQUFDSSxJQUEvQixDQUF0QixFQUE0RCxJQUE1RDtBQUNELE9BcEJpQztBQXFCbEMsK0NBQXlDLE1BQ3ZDLEtBQUtDLG9CQUFMLEVBdEJnQztBQXVCbEMsMENBQW9DLE1BQU0sS0FBS0MsZUFBTCxFQXZCUjtBQXdCbEMseUNBQW1DLE1BQU0sS0FBS3BCLGdCQUFMLEVBeEJQO0FBeUJsQyx1Q0FBaUNxQixHQUFHLElBQ2xDLEtBQUtwQixRQUFMLENBQ0VvQixHQUFHLENBQUNDLE1BQUosQ0FBV0MsUUFBWCxLQUF3QixJQUF4QixJQUFnQ0YsR0FBRyxDQUFDQyxNQUFKLENBQVdFLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBaEMsR0FDSUgsR0FBRyxDQUFDQyxNQUFKLENBQVdFLE9BQVgsQ0FBbUIsSUFBbkIsRUFBeUJuQixFQUQ3QixHQUNrQ29CLEdBRnBDLENBMUJnQztBQThCbEMsd0NBQWtDSixHQUFHLElBQ2xDQSxHQUFHLENBQUNDLE1BQUosQ0FBV0UsT0FBWCxDQUFtQixJQUFuQixDQUFELElBQ0UsS0FBS3BCLFNBQUwsQ0FBZWlCLEdBQUcsQ0FBQ0MsTUFBSixDQUFXRSxPQUFYLENBQW1CLElBQW5CLEVBQXlCbkIsRUFBeEMsQ0FoQzhCO0FBaUNsQywwQ0FBb0NnQixHQUFHLElBQ3BDQSxHQUFHLENBQUNDLE1BQUosQ0FBV0UsT0FBWCxDQUFtQixJQUFuQixDQUFELElBQ0UsS0FBS2xCLFdBQUwsQ0FBaUJlLEdBQUcsQ0FBQ0MsTUFBSixDQUFXRSxPQUFYLENBQW1CLElBQW5CLEVBQXlCbkIsRUFBMUM7QUFuQzhCLEtBQXBDLENBREY7QUF1Q0Q7QUFFRDs7O0FBQ0FjLEVBQUFBLG9CQUFvQixHQUFJO0FBQ3RCekMsSUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWUrQyxNQUFmLENBQXNCbkMsY0FBdEI7QUFDRDtBQUVEOzs7QUFDQTZCLEVBQUFBLGVBQWUsR0FBSTtBQUNqQixRQUFJLEtBQUs1QixhQUFULEVBQXdCO0FBQ3RCLFdBQUtBLGFBQUwsQ0FBbUJtQyxXQUFuQjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7O0FBSUFaLEVBQUFBLFFBQVEsR0FBSTtBQUNWLFVBQU1hLFFBQVEsR0FBR0MsY0FBS0MsSUFBTCxDQUNmcEQsSUFBSSxDQUFDTixNQUFMLENBQVkyRCxHQUFaLENBQWlCLEdBQUVDLGlCQUFZLHFCQUEvQixDQURlLEVBRWZDLG1CQUZlLENBQWpCOztBQUtBLFdBQU8sb0JBQVNMLFFBQVQsQ0FBUDtBQUNEO0FBRUQ7Ozs7OztBQUlBWCxFQUFBQSxjQUFjLEdBQUk7QUFDaEIsVUFBTVcsUUFBUSxHQUFHQyxjQUFLQyxJQUFMLENBQVVwRCxJQUFJLENBQUN3RCxnQkFBTCxFQUFWLEVBQW1DQywwQkFBbkMsQ0FBakI7O0FBRUEsV0FBTyxvQkFBU1AsUUFBVCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU1uQyxTQUFOLENBQWlCMkMsWUFBakIsRUFBK0I7QUFDN0IsUUFBSTtBQUNGLGFBQU8vQyxlQUFNMkIsZUFBTixDQUFzQm9CLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT0MsR0FBUCxFQUFZO0FBQ1ZELE1BQUFBLFlBQVksR0FBRyxNQUFNLEtBQUtyQixRQUFMLEVBQXJCO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGLGFBQU8xQixlQUFNMkIsZUFBTixDQUFzQm9CLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT0MsR0FBUCxFQUFZO0FBQ1YsWUFBTXZCLE9BQU8sR0FBRyxNQUFNLEtBQUtHLGNBQUwsRUFBdEI7QUFDQW1CLE1BQUFBLFlBQVksR0FBRyxvQ0FBdUJ0QixPQUFPLENBQUNJLElBQS9CLENBQWY7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBTzdCLGVBQU0yQixlQUFOLENBQXNCb0IsWUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPQyxHQUFQLEVBQVk7QUFDVkQsTUFBQUEsWUFBWSxHQUFHO0FBQUVFLFFBQUFBLE1BQU0sRUFBRSxFQUFWO0FBQWNDLFFBQUFBLFFBQVEsRUFBRTtBQUF4QixPQUFmO0FBQ0Q7O0FBRUQsUUFBSTtBQUNGLGFBQU9sRCxlQUFNMkIsZUFBTixDQUFzQm9CLFlBQXRCLEVBQW9DLElBQXBDLENBQVA7QUFDRCxLQUZELENBR0EsT0FBT0MsR0FBUCxFQUFZO0FBQ1ZHLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7QUFJQSxRQUFNN0IsUUFBTixHQUFrQjtBQUNoQixVQUFNZ0IsUUFBUSxHQUFHQyxjQUFLQyxJQUFMLENBQ2ZwRCxJQUFJLENBQUNOLE1BQUwsQ0FBWTJELEdBQVosQ0FBaUIsR0FBRUMsaUJBQVkscUJBQS9CLENBRGUsRUFFZkMsbUJBRmUsQ0FBakI7O0FBS0EsVUFBTSxvQkFDSkwsUUFESSxFQUVKYyxJQUFJLENBQUNDLFNBQUwsQ0FBZXRELGVBQU11RCxrQkFBTixDQUF5Qm5CLEdBQXpCLEVBQThCLEtBQTlCLENBQWYsRUFBcUQsSUFBckQsRUFBMkQsQ0FBM0QsQ0FGSSxDQUFOO0FBSUQ7QUFFRDs7Ozs7QUFHQSxRQUFNWixRQUFOLEdBQWtCO0FBQ2hCLFVBQU1lLFFBQVEsR0FBR0MsY0FBS0MsSUFBTCxDQUNmcEQsSUFBSSxDQUFDTixNQUFMLENBQVkyRCxHQUFaLENBQWlCLEdBQUVDLGlCQUFZLHFCQUEvQixDQURlLEVBRWZDLG1CQUZlLENBQWpCOztBQUlBdkQsSUFBQUEsSUFBSSxDQUFDQyxTQUFMLENBQWVrRSxJQUFmLENBQW9CakIsUUFBcEI7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsUUFBTXpCLFVBQU4sQ0FBa0JFLEVBQWxCLEVBQXNCSCxRQUF0QixFQUFnQztBQUM5QnhCLElBQUFBLElBQUksQ0FBQ0MsU0FBTCxDQUFla0UsSUFBZixFQUFvQixNQUFNLElBQUlDLGVBQUosQ0FBb0J6QyxFQUFwQixFQUF3QkgsUUFBeEIsQ0FBMUI7QUFDRDtBQUVEOzs7Ozs7QUFJQTZDLEVBQUFBLFNBQVMsR0FBSTtBQUNYLFdBQU87QUFDTDFELE1BQUFBLEtBQUssRUFBRUEsZUFBTXVELGtCQUFOLEVBREY7QUFFTEksTUFBQUEsWUFBWSxFQUFFO0FBRlQsS0FBUDtBQUlEO0FBRUQ7OztBQUNBQyxFQUFBQSxnQ0FBZ0MsQ0FBRTFFLFVBQUYsRUFBYztBQUM1QyxXQUFPLEtBQUt3QixjQUFMLEVBQVA7QUFDRDs7QUF0UXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5cbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7XG4gIFBMVUdJTl9OQU1FLFxuICBEQVRBQkFTRV9GSUxFLFxuICBMRUdBQ1lfREFUQUJBU0VfRklMRSxcbiAgRE9DS19VUklcbn0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgeyByZWFkRmlsZSwgc2F2ZUZpbGUgfSBmcm9tICcuL3NlcnZpY2VzL2ZpbGUnO1xuaW1wb3J0IHsgdHJhbnNmb3JtTGVnYWN5Q29udGVudCB9IGZyb20gJy4vc2VydmljZXMvbGVnYWN5JztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRWRpdG9yQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9lZGl0b3InO1xuaW1wb3J0IENvbmZpcm1EZWxldGUgZnJvbSAnLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZCBzZXJpYWxpemVkIGNvbnRlbnQsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemVkLnN0YXRlIGN1cnJlbnQgc3RhdGVcbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChzZXJpYWxpemVkKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoXG4gICAgICBhdG9tLndvcmtzcGFjZS5hZGRPcGVuZXIodXJpID0+IHRoaXMubWFpbk9wZW5lcih1cmkpKSxcbiAgICAgIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UGFuZUl0ZW1zKCkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIE1haW5Db250YWluZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzdGF0ZS5hY3RpdmF0ZSgpO1xuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkoRE9DS19VUkkpKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlYWRTdGF0ZShzZXJpYWxpemVkLnN0YXRlKTtcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgdGhpcy5hZGRMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgICBzdGF0ZS5kZWFjdGl2YXRlKCk7XG5cbiAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShET0NLX1VSSSk7XG5cbiAgICBpZiAocGFuZSkge1xuICAgICAgcGFuZS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgbWFpbk9wZW5lciAodXJpKSB7XG4gICAgaWYgKHVyaSA9PT0gRE9DS19VUkkpIHtcbiAgICAgIHRoaXMuY3JlYXRlTWFpblZpZXcoKTtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5hY3RpdmF0ZSh0cnVlKTtcbiAgICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlTWFpblZpZXcgKCkge1xuICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZExpc3QgKCkge1xuICAgIC8vIHRoaXMgY29tcG9tZW50IGhhcyBwZXJmb3JtYW5jZSBpc3N1ZXNcbiAgICAvLyB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2hvdyB0aGUgU2VsZWN0IExpc3Qgdmlldy5cbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIC8vIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAocGFyZW50SWQpIHtcbiAgICB0aGlzLm9wZW5FZGl0b3IobnVsbCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCkge1xuICAgIHRoaXMub3BlbkVkaXRvcihpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBpdGVtID0gbmV3IENvbmZpcm1EZWxldGUoaWQpO1xuICAgIGF0b20ud29ya3NwYWNlLmFkZE1vZGFsUGFuZWwoeyBpdGVtIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gcmVnaXN0ZXIgY29tbWFuZHNcbiAgICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpjbGVhci1jdXJyZW50LXN0YXRlJzogKCkgPT4ge1xuICAgICAgICAgIHN0YXRlLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6c2F2ZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2F2ZUZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdEZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkRmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjb250ZW50LCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6cmVhZC1sZWdhY3ktZmlsZSc6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgICAgIHN0YXRlLmluaXRpYWxpemVTdGF0ZSh0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+XG4gICAgICAgICAgdGhpcy50b2dnbGVNYWluVmlzaWJpbGl0eSgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB0aGlzLnRvZ2dsZU1haW5Gb2N1cygpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtbGlzdCc6ICgpID0+IHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknOiBldnQgPT5cbiAgICAgICAgICB0aGlzLmFkZEVudHJ5KFxuICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSAhPT0gJ1VMJyAmJiBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJylcbiAgICAgICAgICAgICAgPyBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuaWQgOiBOYU5cbiAgICAgICAgICApLFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JzogZXZ0ID0+XG4gICAgICAgICAgKGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKSkgJiZcbiAgICAgICAgICAgIHRoaXMuZWRpdEVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZCksXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeSc6IGV2dCA9PlxuICAgICAgICAgIChldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykpICYmXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUVudHJ5KGV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5pZClcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUoRE9DS19VUkkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICBpZiAodGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byByZWFkIGZyb20gdGhlIGN1cnJlbnQgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkRmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVhZEZpbGUoZmlsZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gcmVhZCBmcm9tIHRoZSBsZWdhY3kgZmlsZSBzY2hlbWFcbiAgICogQHJldHVybnMge09iamVjdH0gSlNPTiBwYXJzZWQgZmlsZSBjb250ZW50XG4gICAqL1xuICByZWFkTGVnYWN5RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXRvbS5nZXRDb25maWdEaXJQYXRoKCksIExFR0FDWV9EQVRBQkFTRV9GSUxFKTtcblxuICAgIHJldHVybiByZWFkRmlsZShmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBhY3RpdmF0ZWRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjdXJyZW50U3RhdGVdIGN1cnJlbnQgc3RhdGUsIHNob3VsZCBiZSBkZWFsdCBieSBhdG9tXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNlcmlhbGl6YXRpb24gcHJvY2Vzc1xuICAgKi9cbiAgYXN5bmMgcmVhZFN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSBhd2FpdCB0aGlzLnJlYWRGaWxlKCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoY29udGVudC5yb290KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjdXJyZW50U3RhdGUgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzb21ldGhpbmcgcmVhbGx5IHdyb25nJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gc2F2ZSB0aGUgY3VycmVudCBzdGF0ZSB0byB0aGUgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgc2F2ZUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kYXRhYmFzZS5sb2NhbFBhdGhgKSxcbiAgICAgIERBVEFCQVNFX0ZJTEVcbiAgICApO1xuXG4gICAgYXdhaXQgc2F2ZUZpbGUoXG4gICAgICBmaWxlUGF0aCxcbiAgICAgIEpTT04uc3RyaW5naWZ5KHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZChOYU4sIGZhbHNlKSwgbnVsbCwgMilcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBlZGl0RmlsZSAoKSB7XG4gICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oXG4gICAgICBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRhdGFiYXNlLmxvY2FsUGF0aGApLFxuICAgICAgREFUQUJBU0VfRklMRVxuICAgICk7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3BlbihmaWxlUGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGVudHJ5IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50SWQgLSB0aGUgZW50cnkgcGFyZW50IGlkIGlmIGluIGVkaXQgbW9kZVxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoaWQsIHBhcmVudElkKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKGlkLCBwYXJlbnRJZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdGU6IHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpLFxuICAgICAgZGVzZXJpYWxpemVyOiAncHJvamVjdC12aWV3ZXItcGx1cy9tYWluJ1xuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RWaWV3ZXJQbHVzVmlldyAoc2VyaWFsaXplZCkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZU1haW5WaWV3KCk7XG4gIH1cbn1cbiJdfQ==