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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJhZ2VuZCIsImRyb3AiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxFQUFMLEdBQVVELE1BQU1DLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixNQUFNRSxJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsTUFBTUcsTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixNQUFNSSxRQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUwsTUFBTUssT0FBckI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VOLE1BQU1NLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPVCxNQUFNTSxJQUFLLE9BRHZCLEdBRUksSUFITjtBQUlEOztBQUVEOzs7O0FBSUFJLFdBQVVDLEtBQVYsRUFBaUI7QUFDZixTQUFLTixPQUFMLEdBQWUsS0FBS0EsT0FBTCxLQUFpQixVQUFqQixHQUE4QixXQUE5QixHQUE0QyxVQUEzRDtBQUNBTyxvQkFBTUMsZ0NBQU4sQ0FBdUMsS0FBS1osRUFBNUMsRUFBZ0Q7QUFDOUNJLGVBQVMsS0FBS0E7QUFEZ0MsS0FBaEQ7QUFHQSxTQUFLUyxNQUFMLENBQVksSUFBWjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTUssWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBS2hCLEVBQTlDO0FBQ0FVLFVBQU1PLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZVixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNTyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1osS0FBVCxFQUFnQjtBQUNkQSxVQUFNYSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FDRWQsTUFBTUssWUFBTixDQUFtQlUsT0FBbkIsQ0FBMkIsWUFBM0IsQ0FERixFQUVFLEtBQUt6QixFQUZQO0FBSUQ7O0FBRUQ7Ozs7Ozs7O0FBUUEwQixjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCQyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QkYsS0FBN0I7QUFDQSxTQUFLN0IsV0FBTCxDQUFpQjZCLEtBQWpCOztBQUVBLFNBQUtILFNBQUwsR0FBaUJHLE1BQU1ILFNBQXZCO0FBQ0FNLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQSxRQUFNbEIsTUFBTixDQUFjYyxLQUFkLEVBQXFCO0FBQ25CQyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2QixJQUE3QixFQUFtQ0YsS0FBbkM7O0FBRUEsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS3pCLE1BQUwsR0FBY3lCLE1BQU16QixNQUFwQjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0J3QixNQUFNeEIsUUFBdEI7O0FBRUEsYUFBTzJCLGVBQUtqQixNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT21CLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2ZOLFlBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQjtBQUNBLFVBQU1DLGVBQUtJLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQUMsV0FBVTtBQUNSUCxZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7O0FBRUEsVUFBTXhCLE9BQ0osS0FBS0EsSUFBTCxJQUFhQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOOztBQUtBLFdBQ0U7QUFBQTtBQUFBLFFBQUksSUFBSSxLQUFLTCxFQUFiLEVBQWlCLFdBQVksb0JBQW1CLEtBQUtJLE9BQVEsRUFBN0Q7QUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSxvQkFEWjtBQUVFLHlCQUZGO0FBR0UsY0FBSTtBQUNGZ0MsbUJBQU8sS0FBSzNCLFFBRFY7QUFFRjRCLHVCQUFXLEtBQUt2QixPQUZkO0FBR0Z3QixxQkFBUyxLQUFLbEIsVUFIWjtBQUlGbUIsa0JBQU0sS0FBS2pCO0FBSlQ7QUFITjtBQVVFO0FBQUE7QUFBQSxZQUFNLFdBQVdqQixJQUFqQjtBQUF3QixlQUFLSjtBQUE3QjtBQVZGLE9BREY7QUFjRSx5QkFBQyxjQUFELElBQWUsUUFBUSxLQUFLQyxNQUE1QixFQUFvQyxVQUFVLEtBQUtDLFFBQW5EO0FBZEYsS0FERjtBQWtCRDtBQW5JaUM7a0JBQWZOLGMsRUFUckIiLCJmaWxlIjoiZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5ncm91cHMgPSBlbnRyeS5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IGVudHJ5LnByb2plY3RzO1xuICAgIHRoaXMuZm9sZGluZyA9IGVudHJ5LmZvbGRpbmc7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nID09PSAnZXhwYW5kZWQnID8gJ2NvbGxhcHNlZCcgOiAnZXhwYW5kZWQnO1xuICAgIHN0YXRlLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHRoaXMuaWQsIHtcbiAgICAgIGZvbGRpbmc6IHRoaXMuZm9sZGluZ1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcbiAgICB0aGlzLm9uRGlkRHJvcChcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksXG4gICAgICB0aGlzLmlkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBncm91cCcsIHByb3BzKTtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wcy5yZXNvdXJjZV0gdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBncm91cCcsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBncm91cCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZ3JvdXAnLCB0aGlzKTtcblxuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke3RoaXMuZm9sZGluZ31gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==