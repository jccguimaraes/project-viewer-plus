/** @jsx etch.dom */

import etch from 'etch';
import state from '../services/state';

/* eslint-disable-next-line require-jsdoc */
export default class ConfirmDelete {
  /* eslint-disable-next-line require-jsdoc */
  closePanel () {
    const panel = atom.workspace
      .getModalPanels()
      .find(panel => panel.item === this);
    panel.destroy();
  }

  /* eslint-disable-next-line require-jsdoc */
  didDelete () {
    state.deleteEntry(this.entry.id);
    this.closePanel();
  }

  /* eslint-disable-next-line require-jsdoc */
  didCancel () {
    this.closePanel();
  }

  /**
   * @param {number} id - etch component properties
   */
  constructor (id) {
    console.log('created confirm-delete component', id);
    this.entry = state.getEntry(id);
    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    console.log('updated confirm-delete component', this, props);

    if (props) {
      return etch.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    console.log('destroyed confirm-delete component', this);
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log('rendered confirm-delete component', this);

    return (
      <div class="inset-panel padded">
        <p>
          Delete <strong>{this.entry.name}</strong>?
        </p>
        <div class="block">
          <button
            on={{
              click: this.didDelete
            }}
            class="btn btn-success inline-block-tight"
          >
            Confirm
          </button>
          <button
            on={{
              click: this.didCancel
            }}
            class="btn btn-error inline-block-tight"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}
