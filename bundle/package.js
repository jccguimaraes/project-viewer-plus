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
        _this4.projectViewer = new _main2.default();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9wYWNrYWdlLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJQbHVzIiwiYWN0aXZhdGUiLCJzdGF0ZSIsImRpc3Bvc2FibGVzIiwiZGF0YWJhc2UiLCJjb250ZXh0U3dpdGNoZXIiLCJzZWxlY3RMaXN0Iiwib25EaWRDaGFuZ2UiLCJzZXRJbml0aWFsU2VsZWN0ZWRQcm9qZWN0Iiwic2V0SXRlbXMiLCJjb250ZW50IiwiaW5pdGlhbGl6ZSIsImFkZFRvRG9jayIsImNvbmZpZyIsImF0b20iLCJ3b3Jrc3BhY2UiLCJvcGVuIiwiZ2V0SW50YW5jZSIsImFjdGl2YXRlSXRlbSIsImdldCIsImFjdGl2YXRlUGFuZSIsImhhbmRsZUV2ZW50cyIsImdldExlZnREb2NrIiwib2JzZXJ2ZVBhbmVJdGVtcyIsIml0ZW0iLCJvbkRpZEFkZFBhbmVJdGVtIiwib25EaWRDaGFuZ2VWaXNpYmxlIiwidmlzaWJsZSIsImdldFJpZ2h0RG9jayIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiZGVzdHJveSIsInByb2plY3RWaWV3ZXIiLCJhZGQiLCJjb21tYW5kcyIsIm9wZW5GaWxlIiwib3BlbkVkaXRvciIsInRvZ2dsZVZpc2liaWxpdHkiLCJ0b2dnbGVGb2N1cyIsInRvZ2dsZVNlbGVjdExpc3QiLCJlbGVtZW50Iiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemVEYXRhYmFzZSIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7O0lBR01BLGlCLEdBQU4sTUFBTUEsaUJBQU4sQ0FBd0I7QUFDdEI7Ozs7QUFJTUMsVUFBTixDQUFnQkMsS0FBaEIsRUFBdUI7QUFBQTs7QUFBQTtBQUNyQiw0QkFBTyxVQUFQLEVBQW1CQSxLQUFuQjtBQUNBLFlBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsWUFBS0MsUUFBTCxHQUFnQix1QkFBYUYsS0FBYixDQUFoQjtBQUNBLFlBQUtHLGVBQUwsR0FBdUIsK0JBQXZCO0FBQ0EsWUFBS0MsVUFBTCxHQUFrQiwwQkFBbEI7O0FBRUEsWUFBS0YsUUFBTCxDQUFjRyxXQUFkLENBQTBCLFlBQU07QUFDOUIsY0FBS0gsUUFBTCxDQUFjSSx5QkFBZDtBQUNBLGNBQUtGLFVBQUwsQ0FBZ0JHLFFBQWhCLENBQXlCLE1BQUtMLFFBQUwsQ0FBY00sT0FBdkM7QUFDRCxPQUhELEVBR0csSUFISDs7QUFLQSxZQUFLTixRQUFMLENBQWNPLFVBQWQ7O0FBRUEsWUFBS0MsU0FBTDtBQWRxQjtBQWV0Qjs7QUFFRDs7O0FBR0EsTUFBSUMsTUFBSixHQUFjO0FBQ1o7QUFDRDs7QUFFRDs7OztBQUlNRCxXQUFOLEdBQW1CO0FBQUE7O0FBQUE7QUFDakIsWUFBTUUsS0FBS0MsU0FBTCxDQUFlQyxJQUFmLEVBQW9CLE1BQU0sT0FBS0MsVUFBTCxFQUExQixHQUE2QztBQUNqREMsc0JBQWNKLEtBQUtELE1BQUwsQ0FBWU0sR0FBWixDQUFpQixHQUFELGlCQUFlLGdCQUEvQixDQURtQztBQUVqREMsc0JBQWNOLEtBQUtELE1BQUwsQ0FBWU0sR0FBWixDQUFpQixHQUFELGlCQUFlLGlCQUEvQjtBQUZtQyxPQUE3QyxDQUFOOztBQUtBLGFBQUtFLFlBQUw7O0FBRUFQLFdBQUtDLFNBQUwsQ0FDR08sV0FESCxHQUVHQyxnQkFGSCxDQUVvQjtBQUFBLGVBQVEsc0JBQU8sdUJBQVAsRUFBZ0NDLElBQWhDLENBQVI7QUFBQSxPQUZwQjs7QUFJQVYsV0FBS0MsU0FBTCxDQUNHTyxXQURILEdBRUdHLGdCQUZILENBRW9CO0FBQUEsZUFBUSxzQkFBTyx1QkFBUCxFQUFnQ0QsSUFBaEMsQ0FBUjtBQUFBLE9BRnBCOztBQUlBVixXQUFLQyxTQUFMLENBQ0dPLFdBREgsR0FFR0ksa0JBRkgsQ0FFc0I7QUFBQSxlQUNsQixzQkFBTywwQkFBUCxFQUFtQ0MsT0FBbkMsQ0FEa0I7QUFBQSxPQUZ0Qjs7QUFNQWIsV0FBS0MsU0FBTCxDQUNHYSxZQURILEdBRUdMLGdCQUZILENBRW9CO0FBQUEsZUFBUSxzQkFBTyx3QkFBUCxFQUFpQ0MsSUFBakMsQ0FBUjtBQUFBLE9BRnBCOztBQUlBVixXQUFLQyxTQUFMLENBQ0dhLFlBREgsR0FFR0gsZ0JBRkgsQ0FFb0I7QUFBQSxlQUFRLHNCQUFPLHdCQUFQLEVBQWlDRCxJQUFqQyxDQUFSO0FBQUEsT0FGcEI7O0FBSUFWLFdBQUtDLFNBQUwsQ0FDR2EsWUFESCxHQUVHRixrQkFGSCxDQUVzQjtBQUFBLGVBQ2xCLHNCQUFPLDJCQUFQLEVBQW9DQyxPQUFwQyxDQURrQjtBQUFBLE9BRnRCO0FBOUJpQjtBQW1DbEI7O0FBRUQ7OztBQUdNRSxZQUFOLEdBQW9CO0FBQUE7O0FBQUE7QUFDbEIsWUFBTSxPQUFLMUIsV0FBTCxDQUFpQjJCLE9BQWpCLEVBQU47O0FBRUEsYUFBSzFCLFFBQUwsQ0FBYzJCLE9BQWQ7O0FBRUEsVUFBSSxPQUFLQyxhQUFULEVBQXdCO0FBQ3RCLGVBQUtBLGFBQUwsQ0FBbUJELE9BQW5CO0FBQ0Q7QUFDRCxhQUFPLE9BQUtDLGFBQVo7QUFSa0I7QUFTbkI7O0FBRUQ7OztBQUdBWCxpQkFBZ0I7QUFDZCxTQUFLbEIsV0FBTCxDQUFpQjhCLEdBQWpCLENBQ0VuQixLQUFLb0IsUUFBTCxDQUFjRCxHQUFkLENBQWtCLGdCQUFsQixFQUFvQztBQUNsQyxnREFBMEMsTUFBTTtBQUM5QyxhQUFLN0IsUUFBTCxDQUFjK0IsUUFBZDtBQUNELE9BSGlDO0FBSWxDLHlDQUFtQyxNQUFNO0FBQ3ZDLGFBQUtILGFBQUwsQ0FBbUJJLFVBQW5CO0FBQ0QsT0FOaUM7QUFPbEMsK0NBQXlDLE1BQU07QUFDN0MsYUFBS0osYUFBTCxDQUFtQkssZ0JBQW5CO0FBQ0QsT0FUaUM7QUFVbEMsMENBQW9DLE1BQU07QUFDeEMsYUFBS0wsYUFBTCxDQUFtQk0sV0FBbkI7QUFDRCxPQVppQztBQWFsQyxnREFBMEMsTUFBTTtBQUM5QyxhQUFLTixhQUFMLENBQW1CTyxnQkFBbkI7QUFDRDtBQWZpQyxLQUFwQyxDQURGLEVBa0JFekIsS0FBS29CLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQixLQUFLRCxhQUFMLENBQW1CUSxPQUFyQyxFQUE4QztBQUM1QyxzQkFBZ0IsWUFBWTtBQUMxQiw4QkFBTyxjQUFQLEVBQXVCLElBQXZCO0FBQ0QsT0FIMkM7QUFJNUMsd0JBQWtCLFlBQVk7QUFDNUIsOEJBQU8sZ0JBQVA7QUFDRCxPQU4yQztBQU81Qyx3QkFBa0IsWUFBWTtBQUM1Qiw4QkFBTyxnQkFBUDtBQUNELE9BVDJDO0FBVTVDLHlCQUFtQixZQUFZO0FBQzdCLDhCQUFPLGlCQUFQO0FBQ0QsT0FaMkM7QUFhNUMsc0JBQWdCLFlBQVk7QUFDMUIsOEJBQU8sY0FBUDtBQUNEO0FBZjJDLEtBQTlDLENBbEJGO0FBb0NEOztBQUVEOzs7OztBQUtNdkIsWUFBTixHQUFvQjtBQUFBOztBQUFBO0FBQ2xCLFVBQUksQ0FBQyxPQUFLZSxhQUFWLEVBQXlCO0FBQ3ZCLGVBQUtBLGFBQUwsR0FBcUIsb0JBQXJCO0FBQ0Q7QUFDRCxhQUFPLE9BQUtBLGFBQVo7QUFKa0I7QUFLbkI7O0FBRUQ7Ozs7QUFJQVMsY0FBYTtBQUNYLFdBQU8sS0FBS3JDLFFBQUwsQ0FBY3FDLFNBQWQsRUFBUDtBQUNEOztBQUVEOzs7OztBQUtBQyxzQkFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLFdBQU9BLElBQVA7QUFDRDtBQXpKcUIsQztrQkE0SlQzQyxpQiIsImZpbGUiOiJwYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuL2NvbnN0YW50cy9jb25maWcnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vc2VydmljZXMvZGF0YWJhc2UnO1xuaW1wb3J0IENvbnRleHRTd2l0Y2hlciBmcm9tICcuL3NlcnZpY2VzL2NvbnRleHQtc3dpdGNoZXInO1xuaW1wb3J0IE1haW5Db250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb250YWluZXJzL3NlbGVjdC1saXN0JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFByb2plY3QgVmlld2VyIFBhY2thZ2VcbiAqL1xuY2xhc3MgUHJvamVjdFZpZXdlclBsdXMge1xuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGFjdGl2YXRpbmcgdGhlIHBhY2thZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFtzdGF0ZV0gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgYWN0aXZhdGUgKHN0YXRlKSB7XG4gICAgZGV2bG9nKCdhY3RpdmF0ZScsIHN0YXRlKTtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKHN0YXRlKTtcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlciA9IG5ldyBDb250ZXh0U3dpdGNoZXIoKTtcbiAgICB0aGlzLnNlbGVjdExpc3QgPSBuZXcgU2VsZWN0TGlzdCgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZENoYW5nZSgoKSA9PiB7XG4gICAgICB0aGlzLmRhdGFiYXNlLnNldEluaXRpYWxTZWxlY3RlZFByb2plY3QoKTtcbiAgICAgIHRoaXMuc2VsZWN0TGlzdC5zZXRJdGVtcyh0aGlzLmRhdGFiYXNlLmNvbnRlbnQpO1xuICAgIH0sIHRydWUpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLmFkZFRvRG9jaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBwYWNrYWdlIGNvbmZpZ3VyYXRpb25cbiAgICovXG4gIGdldCBjb25maWcgKCkge1xuICAgIHJldHVybiBDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYWRkcyB0aGUgcHJvamVjdC12aWV3ZXIgaXRlbSB0byB0aGUgc3BlY2lmaWVkIGRvY2suXG4gICAqIEB0b2RvIGFkZCBhbHRlcm5hdGl2ZSBhcyBhIHBhbmVsIChzZXR0aW5ncylcbiAgICovXG4gIGFzeW5jIGFkZFRvRG9jayAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCB0aGlzLmdldEludGFuY2UoKSwge1xuICAgICAgYWN0aXZhdGVJdGVtOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNBY3RpdmVgKSxcbiAgICAgIGFjdGl2YXRlUGFuZTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzVmlzaWJsZWApXG4gICAgfSk7XG5cbiAgICB0aGlzLmhhbmRsZUV2ZW50cygpO1xuXG4gICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgIC5nZXRMZWZ0RG9jaygpXG4gICAgICAub2JzZXJ2ZVBhbmVJdGVtcyhpdGVtID0+IGRldmxvZygnbGVmdCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSkpO1xuXG4gICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgIC5nZXRMZWZ0RG9jaygpXG4gICAgICAub25EaWRBZGRQYW5lSXRlbShpdGVtID0+IGRldmxvZygnbGVmdCBvbkRpZEFkZFBhbmVJdGVtJywgaXRlbSkpO1xuXG4gICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgIC5nZXRMZWZ0RG9jaygpXG4gICAgICAub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT5cbiAgICAgICAgZGV2bG9nKCdsZWZ0IG9uRGlkQ2hhbmdlVmlzaWJpbGUnLCB2aXNpYmxlKVxuICAgICAgKTtcblxuICAgIGF0b20ud29ya3NwYWNlXG4gICAgICAuZ2V0UmlnaHREb2NrKClcbiAgICAgIC5vYnNlcnZlUGFuZUl0ZW1zKGl0ZW0gPT4gZGV2bG9nKCdyaWdodCBvYnNlcnZlUGFuZUl0ZW1zJywgaXRlbSkpO1xuXG4gICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgIC5nZXRSaWdodERvY2soKVxuICAgICAgLm9uRGlkQWRkUGFuZUl0ZW0oaXRlbSA9PiBkZXZsb2coJ3JpZ2h0IG9uRGlkQWRkUGFuZUl0ZW0nLCBpdGVtKSk7XG5cbiAgICBhdG9tLndvcmtzcGFjZVxuICAgICAgLmdldFJpZ2h0RG9jaygpXG4gICAgICAub25EaWRDaGFuZ2VWaXNpYmxlKHZpc2libGUgPT5cbiAgICAgICAgZGV2bG9nKCdyaWdodCBvbkRpZENoYW5nZVZpc2liaWxlJywgdmlzaWJsZSlcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXRvbSBwYWNrYWdlIGxpZmVjeWNsZSBtZXRob2QgZm9yIGRlYWN0aXZhdGUgdGhlIHBhY2thZ2UuXG4gICAqL1xuICBhc3luYyBkZWFjdGl2YXRlICgpIHtcbiAgICBhd2FpdCB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcblxuICAgIHRoaXMuZGF0YWJhc2UuZGVzdHJveSgpO1xuXG4gICAgaWYgKHRoaXMucHJvamVjdFZpZXdlcikge1xuICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMucHJvamVjdFZpZXdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbGwgZXZlbnRzIHN1Y2ggYXMgY29tbWFuZHMsIG9ic2VydmVycyBhbmQgZW1pdHRlcnMuXG4gICAqL1xuICBoYW5kbGVFdmVudHMgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQoJ2F0b20td29ya3NwYWNlJywge1xuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWRhdGFiYXNlLWZpbGUnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5vcGVuRmlsZSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czpvcGVuLWVkaXRvcic6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIub3BlbkVkaXRvcigpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtdmlzaWJpbGl0eSc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9LFxuICAgICAgICAncHJvamVjdC12aWV3ZXItcGx1czp0b2dnbGUtZm9jdXMnOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9qZWN0Vmlld2VyLnRvZ2dsZUZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwcm9qZWN0LXZpZXdlci1wbHVzOnRvZ2dsZS1zZWxlY3QtbGlzdCc6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2plY3RWaWV3ZXIudG9nZ2xlU2VsZWN0TGlzdCgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIGF0b20uY29tbWFuZHMuYWRkKHRoaXMucHJvamVjdFZpZXdlci5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGV2bG9nKCdjb3JlOm1vdmUtdXAnLCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWRvd24nKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTptb3ZlLWxlZnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZXZsb2coJ2NvcmU6bW92ZS1yaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRldmxvZygnY29yZTpjb25maXJtJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZSBpZiBhbHJlYWR5IHNldCBvciBjcmVhdGUgYSBuZXcgaWYgbm90LlxuICAgKiBAdG9kbyBpbXByb3ZlIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBQcm9qZWN0IFZpZXdlciBpbnN0YW5jZS5cbiAgICovXG4gIGFzeW5jIGdldEludGFuY2UgKCkge1xuICAgIGlmICghdGhpcy5wcm9qZWN0Vmlld2VyKSB7XG4gICAgICB0aGlzLnByb2plY3RWaWV3ZXIgPSBuZXcgTWFpbkNvbnRhaW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0Vmlld2VyO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YWJhc2Uuc2VyaWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGVzZXJpYWxpemVEYXRhYmFzZSAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJQbHVzO1xuIl19