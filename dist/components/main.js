'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

class MainComponent {
  /**
   * @param {Object} props etch component properties
   */
  constructor(props) {
    console.log('created main component', props);
    this.groups = props.groups;
    this.projects = props.projects;
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated main component', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed main component', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered main component', this);

    return _etch2.default.dom(_list2.default, {
      groups: this.groups,
      projects: this.projects,
      isRoot: true
    });
  }
}
exports.default = MainComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFMQTs7QUFNZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7QUFHQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQkMsWUFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDRixLQUF0QztBQUNBLFNBQUtHLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0QjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDLElBQXRDLEVBQTRDRixLQUE1Qzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLRyxNQUFMLEdBQWNILE1BQU1HLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkosTUFBTUksUUFBdEI7O0FBRUEsYUFBT0MsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVCxZQUFRQyxHQUFSLENBQVksMEJBQVosRUFBd0MsSUFBeEM7QUFDQSxVQUFNRyxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVixZQUFRQyxHQUFSLENBQVkseUJBQVosRUFBdUMsSUFBdkM7O0FBRUEsV0FBTyxtQkFBQyxjQUFEO0FBQ0wsY0FBUSxLQUFLQyxNQURSO0FBRUwsZ0JBQVUsS0FBS0MsUUFGVjtBQUdMO0FBSEssTUFBUDtBQUtEO0FBNUNnQztrQkFBZE4sYSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBtYWluIGNvbXBvbmVudCcsIHByb3BzKTtcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBtYWluIGNvbXBvbmVudCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIG1haW4gY29tcG9uZW50JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgbWFpbiBjb21wb25lbnQnLCB0aGlzKTtcblxuICAgIHJldHVybiA8TGlzdENvbnRhaW5lclxuICAgICAgZ3JvdXBzPXt0aGlzLmdyb3Vwc31cbiAgICAgIHByb2plY3RzPXt0aGlzLnByb2plY3RzfVxuICAgICAgaXNSb290XG4gICAgLz47XG4gIH1cbn1cbiJdfQ==