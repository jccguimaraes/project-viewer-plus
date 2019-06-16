'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorType {
  /* eslint-disable-next-line require-jsdoc */
  didClick(evt) {
    const type = evt.target.closest('label').textContent.toLowerCase();
    this.onDidChange(type);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-type component', props, children);

    this.onDidChange = props.onDidChange;
    this.children = children;
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

    return _etch2.default.dom(
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom(
        'label',
        { 'class': 'input-label' },
        _etch2.default.dom('input', {
          'class': 'input-radio',
          type: 'radio',
          name: 'type',
          on: {
            click: evt => this.didClick(evt)
          }
        }),
        'Group'
      ),
      _etch2.default.dom(
        'label',
        { 'class': 'input-label' },
        _etch2.default.dom('input', {
          'class': 'input-radio',
          type: 'radio',
          name: 'type',
          on: {
            click: evt => this.didClick(evt)
          }
        }),
        'Project'
      )
    );
  }
}
exports.default = EditorType; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJkaWRDbGljayIsImV2dCIsInR5cGUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsIm9uRGlkQ2hhbmdlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiY2hpbGQiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxXQUFVQyxHQUFWLEVBQWU7QUFDYixVQUFNQyxPQUFPRCxJQUFJRSxNQUFKLENBQVdDLE9BQVgsQ0FBbUIsT0FBbkIsRUFBNEJDLFdBQTVCLENBQXdDQyxXQUF4QyxFQUFiO0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkwsSUFBakI7QUFDRDs7QUFFRDtBQUNBTSxjQUFhQyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QjtBQUM1QkMsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDSCxLQUE3QyxFQUFvREMsUUFBcEQ7O0FBRUEsU0FBS0gsV0FBTCxHQUFtQkUsTUFBTUYsV0FBekI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBRyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY04sS0FBZCxFQUFxQjtBQUNuQkUsWUFBUUMsR0FBUixDQUFZLCtCQUFaLEVBQTZDLElBQTdDLEVBQW1ESCxLQUFuRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSSxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZQLFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQztBQUNBLFVBQU1DLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JSLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4QyxJQUE5Qzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRyxXQUFLRixRQUFMLENBQWNVLEdBQWQsQ0FBa0JDLFNBQVNBLEtBQTNCLENBREg7QUFFRTtBQUFBO0FBQUEsVUFBTyxTQUFNLGFBQWI7QUFDRTtBQUNFLG1CQUFNLGFBRFI7QUFFRSxnQkFBSyxPQUZQO0FBR0UsZ0JBQUssTUFIUDtBQUlFLGNBQUk7QUFDRkMsbUJBQU9yQixPQUFPLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sVUFERjtBQUFBO0FBQUEsT0FGRjtBQWFFO0FBQUE7QUFBQSxVQUFPLFNBQU0sYUFBYjtBQUNFO0FBQ0UsbUJBQU0sYUFEUjtBQUVFLGdCQUFLLE9BRlA7QUFHRSxnQkFBSyxNQUhQO0FBSUUsY0FBSTtBQUNGcUIsbUJBQU9yQixPQUFPLEtBQUtELFFBQUwsQ0FBY0MsR0FBZDtBQURaO0FBSk4sVUFERjtBQUFBO0FBQUE7QUFiRixLQURGO0FBMkJEO0FBcEU2QjtrQkFBWEYsVSxFQUxyQiIsImZpbGUiOiJ0eXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JUeXBlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2dCkge1xuICAgIGNvbnN0IHR5cGUgPSBldnQudGFyZ2V0LmNsb3Nlc3QoJ2xhYmVsJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlKHR5cGUpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci10eXBlIGNvbXBvbmVudCcsIHByb3BzLCBjaGlsZHJlbik7XG5cbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLXR5cGUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3ItdHlwZSBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1yYWRpb1wiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInR5cGVcIlxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IGV2dCA9PiB0aGlzLmRpZENsaWNrKGV2dClcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBHcm91cFxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1yYWRpb1wiXG4gICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgbmFtZT1cInR5cGVcIlxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IGV2dCA9PiB0aGlzLmRpZENsaWNrKGV2dClcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICBQcm9qZWN0XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=