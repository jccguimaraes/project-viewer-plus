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
      console.log('updated list', _this, props);

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
      console.log('destroyed list', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered list', this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImRyb3AiLCJlbnRyeUlkIiwicGFyZW50SWQiLCJzdGF0ZSIsInNldFBhcmVudE9mRW50cnkiLCJkaWREcm9wIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJpc1Jvb3QiLCJkYXRhVHJhbnNmZXIiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJjbGFzc05hbWUiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiZW50cnkiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLEVBQUFBLElBQUksQ0FBRUMsT0FBRixFQUFXQyxRQUFYLEVBQXFCO0FBQ3ZCQyxtQkFBTUMsZ0JBQU4sQ0FBdUJILE9BQXZCLEVBQWdDQyxRQUFoQztBQUNEO0FBRUQ7OztBQUNBRyxFQUFBQSxPQUFPLENBQUVDLEtBQUYsRUFBUztBQUNkQSxJQUFBQSxLQUFLLENBQUNDLGVBQU47O0FBRUEsUUFBSSxDQUFDLEtBQUtDLE1BQVYsRUFBa0I7QUFDaEI7QUFDRDs7QUFDRCxTQUFLUixJQUFMLENBQVVNLEtBQUssQ0FBQ0csWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkIsWUFBM0IsQ0FBVjtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUFDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCRixLQUE1QjtBQUVBLFNBQUtKLE1BQUwsR0FBY0ksS0FBSyxDQUFDSixNQUFwQjtBQUNBLFNBQUtPLFNBQUwsR0FBaUIsS0FBS1AsTUFBTCxHQUNiLG9DQURhLEdBRWIsV0FGSjtBQUdBLFNBQUtRLE1BQUwsR0FBY0osS0FBSyxDQUFDSSxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JMLEtBQUssQ0FBQ0ssUUFBdEI7O0FBRUFDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQkMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUE0QixLQUE1QixFQUFrQ0YsS0FBbEM7O0FBRUEsVUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBQSxLQUFJLENBQUNJLE1BQUwsR0FBY0osS0FBSyxDQUFDSSxNQUFwQjtBQUNBLFFBQUEsS0FBSSxDQUFDQyxRQUFMLEdBQWdCTCxLQUFLLENBQUNLLFFBQXRCO0FBRUEsZUFBT0MsY0FBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBVm1CO0FBV3BCO0FBRUQ7OztBQUNNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZlYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsTUFBOUI7QUFDQSxZQUFNSSxjQUFLSyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRmU7QUFHaEI7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSWCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLElBQTdCO0FBRUEsV0FDRTtBQUNFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZkLFFBQUFBLElBQUksRUFBRSxLQUFLSztBQURULE9BRE47QUFJRSxNQUFBLFNBQVMsRUFBRSxLQUFLVTtBQUpsQixPQU1HLEtBQUtDLE1BQUwsQ0FBWVMsR0FBWixDQUFnQkMsS0FBSyxJQUNwQixrQkFBQyxjQUFELGVBQW9CQSxLQUFwQjtBQUEyQixNQUFBLFNBQVMsRUFBRSxLQUFLMUIsSUFBM0M7QUFBaUQsTUFBQSxHQUFHLEVBQUUwQixLQUFLLENBQUNDO0FBQTVELE9BREQsQ0FOSCxFQVNHLEtBQUtWLFFBQUwsQ0FBY1EsR0FBZCxDQUFrQkMsS0FBSyxJQUN0QixrQkFBQyxnQkFBRCxlQUFzQkEsS0FBdEI7QUFBNkIsTUFBQSxTQUFTLEVBQUUsS0FBSzFCLElBQTdDO0FBQW1ELE1BQUEsR0FBRyxFQUFFMEIsS0FBSyxDQUFDQztBQUE5RCxPQURELENBVEgsQ0FERjtBQWVEOztBQTlFZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZ3JvdXAnO1xuaW1wb3J0IFByb2plY3RDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2plY3QnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkcm9wIChlbnRyeUlkLCBwYXJlbnRJZCkge1xuICAgIHN0YXRlLnNldFBhcmVudE9mRW50cnkoZW50cnlJZCwgcGFyZW50SWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghdGhpcy5pc1Jvb3QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kcm9wKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJvcHMuaXNSb290IC4uLlxuICAgKiBAcGFyYW0ge2FycmF5fSBwcm9wcy5ncm91cHMgLi4uXG4gICAqIEBwYXJhbSB7YXJyYXl9IHByb3BzLnByb2plY3RzIC4uLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgbGlzdCcsIHByb3BzKTtcblxuICAgIHRoaXMuaXNSb290ID0gcHJvcHMuaXNSb290O1xuICAgIHRoaXMuY2xhc3NOYW1lID0gdGhpcy5pc1Jvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgbGlzdCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGxpc3QnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBsaXN0JywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHVsXG4gICAgICAgIG9uPXt7XG4gICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5jbGFzc05hbWV9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLmdyb3Vwcy5tYXAoZW50cnkgPT4gKFxuICAgICAgICAgIDxHcm91cENvbXBvbmVudCB7Li4uZW50cnl9IG9uRGlkRHJvcD17dGhpcy5kcm9wfSBrZXk9e2VudHJ5LmlkfSAvPlxuICAgICAgICApKX1cbiAgICAgICAge3RoaXMucHJvamVjdHMubWFwKGVudHJ5ID0+IChcbiAgICAgICAgICA8UHJvamVjdENvbXBvbmVudCB7Li4uZW50cnl9IG9uRGlkRHJvcD17dGhpcy5kcm9wfSBrZXk9e2VudHJ5LmlkfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19