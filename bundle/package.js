'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _atomPackageDeps = require('atom-package-deps');

var dependencies = _interopRequireWildcard(_atomPackageDeps);

var _devlog = require('./services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _base = require('./constants/base');

var _config = require('./constants/config');

var _config2 = _interopRequireDefault(_config);

var _database = require('./services/database');

var _database2 = _interopRequireDefault(_database);

var _contextSwitcher = require('./services/context-switcher');

var _contextSwitcher2 = _interopRequireDefault(_contextSwitcher);

var _main = require('./containers/main');

var _main2 = _interopRequireDefault(_main);

var _selectList = require('./containers/select-list');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Class representing the Project Viewer Package
 */
let ProjectViewerPlus = class ProjectViewerPlus {
  /**
   * Atom package lifecycle method for activating the package
   * @param {Object} [state] - description
   */
  activate(state) {
    var _this = this;

    return _asyncToGenerator(function* () {
      (0, _devlog2.default)('activate', state);
      _this.disposables = new _atom.CompositeDisposable();
      _this.database = new _database2.default(state);
      _this.contextSwitcher = new _contextSwitcher2.default();
      _this.selectList = new _selectList2.default();

      _this.database.onDidChange(function () {
        _this.database.setInitialSelectedProject();
        _this.selectList.setItems(_this.database.content);
      }, true);

      _this.database.onDidError(function (options) {
        atom.notifications.addWarning('Database', options);
      });

      _this.database.initialize();
      _this.addToDock();
      dependencies.install(_base.PLUGIN_NAME);
    })();
  }

  /**
   * @returns {Object} the package configuration
   */
  get config() {
    return _config2.default;
  }

  /**
   * adds the project-viewer item to the specified dock.
   * @todo add alternative as a panel (settings)
   */
  addToDock() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield atom.workspace.open((yield _this2.getInstance()), {
        activateItem: atom.config.get(`${_base.PLUGIN_NAME}.dock.isActive`),
        activatePane: atom.config.get(`${_base.PLUGIN_NAME}.dock.isVisible`),
        location: atom.config.get(`${_base.PLUGIN_NAME}.dock.position`)
      });

      _this2.handleEvents();
    })();
  }

  /**
   * Atom package lifecycle method for deactivate the package.
   */
  deactivate() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      yield _this3.disposables.dispose();

      _this3.database.destroy();

      if (_this3.projectViewer) {
        _this3.projectViewer.destroy();
      }
      delete _this3.projectViewer;
    })();
  }

  /**
   * Register all events such as commands, observers and emitters.
   * @private
   */
  handleEvents() {
    this.disposables.add(atom.commands.add('atom-workspace', {
      'project-viewer-plus:open-database-file': () => {
        this.database.openFile();
      },
      'project-viewer-plus:open-editor': () => {
        this.projectViewer.openEditor();
      },
      'project-viewer-plus:toggle-visibility': () => {
        this.projectViewer.toggleVisibility();
      },
      'project-viewer-plus:toggle-focus': () => {
        this.projectViewer.toggleFocus();
      },
      'project-viewer-plus:toggle-select-list': () => {
        this.projectViewer.toggleSelectList();
      }
    }), atom.commands.add(this.projectViewer.element, {
      'core:move-up': function () {
        (0, _devlog2.default)('core:move-up', this);
      },
      'core:move-down': function () {
        (0, _devlog2.default)('core:move-down');
      },
      'core:move-left': function () {
        (0, _devlog2.default)('core:move-left');
      },
      'core:move-right': function () {
        (0, _devlog2.default)('core:move-right');
      },
      'core:confirm': function () {
        (0, _devlog2.default)('core:confirm');
      }
    }), atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(item => this.handlePositionChange('left', item)), atom.workspace.getRightDock().onDidStopChangingActivePaneItem(item => this.handlePositionChange('right', item)), atom.config.onDidChange(`${_base.PLUGIN_NAME}.dock.position`, () => {
      if (this.projectViewer) {
        this.projectViewer.destroy();
      }
      this.addToDock();
    }));
  }

  /**
   *
   * @param {string} position - dock emitter position
   * @param {Object} item - the active pane item
   */
  handlePositionChange(position, item) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (!atom.config.get(`${_base.PLUGIN_NAME}.dock.saveChanges`)) {
        return;
      }
      if (item === (yield _this4.getInstance())) {
        atom.config.set(`${_base.PLUGIN_NAME}.dock.position`, position);
      }
    })();
  }

  /**
   * Gets the Project Viewer instance if already set or create a new if not.
   * @todo improve description
   * @returns {Object} the Project Viewer instance.
   */
  getInstance() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      if (!_this5.projectViewer) {
        _this5.projectViewer = new _main2.default();
      }
      return _this5.projectViewer;
    })();
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} description
   */
  serialize() {
    return this.database.serialize();
  }

  /**
   *
   * @param {Object} data - description
   * @returns {Object} description
   */
  deserializeDatabase(data) {
    return data;
  }
};
exports.default = ProjectViewerPlus;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImRhdGFiYXNlIiwiRGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsIm9uRGlkQ2hhbmdlIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsInNldEl0ZW1zIiwiY29udGVudCIsIm9uRGlkRXJyb3IiLCJhdG9tIiwibm90aWZpY2F0aW9ucyIsImFkZFdhcm5pbmciLCJvcHRpb25zIiwiaW5pdGlhbGl6ZSIsImFkZFRvRG9jayIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImNvbmZpZyIsIkNvbmZpZyIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRJbnN0YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImxvY2F0aW9uIiwiaGFuZGxlRXZlbnRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJkZXN0cm95IiwicHJvamVjdFZpZXdlciIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJpdGVtIiwiaGFuZGxlUG9zaXRpb25DaGFuZ2UiLCJnZXRSaWdodERvY2siLCJwb3NpdGlvbiIsInNldCIsIk1haW5Db250YWluZXIiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZURhdGFiYXNlIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0lBQVlBLFk7O0FBQ1o7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7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QUE7QUFDbkIsVUFBSSxDQUFDLE9BQUtTLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQixJQUFJZ0IsY0FBSixFQUFyQjtBQUNEO0FBQ0QsYUFBTyxPQUFLaEIsYUFBWjtBQUptQjtBQUtwQjs7QUFFRDs7OztBQUlBaUIsY0FBYTtBQUNYLFdBQU8sS0FBS2pELFFBQUwsQ0FBY2lELFNBQWQsRUFBUDtBQUNEOztBQUVEOzs7OztBQUtBQyxzQkFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLFdBQU9BLElBQVA7QUFDRDtBQS9KcUIsQztrQkFrS1R4RCxpQiIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBhY3RpdmF0aW5nIHRoZSBwYWNrYWdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGVdIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChzdGF0ZSkge1xuICAgIGRldmxvZygnYWN0aXZhdGUnLCBzdGF0ZSk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZShzdGF0ZSk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRDaGFuZ2UoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhYmFzZS5zZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0KCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXModGhpcy5kYXRhYmFzZS5jb250ZW50KTtcbiAgICB9LCB0cnVlKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRFcnJvcihvcHRpb25zID0+IHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKCdEYXRhYmFzZScsIG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIHRoZSBwcm9qZWN0LXZpZXdlciBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgZG9jay5cbiAgICogQHRvZG8gYWRkIGFsdGVybmF0aXZlIGFzIGEgcGFuZWwgKHNldHRpbmdzKVxuICAgKi9cbiAgYXN5bmMgYWRkVG9Eb2NrICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IHRoaXMuZ2V0SW5zdGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApLFxuICAgICAgbG9jYXRpb246IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1kYXRhYmFzZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGF0YWJhc2Uub3BlbkZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVNlbGVjdExpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLnByb2plY3RWaWV3ZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLXVwJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShcbiAgICAgICAgaXRlbSA9PiB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdsZWZ0JywgaXRlbSlcbiAgICAgICksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKFxuICAgICAgICBpdGVtID0+IHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ3JpZ2h0JywgaXRlbSlcbiAgICAgICksXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIuZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZFRvRG9jaygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gLSBkb2NrIGVtaXR0ZXIgcG9zaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSB0aGUgYWN0aXZlIHBhbmUgaXRlbVxuICAgKi9cbiAgYXN5bmMgaGFuZGxlUG9zaXRpb25DaGFuZ2UgKHBvc2l0aW9uLCBpdGVtKSB7XG4gICAgaWYgKCFhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suc2F2ZUNoYW5nZXNgKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXRlbSA9PT0gYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpKSB7XG4gICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCBwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlIGlmIGFscmVhZHkgc2V0IG9yIGNyZWF0ZSBhIG5ldyBpZiBub3QuXG4gICAqIEB0b2RvIGltcHJvdmUgZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW5zdGFuY2UgKCkge1xuICAgIGlmICghdGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2Uuc2VyaWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGVzZXJpYWxpemVEYXRhYmFzZSAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJQbHVzO1xuIl19