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
    console.log('created editor-path component', props);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRoLmpzIl0sIm5hbWVzIjpbIkVkaXRvclBhdGgiLCJkaWRSZW1vdmVQYXRoIiwiZXZlbnQiLCJvbkRpZFJlbW92ZVBhdGgiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxFQUFBQSxhQUFhLENBQUVDLEtBQUYsRUFBUztBQUNwQixTQUFLQyxlQUFMLENBQXFCLEtBQUtDLElBQTFCO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsS0FBN0M7QUFDQSxTQUFLRixJQUFMLEdBQVlFLEtBQUssQ0FBQ0YsSUFBbEI7QUFDQSxTQUFLRCxlQUFMLEdBQXVCRyxLQUFLLENBQUNILGVBQTdCOztBQUNBTSxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7OztBQUNNQyxFQUFBQSxNQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixhQUFPRyxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBRG1CO0FBRXBCO0FBRUQ7OztBQUNNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNSCxjQUFLRyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRGU7QUFFaEI7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSSxNQUFBLEtBQUssRUFBQztBQUFWLE9BQ0U7QUFDRSxNQUFBLEtBQUssRUFBQyxjQURSO0FBRUUsTUFBQSxFQUFFLEVBQUU7QUFBRUMsUUFBQUEsS0FBSyxFQUFFLEtBQUtiO0FBQWQ7QUFGTixPQUlHLEtBQUtHLElBSlIsQ0FERixDQURGO0FBVUQ7O0FBcEM2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yUGF0aCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZFJlbW92ZVBhdGggKGV2ZW50KSB7XG4gICAgdGhpcy5vbkRpZFJlbW92ZVBhdGgodGhpcy5wYXRoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1wYXRoIGNvbXBvbmVudCcsIHByb3BzKTtcbiAgICB0aGlzLnBhdGggPSBwcm9wcy5wYXRoO1xuICAgIHRoaXMub25EaWRSZW1vdmVQYXRoID0gcHJvcHMub25EaWRSZW1vdmVQYXRoO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bGkgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBjbGFzcz1cIidpY29uIGljb24teFwiXG4gICAgICAgICAgb249e3sgY2xpY2s6IHRoaXMuZGlkUmVtb3ZlUGF0aCB9fVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucGF0aH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=