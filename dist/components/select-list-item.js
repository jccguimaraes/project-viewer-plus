'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class SelectListItemComponent {
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
   */
  async destroy() {
    await _etch2.default.destroy(this);
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
   * @returns {Object} description
   */
  render() {
    const { item } = this.props;
    const iconClass = item.icon ? `primary-line icon ${item.icon}-icon` : 'primary-line';

    return _etch2.default.dom(
      'li',
      { className: 'two-lines' },
      _etch2.default.dom(
        'div',
        { className: iconClass },
        item.name
      ),
      _etch2.default.dom(
        'div',
        { className: 'secondary-line' },
        item.paths
      )
    );
  }
}
exports.default = SelectListItemComponent; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJpdGVtIiwiaWNvbkNsYXNzIiwiaWNvbiIsIm5hbWUiLCJwYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSx1QkFBTixDQUE4QjtBQUMzQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUYsZUFBS0UsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0osS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxlQUFLRyxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU0sRUFBRUMsSUFBRixLQUFXLEtBQUtSLEtBQXRCO0FBQ0EsVUFBTVMsWUFBWUQsS0FBS0UsSUFBTCxHQUNiLHFCQUFvQkYsS0FBS0UsSUFBSyxPQURqQixHQUVkLGNBRko7O0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLFdBQWQ7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFXRCxTQUFoQjtBQUE0QkQsYUFBS0c7QUFBakMsT0FERjtBQUVFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFBaUNILGFBQUtJO0FBQXRDO0FBRkYsS0FERjtBQU1EO0FBL0MwQztrQkFBeEJkLHVCLEVBUHJCIiwiZmlsZSI6InNlbGVjdC1saXN0LWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgaXRlbSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpY29uQ2xhc3MgPSBpdGVtLmljb25cbiAgICAgID8gYHByaW1hcnktbGluZSBpY29uICR7aXRlbS5pY29ufS1pY29uYFxuICAgICAgOiAncHJpbWFyeS1saW5lJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPVwidHdvLWxpbmVzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtpY29uQ2xhc3N9PntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Vjb25kYXJ5LWxpbmVcIj57aXRlbS5wYXRoc308L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19