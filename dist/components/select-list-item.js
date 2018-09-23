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
   * @param {Object} [props] etch component properties
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
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    if (props) {
      this.props = props;
      return _etch2.default.update(this, false);
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

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJpdGVtIiwiaWNvbkNsYXNzIiwiaWNvbiIsIm5hbWUiLCJwYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSx1QkFBTixDQUE4QjtBQUMzQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUYsZUFBS0UsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0osS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxlQUFLRyxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU0sRUFBRUMsSUFBRixLQUFXLEtBQUtSLEtBQXRCO0FBQ0EsVUFBTVMsWUFBWUQsS0FBS0UsSUFBTCxHQUNiLHFCQUFvQkYsS0FBS0UsSUFBSyxPQURqQixHQUVkLGNBRko7O0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLFdBQWQ7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFXRCxTQUFoQjtBQUE0QkQsYUFBS0c7QUFBakMsT0FERjtBQUVFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFBaUNILGFBQUtJO0FBQXRDO0FBRkYsS0FERjtBQU1EO0FBL0MwQztrQkFBeEJkLHVCLEVBUHJCIiwiZmlsZSI6InNlbGVjdC1saXN0LWl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGljb25DbGFzcyA9IGl0ZW0uaWNvblxuICAgICAgPyBgcHJpbWFyeS1saW5lIGljb24gJHtpdGVtLmljb259LWljb25gXG4gICAgICA6ICdwcmltYXJ5LWxpbmUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ljb25DbGFzc30+e2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnktbGluZVwiPntpdGVtLnBhdGhzfTwvZGl2PlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=