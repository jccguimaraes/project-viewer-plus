"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class GroupSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(entry) {
    this.id = entry.group.id;
    this.name = entry.group.name;
    this.groups = entry.group.groups;
  }
  /**
   * handler for click events
   * @param {Object} event the click event object
   */


  didClick(event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';
    this.update(this);
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
    return _etch.default.dom("li", {
      id: this.id,
      className: "list-nested-item"
    }, _etch.default.dom("div", {
      class: "list-item"
    }, _etch.default.dom("span", null, this.name)), _etch.default.dom("ul", {
      class: "list-tree"
    }, this.groups.map(subGroup => _etch.default.dom(GroupSelectorComponent, {
      group: subGroup
    }))));
  }

}

exports.default = GroupSelectorComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIkdyb3VwU2VsZWN0b3JDb21wb25lbnQiLCJ1cGRhdGVFbnRyeSIsImVudHJ5IiwiaWQiLCJncm91cCIsIm5hbWUiLCJncm91cHMiLCJkaWRDbGljayIsImV2ZW50IiwiZm9sZGluZyIsInVwZGF0ZSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb25zb2xlIiwibG9nIiwiZXRjaCIsImluaXRpYWxpemUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJzdWJHcm91cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxzQkFBTixDQUE2QjtBQUMxQztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxFQUFMLEdBQVVELEtBQUssQ0FBQ0UsS0FBTixDQUFZRCxFQUF0QjtBQUNBLFNBQUtFLElBQUwsR0FBWUgsS0FBSyxDQUFDRSxLQUFOLENBQVlDLElBQXhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSixLQUFLLENBQUNFLEtBQU4sQ0FBWUUsTUFBMUI7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsUUFBUSxDQUFFQyxLQUFGLEVBQVM7QUFDZixTQUFLQyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxLQUFpQixVQUFqQixHQUE4QixXQUE5QixHQUE0QyxVQUEzRDtBQUNBLFNBQUtDLE1BQUwsQ0FBWSxJQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQVFBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0NGLEtBQXRDO0FBQ0EsU0FBS1gsV0FBTCxDQUFpQlcsS0FBakI7O0FBRUFHLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTU4sRUFBQUEsTUFBTixDQUFjRSxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaLEVBQXNDLEtBQXRDLEVBQTRDRixLQUE1QztBQUVBLGFBQU9LLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBSG1CO0FBSXBCO0FBRUQ7Ozs7O0FBR01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmTixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSwwQkFBWixFQUF3QyxNQUF4QztBQUNBLFlBQU1DLGNBQUtJLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjtBQUVEOzs7Ozs7O0FBS0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSUCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxJQUF2QztBQUVBLFdBQ0U7QUFBSSxNQUFBLEVBQUUsRUFBRSxLQUFLWCxFQUFiO0FBQWlCLE1BQUEsU0FBUyxFQUFDO0FBQTNCLE9BQ0U7QUFBSyxNQUFBLEtBQUssRUFBQztBQUFYLE9BQ0UsZ0NBQU8sS0FBS0UsSUFBWixDQURGLENBREYsRUFJRTtBQUFJLE1BQUEsS0FBSyxFQUFDO0FBQVYsT0FDRyxLQUFLQyxNQUFMLENBQVllLEdBQVosQ0FBZ0JDLFFBQVEsSUFDdkIsa0JBQUMsc0JBQUQ7QUFBd0IsTUFBQSxLQUFLLEVBQUVBO0FBQS9CLE1BREQsQ0FESCxDQUpGLENBREY7QUFZRDs7QUF4RXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwU2VsZWN0b3JDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuZ3JvdXAuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkuZ3JvdXAubmFtZTtcbiAgICB0aGlzLmdyb3VwcyA9IGVudHJ5Lmdyb3VwLmdyb3VwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBjbGljayBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBjbGljayBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIHRoaXMuZm9sZGluZyA9IHRoaXMuZm9sZGluZyA9PT0gJ2V4cGFuZGVkJyA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcbiAgICB0aGlzLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBncm91cCBzZWxlY3RvcicsIHByb3BzKTtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBncm91cCBzZWxlY3RvcicsIHRoaXMsIHByb3BzKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgZXRjaCBkZXN0cm95cyB0aGUgY29tcG9uZW50XG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGdyb3VwIHNlbGVjdG9yJywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlciB1cG9uIGFuIGV0Y2ggdXBkYXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHJldHVybnMgYSB2aXJ0dWFsIERPTSB0cmVlIHJlcHJlc2VudGluZyB0aGUgY3VycmVudFxuICAgKiBzdGF0ZSBvZiB0aGUgY29tcG9uZW50XG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBncm91cCBzZWxlY3RvcicsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPVwibGlzdC1uZXN0ZWQtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1pdGVtXCI+XG4gICAgICAgICAgPHNwYW4+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LXRyZWVcIj5cbiAgICAgICAgICB7dGhpcy5ncm91cHMubWFwKHN1Ykdyb3VwID0+IChcbiAgICAgICAgICAgIDxHcm91cFNlbGVjdG9yQ29tcG9uZW50IGdyb3VwPXtzdWJHcm91cH0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19