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
    state.deleteEntry(this.id);
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
    this.id = id;
    this.entry = state.getEntry(id);
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
