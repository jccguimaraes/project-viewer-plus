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

  /**
   * Atom's internal deserialization method.
   * @param {Object} [serialization] - serialized state
   */
  async deserialize(serialization) {
    console.log('state', serialization);

    await this.orchestrator(serialization);
  }
}
exports.default = ProjectViewerPlus;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wcm9qZWN0LXZpZXdlci1wbHVzLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiY29uZmlnIiwiQ29uZmlnIiwiYWN0aXZhdGUiLCJzZXJpYWxpemF0aW9uIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwic3RhdGUiLCJTdGF0ZSIsImZpbGVDb250ZW50IiwiRmlsZUNvbnRlbnQiLCJnaXRIdWIiLCJHaXRIdWIiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsImRlc2VyaWFsaXplciIsIkRFU0VSSUFMSVpFUiIsIkVycm9yIiwiYXRvbSIsImRlc2VyaWFsaXplcnMiLCJkZXNlcmlhbGl6ZSIsImUiLCJwYWNrYWdlcyIsImluaXRpYWxQYWNrYWdlc0FjdGl2YXRlZCIsIm9yY2hlc3RyYXRvciIsIm9uRGlkQWN0aXZhdGVJbml0aWFsUGFja2FnZXMiLCJjaGVja0RlcGVuZGVuY2llcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImFkZFRvRG9jayIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRDb250YWluZXIiLCJhY3RpdmF0ZUl0ZW0iLCJnZXQiLCJhY3RpdmF0ZVBhbmUiLCJsb2NhdGlvbiIsImhhbmRsZUV2ZW50cyIsImluaXRpYWxpemVDb250ZW50IiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInJlYWRGaWxlIiwib25EaWRGaWxlQ29udGVudENoYW5nZSIsImNvbnRlbnQiLCJvbkRpZFVwZGF0ZUNvbnRlbnQiLCJtYWluQ29udGFpbmVyIiwiaGFuZGxlVXBkYXRlIiwic2V0SXRlbXMiLCJvbkRpZFNlbGVjdEl0ZW0iLCJpdGVtIiwic3dpdGNoQ29udGV4dCIsIm9uRGlkU2VsZWN0UHJvamVjdCIsInByb2plY3QiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImNsZWFyIiwiZGVzdHJveSIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZ2V0TGVmdERvY2siLCJvbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtIiwiaGFuZGxlUG9zaXRpb25DaGFuZ2UiLCJnZXRSaWdodERvY2siLCJvbkRpZENoYW5nZSIsInBvc2l0aW9uIiwic2V0IiwiTWFpbkNvbnRhaW5lciIsInNob3ciLCJFZGl0b3JDb250YWluZXIiLCJzZXJpYWxpemUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOztJQUFZQSxZOztBQUNaOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1DLGlCQUFOLENBQXdCO0FBQ3JDOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBT0MsZ0JBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsV0FBVUMsYUFBVixFQUF5QjtBQUN2QixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlDLGVBQUosRUFBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMscUJBQUosRUFBbkI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosRUFBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBSUMseUJBQUosRUFBdkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQUlDLG9CQUFKLEVBQWxCOztBQUVBLFFBQUk7QUFDRixVQUFJLENBQUNaLGFBQUQsSUFBa0JBLGNBQWNhLFlBQWQsS0FBK0JDLGtCQUFyRCxFQUFtRTtBQUNqRSxjQUFNQyxPQUFOO0FBQ0Q7QUFDREMsV0FBS0MsYUFBTCxDQUFtQkMsV0FBbkIsQ0FBK0JsQixhQUEv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QixDQUFOO0FBQ0Q7QUF2T29DO2tCQUFsQkosaUIiLCJmaWxlIjoicHJvamVjdC12aWV3ZXItcGx1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCAqIGFzIGRlcGVuZGVuY2llcyBmcm9tICdhdG9tLXBhY2thZ2UtZGVwcyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSwgREVTRVJJQUxJWkVSIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgRmlsZUNvbnRlbnQgZnJvbSAnLi9zZXJ2aWNlcy9maWxlLWNvbnRlbnQnO1xuaW1wb3J0IENvbnRleHRTd2l0Y2hlciBmcm9tICcuL3NlcnZpY2VzL2NvbnRleHQtc3dpdGNoZXInO1xuaW1wb3J0IEdpdEh1YiBmcm9tICcuL3NlcnZpY2VzL2dpdGh1Yic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvZWRpdG9yJztcblxuLyoqXG4gKiBUaGUgY29yZSBvZiBQcm9qZWN0IFZpZXdlciBQbHVzIFBhY2thZ2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdFZpZXdlclBsdXMge1xuICAvKipcbiAgICogUmV0dXJucyB0aGlzIHBhY2thZ2UgY29uZmlndXJhdGlvbiBvYmplY3Qgc3BlY2lmaWMgdG8gQXRvbVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBhY3RpdmF0aW5nIHRoZSBwYWNrYWdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc2VyaWFsaXphdGlvbl0gLSBzZXJpYWxpemVkIHN0YXRlXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAqL1xuICBhY3RpdmF0ZSAoc2VyaWFsaXphdGlvbikge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuc3RhdGUgPSBuZXcgU3RhdGUoKTtcbiAgICB0aGlzLmZpbGVDb250ZW50ID0gbmV3IEZpbGVDb250ZW50KCk7XG4gICAgdGhpcy5naXRIdWIgPSBuZXcgR2l0SHViKCk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIXNlcmlhbGl6YXRpb24gfHwgc2VyaWFsaXphdGlvbi5kZXNlcmlhbGl6ZXIgIT09IERFU0VSSUFMSVpFUikge1xuICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgfVxuICAgICAgYXRvbS5kZXNlcmlhbGl6ZXJzLmRlc2VyaWFsaXplKHNlcmlhbGl6YXRpb24pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgaWYgKGF0b20ucGFja2FnZXMuaW5pdGlhbFBhY2thZ2VzQWN0aXZhdGVkKSB7XG4gICAgICAgIHRoaXMub3JjaGVzdHJhdG9yKHNlcmlhbGl6YXRpb24pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZUluaXRpYWxQYWNrYWdlcygoKSA9PlxuICAgICAgICAgIHRoaXMub3JjaGVzdHJhdG9yKHNlcmlhbGl6YXRpb24pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHJ1bm5pbmcgaW4gcHJvZHVjdGlvbiwgaXQgd2lsbCB2YWxpZGF0ZSBhbmQgYXNrIHRoZSB1c2VyXG4gICAqIHRvIGluc3RhbGwgYGZpbGUtaWNvbnNgIHBhY2thZ2UuXG4gICAqL1xuICBjaGVja0RlcGVuZGVuY2llcyAoKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkcyB0aGUgcHJvamVjdC12aWV3ZXIgaXRlbSB0byB0aGUgc3BlY2lmaWVkIGRvY2suXG4gICAqIEB0b2RvIGFkZCBhbHRlcm5hdGl2ZSBhcyBhIHBhbmVsIChzZXR0aW5ncylcbiAgICovXG4gIGFzeW5jIGFkZFRvRG9jayAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCB0aGlzLmdldENvbnRhaW5lcigpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbnRlbnQgcmVjZWl2ZXJzIG9mIHRoZSBwYWNrYWdlXG4gICAqL1xuICBhc3luYyBpbml0aWFsaXplQ29udGVudCAoKSB7XG4gICAgYXdhaXQgdGhpcy5maWxlQ29udGVudC5pbml0aWFsaXplKCk7XG4gICAgYXdhaXQgdGhpcy5zdGF0ZS51cGRhdGUoYXdhaXQgdGhpcy5maWxlQ29udGVudC5yZWFkRmlsZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvcmNoZXN0cmF0ZXMgYWxsIG5lY2Vzc2FyeSBjb250ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXJpYWxpemF0aW9uIC0gYSBzZXJpYWxpemVkIGNvbnRlbnRcbiAgICovXG4gIGFzeW5jIG9yY2hlc3RyYXRvciAoc2VyaWFsaXphdGlvbiA9IHt9KSB7XG4gICAgYXdhaXQgdGhpcy5jaGVja0RlcGVuZGVuY2llcygpO1xuICAgIGF3YWl0IHRoaXMuYWRkVG9Eb2NrKCk7XG5cbiAgICB0aGlzLmZpbGVDb250ZW50Lm9uRGlkRmlsZUNvbnRlbnRDaGFuZ2UoYXN5bmMgY29udGVudCA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnN0YXRlLnVwZGF0ZShjb250ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUub25EaWRVcGRhdGVDb250ZW50KGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyLmhhbmRsZVVwZGF0ZShjb250ZW50KTtcbiAgICAgIHRoaXMuc2VsZWN0TGlzdC5zZXRJdGVtcyhjb250ZW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMuc2VsZWN0TGlzdC5vbkRpZFNlbGVjdEl0ZW0oaXRlbSA9PiB7XG4gICAgICB0aGlzLmNvbnRleHRTd2l0Y2hlci5zd2l0Y2hDb250ZXh0KGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYWluQ29udGFpbmVyLm9uRGlkU2VsZWN0UHJvamVjdChwcm9qZWN0ID0+IHtcbiAgICAgIHRoaXMuY29udGV4dFN3aXRjaGVyLnN3aXRjaENvbnRleHQocHJvamVjdCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuc3RhdGUuY2xlYXIoKTtcbiAgICB0aGlzLmZpbGVDb250ZW50LmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLm1haW5Db250YWluZXIpIHtcbiAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICBkZWxldGUgdGhpcy5tYWluQ29udGFpbmVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWRhdGFiYXNlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5maWxlQ29udGVudC5vcGVuRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tYWluQ29udGFpbmVyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5tYWluQ29udGFpbmVyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLXVwJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgLmdldExlZnREb2NrKClcbiAgICAgICAgLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oaXRlbSA9PlxuICAgICAgICAgIHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ2xlZnQnLCBpdGVtKVxuICAgICAgICApLFxuICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgLmdldFJpZ2h0RG9jaygpXG4gICAgICAgIC5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKGl0ZW0gPT5cbiAgICAgICAgICB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdyaWdodCcsIGl0ZW0pXG4gICAgICAgICksXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgICAgIHRoaXMubWFpbkNvbnRhaW5lci5kZXN0cm95KCk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFRvRG9jaygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHdhdGNoZXIgZnVuY3Rpb24gdG8gZGV0ZWN0IHRoZSBtb3ZlbWVudCBvZiB0aGUgZG9jaydzIHBhbmUgaXRlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gLSB0aGUgbmV4dCBkb2NrIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gdGhlIGFjdGl2ZSBwYW5lIGl0ZW1cbiAgICovXG4gIGFzeW5jIGhhbmRsZVBvc2l0aW9uQ2hhbmdlIChwb3NpdGlvbiwgaXRlbSkge1xuICAgIGlmICghYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnNhdmVDaGFuZ2VzYCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGl0ZW0gPT09IChhd2FpdCB0aGlzLmdldENvbnRhaW5lcigpKSkge1xuICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgcG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBQcm9qZWN0IFZpZXdlciBQbHVzIGNvbnRhaW5lciBpZiBhbHJlYWR5IGNyZWF0ZWQgb3IgY3JlYXRlcyBhIG5ldy5cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0Q29udGFpbmVyICgpIHtcbiAgICBpZiAoIXRoaXMubWFpbkNvbnRhaW5lcikge1xuICAgICAgdGhpcy5tYWluQ29udGFpbmVyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubWFpbkNvbnRhaW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIHRvIHNob3cgdGhlIFNlbGVjdCBMaXN0IHZpZXcuXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgdG8gb3BlbiB0aGUgRWRpdG9yIHZpZXcuXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoKSk7XG4gIH1cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVzZXJpYWxpemVyOiBERVNFUklBTElaRVIsXG4gICAgICBzdGF0ZToge30gLy8gdGhpcy5zdGF0ZS5zZXJpYWxpemUoKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIGRlc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc2VyaWFsaXphdGlvbl0gLSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBhc3luYyBkZXNlcmlhbGl6ZSAoc2VyaWFsaXphdGlvbikge1xuICAgIGNvbnNvbGUubG9nKCdzdGF0ZScsIHNlcmlhbGl6YXRpb24pO1xuXG4gICAgYXdhaXQgdGhpcy5vcmNoZXN0cmF0b3Ioc2VyaWFsaXphdGlvbik7XG4gIH1cbn1cbiJdfQ==