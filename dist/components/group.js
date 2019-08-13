"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _list = _interopRequireDefault(require("./../containers/list"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

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
    this.icon = entry.icon ? `icon ${entry.icon}-icon` : null;
  }
  /**
   * handler for click events
   * @param {Object} event the click event object
   */


  didClick(event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';

    _state.default.fullOrParcialUpdateExistingEntry(this.id, {
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
    event.dataTransfer.dropEffect = 'move';
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


  didDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.remove('dragging');
  }
  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */


  didDrop(event) {
    event.stopPropagation();
    event.preventDefault();
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
    this.updateEntry(props);
    this.onDidDrop = props.onDidDrop;

    _etch.default.initialize(this);
  }
  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */


  async update(props) {
    let icon = props.icon;

    if (icon && icon.includes(' ')) {
      icon = icon.split(' ')[1].split('-')[0];
    }

    if (props) {
      this.updateEntry({ ...props,
        icon
      });
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
    return _etch.default.dom("li", {
      id: this.id,
      className: `list-nested-item ${this.folding}`
    }, _etch.default.dom("div", {
      className: "list-item pv-group",
      draggable: true,
      on: {
        click: this.didClick,
        dragstart: this.didDrag,
        dragend: this.didDragEnd,
        dragover: this.didDragOver,
        drop: this.didDrop
      }
    }, _etch.default.dom("span", {
      className: this.icon
    }, this.name)), _etch.default.dom(_list.default, {
      groups: this.groups,
      projects: this.projects
    }));
  }

}

exports.default = GroupComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZHJvcEVmZmVjdCIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlkRHJvcCIsIm9uRGlkRHJvcCIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJpbmNsdWRlcyIsInNwbGl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJhZ292ZXIiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFKQTs7QUFNQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxFQUFMLEdBQVVELEtBQUssQ0FBQ0MsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLEtBQUssQ0FBQ0UsSUFBbEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILEtBQUssQ0FBQ0csTUFBcEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSixLQUFLLENBQUNJLFFBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxLQUFLLENBQUNLLE9BQXJCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZTixLQUFLLENBQUNNLElBQU4s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QUFtQixLQUFLSSxPQUFRO0FBQTdELE9BQ0U7QUFDRSxNQUFBLFNBQVMsRUFBQyxvQkFEWjtBQUVFLE1BQUEsU0FBUyxNQUZYO0FBR0UsTUFBQSxFQUFFLEVBQUU7QUFDRmdDLFFBQUFBLEtBQUssRUFBRSxLQUFLOUIsUUFEVjtBQUVGK0IsUUFBQUEsU0FBUyxFQUFFLEtBQUsxQixPQUZkO0FBR0YyQixRQUFBQSxPQUFPLEVBQUUsS0FBS3BCLFVBSFo7QUFJRnFCLFFBQUFBLFFBQVEsRUFBRSxLQUFLbkIsV0FKYjtBQUtGb0IsUUFBQUEsSUFBSSxFQUFFLEtBQUtqQjtBQUxUO0FBSE4sT0FXRTtBQUFNLE1BQUEsU0FBUyxFQUFFLEtBQUtsQjtBQUF0QixPQUE2QixLQUFLSixJQUFsQyxDQVhGLENBREYsRUFlRSxrQkFBQyxhQUFEO0FBQWUsTUFBQSxNQUFNLEVBQUUsS0FBS0MsTUFBNUI7QUFBb0MsTUFBQSxRQUFRLEVBQUUsS0FBS0M7QUFBbkQsTUFmRixDQURGO0FBbUJEOztBQW5JaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5ncm91cHMgPSBlbnRyeS5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IGVudHJ5LnByb2plY3RzO1xuICAgIHRoaXMuZm9sZGluZyA9IGVudHJ5LmZvbGRpbmc7XG4gICAgdGhpcy5pY29uID0gZW50cnkuaWNvbiA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nID09PSAnZXhwYW5kZWQnID8gJ2NvbGxhcHNlZCcgOiAnZXhwYW5kZWQnO1xuICAgIHN0YXRlLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHRoaXMuaWQsIHtcbiAgICAgIGZvbGRpbmc6IHRoaXMuZm9sZGluZ1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ092ZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXAgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmlkIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5uYW1lIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5mb2xkaW5nIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIG5ldyBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgbGV0IGljb24gPSBwcm9wcy5pY29uO1xuXG4gICAgaWYgKGljb24gJiYgaWNvbi5pbmNsdWRlcygnICcpKSB7XG4gICAgICBpY29uID0gaWNvbi5zcGxpdCgnICcpWzFdLnNwbGl0KCctJylbMF07XG4gICAgfVxuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVudHJ5KHsgLi4ucHJvcHMsIGljb24gfSk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGlkPXt0aGlzLmlkfSBjbGFzc05hbWU9e2BsaXN0LW5lc3RlZC1pdGVtICR7dGhpcy5mb2xkaW5nfWB9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwibGlzdC1pdGVtIHB2LWdyb3VwXCJcbiAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZCxcbiAgICAgICAgICAgIGRyYWdvdmVyOiB0aGlzLmRpZERyYWdPdmVyLFxuICAgICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17dGhpcy5pY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==