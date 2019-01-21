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
  didClickAction (action) {
    console.log(action, this.entry);

    if (action === 'create') {
      state.addEntry(this.entry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  didChangeType (type) {
    switch (type) {
      case 'group':
        this.entry = state.createGroup();
        break;
      default:
        this.entry = state.createProject();
    }
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
  didClickNo () {
    console.log('didClickNo');
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickYes () {
    console.log('didClickYes', this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  didChangeName (value) {
    this.entry.name = value;
  }

  /* eslint-disable-next-line require-jsdoc */
  render () {
    console.log(this.entry);
    const icon = this.entry ? this.entry.icon : undefined;
    const name = this.entry ? this.entry.name : '';

    return (
      <div className="project-viewer-plus-editor pane-item native-key-bindings">
        <EditorOptions
          pristine={!this.entry}
          ondidClick={action => this.didClickAction(action)}
        />

        <EditorType onDidChange={type => this.didChangeType(type)}>
          <h2>Type</h2>
        </EditorType>

        <div className="block-container">
          <h2>Name</h2>
          <EditorName
            name={name}
            onDidChange={value => this.didChangeName(value)}
          />
        </div>
      </div>
    );
  }
}

/*

        <div className="block-container">
          <h2>Order</h2>
          <EditorOrder />
        </div>

        <div className="block-container">
          <h2>Name</h2>
          <EditorName
            name={name}
            onDidChange={value => this.didChangeName(value)}
          />
        </div>

        <div className="block-container">
          <h2>Icons</h2>
          <Icons selected={icon} onIconClick={this.handleIconClick} />
        </div>

        <div className="block-container">
          <h2>Paths</h2>
          <EditorPaths />
        </div>
        */
