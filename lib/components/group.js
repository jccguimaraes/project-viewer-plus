/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';
import state from '../services/state';

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
export default class GroupComponent {
  /**
   * Group needs to be initialized as an etch component
   * @param {Object} props etch component properties
   * @param {Object} props.resource the group resource model and extras
   * @param {Function} props.didUpdateResource parent callback to propagate the
   * new state
   */
  constructor (props) {
    this.resource = props.resource;
    this.didUpdateResource = props.onUpdate;

    etch.initialize(this);
  }

  /**
   * handler for click events
   * @param {Object} event the click event object
   */
  didClick (event) {
    this.resource.expanded = !this.resource.expanded;
    state.fullOrParcialUpdateExistingEntry(this.resource.id, {
      expanded: this.resource.expanded
    });
    etch.update(this, false);
  }

  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */
  didDrag (event) {
    console.log(event.type, this.props);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd (event) {
    console.log(event.type, this.props);
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop (event) {
    console.log(event.type, this.props);
  }

  /**
   * callback handler for state update
   * @param {Object} state the updated resource state
   */
  didUpdateResource (state) {
    this.emitter.emit('emit', state);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   * @param {Object} [props.resource] the group resource model and extras
   */
  async update (props) {
    console.log('updated', this, props);
    if (props) {
      this.resource = props.resource;
      etch.update(this, false);
    }
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy () {
    console.log('destroyed', this);
    await etch.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render () {
    console.log('render', this.resource);
    const { groups, projects } = this.resource;
    const state = this.resource.expanded ? 'expanded' : 'collapsed';
    const icon =
      this.resource.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.resource.icon}-icon`
        : null;

    return (
      <li className={`list-nested-item ${state}`}>
        <div
          className="list-item pv-group"
          on={{
            click: this.didClick,
            dragstart: this.didDrag,
            drop: this.didDrop,
            dragend: this.didDragEnd
          }}
          draggable
        >
          <span className={icon}>{this.resource.name}</span>
        </div>

        <ListContainer groups={groups} projects={projects} isRoot />
      </li>
    );
  }
}
