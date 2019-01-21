/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorName {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    console.log('created editor-name component', props);

    this.name = props.name;
    this.onDidChange = props.onDidChange;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-name component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-name component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-name component', this);

    return (
      <input
        className="input-text"
        type="text"
        placeholder="Name of ..."
        value={this.name}
        on={{
          keyup: event => this.onDidChange(event.target.value)
        }}
      />
    );
  }
}
