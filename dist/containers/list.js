"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _group = _interopRequireDefault(require("./../components/group"));

var _project = _interopRequireDefault(require("./../components/project"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable-next-line require-jsdoc */
class ListContainer {
  /* eslint-disable-next-line require-jsdoc */
  drop(entryId, parentId) {
    _state.default.setParentOfEntry(entryId, parentId);
  }
  /* eslint-disable-next-line require-jsdoc */


  didDrop(event) {
    event.stopPropagation();
    event.preventDefault();

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
    this.isRoot = props.isRoot;
    this.className = this.isRoot ? 'list-tree has-collapsable-children' : 'list-tree';
    this.groups = props.groups;
    this.projects = props.projects;

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    return _etch.default.dom("ul", {
      on: {
        drop: this.didDrop
      },
      className: this.className
    }, this.groups.map(entry => _etch.default.dom(_group.default, _extends({}, entry, {
      onDidDrop: this.drop,
      key: entry.id
    }))), this.projects.map(entry => _etch.default.dom(_project.default, _extends({}, entry, {
      onDidDrop: this.drop,
      key: entry.id
    }))));
  }

}

exports.default = ListContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImRyb3AiLCJlbnRyeUlkIiwicGFyZW50SWQiLCJzdGF0ZSIsInNldFBhcmVudE9mRW50cnkiLCJkaWREcm9wIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImlzUm9vdCIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xhc3NOYW1lIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImVudHJ5IiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLEVBQUFBLElBQUksQ0FBRUMsT0FBRixFQUFXQyxRQUFYLEVBQXFCO0FBQ3ZCQyxtQkFBTUMsZ0JBQU4sQ0FBdUJILE9BQXZCLEVBQWdDQyxRQUFoQztBQUNEO0FBRUQ7OztBQUNBRyxFQUFBQSxPQUFPLENBQUVDLEtBQUYsRUFBUztBQUNkQSxJQUFBQSxLQUFLLENBQUNDLGVBQU47QUFDQUQsSUFBQUEsS0FBSyxDQUFDRSxjQUFOOztBQUVBLFFBQUksQ0FBQyxLQUFLQyxNQUFWLEVBQWtCO0FBQ2hCO0FBQ0Q7O0FBQ0QsU0FBS1QsSUFBTCxDQUFVTSxLQUFLLENBQUNJLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCLFlBQTNCLENBQVY7QUFDRDtBQUVEOzs7Ozs7OztBQU1BQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLSixNQUFMLEdBQWNJLEtBQUssQ0FBQ0osTUFBcEI7QUFDQSxTQUFLSyxTQUFMLEdBQWlCLEtBQUtMLE1BQUwsR0FDYixvQ0FEYSxHQUViLFdBRko7QUFHQSxTQUFLTSxNQUFMLEdBQWNGLEtBQUssQ0FBQ0UsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLLENBQUNHLFFBQXRCOztBQUVBQyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNOLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0UsTUFBTCxHQUFjRixLQUFLLENBQUNFLE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDRyxRQUF0QjtBQUVBLGFBQU9DLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGdkIsUUFBQUEsSUFBSSxFQUFFLEtBQUtLO0FBRFQsT0FETjtBQUlFLE1BQUEsU0FBUyxFQUFFLEtBQUtTO0FBSmxCLE9BTUcsS0FBS0MsTUFBTCxDQUFZUyxHQUFaLENBQWdCQyxLQUFLLElBQ3BCLGtCQUFDLGNBQUQsZUFBb0JBLEtBQXBCO0FBQTJCLE1BQUEsU0FBUyxFQUFFLEtBQUt6QixJQUEzQztBQUFpRCxNQUFBLEdBQUcsRUFBRXlCLEtBQUssQ0FBQ0M7QUFBNUQsT0FERCxDQU5ILEVBU0csS0FBS1YsUUFBTCxDQUFjUSxHQUFkLENBQWtCQyxLQUFLLElBQ3RCLGtCQUFDLGdCQUFELGVBQXNCQSxLQUF0QjtBQUE2QixNQUFBLFNBQVMsRUFBRSxLQUFLekIsSUFBN0M7QUFBbUQsTUFBQSxHQUFHLEVBQUV5QixLQUFLLENBQUNDO0FBQTlELE9BREQsQ0FUSCxDQURGO0FBZUQ7O0FBeEVnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRyb3AgKGVudHJ5SWQsIHBhcmVudElkKSB7XG4gICAgc3RhdGUuc2V0UGFyZW50T2ZFbnRyeShlbnRyeUlkLCBwYXJlbnRJZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAoIXRoaXMuaXNSb290KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZHJvcChldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3BzLmlzUm9vdCAuLi5cbiAgICogQHBhcmFtIHthcnJheX0gcHJvcHMuZ3JvdXBzIC4uLlxuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcy5wcm9qZWN0cyAuLi5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuaXNSb290ID0gcHJvcHMuaXNSb290O1xuICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5pc1Jvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bFxuICAgICAgICBvbj17e1xuICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e3RoaXMuY2xhc3NOYW1lfVxuICAgICAgPlxuICAgICAgICB7dGhpcy5ncm91cHMubWFwKGVudHJ5ID0+IChcbiAgICAgICAgICA8R3JvdXBDb21wb25lbnQgey4uLmVudHJ5fSBvbkRpZERyb3A9e3RoaXMuZHJvcH0ga2V5PXtlbnRyeS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICAgIHt0aGlzLnByb2plY3RzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPFByb2plY3RDb21wb25lbnQgey4uLmVudHJ5fSBvbkRpZERyb3A9e3RoaXMuZHJvcH0ga2V5PXtlbnRyeS5pZH0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==