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
      // this.addList();
      this.readState(currentState);
      this.addCommands();
    });
  }

  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */
  deactivate() {
    this.mainContainer.destroyMainItem();
    // this.selectList.destroy();
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
        console.log(content);
        _state2.default.initializeState(content, true);
      },
      'project-viewer-plus:read-legacy-file': async () => {
        const content = await this.readLegacyFile();
        _state2.default.initializeState((0, _legacy.transformLegacyContent)(content.root), true);
      },
      'project-viewer-plus:toggle-visibility': () => this.toggleMainVisibility(),
      'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
      'project-viewer-plus:toggle-list': () => this.toggleSelectList()
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
    }), atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(item => console.log('left', item)), atom.workspace.getRightDock().onDidStopChangingActivePaneItem(item => console.log('right', item)), atom.config.onDidChange(`${_base.PLUGIN_NAME}.dock.position`, () => {
      this.mainContainer.destroyMainItem();
      this.addItemToDock();
      this.mainContainer.update();
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlBWUCIsImNvbmZpZyIsIkNvbmZpZyIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiYXRvbSIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcyIsImFkZEl0ZW1Ub0RvY2siLCJyZWFkU3RhdGUiLCJhZGRDb21tYW5kcyIsImRlYWN0aXZhdGUiLCJtYWluQ29udGFpbmVyIiwiZGVzdHJveU1haW5JdGVtIiwic3RhdGUiLCJkaXNwb3NlIiwic2VyaWFsaXplIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiTWFpbkNvbnRhaW5lciIsImFkZE1haW5JdGVtIiwiYWRkTGlzdCIsInNlbGVjdExpc3QiLCJTZWxlY3RMaXN0IiwidG9nZ2xlU2VsZWN0TGlzdCIsInNob3ciLCJhZGQiLCJjb21tYW5kcyIsIm9wZW5FZGl0b3IiLCJjb250ZW50IiwicmVhZEZpbGUiLCJjb25zb2xlIiwibG9nIiwiaW5pdGlhbGl6ZVN0YXRlIiwicmVhZExlZ2FjeUZpbGUiLCJyb290IiwidG9nZ2xlTWFpblZpc2liaWxpdHkiLCJ0b2dnbGVNYWluRm9jdXMiLCJlbGVtZW50Iiwid29ya3NwYWNlIiwiZ2V0TGVmdERvY2siLCJvbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtIiwiaXRlbSIsImdldFJpZ2h0RG9jayIsIm9uRGlkQ2hhbmdlIiwidXBkYXRlIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwiZmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsImdldENvbmZpZ0RpclBhdGgiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyIsIm9wZW4iLCJFZGl0b3JDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7O0FB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RUFBWTtBQUNWLFlBQU12QixVQUFVLE1BQU0sS0FBS0ssY0FBTCxFQUF0QjtBQUNBakMscUJBQWUsb0NBQXVCNEIsUUFBUU0sSUFBL0IsQ0FBZjtBQUNEOztBQUVELFFBQUk7QUFDRixhQUFPcEIsZ0JBQU1rQixlQUFOLENBQXNCaEMsWUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPbUQsR0FBUCxFQUFZO0FBQ1ZuRCxxQkFBZSxFQUFFb0QsUUFBUSxFQUFWLEVBQWNDLFVBQVUsRUFBeEIsRUFBZjtBQUNEOztBQUVELFFBQUk7QUFDRixhQUFPdkMsZ0JBQU1rQixlQUFOLENBQXNCaEMsWUFBdEIsRUFBb0MsSUFBcEMsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPbUQsR0FBUCxFQUFZO0FBQ1ZyQixjQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDRDtBQUNGOztBQUVEOzs7QUFHQSxRQUFNSixVQUFOLEdBQW9CO0FBQ2xCdEIsU0FBS2lDLFNBQUwsQ0FBZWdCLElBQWYsRUFBb0IsTUFBTSxJQUFJQyxnQkFBSixFQUExQjtBQUNEO0FBeE1zQjtrQkFBSjNELEciLCJmaWxlIjoicHJvamVjdC12aWV3ZXItcGx1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcblxuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSAnLi9zZXJ2aWNlcy9maWxlJztcbmltcG9ydCB7IHRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgfSBmcm9tICcuL3NlcnZpY2VzL2xlZ2FjeSc7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcblxuLyoqXG4gKiBQYWNrYWdlJ3MgZW50cnkgcG9pbnQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUFZQIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICBhd2FpdCBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkSXRlbVRvRG9jaygpO1xuICAgICAgICAvLyB0aGlzLmFkZExpc3QoKTtcbiAgICAgICAgdGhpcy5yZWFkU3RhdGUoY3VycmVudFN0YXRlKTtcbiAgICAgICAgdGhpcy5hZGRDb21tYW5kcygpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGxpZmVjeWNsZSBtZXRob2Qgd2hpY2ggZ2V0cyBjYWxsZWQgd2hlbiB0aGUgcGFja2FnZSBpcyBkZWFjdGl2YXRlZFxuICAgKi9cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5tYWluQ29udGFpbmVyLmRlc3Ryb3lNYWluSXRlbSgpO1xuICAgIC8vIHRoaXMuc2VsZWN0TGlzdC5kZXN0cm95KCk7XG4gICAgc3RhdGUuZGVhY3RpdmF0ZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRJdGVtVG9Eb2NrICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIHRoaXMubWFpbkNvbnRhaW5lci5hZGRNYWluSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkTGlzdCAoKSB7XG4gICAgLy8gdGhpcyBjb21wb21lbnQgaGFzIHBlcmZvcm1hbmNlIGlzc3Vlc1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzaG93IHRoZSBTZWxlY3QgTGlzdCB2aWV3LlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIHJlZ2lzdGVyIGNvbW1hbmRzXG4gICAqL1xuICBhZGRDb21tYW5kcyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZWRpdG9yJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpyZWFkLWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnJlYWQtbGVnYWN5LWZpbGUnOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMucmVhZExlZ2FjeUZpbGUoKTtcbiAgICAgICAgICBzdGF0ZS5pbml0aWFsaXplU3RhdGUoXG4gICAgICAgICAgICB0cmFuc2Zvcm1MZWdhY3lDb250ZW50KGNvbnRlbnQucm9vdCksXG4gICAgICAgICAgICB0cnVlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PlxuICAgICAgICAgIHRoaXMudG9nZ2xlTWFpblZpc2liaWxpdHkoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4gdGhpcy50b2dnbGVNYWluRm9jdXMoKSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWxpc3QnOiAoKSA9PiB0aGlzLnRvZ2dsZVNlbGVjdExpc3QoKVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLm1haW5Db250YWluZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZVxuICAgICAgICAuZ2V0TGVmdERvY2soKVxuICAgICAgICAub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+XG4gICAgICAgICAgY29uc29sZS5sb2coJ2xlZnQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgLmdldFJpZ2h0RG9jaygpXG4gICAgICAgIC5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT5cbiAgICAgICAgICBjb25zb2xlLmxvZygncmlnaHQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95TWFpbkl0ZW0oKTtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9Eb2NrKCk7XG4gICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci51cGRhdGUoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZU1haW5WaXNpYmlsaXR5ICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlTWFpbkZvY3VzICgpIHtcbiAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgY3VycmVudCBmaWxlIHNjaGVtYVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBKU09OIHBhcnNlZCBmaWxlIGNvbnRlbnRcbiAgICovXG4gIHJlYWRGaWxlICgpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLFxuICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXMuanNvbidcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHJlYWQgZnJvbSB0aGUgbGVnYWN5IGZpbGUgc2NoZW1hXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEpTT04gcGFyc2VkIGZpbGUgY29udGVudFxuICAgKi9cbiAgcmVhZExlZ2FjeUZpbGUgKCkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGF0b20uZ2V0Q29uZmlnRGlyUGF0aCgpLCAncHJvamVjdC12aWV3ZXIuanNvbicpO1xuXG4gICAgcmV0dXJuIHJlYWRGaWxlKGZpbGVQYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgbGlmZWN5Y2xlIG1ldGhvZCB3aGljaCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBwYWNrYWdlIGlzIGFjdGl2YXRlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW2N1cnJlbnRTdGF0ZV0gY3VycmVudCBzdGF0ZSwgc2hvdWxkIGJlIGRlYWx0IGJ5IGF0b21cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXphdGlvbiBwcm9jZXNzXG4gICAqL1xuICBhc3luYyByZWFkU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGF3YWl0IHRoaXMucmVhZEZpbGUoKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHN0YXRlLmluaXRpYWxpemVTdGF0ZShjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5yZWFkTGVnYWN5RmlsZSgpO1xuICAgICAgY3VycmVudFN0YXRlID0gdHJhbnNmb3JtTGVnYWN5Q29udGVudChjb250ZW50LnJvb3QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gc3RhdGUuaW5pdGlhbGl6ZVN0YXRlKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBzdGF0ZS5pbml0aWFsaXplU3RhdGUoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ3NvbWV0aGluZyByZWFsbHkgd3JvbmcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBvcGVuIHRoZSBFZGl0b3Igdmlldy5cbiAgICovXG4gIGFzeW5jIG9wZW5FZGl0b3IgKCkge1xuICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgbmV3IEVkaXRvckNvbnRhaW5lcigpKTtcbiAgfVxufVxuIl19