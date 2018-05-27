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
 * Class representing the Project Viewer Package
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
   */
  async activate(serialization) {
    this.disposables = new _atom.CompositeDisposable();
    this.state = new _state2.default();
    this.fileContent = new _fileContent2.default();
    this.gitHub = new _github2.default();
    this.contextSwitcher = new _contextSwitcher2.default();
    this.selectList = new _selectList2.default();

    if (atom.packages.initialPackagesActivated) {
      this.orchestrator(serialization);
    } else {
      atom.packages.onDidActivateInitialPackages(() => this.orchestrator(serialization));
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
    await atom.workspace.open((await this.getInstance()), {
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
   * @private
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
   * @todo missing description
   * @param {string} position - dock emitter position
   * @param {Object} item - the active pane item
   */
  async handlePositionChange(position, item) {
    if (!atom.config.get(`${_base.PLUGIN_NAME}.dock.saveChanges`)) {
      return;
    }
    if (item === (await this.getInstance())) {
      atom.config.set(`${_base.PLUGIN_NAME}.dock.position`, position);
    }
  }

  /**
   * Gets the Project Viewer Container if already created or creates a new.
   * @returns {Object} the Project Viewer instance.
   */
  async getInstance() {
    if (!this.mainContainer) {
      this.mainContainer = new _main2.default();
    }
    return this.mainContainer;
  }

  /**
   *
   */
  toggleSelectList() {
    this.selectList.show();
  }

  /**
   *
   */
  async openEditor() {
    atom.workspace.open((await new _editor2.default()));
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  // serialize () {
  //   return {
  //     deserializer: DESERIALIZER,
  //     state: this.state.serialize()
  //   };
  // }
}
exports.default = ProjectViewerPlus;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiY29uZmlnIiwiQ29uZmlnIiwiYWN0aXZhdGUiLCJzZXJpYWxpemF0aW9uIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwic3RhdGUiLCJTdGF0ZSIsImZpbGVDb250ZW50IiwiRmlsZUNvbnRlbnQiLCJnaXRIdWIiLCJHaXRIdWIiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsImF0b20iLCJwYWNrYWdlcyIsImluaXRpYWxQYWNrYWdlc0FjdGl2YXRlZCIsIm9yY2hlc3RyYXRvciIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJjaGVja0RlcGVuZGVuY2llcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImFkZFRvRG9jayIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRJbnN0YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImxvY2F0aW9uIiwiaGFuZGxlRXZlbnRzIiwiaW5pdGlhbGl6ZUNvbnRlbnQiLCJpbml0aWFsaXplIiwidXBkYXRlIiwicmVhZEZpbGUiLCJvbkRpZEZpbGVDb250ZW50Q2hhbmdlIiwiY29udGVudCIsIm9uRGlkVXBkYXRlQ29udGVudCIsIm1haW5Db250YWluZXIiLCJoYW5kbGVVcGRhdGUiLCJzZXRJdGVtcyIsIm9uRGlkU2VsZWN0SXRlbSIsIml0ZW0iLCJzd2l0Y2hDb250ZXh0Iiwib25EaWRTZWxlY3RQcm9qZWN0IiwicHJvamVjdCIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiY2xlYXIiLCJkZXN0cm95IiwiYWRkIiwiY29tbWFuZHMiLCJvcGVuRmlsZSIsIm9wZW5FZGl0b3IiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJ0b2dnbGVTZWxlY3RMaXN0IiwiZWxlbWVudCIsImNvbnNvbGUiLCJsb2ciLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJoYW5kbGVQb3NpdGlvbkNoYW5nZSIsImdldFJpZ2h0RG9jayIsIm9uRGlkQ2hhbmdlIiwicG9zaXRpb24iLCJzZXQiLCJNYWluQ29udGFpbmVyIiwic2hvdyIsIkVkaXRvckNvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLFk7O0FBQ1o7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUMsaUJBQU4sQ0FBd0I7QUFDckM7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxnQkFBUDtBQUNEOztBQUVEOzs7O0FBSUEsUUFBTUMsUUFBTixDQUFnQkMsYUFBaEIsRUFBK0I7QUFDN0IsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxlQUFKLEVBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHFCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlDLGdCQUFKLEVBQWQ7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLElBQUlDLHlCQUFKLEVBQXZCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFJQyxvQkFBSixFQUFsQjs7QUFFQSxRQUFJQyxLQUFLQyxRQUFMLENBQWNDLHdCQUFsQixFQUE0QztBQUMxQyxXQUFLQyxZQUFMLENBQWtCaEIsYUFBbEI7QUFDRCxLQUZELE1BR0s7QUFDSGEsV0FBS0MsUUFBTCxDQUFjRyw0QkFBZCxDQUEyQyxNQUN6QyxLQUFLRCxZQUFMLENBQWtCaEIsYUFBbEIsQ0FERjtBQUdEO0FBQ0Y7O0FBRUQ7Ozs7QUFJQWtCLHNCQUFxQjtBQUNuQixRQUFJQyxRQUFR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QUwsRUFBeUQ7QUFDdkQ7QUFDRDtBQUNELFFBQUlxQixVQUFVLE1BQU0sS0FBS2pCLFdBQUwsRUFBaEIsQ0FBSixFQUF5QztBQUN2Q2QsV0FBS2hCLE1BQUwsQ0FBWXVFLEdBQVosQ0FBaUIsR0FBRTdDLGlCQUFZLGdCQUEvQixFQUFnRDRDLFFBQWhEO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBLFFBQU14QyxXQUFOLEdBQXFCO0FBQ25CLFFBQUksQ0FBQyxLQUFLYSxhQUFWLEVBQXlCO0FBQ3ZCLFdBQUtBLGFBQUwsR0FBcUIsSUFBSTZCLGNBQUosRUFBckI7QUFDRDtBQUNELFdBQU8sS0FBSzdCLGFBQVo7QUFDRDs7QUFFRDs7O0FBR0FrQixxQkFBb0I7QUFDbEIsU0FBSy9DLFVBQUwsQ0FBZ0IyRCxJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNZixVQUFOLEdBQW9CO0FBQ2xCMUMsU0FBS1ksU0FBTCxDQUFlQyxJQUFmLEVBQW9CLE1BQU0sSUFBSTZDLGdCQUFKLEVBQTFCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF0TnFDO2tCQUFsQjNFLGlCIiwiZmlsZSI6InByb2plY3Qtdmlld2VyLXBsdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUsIERFU0VSSUFMSVpFUiB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IEZpbGVDb250ZW50IGZyb20gJy4vc2VydmljZXMvZmlsZS1jb250ZW50JztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBHaXRIdWIgZnJvbSAnLi9zZXJ2aWNlcy9naXRodWInO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL2VkaXRvcic7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NlcmlhbGl6YXRpb25dIC0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHNlcmlhbGl6YXRpb24pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgdGhpcy5maWxlQ29udGVudCA9IG5ldyBGaWxlQ29udGVudCgpO1xuICAgIHRoaXMuZ2l0SHViID0gbmV3IEdpdEh1YigpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICBpZiAoYXRvbS5wYWNrYWdlcy5pbml0aWFsUGFja2FnZXNBY3RpdmF0ZWQpIHtcbiAgICAgIHRoaXMub3JjaGVzdHJhdG9yKHNlcmlhbGl6YXRpb24pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PlxuICAgICAgICB0aGlzLm9yY2hlc3RyYXRvcihzZXJpYWxpemF0aW9uKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSWYgcnVubmluZyBpbiBwcm9kdWN0aW9uLCBpdCB3aWxsIHZhbGlkYXRlIGFuZCBhc2sgdGhlIHVzZXJcbiAgICogdG8gaW5zdGFsbCBgZmlsZS1pY29uc2AgcGFja2FnZS5cbiAgICovXG4gIGNoZWNrRGVwZW5kZW5jaWVzICgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgZGVwZW5kZW5jaWVzLmluc3RhbGwoUExVR0lOX05BTUUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIHRoZSBwcm9qZWN0LXZpZXdlciBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgZG9jay5cbiAgICogQHRvZG8gYWRkIGFsdGVybmF0aXZlIGFzIGEgcGFuZWwgKHNldHRpbmdzKVxuICAgKi9cbiAgYXN5bmMgYWRkVG9Eb2NrICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IHRoaXMuZ2V0SW5zdGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApLFxuICAgICAgbG9jYXRpb246IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb250ZW50IHJlY2VpdmVycyBvZiB0aGUgcGFja2FnZVxuICAgKi9cbiAgYXN5bmMgaW5pdGlhbGl6ZUNvbnRlbnQgKCkge1xuICAgIGF3YWl0IHRoaXMuZmlsZUNvbnRlbnQuaW5pdGlhbGl6ZSgpO1xuICAgIGF3YWl0IHRoaXMuc3RhdGUudXBkYXRlKGF3YWl0IHRoaXMuZmlsZUNvbnRlbnQucmVhZEZpbGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogb3JjaGVzdHJhdGVzIGFsbCBuZWNlc3NhcnkgY29udGVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXphdGlvbiAtIGEgc2VyaWFsaXplZCBjb250ZW50XG4gICAqL1xuICBhc3luYyBvcmNoZXN0cmF0b3IgKHNlcmlhbGl6YXRpb24gPSB7fSkge1xuICAgIGF3YWl0IHRoaXMuY2hlY2tEZXBlbmRlbmNpZXMoKTtcbiAgICBhd2FpdCB0aGlzLmFkZFRvRG9jaygpO1xuXG4gICAgdGhpcy5maWxlQ29udGVudC5vbkRpZEZpbGVDb250ZW50Q2hhbmdlKGFzeW5jIGNvbnRlbnQgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5zdGF0ZS51cGRhdGUoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnN0YXRlLm9uRGlkVXBkYXRlQ29udGVudChjb250ZW50ID0+IHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5oYW5kbGVVcGRhdGUoY29udGVudCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXMoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNlbGVjdExpc3Qub25EaWRTZWxlY3RJdGVtKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5jb250ZXh0U3dpdGNoZXIuc3dpdGNoQ29udGV4dChpdGVtKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFpbkNvbnRhaW5lci5vbkRpZFNlbGVjdFByb2plY3QocHJvamVjdCA9PiB7XG4gICAgICB0aGlzLmNvbnRleHRTd2l0Y2hlci5zd2l0Y2hDb250ZXh0KHByb2plY3QpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5pbml0aWFsaXplQ29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLnN0YXRlLmNsZWFyKCk7XG4gICAgdGhpcy5maWxlQ29udGVudC5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveSgpO1xuICAgICAgZGVsZXRlIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1kYXRhYmFzZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZmlsZUNvbnRlbnQub3BlbkZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIudG9nZ2xlRm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXNlbGVjdC1saXN0JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMubWFpbkNvbnRhaW5lci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS11cCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlXG4gICAgICAgIC5nZXRMZWZ0RG9jaygpXG4gICAgICAgIC5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdsZWZ0JywgaXRlbSlcbiAgICAgICAgKSxcbiAgICAgIGF0b20ud29ya3NwYWNlXG4gICAgICAgIC5nZXRSaWdodERvY2soKVxuICAgICAgICAub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShpdGVtID0+XG4gICAgICAgICAgdGhpcy5oYW5kbGVQb3NpdGlvbkNoYW5nZSgncmlnaHQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgICAgICB0aGlzLm1haW5Db250YWluZXIuZGVzdHJveSgpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLm1haW5Db250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdG9kbyBtaXNzaW5nIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIGRvY2sgZW1pdHRlciBwb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIHRoZSBhY3RpdmUgcGFuZSBpdGVtXG4gICAqL1xuICBhc3luYyBoYW5kbGVQb3NpdGlvbkNoYW5nZSAocG9zaXRpb24sIGl0ZW0pIHtcbiAgICBpZiAoIWF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5zYXZlQ2hhbmdlc2ApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpdGVtID09PSAoYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpKSkge1xuICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgcG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBQcm9qZWN0IFZpZXdlciBDb250YWluZXIgaWYgYWxyZWFkeSBjcmVhdGVkIG9yIGNyZWF0ZXMgYSBuZXcuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZS5cbiAgICovXG4gIGFzeW5jIGdldEluc3RhbmNlICgpIHtcbiAgICBpZiAoIXRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgLy8gc2VyaWFsaXplICgpIHtcbiAgLy8gICByZXR1cm4ge1xuICAvLyAgICAgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsXG4gIC8vICAgICBzdGF0ZTogdGhpcy5zdGF0ZS5zZXJpYWxpemUoKVxuICAvLyAgIH07XG4gIC8vIH1cbn1cbiJdfQ==