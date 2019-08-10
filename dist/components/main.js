"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _list = _interopRequireDefault(require("./../containers/list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor(props) {
    this.groups = props.groups;
    this.projects = props.projects;

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.groups = props.groups;
        _this.projects = props.projects;
        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    return _etch.default.dom(_list.default, {
      groups: this.groups,
      projects: this.projects,
      isRoot: true
    });
  }

}

exports.default = MainComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7QUFHQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsTUFBTCxHQUFjRCxLQUFLLENBQUNDLE1BQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkYsS0FBSyxDQUFDRSxRQUF0Qjs7QUFDQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7O0FBS01DLEVBQUFBLE1BQU4sQ0FBY0wsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDQyxNQUFMLEdBQWNELEtBQUssQ0FBQ0MsTUFBcEI7QUFDQSxRQUFBLEtBQUksQ0FBQ0MsUUFBTCxHQUFnQkYsS0FBSyxDQUFDRSxRQUF0QjtBQUVBLGVBQU9DLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUwsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFLGtCQUFDLGFBQUQ7QUFBZSxNQUFBLE1BQU0sRUFBRSxLQUFLUixNQUE1QjtBQUFvQyxNQUFBLFFBQVEsRUFBRSxLQUFLQyxRQUFuRDtBQUE2RCxNQUFBLE1BQU07QUFBbkUsTUFERjtBQUdEOztBQXBDZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TGlzdENvbnRhaW5lciBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gaXNSb290IC8+XG4gICAgKTtcbiAgfVxufVxuIl19