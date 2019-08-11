import path from 'path';
import { CompositeDisposable, Disposable } from 'atom';

import Config from './constants/config';
import {
  PLUGIN_NAME,
  DATABASE_FILE,
  LEGACY_DATABASE_FILE,
  DOCK_URI
} from './constants/base';
import state from './services/state';
import { readFile, saveFile } from './services/file';
import { transformLegacyContent } from './services/legacy';
import MainContainer from './containers/main';
import SelectList from './containers/select-list';
import EditorContainer from './containers/editor';
import ConfirmDelete from './components/confirm-delete';

/**
 * Package's entry point class
 */
export default class PVP {
  /**
   * Returns this package configuration object specific to Atom
   * @returns {Object} the package configuration
   */
  get config () {
    return Config;
  }

  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} serialized serialized content, should be dealt by atom
   * deserialization process
   * @param {Object} serialized.state current state
   */
  async activate (serialized) {
    this.subscriptions = new CompositeDisposable(
      atom.workspace.addOpener(uri => this.mainOpener(uri)),
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof MainContainer) {
            item.destroy();
          }
        });
      })
    );

    state.activate();

    if (atom.workspace.paneForURI(DOCK_URI)) {
      this.mainContainer.activate();
    }

    this.readState(serialized.state);
    this.addCommands();
    // this.addList();
  }

  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */
  async deactivate () {
    this.subscriptions.dispose();
    state.deactivate();
    // this.selectList.destroy();
  }

  /* eslint-disable-next-line require-jsdoc */
  mainOpener (uri) {
    if (uri === DOCK_URI) {
      this.createMainView();
      this.mainContainer.activate(true);
      return this.mainContainer;
    }
  }

  /* eslint-disable-next-line require-jsdoc */
  createMainView () {
    this.mainContainer = new MainContainer();
    return this.mainContainer;
  }

  /* eslint-disable-next-line require-jsdoc */
  addList () {
    // this compoment has performance issues
    this.selectList = new SelectList();
  }

  /**
   * handler to show the Select List view.
   */
  toggleSelectList () {
    // this.selectList.show();
  }

  /* eslint-disable-next-line require-jsdoc */
  addEntry (parentId) {
    this.openEditor(null, parentId);
  }

  /* eslint-disable-next-line require-jsdoc */
  editEntry (id) {
    this.openEditor(id);
  }

  /* eslint-disable-next-line require-jsdoc */
  deleteEntry (id) {
    const item = new ConfirmDelete(id);
    atom.workspace.addModalPanel({ item });
  }

  /**
   * Handler to register commands
   */
  addCommands () {
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'project-viewer-plus:clear-current-state': () => {
          state.clearState();
        },
        'project-viewer-plus:save-file': () => {
          this.saveFile();
        },
        'project-viewer-plus:edit-file': () => {
          this.editFile();
        },
        'project-viewer-plus:open-editor': () => {
          this.openEditor();
        },
        'project-viewer-plus:read-file': async () => {
          const content = await this.readFile();
          state.initializeState(content, true);
        },
        'project-viewer-plus:read-legacy-file': async () => {
          const content = await this.readLegacyFile();
          state.initializeState(transformLegacyContent(content.root), true);
        },
        'project-viewer-plus:toggle-visibility': () =>
          this.toggleMainVisibility(),
        'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
        'project-viewer-plus:toggle-list': () => this.toggleSelectList(),
        'project-viewer-plus:add-entry': evt =>
          this.addEntry(
            evt.target.nodeName !== 'UL' && evt.target.closest('li')
              ? evt.target.closest('li').id : NaN
          ),
        'project-viewer-plus:edit-entry': evt =>
          (evt.target.closest('li')) &&
            this.editEntry(evt.target.closest('li').id),
        'project-viewer-plus:delete-entry': evt =>
          (evt.target.closest('li')) &&
            this.deleteEntry(evt.target.closest('li').id)
      })
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  toggleMainVisibility () {
    atom.workspace.toggle(DOCK_URI);
  }

  /* eslint-disable-next-line require-jsdoc */
  toggleMainFocus () {
    if (this.mainContainer) {
      this.mainContainer.toggleFocus();
    }
  }

  /**
   * handler to read from the current file schema
   * @returns {Object} JSON parsed file content
   */
  readFile () {
    const filePath = path.join(atom.getConfigDirPath(), DATABASE_FILE);

    return readFile(filePath);
  }

  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */
  readLegacyFile () {
    const filePath = path.join(atom.getConfigDirPath(), LEGACY_DATABASE_FILE);

    return readFile(filePath);
  }

  /**
   * Atom's lifecycle method which gets called when the package is activated
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */
  async readState (currentState) {
    try {
      return state.initializeState(currentState, true);
    }
    catch (err) {
      currentState = await this.readFile();
    }

    try {
      return state.initializeState(currentState, true);
    }
    catch (err) {
      const content = await this.readLegacyFile();
      currentState = transformLegacyContent(content.root);
    }

    try {
      return state.initializeState(currentState, true);
    }
    catch (err) {
      currentState = { groups: [], projects: [] };
    }

    try {
      return state.initializeState(currentState, true);
    }
    catch (err) {
      console.log('something really wrong');
    }
  }

  /**
   * handler to save the current state to the file.
   * @param {string} id - the entry id if in edit mode
   */
  async saveFile () {
    const filePath = path.join(atom.getConfigDirPath(), DATABASE_FILE);
    await saveFile(
      filePath,
      JSON.stringify(state.serializeGroupById(NaN, false), null, 2)
    );
  }

  /**
   * handler to open the Editor view.
   */
  async editFile () {
    const filePath = path.join(atom.getConfigDirPath(), DATABASE_FILE);
    atom.workspace.open(filePath);
  }

  /**
   * handler to open the Editor view.
   * @param {string} id - the entry id if in edit mode
   * @param {string} parentId - the entry parent id if in edit mode
   */
  async openEditor (id, parentId) {
    atom.workspace.open(await new EditorContainer(id, parentId));
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  serialize () {
    return {
      state: state.serializeGroupById(),
      deserializer: 'project-viewer-plus/main'
    };
  }

  /* eslint-disable-next-line require-jsdoc */
  deserializeProjectViewerPlusView (serialized) {
    return this.createMainView();
  }
}
