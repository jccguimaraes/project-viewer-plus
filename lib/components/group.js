/** @jsx etch.dom */

import etch from 'etch';
import ListContainer from './../containers/list';
import state from '../services/state';

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
export default class GroupComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry (entry) {
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
  didClick (event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';
    state.fullOrParcialUpdateExistingEntry(this.id, {
      folding: this.folding
    });
    this.update(this);
  }

  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */
  didDrag (event) {
    event.dataTransfer.setData('text/plain', this.id);
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd (event) {
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDragOver (event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.remove('dragging');
  }

  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */
  didDrop (event) {
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
  constructor (props) {
    this.updateEntry(props);

    this.onDidDrop = props.onDidDrop;
    etch.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */
  async update (props) {
    let icon = props.icon;

    if (icon && icon.includes(' ')) {
      icon = icon.split(' ')[1].split('-')[0];
    }

    if (props) {
      this.updateEntry({ ...props, icon });
    }

    return etch.update(this);
  }

  /**
   * Called whenever etch destroys the component
   */
  async destroy () {
    await etch.destroy(this);
  }

  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */
  render () {
    return (
      <li id={this.id} className={`list-nested-item ${this.folding}`}>
        <div
          className="list-item pv-group"
          draggable
          on={{
            click: this.didClick,
            dragstart: this.didDrag,
            dragend: this.didDragEnd,
            dragover: this.didDragOver,
            drop: this.didDrop
          }}
        >
          <span className={this.icon}>{this.name}</span>
        </div>

        <ListContainer groups={this.groups} projects={this.projects} />
      </li>
    );
  }
}
