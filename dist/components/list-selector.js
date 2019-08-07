"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _groupSelector = _interopRequireDefault(require("./group-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class ListSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(props) {
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }
  /**
   * Group needs to be initialized as an etch component
   * @param {Object} props etch component properties
   * @param {Object} props.id the group resource model and extras
   * @param {Object} props.name the group resource model and extras
   * @param {Object} props.folding the group resource model and extras
   * new state
   */


  constructor(props) {
    console.log('created list selector', props);
    this.updateEntry(props);

    _etch.default.initialize(this);
  }
  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('updated list selector', _this, props);

      if (props) {
        _this.updateEntry(props);

        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /**
   * Called whenever etch destroys the component
   */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('destroyed list selector', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
    console.log('rendered list selector', this);
    return _etch.default.dom("ul", {
      className: "list-tree"
    }, this.groups.map(group => _etch.default.dom(_groupSelector.default, _extends({}, group, {
      selectedId: this.selectedId,
      onDidClick: this.didClick
    }))));
  }

}

exports.default = ListSelectorComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2xpc3Qtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiTGlzdFNlbGVjdG9yQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJwcm9wcyIsImdyb3VwcyIsInNlbGVjdGVkSWQiLCJkaWRDbGljayIsIm9uRGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImdyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEscUJBQU4sQ0FBNEI7QUFDekM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsTUFBTCxHQUFjRCxLQUFLLENBQUNDLE1BQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkYsS0FBSyxDQUFDRSxVQUF4QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JILEtBQUssQ0FBQ0ksVUFBdEI7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUUFDLEVBQUFBLFdBQVcsQ0FBRUwsS0FBRixFQUFTO0FBQ2xCTSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx1QkFBWixFQUFxQ1AsS0FBckM7QUFFQSxTQUFLRCxXQUFMLENBQWlCQyxLQUFqQjs7QUFDQVEsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7OztBQU1NQyxFQUFBQSxNQUFOLENBQWNWLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQk0sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVosRUFBcUMsS0FBckMsRUFBMkNQLEtBQTNDOztBQUVBLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDRCxXQUFMLENBQWlCQyxLQUFqQjs7QUFDQSxlQUFPUSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFSbUI7QUFTcEI7QUFFRDs7Ozs7QUFHTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2ZQLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaLEVBQXVDLE1BQXZDO0FBQ0EsWUFBTUMsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQUZlO0FBR2hCO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1JSLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaLEVBQXNDLElBQXRDO0FBRUEsV0FDRTtBQUFJLE1BQUEsU0FBUyxFQUFDO0FBQWQsT0FDRyxLQUFLTixNQUFMLENBQVljLEdBQVosQ0FBZ0JDLEtBQUssSUFDcEIsa0JBQUMsc0JBQUQsZUFDTUEsS0FETjtBQUVFLE1BQUEsVUFBVSxFQUFFLEtBQUtkLFVBRm5CO0FBR0UsTUFBQSxVQUFVLEVBQUUsS0FBS0M7QUFIbkIsT0FERCxDQURILENBREY7QUFXRDs7QUFuRXdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBHcm91cFNlbGVjdG9yIGZyb20gJy4vZ3JvdXAtc2VsZWN0b3InO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LW5lc3RlZC1pdGVtYCAoYWthIGdyb3VwKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0U2VsZWN0b3JDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAocHJvcHMpIHtcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnNlbGVjdGVkSWQgPSBwcm9wcy5zZWxlY3RlZElkO1xuICAgIHRoaXMuZGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyb3VwIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5pZCB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMubmFtZSB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuZm9sZGluZyB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBuZXcgc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGxpc3Qgc2VsZWN0b3InLCBwcm9wcyk7XG5cbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgbGlzdCBzZWxlY3RvcicsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgbGlzdCBzZWxlY3RvcicsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgbGlzdCBzZWxlY3RvcicsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LXRyZWVcIj5cbiAgICAgICAge3RoaXMuZ3JvdXBzLm1hcChncm91cCA9PiAoXG4gICAgICAgICAgPEdyb3VwU2VsZWN0b3JcbiAgICAgICAgICAgIHsuLi5ncm91cH1cbiAgICAgICAgICAgIHNlbGVjdGVkSWQ9e3RoaXMuc2VsZWN0ZWRJZH1cbiAgICAgICAgICAgIG9uRGlkQ2xpY2s9e3RoaXMuZGlkQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==