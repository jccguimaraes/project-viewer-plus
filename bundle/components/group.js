'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

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
    this.props.expanded = !this.props.expanded;
    this.update(this.props);
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
   * @returns {Object} description
   */
  render() {
    const events = {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop,
      dragend: this.didDragEnd
    };

    const icon = this.props.model.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.model.icon}-icon` : '';
    const foldingState = this.props.expanded ? 'expanded' : 'collapsed';

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${foldingState}` },
      _etch2.default.dom(
        'div',
        { className: 'list-item pv-group', on: _extends({}, events), draggable: 'true' },
        _etch2.default.dom(
          'span',
          { className: icon },
          this.props.model.name
        )
      ),
      _etch2.default.dom(_list2.default, this.props)
    );
  }
};
exports.default = GroupComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJleHBhbmRlZCIsImRpZERyYWciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJyZW5kZXIiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJkcmFnZW5kIiwiaWNvbiIsIm1vZGVsIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlQWN0aXZlIiwiZm9sZGluZ1N0YXRlIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQUxBOztBQU9BOzs7SUFHTUEsYyxHQUFOLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbkI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sZUFBS0csTUFBTCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLFFBQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2YsU0FBS1IsS0FBTCxDQUFXUyxRQUFYLEdBQXNCLENBQUMsS0FBS1QsS0FBTCxDQUFXUyxRQUFsQztBQUNBLFNBQUtOLE1BQUwsQ0FBWSxLQUFLSCxLQUFqQjtBQUNEOztBQUVEOzs7O0FBSUFVLFVBQVNGLEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUcsSUFBYixFQUFtQixLQUFLWCxLQUF4QjtBQUNBUSxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVAsS0FBWixFQUFtQjtBQUNqQiwwQkFBT0EsTUFBTUcsSUFBYixFQUFtQixLQUFLWCxLQUF4QjtBQUNBUSxVQUFNSSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1QsS0FBVCxFQUFnQjtBQUNkLDBCQUFPQSxNQUFNRyxJQUFiLEVBQW1CLEtBQUtYLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQWtCLFdBQVU7QUFDUixVQUFNQyxTQUFTO0FBQ2JDLGFBQU8sS0FBS2IsUUFEQztBQUViYyxpQkFBVyxLQUFLWCxPQUZIO0FBR2JZLFlBQU0sS0FBS0wsT0FIRTtBQUliTSxlQUFTLEtBQUtSO0FBSkQsS0FBZjs7QUFPQSxVQUFNUyxPQUNKLEtBQUt4QixLQUFMLENBQVd5QixLQUFYLENBQWlCRCxJQUFqQixJQUF5QkUsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQXpCLEdBQ0ssUUFBTyxLQUFLNUIsS0FBTCxDQUFXeUIsS0FBWCxDQUFpQkQsSUFBSyxPQURsQyxHQUVJLEVBSE47QUFJQSxVQUFNSyxlQUFlLEtBQUs3QixLQUFMLENBQVdTLFFBQVgsR0FBc0IsVUFBdEIsR0FBbUMsV0FBeEQ7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFZLG9CQUFtQm9CLFlBQWEsRUFBaEQ7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLG9CQUFmLEVBQW9DLGlCQUFTVixNQUFULENBQXBDLEVBQXVELFdBQVUsTUFBakU7QUFDRTtBQUFBO0FBQUEsWUFBTSxXQUFXSyxJQUFqQjtBQUF3QixlQUFLeEIsS0FBTCxDQUFXeUIsS0FBWCxDQUFpQks7QUFBekM7QUFERixPQURGO0FBS0UseUNBQW1CLEtBQUs5QixLQUF4QjtBQUxGLEtBREY7QUFTRDtBQTlGa0IsQztrQkFpR05GLGMiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBHcm91cENvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5wcm9wcy5leHBhbmRlZCA9ICF0aGlzLnByb3BzLmV4cGFuZGVkO1xuICAgIHRoaXMudXBkYXRlKHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICBkcm9wOiB0aGlzLmRpZERyb3AsXG4gICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmRcbiAgICB9O1xuXG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnByb3BzLm1vZGVsLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5tb2RlbC5pY29ufS1pY29uYFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IGZvbGRpbmdTdGF0ZSA9IHRoaXMucHJvcHMuZXhwYW5kZWQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHtmb2xkaW5nU3RhdGV9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHB2LWdyb3VwXCIgb249e3sgLi4uZXZlbnRzIH19IGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGlzdENvbnRhaW5lciB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cENvbXBvbmVudDtcbiJdfQ==