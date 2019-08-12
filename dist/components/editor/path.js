"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

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


  async update(props) {
    return _etch.default.update(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRoLmpzIl0sIm5hbWVzIjpbIkVkaXRvclBhdGgiLCJkaWRSZW1vdmVQYXRoIiwiZXZlbnQiLCJvbkRpZFJlbW92ZVBhdGgiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTs7QUFJQTtBQUNlLE1BQU1BLFVBQU4sQ0FBaUI7QUFDOUI7QUFDQUMsRUFBQUEsYUFBYSxDQUFFQyxLQUFGLEVBQVM7QUFDcEIsU0FBS0MsZUFBTCxDQUFxQixLQUFLQyxJQUExQjtBQUNEO0FBRUQ7OztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLRixJQUFMLEdBQVlFLEtBQUssQ0FBQ0YsSUFBbEI7QUFDQSxTQUFLRCxlQUFMLEdBQXVCRyxLQUFLLENBQUNILGVBQTdCOztBQUNBSSxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixXQUFPQyxjQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7QUFFRDs7O0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1ILGNBQUtHLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsV0FDRTtBQUFJLE1BQUEsS0FBSyxFQUFDO0FBQVYsT0FDRTtBQUNFLE1BQUEsS0FBSyxFQUFDLGNBRFI7QUFFRSxNQUFBLEVBQUUsRUFBRTtBQUFFQyxRQUFBQSxLQUFLLEVBQUUsS0FBS1g7QUFBZDtBQUZOLE9BSUcsS0FBS0csSUFKUixDQURGLENBREY7QUFVRDs7QUFuQzZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JQYXRoIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkUmVtb3ZlUGF0aCAoZXZlbnQpIHtcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aCh0aGlzLnBhdGgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wYXRoID0gcHJvcHMucGF0aDtcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aCA9IHByb3BzLm9uRGlkUmVtb3ZlUGF0aDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzPVwibGlzdC1pdGVtXCI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgY2xhc3M9XCInaWNvbiBpY29uLXhcIlxuICAgICAgICAgIG9uPXt7IGNsaWNrOiB0aGlzLmRpZFJlbW92ZVBhdGggfX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnBhdGh9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19