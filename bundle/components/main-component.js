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
    return _etch2.default.dom(
      'ol',
      { 'class': 'list-tree has-collapsable-children' },
      this.getGroups(),
      this.getProjects()
    );
  }
};
exports.default = ProjectViewerComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4tY29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIlByb2plY3RWaWV3ZXJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImdldEdyb3VwcyIsImlkcyIsInBhcmVudElkIiwiZmluZCIsImlkIiwibWFwIiwidW5kZWZpbmVkIiwicGFyZW50IiwiZ3JvdXBzIiwiY2hpbGRyZW4iLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJncm91cCIsImdldFByb2plY3RzIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7MmNBSkE7O0FBTUE7OztJQUdNQSxzQixHQUFOLE1BQU1BLHNCQUFOLENBQTZCOztBQUUzQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFNBQVFGLEtBQVIsRUFBZTtBQUNiLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU8sZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLE9BQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxjQUFhO0FBQ1gsUUFBSSxDQUFDLEtBQUtOLEtBQUwsQ0FBV08sR0FBaEIsRUFBcUI7QUFDbkIsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsVUFBTUMsV0FBVyxLQUFLUixLQUFMLENBQVdPLEdBQVgsQ0FBZUUsSUFBZixDQUNmQyxNQUFNLEtBQUtWLEtBQUwsQ0FBV1csR0FBWCxDQUFlRCxFQUFmLEVBQW1CRixRQUFuQixLQUFnQ0ksU0FEdkIsQ0FBakI7O0FBSUEsUUFBSSxDQUFDSixRQUFMLEVBQWU7QUFDYixhQUFPLEVBQVA7QUFDRDs7QUFFRCxVQUFNSyxTQUFTLEtBQUtiLEtBQUwsQ0FBV1csR0FBWCxDQUFlSCxRQUFmLENBQWY7QUFDQSxVQUFNTSxTQUFTRCxPQUFPRSxRQUFQLENBQ1pKLEdBRFksQ0FDUkQsTUFBTSxLQUFLVixLQUFMLENBQVdXLEdBQVgsQ0FBZUQsRUFBZixDQURFLEVBRVpNLE1BRlksQ0FFTEMsU0FBU0EsTUFBTUMsSUFBTixLQUFlLE9BRm5CLENBQWY7O0FBSUEsV0FBT0osT0FBT0gsR0FBUCxDQUFXUSxTQUFTLDZDQUFvQkEsS0FBcEIsQ0FBcEIsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUFDLGdCQUFlO0FBQ2IsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFdBQ0U7QUFBQTtBQUFBLFFBQUksU0FBTSxvQ0FBVjtBQUNHLFdBQUtmLFNBQUwsRUFESDtBQUVHLFdBQUtjLFdBQUw7QUFGSCxLQURGO0FBTUQ7QUE1RTBCLEM7a0JBK0VkdEIsc0IiLCJmaWxlIjoibWFpbi1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuL2dyb3VwLWNvbXBvbmVudCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuL3Byb2plY3QtY29tcG9uZW50JztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBQcm9qZWN0Vmlld2VyQ29tcG9uZW50IHtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRHcm91cHMgKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5pZHMpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnRJZCA9IHRoaXMucHJvcHMuaWRzLmZpbmQoXG4gICAgICBpZCA9PiB0aGlzLnByb3BzLm1hcFtpZF0ucGFyZW50SWQgPT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBpZiAoIXBhcmVudElkKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wcm9wcy5tYXBbcGFyZW50SWRdO1xuICAgIGNvbnN0IGdyb3VwcyA9IHBhcmVudC5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLnByb3BzLm1hcFtpZF0pXG4gICAgICAuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnR5cGUgPT09ICdncm91cCcpO1xuXG4gICAgcmV0dXJuIGdyb3Vwcy5tYXAoZ3JvdXAgPT4gPEdyb3VwQ29tcG9uZW50IHsuLi5ncm91cH0gLz4pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFByb2plY3RzICgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxvbCBjbGFzcz0nbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbic+XG4gICAgICAgIHt0aGlzLmdldEdyb3VwcygpfVxuICAgICAgICB7dGhpcy5nZXRQcm9qZWN0cygpfVxuICAgICAgPC9vbD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RWaWV3ZXJDb21wb25lbnQ7XG4iXX0=