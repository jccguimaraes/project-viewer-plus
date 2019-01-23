'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorOptions {
  /* eslint-disable-next-line require-jsdoc */
  onDidClick(action) {
    this.didClick(action);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(props) {
    console.log('created editor-options component', props);

    this.didClick = props.ondidClick;
    this.pristine = props.pristine;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-options component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-options component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-options component', this);

    return _etch2.default.dom(
      'div',
      { className: 'block-container as-row' },
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('delete')
          },
          className: 'btn btn-error inline-block-tight'
        },
        'Delete'
      ),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('cancel')
          },
          className: 'btn btn-info inline-block-tight'
        },
        'Cancel'
      ),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('save')
          },
          className: 'btn btn-success inline-block-tight'
        },
        'Save'
      )
    );
  }
}
exports.default = EditorOptions; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uZGlkQ2xpY2siLCJwcmlzdGluZSIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsYUFBWUMsTUFBWixFQUFvQjtBQUNsQixTQUFLQyxRQUFMLENBQWNELE1BQWQ7QUFDRDs7QUFFRDtBQUNBRSxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0RGLEtBQWhEOztBQUVBLFNBQUtGLFFBQUwsR0FBZ0JFLE1BQU1HLFVBQXRCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkosTUFBTUksUUFBdEI7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNQLEtBQWQsRUFBcUI7QUFDbkJDLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRCxFQUFzREYsS0FBdEQ7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBT0ssZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVCxZQUFRQyxHQUFSLENBQVksb0NBQVosRUFBa0QsSUFBbEQ7QUFDQSxVQUFNRyxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVixZQUFRQyxHQUFSLENBQVksbUNBQVosRUFBaUQsSUFBakQ7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLHdCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGVSxtQkFBTyxNQUFNLEtBQUtoQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BREY7QUFTRTtBQUFBO0FBQUE7QUFDRSxjQUFJO0FBQ0ZnQixtQkFBTyxNQUFNLEtBQUtoQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BVEY7QUFpQkU7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGZ0IsbUJBQU8sTUFBTSxLQUFLaEIsVUFBTCxDQUFnQixNQUFoQjtBQURYLFdBRE47QUFJRSxxQkFBVTtBQUpaO0FBQUE7QUFBQTtBQWpCRixLQURGO0FBNEJEO0FBcEVnQztrQkFBZEQsYSxFQUxyQiIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JPcHRpb25zIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDbGljayAoYWN0aW9uKSB7XG4gICAgdGhpcy5kaWRDbGljayhhY3Rpb24pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgcHJvcHMpO1xuXG4gICAgdGhpcy5kaWRDbGljayA9IHByb3BzLm9uZGlkQ2xpY2s7XG4gICAgdGhpcy5wcmlzdGluZSA9IHByb3BzLnByaXN0aW5lO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lciBhcy1yb3dcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5vbkRpZENsaWNrKCdkZWxldGUnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgRGVsZXRlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ2NhbmNlbCcpXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIENhbmNlbFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5vbkRpZENsaWNrKCdzYXZlJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgU2F2ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==