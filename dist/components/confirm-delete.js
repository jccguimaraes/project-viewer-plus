'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

class ConfirmDelete {
  /* eslint-disable-next-line require-jsdoc */
  closePanel() {
    const panel = atom.workspace.getModalPanels().find(panel => panel.item === this);
    panel.destroy();
  }

  /* eslint-disable-next-line require-jsdoc */
  didDelete() {
    _state2.default.deleteEntry(this.id);
    this.closePanel();
  }

  /* eslint-disable-next-line require-jsdoc */
  didCancel() {
    this.closePanel();
  }

  /**
   * @param {number} id - etch component properties
   */
  constructor(id) {
    console.log('created confirm-delete component', id);
    this.id = id;
    this.entry = _state2.default.getEntry(id);
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated confirm-delete component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed confirm-delete component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered confirm-delete component', this);

    return _etch2.default.dom(
      'div',
      { 'class': 'inset-panel padded' },
      _etch2.default.dom(
        'p',
        null,
        'Delete ',
        _etch2.default.dom(
          'strong',
          null,
          this.entry.name
        ),
        '?'
      ),
      _etch2.default.dom(
        'div',
        { 'class': 'block' },
        _etch2.default.dom(
          'button',
          {
            on: {
              click: this.didDelete
            },
            'class': 'btn btn-success inline-block-tight'
          },
          'Confirm'
        ),
        _etch2.default.dom(
          'button',
          {
            on: {
              click: this.didCancel
            },
            'class': 'btn btn-error inline-block-tight'
          },
          'Cancel'
        )
      )
    );
  }
}
exports.default = ConfirmDelete;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiaWQiLCJkaWRDYW5jZWwiLCJjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJlbnRyeSIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwibmFtZSIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUxBOztBQU1lLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsZUFBYztBQUNaLFVBQU1DLFFBQVFDLEtBQUtDLFNBQUwsQ0FDWEMsY0FEVyxHQUVYQyxJQUZXLENBRU5KLFNBQVNBLE1BQU1LLElBQU4sS0FBZSxJQUZsQixDQUFkO0FBR0FMLFVBQU1NLE9BQU47QUFDRDs7QUFFRDtBQUNBQyxjQUFhO0FBQ1hDLG9CQUFNQyxXQUFOLENBQWtCLEtBQUtDLEVBQXZCO0FBQ0EsU0FBS1gsVUFBTDtBQUNEOztBQUVEO0FBQ0FZLGNBQWE7QUFDWCxTQUFLWixVQUFMO0FBQ0Q7O0FBRUQ7OztBQUdBYSxjQUFhRixFQUFiLEVBQWlCO0FBQ2ZHLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnREosRUFBaEQ7QUFDQSxTQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLSyxLQUFMLEdBQWFQLGdCQUFNUSxRQUFOLENBQWVOLEVBQWYsQ0FBYjtBQUNBTyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQlAsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdELElBQWhELEVBQXNETSxLQUF0RDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSCxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNaEIsT0FBTixHQUFpQjtBQUNmTyxZQUFRQyxHQUFSLENBQVksb0NBQVosRUFBa0QsSUFBbEQ7QUFDQSxVQUFNRyxlQUFLWCxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQWlCLFdBQVU7QUFDUlYsWUFBUUMsR0FBUixDQUFZLG1DQUFaLEVBQWlELElBQWpEOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssU0FBTSxvQkFBWDtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQ1M7QUFBQTtBQUFBO0FBQVMsZUFBS0MsS0FBTCxDQUFXUztBQUFwQixTQURUO0FBQUE7QUFBQSxPQURGO0FBSUU7QUFBQTtBQUFBLFVBQUssU0FBTSxPQUFYO0FBQ0U7QUFBQTtBQUFBO0FBQ0UsZ0JBQUk7QUFDRkMscUJBQU8sS0FBS2xCO0FBRFYsYUFETjtBQUlFLHFCQUFNO0FBSlI7QUFBQTtBQUFBLFNBREY7QUFTRTtBQUFBO0FBQUE7QUFDRSxnQkFBSTtBQUNGa0IscUJBQU8sS0FBS2Q7QUFEVixhQUROO0FBSUUscUJBQU07QUFKUjtBQUFBO0FBQUE7QUFURjtBQUpGLEtBREY7QUF5QkQ7QUFoRmdDO2tCQUFkYixhIiwiZmlsZSI6ImNvbmZpcm0tZGVsZXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybURlbGV0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNsb3NlUGFuZWwgKCkge1xuICAgIGNvbnN0IHBhbmVsID0gYXRvbS53b3Jrc3BhY2VcbiAgICAgIC5nZXRNb2RhbFBhbmVscygpXG4gICAgICAuZmluZChwYW5lbCA9PiBwYW5lbC5pdGVtID09PSB0aGlzKTtcbiAgICBwYW5lbC5kZXN0cm95KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREZWxldGUgKCkge1xuICAgIHN0YXRlLmRlbGV0ZUVudHJ5KHRoaXMuaWQpO1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2FuY2VsICgpIHtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCBpZCk7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuZW50cnkgPSBzdGF0ZS5nZXRFbnRyeShpZCk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnNldC1wYW5lbCBwYWRkZWRcIj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgRGVsZXRlIDxzdHJvbmc+e3RoaXMuZW50cnkubmFtZX08L3N0cm9uZz4/XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2NrXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkRGVsZXRlXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBDb25maXJtXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2FuY2VsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19