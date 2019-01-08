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
    _state2.default.deleteEntry(id);
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
      this.groups = props.groups;
      this.projects = props.projects;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiaWQiLCJkaWRDYW5jZWwiLCJjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJlbnRyeSIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsImdyb3VwcyIsInByb2plY3RzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJuYW1lIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBTEE7O0FBTWUsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxlQUFjO0FBQ1osVUFBTUMsUUFBUUMsS0FBS0MsU0FBTCxDQUNYQyxjQURXLEdBRVhDLElBRlcsQ0FFTkosU0FBU0EsTUFBTUssSUFBTixLQUFlLElBRmxCLENBQWQ7QUFHQUwsVUFBTU0sT0FBTjtBQUNEOztBQUVEO0FBQ0FDLGNBQWE7QUFDWEMsb0JBQU1DLFdBQU4sQ0FBa0JDLEVBQWxCO0FBQ0EsU0FBS1gsVUFBTDtBQUNEOztBQUVEO0FBQ0FZLGNBQWE7QUFDWCxTQUFLWixVQUFMO0FBQ0Q7O0FBRUQ7OztBQUdBYSxjQUFhRixFQUFiLEVBQWlCO0FBQ2ZHLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnREosRUFBaEQ7QUFDQSxTQUFLSyxLQUFMLEdBQWFQLGdCQUFNUSxRQUFOLENBQWVOLEVBQWYsQ0FBYjtBQUNBTyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQlAsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdELElBQWhELEVBQXNETSxLQUF0RDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQyxNQUFMLEdBQWNELE1BQU1DLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkYsTUFBTUUsUUFBdEI7O0FBRUEsYUFBT0wsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9JLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTWxCLE9BQU4sR0FBaUI7QUFDZk8sWUFBUUMsR0FBUixDQUFZLG9DQUFaLEVBQWtELElBQWxEO0FBQ0EsVUFBTUcsZUFBS1gsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FtQixXQUFVO0FBQ1JaLFlBQVFDLEdBQVIsQ0FBWSxtQ0FBWixFQUFpRCxJQUFqRDs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFNBQU0sb0JBQVg7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUNTO0FBQUE7QUFBQTtBQUFTLGVBQUtDLEtBQUwsQ0FBV1c7QUFBcEIsU0FEVDtBQUFBO0FBQUEsT0FERjtBQUlFO0FBQUE7QUFBQSxVQUFLLFNBQU0sT0FBWDtBQUNFO0FBQUE7QUFBQTtBQUNFLGdCQUFJO0FBQ0ZDLHFCQUFPLEtBQUtwQjtBQURWLGFBRE47QUFJRSxxQkFBTTtBQUpSO0FBQUE7QUFBQSxTQURGO0FBU0U7QUFBQTtBQUFBO0FBQ0UsZ0JBQUk7QUFDRm9CLHFCQUFPLEtBQUtoQjtBQURWLGFBRE47QUFJRSxxQkFBTTtBQUpSO0FBQUE7QUFBQTtBQVRGO0FBSkYsS0FERjtBQXlCRDtBQWxGZ0M7a0JBQWRiLGEiLCJmaWxlIjoiY29uZmlybS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtRGVsZXRlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY2xvc2VQYW5lbCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBhdG9tLndvcmtzcGFjZVxuICAgICAgLmdldE1vZGFsUGFuZWxzKClcbiAgICAgIC5maW5kKHBhbmVsID0+IHBhbmVsLml0ZW0gPT09IHRoaXMpO1xuICAgIHBhbmVsLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERlbGV0ZSAoKSB7XG4gICAgc3RhdGUuZGVsZXRlRW50cnkoaWQpO1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2FuY2VsICgpIHtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCBpZCk7XG4gICAgdGhpcy5lbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnNldC1wYW5lbCBwYWRkZWRcIj5cbiAgICAgICAgPHA+XG4gICAgICAgICAgRGVsZXRlIDxzdHJvbmc+e3RoaXMuZW50cnkubmFtZX08L3N0cm9uZz4/XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2NrXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkRGVsZXRlXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBDb25maXJtXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2FuY2VsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19