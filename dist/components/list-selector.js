"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _groupSelector = _interopRequireDefault(require("./group-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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


  async update(props) {
    if (props) {
      this.updateEntry(props);
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /**
   * Called whenever etch destroys the component
   */


  async destroy() {
    await _etch.default.destroy(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2xpc3Qtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiTGlzdFNlbGVjdG9yQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJwcm9wcyIsImdyb3VwcyIsInNlbGVjdGVkSWQiLCJkaWRDbGljayIsIm9uRGlkQ2xpY2siLCJjb25zdHJ1Y3RvciIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwibWFwIiwiZ3JvdXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLHFCQUFOLENBQTRCO0FBQ3pDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLE1BQUwsR0FBY0QsS0FBSyxDQUFDQyxNQUFwQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JGLEtBQUssQ0FBQ0UsVUFBeEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLLENBQUNJLFVBQXRCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFBQyxFQUFBQSxXQUFXLENBQUVMLEtBQUYsRUFBUztBQUNsQixTQUFLRCxXQUFMLENBQWlCQyxLQUFqQjs7QUFDQU0sa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY1IsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLRCxXQUFMLENBQWlCQyxLQUFqQjtBQUNBLGFBQU9NLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7Ozs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1MLGNBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSSxNQUFBLFNBQVMsRUFBQztBQUFkLE9BQ0csS0FBS1gsTUFBTCxDQUFZWSxHQUFaLENBQWdCQyxLQUFLLElBQ3BCLGtCQUFDLHNCQUFELGVBQ01BLEtBRE47QUFFRSxNQUFBLFVBQVUsRUFBRSxLQUFLWixVQUZuQjtBQUdFLE1BQUEsVUFBVSxFQUFFLEtBQUtDO0FBSG5CLE9BREQsQ0FESCxDQURGO0FBV0Q7O0FBNUR3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgR3JvdXBTZWxlY3RvciBmcm9tICcuL2dyb3VwLXNlbGVjdG9yJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1uZXN0ZWQtaXRlbWAgKGFrYSBncm91cClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdFNlbGVjdG9yQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKHByb3BzKSB7XG4gICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgdGhpcy5zZWxlY3RlZElkID0gcHJvcHMuc2VsZWN0ZWRJZDtcbiAgICB0aGlzLmRpZENsaWNrID0gcHJvcHMub25EaWRDbGljaztcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlciB1cG9uIGFuIGV0Y2ggdXBkYXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHJldHVybnMgYSB2aXJ0dWFsIERPTSB0cmVlIHJlcHJlc2VudGluZyB0aGUgY3VycmVudFxuICAgKiBzdGF0ZSBvZiB0aGUgY29tcG9uZW50XG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlXCI+XG4gICAgICAgIHt0aGlzLmdyb3Vwcy5tYXAoZ3JvdXAgPT4gKFxuICAgICAgICAgIDxHcm91cFNlbGVjdG9yXG4gICAgICAgICAgICB7Li4uZ3JvdXB9XG4gICAgICAgICAgICBzZWxlY3RlZElkPXt0aGlzLnNlbGVjdGVkSWR9XG4gICAgICAgICAgICBvbkRpZENsaWNrPXt0aGlzLmRpZENsaWNrfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG4iXX0=