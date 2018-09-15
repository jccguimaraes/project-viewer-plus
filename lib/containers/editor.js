/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';
import Icons from './icons';

/* eslint-disable-next-line require-jsdoc */
export default class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  constructor () {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    etch.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update (props) {
    if (props) {
      this.props = props;
      return etch.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleIconClick (icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickDelete () {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickUpdate () {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    const editable = false;

    const props = {
      editable: editable,
      model: editable
        ? {
          name: 'project-viewer-plus'
        }
        : undefined
    };

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <div className="block-container">
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
              Update
            </button>
          </div>
          ,<h1>Edit ...</h1>
          <h2>Type</h2>
          <label class="input-label">
            <input class="input-radio" type="radio" name="type" /> Group
          </label>
          <label class="input-label">
            <input class="input-radio" type="radio" name="type" /> Project
          </label>
        </div>

        <div className="block-container">
          <h2>Options</h2>
          <input className="input-text" type="text" placeholder="Name of ..." />
          <label>
            Sort By&nbsp;
            <select class="input-select">
              <option>Alphabetically</option>
              <option>Position</option>
            </select>
          </label>
          <label>
            <input class="input-checkbox" type="checkbox" />
            &nbsp;Color&nbsp;
            <input class="input-color" type="color" />
          </label>
        </div>

        <Icons onIconClick={this.handleIconClick} />

        <div className="block-container">
          <h2>Paths</h2>
          <button className="btn btn-primary">Add path(s)</button>
        </div>
      </div>
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  getURI () {
    return 'project-viewer-plus-editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  getTitle () {
    return 'PVP - Editor';
  }
}
