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
      },
      'project-viewer-plus:toggle-select-list': () => {
        this.projectViewer.toggleSelectList();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJjb25maWciLCJkaXNwb3NhYmxlcyIsImRhdGFiYXNlIiwiY29udGV4dFN3aXRjaGVyIiwic2VsZWN0TGlzdCIsIm9uRGlkQ2hhbmdlIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsInNldEl0ZW1zIiwiY29udGVudCIsImluaXRpYWxpemUiLCJhZGRUb0RvY2siLCJhdG9tIiwid29ya3NwYWNlIiwib3BlbiIsImdldEludGFuY2UiLCJhY3RpdmF0ZUl0ZW0iLCJnZXQiLCJhY3RpdmF0ZVBhbmUiLCJoYW5kbGVFdmVudHMiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImRlc3Ryb3kiLCJwcm9qZWN0Vmlld2VyIiwiYWRkIiwiY29tbWFuZHMiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJ0b2dnbGVTZWxlY3RMaXN0IiwiZWxlbWVudCIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplRGF0YWJhc2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7O0FBRXRCOzs7O0FBSU1DLFVBQU4sQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQUE7O0FBQUE7QUFDckJDLGNBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCRixLQUF4QjtBQUNBLFlBQUtHLE1BQUw7QUFDQSxZQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFlBQUtDLFFBQUwsR0FBZ0IsdUJBQWFMLEtBQWIsQ0FBaEI7QUFDQSxZQUFLTSxlQUFMLEdBQXVCLCtCQUF2QjtBQUNBLFlBQUtDLFVBQUwsR0FBa0IsbUNBQWxCOztBQUVBLFlBQUtGLFFBQUwsQ0FBY0csV0FBZCxDQUNFLFlBQU07QUFDSixjQUFLSCxRQUFMLENBQWNJLHlCQUFkO0FBQ0EsY0FBS0YsVUFBTCxDQUFnQkcsUUFBaEIsQ0FBeUIsTUFBS0wsUUFBTCxDQUFjTSxPQUF2QztBQUNELE9BSkgsRUFLRSxJQUxGOztBQVFBLFlBQUtOLFFBQUwsQ0FBY08sVUFBZDs7QUFFQSxZQUFLQyxTQUFMO0FBbEJxQjtBQW1CdEI7O0FBRUQ7Ozs7QUFJTUEsV0FBTixHQUFtQjtBQUFBOztBQUFBO0FBQ2pCLFlBQU1DLEtBQUtDLFNBQUwsQ0FBZUMsSUFBZixFQUFvQixNQUFNLE9BQUtDLFVBQUwsRUFBMUIsR0FBNkM7QUFDakRDLHNCQUFjSixLQUFLWCxNQUFMLENBQVlnQixHQUFaLENBQWlCLEdBQUQsaUJBQWUsZ0JBQS9CLENBRG1DO0FBRWpEQyxzQkFBY04sS0FBS1gsTUFBTCxDQUFZZ0IsR0FBWixDQUFpQixHQUFELGlCQUFlLGlCQUEvQjtBQUZtQyxPQUE3QyxDQUFOOztBQUtBLGFBQUtFLFlBQUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCaUI7QUErQmxCOztBQUVEOzs7QUFHTUMsWUFBTixHQUFvQjtBQUFBOztBQUFBO0FBQ2xCLFlBQU0sT0FBS2xCLFdBQUwsQ0FBaUJtQixPQUFqQixFQUFOOztBQUVBLGFBQUtsQixRQUFMLENBQWNtQixPQUFkOztBQUVBLFVBQUksT0FBS0MsYUFBVCxFQUF3QjtBQUN0QixlQUFLQSxhQUFMLENBQW1CRCxPQUFuQjtBQUNEO0FBQ0QsYUFBTyxPQUFLQyxhQUFaO0FBUmtCO0FBU25COztBQUVEOzs7QUFHQUosaUJBQWdCO0FBQ2QsU0FBS2pCLFdBQUwsQ0FBaUJzQixHQUFqQixDQUNFWixLQUFLYSxRQUFMLENBQWNELEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO0FBQ2xDLCtDQUF5QyxNQUFNO0FBQzdDLGFBQUtELGFBQUwsQ0FBbUJHLGdCQUFuQjtBQUNELE9BSGlDO0FBSWxDLDBDQUFvQyxNQUFNO0FBQ3hDLGFBQUtILGFBQUwsQ0FBbUJJLFdBQW5CO0FBQ0QsT0FOaUM7QUFPbEMsZ0RBQTBDLE1BQU07QUFDOUMsYUFBS0osYUFBTCxDQUFtQkssZ0JBQW5CO0FBQ0Q7QUFUaUMsS0FBcEMsQ0FERixFQVlFaEIsS0FBS2EsUUFBTCxDQUFjRCxHQUFkLENBQWtCLEtBQUtELGFBQUwsQ0FBbUJNLE9BQXJDLEVBQThDO0FBQzVDLHNCQUFnQixZQUFZO0FBQzFCO0FBQ0QsT0FIMkM7QUFJNUMsd0JBQWtCLFlBQVk7QUFDNUI7QUFDRCxPQU4yQztBQU81Qyx3QkFBa0IsWUFBWTtBQUM1QjtBQUNELE9BVDJDO0FBVTVDLHlCQUFtQixZQUFZO0FBQzdCO0FBQ0QsT0FaMkM7QUFhNUMsc0JBQWdCLFlBQVk7QUFDMUI7QUFDRDtBQWYyQyxLQUE5QyxDQVpGO0FBOEJEOztBQUVEOzs7OztBQUtNZCxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsVUFBSSxDQUFDLE9BQUtRLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQiw2QkFBckI7QUFDRDtBQUNELGFBQU8sT0FBS0EsYUFBWjtBQUprQjtBQUtuQjs7QUFFRDs7OztBQUlBTyxjQUFhO0FBQ1gsV0FBTyxLQUFLM0IsUUFBTCxDQUFjMkIsU0FBZCxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLHNCQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsV0FBT0EsSUFBUDtBQUNEOztBQTdJcUIsQztrQkFpSlRwQyxpQiIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluLWNvbnRhaW5lcic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QtY29udGFpbmVyJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFByb2plY3QgVmlld2VyIFBhY2thZ2VcbiAqL1xuY2xhc3MgUHJvamVjdFZpZXdlclBsdXMge1xuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZygnYWN0aXZhdGUnLCBzdGF0ZSk7XG4gICAgdGhpcy5jb25maWcgPSBDb25maWc7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZShzdGF0ZSk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRDaGFuZ2UoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2Uuc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXModGhpcy5kYXRhYmFzZS5jb250ZW50KTtcbiAgICAgIH0sXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuaW5pdGlhbGl6ZSgpO1xuXG4gICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGRzIHRoZSBwcm9qZWN0LXZpZXdlciBpdGVtIHRvIHRoZSBzcGVjaWZpZWQgZG9jay5cbiAgICogQHRvZG8gYWRkIGFsdGVybmF0aXZlIGFzIGEgcGFuZWwgKHNldHRpbmdzKVxuICAgKi9cbiAgYXN5bmMgYWRkVG9Eb2NrICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IHRoaXMuZ2V0SW50YW5jZSgpLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYClcbiAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG5cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9ic2VydmVQYW5lSXRlbXMoaXRlbSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ2xlZnQgb2JzZXJ2ZVBhbmVJdGVtcycsIGl0ZW0pXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub25EaWRBZGRQYW5lSXRlbShpdGVtID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygnbGVmdCBvbkRpZEFkZFBhbmVJdGVtJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZENoYW5nZVZpc2libGUodmlzaWJsZSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ2xlZnQgb25EaWRDaGFuZ2VWaXNpYmlsZScsIHZpc2libGUpXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9ic2VydmVQYW5lSXRlbXMoaXRlbSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ3JpZ2h0IG9ic2VydmVQYW5lSXRlbXMnLCBpdGVtKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZEFkZFBhbmVJdGVtKGl0ZW0gPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdyaWdodCBvbkRpZEFkZFBhbmVJdGVtJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdyaWdodCBvbkRpZENoYW5nZVZpc2liaWxlJywgdmlzaWJsZSlcbiAgICAvLyApO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20gcGFja2FnZSBsaWZlY3ljbGUgbWV0aG9kIGZvciBkZWFjdGl2YXRlIHRoZSBwYWNrYWdlLlxuICAgKi9cbiAgYXN5bmMgZGVhY3RpdmF0ZSAoKSB7XG4gICAgYXdhaXQgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLmRlc3Ryb3koKTtcblxuICAgIGlmICh0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYWxsIGV2ZW50cyBzdWNoIGFzIGNvbW1hbmRzLCBvYnNlcnZlcnMgYW5kIGVtaXR0ZXJzLlxuICAgKi9cbiAgaGFuZGxlRXZlbnRzICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKCdhdG9tLXdvcmtzcGFjZScsIHtcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLXZpc2liaWxpdHknOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3Byb2plY3Qtdmlld2VyLXBsdXM6dG9nZ2xlLWZvY3VzJzogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvamVjdFZpZXdlci50b2dnbGVGb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtc2VsZWN0LWxpc3QnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZVNlbGVjdExpc3QoKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLnByb2plY3RWaWV3ZXIuZWxlbWVudCwge1xuICAgICAgICAnY29yZTptb3ZlLXVwJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtdXAnLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOm1vdmUtZG93bicpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS1sZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjb3JlOmNvbmZpcm0nKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlIGlmIGFscmVhZHkgc2V0IG9yIGNyZWF0ZSBhIG5ldyBpZiBub3QuXG4gICAqIEB0b2RvIGltcHJvdmUgZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIFByb2plY3QgVmlld2VyIGluc3RhbmNlLlxuICAgKi9cbiAgYXN5bmMgZ2V0SW50YW5jZSAoKSB7XG4gICAgaWYgKCF0aGlzLnByb2plY3RWaWV3ZXIpIHtcbiAgICAgIHRoaXMucHJvamVjdFZpZXdlciA9IG5ldyBNYWluQ29udGFpbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByb2plY3RWaWV3ZXI7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSdzIGludGVybmFsIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhYmFzZS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBkZXNlcmlhbGl6ZURhdGFiYXNlIChkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Vmlld2VyUGx1cztcbiJdfQ==