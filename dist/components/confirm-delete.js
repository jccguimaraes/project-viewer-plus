"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class ConfirmDelete {
  /* eslint-disable-next-line require-jsdoc */
  closePanel() {
    const panel = atom.workspace.getModalPanels().find(panel => panel.item === this);
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
    this.id = id;
    this.entry = _state.default.getEntry(id);

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiaWQiLCJkaWRDYW5jZWwiLCJjb25zdHJ1Y3RvciIsImVudHJ5IiwiZ2V0RW50cnkiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJuYW1lIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7OztBQUhBOztBQUtBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxFQUFBQSxVQUFVLEdBQUk7QUFDWixVQUFNQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsU0FBTCxDQUNYQyxjQURXLEdBRVhDLElBRlcsQ0FFTkosS0FBSyxJQUFJQSxLQUFLLENBQUNLLElBQU4sS0FBZSxJQUZsQixDQUFkO0FBR0FMLElBQUFBLEtBQUssQ0FBQ00sT0FBTjtBQUNEO0FBRUQ7OztBQUNBQyxFQUFBQSxTQUFTLEdBQUk7QUFDWEMsbUJBQU1DLFdBQU4sQ0FBa0IsS0FBS0MsRUFBdkI7O0FBQ0EsU0FBS1gsVUFBTDtBQUNEO0FBRUQ7OztBQUNBWSxFQUFBQSxTQUFTLEdBQUk7QUFDWCxTQUFLWixVQUFMO0FBQ0Q7QUFFRDs7Ozs7QUFHQWEsRUFBQUEsV0FBVyxDQUFFRixFQUFGLEVBQU07QUFDZixTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLRyxLQUFMLEdBQWFMLGVBQU1NLFFBQU4sQ0FBZUosRUFBZixDQUFiOztBQUNBSyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0gsY0FBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9FLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0Q7QUFFRDs7O0FBQ0EsUUFBTWQsT0FBTixHQUFpQjtBQUNmLFVBQU1TLGNBQUtULE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDtBQUVEOzs7QUFDQWUsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFLLE1BQUEsS0FBSyxFQUFDO0FBQVgsT0FDRSx3Q0FDUyxrQ0FBUyxLQUFLUixLQUFMLENBQVdTLElBQXBCLENBRFQsTUFERixFQUlFO0FBQUssTUFBQSxLQUFLLEVBQUM7QUFBWCxPQUNFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRkMsUUFBQUEsS0FBSyxFQUFFLEtBQUtoQjtBQURWLE9BRE47QUFJRSxNQUFBLEtBQUssRUFBQztBQUpSLGlCQURGLEVBU0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGZ0IsUUFBQUEsS0FBSyxFQUFFLEtBQUtaO0FBRFYsT0FETjtBQUlFLE1BQUEsS0FBSyxFQUFDO0FBSlIsZ0JBVEYsQ0FKRixDQURGO0FBeUJEOztBQTFFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtRGVsZXRlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY2xvc2VQYW5lbCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBhdG9tLndvcmtzcGFjZVxuICAgICAgLmdldE1vZGFsUGFuZWxzKClcbiAgICAgIC5maW5kKHBhbmVsID0+IHBhbmVsLml0ZW0gPT09IHRoaXMpO1xuICAgIHBhbmVsLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERlbGV0ZSAoKSB7XG4gICAgc3RhdGUuZGVsZXRlRW50cnkodGhpcy5pZCk7XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDYW5jZWwgKCkge1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzcz1cImluc2V0LXBhbmVsIHBhZGRlZFwiPlxuICAgICAgICA8cD5cbiAgICAgICAgICBEZWxldGUgPHN0cm9uZz57dGhpcy5lbnRyeS5uYW1lfTwvc3Ryb25nPj9cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvY2tcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgICBjbGljazogdGhpcy5kaWREZWxldGVcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENvbmZpcm1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgICBjbGljazogdGhpcy5kaWRDYW5jZWxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tZXJyb3IgaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=