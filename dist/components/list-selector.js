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
      yield _etch.default.destroy(_this2);
    })();
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2xpc3Qtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiTGlzdFNlbGVjdG9yQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJwcm9wcyIsImdyb3VwcyIsInNlbGVjdGVkSWQiLCJkaWRDbGljayIsIm9uRGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiZ3JvdXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxxQkFBTixDQUE0QjtBQUN6QztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxNQUFMLEdBQWNELEtBQUssQ0FBQ0MsTUFBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCRixLQUFLLENBQUNFLFVBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDSSxVQUF0QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFRQUMsRUFBQUEsV0FBVyxDQUFFTCxLQUFGLEVBQVM7QUFDbEIsU0FBS0QsV0FBTCxDQUFpQkMsS0FBakI7O0FBQ0FNLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsTUFBTixDQUFjUixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBQSxLQUFJLENBQUNELFdBQUwsQ0FBaUJDLEtBQWpCOztBQUNBLGVBQU9NLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjtBQUVEOzs7OztBQUdNQyxFQUFBQSxPQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNTCxjQUFLSyxPQUFMLENBQWEsTUFBYixDQUFOO0FBRGU7QUFFaEI7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFO0FBQUksTUFBQSxTQUFTLEVBQUM7QUFBZCxPQUNHLEtBQUtYLE1BQUwsQ0FBWVksR0FBWixDQUFnQkMsS0FBSyxJQUNwQixrQkFBQyxzQkFBRCxlQUNNQSxLQUROO0FBRUUsTUFBQSxVQUFVLEVBQUUsS0FBS1osVUFGbkI7QUFHRSxNQUFBLFVBQVUsRUFBRSxLQUFLQztBQUhuQixPQURELENBREgsQ0FERjtBQVdEOztBQTVEd0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEdyb3VwU2VsZWN0b3IgZnJvbSAnLi9ncm91cC1zZWxlY3Rvcic7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RTZWxlY3RvckNvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChwcm9wcykge1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMuc2VsZWN0ZWRJZCA9IHByb3BzLnNlbGVjdGVkSWQ7XG4gICAgdGhpcy5kaWRDbGljayA9IHByb3BzLm9uRGlkQ2xpY2s7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXAgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmlkIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5uYW1lIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5mb2xkaW5nIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIG5ldyBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBDYWxsaW5nIGV0Y2gudXBkYXRlIHJldHVybnMgYSBQcm9taXNlIHdoaWNoIGNhbiBiZSBoZWxwZnVsIGluIHRoZSBmdXR1cmVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZVwiPlxuICAgICAgICB7dGhpcy5ncm91cHMubWFwKGdyb3VwID0+IChcbiAgICAgICAgICA8R3JvdXBTZWxlY3RvclxuICAgICAgICAgICAgey4uLmdyb3VwfVxuICAgICAgICAgICAgc2VsZWN0ZWRJZD17dGhpcy5zZWxlY3RlZElkfVxuICAgICAgICAgICAgb25EaWRDbGljaz17dGhpcy5kaWRDbGlja31cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuIl19