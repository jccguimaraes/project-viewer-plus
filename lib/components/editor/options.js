/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorOptions {
  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    console.log('created editor-options component', props);

    this.pristine = props.pristine;
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated editor-options component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed editor-options component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered editor-options component', this);

    return (
      <div className="block">
        <button
          on={{
            click: this.didClickDelete
          }}
          className="btn btn-error inline-block-tight"
        >
          Delete
        </button>
        <button
          on={{
            click: this.didClickUpdate
          }}
          className="btn btn-success inline-block-tight"
        >
          {this.pristine ? 'Create' : 'Edit'}
        </button>
      </div>
    );
  }
}
