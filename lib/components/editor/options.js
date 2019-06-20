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
    this.actions = props.allowedActions;
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
      this.actions = props.allowedActions;
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

    const allowDelete = this.actions.includes('delete')
      ? 'btn btn-error inline-block-tight'
      : 'btn hide';

    const allowSave = this.actions.includes('save')
      ? 'btn btn-success inline-block-tight'
      : 'btn hide';

    return (
      <div className="block-container as-row">
        <button
          on={{
            click: () => this.onDidClick('delete')
          }}
          className={allowDelete}
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
            click: () => this.onDidClick('save')
          }}
          className={allowSave}
        >
          Save
        </button>
      </div>
    );
  }
}
