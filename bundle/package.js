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
      // TODO validate if it's better to use getInstance
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50Iiwib25EaWRFcnJvciIsImF0b20iLCJub3RpZmljYXRpb25zIiwiYWRkV2FybmluZyIsIm9wdGlvbnMiLCJpbml0aWFsaXplIiwiYWRkVG9Eb2NrIiwiaW5zdGFsbCIsImNvbmZpZyIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRJbnN0YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImxvY2F0aW9uIiwiaGFuZGxlRXZlbnRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJkZXN0cm95IiwicHJvamVjdFZpZXdlciIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJpdGVtIiwiaGFuZGxlUG9zaXRpb25DaGFuZ2UiLCJnZXRSaWdodERvY2siLCJwb3NpdGlvbiIsInNldCIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplRGF0YWJhc2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsWTs7QUFDWjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7QUFDdEI7Ozs7QUFJTUMsVUFBTixDQUFnQkMsS0FBaEIs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OztBQUtBQyxzQkFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLFdBQU9BLElBQVA7QUFDRDtBQS9KcUIsQztrQkFrS1RqRCxpQiIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0ICogYXMgZGVwZW5kZW5jaWVzIGZyb20gJ2F0b20tcGFja2FnZS1kZXBzJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29udGFpbmVycy9zZWxlY3QtbGlzdCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBhY3RpdmF0aW5nIHRoZSBwYWNrYWdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhdGVdIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIGFjdGl2YXRlIChzdGF0ZSkge1xuICAgIGRldmxvZygnYWN0aXZhdGUnLCBzdGF0ZSk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZShzdGF0ZSk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRDaGFuZ2UoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRhYmFzZS5zZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0KCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXModGhpcy5kYXRhYmFzZS5jb250ZW50KTtcbiAgICB9LCB0cnVlKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRFcnJvcihvcHRpb25zID0+IHtcbiAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRXYXJuaW5nKCdEYXRhYmFzZScsIG9wdGlvbnMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIHRoZSBwcm9qZWN0LXZpZXdlciBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgZG9jay5cbiAgICogQHRvZG8gYWRkIGFsdGVybmF0aXZlIGFzIGEgcGFuZWwgKHNldHRpbmdzKVxuICAgKi9cbiAgYXN5bmMgYWRkVG9Eb2NrICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IHRoaXMuZ2V0SW5zdGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApLFxuICAgICAgbG9jYXRpb246IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1kYXRhYmFzZS1maWxlJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGF0YWJhc2Uub3BlbkZpbGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6b3Blbi1lZGl0b3InOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLm9wZW5FZGl0b3IoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVNlbGVjdExpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLnByb2plY3RWaWV3ZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLXVwJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShcbiAgICAgICAgaXRlbSA9PiB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdsZWZ0JywgaXRlbSlcbiAgICAgICksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKFxuICAgICAgICBpdGVtID0+IHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ3JpZ2h0JywgaXRlbSlcbiAgICAgICksXG4gICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZShgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBUT0RPIHZhbGlkYXRlIGlmIGl0J3MgYmV0dGVyIHRvIHVzZSBnZXRJbnN0YW5jZVxuICAgICAgICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIGRvY2sgZW1pdHRlciBwb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIHRoZSBhY3RpdmUgcGFuZSBpdGVtXG4gICAqL1xuICBhc3luYyBoYW5kbGVQb3NpdGlvbkNoYW5nZSAocG9zaXRpb24sIGl0ZW0pIHtcbiAgICBpZiAoIWF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5zYXZlQ2hhbmdlc2ApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpdGVtID09PSBhd2FpdCB0aGlzLmdldEluc3RhbmNlKCkpIHtcbiAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsIHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UgaWYgYWxyZWFkeSBzZXQgb3IgY3JlYXRlIGEgbmV3IGlmIG5vdC5cbiAgICogQHRvZG8gaW1wcm92ZSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBhc3luYyBnZXRJbnN0YW5jZSAoKSB7XG4gICAgaWYgKCF0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBkZXNlcmlhbGl6ZURhdGFiYXNlIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdFZpZXdlclBsdXM7XG4iXX0=