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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.groups = props.groups;
        _this.projects = props.projects;
        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch.default.destroy(_this2);
    })();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImRyb3AiLCJlbnRyeUlkIiwicGFyZW50SWQiLCJzdGF0ZSIsInNldFBhcmVudE9mRW50cnkiLCJkaWREcm9wIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImlzUm9vdCIsImRhdGFUcmFuc2ZlciIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2xhc3NOYW1lIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImVudHJ5IiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxFQUFBQSxJQUFJLENBQUVDLE9BQUYsRUFBV0MsUUFBWCxFQUFxQjtBQUN2QkMsbUJBQU1DLGdCQUFOLENBQXVCSCxPQUF2QixFQUFnQ0MsUUFBaEM7QUFDRDtBQUVEOzs7QUFDQUcsRUFBQUEsT0FBTyxDQUFFQyxLQUFGLEVBQVM7QUFDZEEsSUFBQUEsS0FBSyxDQUFDQyxlQUFOO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsY0FBTjs7QUFFQSxRQUFJLENBQUMsS0FBS0MsTUFBVixFQUFrQjtBQUNoQjtBQUNEOztBQUNELFNBQUtULElBQUwsQ0FBVU0sS0FBSyxDQUFDSSxZQUFOLENBQW1CQyxPQUFuQixDQUEyQixZQUEzQixDQUFWO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0osTUFBTCxHQUFjSSxLQUFLLENBQUNKLE1BQXBCO0FBQ0EsU0FBS0ssU0FBTCxHQUFpQixLQUFLTCxNQUFMLEdBQ2Isb0NBRGEsR0FFYixXQUZKO0FBR0EsU0FBS00sTUFBTCxHQUFjRixLQUFLLENBQUNFLE1BQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDRyxRQUF0Qjs7QUFFQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7O0FBS01DLEVBQUFBLE1BQU4sQ0FBY04sS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDRSxNQUFMLEdBQWNGLEtBQUssQ0FBQ0UsTUFBcEI7QUFDQSxRQUFBLEtBQUksQ0FBQ0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDRyxRQUF0QjtBQUVBLGVBQU9DLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUwsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFO0FBQ0UsTUFBQSxFQUFFLEVBQUU7QUFDRnZCLFFBQUFBLElBQUksRUFBRSxLQUFLSztBQURULE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBRSxLQUFLUztBQUpsQixPQU1HLEtBQUtDLE1BQUwsQ0FBWVMsR0FBWixDQUFnQkMsS0FBSyxJQUNwQixrQkFBQyxjQUFELGVBQW9CQSxLQUFwQjtBQUEyQixNQUFBLFNBQVMsRUFBRSxLQUFLekIsSUFBM0M7QUFBaUQsTUFBQSxHQUFHLEVBQUV5QixLQUFLLENBQUNDO0FBQTVELE9BREQsQ0FOSCxFQVNHLEtBQUtWLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQkMsS0FBSyxJQUN0QixrQkFBQyxnQkFBRCxlQUFzQkEsS0FBdEI7QUFBNkIsTUFBQSxTQUFTLEVBQUUsS0FBS3pCLElBQTdDO0FBQW1ELE1BQUEsR0FBRyxFQUFFeUIsS0FBSyxDQUFDQztBQUE5RCxPQURELENBVEgsQ0FERjtBQWVEOztBQXhFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZ3JvdXAnO1xuaW1wb3J0IFByb2plY3RDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2plY3QnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkcm9wIChlbnRyeUlkLCBwYXJlbnRJZCkge1xuICAgIHN0YXRlLnNldFBhcmVudE9mRW50cnkoZW50cnlJZCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKCF0aGlzLmlzUm9vdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm9wcy5pc1Jvb3QgLi4uXG4gICAqIEBwYXJhbSB7YXJyYXl9IHByb3BzLmdyb3VwcyAuLi5cbiAgICogQHBhcmFtIHthcnJheX0gcHJvcHMucHJvamVjdHMgLi4uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmlzUm9vdCA9IHByb3BzLmlzUm9vdDtcbiAgICB0aGlzLmNsYXNzTmFtZSA9IHRoaXMuaXNSb290XG4gICAgICA/ICdsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuJ1xuICAgICAgOiAnbGlzdC10cmVlJztcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWxcbiAgICAgICAgb249e3tcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmNsYXNzTmFtZX1cbiAgICAgID5cbiAgICAgICAge3RoaXMuZ3JvdXBzLm1hcChlbnRyeSA9PiAoXG4gICAgICAgICAgPEdyb3VwQ29tcG9uZW50IHsuLi5lbnRyeX0gb25EaWREcm9wPXt0aGlzLmRyb3B9IGtleT17ZW50cnkuaWR9IC8+XG4gICAgICAgICkpfVxuICAgICAgICB7dGhpcy5wcm9qZWN0cy5tYXAoZW50cnkgPT4gKFxuICAgICAgICAgIDxQcm9qZWN0Q29tcG9uZW50IHsuLi5lbnRyeX0gb25EaWREcm9wPXt0aGlzLmRyb3B9IGtleT17ZW50cnkuaWR9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG4iXX0=