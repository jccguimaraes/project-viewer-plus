'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atom = require('atom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
/** @jsx etch.dom */

class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.disposables = new _atom.CompositeDisposable();
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
    console.log(event.type, this.props);
    this.props.onSelectProject(this.props);
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
    const icon = this.props.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.icon}-icon` : '';
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
        this.props.name
      )
    );
  }
}
exports.default = ProjectComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIm9uU2VsZWN0UHJvamVjdCIsImRpZERyYWciLCJkaWREcm9wIiwiZXZlbnRzIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcm9wIiwicmVuZGVyIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsInNlbGVjdGVkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7QUFMQTs7QUFRZSxNQUFNQSxnQkFBTixDQUF1QjtBQUNwQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLRixLQUFMLEdBQWFBLEtBQWI7O0FBRUFHLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjTCxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9HLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1MLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS2IsS0FBN0I7QUFDQSxTQUFLQSxLQUFMLENBQVdjLGVBQVgsQ0FBMkIsS0FBS2QsS0FBaEM7QUFDRDs7QUFFRDs7OztBQUlBZSxVQUFTTCxLQUFULEVBQWdCO0FBQ2RDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS2IsS0FBN0I7QUFDRDs7QUFFRDs7OztBQUlBZ0IsVUFBU04sS0FBVCxFQUFnQjtBQUNkQyxZQUFRQyxHQUFSLENBQVlGLE1BQU1HLElBQWxCLEVBQXdCLEtBQUtiLEtBQTdCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJaUIsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxhQUFPLEtBQUtULFFBRFA7QUFFTFUsaUJBQVcsS0FBS0osT0FGWDtBQUdMSyxZQUFNLEtBQUtKO0FBSE4sS0FBUDtBQUtEOztBQUVEOzs7O0FBSUFLLFdBQVU7QUFDUixVQUFNQyxPQUNKLEtBQUt0QixLQUFMLENBQVdzQixJQUFYLElBQW1CQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBbkIsR0FDSyxRQUFPLEtBQUt6QixLQUFMLENBQVdzQixJQUFLLE9BRDVCLEdBRUksRUFITjtBQUlBLFVBQU1JLFdBQVcsS0FBSzFCLEtBQUwsQ0FBVzBCLFFBQVgsR0FBc0IsVUFBdEIsR0FBbUMsRUFBcEQ7O0FBRUEsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBWSx3QkFBdUJBLFFBQVMsRUFEOUM7QUFFRSxZQUFJLEtBQUtULE1BRlg7QUFHRSxtQkFBVTtBQUhaO0FBS0U7QUFBQTtBQUFBLFVBQU0sV0FBV0ssSUFBakI7QUFBd0IsYUFBS3RCLEtBQUwsQ0FBVzJCO0FBQW5DO0FBTEYsS0FERjtBQVNEO0FBMUZtQztrQkFBakI3QixnQiIsImZpbGUiOiJwcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0KHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnByb3BzLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5pY29ufS1pY29uYFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=