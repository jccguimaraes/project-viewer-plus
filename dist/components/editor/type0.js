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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlMC5qcyJdLCJuYW1lcyI6WyJFZGl0b3JUeXBlIiwiZGlkQ2xpY2siLCJldnQiLCJ0eXBlIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRleHRDb250ZW50IiwidG9Mb3dlckNhc2UiLCJvbkRpZENoYW5nZSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjaGlsZHJlbiIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLFVBQU4sQ0FBaUI7QUFDOUI7QUFDQUMsRUFBQUEsUUFBUSxDQUFFQyxHQUFGLEVBQU87QUFDYixRQUFNQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsTUFBSixDQUFXQyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCQyxXQUE1QixDQUF3Q0MsV0FBeEMsRUFBYjtBQUNBLFNBQUtDLFdBQUwsQ0FBaUJMLElBQWpCO0FBQ0Q7QUFFRDs7O0FBQ0FNLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTQyxRQUFULEVBQW1CO0FBQzVCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0gsS0FBN0MsRUFBb0RDLFFBQXBEO0FBRUEsU0FBS0gsV0FBTCxHQUFtQkUsS0FBSyxDQUFDRixXQUF6QjtBQUNBLFNBQUtHLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUNBRyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjTixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkJFLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDLEtBQTdDLEVBQW1ESCxLQUFuRDs7QUFFQSxVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFPSSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFQbUI7QUFRcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmUCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxNQUEvQztBQUNBLFlBQU1DLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1JSLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDO0FBRUEsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLRixRQUFMLENBQWNVLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFO0FBQU8sTUFBQSxLQUFLLEVBQUM7QUFBYixPQUNFO0FBQ0UsTUFBQSxLQUFLLEVBQUMsYUFEUjtBQUVFLE1BQUEsSUFBSSxFQUFDLE9BRlA7QUFHRSxNQUFBLElBQUksRUFBQyxNQUhQO0FBSUUsTUFBQSxFQUFFLEVBQUU7QUFDRkMsUUFBQUEsS0FBSyxFQUFFckIsR0FBRyxJQUFJLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sTUFERixVQUZGLEVBYUU7QUFBTyxNQUFBLEtBQUssRUFBQztBQUFiLE9BQ0U7QUFDRSxNQUFBLEtBQUssRUFBQyxhQURSO0FBRUUsTUFBQSxJQUFJLEVBQUMsT0FGUDtBQUdFLE1BQUEsSUFBSSxFQUFDLE1BSFA7QUFJRSxNQUFBLEVBQUUsRUFBRTtBQUNGcUIsUUFBQUEsS0FBSyxFQUFFckIsR0FBRyxJQUFJLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sTUFERixZQWJGLENBREY7QUEyQkQ7O0FBcEU2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yVHlwZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldnQpIHtcbiAgICBjb25zdCB0eXBlID0gZXZ0LnRhcmdldC5jbG9zZXN0KCdsYWJlbCcpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5vbkRpZENoYW5nZSh0eXBlKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCBwcm9wcywgY2hpbGRyZW4pO1xuXG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtcmFkaW9cIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0eXBlXCJcbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiBldnQgPT4gdGhpcy5kaWRDbGljayhldnQpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgR3JvdXBcbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtcmFkaW9cIlxuICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgIG5hbWU9XCJ0eXBlXCJcbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiBldnQgPT4gdGhpcy5kaWRDbGljayhldnQpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgUHJvamVjdFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19