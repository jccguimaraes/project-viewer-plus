Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

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
    (0, _devlog2.default)(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDragEnd(event) {
    (0, _devlog2.default)(event.type, this.props);
    event.target.classList.remove('dragging');
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    (0, _devlog2.default)(event.type, this.props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHcm91cENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJkaWRDbGljayIsImV2ZW50IiwibW9kZWwiLCJjb2xsYXBzZWQiLCJzYXZlQ29udGVudCIsImRpZERyYWciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJnZXRHcm91cHMiLCJncm91cHMiLCJjaGlsZHJlbiIsIm1hcCIsImlkIiwiY29udGVudCIsImZpbHRlciIsImNoaWxkIiwiZ3JvdXAiLCJnZXRQcm9qZWN0cyIsInByb2plY3RzIiwicHJvamVjdCIsInJlbmRlciIsImV2ZW50cyIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJvcCIsImRyYWdlbmQiLCJpY29uIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FMQTs7QUFPQTs7O0lBR01BLGMsR0FBTixNQUFNQSxjQUFOLENBQXFCOztBQUVuQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isd0JBQWhCO0FBQ0EsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxlQUFLRyxNQUFMLE9BQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdNQyxTQUFOLEdB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ZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuL3Byb2plY3QtY29tcG9uZW50JztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgR3JvdXBDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5tb2RlbC5jb2xsYXBzZWQgPSAhdGhpcy5wcm9wcy5tb2RlbC5jb2xsYXBzZWQ7XG4gICAgdGhpcy51cGRhdGUodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5kYXRhYmFzZS5zYXZlQ29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEdyb3VwcyAoKSB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW2lkXSlcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudHlwZSA9PT0gJ2dyb3VwJyk7XG5cbiAgICByZXR1cm4gZ3JvdXBzLm1hcChncm91cCA9PiA8R3JvdXBDb21wb25lbnQgey4uLmdyb3VwfSAvPik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge0FycmF5fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UHJvamVjdHMgKCkge1xuICAgIGNvbnN0IHByb2plY3RzID0gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgLm1hcChpZCA9PiB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW2lkXSlcbiAgICAgIC5maWx0ZXIoY2hpbGQgPT4gY2hpbGQudHlwZSA9PT0gJ3Byb2plY3QnKTtcblxuICAgIHJldHVybiBwcm9qZWN0cy5tYXAocHJvamVjdCA9PiA8UHJvamVjdENvbXBvbmVudCB7Li4ucHJvamVjdH0gLz4pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuXG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgIH07XG5cbiAgICBjb25zdCBpY29uID0gdGhpcy5wcm9wcy5tb2RlbC5pY29uID9cbiAgICAgIGBpY29uIGljb24tJHt0aGlzLnByb3BzLm1vZGVsLmljb259YCA6XG4gICAgICAnJztcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLnByb3BzLm1vZGVsLmNvbGxhcHNlZCA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke2NvbGxhcHNlZH1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPSdsaXN0LWl0ZW0gcHYtZ3JvdXAnXG4gICAgICAgICAgb249e3sgLi4uZXZlbnRzIH19XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5wcm9wcy5tb2RlbC5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPHVsIGNsYXNzPSdsaXN0LXRyZWUnPlxuICAgICAgICAgIHt0aGlzLmdldEdyb3VwcygpfVxuICAgICAgICAgIHt0aGlzLmdldFByb2plY3RzKCl9XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JvdXBDb21wb25lbnQ7XG4iXX0=