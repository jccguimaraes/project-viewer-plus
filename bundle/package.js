Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _config = require('./constants/config');

var _config2 = _interopRequireDefault(_config);

var _base = require('./constants/base');

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
      console.log('activate', state);
      _this.config = _config2.default;
      _this.disposables = new _atom.CompositeDisposable();
      _this.database = new _database2.default(state);
      _this.contextSwitcher = new _contextSwitcher2.default();

      _this.database.onDidChange(function () {
        return _this.database.setInitialSelectedProject();
      }, true);

      _this.database.initialize();

      _this.addToDock();
    })();
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
      //   console.log('left observePaneItems', item)
      // );
      //
      // atom.workspace.getLeftDock().onDidAddPaneItem(item =>
      //   console.log('left onDidAddPaneItem', item)
      // );
      //
      // atom.workspace.getLeftDock().onDidChangeVisible(visible =>
      //   console.log('left onDidChangeVisibile', visible)
      // );
      //
      // atom.workspace.getRightDock().observePaneItems(item =>
      //   console.log('right observePaneItems', item)
      // );
      //
      // atom.workspace.getRightDock().onDidAddPaneItem(item =>
      //   console.log('right onDidAddPaneItem', item)
      // );
      //
      // atom.workspace.getRightDock().onDidChangeVisible(visible =>
      //   console.log('right onDidChangeVisibile', visible)
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
      }
    }), atom.commands.add(this.projectViewer.element, {
      'core:move-up': function () {
        // console.log('core:move-up', this);
      },
      'core:move-down': function () {
        // console.log('core:move-down');
      },
      'core:move-left': function () {
        // console.log('core:move-left');
      },
      'core:move-right': function () {
        // console.log('core:move-right');
      },
      'core:confirm': function () {
        // console.log('core:confirm');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJjb25maWciLCJkaXNwb3NhYmxlcyIsImRhdGFiYXNlIiwiY29udGV4dFN3aXRjaGVyIiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0IiwiaW5pdGlhbGl6ZSIsImFkZFRvRG9jayIsImF0b20iLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiZ2V0SW50YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImhhbmRsZUV2ZW50cyIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiZGVzdHJveSIsInByb2plY3RWaWV3ZXIiLCJhZGQiLCJjb21tYW5kcyIsInRvZ2dsZVZpc2liaWxpdHkiLCJ0b2dnbGVGb2N1cyIsImVsZW1lbnQiLCJzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZURhdGFiYXNlIiwiZGF0YSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdNQSxpQixHQUFOLE1BQU1BLGlCQUFOLENBQXdCOztBQUV0Qjs7OztBQUlNQyxVQUFOLENBQWdCQyxLQUFoQixFQUF1QjtBQUFBOztBQUFBO0FBQ3JCQyxjQUFRQyxHQUFSLENBQVksVUFBWixFQUF3QkYsS0FBeEI7QUFDQSxZQUFLRyxNQUFMO0FBQ0EsWUFBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxZQUFLQyxRQUFMLEdBQWdCLHVCQUFhTCxLQUFiLENBQWhCO0FBQ0EsWUFBS00sZUFBTCxHQUF1QiwrQkFBdkI7O0FBRUEsWUFBS0QsUUFBTCxDQUFjRSxXQUFkLENBQ0U7QUFBQSxlQUFNLE1BQUtGLFFBQUwsQ0FBY0cseUJBQWQsRUFBTjtBQUFBLE9BREYsRUFFRSxJQUZGOztBQUtBLFlBQUtILFFBQUwsQ0FBY0ksVUFBZDs7QUFFQSxZQUFLQyxTQUFMO0FBZHFCO0FBZXRCOztBQUVEOzs7O0FBSU1BLFdBQU4sR0FBbUI7QUFBQTs7QUFBQTtBQUNqQixZQUFNQyxLQUFLQyxTQUFMLENBQWVDLElBQWYsRUFBb0IsTUFBTSxPQUFLQyxVQUFMLEVBQTFCLEdBQTZDO0FBQ2pEQyxzQkFBY0osS0FBS1IsTUFBTCxDQUFZYSxHQUFaLENBQWlCLEdBQUQsaUJBQWUsZ0JBQS9CLENBRG1DO0FBRWpEQyxzQkFBY04sS0FBS1IsTUFBTCxDQUFZYSxHQUFaLENBQWlCLEdBQUQsaUJBQWUsaUJBQS9CO0FBRm1DLE9BQTdDLENBQU47O0FBS0EsYUFBS0UsWUFBTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBOUJpQjtBQStCbEI7O0FBRUQ7OztBQUdNQyxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsWUFBTSxPQUFLZixXQUFMLENBQWlCZ0IsT0FBakIsRUFBTjs7QUFFQSxhQUFLZixRQUFMLENBQWNnQixPQUFkOztBQUVBLFVBQUksT0FBS0MsYUFBVCxFQUF3QjtBQUN0QixlQUFLQSxhQUFMLENBQW1CRCxPQUFuQjtBQUNEO0FBQ0QsYUFBTyxPQUFLQyxhQUFaO0FBUmtCO0FBU25COztBQUVEOzs7QUFHQUosaUJBQWdCO0FBQ2QsU0FBS2QsV0FBTCxDQUFpQm1CLEdBQWpCLENBQ0VaLEtBQUthLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFDbEMsK0NBQXlDLE1BQU07QUFDN0MsYUFBS0QsYUFBTCxDQUFtQkcsZ0JBQW5CO0FBQ0QsT0FIaUM7QUFJbEMsMENBQW9DLE1BQU07QUFDeEMsYUFBS0gsYUFBTCxDQUFtQkksV0FBbkI7QUFDRDtBQU5pQyxLQUFwQyxDQURGLEVBU0VmLEtBQUthLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixLQUFLRCxhQUFMLENBQW1CSyxPQUFyQyxFQUE4QztBQUM1QyxzQkFBZ0IsWUFBWTtBQUMxQjtBQUNELE9BSDJDO0FBSTVDLHdCQUFrQixZQUFZO0FBQzVCO0FBQ0QsT0FOMkM7QUFPNUMsd0JBQWtCLFlBQVk7QUFDNUI7QUFDRCxPQVQyQztBQVU1Qyx5QkFBbUIsWUFBWTtBQUM3QjtBQUNELE9BWjJDO0FBYTVDLHNCQUFnQixZQUFZO0FBQzFCO0FBQ0Q7QUFmMkMsS0FBOUMsQ0FURjtBQTJCRDs7QUFFRDs7Ozs7QUFLTWIsWUFBTixHQUFvQjtBQUFBOztBQUFBO0FBQ2xCLFVBQUksQ0FBQyxPQUFLUSxhQUFWLEVBQXlCO0FBQ3ZCLGVBQUtBLGFBQUwsR0FBcUIsNkJBQXJCO0FBQ0Q7QUFDRCxhQUFPLE9BQUtBLGFBQVo7QUFKa0I7QUFLbkI7O0FBRUQ7Ozs7QUFJQU0sY0FBYTtBQUNYLFdBQU8sS0FBS3ZCLFFBQUwsQ0FBY3VCLFNBQWQsRUFBUDtBQUNEOztBQUVEOzs7OztBQUtBQyxzQkFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLFdBQU9BLElBQVA7QUFDRDs7QUF0SXFCLEM7a0JBMElUaEMsaUIiLCJmaWxlIjoicGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5pbXBvcnQgTWFpbkNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvbWFpbi1jb250YWluZXInO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0LWNvbnRhaW5lcic7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBQcm9qZWN0IFZpZXdlciBQYWNrYWdlXG4gKi9cbmNsYXNzIFByb2plY3RWaWV3ZXJQbHVzIHtcblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGFjdGl2YXRpbmcgdGhlIHBhY2thZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZV0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coJ2FjdGl2YXRlJywgc3RhdGUpO1xuICAgIHRoaXMuY29uZmlnID0gQ29uZmlnO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2Uoc3RhdGUpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZENoYW5nZShcbiAgICAgICgpID0+IHRoaXMuZGF0YWJhc2Uuc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCgpLFxuICAgICAgdHJ1ZVxuICAgICk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmluaXRpYWxpemUoKTtcblxuICAgIHRoaXMuYWRkVG9Eb2NrKCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkcyB0aGUgcHJvamVjdC12aWV3ZXIgaXRlbSB0byB0aGUgc3BlY2lmaWVkIGRvY2suXG4gICAqIEB0b2RvIGFkZCBhbHRlcm5hdGl2ZSBhcyBhIHBhbmVsIChzZXR0aW5ncylcbiAgICovXG4gIGFzeW5jIGFkZFRvRG9jayAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCB0aGlzLmdldEludGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vYnNlcnZlUGFuZUl0ZW1zKGl0ZW0gPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdsZWZ0IG9ic2VydmVQYW5lSXRlbXMnLCBpdGVtKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkQWRkUGFuZUl0ZW0oaXRlbSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ2xlZnQgb25EaWRBZGRQYW5lSXRlbScsIGl0ZW0pXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdsZWZ0IG9uRGlkQ2hhbmdlVmlzaWJpbGUnLCB2aXNpYmxlKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vYnNlcnZlUGFuZUl0ZW1zKGl0ZW0gPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdyaWdodCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRBZGRQYW5lSXRlbShpdGVtID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygncmlnaHQgb25EaWRBZGRQYW5lSXRlbScsIGl0ZW0pXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkQ2hhbmdlVmlzaWJsZSh2aXNpYmxlID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygncmlnaHQgb25EaWRDaGFuZ2VWaXNpYmlsZScsIHZpc2libGUpXG4gICAgLy8gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgZGVhY3RpdmF0ZSB0aGUgcGFja2FnZS5cbiAgICovXG4gIGFzeW5jIGRlYWN0aXZhdGUgKCkge1xuICAgIGF3YWl0IHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5kZXN0cm95KCk7XG5cbiAgICBpZiAodGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICBkZWxldGUgdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFsbCBldmVudHMgc3VjaCBhcyBjb21tYW5kcywgb2JzZXJ2ZXJzIGFuZCBlbWl0dGVycy5cbiAgICovXG4gIGhhbmRsZUV2ZW50cyAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCB7XG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS12aXNpYmlsaXR5JzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1mb2N1cyc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlRm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLnByb2plY3RWaWV3ZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlIGlmIGFscmVhZHkgc2V0IG9yIGNyZWF0ZSBhIG5ldyBpZiBub3QuXG4gICAqIEB0b2RvIGltcHJvdmUgZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW50YW5jZSAoKSB7XG4gICAgaWYgKCF0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBkZXNlcmlhbGl6ZURhdGFiYXNlIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Vmlld2VyUGx1cztcbiJdfQ==