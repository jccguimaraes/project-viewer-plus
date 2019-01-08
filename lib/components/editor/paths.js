/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorPaths {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    console.log('created editor-paths component', props);

    this.name = props.name;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-paths component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-paths component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-paths component', this);

    return (
      <button className="btn btn-primary">Add path(s)</button>
    );
  }
}
