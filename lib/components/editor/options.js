/** @jsx etch.dom */

import etch from 'etch';

/* eslint-disable-next-line require-jsdoc */
export default class EditorOptions {
  /* eslint-disable-next-line require-jsdoc */
  onDidClick (action) {
    this.didClick(action);
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (props) {
    console.log('created editor-options component', props);

    this.didClick = props.ondidClick;
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
      <div className="block-container as-row">
        <button
          on={{
            click: () => this.onDidClick('delete')
          }}
          className="btn btn-error inline-block-tight"
        >
          Delete
        </button>
        <button
          on={{
            click: () => this.onDidClick('cancel')
          }}
          className="btn btn-info inline-block-tight"
        >
          Cancel
        </button>
        <button
          on={{
            click: () => this.onDidClick(this.pristine ? 'create' : 'edit')
          }}
          className="btn btn-success inline-block-tight"
        >
          {this.pristine ? 'Create' : 'Edit'}
        </button>
      </div>
    );
  }
}
