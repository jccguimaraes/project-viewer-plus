/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorOrder {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    console.log('created editor-order component');

    this.children = children;
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-order component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-order component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-order component', this);

    return (
      <div className="block-container">
        {this.children.map(child => child)}
        <label>
          Sort By&nbsp;
          <select class="input-select">
            <option>Alphabetically</option>
            <option>Position</option>
          </select>
        </label>
      </div>
    );
  }
}
