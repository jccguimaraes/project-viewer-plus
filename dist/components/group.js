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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiZGlkQ2xpY2siLCJldmVudCIsImV4cGFuZGVkIiwiZGlkRHJhZyIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJyZW5kZXIiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJkcmFnZW5kIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImZvbGRpbmdTdGF0ZSIsIm5hbWUiLCJvblNlbGVjdFByb2plY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmLFNBQUtSLEtBQUwsQ0FBV1MsUUFBWCxHQUFzQixDQUFDLEtBQUtULEtBQUwsQ0FBV1MsUUFBbEM7QUFDQSxTQUFLTixNQUFMLENBQVksS0FBS0gsS0FBakI7QUFDRDs7QUFFRDs7OztBQUlBVSxVQUFTRixLQUFULEVBQWdCO0FBQ2RHLFlBQVFDLEdBQVIsQ0FBWUosTUFBTUssSUFBbEIsRUFBd0IsS0FBS2IsS0FBN0I7QUFDQVEsVUFBTU0sTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVlULEtBQVosRUFBbUI7QUFDakJHLFlBQVFDLEdBQVIsQ0FBWUosTUFBTUssSUFBbEIsRUFBd0IsS0FBS2IsS0FBN0I7QUFDQVEsVUFBTU0sTUFBTixDQUFhQyxTQUFiLENBQXVCRyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNYLEtBQVQsRUFBZ0I7QUFDZEcsWUFBUUMsR0FBUixDQUFZSixNQUFNSyxJQUFsQixFQUF3QixLQUFLYixLQUE3QjtBQUNEOztBQUVEOzs7O0FBSUFvQixXQUFVO0FBQ1IsVUFBTUMsU0FBUztBQUNiQyxhQUFPLEtBQUtmLFFBREM7QUFFYmdCLGlCQUFXLEtBQUtiLE9BRkg7QUFHYmMsWUFBTSxLQUFLTCxPQUhFO0FBSWJNLGVBQVMsS0FBS1I7QUFKRCxLQUFmOztBQU9BLFVBQU1TLE9BQ0osS0FBSzFCLEtBQUwsQ0FBVzBCLElBQVgsSUFBbUJDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFuQixHQUNLLFFBQU8sS0FBSzdCLEtBQUwsQ0FBVzBCLElBQUssT0FENUIsR0FFSSxFQUhOO0FBSUEsVUFBTUksZUFBZSxLQUFLOUIsS0FBTCxDQUFXUyxRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLFdBQXhEOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBWSxvQkFBbUJxQixZQUFhLEVBQWhEO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxvQkFBZixFQUFvQyxpQkFBU1QsTUFBVCxDQUFwQyxFQUF1RCxXQUFVLE1BQWpFO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBV0ssSUFBakI7QUFBd0IsZUFBSzFCLEtBQUwsQ0FBVytCO0FBQW5DO0FBREYsT0FERjtBQUtFLHlCQUFDLGNBQUQsZUFDTSxLQUFLL0IsS0FEWDtBQUVFLHlCQUFpQixLQUFLQSxLQUFMLENBQVdnQztBQUY5QjtBQUxGLEtBREY7QUFZRDtBQWhHaUM7a0JBQWZsQyxjIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBDb21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5leHBhbmRlZCA9ICF0aGlzLnByb3BzLmV4cGFuZGVkO1xuICAgIHRoaXMudXBkYXRlKHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICBkcm9wOiB0aGlzLmRpZERyb3AsXG4gICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmRcbiAgICB9O1xuXG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnByb3BzLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5pY29ufS1pY29uYFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IGZvbGRpbmdTdGF0ZSA9IHRoaXMucHJvcHMuZXhwYW5kZWQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHtmb2xkaW5nU3RhdGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHB2LWdyb3VwXCIgb249e3sgLi4uZXZlbnRzIH19IGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGlzdENvbnRhaW5lclxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIG9uU2VsZWN0UHJvamVjdD17dGhpcy5wcm9wcy5vblNlbGVjdFByb2plY3R9XG4gICAgICAgIC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==