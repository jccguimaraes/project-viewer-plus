"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _listSelector = _interopRequireDefault(require("./list-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class GroupSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(props) {
    this.id = props.id;
    this.name = props.name;
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
    console.log('created group selector', props);
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
      console.log('updated group selector', _this, props);

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
      console.log('destroyed group selector', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
    console.log('rendered group selector', this);
    var className = this.groups.length ? 'list-nested-item ' : '';
    className += this.id === this.selectedId ? 'selected' : '';
    className.trim();
    var listItem = [_etch.default.dom("div", {
      class: "list-item"
    }, _etch.default.dom("span", null, this.name))];

    if (this.groups.length) {
      listItem.push(_etch.default.dom(_listSelector.default, {
        groups: this.groups,
        selectedId: this.selectedId
      }));
    }

    return _etch.default.dom("li", {
      id: this.id,
      className: className || null,
      on: {
        click: () => this.didClick(this.id)
      }
    }, listItem);
  }

}

exports.default = GroupSelectorComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIkdyb3VwU2VsZWN0b3JDb21wb25lbnQiLCJ1cGRhdGVFbnRyeSIsInByb3BzIiwiaWQiLCJuYW1lIiwiZ3JvdXBzIiwic2VsZWN0ZWRJZCIsImRpZENsaWNrIiwib25EaWRDbGljayIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xhc3NOYW1lIiwibGVuZ3RoIiwidHJpbSIsImxpc3RJdGVtIiwicHVzaCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLHNCQUFOLENBQTZCO0FBQzFDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsS0FBSyxDQUFDQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBSyxDQUFDRSxJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsS0FBSyxDQUFDRyxNQUFwQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JKLEtBQUssQ0FBQ0ksVUFBeEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCTCxLQUFLLENBQUNNLFVBQXRCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFBQyxFQUFBQSxXQUFXLENBQUVQLEtBQUYsRUFBUztBQUNsQlEsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0NULEtBQXRDO0FBRUEsU0FBS0QsV0FBTCxDQUFpQkMsS0FBakI7O0FBQ0FVLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTUMsRUFBQUEsTUFBTixDQUFjWixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkJRLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaLEVBQXNDLEtBQXRDLEVBQTRDVCxLQUE1Qzs7QUFFQSxVQUFJQSxLQUFKLEVBQVc7QUFDVCxRQUFBLEtBQUksQ0FBQ0QsV0FBTCxDQUFpQkMsS0FBakI7O0FBQ0EsZUFBT1UsY0FBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBUm1CO0FBU3BCO0FBRUQ7Ozs7O0FBR01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmUCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxNQUF4QztBQUNBLFlBQU1DLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSUixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxJQUF2QztBQUNBLFFBQUlRLFNBQVMsR0FBRyxLQUFLZCxNQUFMLENBQVllLE1BQVosR0FBcUIsbUJBQXJCLEdBQTJDLEVBQTNEO0FBQ0FELElBQUFBLFNBQVMsSUFBSSxLQUFLaEIsRUFBTCxLQUFZLEtBQUtHLFVBQWpCLEdBQThCLFVBQTlCLEdBQTJDLEVBQXhEO0FBQ0FhLElBQUFBLFNBQVMsQ0FBQ0UsSUFBVjtBQUVBLFFBQU1DLFFBQVEsR0FBRyxDQUNmO0FBQUssTUFBQSxLQUFLLEVBQUM7QUFBWCxPQUNFLGdDQUFPLEtBQUtsQixJQUFaLENBREYsQ0FEZSxDQUFqQjs7QUFNQSxRQUFJLEtBQUtDLE1BQUwsQ0FBWWUsTUFBaEIsRUFBd0I7QUFDdEJFLE1BQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUNFLGtCQUFDLHFCQUFEO0FBQWMsUUFBQSxNQUFNLEVBQUUsS0FBS2xCLE1BQTNCO0FBQW1DLFFBQUEsVUFBVSxFQUFFLEtBQUtDO0FBQXBELFFBREY7QUFHRDs7QUFFRCxXQUNFO0FBQ0UsTUFBQSxFQUFFLEVBQUUsS0FBS0gsRUFEWDtBQUVFLE1BQUEsU0FBUyxFQUFFZ0IsU0FBUyxJQUFJLElBRjFCO0FBR0UsTUFBQSxFQUFFLEVBQUU7QUFDRkssUUFBQUEsS0FBSyxFQUFFLE1BQU0sS0FBS2pCLFFBQUwsQ0FBYyxLQUFLSixFQUFuQjtBQURYO0FBSE4sT0FPR21CLFFBUEgsQ0FERjtBQVdEOztBQXBGeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IExpc3RTZWxlY3RvciBmcm9tICcuL2xpc3Qtc2VsZWN0b3InO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LW5lc3RlZC1pdGVtYCAoYWthIGdyb3VwKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cFNlbGVjdG9yQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKHByb3BzKSB7XG4gICAgdGhpcy5pZCA9IHByb3BzLmlkO1xuICAgIHRoaXMubmFtZSA9IHByb3BzLm5hbWU7XG4gICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgdGhpcy5zZWxlY3RlZElkID0gcHJvcHMuc2VsZWN0ZWRJZDtcbiAgICB0aGlzLmRpZENsaWNrID0gcHJvcHMub25EaWRDbGljaztcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBncm91cCBzZWxlY3RvcicsIHByb3BzKTtcblxuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBncm91cCBzZWxlY3RvcicsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZ3JvdXAgc2VsZWN0b3InLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGdyb3VwIHNlbGVjdG9yJywgdGhpcyk7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuZ3JvdXBzLmxlbmd0aCA/ICdsaXN0LW5lc3RlZC1pdGVtICcgOiAnJztcbiAgICBjbGFzc05hbWUgKz0gdGhpcy5pZCA9PT0gdGhpcy5zZWxlY3RlZElkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNsYXNzTmFtZS50cmltKCk7XG5cbiAgICBjb25zdCBsaXN0SXRlbSA9IFtcbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cbiAgICAgICAgPHNwYW4+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuZ3JvdXBzLmxlbmd0aCkge1xuICAgICAgbGlzdEl0ZW0ucHVzaChcbiAgICAgICAgPExpc3RTZWxlY3RvciBncm91cHM9e3RoaXMuZ3JvdXBzfSBzZWxlY3RlZElkPXt0aGlzLnNlbGVjdGVkSWR9IC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IG51bGx9XG4gICAgICAgIG9uPXt7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZGlkQ2xpY2sodGhpcy5pZClcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2xpc3RJdGVtfVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=