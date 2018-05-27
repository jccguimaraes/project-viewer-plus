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

/**
 *
 */
class ListContainer {
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
   * @param {Object} resource - the updated group or project
   */
  handleUpdate(resource) {
    console.log(resource);
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const { groups, projects, isRoot } = this.props;
    const className = isRoot ? 'list-tree has-collapsable-children' : 'list-tree';

    return _etch2.default.dom(
      'ul',
      { className: className },
      [groups.map(group => _etch2.default.dom(_group2.default, _extends({}, group, {
        key: group.id,
        onUpdate: this.handleUpdate.bind(this)
      }))), projects.map(project => _etch2.default.dom(_project2.default, _extends({}, project, {
        key: project.id,
        onUpdate: this.handleUpdate.bind(this)
      })))]
    );
  }
}
exports.default = ListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImhhbmRsZVVwZGF0ZSIsInJlc291cmNlIiwiY29uc29sZSIsImxvZyIsInJlbmRlciIsImdyb3VwcyIsInByb2plY3RzIiwiaXNSb290IiwiY2xhc3NOYW1lIiwibWFwIiwiZ3JvdXAiLCJpZCIsImJpbmQiLCJwcm9qZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7a1FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQzs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsZUFBY0MsUUFBZCxFQUF3QjtBQUN0QkMsWUFBUUMsR0FBUixDQUFZRixRQUFaO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUcsV0FBVTtBQUNSLFVBQU0sRUFBRUMsTUFBRixFQUFVQyxRQUFWLEVBQW9CQyxNQUFwQixLQUErQixLQUFLZCxLQUExQztBQUNBLFVBQU1lLFlBQVlELFNBQ2Qsb0NBRGMsR0FFZCxXQUZKOztBQUlBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBV0MsU0FBZjtBQUNHLE9BQ0NILE9BQU9JLEdBQVAsQ0FBV0MsU0FDVCxtQkFBQyxlQUFELGVBQ01BLEtBRE47QUFFRSxhQUFLQSxNQUFNQyxFQUZiO0FBR0Usa0JBQVUsS0FBS1gsWUFBTCxDQUFrQlksSUFBbEIsQ0FBdUIsSUFBdkI7QUFIWixTQURGLENBREQsRUFRQ04sU0FBU0csR0FBVCxDQUFhSSxXQUNYLG1CQUFDLGlCQUFELGVBQ01BLE9BRE47QUFFRSxhQUFLQSxRQUFRRixFQUZmO0FBR0Usa0JBQVUsS0FBS1gsWUFBTCxDQUFrQlksSUFBbEIsQ0FBdUIsSUFBdkI7QUFIWixTQURGLENBUkQ7QUFESCxLQURGO0FBb0JEO0FBckVnQztrQkFBZHJCLGEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNvdXJjZSAtIHRoZSB1cGRhdGVkIGdyb3VwIG9yIHByb2plY3RcbiAgICovXG4gIGhhbmRsZVVwZGF0ZSAocmVzb3VyY2UpIHtcbiAgICBjb25zb2xlLmxvZyhyZXNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBncm91cHMsIHByb2plY3RzLCBpc1Jvb3QgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gaXNSb290XG4gICAgICA/ICdsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuJ1xuICAgICAgOiAnbGlzdC10cmVlJztcblxuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICB7W1xuICAgICAgICAgIGdyb3Vwcy5tYXAoZ3JvdXAgPT4gKFxuICAgICAgICAgICAgPEdyb3VwQ29tcG9uZW50XG4gICAgICAgICAgICAgIHsuLi5ncm91cH1cbiAgICAgICAgICAgICAga2V5PXtncm91cC5pZH1cbiAgICAgICAgICAgICAgb25VcGRhdGU9e3RoaXMuaGFuZGxlVXBkYXRlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpLFxuICAgICAgICAgIHByb2plY3RzLm1hcChwcm9qZWN0ID0+IChcbiAgICAgICAgICAgIDxQcm9qZWN0Q29tcG9uZW50XG4gICAgICAgICAgICAgIHsuLi5wcm9qZWN0fVxuICAgICAgICAgICAgICBrZXk9e3Byb2plY3QuaWR9XG4gICAgICAgICAgICAgIG9uVXBkYXRlPXt0aGlzLmhhbmRsZVVwZGF0ZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKVxuICAgICAgICBdfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG4iXX0=