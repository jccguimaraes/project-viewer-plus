"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _listSelector = _interopRequireDefault(require("../list-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class EditorGroups {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(props) {
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props, children) {
    this.children = children;
    this.updateEntry(props);

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.updateEntry(props);
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom(_listSelector.default, {
      groups: this.groups,
      selectedId: this.selectedId,
      onDidClick: this.didClick
    }));
  }

}

exports.default = EditorGroups;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9ncm91cHMuanMiXSwibmFtZXMiOlsiRWRpdG9yR3JvdXBzIiwidXBkYXRlRW50cnkiLCJwcm9wcyIsImdyb3VwcyIsInNlbGVjdGVkSWQiLCJkaWRDbGljayIsIm9uRGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsImNoaWxkcmVuIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUVBOzs7O0FBSkE7O0FBTUE7QUFDZSxNQUFNQSxZQUFOLENBQW1CO0FBQ2hDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLE1BQUwsR0FBY0QsS0FBSyxDQUFDQyxNQUFwQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JGLEtBQUssQ0FBQ0UsVUFBeEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLLENBQUNJLFVBQXRCO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUwsS0FBRixFQUFTTSxRQUFULEVBQW1CO0FBQzVCLFNBQUtBLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS1AsV0FBTCxDQUFpQkMsS0FBakI7O0FBRUFPLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1QsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLRCxXQUFMLENBQWlCQyxLQUFqQjtBQUNBLGFBQU9PLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS1AsUUFBTCxDQUFjUSxHQUFkLENBQWtCQyxLQUFLLElBQUlBLEtBQTNCLENBREgsRUFHRSxrQkFBQyxxQkFBRDtBQUNFLE1BQUEsTUFBTSxFQUFFLEtBQUtkLE1BRGY7QUFFRSxNQUFBLFVBQVUsRUFBRSxLQUFLQyxVQUZuQjtBQUdFLE1BQUEsVUFBVSxFQUFFLEtBQUtDO0FBSG5CLE1BSEYsQ0FERjtBQVdEOztBQWhEK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IExpc3RTZWxlY3RvciBmcm9tICcuLi9saXN0LXNlbGVjdG9yJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckdyb3VwcyB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChwcm9wcykge1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMuc2VsZWN0ZWRJZCA9IHByb3BzLnNlbGVjdGVkSWQ7XG4gICAgdGhpcy5kaWRDbGljayA9IHByb3BzLm9uRGlkQ2xpY2s7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG5cbiAgICAgICAgPExpc3RTZWxlY3RvclxuICAgICAgICAgIGdyb3Vwcz17dGhpcy5ncm91cHN9XG4gICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5zZWxlY3RlZElkfVxuICAgICAgICAgIG9uRGlkQ2xpY2s9e3RoaXMuZGlkQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=