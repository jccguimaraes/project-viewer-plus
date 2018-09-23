'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _list = require('./../containers/list');

var _list2 = _interopRequireDefault(_list);

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class GroupComponent {
  /**
   * Group needs to be initialized as an etch component
   * @param {Object} props etch component properties
   * @param {Object} props.resource the group resource model and extras
   * @param {Function} props.didUpdateResource parent callback to propagate the
   * new state
   */
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.groups = props.groups;
    this.projects = props.projects;
    this.folding = props.folding;
    this.icon = props.icon && atom.packages.isPackageActive('file-icons') ? `icon ${props.icon}-icon` : null;

    _etch2.default.initialize(this);
  }

  /**
   * handler for click events
   * @param {Object} event the click event object
   */
  didClick(event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';
    _state2.default.fullOrParcialUpdateExistingEntry(this.id, {
      folding: this.folding
    });
    this.update();
  }

  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */
  didDrag(event) {
    console.log(event.type, this);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd(event) {
    console.log(event.type, this);
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop(event) {
    console.log(event.type, this);
  }

  /**
   * callback handler for state update
   * @param {Object} state the updated resource state
   */
  didUpdateResource(state) {
    this.emitter.emit('emit', state);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   * @param {Object} [props.resource] the group resource model and extras
   */
  async update(props) {
    console.log('updated', this, props);
    return _etch2.default.update(this);
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy() {
    console.log('destroyed', this);
    await _etch2.default.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render() {
    console.log('render', this);

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${this.folding}` },
      _etch2.default.dom(
        'div',
        {
          className: 'list-item pv-group',
          draggable: true,
          on: {
            click: this.didClick,
            dragstart: this.didDrag,
            drop: this.didDrop,
            dragend: this.didDragEnd
          }
        },
        _etch2.default.dom(
          'span',
          { className: this.icon },
          this.name
        )
      ),
      _etch2.default.dom(_list2.default, { groups: this.groups, projects: this.projects, isRoot: true })
    );
  }
}
exports.default = GroupComponent; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJzdGF0ZSIsImZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5IiwidXBkYXRlIiwiZGlkRHJhZyIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJkaWRVcGRhdGVSZXNvdXJjZSIsImVtaXR0ZXIiLCJlbWl0IiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJvcCIsImRyYWdlbmQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7Ozs7Ozs7QUFPQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxFQUFMLEdBQVVELE1BQU1DLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixNQUFNRSxJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUwsTUFBTUssT0FBckI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VOLE1BQU1NLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPVCxNQUFNTSxJQUFLLE9BRHZCLEdBRUksSUFITjs7QUFLQUksbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2YsU0FBS1IsT0FBTCxHQUFlLEtBQUtBLE9BQUwsS0FBaUIsVUFBakIsR0FBOEIsV0FBOUIsR0FBNEMsVUFBM0Q7QUFDQVMsb0JBQU1DLGdDQUFOLENBQXVDLEtBQUtkLEVBQTVDLEVBQWdEO0FBQzlDSSxlQUFTLEtBQUtBO0FBRGdDLEtBQWhEO0FBR0EsU0FBS1csTUFBTDtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZEssWUFBUUMsR0FBUixDQUFZTixNQUFNTyxJQUFsQixFQUF3QixJQUF4QjtBQUNBUCxVQUFNUSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVgsS0FBWixFQUFtQjtBQUNqQkssWUFBUUMsR0FBUixDQUFZTixNQUFNTyxJQUFsQixFQUF3QixJQUF4QjtBQUNBUCxVQUFNUSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU2IsS0FBVCxFQUFnQjtBQUNkSyxZQUFRQyxHQUFSLENBQVlOLE1BQU1PLElBQWxCLEVBQXdCLElBQXhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQU8sb0JBQW1CYixLQUFuQixFQUEwQjtBQUN4QixTQUFLYyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsTUFBbEIsRUFBMEJmLEtBQTFCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQSxRQUFNRSxNQUFOLENBQWNoQixLQUFkLEVBQXFCO0FBQ25Ca0IsWUFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUIsSUFBdkIsRUFBNkJuQixLQUE3QjtBQUNBLFdBQU9VLGVBQUtNLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTWMsT0FBTixHQUFpQjtBQUNmWixZQUFRQyxHQUFSLENBQVksV0FBWixFQUF5QixJQUF6QjtBQUNBLFVBQU1ULGVBQUtvQixPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFdBQVU7QUFDUmIsWUFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0IsSUFBdEI7O0FBRUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFZLG9CQUFtQixLQUFLZCxPQUFRLEVBQWhEO0FBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsb0JBRFo7QUFFRSx5QkFGRjtBQUdFLGNBQUk7QUFDRjJCLG1CQUFPLEtBQUtwQixRQURWO0FBRUZxQix1QkFBVyxLQUFLaEIsT0FGZDtBQUdGaUIsa0JBQU0sS0FBS1IsT0FIVDtBQUlGUyxxQkFBUyxLQUFLWDtBQUpaO0FBSE47QUFVRTtBQUFBO0FBQUEsWUFBTSxXQUFXLEtBQUtsQixJQUF0QjtBQUE2QixlQUFLSjtBQUFsQztBQVZGLE9BREY7QUFjRSx5QkFBQyxjQUFELElBQWUsUUFBUSxLQUFLQyxNQUE1QixFQUFvQyxVQUFVLEtBQUtDLFFBQW5ELEVBQTZELFlBQTdEO0FBZEYsS0FERjtBQWtCRDtBQWxIaUM7a0JBQWZOLGMsRUFUckIiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEdyb3VwIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5yZXNvdXJjZSB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9wcy5kaWRVcGRhdGVSZXNvdXJjZSBwYXJlbnQgY2FsbGJhY2sgdG8gcHJvcGFnYXRlIHRoZVxuICAgKiBuZXcgc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuaWQgPSBwcm9wcy5pZDtcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lO1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcbiAgICB0aGlzLmZvbGRpbmcgPSBwcm9wcy5mb2xkaW5nO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBwcm9wcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke3Byb3BzLmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBjbGljayBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBjbGljayBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIHRoaXMuZm9sZGluZyA9IHRoaXMuZm9sZGluZyA9PT0gJ2V4cGFuZGVkJyA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcbiAgICBzdGF0ZS5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSh0aGlzLmlkLCB7XG4gICAgICBmb2xkaW5nOiB0aGlzLmZvbGRpbmdcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbGJhY2sgaGFuZGxlciBmb3Igc3RhdGUgdXBkYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSB0aGUgdXBkYXRlZCByZXNvdXJjZSBzdGF0ZVxuICAgKi9cbiAgZGlkVXBkYXRlUmVzb3VyY2UgKHN0YXRlKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2VtaXQnLCBzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHMucmVzb3VyY2VdIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQnLCB0aGlzLCBwcm9wcyk7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcicsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBjbGFzc05hbWU9e2BsaXN0LW5lc3RlZC1pdGVtICR7dGhpcy5mb2xkaW5nfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHB2LWdyb3VwXCJcbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcCxcbiAgICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3RoaXMuaWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSBpc1Jvb3QgLz5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19