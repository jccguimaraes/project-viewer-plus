'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let MainComponent = class MainComponent {

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
   * @returns {Object} description
   */
  render() {
    const parentId = this.props.ids.find(id => !this.props.map[id].parentId);
    const parent = this.props.map[parentId];

    return _etch2.default.dom(_list2.default, _extends({}, parent, { root: true }));
  }
};
exports.default = MainComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwicGFyZW50SWQiLCJpZHMiLCJmaW5kIiwiaWQiLCJtYXAiLCJwYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7OzJjQUhBOztBQUtBOzs7SUFHTUEsYSxHQUFOLE1BQU1BLGFBQU4sQ0FBb0I7O0FBRWxCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUUYsS0FBUixFQUFlO0FBQ2IsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBTyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsT0FBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLFdBQVU7QUFDUixVQUFNQyxXQUFXLEtBQUtQLEtBQUwsQ0FBV1EsR0FBWCxDQUFlQyxJQUFmLENBQW9CQyxNQUFNLENBQUMsS0FBS1YsS0FBTCxDQUFXVyxHQUFYLENBQWVELEVBQWYsRUFBbUJILFFBQTlDLENBQWpCO0FBQ0EsVUFBTUssU0FBUyxLQUFLWixLQUFMLENBQVdXLEdBQVgsQ0FBZUosUUFBZixDQUFmOztBQUVBLFdBQU8sZ0RBQW1CSyxNQUFuQixJQUEyQixVQUEzQixJQUFQO0FBQ0Q7QUF6Q2lCLEM7a0JBNENMZCxhIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBNYWluQ29tcG9uZW50IHtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBwYXJlbnRJZCA9IHRoaXMucHJvcHMuaWRzLmZpbmQoaWQgPT4gIXRoaXMucHJvcHMubWFwW2lkXS5wYXJlbnRJZCk7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wcm9wcy5tYXBbcGFyZW50SWRdO1xuXG4gICAgcmV0dXJuIDxMaXN0Q29udGFpbmVyIHsuLi5wYXJlbnR9IHJvb3QgLz47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFpbkNvbXBvbmVudDtcbiJdfQ==