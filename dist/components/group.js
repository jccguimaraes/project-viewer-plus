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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJjb25zb2xlIiwibG9nIiwidHlwZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcm9wIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsY0FBTixDQUFxQjtBQUNsQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxNQUFNRyxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JKLE1BQU1JLFFBQXRCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlTCxNQUFNSyxPQUFyQjtBQUNBLFNBQUtDLElBQUwsR0FDRU4sTUFBTU0sSUFBTixJQUFjQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBZCxHQUNLLFFBQU9ULE1BQU1NLElBQUssT0FEdkIsR0FFSSxJQUhOO0FBSUQ7O0FBRUQ7Ozs7QUFJQUksV0FBVUMsS0FBVixFQUFpQjtBQUNmLFNBQUtOLE9BQUwsR0FBZSxLQUFLQSxPQUFMLEtBQWlCLFVBQWpCLEdBQThCLFdBQTlCLEdBQTRDLFVBQTNEO0FBQ0FPLG9CQUFNQyxnQ0FBTixDQUF1QyxLQUFLWixFQUE1QyxFQUFnRDtBQUM5Q0ksZUFBUyxLQUFLQTtBQURnQyxLQUFoRDtBQUdBLFNBQUtTLE1BQUwsQ0FBWSxJQUFaO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU0osS0FBVCxFQUFnQjtBQUNkSyxZQUFRQyxHQUFSLENBQVksZUFBWixFQUE2Qk4sTUFBTU8sSUFBbkMsRUFBeUMsSUFBekM7QUFDQVAsVUFBTVEsTUFBTixDQUFhQyxTQUFiLENBQXVCQyxHQUF2QixDQUEyQixVQUEzQjtBQUNEOztBQUVEOzs7O0FBSUFDLGFBQVlYLEtBQVosRUFBbUI7QUFDakJLLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ04sTUFBTU8sSUFBdEMsRUFBNEMsSUFBNUM7QUFDQVAsVUFBTVEsTUFBTixDQUFhQyxTQUFiLENBQXVCRyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7O0FBSUFDLFVBQVNiLEtBQVQsRUFBZ0I7QUFDZEssWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkJOLE1BQU1PLElBQW5DLEVBQXlDLElBQXpDO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O0FBUUFPLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJWLFlBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCUyxLQUE3QjtBQUNBLFNBQUszQixXQUFMLENBQWlCMkIsS0FBakI7QUFDQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFFBQU1kLE1BQU4sQ0FBY1ksS0FBZCxFQUFxQjtBQUNuQlYsWUFBUUMsR0FBUixDQUFZLGVBQVosRUFBNkIsSUFBN0IsRUFBbUNTLEtBQW5DOztBQUVBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUt2QixNQUFMLEdBQWN1QixNQUFNdkIsTUFBcEI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCc0IsTUFBTXRCLFFBQXRCOztBQUVBLGFBQU91QixlQUFLYixNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT2UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZmYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CO0FBQ0EsVUFBTVUsZUFBS0ksT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBQyxXQUFVO0FBQ1JoQixZQUFRQyxHQUFSLENBQVksZ0JBQVosRUFBOEIsSUFBOUI7O0FBRUEsVUFBTVgsT0FDSixLQUFLQSxJQUFMLElBQWFDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFiLEdBQ0ksS0FBS0gsSUFEVCxHQUVJLElBSE47O0FBS0EsV0FDRTtBQUFBO0FBQUEsUUFBSSxJQUFJLEtBQUtMLEVBQWIsRUFBaUIsV0FBWSxvQkFBbUIsS0FBS0ksT0FBUSxFQUE3RDtBQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFVLG9CQURaO0FBRUUseUJBRkY7QUFHRSxjQUFJO0FBQ0Y0QixtQkFBTyxLQUFLdkIsUUFEVjtBQUVGd0IsdUJBQVcsS0FBS25CLE9BRmQ7QUFHRm9CLHFCQUFTLEtBQUtiLFVBSFo7QUFJRmMsa0JBQU0sS0FBS1o7QUFKVDtBQUhOO0FBVUU7QUFBQTtBQUFBLFlBQU0sV0FBV2xCLElBQWpCO0FBQXdCLGVBQUtKO0FBQTdCO0FBVkYsT0FERjtBQWNFLHlCQUFDLGNBQUQsSUFBZSxRQUFRLEtBQUtDLE1BQTVCLEVBQW9DLFVBQVUsS0FBS0MsUUFBbkQ7QUFkRixLQURGO0FBa0JEO0FBN0hpQztrQkFBZk4sYyxFQVRyQiIsImZpbGUiOiJncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1uZXN0ZWQtaXRlbWAgKGFrYSBncm91cClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLmdyb3VwcyA9IGVudHJ5Lmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gZW50cnkucHJvamVjdHM7XG4gICAgdGhpcy5mb2xkaW5nID0gZW50cnkuZm9sZGluZztcbiAgICB0aGlzLmljb24gPVxuICAgICAgZW50cnkuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHtlbnRyeS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgY2xpY2sgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgY2xpY2sgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmcgPT09ICdleHBhbmRlZCcgPyAnY29sbGFwc2VkJyA6ICdleHBhbmRlZCc7XG4gICAgc3RhdGUuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkodGhpcy5pZCwge1xuICAgICAgZm9sZGluZzogdGhpcy5mb2xkaW5nXG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBzdGFydCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkRHJhZyBncm91cCcsIGV2ZW50LnR5cGUsIHRoaXMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWREcmFnRW5kIGdyb3VwJywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZERyb3AgZ3JvdXAnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBncm91cCcsIHByb3BzKTtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHMucmVzb3VyY2VdIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZ3JvdXAnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZ3JvdXAnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGdyb3VwJywgdGhpcyk7XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgaWQ9e3RoaXMuaWR9IGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHt0aGlzLmZvbGRpbmd9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gcHYtZ3JvdXBcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kLFxuICAgICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=