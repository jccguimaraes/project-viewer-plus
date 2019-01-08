'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorOrder {
  /**
   */
  constructor() {
    console.log('created editor-order component');
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated editor-order component', this, props);

    if (props) {
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed editor-order component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered editor-order component', this);

    return _etch2.default.dom(
      'label',
      null,
      'Sort By\xA0',
      _etch2.default.dom(
        'select',
        { 'class': 'input-select' },
        _etch2.default.dom(
          'option',
          null,
          'Alphabetically'
        ),
        _etch2.default.dom(
          'option',
          null,
          'Position'
        )
      )
    );
  }
}
exports.default = EditorOrder; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcmRlci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JPcmRlciIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7O0FBRUFDLGdCQUFlO0FBQ2JDLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQkwsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDLEVBQW9ESSxLQUFwRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSCxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZSLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRDtBQUNBLFVBQU1DLGVBQUtNLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JULFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQzs7QUFFQSxXQUNFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLFVBQVEsU0FBTSxjQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGO0FBRkYsS0FERjtBQVNEO0FBMUM4QjtrQkFBWkgsVyxFQUxyQiIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yT3JkZXIge1xuICAvKipcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3Itb3JkZXIgY29tcG9uZW50Jyk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBlZGl0b3Itb3JkZXIgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBlZGl0b3Itb3JkZXIgY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZWRpdG9yLW9yZGVyIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsYWJlbD5cbiAgICAgICAgU29ydCBCeSZuYnNwO1xuICAgICAgICA8c2VsZWN0IGNsYXNzPVwiaW5wdXQtc2VsZWN0XCI+XG4gICAgICAgICAgPG9wdGlvbj5BbHBoYWJldGljYWxseTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24+UG9zaXRpb248L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2xhYmVsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==