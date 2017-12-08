Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

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
      console.log('activate', state);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJkaXNwb3NhYmxlcyIsImRhdGFiYXNlIiwiY29udGV4dFN3aXRjaGVyIiwic2VsZWN0TGlzdCIsIm9uRGlkQ2hhbmdlIiwic2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCIsInNldEl0ZW1zIiwiY29udGVudCIsImluaXRpYWxpemUiLCJhZGRUb0RvY2siLCJjb25maWciLCJhdG9tIiwid29ya3NwYWNlIiwib3BlbiIsImdldEludGFuY2UiLCJhY3RpdmF0ZUl0ZW0iLCJnZXQiLCJhY3RpdmF0ZVBhbmUiLCJoYW5kbGVFdmVudHMiLCJkZWFjdGl2YXRlIiwiZGlzcG9zZSIsImRlc3Ryb3kiLCJwcm9qZWN0Vmlld2VyIiwiYWRkIiwiY29tbWFuZHMiLCJ0b2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlRm9jdXMiLCJ0b2dnbGVTZWxlY3RMaXN0IiwiZWxlbWVudCIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplRGF0YWJhc2UiLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7O0FBRXRCOzs7O0FBSU1DLFVBQU4sQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQUE7O0FBQUE7QUFDckJDLGNBQVFDLEdBQVIsQ0FBWSxVQUFaLEVBQXdCRixLQUF4QjtBQUNBLFlBQUtHLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsWUFBS0MsUUFBTCxHQUFnQix1QkFBYUosS0FBYixDQUFoQjtBQUNBLFlBQUtLLGVBQUwsR0FBdUIsK0JBQXZCO0FBQ0EsWUFBS0MsVUFBTCxHQUFrQixtQ0FBbEI7O0FBRUEsWUFBS0YsUUFBTCxDQUFjRyxXQUFkLENBQ0UsWUFBTTtBQUNKLGNBQUtILFFBQUwsQ0FBY0kseUJBQWQ7QUFDQSxjQUFLRixVQUFMLENBQWdCRyxRQUFoQixDQUF5QixNQUFLTCxRQUFMLENBQWNNLE9BQXZDO0FBQ0QsT0FKSCxFQUtFLElBTEY7O0FBUUEsWUFBS04sUUFBTCxDQUFjTyxVQUFkOztBQUVBLFlBQUtDLFNBQUw7QUFqQnFCO0FBa0J0Qjs7QUFFRDs7O0FBR0EsTUFBSUMsTUFBSixHQUFjO0FBQ1o7QUFDRDs7QUFFRDs7OztBQUlNRCxXQUFOLEdBQW1CO0FBQUE7O0FBQUE7QUFDakIsWUFBTUUsS0FBS0MsU0FBTCxDQUFlQyxJQUFmLEVBQW9CLE1BQU0sT0FBS0MsVUFBTCxFQUExQixHQUE2QztBQUNqREMsc0JBQWNKLEtBQUtELE1BQUwsQ0FBWU0sR0FBWixDQUFpQixHQUFELGlCQUFlLGdCQUEvQixDQURtQztBQUVqREMsc0JBQWNOLEtBQUtELE1BQUwsQ0FBWU0sR0FBWixDQUFpQixHQUFELGlCQUFlLGlCQUEvQjtBQUZtQyxPQUE3QyxDQUFOOztBQUtBLGFBQUtFLFlBQUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTlCaUI7QUErQmxCOztBQUVEOzs7QUFHTUMsWUFBTixHQUFvQjtBQUFBOztBQUFBO0FBQ2xCLFlBQU0sT0FBS25CLFdBQUwsQ0FBaUJvQixPQUFqQixFQUFOOztBQUVBLGFBQUtuQixRQUFMLENBQWNvQixPQUFkOztBQUVBLFVBQUksT0FBS0MsYUFBVCxFQUF3QjtBQUN0QixlQUFLQSxhQUFMLENBQW1CRCxPQUFuQjtBQUNEO0FBQ0QsYUFBTyxPQUFLQyxhQUFaO0FBUmtCO0FBU25COztBQUVEOzs7QUFHQUosaUJBQWdCO0FBQ2QsU0FBS2xCLFdBQUwsQ0FBaUJ1QixHQUFqQixDQUNFWixLQUFLYSxRQUFMLENBQWNELEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQW9DO0FBQ2xDLCtDQUF5QyxNQUFNO0FBQzdDLGFBQUtELGFBQUwsQ0FBbUJHLGdCQUFuQjtBQUNELE9BSGlDO0FBSWxDLDBDQUFvQyxNQUFNO0FBQ3hDLGFBQUtILGFBQUwsQ0FBbUJJLFdBQW5CO0FBQ0QsT0FOaUM7QUFPbEMsZ0RBQTBDLE1BQU07QUFDOUMsYUFBS0osYUFBTCxDQUFtQkssZ0JBQW5CO0FBQ0Q7QUFUaUMsS0FBcEMsQ0FERixFQVlFaEIsS0FBS2EsUUFBTCxDQUFjRCxHQUFkLENBQWtCLEtBQUtELGFBQUwsQ0FBbUJNLE9BQXJDLEVBQThDO0FBQzVDLHNCQUFnQixZQUFZO0FBQzFCO0FBQ0QsT0FIMkM7QUFJNUMsd0JBQWtCLFlBQVk7QUFDNUI7QUFDRCxPQU4yQztBQU81Qyx3QkFBa0IsWUFBWTtBQUM1QjtBQUNELE9BVDJDO0FBVTVDLHlCQUFtQixZQUFZO0FBQzdCO0FBQ0QsT0FaMkM7QUFhNUMsc0JBQWdCLFlBQVk7QUFDMUI7QUFDRDtBQWYyQyxLQUE5QyxDQVpGO0FBOEJEOztBQUVEOzs7OztBQUtNZCxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsVUFBSSxDQUFDLE9BQUtRLGFBQVYsRUFBeUI7QUFDdkIsZUFBS0EsYUFBTCxHQUFxQiw2QkFBckI7QUFDRDtBQUNELGFBQU8sT0FBS0EsYUFBWjtBQUprQjtBQUtuQjs7QUFFRDs7OztBQUlBTyxjQUFhO0FBQ1gsV0FBTyxLQUFLNUIsUUFBTCxDQUFjNEIsU0FBZCxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLHNCQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsV0FBT0EsSUFBUDtBQUNEOztBQW5KcUIsQztrQkF1SlRwQyxpQiIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcbmltcG9ydCBNYWluQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVycy9tYWluLWNvbnRhaW5lcic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL2NvbnRhaW5lcnMvc2VsZWN0LWxpc3QtY29udGFpbmVyJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFByb2plY3QgVmlld2VyIFBhY2thZ2VcbiAqL1xuY2xhc3MgUHJvamVjdFZpZXdlclBsdXMge1xuXG4gIC8qKlxuICAgKiBBdG9tIHBhY2thZ2UgbGlmZWN5Y2xlIG1ldGhvZCBmb3IgYWN0aXZhdGluZyB0aGUgcGFja2FnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXSAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyBhY3RpdmF0ZSAoc3RhdGUpIHtcbiAgICBjb25zb2xlLmxvZygnYWN0aXZhdGUnLCBzdGF0ZSk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZShzdGF0ZSk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRDaGFuZ2UoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuZGF0YWJhc2Uuc2V0SW5pdGlhbFNlbGVjdGVkUHJvamVjdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXModGhpcy5kYXRhYmFzZS5jb250ZW50KTtcbiAgICAgIH0sXG4gICAgICB0cnVlXG4gICAgKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuaW5pdGlhbGl6ZSgpO1xuXG4gICAgdGhpcy5hZGRUb0RvY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgcGFja2FnZSBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXQgY29uZmlnICgpIHtcbiAgICByZXR1cm4gQ29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZHMgdGhlIHByb2plY3Qtdmlld2VyIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBkb2NrLlxuICAgKiBAdG9kbyBhZGQgYWx0ZXJuYXRpdmUgYXMgYSBwYW5lbCAoc2V0dGluZ3MpXG4gICAqL1xuICBhc3luYyBhZGRUb0RvY2sgKCkge1xuICAgIGF3YWl0IGF0b20ud29ya3NwYWNlLm9wZW4oYXdhaXQgdGhpcy5nZXRJbnRhbmNlKCksIHtcbiAgICAgIGFjdGl2YXRlSXRlbTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzQWN0aXZlYCksXG4gICAgICBhY3RpdmF0ZVBhbmU6IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc1Zpc2libGVgKVxuICAgIH0pO1xuXG4gICAgdGhpcy5oYW5kbGVFdmVudHMoKTtcblxuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldExlZnREb2NrKCkub2JzZXJ2ZVBhbmVJdGVtcyhpdGVtID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygnbGVmdCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0TGVmdERvY2soKS5vbkRpZEFkZFBhbmVJdGVtKGl0ZW0gPT5cbiAgICAvLyAgIGNvbnNvbGUubG9nKCdsZWZ0IG9uRGlkQWRkUGFuZUl0ZW0nLCBpdGVtKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRMZWZ0RG9jaygpLm9uRGlkQ2hhbmdlVmlzaWJsZSh2aXNpYmxlID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygnbGVmdCBvbkRpZENoYW5nZVZpc2liaWxlJywgdmlzaWJsZSlcbiAgICAvLyApO1xuICAgIC8vXG4gICAgLy8gYXRvbS53b3Jrc3BhY2UuZ2V0UmlnaHREb2NrKCkub2JzZXJ2ZVBhbmVJdGVtcyhpdGVtID0+XG4gICAgLy8gICBjb25zb2xlLmxvZygncmlnaHQgb2JzZXJ2ZVBhbmVJdGVtcycsIGl0ZW0pXG4gICAgLy8gKTtcbiAgICAvL1xuICAgIC8vIGF0b20ud29ya3NwYWNlLmdldFJpZ2h0RG9jaygpLm9uRGlkQWRkUGFuZUl0ZW0oaXRlbSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ3JpZ2h0IG9uRGlkQWRkUGFuZUl0ZW0nLCBpdGVtKVxuICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyBhdG9tLndvcmtzcGFjZS5nZXRSaWdodERvY2soKS5vbkRpZENoYW5nZVZpc2libGUodmlzaWJsZSA9PlxuICAgIC8vICAgY29uc29sZS5sb2coJ3JpZ2h0IG9uRGlkQ2hhbmdlVmlzaWJpbGUnLCB2aXNpYmxlKVxuICAgIC8vICk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuZGVzdHJveSgpO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZUZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1zZWxlY3QtbGlzdCc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMucHJvamVjdFZpZXdlci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS11cCcsIHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6bW92ZS1kb3duJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY29yZTptb3ZlLXJpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NvcmU6Y29uZmlybScpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UgaWYgYWxyZWFkeSBzZXQgb3IgY3JlYXRlIGEgbmV3IGlmIG5vdC5cbiAgICogQHRvZG8gaW1wcm92ZSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgUHJvamVjdCBWaWV3ZXIgaW5zdGFuY2UuXG4gICAqL1xuICBhc3luYyBnZXRJbnRhbmNlICgpIHtcbiAgICBpZiAoIXRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyID0gbmV3IE1haW5Db250YWluZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdG9tJ3MgaW50ZXJuYWwgc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRlc2VyaWFsaXplRGF0YWJhc2UgKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJQbHVzO1xuIl19