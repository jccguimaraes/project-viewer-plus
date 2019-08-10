/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorName {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    this.name = props.entry.name || '';
    this.type = props.entry.type || '...';
    this.children = children;
    this.onDidChange = props.onDidChange;

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.name = props.entry.name || '';
      this.type = props.entry.type || '...';
      return etch.update(this);
    }

    return Promise.resolve();
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
        <input
          className="input-text"
          type="text"
          placeholder={'Name of ' + this.type + '...'}
          value={this.name}
          on={{
            keyup: event => this.onDidChange(event.target.value)
          }}
        />
      </div>
    );
  }
}
