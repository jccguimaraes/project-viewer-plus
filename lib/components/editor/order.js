/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorOrder {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    this.children = children;
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    return etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
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
