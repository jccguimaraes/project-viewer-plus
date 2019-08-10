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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJkaWRDbGljayIsImV2dCIsInR5cGUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsIm9uRGlkQ2hhbmdlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxVQUFOLENBQWlCO0FBQzlCO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBRUMsR0FBRixFQUFPO0FBQ2IsUUFBTUMsSUFBSSxHQUFHRCxHQUFHLENBQUNFLE1BQUosQ0FBV0MsT0FBWCxDQUFtQixPQUFuQixFQUE0QkMsV0FBNUIsQ0FBd0NDLFdBQXhDLEVBQWI7QUFDQSxTQUFLQyxXQUFMLENBQWlCTCxJQUFqQjtBQUNEO0FBRUQ7OztBQUNBTSxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBU0MsUUFBVCxFQUFtQjtBQUM1QixTQUFLSCxXQUFMLEdBQW1CRSxLQUFLLENBQUNGLFdBQXpCO0FBQ0EsU0FBS0csUUFBTCxHQUFnQkEsUUFBaEI7O0FBQ0FDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNKLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFPRSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFMbUI7QUFNcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU1MLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFEZTtBQUVoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLUCxRQUFMLENBQWNRLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFO0FBQU8sTUFBQSxLQUFLLEVBQUM7QUFBYixPQUNFO0FBQ0UsTUFBQSxLQUFLLEVBQUMsYUFEUjtBQUVFLE1BQUEsSUFBSSxFQUFDLE9BRlA7QUFHRSxNQUFBLElBQUksRUFBQyxNQUhQO0FBSUUsTUFBQSxFQUFFLEVBQUU7QUFDRkMsUUFBQUEsS0FBSyxFQUFFbkIsR0FBRyxJQUFJLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sTUFERixVQUZGLEVBYUU7QUFBTyxNQUFBLEtBQUssRUFBQztBQUFiLE9BQ0U7QUFDRSxNQUFBLEtBQUssRUFBQyxhQURSO0FBRUUsTUFBQSxJQUFJLEVBQUMsT0FGUDtBQUdFLE1BQUEsSUFBSSxFQUFDLE1BSFA7QUFJRSxNQUFBLEVBQUUsRUFBRTtBQUNGbUIsUUFBQUEsS0FBSyxFQUFFbkIsR0FBRyxJQUFJLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sTUFERixZQWJGLENBREY7QUEyQkQ7O0FBN0Q2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yVHlwZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldnQpIHtcbiAgICBjb25zdCB0eXBlID0gZXZ0LnRhcmdldC5jbG9zZXN0KCdsYWJlbCcpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5vbkRpZENoYW5nZSh0eXBlKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtcmFkaW9cIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0eXBlXCJcbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiBldnQgPT4gdGhpcy5kaWRDbGljayhldnQpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgR3JvdXBcbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtcmFkaW9cIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0eXBlXCJcbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiBldnQgPT4gdGhpcy5kaWRDbGljayhldnQpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgUHJvamVjdFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19