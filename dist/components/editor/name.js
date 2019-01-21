'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorName {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props) {
    console.log('created editor-name component', props);

    this.name = props.name;
    this.onDidChange = props.onDidChange;

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-name component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-name component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-name component', this);

    return _etch2.default.dom('input', {
      className: 'input-text',
      type: 'text',
      placeholder: 'Name of ...',
      value: this.name,
      on: {
        keyup: event => this.onDidChange(event.target.value)
      }
    });
  }
}
exports.default = EditorName; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJvbkRpZENoYW5nZSIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwia2V5dXAiLCJldmVudCIsInRhcmdldCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxVQUFOLENBQWlCO0FBQzlCO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJDLFlBQVFDLEdBQVIsQ0FBWSwrQkFBWixFQUE2Q0YsS0FBN0M7O0FBRUEsU0FBS0csSUFBTCxHQUFZSCxNQUFNRyxJQUFsQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJKLE1BQU1JLFdBQXpCOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDLElBQTdDLEVBQW1ERixLQUFuRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZULFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQztBQUNBLFVBQU1HLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JWLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxJQUE5Qzs7QUFFQSxXQUNFO0FBQ0UsaUJBQVUsWUFEWjtBQUVFLFlBQUssTUFGUDtBQUdFLG1CQUFZLGFBSGQ7QUFJRSxhQUFPLEtBQUtDLElBSmQ7QUFLRSxVQUFJO0FBQ0ZTLGVBQU9DLFNBQVMsS0FBS1QsV0FBTCxDQUFpQlMsTUFBTUMsTUFBTixDQUFhQyxLQUE5QjtBQURkO0FBTE4sTUFERjtBQVdEO0FBL0M2QjtrQkFBWGpCLFUsRUFMckIiLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yTmFtZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHByb3BzKTtcblxuICAgIHRoaXMubmFtZSA9IHByb3BzLm5hbWU7XG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItbmFtZSBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC10ZXh0XCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWUgb2YgLi4uXCJcbiAgICAgICAgdmFsdWU9e3RoaXMubmFtZX1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBrZXl1cDogZXZlbnQgPT4gdGhpcy5vbkRpZENoYW5nZShldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==