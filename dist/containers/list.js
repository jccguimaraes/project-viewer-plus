'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

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
    console.log('created list', props);

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
    console.log('updated list', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed list', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered list', this);

    return _etch2.default.dom(
      'ul',
      { className: this.className },
      this.groups.map(entry => _etch2.default.dom(_group2.default, _extends({}, entry, { key: entry.id }))),
      this.projects.map(entry => _etch2.default.dom(_project2.default, _extends({}, entry, { key: entry.id })))
    );
  }
}
exports.default = ListContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiY2xhc3NOYW1lIiwiaXNSb290IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImVudHJ5IiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQzs7Ozs7O0FBTUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJDLFlBQVFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCRixLQUE1Qjs7QUFFQSxTQUFLRyxTQUFMLEdBQWlCSCxNQUFNSSxNQUFOLEdBQ2Isb0NBRGEsR0FFYixXQUZKO0FBR0EsU0FBS0MsTUFBTCxHQUFjTCxNQUFNSyxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JOLE1BQU1NLFFBQXRCOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1QsS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLGNBQVosRUFBNEIsSUFBNUIsRUFBa0NGLEtBQWxDOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtLLE1BQUwsR0FBY0wsTUFBTUssTUFBcEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCTixNQUFNTSxRQUF0Qjs7QUFFQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZYLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixJQUE5QjtBQUNBLFVBQU1LLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JaLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBVyxLQUFLQyxTQUFwQjtBQUNHLFdBQUtFLE1BQUwsQ0FBWVMsR0FBWixDQUFnQkMsU0FDZixtQkFBQyxlQUFELGVBQW9CQSxLQUFwQixJQUEyQixLQUFLQSxNQUFNQyxFQUF0QyxJQURELENBREg7QUFJRyxXQUFLVixRQUFMLENBQWNRLEdBQWQsQ0FBa0JDLFNBQ2pCLG1CQUFDLGlCQUFELGVBQXNCQSxLQUF0QixJQUE2QixLQUFLQSxNQUFNQyxFQUF4QyxJQUREO0FBSkgsS0FERjtBQVVEO0FBekRnQztrQkFBZGxCLGEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJvcHMuaXNSb290IC4uLlxuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcy5ncm91cHMgLi4uXG4gICAqIEBwYXJhbSB7YXJyYXl9IHByb3BzLnByb2plY3RzIC4uLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgbGlzdCcsIHByb3BzKTtcblxuICAgIHRoaXMuY2xhc3NOYW1lID0gcHJvcHMuaXNSb290XG4gICAgICA/ICdsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuJ1xuICAgICAgOiAnbGlzdC10cmVlJztcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGxpc3QnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBsaXN0JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgbGlzdCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfT5cbiAgICAgICAge3RoaXMuZ3JvdXBzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPEdyb3VwQ29tcG9uZW50IHsuLi5lbnRyeX0ga2V5PXtlbnRyeS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHt0aGlzLnByb2plY3RzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPFByb2plY3RDb21wb25lbnQgey4uLmVudHJ5fSBrZXk9e2VudHJ5LmlkfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19