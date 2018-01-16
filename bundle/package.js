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

var _mainContainer = require('./containers/main-container');

var _mainContainer2 = _interopRequireDefault(_mainContainer);

var _selectListContainer = require('./containers/select-list-container');

var _selectListContainer2 = _interopRequireDefault(_selectListContainer);

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
      _this.selectList = new _selectListContainer2.default();

      _this.database.onDidChange(function () {
        _this.database.setInitialSelectedProject();
        _this.selectList.setItems(_this.database.content);
      }, true);

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
      yield atom.workspace.open((yield _this2.getIntance()), {
        activateItem: atom.config.get(`${_base.PLUGIN_NAME}.dock.isActive`),
        activatePane: atom.config.get(`${_base.PLUGIN_NAME}.dock.isVisible`)
      });

      _this2.handleEvents();

      atom.workspace.getLeftDock().observePaneItems(function (item) {
        return (0, _devlog2.default)('left observePaneItems', item);
      });

      atom.workspace.getLeftDock().onDidAddPaneItem(function (item) {
        return (0, _devlog2.default)('left onDidAddPaneItem', item);
      });

      atom.workspace.getLeftDock().onDidChangeVisible(function (visible) {
        return (0, _devlog2.default)('left onDidChangeVisibile', visible);
      });

      atom.workspace.getRightDock().observePaneItems(function (item) {
        return (0, _devlog2.default)('right observePaneItems', item);
      });

      atom.workspace.getRightDock().onDidAddPaneItem(function (item) {
        return (0, _devlog2.default)('right onDidAddPaneItem', item);
      });

      atom.workspace.getRightDock().onDidChangeVisible(function (visible) {
        return (0, _devlog2.default)('right onDidChangeVisibile', visible);
      });
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
        // devlog('core:move-up', this);
      },
      'core:move-down': function () {
        // devlog('core:move-down');
      },
      'core:move-left': function () {
        // devlog('core:move-left');
      },
      'core:move-right': function () {
        // devlog('core:move-right');
      },
      'core:confirm': function () {
        // devlog('core:confirm');
      }
    }));
  }

  /**
   * Gets the Project Viewer instance if already set or create a new if not.
   * @todo improve description
   * @returns {Object} the Project Viewer instance.
   */
  getIntance() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (!_this4.projectViewer) {
        _this4.projectViewer = new _mainContainer2.default();
      }
      return _this4.projectViewer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50IiwiaW5pdGlhbGl6ZSIsImFkZFRvRG9jayIsImNvbmZpZyIsImF0b20iLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiZ2V0SW50YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImhhbmRsZUV2ZW50cyIsImdldExlZnREb2NrIiwib2JzZXJ2ZVBhbmVJdGVtcyIsIml0ZW0iLCJvbkRpZEFkZFBhbmVJdGVtIiwib25EaWRDaGFuZ2VWaXNpYmxlIiwidmlzaWJsZSIsImdldFJpZ2h0RG9jayIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiZGVzdHJveSIsInByb2plY3RWaWV3ZXIiLCJhZGQiLCJjb21tYW5kcyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ0b2dnbGVGb2N1cyIsInRvZ2dsZVNlbGVjdExpc3QiLCJlbGVtZW50Iiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVEYXRhYmFzZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNQSxpQixHQUFOLE1BQU1BLGlCQUFOLENBQXdCOztBQUV0Qjs7OztBQUlNQyxVQUFOLENBQWdCQyxLQUFoQixFQUF1QjtBQUFBOztBQUFBO0FBQ3JCLDRCQUFPLFVBQVAsRUFBbUJBLEtBQW5CO0FBQ0EsWUFBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxZQUFLQyxRQUFMLEdBQWdCLHVCQUFhRixLQUFiLENBQWhCO0FBQ0EsWUFBS0csZUFBTCxHQUF1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QztBQU81Qyx3QkFBa0IsWUFBWTtBQUM1QjtBQUNELE9BVDJDO0FBVTVDLHlCQUFtQixZQUFZO0FBQzdCO0FBQ0QsT0FaMkM7QUFhNUMsc0JBQWdCLFlBQVk7QUFDMUI7QUFDRDtBQWYyQyxLQUE5QyxDQVpGO0FBOEJEOztBQUVEOzs7OztBQUtNckIsWUFBTixHQUFvQjtBQUFBOztBQUFBO0FBQ2xCLFVBQUksQ0FBQyxPQUFLZSxhQUFWLEVBQXlCO0FBQ3ZCLGVBQUtBLGFBQUwsR0FBcUIsNkJBQXJCO0FBQ0Q7QUFDRCxhQUFPLE9BQUtBLGFBQVo7QUFKa0I7QUFLbkI7O0FBRUQ7Ozs7QUFJQU8sY0FBYTtBQUNYLFdBQU8sS0FBS25DLFFBQUwsQ0FBY21DLFNBQWQsRUFBUDtBQUNEOztBQUVEOzs7OztBQUtBQyxzQkFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLFdBQU9BLElBQVA7QUFDRDs7QUFuSnFCLEM7a0JBdUpUekMsaUIiLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluLWNvbnRhaW5lcic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QtY29udGFpbmVyJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFByb2plY3QgVmlld2VyIFBhY2thZ2VcbiAqL1xuY2xhc3MgUHJvamVjdFZpZXdlclBsdXMge1xuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUpIHtcbiAgICBkZXZsb2coJ2FjdGl2YXRlJywgc3RhdGUpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2Uoc3RhdGUpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLmRhdGFiYXNlLnNldEluaXRpYWxTZWxlY3RlZFByb2plY3QoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RMaXN0LnNldEl0ZW1zKHRoaXMuZGF0YWJhc2UuY29udGVudCk7XG4gICAgICB9LFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmluaXRpYWxpemUoKTtcblxuICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHBhY2thZ2UgY29uZmlndXJhdGlvblxuICAgKi9cbiAgZ2V0IGNvbmZpZyAoKSB7XG4gICAgcmV0dXJuIENvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIHRoZSBwcm9qZWN0LXZpZXdlciBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgZG9jay5cbiAgICogQHRvZG8gYWRkIGFsdGVybmF0aXZlIGFzIGEgcGFuZWwgKHNldHRpbmdzKVxuICAgKi9cbiAgYXN5bmMgYWRkVG9Eb2NrICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IHRoaXMuZ2V0SW50YW5jZSgpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9ic2VydmVQYW5lSXRlbXMoaXRlbSA9PlxuICAgICAgZGV2bG9nKCdsZWZ0IG9ic2VydmVQYW5lSXRlbXMnLCBpdGVtKVxuICAgICk7XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkQWRkUGFuZUl0ZW0oaXRlbSA9PlxuICAgICAgZGV2bG9nKCdsZWZ0IG9uRGlkQWRkUGFuZUl0ZW0nLCBpdGVtKVxuICAgICk7XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkQ2hhbmdlVmlzaWJsZSh2aXNpYmxlID0+XG4gICAgICBkZXZsb2coJ2xlZnQgb25EaWRDaGFuZ2VWaXNpYmlsZScsIHZpc2libGUpXG4gICAgKTtcblxuICAgIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9ic2VydmVQYW5lSXRlbXMoaXRlbSA9PlxuICAgICAgZGV2bG9nKCdyaWdodCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSlcbiAgICApO1xuXG4gICAgYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRBZGRQYW5lSXRlbShpdGVtID0+XG4gICAgICBkZXZsb2coJ3JpZ2h0IG9uRGlkQWRkUGFuZUl0ZW0nLCBpdGVtKVxuICAgICk7XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZENoYW5nZVZpc2libGUodmlzaWJsZSA9PlxuICAgICAgZGV2bG9nKCdyaWdodCBvbkRpZENoYW5nZVZpc2liaWxlJywgdmlzaWJsZSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVNlbGVjdExpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLnByb2plY3RWaWV3ZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGRldmxvZygnY29yZTptb3ZlLXVwJywgdGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBkZXZsb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBkZXZsb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gZGV2bG9nKCdjb3JlOm1vdmUtcmlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBkZXZsb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UgaWYgYWxyZWFkeSBzZXQgb3IgY3JlYXRlIGEgbmV3IGlmIG5vdC5cbiAgICogQHRvZG8gaW1wcm92ZSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBhc3luYyBnZXRJbnRhbmNlICgpIHtcbiAgICBpZiAoIXRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRlc2VyaWFsaXplRGF0YWJhc2UgKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJQbHVzO1xuIl19