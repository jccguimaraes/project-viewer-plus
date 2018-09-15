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
    this.resource = props.resource;
    this.didUpdateResource = props.onUpdate;

    _etch2.default.initialize(this);
  }

  /**
   * handler for click events
   * @param {Object} event the click event object
   */
  didClick(event) {
    this.resource.expanded = !this.resource.expanded;
    _state2.default.fullOrParcialUpdateExistingEntry(this.resource.id, {
      expanded: this.resource.expanded
    });
    _etch2.default.update(this, false);
  }

  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */
  didDrag(event) {
    console.log(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd(event) {
    console.log(event.type, this.props);
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop(event) {
    console.log(event.type, this.props);
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
    if (props) {
      this.resource = props.resource;
      _etch2.default.update(this, false);
    }
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
    console.log('render', this.resource);
    const { groups, projects } = this.resource;
    const state = this.resource.expanded ? 'expanded' : 'collapsed';
    const icon = this.resource.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.resource.icon}-icon` : null;

    return _etch2.default.dom(
      'li',
      { className: `list-nested-item ${state}` },
      _etch2.default.dom(
        'div',
        {
          className: 'list-item pv-group',
          on: {
            click: this.didClick,
            dragstart: this.didDrag,
            drop: this.didDrop,
            dragend: this.didDragEnd
          },
          draggable: true
        },
        _etch2.default.dom(
          'span',
          { className: icon },
          this.resource.name
        )
      ),
      _etch2.default.dom(_list2.default, { groups: groups, projects: projects, isRoot: true })
    );
  }
}
exports.default = GroupComponent; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInJlc291cmNlIiwiZGlkVXBkYXRlUmVzb3VyY2UiLCJvblVwZGF0ZSIsImV0Y2giLCJpbml0aWFsaXplIiwiZGlkQ2xpY2siLCJldmVudCIsImV4cGFuZGVkIiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsImlkIiwidXBkYXRlIiwiZGlkRHJhZyIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJlbWl0dGVyIiwiZW1pdCIsImRlc3Ryb3kiLCJyZW5kZXIiLCJncm91cHMiLCJwcm9qZWN0cyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJkcmFnZW5kIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQzs7Ozs7OztBQU9BQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLFFBQUwsR0FBZ0JELE1BQU1DLFFBQXRCO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUJGLE1BQU1HLFFBQS9COztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7O0FBSUFDLFdBQVVDLEtBQVYsRUFBaUI7QUFDZixTQUFLTixRQUFMLENBQWNPLFFBQWQsR0FBeUIsQ0FBQyxLQUFLUCxRQUFMLENBQWNPLFFBQXhDO0FBQ0FDLG9CQUFNQyxnQ0FBTixDQUF1QyxLQUFLVCxRQUFMLENBQWNVLEVBQXJELEVBQXlEO0FBQ3ZESCxnQkFBVSxLQUFLUCxRQUFMLENBQWNPO0FBRCtCLEtBQXpEO0FBR0FKLG1CQUFLUSxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNOLEtBQVQsRUFBZ0I7QUFDZE8sWUFBUUMsR0FBUixDQUFZUixNQUFNUyxJQUFsQixFQUF3QixLQUFLaEIsS0FBN0I7QUFDQU8sVUFBTVUsTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVliLEtBQVosRUFBbUI7QUFDakJPLFlBQVFDLEdBQVIsQ0FBWVIsTUFBTVMsSUFBbEIsRUFBd0IsS0FBS2hCLEtBQTdCO0FBQ0FPLFVBQU1VLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkcsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDs7QUFFRDs7OztBQUlBQyxVQUFTZixLQUFULEVBQWdCO0FBQ2RPLFlBQVFDLEdBQVIsQ0FBWVIsTUFBTVMsSUFBbEIsRUFBd0IsS0FBS2hCLEtBQTdCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUUsb0JBQW1CTyxLQUFuQixFQUEwQjtBQUN4QixTQUFLYyxPQUFMLENBQWFDLElBQWIsQ0FBa0IsTUFBbEIsRUFBMEJmLEtBQTFCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQSxRQUFNRyxNQUFOLENBQWNaLEtBQWQsRUFBcUI7QUFDbkJjLFlBQVFDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLElBQXZCLEVBQTZCZixLQUE3QjtBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtDLFFBQUwsR0FBZ0JELE1BQU1DLFFBQXRCO0FBQ0FHLHFCQUFLUSxNQUFMLENBQVksSUFBWixFQUFrQixLQUFsQjtBQUNEO0FBQ0Y7O0FBRUQ7OztBQUdBLFFBQU1hLE9BQU4sR0FBaUI7QUFDZlgsWUFBUUMsR0FBUixDQUFZLFdBQVosRUFBeUIsSUFBekI7QUFDQSxVQUFNWCxlQUFLcUIsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBQyxXQUFVO0FBQ1JaLFlBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCLEtBQUtkLFFBQTNCO0FBQ0EsVUFBTSxFQUFFMEIsTUFBRixFQUFVQyxRQUFWLEtBQXVCLEtBQUszQixRQUFsQztBQUNBLFVBQU1RLFFBQVEsS0FBS1IsUUFBTCxDQUFjTyxRQUFkLEdBQXlCLFVBQXpCLEdBQXNDLFdBQXBEO0FBQ0EsVUFBTXFCLE9BQ0osS0FBSzVCLFFBQUwsQ0FBYzRCLElBQWQsSUFBc0JDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUF0QixHQUNLLFFBQU8sS0FBSy9CLFFBQUwsQ0FBYzRCLElBQUssT0FEL0IsR0FFSSxJQUhOOztBQUtBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBWSxvQkFBbUJwQixLQUFNLEVBQXpDO0FBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsb0JBRFo7QUFFRSxjQUFJO0FBQ0Z3QixtQkFBTyxLQUFLM0IsUUFEVjtBQUVGNEIsdUJBQVcsS0FBS3JCLE9BRmQ7QUFHRnNCLGtCQUFNLEtBQUtiLE9BSFQ7QUFJRmMscUJBQVMsS0FBS2hCO0FBSlosV0FGTjtBQVFFO0FBUkY7QUFVRTtBQUFBO0FBQUEsWUFBTSxXQUFXUyxJQUFqQjtBQUF3QixlQUFLNUIsUUFBTCxDQUFjb0M7QUFBdEM7QUFWRixPQURGO0FBY0UseUJBQUMsY0FBRCxJQUFlLFFBQVFWLE1BQXZCLEVBQStCLFVBQVVDLFFBQXpDLEVBQW1ELFlBQW5EO0FBZEYsS0FERjtBQWtCRDtBQXBIaUM7a0JBQWY5QixjLEVBVHJCIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LW5lc3RlZC1pdGVtYCAoYWthIGdyb3VwKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cENvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMucmVzb3VyY2UgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJvcHMuZGlkVXBkYXRlUmVzb3VyY2UgcGFyZW50IGNhbGxiYWNrIHRvIHByb3BhZ2F0ZSB0aGVcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnJlc291cmNlID0gcHJvcHMucmVzb3VyY2U7XG4gICAgdGhpcy5kaWRVcGRhdGVSZXNvdXJjZSA9IHByb3BzLm9uVXBkYXRlO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5yZXNvdXJjZS5leHBhbmRlZCA9ICF0aGlzLnJlc291cmNlLmV4cGFuZGVkO1xuICAgIHN0YXRlLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHRoaXMucmVzb3VyY2UuaWQsIHtcbiAgICAgIGV4cGFuZGVkOiB0aGlzLnJlc291cmNlLmV4cGFuZGVkXG4gICAgfSk7XG4gICAgZXRjaC51cGRhdGUodGhpcywgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbGJhY2sgaGFuZGxlciBmb3Igc3RhdGUgdXBkYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSB0aGUgdXBkYXRlZCByZXNvdXJjZSBzdGF0ZVxuICAgKi9cbiAgZGlkVXBkYXRlUmVzb3VyY2UgKHN0YXRlKSB7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2VtaXQnLCBzdGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHMucmVzb3VyY2VdIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQnLCB0aGlzLCBwcm9wcyk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnJlc291cmNlID0gcHJvcHMucmVzb3VyY2U7XG4gICAgICBldGNoLnVwZGF0ZSh0aGlzLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcicsIHRoaXMucmVzb3VyY2UpO1xuICAgIGNvbnN0IHsgZ3JvdXBzLCBwcm9qZWN0cyB9ID0gdGhpcy5yZXNvdXJjZTtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMucmVzb3VyY2UuZXhwYW5kZWQgPyAnZXhwYW5kZWQnIDogJ2NvbGxhcHNlZCc7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnJlc291cmNlLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5yZXNvdXJjZS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHtzdGF0ZX1gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3AsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmRcbiAgICAgICAgICB9fVxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5yZXNvdXJjZS5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXtncm91cHN9IHByb2plY3RzPXtwcm9qZWN0c30gaXNSb290IC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==