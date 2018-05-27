'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class GroupComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update(props) {
    if (props) {
      console.log(props.name);
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /**
   *
   * @param {Object} event - description
   */
  didClick(event) {
    this.props.expanded = !this.props.expanded;
    this.update(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    console.log(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDragEnd(event) {
    console.log(event.type, this.props);
    event.target.classList.remove('dragging');
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
    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop,
      dragend: this.didDragEnd
    };

    const icon = this.props.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.icon}-icon` : '';
    const foldingState = this.props.expanded ? 'expanded' : 'collapsed';

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${foldingState}` },
      _etch2.default.dom(
        'div',
        { className: 'list-item pv-group', on: _extends({}, events), draggable: 'true' },
        _etch2.default.dom(
          'span',
          { className: icon },
          this.props.name
        )
      ),
      _etch2.default.dom(_list2.default, _extends({}, this.props, {
        onSelectProject: this.props.onSelectProject
      }))
    );
  }
}
exports.default = GroupComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJkaWRDbGljayIsImV2ZW50IiwiZXhwYW5kZWQiLCJkaWREcmFnIiwidHlwZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcm9wIiwicmVuZGVyIiwiZXZlbnRzIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcm9wIiwiZHJhZ2VuZCIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJmb2xkaW5nU3RhdGUiLCJvblNlbGVjdFByb2plY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVEksY0FBUUMsR0FBUixDQUFZTCxNQUFNTSxJQUFsQjtBQUNBLFdBQUtOLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPSSxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1SLGVBQUtRLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2YsU0FBS1gsS0FBTCxDQUFXWSxRQUFYLEdBQXNCLENBQUMsS0FBS1osS0FBTCxDQUFXWSxRQUFsQztBQUNBLFNBQUtULE1BQUwsQ0FBWSxLQUFLSCxLQUFqQjtBQUNEOztBQUVEOzs7O0FBSUFhLFVBQVNGLEtBQVQsRUFBZ0I7QUFDZFAsWUFBUUMsR0FBUixDQUFZTSxNQUFNRyxJQUFsQixFQUF3QixLQUFLZCxLQUE3QjtBQUNBVyxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVAsS0FBWixFQUFtQjtBQUNqQlAsWUFBUUMsR0FBUixDQUFZTSxNQUFNRyxJQUFsQixFQUF3QixLQUFLZCxLQUE3QjtBQUNBVyxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1QsS0FBVCxFQUFnQjtBQUNkUCxZQUFRQyxHQUFSLENBQVlNLE1BQU1HLElBQWxCLEVBQXdCLEtBQUtkLEtBQTdCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQXFCLFdBQVU7QUFDUixVQUFNQyxTQUFTO0FBQ2JDLGFBQU8sS0FBS2IsUUFEQztBQUViYyxpQkFBVyxLQUFLWCxPQUZIO0FBR2JZLFlBQU0sS0FBS0wsT0FIRTtBQUliTSxlQUFTLEtBQUtSO0FBSkQsS0FBZjs7QUFPQSxVQUFNUyxPQUNKLEtBQUszQixLQUFMLENBQVcyQixJQUFYLElBQW1CQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBbkIsR0FDSyxRQUFPLEtBQUs5QixLQUFMLENBQVcyQixJQUFLLE9BRDVCLEdBRUksRUFITjtBQUlBLFVBQU1JLGVBQWUsS0FBSy9CLEtBQUwsQ0FBV1ksUUFBWCxHQUFzQixVQUF0QixHQUFtQyxXQUF4RDs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVksb0JBQW1CbUIsWUFBYSxFQUFoRDtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWYsRUFBb0MsaUJBQVNULE1BQVQsQ0FBcEMsRUFBdUQsV0FBVSxNQUFqRTtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVdLLElBQWpCO0FBQXdCLGVBQUszQixLQUFMLENBQVdNO0FBQW5DO0FBREYsT0FERjtBQUtFLHlCQUFDLGNBQUQsZUFDTSxLQUFLTixLQURYO0FBRUUseUJBQWlCLEtBQUtBLEtBQUwsQ0FBV2dDO0FBRjlCO0FBTEYsS0FERjtBQVlEO0FBakdpQztrQkFBZmxDLGMiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cENvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgY29uc29sZS5sb2cocHJvcHMubmFtZSk7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIHRoaXMucHJvcHMuZXhwYW5kZWQgPSAhdGhpcy5wcm9wcy5leHBhbmRlZDtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgZHJvcDogdGhpcy5kaWREcm9wLFxuICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kXG4gICAgfTtcblxuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5wcm9wcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke3RoaXMucHJvcHMuaWNvbn0taWNvbmBcbiAgICAgICAgOiAnJztcbiAgICBjb25zdCBmb2xkaW5nU3RhdGUgPSB0aGlzLnByb3BzLmV4cGFuZGVkID8gJ2V4cGFuZGVkJyA6ICdjb2xsYXBzZWQnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2BsaXN0LW5lc3RlZC1pdGVtICR7Zm9sZGluZ1N0YXRlfWB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiIG9uPXt7IC4uLmV2ZW50cyB9fSBkcmFnZ2FibGU9XCJ0cnVlXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5wcm9wcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXJcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICBvblNlbGVjdFByb2plY3Q9e3RoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0fVxuICAgICAgICAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=