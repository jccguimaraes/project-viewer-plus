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

    return _etch2.default.dom(_list2.default, { groups: this.groups, projects: this.projects, isRoot: true });
  }
}
exports.default = MainComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFMQTs7QUFNZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7QUFHQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQkMsWUFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDRixLQUF0QztBQUNBLFNBQUtHLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0QjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDLElBQXRDLEVBQTRDRixLQUE1Qzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLRyxNQUFMLEdBQWNILE1BQU1HLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkosTUFBTUksUUFBdEI7O0FBRUEsYUFBT0MsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVCxZQUFRQyxHQUFSLENBQVksMEJBQVosRUFBd0MsSUFBeEM7QUFDQSxVQUFNRyxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSVixZQUFRQyxHQUFSLENBQVkseUJBQVosRUFBdUMsSUFBdkM7O0FBRUEsV0FDRSxtQkFBQyxjQUFELElBQWUsUUFBUSxLQUFLQyxNQUE1QixFQUFvQyxVQUFVLEtBQUtDLFFBQW5ELEVBQTZELFlBQTdELEdBREY7QUFHRDtBQTFDZ0M7a0JBQWROLGEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgbWFpbiBjb21wb25lbnQnLCBwcm9wcyk7XG4gICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgbWFpbiBjb21wb25lbnQnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBtYWluIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIG1haW4gY29tcG9uZW50JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IGlzUm9vdCAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==