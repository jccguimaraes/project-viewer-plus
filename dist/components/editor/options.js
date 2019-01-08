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
  constructor(props) {
    console.log('created editor-options component', props);

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
      { className: 'block' },
      _etch2.default.dom(
        'button',
        {
          on: {
            click: this.didClickDelete
          },
          className: 'btn btn-error inline-block-tight'
        },
        'Delete'
      ),
      _etch2.default.dom(
        'button',
        {
          on: {
            click: this.didClickUpdate
          },
          className: 'btn btn-success inline-block-tight'
        },
        this.pristine ? 'Create' : 'Edit'
      )
    );
  }
}
exports.default = EditorOptions; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcHRpb25zLmpzIl0sIm5hbWVzIjpbIkVkaXRvck9wdGlvbnMiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsInByaXN0aW5lIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayIsImRpZENsaWNrRGVsZXRlIiwiZGlkQ2xpY2tVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQkMsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdERixLQUFoRDs7QUFFQSxTQUFLRyxRQUFMLEdBQWdCSCxNQUFNRyxRQUF0QjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY04sS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLGtDQUFaLEVBQWdELElBQWhELEVBQXNERixLQUF0RDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSSxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZSLFlBQVFDLEdBQVIsQ0FBWSxvQ0FBWixFQUFrRCxJQUFsRDtBQUNBLFVBQU1FLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JULFlBQVFDLEdBQVIsQ0FBWSxtQ0FBWixFQUFpRCxJQUFqRDs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsT0FBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGNBQUk7QUFDRlMsbUJBQU8sS0FBS0M7QUFEVixXQUROO0FBSUUscUJBQVU7QUFKWjtBQUFBO0FBQUEsT0FERjtBQVNFO0FBQUE7QUFBQTtBQUNFLGNBQUk7QUFDRkQsbUJBQU8sS0FBS0U7QUFEVixXQUROO0FBSUUscUJBQVU7QUFKWjtBQU1HLGFBQUtWLFFBQUwsR0FBZ0IsUUFBaEIsR0FBMkI7QUFOOUI7QUFURixLQURGO0FBb0JEO0FBdERnQztrQkFBZEwsYSxFQUxyQiIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JPcHRpb25zIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgcHJvcHMpO1xuXG4gICAgdGhpcy5wcmlzdGluZSA9IHByb3BzLnByaXN0aW5lO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLW9wdGlvbnMgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3Itb3B0aW9ucyBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tEZWxldGVcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZXJyb3IgaW5saW5lLWJsb2NrLXRpZ2h0XCJcbiAgICAgICAgPlxuICAgICAgICAgIERlbGV0ZVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGlja1VwZGF0ZVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5wcmlzdGluZSA/ICdDcmVhdGUnIDogJ0VkaXQnfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==