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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImRyb3AiLCJlbnRyeUlkIiwicGFyZW50SWQiLCJzdGF0ZSIsInNldFBhcmVudE9mRW50cnkiLCJkaWREcm9wIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJpc1Jvb3QiLCJkYXRhVHJhbnNmZXIiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJjbGFzc05hbWUiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiZW50cnkiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tRQUFBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsT0FBTUMsT0FBTixFQUFlQyxRQUFmLEVBQXlCO0FBQ3ZCQyxvQkFBTUMsZ0JBQU4sQ0FBdUJILE9BQXZCLEVBQWdDQyxRQUFoQztBQUNEOztBQUVEO0FBQ0FHLFVBQVNDLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTUMsZUFBTjs7QUFFQSxRQUFJLENBQUMsS0FBS0MsTUFBVixFQUFrQjtBQUNoQjtBQUNEO0FBQ0QsU0FBS1IsSUFBTCxDQUNFTSxNQUFNRyxZQUFOLENBQW1CQyxPQUFuQixDQUEyQixZQUEzQixDQURGO0FBR0Q7O0FBRUQ7Ozs7OztBQU1BQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksY0FBWixFQUE0QkYsS0FBNUI7O0FBRUEsU0FBS0osTUFBTCxHQUFjSSxNQUFNSixNQUFwQjtBQUNBLFNBQUtPLFNBQUwsR0FBaUIsS0FBS1AsTUFBTCxHQUNiLG9DQURhLEdBRWIsV0FGSjtBQUdBLFNBQUtRLE1BQUwsR0FBY0osTUFBTUksTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCTCxNQUFNSyxRQUF0Qjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFDbkJDLFlBQVFDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCLElBQTVCLEVBQWtDRixLQUFsQzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLSSxNQUFMLEdBQWNKLE1BQU1JLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkwsTUFBTUssUUFBdEI7O0FBRUEsYUFBT0MsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmVixZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7QUFDQSxVQUFNSSxlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSWCxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3Qjs7QUFFQSxXQUNFO0FBQUE7QUFBQTtBQUNFLFlBQUk7QUFDRmQsZ0JBQU0sS0FBS0s7QUFEVCxTQUROO0FBSUUsbUJBQVcsS0FBS1U7QUFKbEI7QUFNRyxXQUFLQyxNQUFMLENBQVlTLEdBQVosQ0FBZ0JDLFNBQ2YsbUJBQUMsZUFBRCxlQUFvQkEsS0FBcEIsSUFBMkIsV0FBVyxLQUFLMUIsSUFBM0MsRUFBaUQsS0FBSzBCLE1BQU1DLEVBQTVELElBREQsQ0FOSDtBQVNHLFdBQUtWLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQkMsU0FDakIsbUJBQUMsaUJBQUQsZUFBc0JBLEtBQXRCLElBQTZCLFdBQVcsS0FBSzFCLElBQTdDLEVBQW1ELEtBQUswQixNQUFNQyxFQUE5RCxJQUREO0FBVEgsS0FERjtBQWVEO0FBaEZnQztrQkFBZDVCLGEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRyb3AgKGVudHJ5SWQsIHBhcmVudElkKSB7XG4gICAgc3RhdGUuc2V0UGFyZW50T2ZFbnRyeShlbnRyeUlkLCBwYXJlbnRJZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKCF0aGlzLmlzUm9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyb3AoXG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3BzLmlzUm9vdCAuLi5cbiAgICogQHBhcmFtIHthcnJheX0gcHJvcHMuZ3JvdXBzIC4uLlxuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcy5wcm9qZWN0cyAuLi5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGxpc3QnLCBwcm9wcyk7XG5cbiAgICB0aGlzLmlzUm9vdCA9IHByb3BzLmlzUm9vdDtcbiAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuaXNSb290XG4gICAgICA/ICdsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuJ1xuICAgICAgOiAnbGlzdC10cmVlJztcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGxpc3QnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBsaXN0JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgbGlzdCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bFxuICAgICAgICBvbj17e1xuICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5ncm91cHMubWFwKGVudHJ5ID0+IChcbiAgICAgICAgICA8R3JvdXBDb21wb25lbnQgey4uLmVudHJ5fSBvbkRpZERyb3A9e3RoaXMuZHJvcH0ga2V5PXtlbnRyeS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHt0aGlzLnByb2plY3RzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPFByb2plY3RDb21wb25lbnQgey4uLmVudHJ5fSBvbkRpZERyb3A9e3RoaXMuZHJvcH0ga2V5PXtlbnRyeS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==