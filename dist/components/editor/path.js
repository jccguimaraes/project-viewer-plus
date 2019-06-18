'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    _etch2.default.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update(props) {
    return _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    return _etch2.default.dom(
      'li',
      { 'class': 'list-item' },
      _etch2.default.dom(
        'span',
        {
          'class': '\'icon icon-x',
          on: { click: this.didRemovePath }
        },
        this.path
      )
    );
  }
}
exports.default = EditorPath; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRoLmpzIl0sIm5hbWVzIjpbIkVkaXRvclBhdGgiLCJkaWRSZW1vdmVQYXRoIiwiZXZlbnQiLCJvbkRpZFJlbW92ZVBhdGgiLCJwYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxnQkFBZUMsS0FBZixFQUFzQjtBQUNwQixTQUFLQyxlQUFMLENBQXFCLEtBQUtDLElBQTFCO0FBQ0Q7O0FBRUQ7QUFDQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQkMsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDRixLQUE3QztBQUNBLFNBQUtGLElBQUwsR0FBWUUsTUFBTUYsSUFBbEI7QUFDQSxTQUFLRCxlQUFMLEdBQXVCRyxNQUFNSCxlQUE3QjtBQUNBTSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsTUFBTixDQUFjTCxLQUFkLEVBQXFCO0FBQ25CLFdBQU9HLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNSCxlQUFLRyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSLFdBQ0U7QUFBQTtBQUFBLFFBQUksU0FBTSxXQUFWO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsbUJBQU0sZUFEUjtBQUVFLGNBQUksRUFBRUMsT0FBTyxLQUFLYixhQUFkO0FBRk47QUFJRyxhQUFLRztBQUpSO0FBREYsS0FERjtBQVVEO0FBcEM2QjtrQkFBWEosVSxFQUxyQiIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JQYXRoIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkUmVtb3ZlUGF0aCAoZXZlbnQpIHtcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aCh0aGlzLnBhdGgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLXBhdGggY29tcG9uZW50JywgcHJvcHMpO1xuICAgIHRoaXMucGF0aCA9IHByb3BzLnBhdGg7XG4gICAgdGhpcy5vbkRpZFJlbW92ZVBhdGggPSBwcm9wcy5vbkRpZFJlbW92ZVBhdGg7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzcz1cImxpc3QtaXRlbVwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIGNsYXNzPVwiJ2ljb24gaWNvbi14XCJcbiAgICAgICAgICBvbj17eyBjbGljazogdGhpcy5kaWRSZW1vdmVQYXRoIH19XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wYXRofVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==