'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

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

    let icon = props.icon;

    if (icon && icon.includes(' ')) {
      icon = icon.split(' ')[1].split('-')[0];
    }

    if (props) {
      this.updateEntry(_extends({}, props, { icon }));
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
exports.default = GroupComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsImluY2x1ZGVzIiwic3BsaXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayIsImRyYWdzdGFydCIsImRyYWdlbmQiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a1FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxNQUFNRyxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JKLE1BQU1JLFFBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxNQUFNSyxPQUFyQjtBQUNBLFNBQUtDLElBQUwsR0FDRU4sTUFBTU0sSUFBTixJQUFjQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFB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T0FERjtBQWNFLHlCQUFDLGNBQUQsSUFBZSxRQUFRLEtBQUtDLE1BQTVCLEVBQW9DLFVBQVUsS0FBS0MsUUFBbkQ7QUFkRixLQURGO0FBa0JEO0FBbklpQztrQkFBZk4sYyIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1uZXN0ZWQtaXRlbWAgKGFrYSBncm91cClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLmdyb3VwcyA9IGVudHJ5Lmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gZW50cnkucHJvamVjdHM7XG4gICAgdGhpcy5mb2xkaW5nID0gZW50cnkuZm9sZGluZztcbiAgICB0aGlzLmljb24gPVxuICAgICAgZW50cnkuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHtlbnRyeS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgY2xpY2sgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgY2xpY2sgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmcgPT09ICdleHBhbmRlZCcgPyAnY29sbGFwc2VkJyA6ICdleHBhbmRlZCc7XG4gICAgc3RhdGUuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkodGhpcy5pZCwge1xuICAgICAgZm9sZGluZzogdGhpcy5mb2xkaW5nXG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBzdGFydCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMuaWQpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXAgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmlkIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5uYW1lIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5mb2xkaW5nIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIG5ldyBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZ3JvdXAnLCBwcm9wcyk7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZ3JvdXAnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBsZXQgaWNvbiA9IHByb3BzLmljb247XG5cbiAgICBpZiAoaWNvbiAmJiBpY29uLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgIGljb24gPSBpY29uLnNwbGl0KCcgJylbMV0uc3BsaXQoJy0nKVswXTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkoeyAuLi5wcm9wcywgaWNvbiB9KTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBncm91cCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZ3JvdXAnLCB0aGlzKTtcblxuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke3RoaXMuZm9sZGluZ31gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPExpc3RDb250YWluZXIgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IC8+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==