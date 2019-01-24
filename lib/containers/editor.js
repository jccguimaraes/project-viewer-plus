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
  handleChangeIcon (icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeName (value) {
    this.entry.name = value;
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction (action) {
    console.log(action, this.entry);

    if (!this.id && action === 'save') {
      state.addEntry(this.entry);
    }
    else if (action === 'save') {
      state.editEntry(this.id, this.entry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeType (type) {
    switch (type) {
      case 'group':
        this.entry = state.createGroup();
        break;
      default:
        this.entry = state.createProject();
    }
    this.update(this.entry);
  }

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

    this.id = id;
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
    this.entry = props;
    return etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    const icon = this.entry ? this.entry.icon : undefined;
    const blocks = [];

    if (!this.entry) {
      blocks.push(
        <EditorType onDidChange={type => this.handleChangeType(type)}>
          <h2>Type</h2>
        </EditorType>
      );
    }
    else {
      blocks.push(
        <EditorName
          entry={this.entry}
          onDidChange={value => this.handleChangeName(value)}
        >
          <h2>Name</h2>
        </EditorName>,
        <Icons selected={icon} onIconClick={this.handleIconClick}>
          <h2>Icons</h2>
        </Icons>
      );
    }

    if (this.entry && this.entry.type === 'project') {
      blocks.push(
        <EditorPaths>
          <h2>Paths</h2>
        </EditorPaths>
      );
    }

    else if (this.entry && this.entry.type === 'group') {
      blocks.push(
        <EditorOrder>
          <h2>Order</h2>
        </EditorOrder>
      );
    }

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <EditorOptions ondidClick={action => this.handleChangeAction(action)} />
        {blocks.map(block => block)}
      </div>
    );
  }
}
