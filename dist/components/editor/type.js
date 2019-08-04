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
class EditorType {
  /* eslint-disable-next-line require-jsdoc */
  didClick(evt) {
    var type = evt.target.closest('label').textContent.toLowerCase();
    this.onDidChange(type);
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props, children) {
    console.log('created editor-type component', props, children);
    this.onDidChange = props.onDidChange;
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
      console.log('updated editor-type component', _this, props);

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
      console.log('destroyed editor-type component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered editor-type component', this);
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom("label", {
      class: "input-label"
    }, _etch.default.dom("input", {
      class: "input-radio",
      type: "radio",
      name: "type",
      on: {
        click: evt => this.didClick(evt)
      }
    }), "Group"), _etch.default.dom("label", {
      class: "input-label"
    }, _etch.default.dom("input", {
      class: "input-radio",
      type: "radio",
      name: "type",
      on: {
        click: evt => this.didClick(evt)
      }
    }), "Project"));
  }

}

exports.default = EditorType;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJkaWRDbGljayIsImV2dCIsInR5cGUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsIm9uRGlkQ2hhbmdlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxFQUFBQSxRQUFRLENBQUVDLEdBQUYsRUFBTztBQUNiLFFBQU1DLElBQUksR0FBR0QsR0FBRyxDQUFDRSxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsT0FBbkIsRUFBNEJDLFdBQTVCLENBQXdDQyxXQUF4QyxFQUFiO0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkwsSUFBakI7QUFDRDtBQUVEOzs7QUFDQU0sRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVNDLFFBQVQsRUFBbUI7QUFDNUJDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDSCxLQUE3QyxFQUFvREMsUUFBcEQ7QUFFQSxTQUFLSCxXQUFMLEdBQW1CRSxLQUFLLENBQUNGLFdBQXpCO0FBQ0EsU0FBS0csUUFBTCxHQUFnQkEsUUFBaEI7O0FBQ0FHLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNOLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQkUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkMsS0FBN0MsRUFBbURILEtBQW5EOztBQUVBLFVBQUlBLEtBQUosRUFBVztBQUNULGVBQU9JLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVBtQjtBQVFwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2ZQLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaLEVBQStDLE1BQS9DO0FBQ0EsWUFBTUMsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQUZlO0FBR2hCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUlIsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0NBQVosRUFBOEMsSUFBOUM7QUFFQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHLEtBQUtGLFFBQUwsQ0FBY1UsR0FBZCxDQUFrQkMsS0FBSyxJQUFJQSxLQUEzQixDQURILEVBRUU7QUFBTyxNQUFBLEtBQUssRUFBQztBQUFiLE9BQ0U7QUFDRSxNQUFBLEtBQUssRUFBQyxhQURSO0FBRUUsTUFBQSxJQUFJLEVBQUMsT0FGUDtBQUdFLE1BQUEsSUFBSSxFQUFDLE1BSFA7QUFJRSxNQUFBLEVBQUUsRUFBRTtBQUNGQyxRQUFBQSxLQUFLLEVBQUVyQixHQUFHLElBQUksS0FBS0QsUUFBTCxDQUFjQyxHQUFkO0FBRFo7QUFKTixNQURGLFVBRkYsRUFhRTtBQUFPLE1BQUEsS0FBSyxFQUFDO0FBQWIsT0FDRTtBQUNFLE1BQUEsS0FBSyxFQUFDLGFBRFI7QUFFRSxNQUFBLElBQUksRUFBQyxPQUZQO0FBR0UsTUFBQSxJQUFJLEVBQUMsTUFIUDtBQUlFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZxQixRQUFBQSxLQUFLLEVBQUVyQixHQUFHLElBQUksS0FBS0QsUUFBTCxDQUFjQyxHQUFkO0FBRFo7QUFKTixNQURGLFlBYkYsQ0FERjtBQTJCRDs7QUFwRTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JUeXBlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2dCkge1xuICAgIGNvbnN0IHR5cGUgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xhYmVsJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlKHR5cGUpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHByb3BzLCBjaGlsZHJlbik7XG5cbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1yYWRpb1wiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInR5cGVcIlxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IGV2dCA9PiB0aGlzLmRpZENsaWNrKGV2dClcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBHcm91cFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1yYWRpb1wiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInR5cGVcIlxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IGV2dCA9PiB0aGlzLmRpZENsaWNrKGV2dClcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBQcm9qZWN0XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=