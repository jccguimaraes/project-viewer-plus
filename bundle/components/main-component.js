Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _groupComponent = require('./group-component');

var _groupComponent2 = _interopRequireDefault(_groupComponent);

var _projectComponent = require('./project-component');

var _projectComponent2 = _interopRequireDefault(_projectComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let ProjectViewerComponent = class ProjectViewerComponent {

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
  update(props) {
    if (props) {
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  destroy() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this);
    })();
  }

  /**
   *
   * @returns {Array} description
   */
  getGroups() {
    if (!this.props.ids) {
      return [];
    }

    const parentId = this.props.ids.find(id => this.props.map[id].parentId === undefined);

    if (!parentId) {
      return [];
    }

    const parent = this.props.map[parentId];
    const groups = parent.children.map(id => this.props.map[id]).filter(child => child.type === 'group');

    return groups.map(group => _etch2.default.dom(_groupComponent2.default, group));
  }

  /**
   *
   * @returns {Array} description
   */
  getProjects() {
    return [];
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const groups = this.getGroups();
    const projects = this.getProjects();
    return _etch2.default.dom(
      'ol',
      { className: 'list-tree has-collapsable-children' },
      groups,
      projects
    );
  }
};
exports.default = ProjectViewerComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4tY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImdldEdyb3VwcyIsImlkcyIsInBhcmVudElkIiwiZmluZCIsImlkIiwibWFwIiwidW5kZWZpbmVkIiwicGFyZW50IiwiZ3JvdXBzIiwiY2hpbGRyZW4iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJncm91cCIsImdldFByb2plY3RzIiwicmVuZGVyIiwicHJvamVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FKQTs7QUFNQTs7O0lBR01BLHNCLEdBQU4sTUFBTUEsc0JBQU4sQ0FBNkI7O0FBRTNCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUUYsS0FBUixFQUFlO0FBQ2IsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBTyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsT0FBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLGNBQWE7QUFDWCxRQUFJLENBQUMsS0FBS04sS0FBTCxDQUFXTyxHQUFoQixFQUFxQjtBQUNuQixhQUFPLEVBQVA7QUFDRDs7QUFFRCxVQUFNQyxXQUFXLEtBQUtSLEtBQUwsQ0FBV08sR0FBWCxDQUFlRSxJQUFmLENBQ2ZDLE1BQU0sS0FBS1YsS0FBTCxDQUFXVyxHQUFYLENBQWVELEVBQWYsRUFBbUJGLFFBQW5CLEtBQWdDSSxTQUR2QixDQUFqQjs7QUFJQSxRQUFJLENBQUNKLFFBQUwsRUFBZTtBQUNiLGFBQU8sRUFBUDtBQUNEOztBQUVELFVBQU1LLFNBQVMsS0FBS2IsS0FBTCxDQUFXVyxHQUFYLENBQWVILFFBQWYsQ0FBZjtBQUNBLFVBQU1NLFNBQVNELE9BQU9FLFFBQVAsQ0FDWkosR0FEWSxDQUNSRCxNQUFNLEtBQUtWLEtBQUwsQ0FBV1csR0FBWCxDQUFlRCxFQUFmLENBREUsRUFFWk0sTUFGWSxDQUVMQyxTQUFTQSxNQUFNQyxJQUFOLEtBQWUsT0FGbkIsQ0FBZjs7QUFJQSxXQUFPSixPQUFPSCxHQUFQLENBQVdRLFNBQVMsNkNBQW9CQSxLQUFwQixDQUFwQixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsZ0JBQWU7QUFDYixXQUFPLEVBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsVUFBTVAsU0FBUyxLQUFLUixTQUFMLEVBQWY7QUFDQSxVQUFNZ0IsV0FBVyxLQUFLRixXQUFMLEVBQWpCO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFVLG9DQUFkO0FBQ0dOLFlBREg7QUFFR1E7QUFGSCxLQURGO0FBTUQ7QUE5RTBCLEM7a0JBaUZkeEIsc0IiLCJmaWxlIjoibWFpbi1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuL2dyb3VwLWNvbXBvbmVudCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuL3Byb2plY3QtY29tcG9uZW50JztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBQcm9qZWN0Vmlld2VyQ29tcG9uZW50IHtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRHcm91cHMgKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5pZHMpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRJZCA9IHRoaXMucHJvcHMuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLnByb3BzLm1hcFtpZF0ucGFyZW50SWQgPT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wcm9wcy5tYXBbcGFyZW50SWRdO1xuICAgIGNvbnN0IGdyb3VwcyA9IHBhcmVudC5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLnByb3BzLm1hcFtpZF0pXG4gICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnR5cGUgPT09ICdncm91cCcpO1xuXG4gICAgcmV0dXJuIGdyb3Vwcy5tYXAoZ3JvdXAgPT4gPEdyb3VwQ29tcG9uZW50IHsuLi5ncm91cH0gLz4pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFByb2plY3RzICgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5nZXRHcm91cHMoKTtcbiAgICBjb25zdCBwcm9qZWN0cyA9IHRoaXMuZ2V0UHJvamVjdHMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPG9sIGNsYXNzTmFtZT0nbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbic+XG4gICAgICAgIHtncm91cHN9XG4gICAgICAgIHtwcm9qZWN0c31cbiAgICAgIDwvb2w+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Vmlld2VyQ29tcG9uZW50O1xuIl19