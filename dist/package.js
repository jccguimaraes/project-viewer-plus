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

var _state = require('./services/state');

var _state2 = _interopRequireDefault(_state);

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
  activate(state = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      (0, _devlog2.default)('package:activate', state);
      _this.state = new _state2.default();
      _this.state.update(state.db);
      console.log(_this.state);
      _this.disposables = new _atom.CompositeDisposable();
      _this.database = new _database2.default();
      _this.contextSwitcher = new _contextSwitcher2.default();
      _this.selectList = new _selectList2.default();

      _this.database.onDidChange(function () {
        _this.database.setInitialSelectedProject();
        _this.selectList.setItems(_this.database.content);
      }, true);

      _this.database.onDidError(function (options) {
        atom.notifications.addWarning('Database', options);
      });

      _this.database.initialize(state.db);
      _this.addToDock();

      if (process.env.NODE_ENV !== 'test') {
        dependencies.install(_base.PLUGIN_NAME);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbImRlcGVuZGVuY2llcyIsIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsIlN0YXRlIiwidXBkYXRlIiwiZGIiLCJjb25zb2xlIiwibG9nIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZGF0YWJhc2UiLCJEYXRhYmFzZSIsImNvbnRleHRTd2l0Y2hlciIsIkNvbnRleHRTd2l0Y2hlciIsInNlbGVjdExpc3QiLCJTZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50Iiwib25EaWRFcnJvciIsImF0b20iLCJub3RpZmljYXRpb25zIiwiYWRkV2FybmluZyIsIm9wdGlvbnMiLCJpbml0aWFsaXplIiwiYWRkVG9Eb2NrIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiaW5zdGFsbCIsIlBMVUdJTl9OQU1FIiwiY29uZmlnIiwiQ29uZmlnIiwid29ya3NwYWNlIiwib3BlbiIsImdldEluc3RhbmNlIiwiYWN0aXZhdGVJdGVtIiwiZ2V0IiwiYWN0aXZhdGVQYW5lIiwibG9jYXRpb24iLCJoYW5kbGVFdmVudHMiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImRlc3Ryb3kiLCJwcm9qZWN0Vmlld2VyIiwiYWRkIiwiY29tbWFuZHMiLCJvcGVuRmlsZSIsIm9wZW5FZGl0b3IiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJ0b2dnbGVTZWxlY3RMaXN0IiwiZWxlbWVudCIsImdldExlZnREb2NrIiwib25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSIsIml0ZW0iLCJoYW5kbGVQb3NpdGlvbkNoYW5nZSIsImdldFJpZ2h0RG9jayIsInBvc2l0aW9uIiwic2V0IiwiTWFpbkNvbnRhaW5lciIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplRGF0YWJhc2UiLCJkYXRhIl0sIm1h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QTs7QUFBQTtBQUMxQyxVQUFJLENBQUNuQyxLQUFLVyxNQUFMLENBQVlNLEdBQVosQ0FBaUIsR0FBRVAsaUJBQVksbUJBQS9CLENBQUwsRUFBeUQ7QUFDdkQ7QUFDRDtBQUNELFVBQUl5QixVQUFTLE1BQU0sT0FBS3BCLFdBQUwsRUFBZixDQUFKLEVBQXVDO0FBQ3JDZixhQUFLVyxNQUFMLENBQVk0QixHQUFaLENBQWlCLEdBQUU3QixpQkFBWSxnQkFBL0IsRUFBZ0Q0QixRQUFoRDtBQUNEO0FBTnlDO0FBTzNDOztBQUVEOzs7OztBQUtNdkIsYUFBTixHQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUksQ0FBQyxPQUFLUyxhQUFWLEVBQXlCO0FBQ3ZCLGVBQUtBLGFBQUwsR0FBcUIsSUFBSWdCLGNBQUosRUFBckI7QUFDRDtBQUNELGFBQU8sT0FBS2hCLGFBQVo7QUFKbUI7QUFLcEI7O0FBRUQ7Ozs7QUFJQWlCLGNBQWE7QUFDWCxXQUFPLEtBQUtwRCxRQUFMLENBQWNvRCxTQUFkLEVBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsc0JBQXFCQyxJQUFyQixFQUEyQjtBQUN6QixXQUFPQSxJQUFQO0FBQ0Q7QUFyS3FCLEM7a0JBd0tUaEUsaUIiLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCAqIGFzIGRlcGVuZGVuY2llcyBmcm9tICdhdG9tLXBhY2thZ2UtZGVwcyc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vc2VydmljZXMvZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgUHJvamVjdCBWaWV3ZXIgUGFja2FnZVxuICovXG5jbGFzcyBQcm9qZWN0Vmlld2VyUGx1cyB7XG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUgPSB7fSkge1xuICAgIGRldmxvZygncGFja2FnZTphY3RpdmF0ZScsIHN0YXRlKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFN0YXRlKCk7XG4gICAgdGhpcy5zdGF0ZS51cGRhdGUoc3RhdGUuZGIpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlciA9IG5ldyBDb250ZXh0U3dpdGNoZXIoKTtcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZENoYW5nZSgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFiYXNlLnNldEluaXRpYWxTZWxlY3RlZFByb2plY3QoKTtcbiAgICAgIHRoaXMuc2VsZWN0TGlzdC5zZXRJdGVtcyh0aGlzLmRhdGFiYXNlLmNvbnRlbnQpO1xuICAgIH0sIHRydWUpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZEVycm9yKG9wdGlvbnMgPT4ge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoJ0RhdGFiYXNlJywgb3B0aW9ucyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmluaXRpYWxpemUoc3RhdGUuZGIpO1xuICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0Jykge1xuICAgICAgZGVwZW5kZW5jaWVzLmluc3RhbGwoUExVR0lOX05BTUUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgdGhlIHByb2plY3Qtdmlld2VyIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBkb2NrLlxuICAgKiBAdG9kbyBhZGQgYWx0ZXJuYXRpdmUgYXMgYSBwYW5lbCAoc2V0dGluZ3MpXG4gICAqL1xuICBhc3luYyBhZGRUb0RvY2sgKCkge1xuICAgIGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuZGVzdHJveSgpO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWRhdGFiYXNlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5vcGVuRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZUZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1zZWxlY3QtbGlzdCc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMucHJvamVjdFZpZXdlci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtdXAnLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKFxuICAgICAgICBpdGVtID0+IHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ2xlZnQnLCBpdGVtKVxuICAgICAgKSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oXG4gICAgICAgIGl0ZW0gPT4gdGhpcy5oYW5kbGVQb3NpdGlvbkNoYW5nZSgncmlnaHQnLCBpdGVtKVxuICAgICAgKSxcbiAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvbiAtIGRvY2sgZW1pdHRlciBwb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIHRoZSBhY3RpdmUgcGFuZSBpdGVtXG4gICAqL1xuICBhc3luYyBoYW5kbGVQb3NpdGlvbkNoYW5nZSAocG9zaXRpb24sIGl0ZW0pIHtcbiAgICBpZiAoIWF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5zYXZlQ2hhbmdlc2ApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpdGVtID09PSBhd2FpdCB0aGlzLmdldEluc3RhbmNlKCkpIHtcbiAgICAgIGF0b20uY29uZmlnLnNldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmAsIHBvc2l0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UgaWYgYWxyZWFkeSBzZXQgb3IgY3JlYXRlIGEgbmV3IGlmIG5vdC5cbiAgICogQHRvZG8gaW1wcm92ZSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBhc3luYyBnZXRJbnN0YW5jZSAoKSB7XG4gICAgaWYgKCF0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBkZXNlcmlhbGl6ZURhdGFiYXNlIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdFZpZXdlclBsdXM7XG4iXX0=