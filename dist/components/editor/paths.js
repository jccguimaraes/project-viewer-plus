'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _path = require('./path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  didClick(event) {
    atom.pickFolder(paths => {
      this.onDidAddPaths(paths);
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath(path) {
    this.onDidRemovePath(path);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-paths component', props, children);

    this.onDidAddPaths = props.onDidAddPaths;
    this.onDidRemovePath = props.onDidRemovePath;
    this.children = children;
    this.paths = props.entry.paths || [];

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
      this.paths = props.entry.paths;
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
        {
          on: {
            click: this.didClick
          },
          className: 'btn btn-primary'
        },
        'Add path(s)'
      ),
      _etch2.default.dom(
        'ul',
        { 'class': 'list-group' },
        this.paths.map(path => _etch2.default.dom(_path2.default, {
          path: path,
          onDidRemovePath: path => this.handleRemovePath(path)
        }))
      )
    );
  }
}
exports.default = EditorPaths;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9wYXRocy5qcyJdLCJuYW1lcyI6WyJFZGl0b3JQYXRocyIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwicGlja0ZvbGRlciIsInBhdGhzIiwib25EaWRBZGRQYXRocyIsImhhbmRsZVJlbW92ZVBhdGgiLCJwYXRoIiwib25EaWRSZW1vdmVQYXRoIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsImVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQTtBQU5BOztBQU9lLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7QUFDQUMsV0FBVUMsS0FBVixFQUFpQjtBQUNmQyxTQUFLQyxVQUFMLENBQWdCQyxTQUFTO0FBQ3ZCLFdBQUtDLGFBQUwsQ0FBbUJELEtBQW5CO0FBQ0QsS0FGRDtBQUdEOztBQUVEO0FBQ0FFLG1CQUFrQkMsSUFBbEIsRUFBd0I7QUFDdEIsU0FBS0MsZUFBTCxDQUFxQkQsSUFBckI7QUFDRDs7QUFFRDtBQUNBRSxjQUFhQyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QjtBQUM1QkMsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDSCxLQUE5QyxFQUFxREMsUUFBckQ7O0FBRUEsU0FBS04sYUFBTCxHQUFxQkssTUFBTUwsYUFBM0I7QUFDQSxTQUFLRyxlQUFMLEdBQXVCRSxNQUFNRixlQUE3QjtBQUNBLFNBQUtHLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS1AsS0FBTCxHQUFhTSxNQUFNSSxLQUFOLENBQVlWLEtBQVosSUFBcUIsRUFBbEM7O0FBRUFXLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjUCxLQUFkLEVBQXFCO0FBQ25CRSxZQUFRQyxHQUFSLENBQVksZ0NBQVosRUFBOEMsSUFBOUMsRUFBb0RILEtBQXBEOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtOLEtBQUwsR0FBYU0sTUFBTUksS0FBTixDQUFZVixLQUF6QjtBQUNBLGFBQU9XLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZlIsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdELElBQWhEO0FBQ0EsVUFBTUUsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUlQsWUFBUUMsR0FBUixDQUFZLGlDQUFaLEVBQStDLElBQS9DOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxpQkFBZjtBQUNHLFdBQUtGLFFBQUwsQ0FBY1csR0FBZCxDQUFrQkMsU0FBU0EsS0FBM0IsQ0FESDtBQUVFO0FBQUE7QUFBQTtBQUNFLGNBQUk7QUFDRkMsbUJBQU8sS0FBS3hCO0FBRFYsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BRkY7QUFVRTtBQUFBO0FBQUEsVUFBSSxTQUFNLFlBQVY7QUFDRyxhQUFLSSxLQUFMLENBQVdrQixHQUFYLENBQWVmLFFBQ2QsbUJBQUMsY0FBRDtBQUNFLGdCQUFNQSxJQURSO0FBRUUsMkJBQWlCQSxRQUFRLEtBQUtELGdCQUFMLENBQXNCQyxJQUF0QjtBQUYzQixVQUREO0FBREg7QUFWRixLQURGO0FBcUJEO0FBeEU4QjtrQkFBWlIsVyIsImZpbGUiOiJwYXRocy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgRWRpdG9yUGF0aCBmcm9tICcuL3BhdGgnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yUGF0aHMge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBhdG9tLnBpY2tGb2xkZXIocGF0aHMgPT4ge1xuICAgICAgdGhpcy5vbkRpZEFkZFBhdGhzKHBhdGhzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZVJlbW92ZVBhdGggKHBhdGgpIHtcbiAgICB0aGlzLm9uRGlkUmVtb3ZlUGF0aChwYXRoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItcGF0aHMgY29tcG9uZW50JywgcHJvcHMsIGNoaWxkcmVuKTtcblxuICAgIHRoaXMub25EaWRBZGRQYXRocyA9IHByb3BzLm9uRGlkQWRkUGF0aHM7XG4gICAgdGhpcy5vbkRpZFJlbW92ZVBhdGggPSBwcm9wcy5vbkRpZFJlbW92ZVBhdGg7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMucGF0aHMgPSBwcm9wcy5lbnRyeS5wYXRocyB8fCBbXTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wYXRocyA9IHByb3BzLmVudHJ5LnBhdGhzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLXBhdGhzIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1wYXRocyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICB7dGhpcy5jaGlsZHJlbi5tYXAoY2hpbGQgPT4gY2hpbGQpfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIlxuICAgICAgICA+XG4gICAgICAgICAgQWRkIHBhdGgocylcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAgICB7dGhpcy5wYXRocy5tYXAocGF0aCA9PiAoXG4gICAgICAgICAgICA8RWRpdG9yUGF0aFxuICAgICAgICAgICAgICBwYXRoPXtwYXRofVxuICAgICAgICAgICAgICBvbkRpZFJlbW92ZVBhdGg9e3BhdGggPT4gdGhpcy5oYW5kbGVSZW1vdmVQYXRoKHBhdGgpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==