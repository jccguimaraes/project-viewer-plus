Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _database = require('./../services/database');

var _database2 = _interopRequireDefault(_database);

var _base = require('./../constants/base');

var _mainComponent = require('./../components/main-component');

var _mainComponent2 = _interopRequireDefault(_mainComponent);

var _statusContainer = require('./status-container');

var _statusContainer2 = _interopRequireDefault(_statusContainer);

var _selectListContainer = require('./select-list-container');

var _selectListContainer2 = _interopRequireDefault(_selectListContainer);

var _emptyComponent = require('./../components/empty-component');

var _emptyComponent2 = _interopRequireDefault(_emptyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

// import { ipcMain, webContents } from 'remote';
// import { ipcRenderer } from 'electron';

/**
 *
 */
let ProjectViewer = class ProjectViewer {

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

    this.selectList = new _selectListContainer2.default();
    this.database = new _database2.default();

    this.database.onDidChange(content => {
      this.update(content);
      this.selectList.setItems(content);
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
    if (!this.props) {
      return _etch2.default.dom(
        'div',
        { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
        _etch2.default.dom(_emptyComponent2.default, null),
        _etch2.default.dom(_statusContainer2.default, { ref: 'statusContainer' })
      );
    }

    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      _etch2.default.dom(_mainComponent2.default, _extends({ ref: 'projectViewerComponent' }, this.props)),
      _etch2.default.dom(_statusContainer2.default, { ref: 'statusContainer' })
    );
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.disposables.dispose();
      _this2.emitter.emit('did-destroy');
    })();
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy(callback) {
    return this.emitter.on('did-destroy', callback);
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
    return 200;
  }

  /**
   *
   * @returns {string} description
   */
  getDefaultLocation() {
    return atom.config.get(`${_base.PLUGIN_NAME}.dock.position`) || 'right';
  }

  /**
   *
   * @returns {Array} description
   */
  getAllowedLocations() {
    return ['left', 'right'];
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
};
exports.default = ProjectViewer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4tY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiZW1pdHRlciIsInNlbGVjdExpc3QiLCJkYXRhYmFzZSIsIm9uRGlkQ2hhbmdlIiwiY29udGVudCIsInVwZGF0ZSIsInNldEl0ZW1zIiwiaW5pdGlhbGl6ZSIsInByb3BzIiwicmVuZGVyIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJlbWl0Iiwib25EaWREZXN0cm95IiwiY2FsbGJhY2siLCJvbiIsImdldFVSSSIsImdldFRpdGxlIiwiZ2V0SWNvbk5hbWUiLCJnZXRQcmVmZXJyZWRXaWR0aCIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJ3b3Jrc3BhY2UiLCJ0b2dnbGUiLCJ0b2dnbGVGb2N1cyIsImRvY2siLCJwYW5lQ29udGFpbmVyRm9ySXRlbSIsInBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiZ2V0RWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJkb2N1bWVudCIsImZvY3VzIiwib3BlbiIsInRoZW4iLCJlbGVtZW50IiwidG9nZ2xlU2VsZWN0TGlzdCIsInNob3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFLQTs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQWxCQTs7QUFNQTtBQUNBOztBQWFBOzs7SUFHTUEsYSxHQUFOLE1BQU1BLGFBQU4sQ0FBb0I7O0FBRWxCOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxtQkFBZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBS0MsVUFBTCxHQUFrQixtQ0FBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLHdCQUFoQjs7QUFFQSxTQUFLQSxRQUFMLENBQWNDLFdBQWQsQ0FBMEJDLFdBQVc7QUFDbkMsV0FBS0MsTUFBTCxDQUFZRCxPQUFaO0FBQ0EsV0FBS0gsVUFBTCxDQUFnQkssUUFBaEIsQ0FBeUJGLE9BQXpCO0FBQ0QsS0FIRDs7QUFLQSxtQkFBS0csVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNRixRQUFOLENBQWNHLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixZQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPLGVBQUtILE1BQUwsT0FBUDtBQUZtQjtBQUdwQjs7QUFFRDs7OztBQUlBSSxXQUFVO0FBQ1IsUUFBSSxDQUFDLEtBQUtELEtBQVYsRUFBaUI7QUFDZixhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0NBQWYsRUFBZ0QsVUFBUyxJQUF6RDtBQUNFLDBEQURGO0FBRUUsd0RBQWlCLEtBQUksaUJBQXJCO0FBRkYsT0FERjtBQU1EOztBQUVELFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxnQ0FBZixFQUFnRCxVQUFTLElBQXpEO0FBQ0UsNkRBQXdCLEtBQUksd0JBQTVCLElBQXlELEtBQUtBLEtBQTlELEVBREY7QUFFRSxzREFBaUIsS0FBSSxpQkFBckI7QUFGRixLQURGO0FBTUQ7O0FBRUQ7OztBQUdNRSxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixhQUFLWCxXQUFMLENBQWlCWSxPQUFqQjtBQUNBLGFBQUtYLE9BQUwsQ0FBYVksSUFBYixDQUFrQixhQUFsQjtBQUZlO0FBR2hCOztBQUVEOzs7O0FBSUFDLGVBQWNDLFFBQWQsRUFBd0I7QUFDdEIsV0FBTyxLQUFLZCxPQUFMLENBQWFlLEVBQWIsQ0FBZ0IsYUFBaEIsRUFBK0JELFFBQS9CLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBRSxXQUFVO0FBQ1I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZO0FBQ1Y7QUFDRDs7QUFFRDs7OztBQUlBQyxnQkFBZTtBQUNiO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsc0JBQXFCO0FBQ25CLFdBQU8sR0FBUDtBQUNEOztBQUVEOzs7O0FBSUFDLHVCQUFzQjtBQUNwQixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBaUIsR0FBRCxpQkFBZSxnQkFBL0IsS0FBbUQsT0FBMUQ7QUFDRDs7QUFFRDs7OztBQUlBQyx3QkFBdUI7QUFDckIsV0FBTyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyx3QkFBdUI7QUFDckIsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBQyxxQkFBb0I7QUFDbEJMLFNBQUtNLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixLQUFLWixNQUFMLEVBQXRCO0FBQ0Q7O0FBRUQ7OztBQUdNYSxhQUFOLEdBQXFCO0FBQUE7O0FBQUE7QUFDbkIsWUFBTUMsT0FBT1QsS0FBS00sU0FBTCxDQUFlSSxvQkFBZixRQUFiO0FBQ0EsWUFBTUMsT0FBT0YsS0FBS0csYUFBTCxHQUFxQkMsVUFBckIsRUFBYjs7QUFFQSxVQUFJLE9BQUtDLGFBQUwsSUFBc0JDLFNBQVNELGFBQVQsS0FBMkJILElBQXJELEVBQTJEO0FBQ3pELGVBQUtHLGFBQUwsQ0FBbUJFLEtBQW5CO0FBQ0QsT0FGRCxNQUdLO0FBQ0gsZUFBS0YsYUFBTCxHQUFxQkMsU0FBU0QsYUFBOUI7QUFDQWQsYUFBS00sU0FBTCxDQUFlVyxJQUFmLFNBQTBCQyxJQUExQixDQUErQjtBQUFBLGlCQUFNLE9BQUtDLE9BQUwsQ0FBYUgsS0FBYixFQUFOO0FBQUEsU0FBL0I7QUFDRDtBQVZrQjtBQVdwQjs7QUFFRDs7O0FBR0FJLHFCQUFvQjtBQUNsQixTQUFLeEMsVUFBTCxDQUFnQnlDLElBQWhCO0FBQ0Q7QUFsS2lCLEM7a0JBcUtMN0MsYSIsImZpbGUiOiJtYWluLWNvbnRhaW5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuXG4vLyBpbXBvcnQgeyBpcGNNYWluLCB3ZWJDb250ZW50cyB9IGZyb20gJ3JlbW90ZSc7XG4vLyBpbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHtcbiAgRE9DS19JQ09OLFxuICBET0NLX1RJVExFLFxuICBET0NLX1VSSSxcbiAgUExVR0lOX05BTUVcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgUHJvamVjdFZpZXdlckNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbi1jb21wb25lbnQnO1xuaW1wb3J0IFN0YXR1c0NvbnRhaW5lciBmcm9tICcuL3N0YXR1cy1jb250YWluZXInO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9zZWxlY3QtbGlzdC1jb250YWluZXInO1xuaW1wb3J0IEVtcHR5Q29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9lbXB0eS1jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFByb2plY3RWaWV3ZXIge1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICAvLyBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNSAtIDEgKyAxKSkgKyAxO1xuICAgIC8vXG4gICAgLy8gaXBjTWFpbi5vbigncHZ4LWNoYW5uZWwnLCBmdW5jdGlvbiAoZXZlbnQsIGFyZykge1xuICAgIC8vICAgZXZlbnQuc2VuZGVyLnNlbmQoJ3B2eC1yZXMnLCBgcHJvamVjdCAjJHtyYW5kb219YCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBpcGNSZW5kZXJlci5vbigncHZ4LXJlcycsIGZ1bmN0aW9uIChldmVudCwgYXJnKSB7XG4gICAgLy8gICBkZXZsb2coJ3B2eC1yZXMnLCBhcmcpO1xuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoY29udGVudCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXMoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGlmICghdGhpcy5wcm9wcykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3Rvb2wtcGFuZWwgcHJvamVjdC12aWV3ZXItcGx1cycgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICAgIDxFbXB0eUNvbXBvbmVudCAvPlxuICAgICAgICAgIDxTdGF0dXNDb250YWluZXIgcmVmPSdzdGF0dXNDb250YWluZXInIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3Rvb2wtcGFuZWwgcHJvamVjdC12aWV3ZXItcGx1cycgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8UHJvamVjdFZpZXdlckNvbXBvbmVudCByZWY9J3Byb2plY3RWaWV3ZXJDb21wb25lbnQnIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICA8U3RhdHVzQ29udGFpbmVyIHJlZj0nc3RhdHVzQ29udGFpbmVyJyAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95Jyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWREZXN0cm95IChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1kZXN0cm95JywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiBET0NLX1RJVExFO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRJY29uTmFtZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfSUNPTjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiAyMDA7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldERlZmF1bHRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApIHx8ICdyaWdodCc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge0FycmF5fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIFsnbGVmdCcsICdyaWdodCddO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaXNQZXJtYW5lbnREb2NrSXRlbSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHRvZ2dsZVZpc2liaWxpdHkgKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnRvZ2dsZSh0aGlzLmdldFVSSSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgdG9nZ2xlRm9jdXMgKCkge1xuICAgIGNvbnN0IGRvY2sgPSBhdG9tLndvcmtzcGFjZS5wYW5lQ29udGFpbmVyRm9ySXRlbSh0aGlzKTtcbiAgICBjb25zdCBwYW5lID0gZG9jay5nZXRBY3RpdmVQYW5lKCkuZ2V0RWxlbWVudCgpO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBwYW5lKSB7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzKS50aGVuKCgpID0+IHRoaXMuZWxlbWVudC5mb2N1cygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHRvZ2dsZVNlbGVjdExpc3QgKCkge1xuICAgIHRoaXMuc2VsZWN0TGlzdC5zaG93KCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdFZpZXdlcjtcbiJdfQ==