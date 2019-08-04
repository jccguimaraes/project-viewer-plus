"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class ConfirmDelete {
  /* eslint-disable-next-line require-jsdoc */
  closePanel() {
    var panel = atom.workspace.getModalPanels().find(panel => panel.item === this);
    panel.destroy();
  }
  /* eslint-disable-next-line require-jsdoc */


  didDelete() {
    _state.default.deleteEntry(this.id);

    this.closePanel();
  }
  /* eslint-disable-next-line require-jsdoc */


  didCancel() {
    this.closePanel();
  }
  /**
   * @param {number} id - etch component properties
   */


  constructor(id) {
    console.log('created confirm-delete component', id);
    this.id = id;
    this.entry = _state.default.getEntry(id);

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
      console.log('updated confirm-delete component', _this, props);

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
      console.log('destroyed confirm-delete component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered confirm-delete component', this);
    return _etch.default.dom("div", {
      class: "inset-panel padded"
    }, _etch.default.dom("p", null, "Delete ", _etch.default.dom("strong", null, this.entry.name), "?"), _etch.default.dom("div", {
      class: "block"
    }, _etch.default.dom("button", {
      on: {
        click: this.didDelete
      },
      class: "btn btn-success inline-block-tight"
    }, "Confirm"), _etch.default.dom("button", {
      on: {
        click: this.didCancel
      },
      class: "btn btn-error inline-block-tight"
    }, "Cancel")));
  }

}

exports.default = ConfirmDelete;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiaWQiLCJkaWRDYW5jZWwiLCJjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJlbnRyeSIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwibmFtZSIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLEVBQUFBLFVBQVUsR0FBSTtBQUNaLFFBQU1DLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxTQUFMLENBQ1hDLGNBRFcsR0FFWEMsSUFGVyxDQUVOSixLQUFLLElBQUlBLEtBQUssQ0FBQ0ssSUFBTixLQUFlLElBRmxCLENBQWQ7QUFHQUwsSUFBQUEsS0FBSyxDQUFDTSxPQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLFNBQVMsR0FBSTtBQUNYQyxtQkFBTUMsV0FBTixDQUFrQixLQUFLQyxFQUF2Qjs7QUFDQSxTQUFLWCxVQUFMO0FBQ0Q7QUFFRDs7O0FBQ0FZLEVBQUFBLFNBQVMsR0FBSTtBQUNYLFNBQUtaLFVBQUw7QUFDRDtBQUVEOzs7OztBQUdBYSxFQUFBQSxXQUFXLENBQUVGLEVBQUYsRUFBTTtBQUNmRyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnREosRUFBaEQ7QUFDQSxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLSyxLQUFMLEdBQWFQLGVBQU1RLFFBQU4sQ0FBZU4sRUFBZixDQUFiOztBQUNBTyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjQyxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkJQLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtDQUFaLEVBQWdELEtBQWhELEVBQXNETSxLQUF0RDs7QUFFQSxVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFPSCxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0UsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFQbUI7QUFRcEI7QUFFRDs7O0FBQ01oQixFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZk8sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0NBQVosRUFBa0QsTUFBbEQ7QUFDQSxZQUFNRyxjQUFLWCxPQUFMLENBQWEsTUFBYixDQUFOO0FBRmU7QUFHaEI7QUFFRDs7O0FBQ0FpQixFQUFBQSxNQUFNLEdBQUk7QUFDUlYsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUNBQVosRUFBaUQsSUFBakQ7QUFFQSxXQUNFO0FBQUssTUFBQSxLQUFLLEVBQUM7QUFBWCxPQUNFLHdDQUNTLGtDQUFTLEtBQUtDLEtBQUwsQ0FBV1MsSUFBcEIsQ0FEVCxNQURGLEVBSUU7QUFBSyxNQUFBLEtBQUssRUFBQztBQUFYLE9BQ0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGQyxRQUFBQSxLQUFLLEVBQUUsS0FBS2xCO0FBRFYsT0FETjtBQUlFLE1BQUEsS0FBSyxFQUFDO0FBSlIsaUJBREYsRUFTRTtBQUNFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZrQixRQUFBQSxLQUFLLEVBQUUsS0FBS2Q7QUFEVixPQUROO0FBSUUsTUFBQSxLQUFLLEVBQUM7QUFKUixnQkFURixDQUpGLENBREY7QUF5QkQ7O0FBaEZnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1EZWxldGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjbG9zZVBhbmVsICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGF0b20ud29ya3NwYWNlXG4gICAgICAuZ2V0TW9kYWxQYW5lbHMoKVxuICAgICAgLmZpbmQocGFuZWwgPT4gcGFuZWwuaXRlbSA9PT0gdGhpcyk7XG4gICAgcGFuZWwuZGVzdHJveSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRGVsZXRlICgpIHtcbiAgICBzdGF0ZS5kZWxldGVFbnRyeSh0aGlzLmlkKTtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENhbmNlbCAoKSB7XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgY29uZmlybS1kZWxldGUgY29tcG9uZW50JywgaWQpO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgY29uZmlybS1kZWxldGUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zZXQtcGFuZWwgcGFkZGVkXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIERlbGV0ZSA8c3Ryb25nPnt0aGlzLmVudHJ5Lm5hbWV9PC9zdHJvbmc+P1xuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9ja1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZERlbGV0ZVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ29uZmlybVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENhbmNlbFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==