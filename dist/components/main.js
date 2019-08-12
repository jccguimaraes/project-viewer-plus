"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _list = _interopRequireDefault(require("./../containers/list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor(props) {
    this.groups = props.groups;
    this.projects = props.projects;

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;
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
    return _etch.default.dom(_list.default, {
      groups: this.groups,
      projects: this.projects,
      isRoot: true
    });
  }

}

exports.default = MainComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFIQTs7QUFLQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7OztBQUdBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxNQUFMLEdBQWNELEtBQUssQ0FBQ0MsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCRixLQUFLLENBQUNFLFFBQXRCOztBQUNBQyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0MsTUFBTCxHQUFjRCxLQUFLLENBQUNDLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkYsS0FBSyxDQUFDRSxRQUF0QjtBQUVBLGFBQU9DLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0Usa0JBQUMsYUFBRDtBQUFlLE1BQUEsTUFBTSxFQUFFLEtBQUtSLE1BQTVCO0FBQW9DLE1BQUEsUUFBUSxFQUFFLEtBQUtDLFFBQW5EO0FBQTZELE1BQUEsTUFBTTtBQUFuRSxNQURGO0FBR0Q7O0FBcENnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSBpc1Jvb3QgLz5cbiAgICApO1xuICB9XG59XG4iXX0=