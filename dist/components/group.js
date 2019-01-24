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
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(entry) {
    this.id = entry.id;
    this.name = entry.name;
    this.groups = entry.groups;
    this.projects = entry.projects;
    this.folding = entry.folding;
    this.icon = entry.icon && atom.packages.isPackageActive('file-icons') ? `icon ${entry.icon}-icon` : null;
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
    this.update(this);
  }

  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */
  didDrag(event) {
    event.dataTransfer.setData('text/plain', this.id);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd(event) {
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop(event) {
    event.stopPropagation();

    this.onDidDrop(event.dataTransfer.getData('text/plain'), this.id);
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
    console.log('created group', props);
    this.updateEntry(props);

    this.onDidDrop = props.onDidDrop;
    _etch2.default.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */
  async update(props) {
    console.log('updated group', this, props);

    if (props) {
      this.updateEntry(props);
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy() {
    console.log('destroyed group', this);
    await _etch2.default.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render() {
    console.log('rendered group', this);

    const icon = this.icon && atom.packages.isPackageActive('file-icons') ? this.icon : null;

    return _etch2.default.dom(
      'li',
      { id: this.id, className: `list-nested-item ${this.folding}` },
      _etch2.default.dom(
        'div',
        {
          className: 'list-item pv-group',
          draggable: true,
          on: {
            click: this.didClick,
            dragstart: this.didDrag,
            dragend: this.didDragEnd,
            drop: this.didDrop
          }
        },
        _etch2.default.dom(
          'span',
          { className: icon },
          this.name
        )
      ),
      _etch2.default.dom(_list2.default, { groups: this.groups, projects: this.projects })
    );
  }
}
exports.default = GroupComponent; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJhZ2VuZCIsImRyb3AiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxFQUFMLEdBQVVELE1BQU1DLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixNQUFNRSxJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUwsTUFBTUssT0FBckI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VOLE1BQU1NLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPVCxNQUFNTSxJQUFLLE9BRHZCLEdBRUksSUFITjtBQUlEOztBQUVEOzs7O0FBSUFJLFdBQVVDLEtBQVYsRUFBaUI7QUFDZixTQUFLTixPQUFMLEdBQWUsS0FBS0EsT0FBTCxLQUFpQixVQUFqQixHQUE4QixXQUE5QixHQUE0QyxVQUEzRDtBQUNBTyxvQkFBTUMsZ0NBQU4sQ0FBdUMsS0FBS1osRUFBNUMsRUFBZ0Q7QUFDOUNJLGVBQVMsS0FBS0E7QUFEZ0MsS0FBaEQ7QUFHQSxTQUFLUyxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTUssWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBS2hCLEVBQTlDO0FBQ0FVLFVBQU1PLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZVixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNTyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1osS0FBVCxFQUFnQjtBQUNkQSxVQUFNYSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FBZWQsTUFBTUssWUFBTixDQUFtQlUsT0FBbkIsQ0FBMkIsWUFBM0IsQ0FBZixFQUF5RCxLQUFLekIsRUFBOUQ7QUFDRDs7QUFFRDs7Ozs7Ozs7QUFRQTBCLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJDLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCRixLQUE3QjtBQUNBLFNBQUs3QixXQUFMLENBQWlCNkIsS0FBakI7O0FBRUEsU0FBS0gsU0FBTCxHQUFpQkcsTUFBTUgsU0FBdkI7QUFDQU0sbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsUUFBTWxCLE1BQU4sQ0FBY2MsS0FBZCxFQUFxQjtBQUNuQkMsWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0IsRUFBbUNGLEtBQW5DOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUs3QixXQUFMLENBQWlCNkIsS0FBakI7QUFDQSxhQUFPRyxlQUFLakIsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9tQixRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmTixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0IsSUFBL0I7QUFDQSxVQUFNQyxlQUFLSSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFdBQVU7QUFDUlAsWUFBUUMsR0FBUixDQUFZLGdCQUFaLEVBQThCLElBQTlCOztBQUVBLFVBQU14QixPQUNKLEtBQUtBLElBQUwsSUFBYUMsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWIsR0FDSSxLQUFLSCxJQURULEdBRUksSUFITjs7QUFLQSxXQUNFO0FBQUE7QUFBQSxRQUFJLElBQUksS0FBS0wsRUFBYixFQUFpQixXQUFZLG9CQUFtQixLQUFLSSxPQUFRLEVBQTdEO0FBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsb0JBRFo7QUFFRSx5QkFGRjtBQUdFLGNBQUk7QUFDRmdDLG1CQUFPLEtBQUszQixRQURWO0FBRUY0Qix1QkFBVyxLQUFLdkIsT0FGZDtBQUdGd0IscUJBQVMsS0FBS2xCLFVBSFo7QUFJRm1CLGtCQUFNLEtBQUtqQjtBQUpUO0FBSE47QUFVRTtBQUFBO0FBQUEsWUFBTSxXQUFXakIsSUFBakI7QUFBd0IsZUFBS0o7QUFBN0I7QUFWRixPQURGO0FBY0UseUJBQUMsY0FBRCxJQUFlLFFBQVEsS0FBS0MsTUFBNUIsRUFBb0MsVUFBVSxLQUFLQyxRQUFuRDtBQWRGLEtBREY7QUFrQkQ7QUE3SGlDO2tCQUFmTixjLEVBVHJCIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LW5lc3RlZC1pdGVtYCAoYWthIGdyb3VwKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuZ3JvdXBzID0gZW50cnkuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBlbnRyeS5wcm9qZWN0cztcbiAgICB0aGlzLmZvbGRpbmcgPSBlbnRyeS5mb2xkaW5nO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBjbGljayBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBjbGljayBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIHRoaXMuZm9sZGluZyA9IHRoaXMuZm9sZGluZyA9PT0gJ2V4cGFuZGVkJyA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcbiAgICBzdGF0ZS5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSh0aGlzLmlkLCB7XG4gICAgICBmb2xkaW5nOiB0aGlzLmZvbGRpbmdcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIHN0YXJ0IGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpLCB0aGlzLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBncm91cCcsIHByb3BzKTtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBncm91cCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZ3JvdXAnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGdyb3VwJywgdGhpcyk7XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgaWQ9e3RoaXMuaWR9IGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHt0aGlzLmZvbGRpbmd9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gcHYtZ3JvdXBcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kLFxuICAgICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=