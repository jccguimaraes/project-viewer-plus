/** @jsx etch.dom */

import etch from 'etch';

/**
 * Component that generates an Atom `list-item` (aka project)
 */
export default class ProjectComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry (entry) {
    this.id = entry.id;
    this.name = entry.name;
    this.selected = entry.selected;
    this.paths = entry.paths;
    this.icon =
      entry.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${entry.icon}-icon`
        : null;
  }

  /* eslint-disable-next-line require-jsdoc */
  didClick (event) {
    console.log('didClick project', event.type, this);
    atom.emitter.emit('application:reopen-project', { paths: this.paths });
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrag (event) {
    event.dataTransfer.setData('text/plain', this.id);
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
  didDrop (event) {
    event.stopPropagation();

    this.onDidDrop(event.dataTransfer.getData('text/plain'), this.id);
  }

  /**
   * Project needs to be initialized as an etch component
   * @param {Object} props - etch component properties
   */
  constructor (props) {
    console.log('created project', props);

    this.updateEntry(props);

    this.onDidDrop = props.onDidDrop;
    etch.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * @param {Object} [props] etch component properties
   * @returns {Promise} description
   */
  async update (props) {
    console.log('updated project', this, props);
    if (props) {
      this.updateEntry(props);
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed project', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered project', this);

    const selected = this.selected ? 'selected' : '';
    const icon =
      this.icon && atom.packages.isPackageActive('file-icons')
        ? this.icon
        : null;

    return (
      <li
        id={this.id}
        className={`list-item pv-project ${selected}`}
        on={{
          click: this.didClick,
          dragstart: this.didDrag,
          dragend: this.didDragEnd,
          drop: this.didDrop
        }}
        draggable
      >
        <span className={icon}>{this.name}</span>
      </li>
    );
  }
}
