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
  constructor(props, children) {
    console.log('created editor-name component', props);

    this.name = props.entry.name || '';
    this.type = props.entry.type || '...';
    this.children = children;
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
      this.name = props.entry.name || '';
      this.type = props.entry.type || '...';
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

    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom('input', {
        className: 'input-text',
        type: 'text',
        placeholder: 'Name of ' + this.type,
        value: this.name,
        on: {
          keyup: event => this.onDidChange(event.target.value)
        }
      })
    );
  }
}
exports.default = EditorName; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2hpbGRyZW4iLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImVudHJ5IiwidHlwZSIsIm9uRGlkQ2hhbmdlIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxjQUFhQyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QjtBQUM1QkMsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDSCxLQUE3Qzs7QUFFQSxTQUFLSSxJQUFMLEdBQVlKLE1BQU1LLEtBQU4sQ0FBWUQsSUFBWixJQUFvQixFQUFoQztBQUNBLFNBQUtFLElBQUwsR0FBWU4sTUFBTUssS0FBTixDQUFZQyxJQUFaLElBQW9CLEtBQWhDO0FBQ0EsU0FBS0wsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLTSxXQUFMLEdBQW1CUCxNQUFNTyxXQUF6Qjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNWLEtBQWQsRUFBcUI7QUFDbkJFLFlBQVFDLEdBQVIsQ0FBWSwrQkFBWixFQUE2QyxJQUE3QyxFQUFtREgsS0FBbkQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0ksSUFBTCxHQUFZSixNQUFNSyxLQUFOLENBQVlELElBQVosSUFBb0IsRUFBaEM7QUFDQSxXQUFLRSxJQUFMLEdBQVlOLE1BQU1LLEtBQU4sQ0FBWUMsSUFBWixJQUFvQixLQUFoQztBQUNBLGFBQU9FLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZlgsWUFBUUMsR0FBUixDQUFZLGlDQUFaLEVBQStDLElBQS9DO0FBQ0EsVUFBTUssZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUlosWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNHLFdBQUtGLFFBQUwsQ0FBY2MsR0FBZCxDQUFrQkMsU0FBU0EsS0FBM0IsQ0FESDtBQUVFO0FBQ0UsbUJBQVUsWUFEWjtBQUVFLGNBQUssTUFGUDtBQUdFLHFCQUFhLGFBQWEsS0FBS1YsSUFIakM7QUFJRSxlQUFPLEtBQUtGLElBSmQ7QUFLRSxZQUFJO0FBQ0ZhLGlCQUFPQyxTQUFTLEtBQUtYLFdBQUwsQ0FBaUJXLE1BQU1DLE1BQU4sQ0FBYUMsS0FBOUI7QUFEZDtBQUxOO0FBRkYsS0FERjtBQWNEO0FBdEQ2QjtrQkFBWHRCLFUsRUFMckIiLCJmaWxlIjoibmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yTmFtZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItbmFtZSBjb21wb25lbnQnLCBwcm9wcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5lbnRyeS5uYW1lIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHByb3BzLmVudHJ5LnR5cGUgfHwgJy4uLic7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMub25EaWRDaGFuZ2UgPSBwcm9wcy5vbkRpZENoYW5nZTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLW5hbWUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLm5hbWUgPSBwcm9wcy5lbnRyeS5uYW1lIHx8ICcnO1xuICAgICAgdGhpcy50eXBlID0gcHJvcHMuZW50cnkudHlwZSB8fCAnLi4uJztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXRleHRcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17J05hbWUgb2YgJyArIHRoaXMudHlwZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5uYW1lfVxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBrZXl1cDogZXZlbnQgPT4gdGhpcy5vbkRpZENoYW5nZShldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==