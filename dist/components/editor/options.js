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
    this.actions = props.allowedActions;
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
      this.actions = props.allowedActions;
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

    const allowDelete = this.actions.includes('delete') ? 'btn btn-error inline-block-tight' : 'btn hide';

    const allowSave = this.actions.includes('save') ? 'btn btn-success inline-block-tight' : 'btn hide';

    return _etch2.default.dom(
      'div',
      { className: 'block-container as-row' },
      _etch2.default.dom(
        'button',
        {
          on: {
            click: () => this.onDidClick('delete')
          },
          className: allowDelete
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
          className: allowSave
        },
        'Save'
      )
    );
  }
}
exports.default = EditorOptions; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJvbkRpZENsaWNrIiwiYWN0aW9uIiwiZGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIm9uZGlkQ2xpY2siLCJhY3Rpb25zIiwiYWxsb3dlZEFjdGlvbnMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImFsbG93RGVsZXRlIiwiaW5jbHVkZXMiLCJhbGxvd1NhdmUiLCJjbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxhQUFZQyxNQUFaLEVBQW9CO0FBQ2xCLFNBQUtDLFFBQUwsQ0FBY0QsTUFBZDtBQUNEOztBQUVEO0FBQ0FFLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJDLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnREYsS0FBaEQ7O0FBRUEsU0FBS0YsUUFBTCxHQUFnQkUsTUFBTUcsVUFBdEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVKLE1BQU1LLGNBQXJCO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjUixLQUFkLEVBQXFCO0FBQ25CQyxZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0QsSUFBaEQsRUFBc0RGLEtBQXREOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtJLE9BQUwsR0FBZUosTUFBTUssY0FBckI7QUFDQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZWLFlBQVFDLEdBQVIsQ0FBWSxvQ0FBWixFQUFrRCxJQUFsRDtBQUNBLFVBQU1JLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JYLFlBQVFDLEdBQVIsQ0FBWSxtQ0FBWixFQUFpRCxJQUFqRDs7QUFFQSxVQUFNVyxjQUFjLEtBQUtULE9BQUwsQ0FBYVUsUUFBYixDQUFzQixRQUF0QixJQUNoQixrQ0FEZ0IsR0FFaEIsVUFGSjs7QUFJQSxVQUFNQyxZQUFZLEtBQUtYLE9BQUwsQ0FBYVUsUUFBYixDQUFzQixNQUF0QixJQUNkLG9DQURjLEdBRWQsVUFGSjs7QUFJQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUE7QUFDRSxjQUFJO0FBQ0ZFLG1CQUFPLE1BQU0sS0FBS3BCLFVBQUwsQ0FBZ0IsUUFBaEI7QUFEWCxXQUROO0FBSUUscUJBQVdpQjtBQUpiO0FBQUE7QUFBQSxPQURGO0FBU0U7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGRyxtQkFBTyxNQUFNLEtBQUtwQixVQUFMLENBQWdCLFFBQWhCO0FBRFgsV0FETjtBQUlFLHFCQUFVO0FBSlo7QUFBQTtBQUFBLE9BVEY7QUFpQkU7QUFBQTtBQUFBO0FBQ0UsY0FBSTtBQUNGb0IsbUJBQU8sTUFBTSxLQUFLcEIsVUFBTCxDQUFnQixNQUFoQjtBQURYLFdBRE47QUFJRSxxQkFBV21CO0FBSmI7QUFBQTtBQUFBO0FBakJGLEtBREY7QUE0QkQ7QUE3RWdDO2tCQUFkcEIsYSxFQUxyQiIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JPcHRpb25zIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDbGljayAoYWN0aW9uKSB7XG4gICAgdGhpcy5kaWRDbGljayhhY3Rpb24pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgcHJvcHMpO1xuXG4gICAgdGhpcy5kaWRDbGljayA9IHByb3BzLm9uZGlkQ2xpY2s7XG4gICAgdGhpcy5hY3Rpb25zID0gcHJvcHMuYWxsb3dlZEFjdGlvbnM7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuYWN0aW9ucyA9IHByb3BzLmFsbG93ZWRBY3Rpb25zO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICBjb25zdCBhbGxvd0RlbGV0ZSA9IHRoaXMuYWN0aW9ucy5pbmNsdWRlcygnZGVsZXRlJylcbiAgICAgID8gJ2J0biBidG4tZXJyb3IgaW5saW5lLWJsb2NrLXRpZ2h0J1xuICAgICAgOiAnYnRuIGhpZGUnO1xuXG4gICAgY29uc3QgYWxsb3dTYXZlID0gdGhpcy5hY3Rpb25zLmluY2x1ZGVzKCdzYXZlJylcbiAgICAgID8gJ2J0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHQnXG4gICAgICA6ICdidG4gaGlkZSc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXIgYXMtcm93XCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnZGVsZXRlJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YWxsb3dEZWxldGV9XG4gICAgICAgID5cbiAgICAgICAgICBEZWxldGVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMub25EaWRDbGljaygnY2FuY2VsJylcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICA+XG4gICAgICAgICAgQ2FuY2VsXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiAoKSA9PiB0aGlzLm9uRGlkQ2xpY2soJ3NhdmUnKVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPXthbGxvd1NhdmV9XG4gICAgICAgID5cbiAgICAgICAgICBTYXZlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19