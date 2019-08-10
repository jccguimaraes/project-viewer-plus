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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIkdyb3VwU2VsZWN0b3JDb21wb25lbnQiLCJ1cGRhdGVFbnRyeSIsInByb3BzIiwiaWQiLCJuYW1lIiwiZ3JvdXBzIiwic2VsZWN0ZWRJZCIsImRpZENsaWNrIiwib25EaWRDbGljayIsImNvbnN0cnVjdG9yIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJ0cmltIiwibGlzdEl0ZW0iLCJwdXNoIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsc0JBQU4sQ0FBNkI7QUFDMUM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLLENBQUNDLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNFLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxLQUFLLENBQUNHLE1BQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkosS0FBSyxDQUFDSSxVQUF4QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JMLEtBQUssQ0FBQ00sVUFBdEI7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBUUFDLEVBQUFBLFdBQVcsQ0FBRVAsS0FBRixFQUFTO0FBQ2xCLFNBQUtELFdBQUwsQ0FBaUJDLEtBQWpCOztBQUNBUSxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTU1DLEVBQUFBLE1BQU4sQ0FBY1YsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDRCxXQUFMLENBQWlCQyxLQUFqQjs7QUFDQSxlQUFPUSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7QUFFRDs7Ozs7QUFHTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUwsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsUUFBSUMsU0FBUyxHQUFHLEtBQUtaLE1BQUwsQ0FBWWEsTUFBWixHQUFxQixtQkFBckIsR0FBMkMsRUFBM0Q7QUFDQUQsSUFBQUEsU0FBUyxJQUFJLEtBQUtkLEVBQUwsS0FBWSxLQUFLRyxVQUFqQixHQUE4QixVQUE5QixHQUEyQyxFQUF4RDtBQUNBVyxJQUFBQSxTQUFTLENBQUNFLElBQVY7QUFFQSxRQUFNQyxRQUFRLEdBQUcsQ0FDZjtBQUFLLE1BQUEsS0FBSyxFQUFDO0FBQVgsT0FDRSxnQ0FBTyxLQUFLaEIsSUFBWixDQURGLENBRGUsQ0FBakI7O0FBTUEsUUFBSSxLQUFLQyxNQUFMLENBQVlhLE1BQWhCLEVBQXdCO0FBQ3RCRSxNQUFBQSxRQUFRLENBQUNDLElBQVQsQ0FDRSxrQkFBQyxxQkFBRDtBQUFjLFFBQUEsTUFBTSxFQUFFLEtBQUtoQixNQUEzQjtBQUFtQyxRQUFBLFVBQVUsRUFBRSxLQUFLQztBQUFwRCxRQURGO0FBR0Q7O0FBRUQsV0FDRTtBQUNFLE1BQUEsRUFBRSxFQUFFLEtBQUtILEVBRFg7QUFFRSxNQUFBLFNBQVMsRUFBRWMsU0FBUyxJQUFJLElBRjFCO0FBR0UsTUFBQSxFQUFFLEVBQUU7QUFDRkssUUFBQUEsS0FBSyxFQUFFLE1BQU0sS0FBS2YsUUFBTCxDQUFjLEtBQUtKLEVBQW5CO0FBRFg7QUFITixPQU9HaUIsUUFQSCxDQURGO0FBV0Q7O0FBOUV5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgTGlzdFNlbGVjdG9yIGZyb20gJy4vbGlzdC1zZWxlY3Rvcic7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwU2VsZWN0b3JDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAocHJvcHMpIHtcbiAgICB0aGlzLmlkID0gcHJvcHMuaWQ7XG4gICAgdGhpcy5uYW1lID0gcHJvcHMubmFtZTtcbiAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICB0aGlzLnNlbGVjdGVkSWQgPSBwcm9wcy5zZWxlY3RlZElkO1xuICAgIHRoaXMuZGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyb3VwIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5pZCB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMubmFtZSB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuZm9sZGluZyB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBuZXcgc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgZXRjaCBkZXN0cm95cyB0aGUgY29tcG9uZW50XG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMuZ3JvdXBzLmxlbmd0aCA/ICdsaXN0LW5lc3RlZC1pdGVtICcgOiAnJztcbiAgICBjbGFzc05hbWUgKz0gdGhpcy5pZCA9PT0gdGhpcy5zZWxlY3RlZElkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNsYXNzTmFtZS50cmltKCk7XG5cbiAgICBjb25zdCBsaXN0SXRlbSA9IFtcbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWl0ZW1cIj5cbiAgICAgICAgPHNwYW4+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuZ3JvdXBzLmxlbmd0aCkge1xuICAgICAgbGlzdEl0ZW0ucHVzaChcbiAgICAgICAgPExpc3RTZWxlY3RvciBncm91cHM9e3RoaXMuZ3JvdXBzfSBzZWxlY3RlZElkPXt0aGlzLnNlbGVjdGVkSWR9IC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIHx8IG51bGx9XG4gICAgICAgIG9uPXt7XG4gICAgICAgICAgY2xpY2s6ICgpID0+IHRoaXMuZGlkQ2xpY2sodGhpcy5pZClcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2xpc3RJdGVtfVxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=