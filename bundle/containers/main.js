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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJlbWl0dGVyIiwic2VsZWN0TGlzdCIsImRhdGFiYXNlIiwib25EaWRDaGFuZ2UiLCJjb250ZW50IiwidXBkYXRlIiwic2V0SXRlbXMiLCJvbkRpZEVycm9yIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwicmVuZGVyIiwibG9hZGluZyIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiZW1pdCIsIkVSUk9SIiwib25EaWREZXN0cm95IiwiY2FsbGJhY2siLCJvbiIsImdldFVSSSIsImdldFRpdGxlIiwiZ2V0SWNvbk5hbWUiLCJnZXRQcmVmZXJyZWRXaWR0aCIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJ3b3Jrc3BhY2UiLCJ0b2dnbGUiLCJ0b2dnbGVGb2N1cyIsImRvY2siLCJwYW5lQ29udGFpbmVyRm9ySXRlbSIsInBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiZ2V0RWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJkb2N1bWVudCIsImZvY3VzIiwib3BlbiIsInRoZW4iLCJlbGVtZW50IiwidG9nZ2xlU2VsZWN0TGlzdCIsInNob3ciLCJvcGVuRWRpdG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBS0E7O0FBU0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FyQkE7O0FBTUE7QUFDQTs7QUFnQkE7OztJQUdNQSxhLEdBQU4sTUFBTUEsYUFBTixDQUFvQjtBQUNsQjs7O0FBR0FDLGdCQUFlO0FBQ2IsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsbUJBQWY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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c3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5cbi8vIGltcG9ydCB7IGlwY01haW4sIHdlYkNvbnRlbnRzIH0gZnJvbSAncmVtb3RlJztcbi8vIGltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQge1xuICBET0NLX0lDT04sXG4gIERPQ0tfVElUTEUsXG4gIERPQ0tfVVJJLFxuICBET0NLX1NJWkUsXG4gIFBMVUdJTl9OQU1FLFxuICBBTExPV0VEX0RPQ0tTLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IFByb2plY3RWaWV3ZXJDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL21haW4nO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgRW1wdHlDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL2VtcHR5JztcbmltcG9ydCBFZGl0b3JDb250YWluZXIgZnJvbSAnLi9lZGl0b3InO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIE1haW5Db250YWluZXIge1xuICAvKipcbiAgICpcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgLy8gY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDUgLSAxICsgMSkpICsgMTtcbiAgICAvL1xuICAgIC8vIGlwY01haW4ub24oJ3B2eC1jaGFubmVsJywgZnVuY3Rpb24gKGV2ZW50LCBhcmcpIHtcbiAgICAvLyAgIGV2ZW50LnNlbmRlci5zZW5kKCdwdngtcmVzJywgYHByb2plY3QgIyR7cmFuZG9tfWApO1xuICAgIC8vIH0pO1xuICAgIC8vXG4gICAgLy8gaXBjUmVuZGVyZXIub24oJ3B2eC1yZXMnLCBmdW5jdGlvbiAoZXZlbnQsIGFyZykge1xuICAgIC8vICAgZGV2bG9nKCdwdngtcmVzJywgYXJnKTtcbiAgICAvLyB9KTtcblxuICAgIHRoaXMuc2VsZWN0TGlzdCA9IG5ldyBTZWxlY3RMaXN0KCk7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZENoYW5nZShjb250ZW50ID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKGNvbnRlbnQpO1xuICAgICAgdGhpcy5zZWxlY3RMaXN0LnNldEl0ZW1zKGNvbnRlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kYXRhYmFzZS5vbkRpZEVycm9yKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICB7dGhpcy5wcm9wcyA/XG4gICAgICAgICAgKDxQcm9qZWN0Vmlld2VyQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSAvPikgOlxuICAgICAgICAgICg8RW1wdHlDb21wb25lbnQgbG9hZGluZz17dGhpcy5kYXRhYmFzZS5sb2FkaW5nfSAvPilcbiAgICAgICAgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUik7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWREZXN0cm95IChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oRU1JVFRFUi5FUlJPUiwgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiBET0NLX1RJVExFO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRJY29uTmFtZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfSUNPTjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiBET0NLX1NJWkU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldERlZmF1bHRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApIHx8IEFMTE9XRURfRE9DS1NbMV07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge0FycmF5fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1M7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpc1Blcm1hbmVudERvY2tJdGVtICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdG9nZ2xlVmlzaWJpbGl0eSAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKHRoaXMuZ2V0VVJJKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyB0b2dnbGVGb2N1cyAoKSB7XG4gICAgY29uc3QgZG9jayA9IGF0b20ud29ya3NwYWNlLnBhbmVDb250YWluZXJGb3JJdGVtKHRoaXMpO1xuICAgIGNvbnN0IHBhbmUgPSBkb2NrLmdldEFjdGl2ZVBhbmUoKS5nZXRFbGVtZW50KCk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHBhbmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMpLnRoZW4oKCkgPT4gdGhpcy5lbGVtZW50LmZvY3VzKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5Db250YWluZXI7XG4iXX0=