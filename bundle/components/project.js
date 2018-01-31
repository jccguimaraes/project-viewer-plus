'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

var _atom = require('atom');

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _contextSwitcher = require('./../services/context-switcher');

var _contextSwitcher2 = _interopRequireDefault(_contextSwitcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let ProjectComponent = class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.disposables = new _atom.CompositeDisposable();
    this.props = props;
    this.contextSwitcher = new _contextSwitcher2.default();

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
      if (props) {
        _this.props = props;
        return _etch2.default.update(_this);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this2);
    })();
  }

  /**
   *
   * @param {Object} event - description
   */
  didClick(event) {
    // ipcRenderer.send('pvx-channel', this);
    (0, _devlog2.default)(event.type, this.props);
    this.contextSwitcher.switchContext(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    (0, _devlog2.default)(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    (0, _devlog2.default)(event.type, this.props);
  }

  /**
   *
   * @returns {Object} description
   */
  get events() {
    return {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop
    };
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const icon = this.props.model.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.model.icon}-icon` : '';
    const selected = this.props.selected ? 'selected' : '';

    return _etch2.default.dom(
      'li',
      {
        className: `list-item pv-project ${selected}`,
        on: this.events,
        draggable: 'true'
      },
      _etch2.default.dom(
        'span',
        { className: icon },
        this.props.model.name
      )
    );
  }
};
exports.default = ProjectComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsImNvbnRleHRTd2l0Y2hlciIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJkaWRDbGljayIsImV2ZW50IiwidHlwZSIsInN3aXRjaENvbnRleHQiLCJkaWREcmFnIiwiZGlkRHJvcCIsImV2ZW50cyIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJvcCIsInJlbmRlciIsImljb24iLCJtb2RlbCIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsInNlbGVjdGVkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBTkE7O0FBUUE7OztJQUdNQSxnQixHQUFOLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3JCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLRSxlQUFMLEdBQXVCLCtCQUF2Qjs7QUFFQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNKLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtJLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmO0FBQ0EsMEJBQU9BLE1BQU1DLElBQWIsRUFBbUIsS0FBS1YsS0FBeEI7QUFDQSxTQUFLRSxlQUFMLENBQXFCUyxhQUFyQixDQUFtQyxLQUFLWCxLQUF4QztBQUNEOztBQUVEOzs7O0FBSUFZLFVBQVNILEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUMsSUFBYixFQUFtQixLQUFLVixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUFhLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUMsSUFBYixFQUFtQixLQUFLVixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSWMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxhQUFPLEtBQUtQLFFBRFA7QUFFTFEsaUJBQVcsS0FBS0osT0FGWDtBQUdMSyxZQUFNLEtBQUtKO0FBSE4sS0FBUDtBQUtEOztBQUVEOzs7O0FBSUFLLFdBQVU7QUFDUixVQUFNQyxPQUNKLEtBQUtuQixLQUFMLENBQVdvQixLQUFYLENBQWlCRCxJQUFqQixJQUF5QkUsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQXpCLEdBQ0ssUUFBTyxLQUFLdkIsS0FBTCxDQUFXb0IsS0FBWCxDQUFpQkQsSUFBSyxPQURsQyxHQUVJLEVBSE47QUFJQSxVQUFNSyxXQUFXLEtBQUt4QixLQUFMLENBQVd3QixRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLEVBQXBEOztBQUVBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVksd0JBQXVCQSxRQUFTLEVBRDlDO0FBRUUsWUFBSSxLQUFLVixNQUZYO0FBR0UsbUJBQVU7QUFIWjtBQUtFO0FBQUE7QUFBQSxVQUFNLFdBQVdLLElBQWpCO0FBQXdCLGFBQUtuQixLQUFMLENBQVdvQixLQUFYLENBQWlCSztBQUF6QztBQUxGLEtBREY7QUFTRDtBQTVGb0IsQztrQkErRlIzQixnQiIsImZpbGUiOiJwcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IENvbnRleHRTd2l0Y2hlciBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbnRleHQtc3dpdGNoZXInO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlciA9IG5ldyBDb250ZXh0U3dpdGNoZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICAvLyBpcGNSZW5kZXJlci5zZW5kKCdwdngtY2hhbm5lbCcsIHRoaXMpO1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICB0aGlzLmNvbnRleHRTd2l0Y2hlci5zd2l0Y2hDb250ZXh0KHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMucHJvcHMubW9kZWwuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLm1vZGVsLmljb259LWljb25gXG4gICAgICAgIDogJyc7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWl0ZW0gcHYtcHJvamVjdCAke3NlbGVjdGVkfWB9XG4gICAgICAgIG9uPXt0aGlzLmV2ZW50c31cbiAgICAgICAgZHJhZ2dhYmxlPVwidHJ1ZVwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMucHJvcHMubW9kZWwubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdENvbXBvbmVudDtcbiJdfQ==