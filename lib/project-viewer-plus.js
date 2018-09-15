import path from 'path';
import { CompositeDisposable } from 'atom';
import * as dependencies from 'atom-package-deps';

import Config from './constants/config';
import { PLUGIN_NAME } from './constants/base';
import state from './services/state';
import { readFile } from './services/file';
import { transformLegacyContent } from './services/legacy';
import MainContainer from './containers/main';
import SelectList from './containers/select-list';
import EditorContainer from './containers/editor';

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
   * @param {Object} [currentState] current state, should be dealt by atom
   *                                deserialization process
   */
  async activate (currentState) {
    this.disposables = new CompositeDisposable();

    await dependencies.install(PLUGIN_NAME);

    atom.packages.onDidActivateInitialPackages(
      () => {
        this.addItemToDock();
        // this.addList();
        this.readState(currentState);
        this.addCommands();
      });
  }

  /**
   * Atom's lifecycle method which gets called when the package is deactivated
   */
  deactivate () {
    this.mainContainer.destroyMainItem();
    // this.selectList.destroy();
    state.deactivate();
    this.disposables.dispose();
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  serialize () {
    return state.serializeGroupById();
  }

  /* eslint-disable-next-line require-jsdoc */
  addItemToDock () {
    this.mainContainer = new MainContainer();
    this.mainContainer.addMainItem();
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
    this.selectList.show();
  }

  /**
   * Handler to register commands
   */
  addCommands () {
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'project-viewer-plus:open-editor': () => {
          this.openEditor();
        },
        'project-viewer-plus:read-file': async () => {
          const content = await this.readFile();
          console.log(content);
          state.initializeState(content, true);
        },
        'project-viewer-plus:read-legacy-file': async () => {
          const content = await this.readLegacyFile();
          state.initializeState(
            transformLegacyContent(content.root),
            true
          );
        },
        'project-viewer-plus:toggle-visibility': () =>
          this.toggleMainVisibility(),
        'project-viewer-plus:toggle-focus': () => this.toggleMainFocus(),
        'project-viewer-plus:toggle-list': () => this.toggleSelectList()
      }),
      atom.commands.add(this.mainContainer.element, {
        'core:move-up': function () {
          console.log('core:move-up');
        },
        'core:move-down': function () {
          console.log('core:move-down');
        },
        'core:move-left': function () {
          console.log('core:move-left');
        },
        'core:move-right': function () {
          console.log('core:move-right');
        },
        'core:confirm': function () {
          console.log('core:confirm');
        }
      }),
      atom.workspace
        .getLeftDock()
        .onDidStopChangingActivePaneItem(item =>
          console.log('left', item)
        ),
      atom.workspace
        .getRightDock()
        .onDidStopChangingActivePaneItem(item =>
          console.log('right', item)
        ),
      atom.config.onDidChange(`${PLUGIN_NAME}.dock.position`, () => {
        this.mainContainer.destroyMainItem();
        this.addItemToDock();
        this.mainContainer.update();
      })
    );
  }

  /* eslint-disable-next-line require-jsdoc */
  toggleMainVisibility () {
    this.mainContainer.toggleVisibility();
  }

  /* eslint-disable-next-line require-jsdoc */
  toggleMainFocus () {
    this.mainContainer.toggleFocus();
  }

  /**
   * handler to read from the current file schema
   * @returns {Object} JSON parsed file content
   */
  readFile () {
    const filePath = path.join(
      atom.getConfigDirPath(),
      'project-viewer-plus.json'
    );

    return readFile(filePath);
  }

  /**
   * handler to read from the legacy file schema
   * @returns {Object} JSON parsed file content
   */
  readLegacyFile () {
    const filePath = path.join(atom.getConfigDirPath(), 'project-viewer.json');

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
   * handler to open the Editor view.
   */
  async openEditor () {
    atom.workspace.open(await new EditorContainer());
  }
}
