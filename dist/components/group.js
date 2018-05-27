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
      _etch2.default.dom(_list2.default, this.props)
    );
  }
}
exports.default = GroupComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJkaWRDbGljayIsImV2ZW50IiwiZXhwYW5kZWQiLCJkaWREcmFnIiwidHlwZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcm9wIiwicmVuZGVyIiwiZXZlbnRzIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcm9wIiwiZHJhZ2VuZCIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJmb2xkaW5nU3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVEksY0FBUUMsR0FBUixDQUFZTCxNQUFNTSxJQUFsQjtBQUNBLFdBQUtOLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPSSxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1SLGVBQUtRLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2YsU0FBS1gsS0FBTCxDQUFXWSxRQUFYLEdBQXNCLENBQUMsS0FBS1osS0FBTCxDQUFXWSxRQUFsQztBQUNBLFNBQUtULE1BQUwsQ0FBWSxLQUFLSCxLQUFqQjtBQUNEOztBQUVEOzs7O0FBSUFhLFVBQVNGLEtBQVQsRUFBZ0I7QUFDZFAsWUFBUUMsR0FBUixDQUFZTSxNQUFNRyxJQUFsQixFQUF3QixLQUFLZCxLQUE3QjtBQUNBVyxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVAsS0FBWixFQUFtQjtBQUNqQlAsWUFBUUMsR0FBUixDQUFZTSxNQUFNRyxJQUFsQixFQUF3QixLQUFLZCxLQUE3QjtBQUNBVyxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1QsS0FBVCxFQUFnQjtBQUNkUCxZQUFRQyxHQUFSLENBQVlNLE1BQU1HLElBQWxCLEVBQXdCLEtBQUtkLEtBQTdCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQXFCLFdBQVU7QUFDUixVQUFNQyxTQUFTO0FBQ2JDLGFBQU8sS0FBS2IsUUFEQztBQUViYyxpQkFBVyxLQUFLWCxPQUZIO0FBR2JZLFlBQU0sS0FBS0wsT0FIRTtBQUliTSxlQUFTLEtBQUtSO0FBSkQsS0FBZjs7QUFPQSxVQUFNUyxPQUNKLEtBQUszQixLQUFMLENBQVcyQixJQUFYLElBQW1CQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBbkIsR0FDSyxRQUFPLEtBQUs5QixLQUFMLENBQVcyQixJQUFLLE9BRDVCLEdBRUksRUFITjtBQUlBLFVBQU1JLGVBQWUsS0FBSy9CLEtBQUwsQ0FBV1ksUUFBWCxHQUFzQixVQUF0QixHQUFtQyxXQUF4RDs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVksb0JBQW1CbUIsWUFBYSxFQUFoRDtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWYsRUFBb0MsaUJBQVNULE1BQVQsQ0FBcEMsRUFBdUQsV0FBVSxNQUFqRTtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVdLLElBQWpCO0FBQXdCLGVBQUszQixLQUFMLENBQVdNO0FBQW5DO0FBREYsT0FERjtBQUtFLHlCQUFDLGNBQUQsRUFBbUIsS0FBS04sS0FBeEI7QUFMRixLQURGO0FBU0Q7QUE5RmlDO2tCQUFmRixjIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBDb21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKHByb3BzLm5hbWUpO1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLmV4cGFuZGVkID0gIXRoaXMucHJvcHMuZXhwYW5kZWQ7XG4gICAgdGhpcy51cGRhdGUodGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgIH07XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMucHJvcHMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLmljb259LWljb25gXG4gICAgICAgIDogJyc7XG4gICAgY29uc3QgZm9sZGluZ1N0YXRlID0gdGhpcy5wcm9wcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke2ZvbGRpbmdTdGF0ZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gcHYtZ3JvdXBcIiBvbj17eyAuLi5ldmVudHMgfX0gZHJhZ2dhYmxlPVwidHJ1ZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMucHJvcHMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=