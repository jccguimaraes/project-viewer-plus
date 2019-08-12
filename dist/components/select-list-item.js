"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

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

    _etch.default.initialize(this);
  }
  /**
   *
   */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.props = props;
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /**
   *
   * @returns {Object} description
   */


  render() {
    const {
      item
    } = this.props;
    const iconClass = item.icon ? `primary-line icon ${item.icon}-icon` : 'primary-line';
    return _etch.default.dom("li", {
      className: "two-lines"
    }, _etch.default.dom("div", {
      className: iconClass
    }, item.name), _etch.default.dom("div", {
      className: "secondary-line"
    }, item.paths));
  }

}

exports.default = SelectListItemComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJpdGVtIiwiaWNvbkNsYXNzIiwiaWNvbiIsIm5hbWUiLCJwYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7O0FBRkE7O0FBSUE7OztBQUdlLE1BQU1BLHVCQUFOLENBQThCO0FBQzNDOzs7O0FBSUFDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjs7QUFDQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNRixjQUFLRSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0osS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxjQUFLRyxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsVUFBTTtBQUFFQyxNQUFBQTtBQUFGLFFBQVcsS0FBS1IsS0FBdEI7QUFDQSxVQUFNUyxTQUFTLEdBQUdELElBQUksQ0FBQ0UsSUFBTCxHQUNiLHFCQUFvQkYsSUFBSSxDQUFDRSxJQUFLLE9BRGpCLEdBRWQsY0FGSjtBQUlBLFdBQ0U7QUFBSSxNQUFBLFNBQVMsRUFBQztBQUFkLE9BQ0U7QUFBSyxNQUFBLFNBQVMsRUFBRUQ7QUFBaEIsT0FBNEJELElBQUksQ0FBQ0csSUFBakMsQ0FERixFQUVFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUFpQ0gsSUFBSSxDQUFDSSxLQUF0QyxDQUZGLENBREY7QUFNRDs7QUEvQzBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGljb25DbGFzcyA9IGl0ZW0uaWNvblxuICAgICAgPyBgcHJpbWFyeS1saW5lIGljb24gJHtpdGVtLmljb259LWljb25gXG4gICAgICA6ICdwcmltYXJ5LWxpbmUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ljb25DbGFzc30+e2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnktbGluZVwiPntpdGVtLnBhdGhzfTwvZGl2PlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=