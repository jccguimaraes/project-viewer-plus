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
    _state2.default.deleteEntry(this.entry.id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiZW50cnkiLCJpZCIsImRpZENhbmNlbCIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwibmFtZSIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUxBOztBQU1lLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsZUFBYztBQUNaLFVBQU1DLFFBQVFDLEtBQUtDLFNBQUwsQ0FDWEMsY0FEVyxHQUVYQyxJQUZXLENBRU5KLFNBQVNBLE1BQU1LLElBQU4sS0FBZSxJQUZsQixDQUFkO0FBR0FMLFVBQU1NLE9BQU47QUFDRDs7QUFFRDtBQUNBQyxjQUFhO0FBQ1hDLG9CQUFNQyxXQUFOLENBQWtCLEtBQUtDLEtBQUwsQ0FBV0MsRUFBN0I7QUFDQSxTQUFLWixVQUFMO0FBQ0Q7O0FBRUQ7QUFDQWEsY0FBYTtBQUNYLFNBQUtiLFVBQUw7QUFDRDs7QUFFRDs7O0FBR0FjLGNBQWFGLEVBQWIsRUFBaUI7QUFDZkcsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdESixFQUFoRDtBQUNBLFNBQUtELEtBQUwsR0FBYUYsZ0JBQU1RLFFBQU4sQ0FBZUwsRUFBZixDQUFiO0FBQ0FNLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjQyxLQUFkLEVBQXFCO0FBQ25CTixZQUFRQyxHQUFSLENBQVksa0NBQVosRUFBZ0QsSUFBaEQsRUFBc0RLLEtBQXREOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9ILGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPRSxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1oQixPQUFOLEdBQWlCO0FBQ2ZRLFlBQVFDLEdBQVIsQ0FBWSxvQ0FBWixFQUFrRCxJQUFsRDtBQUNBLFVBQU1FLGVBQUtYLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBaUIsV0FBVTtBQUNSVCxZQUFRQyxHQUFSLENBQVksbUNBQVosRUFBaUQsSUFBakQ7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSyxTQUFNLG9CQUFYO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFDUztBQUFBO0FBQUE7QUFBUyxlQUFLTCxLQUFMLENBQVdjO0FBQXBCLFNBRFQ7QUFBQTtBQUFBLE9BREY7QUFJRTtBQUFBO0FBQUEsVUFBSyxTQUFNLE9BQVg7QUFDRTtBQUFBO0FBQUE7QUFDRSxnQkFBSTtBQUNGQyxxQkFBTyxLQUFLbEI7QUFEVixhQUROO0FBSUUscUJBQU07QUFKUjtBQUFBO0FBQUEsU0FERjtBQVNFO0FBQUE7QUFBQTtBQUNFLGdCQUFJO0FBQ0ZrQixxQkFBTyxLQUFLYjtBQURWLGFBRE47QUFJRSxxQkFBTTtBQUpSO0FBQUE7QUFBQTtBQVRGO0FBSkYsS0FERjtBQXlCRDtBQS9FZ0M7a0JBQWRkLGEiLCJmaWxlIjoiY29uZmlybS1kZWxldGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25maXJtRGVsZXRlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY2xvc2VQYW5lbCAoKSB7XG4gICAgY29uc3QgcGFuZWwgPSBhdG9tLndvcmtzcGFjZVxuICAgICAgLmdldE1vZGFsUGFuZWxzKClcbiAgICAgIC5maW5kKHBhbmVsID0+IHBhbmVsLml0ZW0gPT09IHRoaXMpO1xuICAgIHBhbmVsLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERlbGV0ZSAoKSB7XG4gICAgc3RhdGUuZGVsZXRlRW50cnkodGhpcy5lbnRyeS5pZCk7XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDYW5jZWwgKCkge1xuICAgIHRoaXMuY2xvc2VQYW5lbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGNvbmZpcm0tZGVsZXRlIGNvbXBvbmVudCcsIGlkKTtcbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgY29uZmlybS1kZWxldGUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBjb25maXJtLWRlbGV0ZSBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zZXQtcGFuZWwgcGFkZGVkXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIERlbGV0ZSA8c3Ryb25nPnt0aGlzLmVudHJ5Lm5hbWV9PC9zdHJvbmc+P1xuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9ja1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZERlbGV0ZVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ29uZmlybVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENhbmNlbFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==