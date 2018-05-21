'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _database = require('./../services/database');

var _database2 = _interopRequireDefault(_database);

var _base = require('./../constants/base');

var _main = require('./../components/main');

var _main2 = _interopRequireDefault(_main);

var _selectList = require('./select-list');

var _selectList2 = _interopRequireDefault(_selectList);

var _empty = require('./../components/empty');

var _empty2 = _interopRequireDefault(_empty);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

// import { ipcMain, webContents } from 'remote';
// import { ipcRenderer } from 'electron';

/**
 *
 */
let MainContainer = class MainContainer {
  /**
   *
   */
  constructor() {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    // const random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    //
    // ipcMain.on('pvx-channel', function (event, arg) {
    //   event.sender.send('pvx-res', `project #${random}`);
    // });
    //
    // ipcRenderer.on('pvx-res', function (event, arg) {
    //   devlog('pvx-res', arg);
    // });

    this.selectList = new _selectList2.default();
    this.database = new _database2.default();

    this.database.onDidChange(content => {
      this.update(content);
      this.selectList.setItems(content);
    });

    this.database.onDidError(() => {
      this.update();
    });

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.props = props;
      return _etch2.default.update(_this);
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {

    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      this.props ? _etch2.default.dom(_main2.default, this.props) : _etch2.default.dom(_empty2.default, { loading: this.database.loading })
    );
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.disposables.dispose();
      _this2.emitter.emit(_base.EMITTER.ERROR);
    })();
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy(callback) {
    return this.emitter.on(_base.EMITTER.ERROR, callback);
  }

  /**
   *
   * @returns {string} description
   */
  getURI() {
    return _base.DOCK_URI;
  }

  /**
   *
   * @returns {string} description
   */
  getTitle() {
    return _base.DOCK_TITLE;
  }

  /**
   *
   * @returns {string} description
   */
  getIconName() {
    return _base.DOCK_ICON;
  }

  /**
   *
   * @returns {number} description
   */
  getPreferredWidth() {
    return _base.DOCK_SIZE;
  }

  /**
   *
   * @returns {string} description
   */
  getDefaultLocation() {
    return atom.config.get(`${_base.PLUGIN_NAME}.dock.position`) || _base.ALLOWED_DOCKS[1];
  }

  /**
   *
   * @returns {Array} description
   */
  getAllowedLocations() {
    return _base.ALLOWED_DOCKS;
  }

  /**
   *
   * @returns {boolean} description
   */
  isPermanentDockItem() {
    return true;
  }

  /**
   *
   */
  toggleVisibility() {
    atom.workspace.toggle(this.getURI());
  }

  /**
   *
   */
  toggleFocus() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const dock = atom.workspace.paneContainerForItem(_this3);
      const pane = dock.getActivePane().getElement();

      if (_this3.activeElement && document.activeElement === pane) {
        _this3.activeElement.focus();
      } else {
        _this3.activeElement = document.activeElement;
        atom.workspace.open(_this3).then(function () {
          return _this3.element.focus();
        });
      }
    })();
  }

  /**
   *
   */
  toggleSelectList() {
    this.selectList.show();
  }

  /**
   *
   */
  openEditor() {
    return _asyncToGenerator(function* () {
      atom.workspace.open((yield new _editor2.default()));
    })();
  }
};
exports.default = MainContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJzZWxlY3RMaXN0IiwiU2VsZWN0TGlzdCIsImRhdGFiYXNlIiwiRGF0YWJhc2UiLCJvbkRpZENoYW5nZSIsImNvbnRlbnQiLCJ1cGRhdGUiLCJzZXRJdGVtcyIsIm9uRGlkRXJyb3IiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwicmVuZGVyIiwibG9hZGluZyIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiZW1pdCIsIkVNSVRURVIiLCJFUlJPUiIsIm9uRGlkRGVzdHJveSIsImNhbGxiYWNrIiwib24iLCJnZXRVUkkiLCJET0NLX1VSSSIsImdldFRpdGxlIiwiRE9DS19USVRMRSIsImdldEljb25OYW1lIiwiRE9DS19JQ09OIiwiZ2V0UHJlZmVycmVkV2lkdGgiLCJET0NLX1NJWkUiLCJnZXREZWZhdWx0TG9jYXRpb24iLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwiUExVR0lOX05BTUUiLCJBTExPV0VEX0RPQ0tTIiwiZ2V0QWxsb3dlZExvY2F0aW9ucyIsImlzUGVybWFuZW50RG9ja0l0ZW0iLCJ0b2dnbGVWaXNpYmlsaXR5Iiwid29ya3NwYWNlIiwidG9nZ2xlIiwidG9nZ2xlRm9jdXMiLCJkb2NrIiwicGFuZUNvbnRhaW5lckZvckl0ZW0iLCJwYW5lIiwiZ2V0QWN0aXZlUGFuZSIsImdldEVsZW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiZG9jdW1lbnQiLCJmb2N1cyIsIm9wZW4iLCJ0aGVuIiwiZWxlbWVudCIsInRvZ2dsZVNlbGVjdExpc3QiLCJzaG93Iiwib3BlbkVkaXRvciIsIkVkaXRvckNvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUtBOztBQVNBOzs7O0FBQ0E7Ozs7QUFD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QUNBaEIsYUFBS1EsU0FBTCxDQUFlVyxJQUFmLENBQW9CLE1BQXBCLEVBQTBCQyxJQUExQixDQUErQjtBQUFBLGlCQUFNLE9BQUtDLE9BQUwsQ0FBYUgsS0FBYixFQUFOO0FBQUEsU0FBL0I7QUFDRDtBQVZrQjtBQVdwQjs7QUFFRDs7O0FBR0FJLHFCQUFvQjtBQUNsQixTQUFLckQsVUFBTCxDQUFnQnNELElBQWhCO0FBQ0Q7O0FBRUQ7OztBQUdNQyxZQUFOLEdBQW9CO0FBQUE7QUFDbEJ4QixXQUFLUSxTQUFMLENBQWVXLElBQWYsRUFBb0IsTUFBTSxJQUFJTSxnQkFBSixFQUExQjtBQURrQjtBQUVuQjtBQXRLaUIsQztrQkF5S0w5RCxhIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcblxuLy8gaW1wb3J0IHsgaXBjTWFpbiwgd2ViQ29udGVudHMgfSBmcm9tICdyZW1vdGUnO1xuLy8gaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7XG4gIERPQ0tfSUNPTixcbiAgRE9DS19USVRMRSxcbiAgRE9DS19VUkksXG4gIERPQ0tfU0laRSxcbiAgUExVR0lOX05BTUUsXG4gIEFMTE9XRURfRE9DS1MsXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgUHJvamVjdFZpZXdlckNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL3NlbGVjdC1saXN0JztcbmltcG9ydCBFbXB0eUNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZW1wdHknO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2VkaXRvcic7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICAvLyBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNSAtIDEgKyAxKSkgKyAxO1xuICAgIC8vXG4gICAgLy8gaXBjTWFpbi5vbigncHZ4LWNoYW5uZWwnLCBmdW5jdGlvbiAoZXZlbnQsIGFyZykge1xuICAgIC8vICAgZXZlbnQuc2VuZGVyLnNlbmQoJ3B2eC1yZXMnLCBgcHJvamVjdCAjJHtyYW5kb219YCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBpcGNSZW5kZXJlci5vbigncHZ4LXJlcycsIGZ1bmN0aW9uIChldmVudCwgYXJnKSB7XG4gICAgLy8gICBkZXZsb2coJ3B2eC1yZXMnLCBhcmcpO1xuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoY29udGVudCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXMoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkRXJyb3IoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9KTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLXBhbmVsIHByb2plY3Qtdmlld2VyLXBsdXNcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnByb3BzID9cbiAgICAgICAgICAoPFByb2plY3RWaWV3ZXJDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+KSA6XG4gICAgICAgICAgKDxFbXB0eUNvbXBvbmVudCBsb2FkaW5nPXt0aGlzLmRhdGFiYXNlLmxvYWRpbmd9IC8+KVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChFTUlUVEVSLkVSUk9SKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZERlc3Ryb3kgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbihFTUlUVEVSLkVSUk9SLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIERPQ0tfU0laRTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgQUxMT1dFRF9ET0NLU1sxXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9ET0NLUztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGlzUGVybWFuZW50RG9ja0l0ZW0gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBjb25zdCBkb2NrID0gYXRvbS53b3Jrc3BhY2UucGFuZUNvbnRhaW5lckZvckl0ZW0odGhpcyk7XG4gICAgY29uc3QgcGFuZSA9IGRvY2suZ2V0QWN0aXZlUGFuZSgpLmdldEVsZW1lbnQoKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcGFuZSkge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcykudGhlbigoKSA9PiB0aGlzLmVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB0b2dnbGVTZWxlY3RMaXN0ICgpIHtcbiAgICB0aGlzLnNlbGVjdExpc3Quc2hvdygpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBvcGVuRWRpdG9yICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGF3YWl0IG5ldyBFZGl0b3JDb250YWluZXIoKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbnRhaW5lcjtcbiJdfQ==