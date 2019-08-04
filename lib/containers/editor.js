/** @jsx etch.dom */

import { Emitter, CompositeDisposable } from 'atom';
import etch from 'etch';

import Icons from './icons';
import {
  EditorType,
  EditorOrder,
  EditorOptions,
  EditorName,
  EditorPaths,
  EditorGroups
} from '../components/editor';
import ConfirmDelete from '../components/confirm-delete';
import state from '../services/state';

/* eslint-disable-next-line require-jsdoc */
export default class EditorContainer {
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
      state.addEntry(this.newEntry);
    }
    else if (action === 'save') {
      state.editEntry(this.id, this.newEntry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeParent (parentId) {}

  /* eslint-disable-next-line require-jsdoc */
  handleChangeName (name) {
    this.update({
      ...this.newEntry,
      name
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeType (type) {
    let createdEntry;

    switch (type) {
      case 'group':
        createdEntry = state.createGroup();
        break;
      default:
        createdEntry = state.createProject();
    }

    this.update(createdEntry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeIcon (icon) {
    this.update({
      ...this.newEntry,
      icon
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  handleAddPaths (paths) {
    paths.forEach(path => {
      if (this.newEntry.paths.indexOf(path) === -1) {
        this.newEntry.paths.push(path);
      }
    });
    this.update(this.newEntry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath (path) {
    const id = this.newEntry.paths.indexOf(path);

    if (id !== -1) {
      this.newEntry.paths.splice(id, 1);
    }

    this.update(this.newEntry);
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
  constructor (id, parentId) {
    console.log('created editor', id, parentId);

    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    this.actions = [];
    this.id = id;
    const entry = state.getEntry(id);
    const parentEntry = state.getEntry(parentId);

    if (entry) {
      this.actions = ['delete'];
      this.entry = { ...entry };
      this.newEntry = { ...entry };
    }
    else if (parentEntry) {
      this.newEntry = { parentId };
    }

    console.log('editor', id, this.entry);

    etch.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update (props) {
    this.actions = [];

    if (this.id) {
      this.actions.push('delete');
    }

    if (JSON.stringify(this.entry) === JSON.stringify(props)) {
      const id = this.actions.indexOf('save');
      id !== -1 && this.actions.splice(id, 1);
    }
    else {
      this.actions.push('save');
    }

    const parentId = this.newEntry && this.newEntry.parentId;

    this.newEntry = props;

    if (parentId) {
      this.newEntry.parentId = parentId;
    }

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
    const entry = (this.newEntry && this.newEntry.type) || this.entry;

    if (!entry) {
      blocks.push(
        <EditorType onDidChange={type => this.handleChangeType(type)}>
          <h2>Type</h2>
        </EditorType>
      );
    }
    else {
      blocks.push(
        <EditorName
          entry={entry}
          onDidChange={value => this.handleChangeName(value)}
        >
          <h2>Name</h2>
        </EditorName>,
        <Icons entry={entry} onDidChange={icon => this.handleChangeIcon(icon)}>
          <h2>Icons</h2>
        </Icons>
      );
    }

    if (entry && entry.type === 'project') {
      blocks.push(
        <EditorPaths
          entry={entry}
          onDidAddPaths={paths => this.handleAddPaths(paths)}
          onDidRemovePath={path => this.handleRemovePath(path)}
        >
          <h2>Paths</h2>
        </EditorPaths>
      );
    }
    else if (this.entry && entry.type === 'group') {
      blocks.push(
        <EditorOrder>
          <h2>Order</h2>
        </EditorOrder>
      );
    }

    if (entry) {
      blocks.push(
        <EditorGroups groups={state.getGroupsInGroup()}>
          <h2>Groups</h2>
        </EditorGroups>
      );
    }

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <EditorOptions
          allowedActions={this.actions}
          ondidClick={action => this.handleChangeAction(action)}
        />

        {blocks.map(block => block)}
      </div>
    );
  }
}
