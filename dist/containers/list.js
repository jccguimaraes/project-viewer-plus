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
   */
  constructor(props) {
    this.groups = props.groups;
    this.projects = props.projects;
    this.isRoot = props.isRoot;

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
    const className = this.isRoot ? 'list-tree has-collapsable-children' : 'list-tree';

    return _etch2.default.dom(
      'ul',
      { className: className },
      this.groups.map(resource => _etch2.default.dom(_group2.default, { resource: resource, key: resource.id })),
      this.projects.map(resource => _etch2.default.dom(_project2.default, { resource: resource, key: resource.id }))
    );
  }
}
exports.default = ListContainer; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJncm91cHMiLCJwcm9qZWN0cyIsImlzUm9vdCIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibWFwIiwicmVzb3VyY2UiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7OztBQUdBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLE1BQUwsR0FBY0QsTUFBTUMsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCRixNQUFNRSxRQUF0QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjTixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtDLE1BQUwsR0FBY0QsTUFBTUMsTUFBcEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCRixNQUFNRSxRQUF0Qjs7QUFFQSxhQUFPRSxlQUFLRSxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUwsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUixVQUFNQyxZQUFZLEtBQUtSLE1BQUwsR0FDZCxvQ0FEYyxHQUVkLFdBRko7O0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFXUSxTQUFmO0FBQ0csV0FBS1YsTUFBTCxDQUFZVyxHQUFaLENBQWdCQyxZQUNmLG1CQUFDLGVBQUQsSUFBZ0IsVUFBVUEsUUFBMUIsRUFBb0MsS0FBS0EsU0FBU0MsRUFBbEQsR0FERCxDQURIO0FBSUcsV0FBS1osUUFBTCxDQUFjVSxHQUFkLENBQWtCQyxZQUNqQixtQkFBQyxpQkFBRCxJQUFrQixVQUFVQSxRQUE1QixFQUFzQyxLQUFLQSxTQUFTQyxFQUFwRCxHQUREO0FBSkgsS0FERjtBQVVEO0FBakRnQztrQkFBZGhCLGEsRUFQckIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG4gICAgdGhpcy5pc1Jvb3QgPSBwcm9wcy5pc1Jvb3Q7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmlzUm9vdFxuICAgICAgPyAnbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbidcbiAgICAgIDogJ2xpc3QtdHJlZSc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge3RoaXMuZ3JvdXBzLm1hcChyZXNvdXJjZSA9PiAoXG4gICAgICAgICAgPEdyb3VwQ29tcG9uZW50IHJlc291cmNlPXtyZXNvdXJjZX0ga2V5PXtyZXNvdXJjZS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHt0aGlzLnByb2plY3RzLm1hcChyZXNvdXJjZSA9PiAoXG4gICAgICAgICAgPFByb2plY3RDb21wb25lbnQgcmVzb3VyY2U9e3Jlc291cmNlfSBrZXk9e3Jlc291cmNlLmlkfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19