'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _atomPackageDeps = require('atom-package-deps');

var dependencies = _interopRequireWildcard(_atomPackageDeps);

var _base = require('./constants/base');

var _config = require('./constants/config');

var _config2 = _interopRequireDefault(_config);

var _state = require('./services/state');

var _state2 = _interopRequireDefault(_state);

var _fileContent = require('./services/file-content');

var _fileContent2 = _interopRequireDefault(_fileContent);

var _contextSwitcher = require('./services/context-switcher');

var _contextSwitcher2 = _interopRequireDefault(_contextSwitcher);

var _github = require('./services/github');

var _github2 = _interopRequireDefault(_github);

var _main = require('./containers/main');

var _main2 = _interopRequireDefault(_main);

var _selectList = require('./containers/select-list');

var _selectList2 = _interopRequireDefault(_selectList);

var _editor = require('./containers/editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * The core of Project Viewer Plus Package
 */
class ProjectViewerPlus {
  /**
   * Returns this package configuration object specific to Atom
   * @returns {Object} the package configuration
   */
  get config() {
    return _config2.default;
  }

  /**
   * Atom package lifecycle method for activating the package
   * @param {Object} [serialization] - serialized state
   * @returns {undefined}
   */
  activate(serialization) {
    this.disposables = new _atom.CompositeDisposable();
    this.state = new _state2.default();
    this.fileContent = new _fileContent2.default();
    this.gitHub = new _github2.default();
    this.contextSwitcher = new _contextSwitcher2.default();
    this.selectList = new _selectList2.default();

    try {
      if (!serialization || serialization.deserializer !== _base.DESERIALIZER) {
        throw Error();
      }
      atom.deserializers.deserialize(serialization);
    } catch (e) {
      if (atom.packages.initialPackagesActivated) {
        this.orchestrator(serialization);
      } else {
        atom.packages.onDidActivateInitialPackages(() => this.orchestrator(serialization));
      }
    }
  }

  /**
   * If running in production, it will validate and ask the user
   * to install `file-icons` package.
   */
  checkDependencies() {
    if (process.env.NODE_ENV === 'production') {
      dependencies.install(_base.PLUGIN_NAME);
    }
  }

  /**
   * adds the project-viewer item to the specified dock.
   * @todo add alternative as a panel (settings)
   */
  async addToDock() {
    await atom.workspace.open((await this.getContainer()), {
      activateItem: atom.config.get(`${_base.PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${_base.PLUGIN_NAME}.dock.isVisible`),
      location: atom.config.get(`${_base.PLUGIN_NAME}.dock.position`)
    });

    this.handleEvents();
  }

  /**
   * Initializes the content receivers of the package
   */
  async initializeContent() {
    await this.fileContent.initialize();
    await this.state.update((await this.fileContent.readFile()));
  }

  /**
   * orchestrates all necessary content
   * @param {Object} serialization - a serialized content
   */
  async orchestrator(serialization = {}) {
    await this.checkDependencies();
    await this.addToDock();

    this.fileContent.onDidFileContentChange(async content => {
      await this.state.update(content);
    });

    this.state.onDidUpdateContent(content => {
      this.mainContainer.handleUpdate(content);
      this.selectList.setItems(content);
    });

    this.selectList.onDidSelectItem(item => {
      this.contextSwitcher.switchContext(item);
    });

    this.mainContainer.onDidSelectProject(project => {
      this.contextSwitcher.switchContext(project);
    });

    await this.initializeContent();
  }

  /**
   * Atom package lifecycle method for deactivate the package.
   */
  async deactivate() {
    await this.disposables.dispose();

    this.state.clear();
    this.fileContent.destroy();

    if (this.mainContainer) {
      this.mainContainer.destroy();
      delete this.mainContainer;
    }
  }

  /**
   * Register all events such as commands, observers and emitters.
   */
  handleEvents() {
    this.disposables.add(atom.commands.add('atom-workspace', {
      'project-viewer-plus:open-database-file': () => {
        this.fileContent.openFile();
      },
      'project-viewer-plus:open-editor': () => {
        this.openEditor();
      },
      'project-viewer-plus:toggle-visibility': () => {
        this.mainContainer.toggleVisibility();
      },
      'project-viewer-plus:toggle-focus': () => {
        this.mainContainer.toggleFocus();
      },
      'project-viewer-plus:toggle-select-list': () => {
        this.toggleSelectList();
      }
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
    }), atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(item => this.handlePositionChange('left', item)), atom.workspace.getRightDock().onDidStopChangingActivePaneItem(item => this.handlePositionChange('right', item)), atom.config.onDidChange(`${_base.PLUGIN_NAME}.dock.position`, () => {
      if (this.mainContainer) {
        this.mainContainer.destroy();
        delete this.mainContainer;
      }
      this.addToDock();
    }));
  }

  /**
   * watcher function to detect the movement of the dock's pane item
   * @param {string} position - the next dock position
   * @param {Object} item - the active pane item
   */
  async handlePositionChange(position, item) {
    if (!atom.config.get(`${_base.PLUGIN_NAME}.dock.saveChanges`)) {
      return;
    }
    if (item === (await this.getContainer())) {
      atom.config.set(`${_base.PLUGIN_NAME}.dock.position`, position);
    }
  }

  /**
   * Gets the Project Viewer Plus container if already created or creates a new.
   * @returns {Object} the Project Viewer instance.
   */
  async getContainer() {
    if (!this.mainContainer) {
      this.mainContainer = new _main2.default();
    }
    return this.mainContainer;
  }

  /**
   * handler to show the Select List view.
   */
  toggleSelectList() {
    this.selectList.show();
  }

  /**
   * handler to open the Editor view.
   */
  async openEditor() {
    atom.workspace.open((await new _editor2.default()));
  }
  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  serialize() {
    return {
      deserializer: _base.DESERIALIZER,
      state: {} // this.state.serialize()
    };
  }

  async deserialize(serialization) {
    console.log('state', serialization);

    await this.orchestrator(serialization);
  }
}
exports.default = ProjectViewerPlus;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiY29uZmlnIiwiQ29uZmlnIiwiYWN0aXZhdGUiLCJzZXJpYWxpemF0aW9uIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwic3RhdGUiLCJTdGF0ZSIsImZpbGVDb250ZW50IiwiRmlsZUNvbnRlbnQiLCJnaXRIdWIiLCJHaXRIdWIiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsImRlc2VyaWFsaXplciIsIkRFU0VSSUFMSVpFUiIsIkVycm9yIiwiYXRvbSIsImRlc2VyaWFsaXplcnMiLCJkZXNlcmlhbGl6ZSIsImUiLCJwYWNrYWdlcyIsImluaXRpYWxQYWNrYWdlc0FjdGl2YXRlZCIsIm9yY2hlc3RyYXRvciIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJjaGVja0RlcGVuZGVuY2llcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImFkZFRvRG9jayIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRDb250YWluZXIiLCJhY3RpdmF0ZUl0ZW0iLCJnZXQiLCJhY3RpdmF0ZVBhbmUiLCJsb2NhdGlvbiIsImhhbmRsZUV2ZW50cyIsImluaXRpYWxpemVDb250ZW50IiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInJlYWRGaWxlIiwib25EaWRGaWxlQ29udGVudENoYW5nZSIsImNvbnRlbnQiLCJvbkRpZFVwZGF0ZUNvbnRlbnQiLCJtYWluQ29udGFpbmVyIiwiaGFuZGxlVXBkYXRlIiwic2V0SXRlbXMiLCJvbkRpZFNlbGVjdEl0ZW0iLCJpdGVtIiwic3dpdGNoQ29udGV4dCIsIm9uRGlkU2VsZWN0UHJvamVjdCIsInByb2plY3QiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImNsZWFyIiwiZGVzdHJveSIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZ2V0TGVmdERvY2siLCJvbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtIiwiaGFuZGxlUG9zaXRpb25DaGFuZ2UiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsInBvc2l0aW9uIiwic2V0IiwiTWFpbkNvbnRhaW5lciIsInNob3ciLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztJQUFZQSxZOztBQUNaOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1DLGlCQUFOLENBQXdCO0FBQ3JDOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBT0MsZ0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsV0FBVUMsYUFBVixFQUF5QjtBQUN2QixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlDLGVBQUosRUFBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMscUJBQUosRUFBbkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosRUFBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBSUMseUJBQUosRUFBdkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQUlDLG9CQUFKLEVBQWxCOztBQUVBLFFBQUk7QUFDRixVQUFJLENBQUNaLGFBQUQsSUFBa0JBLGNBQWNhLFlBQWQsS0FBK0JDLGtCQUFyRCxFQUFtRTtBQUNqRSxjQUFNQyxPQUFOO0FBQ0Q7QUFDREMsV0FBS0MsYUFBTCxDQUFtQkMsV0FBbkIsQ0FBK0JsQixhQUEv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QUNEO0FBbk9vQztrQkFBbEJKLGlCIiwiZmlsZSI6InByb2plY3Qtdmlld2VyLXBsdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUsIERFU0VSSUFMSVpFUiB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IEZpbGVDb250ZW50IGZyb20gJy4vc2VydmljZXMvZmlsZS1jb250ZW50JztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBHaXRIdWIgZnJvbSAnLi9zZXJ2aWNlcy9naXRodWInO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL2VkaXRvcic7XG5cbi8qKlxuICogVGhlIGNvcmUgb2YgUHJvamVjdCBWaWV3ZXIgUGx1cyBQYWNrYWdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NlcmlhbGl6YXRpb25dIC0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgKi9cbiAgYWN0aXZhdGUgKHNlcmlhbGl6YXRpb24pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgdGhpcy5maWxlQ29udGVudCA9IG5ldyBGaWxlQ29udGVudCgpO1xuICAgIHRoaXMuZ2l0SHViID0gbmV3IEdpdEh1YigpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFzZXJpYWxpemF0aW9uIHx8IHNlcmlhbGl6YXRpb24uZGVzZXJpYWxpemVyICE9PSBERVNFUklBTElaRVIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIGF0b20uZGVzZXJpYWxpemVycy5kZXNlcmlhbGl6ZShzZXJpYWxpemF0aW9uKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChhdG9tLnBhY2thZ2VzLmluaXRpYWxQYWNrYWdlc0FjdGl2YXRlZCkge1xuICAgICAgICB0aGlzLm9yY2hlc3RyYXRvcihzZXJpYWxpemF0aW9uKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoKCkgPT5cbiAgICAgICAgICB0aGlzLm9yY2hlc3RyYXRvcihzZXJpYWxpemF0aW9uKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBydW5uaW5nIGluIHByb2R1Y3Rpb24sIGl0IHdpbGwgdmFsaWRhdGUgYW5kIGFzayB0aGUgdXNlclxuICAgKiB0byBpbnN0YWxsIGBmaWxlLWljb25zYCBwYWNrYWdlLlxuICAgKi9cbiAgY2hlY2tEZXBlbmRlbmNpZXMgKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgdGhlIHByb2plY3Qtdmlld2VyIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBkb2NrLlxuICAgKiBAdG9kbyBhZGQgYWx0ZXJuYXRpdmUgYXMgYSBwYW5lbCAoc2V0dGluZ3MpXG4gICAqL1xuICBhc3luYyBhZGRUb0RvY2sgKCkge1xuICAgIGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgdGhpcy5nZXRDb250YWluZXIoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApLFxuICAgICAgbG9jYXRpb246IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb250ZW50IHJlY2VpdmVycyBvZiB0aGUgcGFja2FnZVxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZUNvbnRlbnQgKCkge1xuICAgIGF3YWl0IHRoaXMuZmlsZUNvbnRlbnQuaW5pdGlhbGl6ZSgpO1xuICAgIGF3YWl0IHRoaXMuc3RhdGUudXBkYXRlKGF3YWl0IHRoaXMuZmlsZUNvbnRlbnQucmVhZEZpbGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogb3JjaGVzdHJhdGVzIGFsbCBuZWNlc3NhcnkgY29udGVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXphdGlvbiAtIGEgc2VyaWFsaXplZCBjb250ZW50XG4gICAqL1xuICBhc3luYyBvcmNoZXN0cmF0b3IgKHNlcmlhbGl6YXRpb24gPSB7fSkge1xuICAgIGF3YWl0IHRoaXMuY2hlY2tEZXBlbmRlbmNpZXMoKTtcbiAgICBhd2FpdCB0aGlzLmFkZFRvRG9jaygpO1xuXG4gICAgdGhpcy5maWxlQ29udGVudC5vbkRpZEZpbGVDb250ZW50Q2hhbmdlKGFzeW5jIGNvbnRlbnQgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5zdGF0ZS51cGRhdGUoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlLm9uRGlkVXBkYXRlQ29udGVudChjb250ZW50ID0+IHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5oYW5kbGVVcGRhdGUoY29udGVudCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXMoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdExpc3Qub25EaWRTZWxlY3RJdGVtKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5jb250ZXh0U3dpdGNoZXIuc3dpdGNoQ29udGV4dChpdGVtKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFpbkNvbnRhaW5lci5vbkRpZFNlbGVjdFByb2plY3QocHJvamVjdCA9PiB7XG4gICAgICB0aGlzLmNvbnRleHRTd2l0Y2hlci5zd2l0Y2hDb250ZXh0KHByb2plY3QpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5pbml0aWFsaXplQ29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLnN0YXRlLmNsZWFyKCk7XG4gICAgdGhpcy5maWxlQ29udGVudC5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveSgpO1xuICAgICAgZGVsZXRlIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1kYXRhYmFzZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsZUNvbnRlbnQub3BlbkZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXNlbGVjdC1saXN0JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMubWFpbkNvbnRhaW5lci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS11cCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlXG4gICAgICAgIC5nZXRMZWZ0RG9jaygpXG4gICAgICAgIC5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdsZWZ0JywgaXRlbSlcbiAgICAgICAgKSxcbiAgICAgIGF0b20ud29ya3NwYWNlXG4gICAgICAgIC5nZXRSaWdodERvY2soKVxuICAgICAgICAub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+XG4gICAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvbkNoYW5nZSgncmlnaHQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1haW5Db250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB3YXRjaGVyIGZ1bmN0aW9uIHRvIGRldGVjdCB0aGUgbW92ZW1lbnQgb2YgdGhlIGRvY2sncyBwYW5lIGl0ZW1cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gdGhlIG5leHQgZG9jayBwb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIHRoZSBhY3RpdmUgcGFuZSBpdGVtXG4gICAqL1xuICBhc3luYyBoYW5kbGVQb3NpdGlvbkNoYW5nZSAocG9zaXRpb24sIGl0ZW0pIHtcbiAgICBpZiAoIWF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5zYXZlQ2hhbmdlc2ApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpdGVtID09PSAoYXdhaXQgdGhpcy5nZXRDb250YWluZXIoKSkpIHtcbiAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsIHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUHJvamVjdCBWaWV3ZXIgUGx1cyBjb250YWluZXIgaWYgYWxyZWFkeSBjcmVhdGVkIG9yIGNyZWF0ZXMgYSBuZXcuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZS5cbiAgICovXG4gIGFzeW5jIGdldENvbnRhaW5lciAoKSB7XG4gICAgaWYgKCF0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm1haW5Db250YWluZXI7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciB0byBzaG93IHRoZSBTZWxlY3QgTGlzdCB2aWV3LlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIG9wZW4gdGhlIEVkaXRvciB2aWV3LlxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKCkpO1xuICB9XG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2VyaWFsaXplcjogREVTRVJJQUxJWkVSLFxuICAgICAgc3RhdGU6IHt9IC8vIHRoaXMuc3RhdGUuc2VyaWFsaXplKClcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgZGVzZXJpYWxpemUgKHNlcmlhbGl6YXRpb24pIHtcbiAgICBjb25zb2xlLmxvZygnc3RhdGUnLCBzZXJpYWxpemF0aW9uKTtcblxuICAgIGF3YWl0IHRoaXMub3JjaGVzdHJhdG9yKHNlcmlhbGl6YXRpb24pO1xuICB9XG59XG4iXX0=