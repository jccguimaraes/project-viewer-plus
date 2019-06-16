/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorType {
  /* eslint-disable-next-line require-jsdoc */
  didClick (evt) {
    const type = evt.target.closest('label').textContent.toLowerCase();
    this.onDidChange(type);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props, children) {
    console.log('created editor-type component', props, children);

    this.onDidChange = props.onDidChange;
    this.children = children;
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
      <div className="block-container">
        {this.children.map(child => child)}
        <label class="input-label">
          <input
            class="input-radio"
            type="radio"
            name="type"
            on={{
              click: evt => this.didClick(evt)
            }}
          />
          Group
        </label>
        <label class="input-label">
          <input
            class="input-radio"
            type="radio"
            name="type"
            on={{
              click: evt => this.didClick(evt)
            }}
          />
          Project
        </label>
      </div>
    );
  }
}
