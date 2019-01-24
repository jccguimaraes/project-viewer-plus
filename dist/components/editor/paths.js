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
  constructor(props, children) {
    console.log('created editor-paths component', props);

    this.props = props;
    this.children = children;

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
      'div',
      { className: 'block-container' },
      this.children.map(child => child),
      _etch2.default.dom(
        'button',
        { className: 'btn btn-primary' },
        'Add path(s)'
      )
    );
  }
}
exports.default = EditorPaths; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjaGlsZHJlbiIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxXQUFOLENBQWtCO0FBQy9CO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0JDLFFBQXBCLEVBQThCO0FBQzVCQyxZQUFRQyxHQUFSLENBQVksZ0NBQVosRUFBOENILEtBQTlDOztBQUVBLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBRyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY04sS0FBZCxFQUFxQjtBQUNuQkUsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDLEVBQW9ESCxLQUFwRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSSxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZQLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRDtBQUNBLFVBQU1DLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JSLFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsaUJBQWY7QUFDRyxXQUFLRixRQUFMLENBQWNVLEdBQWQsQ0FBa0JDLFNBQVNBLEtBQTNCLENBREg7QUFFRTtBQUFBO0FBQUEsVUFBUSxXQUFVLGlCQUFsQjtBQUFBO0FBQUE7QUFGRixLQURGO0FBTUQ7QUExQzhCO2tCQUFaZCxXLEVBTHJCIiwiZmlsZSI6InBhdGhzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JQYXRocyB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgcHJvcHMpO1xuXG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPkFkZCBwYXRoKHMpPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=