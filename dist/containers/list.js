'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _group = require('./../components/group');

var _group2 = _interopRequireDefault(_group);

var _project = require('./../components/project');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class ListContainer {
  /**
   * @param {Object} props etch component properties
   * @param {boolean} props.isRoot ...
   * @param {array} props.groups ...
   * @param {array} props.projects ...
   */
  constructor(props) {
    this.className = props.isRoot ? 'list-tree has-collapsable-children' : 'list-tree';
    this.groups = props.groups;
    this.projects = props.projects;

    _etch2.default.initialize(this);
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

      return _etch2.default.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    return _etch2.default.dom(
      'ul',
      { className: this.className },
      this.groups.map(resource => _etch2.default.dom(_group2.default, resource)),
      this.projects.map(resource => _etch2.default.dom(_project2.default, { resource: resource, key: resource.id }))
    );
  }
}
exports.default = ListContainer; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjbGFzc05hbWUiLCJpc1Jvb3QiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwicmVzb3VyY2UiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7Ozs7OztBQU1BQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLFNBQUwsR0FBaUJELE1BQU1FLE1BQU4sR0FDYixvQ0FEYSxHQUViLFdBRko7QUFHQSxTQUFLQyxNQUFMLEdBQWNILE1BQU1HLE1BQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkosTUFBTUksUUFBdEI7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjUCxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtHLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0Qjs7QUFFQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUwsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVcsS0FBS1YsU0FBcEI7QUFDRyxXQUFLRSxNQUFMLENBQVlTLEdBQVosQ0FBZ0JDLFlBQ2YsbUJBQUMsZUFBRCxFQUFvQkEsUUFBcEIsQ0FERCxDQURIO0FBSUcsV0FBS1QsUUFBTCxDQUFjUSxHQUFkLENBQWtCQyxZQUNqQixtQkFBQyxpQkFBRCxJQUFrQixVQUFVQSxRQUE1QixFQUFzQyxLQUFLQSxTQUFTQyxFQUFwRCxHQUREO0FBSkgsS0FERjtBQVVEO0FBbERnQztrQkFBZGhCLGEsRUFQckIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJvcHMuaXNSb290IC4uLlxuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcy5ncm91cHMgLi4uXG4gICAqIEBwYXJhbSB7YXJyYXl9IHByb3BzLnByb2plY3RzIC4uLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5jbGFzc05hbWUgPSBwcm9wcy5pc1Jvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX0+XG4gICAgICAgIHt0aGlzLmdyb3Vwcy5tYXAocmVzb3VyY2UgPT4gKFxuICAgICAgICAgIDxHcm91cENvbXBvbmVudCB7Li4ucmVzb3VyY2V9IC8+XG4gICAgICAgICkpfVxuICAgICAgICB7dGhpcy5wcm9qZWN0cy5tYXAocmVzb3VyY2UgPT4gKFxuICAgICAgICAgIDxQcm9qZWN0Q29tcG9uZW50IHJlc291cmNlPXtyZXNvdXJjZX0ga2V5PXtyZXNvdXJjZS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==