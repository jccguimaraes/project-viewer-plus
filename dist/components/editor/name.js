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
      value: this.name
    });
  }
}
exports.default = EditorName; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksK0JBQVosRUFBNkNGLEtBQTdDOztBQUVBLFNBQUtHLElBQUwsR0FBWUgsTUFBTUcsSUFBbEI7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjTixLQUFkLEVBQXFCO0FBQ25CQyxZQUFRQyxHQUFSLENBQVksK0JBQVosRUFBNkMsSUFBN0MsRUFBbURGLEtBQW5EOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9JLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZlIsWUFBUUMsR0FBUixDQUFZLGlDQUFaLEVBQStDLElBQS9DO0FBQ0EsVUFBTUUsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUlQsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDOztBQUVBLFdBQ0U7QUFDRSxpQkFBVSxZQURaO0FBRUUsWUFBSyxNQUZQO0FBR0UsbUJBQVksYUFIZDtBQUlFLGFBQU8sS0FBS0M7QUFKZCxNQURGO0FBUUQ7QUEzQzZCO2tCQUFYTCxVLEVBTHJCIiwiZmlsZSI6Im5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck5hbWUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItbmFtZSBjb21wb25lbnQnLCBwcm9wcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3ItbmFtZSBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICBjbGFzc05hbWU9XCJpbnB1dC10ZXh0XCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIk5hbWUgb2YgLi4uXCJcbiAgICAgICAgdmFsdWU9e3RoaXMubmFtZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19