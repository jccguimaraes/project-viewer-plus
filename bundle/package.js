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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50Iiwib25EaWRFcnJvciIsImF0b20iLCJub3RpZmljYXRpb25zIiwiYWRkV2FybmluZyIsIm9wdGlvbnMiLCJpbml0aWFsaXplIiwiYWRkVG9Eb2NrIiwiaW5zdGFsbCIsImNvbmZpZyIsIndvcmtzcGFjZSIsIm9wZW4iLCJnZXRJbnN0YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImxvY2F0aW9uIiwiaGFuZGxlRXZlbnRzIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJkZXN0cm95IiwicHJvamVjdFZpZXdlciIsImFkZCIsImNvbW1hbmRzIiwib3BlbkZpbGUiLCJvcGVuRWRpdG9yIiwidG9nZ2xlVmlzaWJpbGl0eSIsInRvZ2dsZUZvY3VzIiwidG9nZ2xlU2VsZWN0TGlzdCIsImVsZW1lbnQiLCJnZXRMZWZ0RG9jayIsIm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0iLCJpdGVtIiwiaGFuZGxlUG9zaXRpb25DaGFuZ2UiLCJnZXRSaWdodERvY2siLCJwb3NpdGlvbiIsInNldCIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplRGF0YWJhc2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsWTs7QUFDWjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7O0lBR01DLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7QUFDdEI7Ozs7QUFJTUMsVUFBTixDQUFnQkMsS0FBaEIs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Ozs7QUFLQUMsc0JBQXFCQyxJQUFyQixFQUEyQjtBQUN6QixXQUFPQSxJQUFQO0FBQ0Q7QUFoS3FCLEM7a0JBbUtUakQsaUIiLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCAqIGFzIGRlcGVuZGVuY2llcyBmcm9tICdhdG9tLXBhY2thZ2UtZGVwcyc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vc2VydmljZXMvZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgUHJvamVjdCBWaWV3ZXIgUGFja2FnZVxuICovXG5jbGFzcyBQcm9qZWN0Vmlld2VyUGx1cyB7XG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUpIHtcbiAgICBkZXZsb2coJ2FjdGl2YXRlJywgc3RhdGUpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2Uoc3RhdGUpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YWJhc2Uuc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCgpO1xuICAgICAgdGhpcy5zZWxlY3RMaXN0LnNldEl0ZW1zKHRoaXMuZGF0YWJhc2UuY29udGVudCk7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkRXJyb3Iob3B0aW9ucyA9PiB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZygnRGF0YWJhc2UnLCBvcHRpb25zKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0YWJhc2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG4gICAgZGVwZW5kZW5jaWVzLmluc3RhbGwoUExVR0lOX05BTUUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYWRkcyB0aGUgcHJvamVjdC12aWV3ZXIgaXRlbSB0byB0aGUgc3BlY2lmaWVkIGRvY2suXG4gICAqIEB0b2RvIGFkZCBhbHRlcm5hdGl2ZSBhcyBhIHBhbmVsIChzZXR0aW5ncylcbiAgICovXG4gIGFzeW5jIGFkZFRvRG9jayAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCB0aGlzLmdldEluc3RhbmNlKCksIHtcbiAgICAgIGFjdGl2YXRlSXRlbTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzQWN0aXZlYCksXG4gICAgICBhY3RpdmF0ZVBhbmU6IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc1Zpc2libGVgKSxcbiAgICAgIGxvY2F0aW9uOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gKVxuICAgIH0pO1xuXG4gICAgdGhpcy5oYW5kbGVFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgZGVhY3RpdmF0ZSB0aGUgcGFja2FnZS5cbiAgICovXG4gIGFzeW5jIGRlYWN0aXZhdGUgKCkge1xuICAgIGF3YWl0IHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFsbCBldmVudHMgc3VjaCBhcyBjb21tYW5kcywgb2JzZXJ2ZXJzIGFuZCBlbWl0dGVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhbmRsZUV2ZW50cyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZGF0YWJhc2UtZmlsZSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmRhdGFiYXNlLm9wZW5GaWxlKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOm9wZW4tZWRpdG9yJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci5vcGVuRWRpdG9yKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlRm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXNlbGVjdC1saXN0JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVTZWxlY3RMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5wcm9qZWN0Vmlld2VyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS11cCcsIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oXG4gICAgICAgIGl0ZW0gPT4gdGhpcy5oYW5kbGVQb3NpdGlvbkNoYW5nZSgnbGVmdCcsIGl0ZW0pXG4gICAgICApLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbShcbiAgICAgICAgaXRlbSA9PiB0aGlzLmhhbmRsZVBvc2l0aW9uQ2hhbmdlKCdyaWdodCcsIGl0ZW0pXG4gICAgICApLFxuICAgICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgLy8gVE9ETyB2YWxpZGF0ZSBpZiBpdCdzIGJldHRlciB0byB1c2UgZ2V0SW5zdGFuY2VcbiAgICAgICAgICBpZiAodGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIuZGVzdHJveSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZFRvRG9jaygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcG9zaXRpb24gLSBkb2NrIGVtaXR0ZXIgcG9zaXRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSB0aGUgYWN0aXZlIHBhbmUgaXRlbVxuICAgKi9cbiAgYXN5bmMgaGFuZGxlUG9zaXRpb25DaGFuZ2UgKHBvc2l0aW9uLCBpdGVtKSB7XG4gICAgaWYgKCFhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suc2F2ZUNoYW5nZXNgKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXRlbSA9PT0gYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpKSB7XG4gICAgICBhdG9tLmNvbmZpZy5zZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gLCBwb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlIGlmIGFscmVhZHkgc2V0IG9yIGNyZWF0ZSBhIG5ldyBpZiBub3QuXG4gICAqIEB0b2RvIGltcHJvdmUgZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW5zdGFuY2UgKCkge1xuICAgIGlmICghdGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2Uuc2VyaWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGVzZXJpYWxpemVEYXRhYmFzZSAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJQbHVzO1xuIl19
