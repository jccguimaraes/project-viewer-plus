'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let SelectListItemComponent = class SelectListItemComponent {
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
   */
  destroy() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this);
    })();
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this2.props = props;
        return _etch2.default.update(_this2);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const { item } = this.props;
    const iconClass = item.model.icon ? `primary-line icon ${item.model.icon}-icon` : 'primary-line';

    return _etch2.default.dom(
      'li',
      { className: 'two-lines' },
      _etch2.default.dom(
        'div',
        { className: iconClass },
        item.model.name
      ),
      _etch2.default.dom(
        'div',
        { className: 'secondary-line' },
        item.model.paths
      )
    );
  }
};
exports.default = SelectListItemComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3NlbGVjdC1saXN0LWl0ZW0uanMiXSwibmFtZXMiOlsiU2VsZWN0TGlzdEl0ZW1Db21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJpdGVtIiwiaWNvbkNsYXNzIiwibW9kZWwiLCJpY29uIiwibmFtZSIsInBhdGhzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7OzJjQUZBOztBQUlBOzs7SUFHTUEsdUIsR0FBTixNQUFNQSx1QkFBTixDQUE4QjtBQUM1Qjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUYsZUFBS0UsT0FBTCxDQUFhLEtBQWIsQ0FBTjtBQURlO0FBRWhCOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNKLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPQyxlQUFLRyxNQUFMLENBQVksTUFBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7O0FBSUFDLFdBQVU7QUFDUixVQUFNLEVBQUVDLElBQUYsS0FBVyxLQUFLUixLQUF0QjtBQUNBLFVBQU1TLFlBQVlELEtBQUtFLEtBQUwsQ0FBV0MsSUFBWCxHQUNiLHFCQUFvQkgsS0FBS0UsS0FBTCxDQUFXQyxJQUFLLE9BRHZCLEdBRWQsY0FGSjs7QUFJQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVUsV0FBZDtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVdGLFNBQWhCO0FBQTRCRCxhQUFLRSxLQUFMLENBQVdFO0FBQXZDLE9BREY7QUFFRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGdCQUFmO0FBQWlDSixhQUFLRSxLQUFMLENBQVdHO0FBQTVDO0FBRkYsS0FERjtBQU1EO0FBL0MyQixDO2tCQWtEZmYsdUIiLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIFNlbGVjdExpc3RJdGVtQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBpdGVtIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGljb25DbGFzcyA9IGl0ZW0ubW9kZWwuaWNvblxuICAgICAgPyBgcHJpbWFyeS1saW5lIGljb24gJHtpdGVtLm1vZGVsLmljb259LWljb25gXG4gICAgICA6ICdwcmltYXJ5LWxpbmUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9XCJ0d28tbGluZXNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ljb25DbGFzc30+e2l0ZW0ubW9kZWwubmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWNvbmRhcnktbGluZVwiPntpdGVtLm1vZGVsLnBhdGhzfTwvZGl2PlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdExpc3RJdGVtQ29tcG9uZW50O1xuIl19