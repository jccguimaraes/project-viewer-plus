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
import ConfirmDelete from '../components/confirm-delete';
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

    if (action === 'delete') {
      const item = new ConfirmDelete(this.id);
      const modal = atom.workspace.addModalPanel({ item });

      modal.onDidDestroy(
        () =>
          !state.getEntry(this.id) &&
          atom.workspace.getActivePane().destroyActiveItem()
      );

      return;
    }
    else if (!this.id && action === 'save') {
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
  handleChangeIcon (icon) {
    this.entry.icon = icon;
    this.update(this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleAddPaths (paths) {
    paths.forEach(path => {
      if (this.entry.paths.indexOf(path) === -1) {
        this.entry.paths.push(path);
      }
    });
    this.update(this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath (path) {
    const id = this.entry.paths.indexOf(path);

    if (id !== -1) {
      this.entry.paths.splice(id, 1);
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
    const entry = state.getEntry(id);

    if (entry) {
      this.entry = { ...entry };
    }

    console.log('editor', id, this.entry);

    etch.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update (props) {
    this.entry = props;
    return etch.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy () {
    delete this.id;
    delete this.entry;
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await etch.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
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
        <Icons
          entry={this.entry}
          onDidChange={icon => this.handleChangeIcon(icon)}
        >
          <h2>Icons</h2>
        </Icons>
      );
    }

    if (this.entry && this.entry.type === 'project') {
      blocks.push(
        <EditorPaths
          entry={this.entry}
          onDidAddPaths={paths => this.handleAddPaths(paths)}
          onDidRemovePath={path => this.handleRemovePath(path)}
        >
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
