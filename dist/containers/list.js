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
        onSelectProject: this.props.onSelectProject
      }))), projects.map(project => _etch2.default.dom(_project2.default, _extends({}, project, {
        key: project.id,
        onSelectProject: this.props.onSelectProject
      })))]
    );
  }
}
exports.default = ListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImdyb3VwcyIsInByb2plY3RzIiwiaXNSb290IiwiY2xhc3NOYW1lIiwibWFwIiwiZ3JvdXAiLCJpZCIsIm9uU2VsZWN0UHJvamVjdCIsInByb2plY3QiXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1MLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsVUFBTSxFQUFFQyxNQUFGLEVBQVVDLFFBQVYsRUFBb0JDLE1BQXBCLEtBQStCLEtBQUtWLEtBQTFDO0FBQ0EsVUFBTVcsWUFBWUQsU0FDZCxvQ0FEYyxHQUVkLFdBRko7O0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFXQyxTQUFmO0FBQ0csT0FDQ0gsT0FBT0ksR0FBUCxDQUFXQyxTQUNULG1CQUFDLGVBQUQsZUFDTUEsS0FETjtBQUVFLGFBQUtBLE1BQU1DLEVBRmI7QUFHRSx5QkFBaUIsS0FBS2QsS0FBTCxDQUFXZTtBQUg5QixTQURGLENBREQsRUFRQ04sU0FBU0csR0FBVCxDQUFhSSxXQUNYLG1CQUFDLGlCQUFELGVBQ01BLE9BRE47QUFFRSxhQUFLQSxRQUFRRixFQUZmO0FBR0UseUJBQWlCLEtBQUtkLEtBQUwsQ0FBV2U7QUFIOUIsU0FERixDQVJEO0FBREgsS0FERjtBQW9CRDtBQTdEZ0M7a0JBQWRqQixhIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZ3JvdXAnO1xuaW1wb3J0IFByb2plY3RDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2plY3QnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RDb250YWluZXIge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7IGdyb3VwcywgcHJvamVjdHMsIGlzUm9vdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjbGFzc05hbWUgPSBpc1Jvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtbXG4gICAgICAgICAgZ3JvdXBzLm1hcChncm91cCA9PiAoXG4gICAgICAgICAgICA8R3JvdXBDb21wb25lbnRcbiAgICAgICAgICAgICAgey4uLmdyb3VwfVxuICAgICAgICAgICAgICBrZXk9e2dyb3VwLmlkfVxuICAgICAgICAgICAgICBvblNlbGVjdFByb2plY3Q9e3RoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKSxcbiAgICAgICAgICBwcm9qZWN0cy5tYXAocHJvamVjdCA9PiAoXG4gICAgICAgICAgICA8UHJvamVjdENvbXBvbmVudFxuICAgICAgICAgICAgICB7Li4ucHJvamVjdH1cbiAgICAgICAgICAgICAga2V5PXtwcm9qZWN0LmlkfVxuICAgICAgICAgICAgICBvblNlbGVjdFByb2plY3Q9e3RoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKVxuICAgICAgICBdfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG4iXX0=