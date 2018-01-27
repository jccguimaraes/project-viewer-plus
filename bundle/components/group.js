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
    const collapsed = this.props.model.collapsed ? 'collapsed' : 'expanded';

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${collapsed}` },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJtb2RlbCIsImNvbGxhcHNlZCIsInNhdmVDb250ZW50IiwiZGlkRHJhZyIsInR5cGUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiZGlkRHJvcCIsInJlbmRlciIsImV2ZW50cyIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJvcCIsImRyYWdlbmQiLCJpY29uIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlQWN0aXZlIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQUxBOztBQU9BOzs7SUFHTUEsYyxHQUFOLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbkI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sZUFBS0csTUFBTCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLFFBQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2YsU0FBS1IsS0FBTCxDQUFXUyxLQUFYLENBQWlCQyxTQUFqQixHQUE2QixDQUFDLEtBQUtWLEtBQUwsQ0FBV1MsS0FBWCxDQUFpQkMsU0FBL0M7QUFDQSxTQUFLUCxNQUFMLENBQVksS0FBS0gsS0FBakI7QUFDQSxTQUFLQyxRQUFMLENBQWNVLFdBQWQ7QUFDRDs7QUFFRDs7OztBQUlBQyxVQUFTSixLQUFULEVBQWdCO0FBQ2QsMEJBQU9BLE1BQU1LLElBQWIsRUFBbUIsS0FBS2IsS0FBeEI7QUFDQVEsVUFBTU0sTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVlULEtBQVosRUFBbUI7QUFDakIsMEJBQU9BLE1BQU1LLElBQWIsRUFBbUIsS0FBS2IsS0FBeEI7QUFDQVEsVUFBTU0sTUFBTixDQUFhQyxTQUFiLENBQXVCRyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNYLEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUssSUFBYixFQUFtQixLQUFLYixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUFvQixXQUFVO0FBQ1IsVUFBTUMsU0FBUztBQUNiQyxhQUFPLEtBQUtmLFFBREM7QUFFYmdCLGlCQUFXLEtBQUtYLE9BRkg7QUFHYlksWUFBTSxLQUFLTCxPQUhFO0FBSWJNLGVBQVMsS0FBS1I7QUFKRCxLQUFmOztBQU9BLFVBQU1TLE9BQ0osS0FBSzFCLEtBQUwsQ0FBV1MsS0FBWCxDQUFpQmlCLElBQWpCLElBQXlCQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBekIsR0FDSyxRQUFPLEtBQUs3QixLQUFMLENBQVdTLEtBQVgsQ0FBaUJpQixJQUFLLE9BRGxDLEdBRUksRUFITjtBQUlBLFVBQU1oQixZQUFZLEtBQUtWLEtBQUwsQ0FBV1MsS0FBWCxDQUFpQkMsU0FBakIsR0FBNkIsV0FBN0IsR0FBMkMsVUFBN0Q7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFZLG9CQUFtQkEsU0FBVSxFQUE3QztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsb0JBQWYsRUFBb0MsaUJBQVNXLE1BQVQsQ0FBcEMsRUFBdUQsV0FBVSxNQUFqRTtBQUNFO0FBQUE7QUFBQSxZQUFNLFdBQVdLLElBQWpCO0FBQXdCLGVBQUsxQixLQUFMLENBQVdTLEtBQVgsQ0FBaUJxQjtBQUF6QztBQURGLE9BREY7QUFLRSx5Q0FBbUIsS0FBSzlCLEtBQXhCO0FBTEYsS0FERjtBQVNEO0FBL0ZrQixDO2tCQWtHTkYsYyIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLnByb3BzLm1vZGVsLmNvbGxhcHNlZCA9ICF0aGlzLnByb3BzLm1vZGVsLmNvbGxhcHNlZDtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLnByb3BzKTtcbiAgICB0aGlzLmRhdGFiYXNlLnNhdmVDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgIH07XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMucHJvcHMubW9kZWwuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLm1vZGVsLmljb259LWljb25gXG4gICAgICAgIDogJyc7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5wcm9wcy5tb2RlbC5jb2xsYXBzZWQgPyAnY29sbGFwc2VkJyA6ICdleHBhbmRlZCc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHtjb2xsYXBzZWR9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHB2LWdyb3VwXCIgb249e3sgLi4uZXZlbnRzIH19IGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGlzdENvbnRhaW5lciB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcm91cENvbXBvbmVudDtcbiJdfQ==