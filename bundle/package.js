'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50Iiwib25EaWRFcnJvciIsImF0b20iLCJub3RpZmljYXRpb25zIiwiYWRkV2FybmluZyIsIm9wdGlvbnMiLCJpbml0aWFsaXplIiwiYWRkVG9Eb2NrIiwiY29uZmlnIiwid29ya3NwYWNlIiwib3BlbiIsImdldEluc3RhbmNlIiwiYWN0aXZhdGVJdGVtIiwiZ2V0IiwiYWN0aXZhdGVQYW5lIiwibG9jYXRpb24iLCJoYW5kbGVFdmVudHMiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImRlc3Ryb3kiLCJwcm9qZWN0Vmlld2VyIiwiYWRkIiwiY29tbWFuZHMiLCJvcGVuRmlsZSIsIm9wZW5FZGl0b3IiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJ0b2dnbGVTZWxlY3RMaXN0IiwiZWxlbWVudCIsImdldExlZnREb2NrIiwib25EaWRTdG9wQ2hhbmdpbmdBY3RpdmVQYW5lSXRlbSIsIml0ZW0iLCJoYW5kbGVQb3NpdGlvbkNoYW5nZSIsImdldFJpZ2h0RG9jayIsInBvc2l0aW9uIiwic2V0Iiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVEYXRhYmFzZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7QUFDdEI7Ozs7QUFJTUMsVUFBTixDQUFnQkMsS0FBaEIsRUFBdUI7QUFBQTs7QUFBQTtBQUNyQiw0QkFBTyxVQUFQLEVBQW1CQSxL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QWtLVGhELGlCIiwiZmlsZSI6InBhY2thZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vc2VydmljZXMvZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgUHJvamVjdCBWaWV3ZXIgUGFja2FnZVxuICovXG5jbGFzcyBQcm9qZWN0Vmlld2VyUGx1cyB7XG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUpIHtcbiAgICBkZXZsb2coJ2FjdGl2YXRlJywgc3RhdGUpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2Uoc3RhdGUpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKCgpID0+IHtcbiAgICAgIHRoaXMuZGF0YWJhc2Uuc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCgpO1xuICAgICAgdGhpcy5zZWxlY3RMaXN0LnNldEl0ZW1zKHRoaXMuZGF0YWJhc2UuY29udGVudCk7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkRXJyb3Iob3B0aW9ucyA9PiB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZygnRGF0YWJhc2UnLCBvcHRpb25zKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0YWJhc2UuaW5pdGlhbGl6ZSgpO1xuXG4gICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgdGhlIHByb2plY3Qtdmlld2VyIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBkb2NrLlxuICAgKiBAdG9kbyBhZGQgYWx0ZXJuYXRpdmUgYXMgYSBwYW5lbCAoc2V0dGluZ3MpXG4gICAqL1xuICBhc3luYyBhZGRUb0RvY2sgKCkge1xuICAgIGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgdGhpcy5nZXRJbnN0YW5jZSgpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuZGVzdHJveSgpO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWRhdGFiYXNlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5vcGVuRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZUZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1zZWxlY3QtbGlzdCc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMucHJvamVjdFZpZXdlci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtdXAnLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZFN0b3BDaGFuZ2luZ0FjdGl2ZVBhbmVJdGVtKFxuICAgICAgICBpdGVtID0+IHRoaXMuaGFuZGxlUG9zaXRpb25DaGFuZ2UoJ2xlZnQnLCBpdGVtKVxuICAgICAgKSxcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkU3RvcENoYW5naW5nQWN0aXZlUGFuZUl0ZW0oXG4gICAgICAgIGl0ZW0gPT4gdGhpcy5oYW5kbGVQb3NpdGlvbkNoYW5nZSgncmlnaHQnLCBpdGVtKVxuICAgICAgKSxcbiAgICAgIGF0b20uY29uZmlnLm9uRGlkQ2hhbmdlKGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIFRPRE8gdmFsaWRhdGUgaWYgaXQncyBiZXR0ZXIgdG8gdXNlIGdldEluc3RhbmNlXG4gICAgICAgICAgaWYgKHRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBvc2l0aW9uIC0gZG9jayBlbWl0dGVyIHBvc2l0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gdGhlIGFjdGl2ZSBwYW5lIGl0ZW1cbiAgICovXG4gIGFzeW5jIGhhbmRsZVBvc2l0aW9uQ2hhbmdlIChwb3NpdGlvbiwgaXRlbSkge1xuICAgIGlmICghYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnNhdmVDaGFuZ2VzYCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGl0ZW0gPT09IGF3YWl0IHRoaXMuZ2V0SW5zdGFuY2UoKSkge1xuICAgICAgYXRvbS5jb25maWcuc2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCwgcG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZSBpZiBhbHJlYWR5IHNldCBvciBjcmVhdGUgYSBuZXcgaWYgbm90LlxuICAgKiBAdG9kbyBpbXByb3ZlIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZS5cbiAgICovXG4gIGFzeW5jIGdldEluc3RhbmNlICgpIHtcbiAgICBpZiAoIXRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRlc2VyaWFsaXplRGF0YWJhc2UgKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Vmlld2VyUGx1cztcbiJdfQ==