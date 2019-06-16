'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _group = require('./../components/group');

var _group2 = _interopRequireDefault(_group);

var _project = require('./../components/project');

var _project2 = _interopRequireDefault(_project);

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class ListContainer {
  /* eslint-disable-next-line require-jsdoc */
  drop(entryId, parentId) {
    _state2.default.setParentOfEntry(entryId, parentId);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrop(event) {
    event.stopPropagation();

    if (!this.isRoot) {
      return;
    }
    this.drop(event.dataTransfer.getData('text/plain'));
  }

  /**
   * @param {Object} props etch component properties
   * @param {boolean} props.isRoot ...
   * @param {array} props.groups ...
   * @param {array} props.projects ...
   */
  constructor(props) {
    console.log('created list', props);

    this.isRoot = props.isRoot;
    this.className = this.isRoot ? 'list-tree has-collapsable-children' : 'list-tree';
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
    console.log('updated list', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed list', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered list', this);

    return _etch2.default.dom(
      'ul',
      {
        on: {
          drop: this.didDrop
        },
        className: this.className
      },
      this.groups.map(entry => _etch2.default.dom(_group2.default, _extends({}, entry, { onDidDrop: this.drop, key: entry.id }))),
      this.projects.map(entry => _etch2.default.dom(_project2.default, _extends({}, entry, { onDidDrop: this.drop, key: entry.id })))
    );
  }
}
exports.default = ListContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImRyb3AiLCJlbnRyeUlkIiwicGFyZW50SWQiLCJzdGF0ZSIsInNldFBhcmVudE9mRW50cnkiLCJkaWREcm9wIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJpc1Jvb3QiLCJkYXRhVHJhbnNmZXIiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJjbGFzc05hbWUiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiZW50cnkiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tRQUFBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsT0FBTUMsT0FBTixFQUFlQyxRQUFmLEVBQXlCO0FBQ3ZCQyxvQkFBTUMsZ0JBQU4sQ0FBdUJILE9BQXZCLEVBQWdDQyxRQUFoQztBQUNEOztBQUVEO0FBQ0FHLFVBQVNDLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTUMsZUFBTjs7QUFFQSxRQUFJLENBQUMsS0FBS0MsTUFBVixFQUFrQjtBQUNoQjtBQUNEO0FBQ0QsU0FBS1IsSUFBTCxDQUFVTSxNQUFNRyxZQUFOLENBQW1CQyxPQUFuQixDQUEyQixZQUEzQixDQUFWO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksY0FBWixFQUE0QkYsS0FBNUI7O0FBRUEsU0FBS0osTUFBTCxHQUFjSSxNQUFNSixNQUFwQjtBQUNBLFNBQUtPLFNBQUwsR0FBaUIsS0FBS1AsTUFBTCxHQUNiLG9DQURhLEdBRWIsV0FGSjtBQUdBLFNBQUtRLE1BQUwsR0FBY0osTUFBTUksTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCTCxNQUFNSyxRQUF0Qjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFDbkJDLFlBQVFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLElBQTVCLEVBQWtDRixLQUFsQzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLSSxNQUFMLEdBQWNKLE1BQU1JLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkwsTUFBTUssUUFBdEI7O0FBRUEsYUFBT0MsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVixZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQSxVQUFNSSxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSWCxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3Qjs7QUFFQSxXQUNFO0FBQUE7QUFBQTtBQUNFLFlBQUk7QUFDRmQsZ0JBQU0sS0FBS0s7QUFEVCxTQUROO0FBSUUsbUJBQVcsS0FBS1U7QUFKbEI7QUFNRyxXQUFLQyxNQUFMLENBQVlTLEdBQVosQ0FBZ0JDLFNBQ2YsbUJBQUMsZUFBRCxlQUFvQkEsS0FBcEIsSUFBMkIsV0FBVyxLQUFLMUIsSUFBM0MsRUFBaUQsS0FBSzBCLE1BQU1DLEVBQTVELElBREQsQ0FOSDtBQVNHLFdBQUtWLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQkMsU0FDakIsbUJBQUMsaUJBQUQsZUFBc0JBLEtBQXRCLElBQTZCLFdBQVcsS0FBSzFCLElBQTdDLEVBQW1ELEtBQUswQixNQUFNQyxFQUE5RCxJQUREO0FBVEgsS0FERjtBQWVEO0FBOUVnQztrQkFBZDVCLGEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRyb3AgKGVudHJ5SWQsIHBhcmVudElkKSB7XG4gICAgc3RhdGUuc2V0UGFyZW50T2ZFbnRyeShlbnRyeUlkLCBwYXJlbnRJZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCF0aGlzLmlzUm9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm9wcy5pc1Jvb3QgLi4uXG4gICAqIEBwYXJhbSB7YXJyYXl9IHByb3BzLmdyb3VwcyAuLi5cbiAgICogQHBhcmFtIHthcnJheX0gcHJvcHMucHJvamVjdHMgLi4uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBsaXN0JywgcHJvcHMpO1xuXG4gICAgdGhpcy5pc1Jvb3QgPSBwcm9wcy5pc1Jvb3Q7XG4gICAgdGhpcy5jbGFzc05hbWUgPSB0aGlzLmlzUm9vdFxuICAgICAgPyAnbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbidcbiAgICAgIDogJ2xpc3QtdHJlZSc7XG4gICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBsaXN0JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgbGlzdCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGxpc3QnLCB0aGlzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dWxcbiAgICAgICAgb249e3tcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMuZ3JvdXBzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPEdyb3VwQ29tcG9uZW50IHsuLi5lbnRyeX0gb25EaWREcm9wPXt0aGlzLmRyb3B9IGtleT17ZW50cnkuaWR9IC8+XG4gICAgICAgICkpfVxuICAgICAgICB7dGhpcy5wcm9qZWN0cy5tYXAoZW50cnkgPT4gKFxuICAgICAgICAgIDxQcm9qZWN0Q29tcG9uZW50IHsuLi5lbnRyeX0gb25EaWREcm9wPXt0aGlzLmRyb3B9IGtleT17ZW50cnkuaWR9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG4iXX0=