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

    atom.packages.onDidActivateInitialPackages(() => this.orchestrator(serialization));
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
      console.log(project);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiY29uZmlnIiwiQ29uZmlnIiwiYWN0aXZhdGUiLCJzZXJpYWxpemF0aW9uIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwic3RhdGUiLCJTdGF0ZSIsImZpbGVDb250ZW50IiwiRmlsZUNvbnRlbnQiLCJnaXRIdWIiLCJHaXRIdWIiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsImF0b20iLCJwYWNrYWdlcyIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJvcmNoZXN0cmF0b3IiLCJjaGVja0RlcGVuZGVuY2llcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImFkZFRvRG9jayIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRJbnN0YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImxvY2F0aW9uIiwiaGFuZGxlRXZlbnRzIiwiaW5pdGlhbGl6ZUNvbnRlbnQiLCJpbml0aWFsaXplIiwidXBkYXRlIiwicmVhZEZpbGUiLCJvbkRpZEZpbGVDb250ZW50Q2hhbmdlIiwiY29udGVudCIsIm9uRGlkVXBkYXRlQ29udGVudCIsIm1haW5Db250YWluZXIiLCJoYW5kbGVVcGRhdGUiLCJzZXRJdGVtcyIsIm9uRGlkU2VsZWN0SXRlbSIsIml0ZW0iLCJzd2l0Y2hDb250ZXh0Iiwib25EaWRTZWxlY3RQcm9qZWN0IiwicHJvamVjdCIsImNvbnNvbGUiLCJsb2ciLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImNsZWFyIiwiZGVzdHJveSIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJoYW5kbGVQb3NpdGlvbkNoYW5nZSIsImdldFJpZ2h0RG9jayIsIm9uRGlkQ2hhbmdlIiwicG9zaXRpb24iLCJzZXQiLCJNYWluQ29udGFpbmVyIiwic2hvdyIsIkVkaXRvckNvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLFk7O0FBQ1o7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUMsaUJBQU4sQ0FBd0I7QUFDckM7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPQyxnQkFBUDtBQUNEOztBQUVEOzs7O0FBSUEsUUFBTUMsUUFBTixDQUFnQkMsYUFBaEIsRUFBK0I7QUFDN0IsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxlQUFKLEVBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHFCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlDLGdCQUFKLEVBQWQ7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLElBQUlDLHlCQUFKLEVBQXZCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFJQyxvQkFBSixFQUFsQjs7QUFFQUMsU0FBS0MsUUFBTCxDQUFjQyw0QkFBZCxDQUEyQyxNQUN6QyxLQUFLQyxZQUFMLENBQWtCaEIsYUFBbEIsQ0FERjtBQUdEOztBQUVEOzs7O0FBSUFpQixzQkFBcUI7QUFDbkIsUUFBSUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDekIsbUJBQWEwQixPQUFiLENBQXFCQyxpQkFBckI7QUFDRDtBQUNGOztBQUVEOzs7O0FBSUEsUUFBTUMsU0FBTixHQUFtQjtBQUNqQixV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LFFBQWhEO0FBQ0Q7QUFDRjs7QUFFRDs7OztBQUlBLFFBQU14QyxXQUFOLEdBQXFCO0FBQ25CLFFBQUksQ0FBQyxLQUFLYSxhQUFWLEVBQXlCO0FBQ3ZCLFdBQUtBLGFBQUwsR0FBcUIsSUFBSTZCLGNBQUosRUFBckI7QUFDRDtBQUNELFdBQU8sS0FBSzdCLGFBQVo7QUFDRDs7QUFFRDs7O0FBR0FvQixxQkFBb0I7QUFDbEIsU0FBS2hELFVBQUwsQ0FBZ0IwRCxJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNYixVQUFOLEdBQW9CO0FBQ2xCM0MsU0FBS1csU0FBTCxDQUFlQyxJQUFmLEVBQW9CLE1BQU0sSUFBSTZDLGdCQUFKLEVBQTFCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFuTnFDO2tCQUFsQjFFLGlCIiwiZmlsZSI6InByb2plY3Qtdmlld2VyLXBsdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUsIERFU0VSSUFMSVpFUiB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IEZpbGVDb250ZW50IGZyb20gJy4vc2VydmljZXMvZmlsZS1jb250ZW50JztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBHaXRIdWIgZnJvbSAnLi9zZXJ2aWNlcy9naXRodWInO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL2VkaXRvcic7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcbiAgLyoqXG4gICAqIFJldHVybnMgdGhpcyBwYWNrYWdlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHNwZWNpZmljIHRvIEF0b21cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NlcmlhbGl6YXRpb25dIC0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHNlcmlhbGl6YXRpb24pIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgdGhpcy5maWxlQ29udGVudCA9IG5ldyBGaWxlQ29udGVudCgpO1xuICAgIHRoaXMuZ2l0SHViID0gbmV3IEdpdEh1YigpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMoKCkgPT5cbiAgICAgIHRoaXMub3JjaGVzdHJhdG9yKHNlcmlhbGl6YXRpb24pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBydW5uaW5nIGluIHByb2R1Y3Rpb24sIGl0IHdpbGwgdmFsaWRhdGUgYW5kIGFzayB0aGUgdXNlclxuICAgKiB0byBpbnN0YWxsIGBmaWxlLWljb25zYCBwYWNrYWdlLlxuICAgKi9cbiAgY2hlY2tEZXBlbmRlbmNpZXMgKCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgdGhlIHByb2plY3Qtdmlld2VyIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBkb2NrLlxuICAgKiBAdG9kbyBhZGQgYWx0ZXJuYXRpdmUgYXMgYSBwYW5lbCAoc2V0dGluZ3MpXG4gICAqL1xuICBhc3luYyBhZGRUb0RvY2sgKCkge1xuICAgIGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbnRlbnQgcmVjZWl2ZXJzIG9mIHRoZSBwYWNrYWdlXG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplQ29udGVudCAoKSB7XG4gICAgYXdhaXQgdGhpcy5maWxlQ29udGVudC5pbml0aWFsaXplKCk7XG4gICAgYXdhaXQgdGhpcy5zdGF0ZS51cGRhdGUoXG4gICAgICBhd2FpdCB0aGlzLmZpbGVDb250ZW50LnJlYWRGaWxlKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIG9yY2hlc3RyYXRlcyBhbGwgbmVjZXNzYXJ5IGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6YXRpb24gLSBhIHNlcmlhbGl6ZWQgY29udGVudFxuICAgKi9cbiAgYXN5bmMgb3JjaGVzdHJhdG9yIChzZXJpYWxpemF0aW9uID0ge30pIHtcbiAgICBhd2FpdCB0aGlzLmNoZWNrRGVwZW5kZW5jaWVzKCk7XG4gICAgYXdhaXQgdGhpcy5hZGRUb0RvY2soKTtcblxuICAgIHRoaXMuZmlsZUNvbnRlbnQub25EaWRGaWxlQ29udGVudENoYW5nZShhc3luYyBjb250ZW50ID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuc3RhdGUudXBkYXRlKGNvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZS5vbkRpZFVwZGF0ZUNvbnRlbnQoY29udGVudCA9PiB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIuaGFuZGxlVXBkYXRlKGNvbnRlbnQpO1xuICAgICAgdGhpcy5zZWxlY3RMaXN0LnNldEl0ZW1zKGNvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RMaXN0Lm9uRGlkU2VsZWN0SXRlbShpdGVtID0+IHtcbiAgICAgIHRoaXMuY29udGV4dFN3aXRjaGVyLnN3aXRjaENvbnRleHQoaXRlbSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1haW5Db250YWluZXIub25EaWRTZWxlY3RQcm9qZWN0KHByb2plY3QgPT4ge1xuICAgICAgY29uc29sZS5sb2cocHJvamVjdCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuc3RhdGUuY2xlYXIoKTtcbiAgICB0aGlzLmZpbGVDb250ZW50LmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICBkZWxldGUgdGhpcy5tYWluQ29udGFpbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWRhdGFiYXNlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5maWxlQ29udGVudC5vcGVuRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5tYWluQ29udGFpbmVyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXVwJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgLmdldExlZnREb2NrKClcbiAgICAgICAgLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PlxuICAgICAgICAgIHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ2xlZnQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgLmdldFJpZ2h0RG9jaygpXG4gICAgICAgIC5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdyaWdodCcsIGl0ZW0pXG4gICAgICAgICksXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFRvRG9jaygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvIG1pc3NpbmcgZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gZG9jayBlbWl0dGVyIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gdGhlIGFjdGl2ZSBwYW5lIGl0ZW1cbiAgICovXG4gIGFzeW5jIGhhbmRsZVBvc2l0aW9uQ2hhbmdlIChwb3NpdGlvbiwgaXRlbSkge1xuICAgIGlmICghYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnNhdmVDaGFuZ2VzYCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGl0ZW0gPT09IChhd2FpdCB0aGlzLmdldEluc3RhbmNlKCkpKSB7XG4gICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCBwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIENvbnRhaW5lciBpZiBhbHJlYWR5IGNyZWF0ZWQgb3IgY3JlYXRlcyBhIG5ldy5cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW5zdGFuY2UgKCkge1xuICAgIGlmICghdGhpcy5tYWluQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLm1haW5Db250YWluZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tYWluQ29udGFpbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoKSk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICAvLyBzZXJpYWxpemUgKCkge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBkZXNlcmlhbGl6ZXI6IERFU0VSSUFMSVpFUixcbiAgLy8gICAgIHN0YXRlOiB0aGlzLnN0YXRlLnNlcmlhbGl6ZSgpXG4gIC8vICAgfTtcbiAgLy8gfVxufVxuIl19