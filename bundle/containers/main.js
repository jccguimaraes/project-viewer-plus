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
      this.props ? _etch2.default.dom(_main2.default, this.props) : _etch2.default.dom(_empty2.default, null)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJlbWl0dGVyIiwic2VsZWN0TGlzdCIsImRhdGFiYXNlIiwib25EaWRDaGFuZ2UiLCJjb250ZW50IiwidXBkYXRlIiwic2V0SXRlbXMiLCJpbml0aWFsaXplIiwicHJvcHMiLCJyZW5kZXIiLCJkZXN0cm95IiwiZGlzcG9zZSIsImVtaXQiLCJvbkRpZERlc3Ryb3kiLCJjYWxsYmFjayIsIm9uIiwiZ2V0VVJJIiwiZ2V0VGl0bGUiLCJnZXRJY29uTmFtZSIsImdldFByZWZlcnJlZFdpZHRoIiwiZ2V0RGVmYXVsdExvY2F0aW9uIiwiYXRvbSIsImNvbmZpZyIsImdldCIsImdldEFsbG93ZWRMb2NhdGlvbnMiLCJpc1Blcm1hbmVudERvY2tJdGVtIiwidG9nZ2xlVmlzaWJpbGl0eSIsIndvcmtzcGFjZSIsInRvZ2dsZSIsInRvZ2dsZUZvY3VzIiwiZG9jayIsInBhbmVDb250YWluZXJGb3JJdGVtIiwicGFuZSIsImdldEFjdGl2ZVBhbmUiLCJnZXRFbGVtZW50IiwiYWN0aXZlRWxlbWVudCIsImRvY3VtZW50IiwiZm9jdXMiLCJvcGVuIiwidGhlbiIsImVsZW1lbnQiLCJ0b2dnbGVTZWxlY3RMaXN0Iiwic2hvdyIsIm9wZW5FZGl0b3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFLQTs7QUFNQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQWxCQTs7QUFNQTtBQUNBOztBQWFBOzs7SUFHTUEsYSxHQUFOLE1BQU1BLGFBQU4sQ0FBb0I7QUFDbEI7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFLQyxVQUFMLEdBQWtCLDBCQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isd0JBQWhCOztBQUVBLFNBQUtBLFFBQUwsQ0FBY0MsV0FBZCxDQUEwQkMsV0FBVztBQUNuQyxXQUFLQyxNQUFMLENBQVlELE9BQVo7QUFDQSxXQUFLSCxVQUFMLENBQWdCSyxRQUFoQixDQUF5QkYsT0FBekI7QUFDRCxLQUhEOztBQUtBLG1CQUFLRyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01GLFFBQU4sQ0FBY0csS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFlBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU8sZUFBS0gsTUFBTCxPQUFQO0FBRm1CO0FBR3BCOztBQUVEOzs7O0FBSUFJLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZ0NBQWYsRUFBZ0QsVUFBUyxJQUF6RDtBQUNHLFdBQUtELEtBQUwsR0FDRSxtQ0FBNEIsS0FBS0EsS0FBakMsQ0FERixHQUVFO0FBSEwsS0FERjtBQVFEOztBQUVEOzs7QUFHTUUsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsYUFBS1gsV0FBTCxDQUFpQlksT0FBakI7QUFDQSxhQUFLWCxPQUFMLENBQWFZLElBQWIsQ0FBa0IsYUFBbEI7QUFGZTtBQUdoQjs7QUFFRDs7OztBQUlBQyxlQUFjQyxRQUFkLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS2QsT0FBTCxDQUFhZSxFQUFiLENBQWdCLGFBQWhCLEVBQStCRCxRQUEvQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUUsV0FBVTtBQUNSO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWTtBQUNWO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsZ0JBQWU7QUFDYjtBQUNEOztBQUVEOzs7O0FBSUFDLHNCQUFxQjtBQUNuQixXQUFPLEdBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyx1QkFBc0I7QUFDcEIsV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWlCLEdBQUQsaUJBQWUsZ0JBQS9CLEtBQW1ELE9BQTFEO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsd0JBQXVCO0FBQ3JCLFdBQU8sQ0FBQyxNQUFELEVBQVMsT0FBVCxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsd0JBQXVCO0FBQ3JCLFdBQU8sSUFBUDtBQUNEOztBQUVEOzs7QUFHQUMscUJBQW9CO0FBQ2xCTCxTQUFLTSxTQUFMLENBQWVDLE1BQWYsQ0FBc0IsS0FBS1osTUFBTCxFQUF0QjtBQUNEOztBQUVEOzs7QUFHTWEsYUFBTixHQUFxQjtBQUFBOztBQUFBO0FBQ25CLFlBQU1DLE9BQU9ULEtBQUtNLFNBQUwsQ0FBZUksb0JBQWYsUUFBYjtBQUNBLFlBQU1DLE9BQU9GLEtBQUtHLGFBQUwsR0FBcUJDLFVBQXJCLEVBQWI7O0FBRUEsVUFBSSxPQUFLQyxhQUFMLElBQXNCQyxTQUFTRCxhQUFULEtBQTJCSCxJQUFyRCxFQUEyRDtBQUN6RCxlQUFLRyxhQUFMLENBQW1CRSxLQUFuQjtBQUNELE9BRkQsTUFHSztBQUNILGVBQUtGLGFBQUwsR0FBcUJDLFNBQVNELGFBQTlCO0FBQ0FkLGFBQUtNLFNBQUwsQ0FBZVcsSUFBZixTQUEwQkMsSUFBMUIsQ0FBK0I7QUFBQSxpQkFBTSxPQUFLQyxPQUFMLENBQWFILEtBQWIsRUFBTjtBQUFBLFNBQS9CO0FBQ0Q7QUFWa0I7QUFXcEI7O0FBRUQ7OztBQUdBSSxxQkFBb0I7QUFDbEIsU0FBS3hDLFVBQUwsQ0FBZ0J5QyxJQUFoQjtBQUNEOztBQUVEOzs7QUFHTUMsWUFBTixHQUFvQjtBQUFBO0FBQ2xCdEIsV0FBS00sU0FBTCxDQUFlVyxJQUFmLEVBQW9CLE1BQU0sc0JBQTFCO0FBRGtCO0FBRW5CO0FBaktpQixDO2tCQW9LTHpDLGEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuXG4vLyBpbXBvcnQgeyBpcGNNYWluLCB3ZWJDb250ZW50cyB9IGZyb20gJ3JlbW90ZSc7XG4vLyBpbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHtcbiAgRE9DS19JQ09OLFxuICBET0NLX1RJVExFLFxuICBET0NLX1VSSSxcbiAgUExVR0lOX05BTUVcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgUHJvamVjdFZpZXdlckNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbic7XG5pbXBvcnQgU2VsZWN0TGlzdCBmcm9tICcuL3NlbGVjdC1saXN0JztcbmltcG9ydCBFbXB0eUNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZW1wdHknO1xuaW1wb3J0IEVkaXRvckNvbnRhaW5lciBmcm9tICcuL2VkaXRvcic7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICAvLyBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNSAtIDEgKyAxKSkgKyAxO1xuICAgIC8vXG4gICAgLy8gaXBjTWFpbi5vbigncHZ4LWNoYW5uZWwnLCBmdW5jdGlvbiAoZXZlbnQsIGFyZykge1xuICAgIC8vICAgZXZlbnQuc2VuZGVyLnNlbmQoJ3B2eC1yZXMnLCBgcHJvamVjdCAjJHtyYW5kb219YCk7XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyBpcGNSZW5kZXJlci5vbigncHZ4LXJlcycsIGZ1bmN0aW9uIChldmVudCwgYXJnKSB7XG4gICAgLy8gICBkZXZsb2coJ3B2eC1yZXMnLCBhcmcpO1xuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5zZWxlY3RMaXN0ID0gbmV3IFNlbGVjdExpc3QoKTtcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKCk7XG5cbiAgICB0aGlzLmRhdGFiYXNlLm9uRGlkQ2hhbmdlKGNvbnRlbnQgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoY29udGVudCk7XG4gICAgICB0aGlzLnNlbGVjdExpc3Quc2V0SXRlbXMoY29udGVudCk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2wtcGFuZWwgcHJvamVjdC12aWV3ZXItcGx1c1wiIHRhYkluZGV4PVwiLTFcIj5cbiAgICAgICAge3RoaXMucHJvcHMgP1xuICAgICAgICAgICg8UHJvamVjdFZpZXdlckNvbXBvbmVudCB7Li4udGhpcy5wcm9wc30gLz4pIDpcbiAgICAgICAgICAoPEVtcHR5Q29tcG9uZW50IC8+KVxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWRlc3Ryb3knKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZERlc3Ryb3kgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLWRlc3Ryb3knLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIDIwMDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgJ3JpZ2h0JztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gWydsZWZ0JywgJ3JpZ2h0J107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IGRlc2NyaXB0aW9uXG4gICAqL1xuICBpc1Blcm1hbmVudERvY2tJdGVtICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdG9nZ2xlVmlzaWJpbGl0eSAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKHRoaXMuZ2V0VVJJKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyB0b2dnbGVGb2N1cyAoKSB7XG4gICAgY29uc3QgZG9jayA9IGF0b20ud29ya3NwYWNlLnBhbmVDb250YWluZXJGb3JJdGVtKHRoaXMpO1xuICAgIGNvbnN0IHBhbmUgPSBkb2NrLmdldEFjdGl2ZVBhbmUoKS5nZXRFbGVtZW50KCk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHBhbmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMpLnRoZW4oKCkgPT4gdGhpcy5lbGVtZW50LmZvY3VzKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0TGlzdCAoKSB7XG4gICAgdGhpcy5zZWxlY3RMaXN0LnNob3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgb3BlbkVkaXRvciAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbihhd2FpdCBuZXcgRWRpdG9yQ29udGFpbmVyKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5Db250YWluZXI7XG4iXX0=