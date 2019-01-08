'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props) {
    console.log('created editor-paths component', props);

    this.name = props.name;

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-paths component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-paths component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-paths component', this);

    return _etch2.default.dom(
      'button',
      { className: 'btn btn-primary' },
      'Add path(s)'
    );
  }
}
exports.default = EditorPaths; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxXQUFOLENBQWtCO0FBQy9CO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJDLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q0YsS0FBOUM7O0FBRUEsU0FBS0csSUFBTCxHQUFZSCxNQUFNRyxJQUFsQjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNOLEtBQWQsRUFBcUI7QUFDbkJDLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxJQUE5QyxFQUFvREYsS0FBcEQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0ksZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmUixZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0QsSUFBaEQ7QUFDQSxVQUFNRSxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVCxZQUFRQyxHQUFSLENBQVksaUNBQVosRUFBK0MsSUFBL0M7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBUSxXQUFVLGlCQUFsQjtBQUFBO0FBQUEsS0FERjtBQUdEO0FBdEM4QjtrQkFBWkosVyxFQUxyQiIsImZpbGUiOiJwYXRocy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yUGF0aHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgcHJvcHMpO1xuXG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPkFkZCBwYXRoKHMpPC9idXR0b24+XG4gICAgKTtcbiAgfVxufVxuIl19