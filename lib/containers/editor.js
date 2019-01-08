/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

import Icons from './icons';
import {
  EditorType,
  EditorOrder,
  EditorOptions,
  EditorName,
  EditorPaths
} from '../components/editor';
import state from '../services/state';

/* eslint-disable-next-line require-jsdoc */
export default class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  getURI () {
    return 'project-viewer-plus-editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  getTitle () {
    return 'PVP - Editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor (id) {
    console.log('created editor', id);

    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    this.entry = state.getEntry(id);
    console.log('editor', id, this.entry);

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
      return etch.update(this);
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
    console.log(this.entry);
    const icon = this.entry ? this.entry.icon : undefined;
    const name = this.entry ? this.entry.name : '';

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <div className="block-container">
          <EditorOptions pristine={!this.entry} />
        </div>

        <div className="block-container">
          <h2>Type</h2>
          <EditorType />
        </div>

        <div className="block-container">
          <h2>Order</h2>
          <EditorOrder />
        </div>

        <div className="block-container">
          <h2>Name</h2>
          <EditorName name={name} />
        </div>

        <div className="block-container">
          <h2>Icons</h2>
          <Icons selected={icon} onIconClick={this.handleIconClick} />
        </div>

        <div className="block-container">
          <h2>Paths</h2>
          <EditorPaths />
        </div>
      </div>
    );
  }
}
