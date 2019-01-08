/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorType {
  /**
   */
  constructor () {
    console.log('created editor-type component');
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-type component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-type component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-type component', this);

    return (
      <div></div>
    );
  }
}
