Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _atomSelectList = require('atom-select-list');

var _atomSelectList2 = _interopRequireDefault(_atomSelectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

// import SelectList from '../components/select-list-component';


/**
 *
 */
let SelectListContainer = class SelectListContainer {

  /**
   *
   */
  constructor() {
    this.items = ['Alice', 'Bob', 'Carol'];
    this.elementForItem = item => document.createElement('p');
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
      _this.props = props;
      return _etch2.default.update(_this);
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(_atomSelectList2.default, { items: this.items, elementForItem: this.elementForItem });
  }
};
exports.default = SelectListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3NlbGVjdC1saXN0LWNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJTZWxlY3RMaXN0Q29udGFpbmVyIiwiY29uc3RydWN0b3IiLCJpdGVtcyIsImVsZW1lbnRGb3JJdGVtIiwiaXRlbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBOzs7O0FBRUE7Ozs7OzsyY0FKQTs7QUFHQTs7O0FBR0E7OztJQUdNQSxtQixHQUFOLE1BQU1BLG1CQUFOLENBQTBCOztBQUV4Qjs7O0FBR0FDLGdCQUFlO0FBQ2IsU0FBS0MsS0FBTCxHQUFhLENBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsT0FBakIsQ0FBYjtBQUNBLFNBQUtDLGNBQUwsR0FBc0JDLFFBQVFDLFNBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBOUI7QUFDQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixZQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPLGVBQUtELE1BQUwsT0FBUDtBQUZtQjtBQUdwQjs7QUFFRDs7OztBQUlBRSxXQUFVO0FBQ1IsV0FDRSwrQ0FBWSxPQUFPLEtBQUtSLEtBQXhCLEVBQStCLGdCQUFnQixLQUFLQyxjQUFwRCxHQURGO0FBR0Q7QUE3QnVCLEM7a0JBZ0NYSCxtQiIsImZpbGUiOiJzZWxlY3QtbGlzdC1jb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbi8vIGltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvc2VsZWN0LWxpc3QtY29tcG9uZW50JztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJ2F0b20tc2VsZWN0LWxpc3QnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFNlbGVjdExpc3RDb250YWluZXIge1xuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuaXRlbXMgPSBbJ0FsaWNlJywgJ0JvYicsICdDYXJvbCddO1xuICAgIHRoaXMuZWxlbWVudEZvckl0ZW0gPSBpdGVtID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U2VsZWN0TGlzdCBpdGVtcz17dGhpcy5pdGVtc30gZWxlbWVudEZvckl0ZW09e3RoaXMuZWxlbWVudEZvckl0ZW19IC8+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RMaXN0Q29udGFpbmVyO1xuIl19