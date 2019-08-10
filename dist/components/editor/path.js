"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class EditorPath {
  /* eslint-disable-next-line require-jsdoc */
  didRemovePath(event) {
    this.onDidRemovePath(this.path);
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props) {
    this.path = props.path;
    this.onDidRemovePath = props.onDidRemovePath;

    _etch.default.initialize(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _etch.default.update(_this);
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
    return _etch.default.dom("li", {
      class: "list-item"
    }, _etch.default.dom("span", {
      class: "'icon icon-x",
      on: {
        click: this.didRemovePath
      }
    }, this.path));
  }

}

exports.default = EditorPath;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRoLmpzIl0sIm5hbWVzIjpbIkVkaXRvclBhdGgiLCJkaWRSZW1vdmVQYXRoIiwiZXZlbnQiLCJvbkRpZFJlbW92ZVBhdGgiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxVQUFOLENBQWlCO0FBQzlCO0FBQ0FDLEVBQUFBLGFBQWEsQ0FBRUMsS0FBRixFQUFTO0FBQ3BCLFNBQUtDLGVBQUwsQ0FBcUIsS0FBS0MsSUFBMUI7QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0YsSUFBTCxHQUFZRSxLQUFLLENBQUNGLElBQWxCO0FBQ0EsU0FBS0QsZUFBTCxHQUF1QkcsS0FBSyxDQUFDSCxlQUE3Qjs7QUFDQUksa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7QUFDTUMsRUFBQUEsTUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsYUFBT0MsY0FBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQURtQjtBQUVwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUgsY0FBS0csT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFO0FBQUksTUFBQSxLQUFLLEVBQUM7QUFBVixPQUNFO0FBQ0UsTUFBQSxLQUFLLEVBQUMsY0FEUjtBQUVFLE1BQUEsRUFBRSxFQUFFO0FBQUVDLFFBQUFBLEtBQUssRUFBRSxLQUFLWDtBQUFkO0FBRk4sT0FJRyxLQUFLRyxJQUpSLENBREYsQ0FERjtBQVVEOztBQW5DNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvclBhdGgge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRSZW1vdmVQYXRoIChldmVudCkge1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoKHRoaXMucGF0aCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnBhdGggPSBwcm9wcy5wYXRoO1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoID0gcHJvcHMub25EaWRSZW1vdmVQYXRoO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cIidpY29uIGljb24teFwiXG4gICAgICAgICAgb249e3sgY2xpY2s6IHRoaXMuZGlkUmVtb3ZlUGF0aCB9fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucGF0aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=