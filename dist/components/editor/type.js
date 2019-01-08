'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorType {
  /**
   */
  constructor() {
    console.log('created editor-type component');
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-type component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-type component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-type component', this);

    return _etch2.default.dom('div', null);
  }
}
exports.default = EditorType; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxVQUFOLENBQWlCO0FBQzlCOztBQUVBQyxnQkFBZTtBQUNiQyxZQUFRQyxHQUFSLENBQVksK0JBQVo7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFDbkJMLFlBQVFDLEdBQVIsQ0FBWSwrQkFBWixFQUE2QyxJQUE3QyxFQUFtREksS0FBbkQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0gsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmUixZQUFRQyxHQUFSLENBQVksaUNBQVosRUFBK0MsSUFBL0M7QUFDQSxVQUFNQyxlQUFLTSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVCxZQUFRQyxHQUFSLENBQVksZ0NBQVosRUFBOEMsSUFBOUM7O0FBRUEsV0FDRSwrQkFERjtBQUdEO0FBcEM2QjtrQkFBWEgsVSxFQUxyQiIsImZpbGUiOiJ0eXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JUeXBlIHtcbiAgLyoqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50Jyk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+PC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19