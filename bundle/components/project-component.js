Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QtY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIlByb2plY3RDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29udGV4dFN3aXRjaGVyIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJ0eXBlIiwic3dpdGNoQ29udGV4dCIsImRpZERyYWciLCJkaWREcm9wIiwicmVuZGVyIiwiaWNvbiIsIm1vZGVsIiwic2VsZWN0ZWQiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FMQTs7QUFPQTs7O0lBR01BLGdCLEdBQU4sTUFBTUEsZ0JBQU4sQ0FBdUI7O0FBRXJCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QiwrQkFBdkI7O0FBRUEsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxlQUFLRyxNQUFMLE9BQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsUUFBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLFdBQVVDLEtBQVYsRUFBaUI7QUFDZjtBQUNBLDBCQUFPQSxNQUFNQyxJQUFiLEVBQW1CLEtBQUtULEtBQXhCO0FBQ0EsU0FBS0MsZUFBTCxDQUFxQlMsYUFBckIsQ0FBbUMsS0FBS1YsS0FBeEM7QUFDRDs7QUFFRDs7OztBQUlBVyxVQUFTSCxLQUFULEVBQWdCO0FBQ2QsMEJBQU9BLE1BQU1DLElBQWIsRUFBbUIsS0FBS1QsS0FBeEI7QUFDRDs7QUFFRDs7OztBQUlBWSxVQUFTSixLQUFULEVBQWdCO0FBQ2QsMEJBQU9BLE1BQU1DLElBQWIsRUFBbUIsS0FBS1QsS0FBeEI7QUFDRDs7QUFFRDs7OztBQUlBYSxXQUFVO0FBQ1IsVUFBTUMsT0FBTyxLQUFLZCxLQUFMLENBQVdlLEtBQVgsQ0FBaUJELElBQWpCLEdBQ1YsYUFBWSxLQUFLZCxLQUFMLENBQVdlLEtBQVgsQ0FBaUJELElBQUssRUFEeEIsR0FFWCxFQUZGO0FBR0EsVUFBTUUsV0FBVyxLQUFLaEIsS0FBTCxDQUFXZ0IsUUFBWCxHQUFzQixVQUF0QixHQUFtQyxFQUFwRDs7QUFFQSxVQUFNQyxTQUFTO0FBQ2JDLGFBQU8sS0FBS1gsUUFEQztBQUViWSxpQkFBVyxLQUFLUixPQUZIO0FBR2JTLFlBQU0sS0FBS1I7QUFIRSxLQUFmOztBQU1BLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQVksd0JBQXVCSSxRQUFTLEVBRDlDO0FBRUUseUJBQVNDLE1BQVQsQ0FGRjtBQUdFLG1CQUFVO0FBSFo7QUFLRTtBQUFBO0FBQUEsVUFBTSxXQUFXSCxJQUFqQjtBQUF3QixhQUFLZCxLQUFMLENBQVdlLEtBQVgsQ0FBaUJNO0FBQXpDO0FBTEYsS0FERjtBQVNEO0FBckZvQixDO2tCQXdGUnZCLGdCIiwiZmlsZSI6InByb2plY3QtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IENvbnRleHRTd2l0Y2hlciBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbnRleHQtc3dpdGNoZXInO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFByb2plY3RDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIC8vIGlwY1JlbmRlcmVyLnNlbmQoJ3B2eC1jaGFubmVsJywgdGhpcyk7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyLnN3aXRjaENvbnRleHQodGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5wcm9wcy5tb2RlbC5pY29uID9cbiAgICAgIGBpY29uIGljb24tJHt0aGlzLnByb3BzLm1vZGVsLmljb259YCA6XG4gICAgICAnJztcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG5cbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17eyAuLi5ldmVudHMgfX1cbiAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RDb21wb25lbnQ7XG4iXX0=