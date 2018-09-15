/** @jsx etch.dom */

import etch from 'etch';

/**
 * Component that generates an Atom `list-item` (aka project)
 */
export default class ProjectComponent {
  /**
   * Project needs to be initialized as an etch component
   * @param {Object} [props] etch component properties
   */
  constructor (props) {
    this.resource = props.resource;

    etch.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * @param {Object} [props] etch component properties
   * @returns {Promise} description
   */
  async update (props) {
    // console.log('updated', this, props);
    if (props) {
      this.props = props;
      return etch.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    // console.log('destroyed', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClick (event) {
    console.log(event.type, this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrag (event) {
    console.log(event.type, this.props);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrop (event) {
    console.log(event.type, this.props);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    const selected = this.resource.selected ? 'selected' : '';
    const icon =
      this.resource.icon && atom.packages.isPackageActive('file-icons')
        ? `icon ${this.resource.icon}-icon`
        : null;

    return (
      <li
        className={`list-item pv-project ${selected}`}
        on={{
          click: this.didClick,
          dragstart: this.didDrag,
          drop: this.didDrop
        }}
        draggable
      >
        <span className={icon}>{this.resource.name}</span>
      </li>
    );
  }
}
