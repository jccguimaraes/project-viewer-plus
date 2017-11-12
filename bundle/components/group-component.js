Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _projectComponent = require('./project-component');

var _projectComponent2 = _interopRequireDefault(_projectComponent);

var _database = require('../services/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let GroupComponent = class GroupComponent {

  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    this.database = new _database2.default();
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.props = props;
        return _etch2.default.update(_this);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this2);
    })();
  }

  /**
   *
   * @param {Object} event - description
   */
  didClick(event) {
    this.props.model.collapsed = !this.props.model.collapsed;
    this.update(this.props);
    this.database.saveContent();
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    console.log(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDragEnd(event) {
    console.log(event.type, this.props);
    event.target.classList.remove('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @returns {Array} description
   */
  getGroups() {
    const groups = this.props.children.map(id => this.database.content.map[id]).filter(child => child.type === 'group');

    return groups.map(group => _etch2.default.dom(GroupComponent, group));
  }

  /**
   *
   * @returns {Array} description
   */
  getProjects() {
    const projects = this.props.children.map(id => this.database.content.map[id]).filter(child => child.type === 'project');

    return projects.map(project => _etch2.default.dom(_projectComponent2.default, project));
  }

  /**
   *
   * @returns {Object} description
   */
  render() {

    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop,
      dragend: this.didDragEnd
    };

    const icon = this.props.model.icon ? `icon icon-${this.props.model.icon}` : '';
    const collapsed = this.props.model.collapsed ? 'collapsed' : 'expanded';

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${collapsed}` },
      _etch2.default.dom(
        'div',
        {
          'class': 'list-item pv-group',
          on: _extends({}, events),
          draggable: 'true'
        },
        _etch2.default.dom(
          'span',
          { className: icon },
          this.props.model.name
        )
      ),
      _etch2.default.dom(
        'ul',
        { 'class': 'list-tree' },
        this.getGroups(),
        this.getProjects()
      )
    );
  }
};
exports.default = GroupComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHcm91cENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJkaWRDbGljayIsImV2ZW50IiwibW9kZWwiLCJjb2xsYXBzZWQiLCJzYXZlQ29udGVudCIsImRpZERyYWciLCJjb25zb2xlIiwibG9nIiwidHlwZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcm9wIiwiZ2V0R3JvdXBzIiwiZ3JvdXBzIiwiY2hpbGRyZW4iLCJtYXAiLCJpZCIsImNvbnRlbnQiLCJmaWx0ZXIiLCJjaGlsZCIsImdyb3VwIiwiZ2V0UHJvamVjdHMiLCJwcm9qZWN0cyIsInByb2plY3QiLCJyZW5kZXIiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJkcmFnZW5kIiwiaWNvbiIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQUpBOztBQU1BOzs7SUFHTUEsYyxHQUFOLE1BQU1BLGNBQU4sQ0FBcUI7O0FBRW5COzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQix3QkFBaEI7QUFDQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01D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cG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuL3Byb2plY3QtY29tcG9uZW50JztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgR3JvdXBDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5tb2RlbC5jb2xsYXBzZWQgPSAhdGhpcy5wcm9wcy5tb2RlbC5jb2xsYXBzZWQ7XG4gICAgdGhpcy51cGRhdGUodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5kYXRhYmFzZS5zYXZlQ29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEdyb3VwcyAoKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW2lkXSlcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudHlwZSA9PT0gJ2dyb3VwJyk7XG5cbiAgICByZXR1cm4gZ3JvdXBzLm1hcChncm91cCA9PiA8R3JvdXBDb21wb25lbnQgey4uLmdyb3VwfSAvPik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge0FycmF5fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UHJvamVjdHMgKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW2lkXSlcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKTtcblxuICAgIHJldHVybiBwcm9qZWN0cy5tYXAocHJvamVjdCA9PiA8UHJvamVjdENvbXBvbmVudCB7Li4ucHJvamVjdH0gLz4pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuXG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgIH07XG5cbiAgICBjb25zdCBpY29uID0gdGhpcy5wcm9wcy5tb2RlbC5pY29uID9cbiAgICAgIGBpY29uIGljb24tJHt0aGlzLnByb3BzLm1vZGVsLmljb259YCA6XG4gICAgICAnJztcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLnByb3BzLm1vZGVsLmNvbGxhcHNlZCA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke2NvbGxhcHNlZH1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPSdsaXN0LWl0ZW0gcHYtZ3JvdXAnXG4gICAgICAgICAgb249e3sgLi4uZXZlbnRzIH19XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5wcm9wcy5tb2RlbC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHVsIGNsYXNzPSdsaXN0LXRyZWUnPlxuICAgICAgICAgIHt0aGlzLmdldEdyb3VwcygpfVxuICAgICAgICAgIHt0aGlzLmdldFByb2plY3RzKCl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JvdXBDb21wb25lbnQ7XG4iXX0=