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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwiRGF0YWJhc2UiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJleHBhbmRlZCIsImRpZERyYWciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJyZW5kZXIiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJkcmFnZW5kIiwiaWNvbiIsIm1vZGVsIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlQWN0aXZlIiwiZm9sZGluZ1N0YXRlIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQUxBOztBQU9BOzs7SUFHTUEsYyxHQUFOLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbkI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLElBQUlDLGtCQUFKLEVBQWhCO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0wsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU9HLGVBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNTCxlQUFLSyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmLFNBQUtWLEtBQUwsQ0FBV1csUUFBWCxHQUFzQixDQUFDLEtBQUtYLEtBQUwsQ0FBV1csUUFBbEM7QUFDQSxTQUFLTixNQUFMLENBQVksS0FBS0wsS0FBakI7QUFDRDs7QUFFRDs7OztBQUlBWSxVQUFTRixLQUFULEVBQWdCO0FBQ2QsMEJBQU9BLE1BQU1HLElBQWIsRUFBbUIsS0FBS2IsS0FBeEI7QUFDQVUsVUFBTUksTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVlQLEtBQVosRUFBbUI7QUFDakIsMEJBQU9BLE1BQU1HLElBQWIsRUFBbUIsS0FBS2IsS0FBeEI7QUFDQVUsVUFBTUksTUFBTixDQUFhQyxTQUFiLENBQXVCRyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNULEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUcsSUFBYixFQUFtQixLQUFLYixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUFvQixXQUFVO0FBQ1IsVUFBTUMsU0FBUztBQUNiQyxhQUFPLEtBQUtiLFFBREM7QUFFYmMsaUJBQVcsS0FBS1gsT0FGSDtBQUdiWSxZQUFNLEtBQUtMLE9BSEU7QUFJYk0sZUFBUyxLQUFLUjtBQUpELEtBQWY7O0FBT0EsVUFBTVMsT0FDSixLQUFLMUIsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQkQsSUFBakIsSUFBeUJFLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUF6QixHQUNLLFFBQU8sS0FBSzlCLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJELElBQUssT0FEbEMsR0FFSSxFQUhOO0FBSUEsVUFBTUssZUFBZSxLQUFLL0IsS0FBTCxDQUFXVyxRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLFdBQXhEOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBWSxvQkFBbUJvQixZQUFhLEVBQWhEO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxvQkFBZixFQUFvQyxpQkFBU1YsTUFBVCxDQUFwQyxFQUF1RCxXQUFVLE1BQWpFO0FBQ0U7QUFBQTtBQUFBLFlBQU0sV0FBV0ssSUFBakI7QUFBd0IsZUFBSzFCLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJLO0FBQXpDO0FBREYsT0FERjtBQUtFLHlCQUFDLGNBQUQsRUFBbUIsS0FBS2hDLEtBQXhCO0FBTEYsS0FERjtBQVNEO0FBOUZrQixDO2tCQWlHTkYsYyIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLmV4cGFuZGVkID0gIXRoaXMucHJvcHMuZXhwYW5kZWQ7XG4gICAgdGhpcy51cGRhdGUodGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgIH07XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMucHJvcHMubW9kZWwuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLm1vZGVsLmljb259LWljb25gXG4gICAgICAgIDogJyc7XG4gICAgY29uc3QgZm9sZGluZ1N0YXRlID0gdGhpcy5wcm9wcy5leHBhbmRlZCA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke2ZvbGRpbmdTdGF0ZX1gfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gcHYtZ3JvdXBcIiBvbj17eyAuLi5ldmVudHMgfX0gZHJhZ2dhYmxlPVwidHJ1ZVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMucHJvcHMubW9kZWwubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyb3VwQ29tcG9uZW50O1xuIl19