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
class EditorOrder {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    this.children = children;

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
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom("label", null, "Sort By\xA0", _etch.default.dom("select", {
      class: "input-select"
    }, _etch.default.dom("option", null, "Alphabetically"), _etch.default.dom("option", null, "Position"))));
  }

}

exports.default = EditorOrder;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcmRlci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JPcmRlciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjaGlsZHJlbiIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVNDLFFBQVQsRUFBbUI7QUFDNUIsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7O0FBQ0FDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNKLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFPRSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFMbUI7QUFNcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU1MLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFEZTtBQUVoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLUCxRQUFMLENBQWNRLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFLGdEQUVFO0FBQVEsTUFBQSxLQUFLLEVBQUM7QUFBZCxPQUNFLG1EQURGLEVBRUUsNkNBRkYsQ0FGRixDQUZGLENBREY7QUFZRDs7QUF2QzhCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JPcmRlciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgU29ydCBCeSZuYnNwO1xuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJpbnB1dC1zZWxlY3RcIj5cbiAgICAgICAgICAgIDxvcHRpb24+QWxwaGFiZXRpY2FsbHk8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24+UG9zaXRpb248L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==