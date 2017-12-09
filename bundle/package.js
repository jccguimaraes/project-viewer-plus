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

      // atom.workspace.getLeftDock().observePaneItems(item =>
      //   devlog('left observePaneItems', item)
      // );
      //
      // atom.workspace.getLeftDock().onDidAddPaneItem(item =>
      //   devlog('left onDidAddPaneItem', item)
      // );
      //
      // atom.workspace.getLeftDock().onDidChangeVisible(visible =>
      //   devlog('left onDidChangeVisibile', visible)
      // );
      //
      // atom.workspace.getRightDock().observePaneItems(item =>
      //   devlog('right observePaneItems', item)
      // );
      //
      // atom.workspace.getRightDock().onDidAddPaneItem(item =>
      //   devlog('right onDidAddPaneItem', item)
      // );
      //
      // atom.workspace.getRightDock().onDidChangeVisible(visible =>
      //   devlog('right onDidChangeVisibile', visible)
      // );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50IiwiaW5pdGlhbGl6ZSIsImFkZFRvRG9jayIsImNvbmZpZyIsImF0b20iLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiZ2V0SW50YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImhhbmRsZUV2ZW50cyIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiZGVzdHJveSIsInByb2plY3RWaWV3ZXIiLCJhZGQiLCJjb21tYW5kcyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ0b2dnbGVGb2N1cyIsInRvZ2dsZVNlbGVjdExpc3QiLCJlbGVtZW50Iiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVEYXRhYmFzZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNQSxpQixHQUFOLE1BQU1BLGlCQUFOLENBQXdCOztBQUV0Qjs7OztBQUlNQyxVQUFOLENBQWdCQyxLQUFoQixFQUF1QjtBQUFBOztBQUFBO0FBQ3JCLDRCQUFPLFVBQVAsRUFBbUJBLEtBQW5CO0FBQ0EsWUFBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxZQUFLQyxRQUFMLEdBQWdCLHVCQUFhRixLQUFiLENBQWhCO0FBQ0EsWUFBS0csZUFBTCxHQUF1QiwrQkFBdkI7QUFDQSxZQUFLQyxVQUFMLEdBQWtCLG1DQUFsQjs7QUFFQSxZQUFLRixRQUFMLENBQWNHLFdBQWQsQ0FDRSxZQUFNO0FBQ0osY0FBS0gsUUFBTCxDQUFjSSx5QkFBZDtBQUNBLGNBQUtGLFVBQUwsQ0FBZ0JHLFFBQWhCLENBQXlCLE1BQUtMLFFBQUwsQ0FBY00sT0FBdkM7QUFDRCxPQUpILEVBS0UsSUFMRjs7QUFRQSxZQUFLTixRQUFMLENBQWNPLFVBQWQ7O0FBRUEsWUFBS0MsU0FBTDtBQWpCcUI7QUFrQnRCOztBQUVEOzs7QUFHQSxNQUFJQyxNQUFKLEdBQWM7QUFDWjtBQUNEOztBQUVEOzs7O0FBSU1ELFdBQU4sR0FBbUI7QUFBQTs7QUFBQTtBQUNqQixZQUFNRSxLQUFLQyxTQUFMLENBQWVDLElBQWYsRUFBb0IsTUFBTSxPQUFLQyxVQUFMLEVBQTFCLEdBQTZDO0FBQ2pEQyxzQkFBY0osS0FBS0QsTUFBTCxDQUFZTSxHQUFaLENBQWlCLEdBQUQsaUJBQWUsZ0JBQS9CLENBRG1DO0FBRWpEQyxzQkFBY04sS0FBS0QsTUFBTCxDQUFZTSxHQUFaLENBQWlCLEdBQUQsaUJBQWUsaUJBQS9CO0FBRm1DLE9BQTdDLENBQU47O0FBS0EsYUFBS0UsWUFBTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBOUJpQjtBQStCbEI7O0FBRUQ7OztBQUdNQyxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsWUFBTSxPQUFLbkIsV0FBTCxDQUFpQm9CLE9BQWpCLEVBQU47O0FBRUEsYUFBS25CLFFBQUwsQ0FBY29CLE9BQWQ7O0FBRUEsVUFBSSxPQUFLQyxhQUFULEVBQXdCO0FBQ3RCLGVBQUtBLGFBQUwsQ0FBbUJELE9BQW5CO0FBQ0Q7QUFDRCxhQUFPLE9BQUtDLGFBQVo7QUFSa0I7QUFTbkI7O0FBRUQ7OztBQUdBSixpQkFBZ0I7QUFDZCxTQUFLbEIsV0FBTCxDQUFpQnVCLEdBQWpCLENBQ0VaLEtBQUthLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFDbEMsK0NBQXlDLE1BQU07QUFDN0MsYUFBS0QsYUFBTCxDQUFtQkcsZ0JBQW5CO0FBQ0QsT0FIaUM7QUFJbEMsMENBQW9DLE1BQU07QUFDeEMsYUFBS0gsYUFBTCxDQUFtQkksV0FBbkI7QUFDRCxPQU5pQztBQU9sQyxnREFBMEMsTUFBTTtBQUM5QyxhQUFLSixhQUFMLENBQW1CSyxnQkFBbkI7QUFDRDtBQVRpQyxLQUFwQyxDQURGLEVBWUVoQixLQUFLYSxRQUFMLENBQWNELEdBQWQsQ0FBa0IsS0FBS0QsYUFBTCxDQUFtQk0sT0FBckMsRUFBOEM7QUFDNUMsc0JBQWdCLFlBQVk7QUFDMUI7QUFDRCxPQUgyQztBQUk1Qyx3QkFBa0IsWUFBWTtBQUM1QjtBQUNELE9BTjJDO0FBTzVDLHdCQUFrQixZQUFZO0FBQzVCO0FBQ0QsT0FUMkM7QUFVNUMseUJBQW1CLFlBQVk7QUFDN0I7QUFDRCxPQVoyQztBQWE1QyxzQkFBZ0IsWUFBWTtBQUMxQjtBQUNEO0FBZjJDLEtBQTlDLENBWkY7QUE4QkQ7O0FBRUQ7Ozs7O0FBS01kLFlBQU4sR0FBb0I7QUFBQTs7QUFBQTtBQUNsQixVQUFJLENBQUMsT0FBS1EsYUFBVixFQUF5QjtBQUN2QixlQUFLQSxhQUFMLEdBQXFCLDZCQUFyQjtBQUNEO0FBQ0QsYUFBTyxPQUFLQSxhQUFaO0FBSmtCO0FBS25COztBQUVEOzs7O0FBSUFPLGNBQWE7QUFDWCxXQUFPLEtBQUs1QixRQUFMLENBQWM0QixTQUFkLEVBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsc0JBQXFCQyxJQUFyQixFQUEyQjtBQUN6QixXQUFPQSxJQUFQO0FBQ0Q7O0FBbkpxQixDO2tCQXVKVGxDLGlCIiwiZmlsZSI6InBhY2thZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vc2VydmljZXMvZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZyc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbi1jb250YWluZXInO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0LWNvbnRhaW5lcic7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGFjdGl2YXRpbmcgdGhlIHBhY2thZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZV0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHN0YXRlKSB7XG4gICAgZGV2bG9nKCdhY3RpdmF0ZScsIHN0YXRlKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKHN0YXRlKTtcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlciA9IG5ldyBDb250ZXh0U3dpdGNoZXIoKTtcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZENoYW5nZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5zZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0TGlzdC5zZXRJdGVtcyh0aGlzLmRhdGFiYXNlLmNvbnRlbnQpO1xuICAgICAgfSxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLmFkZFRvRG9jaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYWRkcyB0aGUgcHJvamVjdC12aWV3ZXIgaXRlbSB0byB0aGUgc3BlY2lmaWVkIGRvY2suXG4gICAqIEB0b2RvIGFkZCBhbHRlcm5hdGl2ZSBhcyBhIHBhbmVsIChzZXR0aW5ncylcbiAgICovXG4gIGFzeW5jIGFkZFRvRG9jayAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCB0aGlzLmdldEludGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vYnNlcnZlUGFuZUl0ZW1zKGl0ZW0gPT5cbiAgICAvLyAgIGRldmxvZygnbGVmdCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZEFkZFBhbmVJdGVtKGl0ZW0gPT5cbiAgICAvLyAgIGRldmxvZygnbGVmdCBvbkRpZEFkZFBhbmVJdGVtJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZENoYW5nZVZpc2libGUodmlzaWJsZSA9PlxuICAgIC8vICAgZGV2bG9nKCdsZWZ0IG9uRGlkQ2hhbmdlVmlzaWJpbGUnLCB2aXNpYmxlKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vYnNlcnZlUGFuZUl0ZW1zKGl0ZW0gPT5cbiAgICAvLyAgIGRldmxvZygncmlnaHQgb2JzZXJ2ZVBhbmVJdGVtcycsIGl0ZW0pXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkQWRkUGFuZUl0ZW0oaXRlbSA9PlxuICAgIC8vICAgZGV2bG9nKCdyaWdodCBvbkRpZEFkZFBhbmVJdGVtJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT5cbiAgICAvLyAgIGRldmxvZygncmlnaHQgb25EaWRDaGFuZ2VWaXNpYmlsZScsIHZpc2libGUpXG4gICAgLy8gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgZGVhY3RpdmF0ZSB0aGUgcGFja2FnZS5cbiAgICovXG4gIGFzeW5jIGRlYWN0aXZhdGUgKCkge1xuICAgIGF3YWl0IHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFsbCBldmVudHMgc3VjaCBhcyBjb21tYW5kcywgb2JzZXJ2ZXJzIGFuZCBlbWl0dGVycy5cbiAgICovXG4gIGhhbmRsZUV2ZW50cyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlRm9jdXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXNlbGVjdC1saXN0JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVTZWxlY3RMaXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5wcm9qZWN0Vmlld2VyLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBkZXZsb2coJ2NvcmU6bW92ZS11cCcsIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gZGV2bG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gZGV2bG9nKCdjb3JlOm1vdmUtbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGRldmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gZGV2bG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlIGlmIGFscmVhZHkgc2V0IG9yIGNyZWF0ZSBhIG5ldyBpZiBub3QuXG4gICAqIEB0b2RvIGltcHJvdmUgZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW50YW5jZSAoKSB7XG4gICAgaWYgKCF0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBkZXNlcmlhbGl6ZURhdGFiYXNlIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Vmlld2VyUGx1cztcbiJdfQ==