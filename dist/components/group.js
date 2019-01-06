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
    console.log('didDrag group', event.type, this);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd(event) {
    console.log('didDragEnd group', event.type, this);
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop(event) {
    console.log('didDrop group', event.type, this);
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
    _etch2.default.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   * @param {Object} [props.resource] the group resource model and extras
   */
  async update(props) {
    console.log('updated group', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJjb25zb2xlIiwibG9nIiwidHlwZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcm9wIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxNQUFNRyxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JKLE1BQU1JLFFBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxNQUFNSyxPQUFyQjtBQUNBLFNBQUtDLElBQUwsR0FDRU4sTUFBTU0sSUFBTixJQUFjQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBZCxHQUNLLFFBQU9ULE1BQU1NLElBQUssT0FEdkIsR0FFSSxJQUhOO0FBSUQ7O0FBRUQ7Ozs7QUFJQUksV0FBVUMsS0FBVixFQUFpQjtBQUNmLFNBQUtOLE9BQUwsR0FBZSxLQUFLQSxPQUFMLEtBQWlCLFVBQWpCLEdBQThCLFdBQTlCLEdBQTRDLFVBQTNEO0FBQ0FPLG9CQUFNQyxnQ0FBTixDQUF1QyxLQUFLWixFQUE1QyxFQUFnRDtBQUM5Q0ksZUFBUyxLQUFLQTtBQURnQyxLQUFoRDtBQUdBLFNBQUtTLE1BQUwsQ0FBWSxJQUFaO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU0osS0FBVCxFQUFnQjtBQUNkSyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2Qk4sTUFBTU8sSUFBbkMsRUFBeUMsSUFBekM7QUFDQVAsVUFBTVEsTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVlYLEtBQVosRUFBbUI7QUFDakJLLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ04sTUFBTU8sSUFBdEMsRUFBNEMsSUFBNUM7QUFDQVAsVUFBTVEsTUFBTixDQUFhQyxTQUFiLENBQXVCRyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNiLEtBQVQsRUFBZ0I7QUFDZEssWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkJOLE1BQU1PLElBQW5DLEVBQXlDLElBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUFPLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJWLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCUyxLQUE3QjtBQUNBLFNBQUszQixXQUFMLENBQWlCMkIsS0FBakI7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFFBQU1kLE1BQU4sQ0FBY1ksS0FBZCxFQUFxQjtBQUNuQlYsWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0IsRUFBbUNTLEtBQW5DOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUt2QixNQUFMLEdBQWN1QixNQUFNdkIsTUFBcEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCc0IsTUFBTXRCLFFBQXRCOztBQUVBLGFBQU91QixlQUFLYixNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT2UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZmYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0EsVUFBTVUsZUFBS0ksT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBQyxXQUFVO0FBQ1JoQixZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7O0FBRUEsVUFBTVgsT0FDSixLQUFLQSxJQUFMLElBQWFDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFiLEdBQ0ksS0FBS0gsSUFEVCxHQUNnQixJQUZsQjs7QUFJQSxXQUNFO0FBQUE7QUFBQSxRQUFJLElBQUksS0FBS0wsRUFBYixFQUFpQixXQUFZLG9CQUFtQixLQUFLSSxPQUFRLEVBQTdEO0FBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVUsb0JBRFo7QUFFRSx5QkFGRjtBQUdFLGNBQUk7QUFDRjRCLG1CQUFPLEtBQUt2QixRQURWO0FBRUZ3Qix1QkFBVyxLQUFLbkIsT0FGZDtBQUdGb0IscUJBQVMsS0FBS2IsVUFIWjtBQUlGYyxrQkFBTSxLQUFLWjtBQUpUO0FBSE47QUFVRTtBQUFBO0FBQUEsWUFBTSxXQUFXbEIsSUFBakI7QUFBd0IsZUFBS0o7QUFBN0I7QUFWRixPQURGO0FBY0UseUJBQUMsY0FBRCxJQUFlLFFBQVEsS0FBS0MsTUFBNUIsRUFBb0MsVUFBVSxLQUFLQyxRQUFuRDtBQWRGLEtBREY7QUFrQkQ7QUE1SGlDO2tCQUFmTixjLEVBVHJCIiwiZmlsZSI6Imdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgTGlzdENvbnRhaW5lciBmcm9tICcuLy4uL2NvbnRhaW5lcnMvbGlzdCc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LW5lc3RlZC1pdGVtYCAoYWthIGdyb3VwKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91cENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuZ3JvdXBzID0gZW50cnkuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBlbnRyeS5wcm9qZWN0cztcbiAgICB0aGlzLmZvbGRpbmcgPSBlbnRyeS5mb2xkaW5nO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBjbGljayBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBjbGljayBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIHRoaXMuZm9sZGluZyA9IHRoaXMuZm9sZGluZyA9PT0gJ2V4cGFuZGVkJyA/ICdjb2xsYXBzZWQnIDogJ2V4cGFuZGVkJztcbiAgICBzdGF0ZS5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSh0aGlzLmlkLCB7XG4gICAgICBmb2xkaW5nOiB0aGlzLmZvbGRpbmdcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIHN0YXJ0IGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWREcmFnIGdyb3VwJywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZERyYWdFbmQgZ3JvdXAnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkRHJvcCBncm91cCcsIGV2ZW50LnR5cGUsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyb3VwIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5pZCB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMubmFtZSB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuZm9sZGluZyB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBuZXcgc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGdyb3VwJywgcHJvcHMpO1xuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wcy5yZXNvdXJjZV0gdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBncm91cCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBncm91cCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZ3JvdXAnLCB0aGlzKTtcblxuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb24gOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke3RoaXMuZm9sZGluZ31gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==