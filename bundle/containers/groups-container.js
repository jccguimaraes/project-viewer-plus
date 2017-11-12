Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _groupComponent = require('../components/group-component');

var _groupComponent2 = _interopRequireDefault(_groupComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let GroupsContainer = class GroupsContainer {

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
   * @returns {Object} description
   */
  getGroups() {
    return this.props.groups.forEach(group => _etch2.default.dom(_groupComponent2.default, null));
  }

  /**
   *
   * @returns {Object} description
   */
  render() {

    const groups = [];

    return this.getGroups();
  }
};
exports.default = GroupsContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2dyb3Vwcy1jb250YWluZXIuanMiXSwibmFtZXMiOlsiR3JvdXBzQ29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJnZXRHcm91cHMiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7MmNBSEE7O0FBS0E7OztJQUdNQSxlLEdBQU4sTUFBTUEsZUFBTixDQUFzQjs7QUFFcEI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjRixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxlQUFLRSxNQUFMLE9BQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsUUFBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLGNBQWE7QUFDWCxXQUFPLEtBQUtOLEtBQUwsQ0FBV08sTUFBWCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFNBQVMsa0RBQW5DLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVOztBQUVSLFVBQU1ILFNBQVMsRUFBZjs7QUFFQSxXQUNFLEtBQUtELFNBQUwsRUFERjtBQUdEO0FBcERtQixDO2tCQXVEUFIsZSIsImZpbGUiOiJncm91cHMtY29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgR3JvdXBDb21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9ncm91cC1jb21wb25lbnQnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEdyb3Vwc0NvbnRhaW5lciB7XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0R3JvdXBzICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5ncm91cHMuZm9yRWFjaChncm91cCA9PiA8R3JvdXBDb21wb25lbnQgLz4pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuXG4gICAgY29uc3QgZ3JvdXBzID0gW107XG5cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRHcm91cHMoKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JvdXBzQ29udGFpbmVyO1xuIl19