Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

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
    console.log(event.type, this.props);
    this.contextSwitcher.switchContext(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const icon = this.props.model.icon ? `icon icon-${this.props.model.icon}` : '';
    const selected = this.props.selected ? 'selected' : '';

    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop
    };

    return _etch2.default.dom(
      'li',
      {
        className: `list-item pv-project ${selected}`,
        on: _extends({}, events),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QtY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIlByb2plY3RDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29udGV4dFN3aXRjaGVyIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsInN3aXRjaENvbnRleHQiLCJkaWREcmFnIiwiZGlkRHJvcCIsInJlbmRlciIsImljb24iLCJtb2RlbCIsInNlbGVjdGVkIiwiZXZlbnRzIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcm9wIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7Ozs7OzJjQUpBOztBQU1BOzs7SUFHTUEsZ0IsR0FBTixNQUFNQSxnQkFBTixDQUF1Qjs7QUFFckI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLCtCQUF2Qjs7QUFFQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmO0FBQ0FDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS1gsS0FBN0I7QUFDQSxTQUFLQyxlQUFMLENBQXFCVyxhQUFyQixDQUFtQyxLQUFLWixLQUF4QztBQUNEOztBQUVEOzs7O0FBSUFhLFVBQVNMLEtBQVQsRUFBZ0I7QUFDZEMsWUFBUUMsR0FBUixDQUFZRixNQUFNRyxJQUFsQixFQUF3QixLQUFLWCxLQUE3QjtBQUNEOztBQUVEOzs7O0FBSUFjLFVBQVNOLEtBQVQsRUFBZ0I7QUFDZEMsWUFBUUMsR0FBUixDQUFZRixNQUFNRyxJQUFsQixFQUF3QixLQUFLWCxLQUE3QjtBQUNEOztBQUVEOzs7O0FBSUFlLFdBQVU7QUFDUixVQUFNQyxPQUFPLEtBQUtoQixLQUFMLENBQVdpQixLQUFYLENBQWlCRCxJQUFqQixHQUNWLGFBQVksS0FBS2hCLEtBQUwsQ0FBV2lCLEtBQVgsQ0FBaUJELElBQUssRUFEeEIsR0FFWCxFQUZGO0FBR0EsVUFBTUUsV0FBVyxLQUFLbEIsS0FBTCxDQUFXa0IsUUFBWCxHQUFzQixVQUF0QixHQUFtQyxFQUFwRDs7QUFFQSxVQUFNQyxTQUFTO0FBQ2JDLGFBQU8sS0FBS2IsUUFEQztBQUViYyxpQkFBVyxLQUFLUixPQUZIO0FBR2JTLFlBQU0sS0FBS1I7QUFIRSxLQUFmOztBQU1BLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVksd0JBQXVCSSxRQUFTLEVBRDlDO0FBRUUseUJBQVNDLE1BQVQsQ0FGRjtBQUdFLG1CQUFVO0FBSFo7QUFLRTtBQUFBO0FBQUEsVUFBTSxXQUFXSCxJQUFqQjtBQUF3QixhQUFLaEIsS0FBTCxDQUFXaUIsS0FBWCxDQUFpQk07QUFBekM7QUFMRixLQURGO0FBU0Q7QUFyRm9CLEM7a0JBd0ZSekIsZ0IiLCJmaWxlIjoicHJvamVjdC1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IENvbnRleHRTd2l0Y2hlciBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbnRleHQtc3dpdGNoZXInO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFByb2plY3RDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIC8vIGlwY1JlbmRlcmVyLnNlbmQoJ3B2eC1jaGFubmVsJywgdGhpcyk7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIuc3dpdGNoQ29udGV4dCh0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5wcm9wcy5tb2RlbC5pY29uID9cbiAgICAgIGBpY29uIGljb24tJHt0aGlzLnByb3BzLm1vZGVsLmljb259YCA6XG4gICAgICAnJztcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG5cbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17eyAuLi5ldmVudHMgfX1cbiAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RDb21wb25lbnQ7XG4iXX0=