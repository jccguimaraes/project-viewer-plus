/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

import Icons from './icons';
import { EditorType, EditorOrder, EditorOptions } from '../components/editor';
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
    const editable = false;

    const props = {
      editable: editable,
      model: editable
        ? {
          name: 'project-viewer-plus'
        }
        : undefined
    };

    console.log(this.entry);

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <div className="block-container">
          <EditorOptions pristine={!this.entry} />
          <EditorType />
          <EditorOrder />
        </div>

        <Icons selected={this.entry.icon} onIconClick={this.handleIconClick} />
      </div>
    );
  }
}
