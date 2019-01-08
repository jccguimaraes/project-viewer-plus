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

    return _etch2.default.dom('div', null);
  }
}
exports.default = EditorOrder; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9vcmRlci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JPcmRlciIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLFdBQU4sQ0FBa0I7QUFDL0I7O0FBRUFDLGdCQUFlO0FBQ2JDLFlBQVFDLEdBQVIsQ0FBWSxnQ0FBWjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQkwsWUFBUUMsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDLEVBQW9ESSxLQUFwRDs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFPSCxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZSLFlBQVFDLEdBQVIsQ0FBWSxrQ0FBWixFQUFnRCxJQUFoRDtBQUNBLFVBQU1DLGVBQUtNLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JULFlBQVFDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxJQUEvQzs7QUFFQSxXQUNFLCtCQURGO0FBR0Q7QUFwQzhCO2tCQUFaSCxXLEVBTHJCIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JPcmRlciB7XG4gIC8qKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1vcmRlciBjb21wb25lbnQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBlZGl0b3Itb3JkZXIgY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj48L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=