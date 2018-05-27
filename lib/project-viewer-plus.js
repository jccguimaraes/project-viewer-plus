import { CompositeDisposable } from 'atom';
import * as dependencies from 'atom-package-deps';
import { PLUGIN_NAME, DESERIALIZER } from './constants/base';
import Config from './constants/config';
import State from './services/state';
import FileContent from './services/file-content';
import ContextSwitcher from './services/context-switcher';
import GitHub from './services/github';
import MainContainer from './containers/main';
import SelectList from './containers/select-list';
import EditorContainer from './containers/editor';

/**
 * Class representing the Project Viewer Package
 */
export default class ProjectViewerPlus {
  /**
   * Returns this package configuration object specific to Atom
   * @returns {Object} the package configuration
   */
  get config () {
    return Config;
  }

  /**
   * Atom package lifecycle method for activating the package
   * @param {Object} [serialization] - serialized state
   */
  async activate (serialization) {
    this.disposables = new CompositeDisposable();
    this.state = new State();
    this.fileContent = new FileContent();
    this.gitHub = new GitHub();
    this.contextSwitcher = new ContextSwitcher();
    this.selectList = new SelectList();

    atom.packages.onDidActivateInitialPackages(() =>
      this.orchestrator(serialization)
    );
  }

  /**
   * If running in production, it will validate and ask the user
   * to install `file-icons` package.
   */
  checkDependencies () {
    if (process.env.NODE_ENV === 'production') {
      dependencies.install(PLUGIN_NAME);
    }
  }

  /**
   * adds the project-viewer item to the specified dock.
   * @todo add alternative as a panel (settings)
   */
  async addToDock () {
    await atom.workspace.open(await this.getInstance(), {
      activateItem: atom.config.get(`${PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${PLUGIN_NAME}.dock.isVisible`),
      location: atom.config.get(`${PLUGIN_NAME}.dock.position`)
    });

    this.handleEvents();
  }

  /**
   * Initializes the content receivers of the package
   */
  async initializeContent () {
    await this.fileContent.initialize();
    await this.state.update(
      await this.fileContent.readFile()
    );
  }

  /**
   * orchestrates all necessary content
   * @param {Object} serialization - a serialized content
   */
  async orchestrator (serialization = {}) {
    await this.checkDependencies();
    await this.addToDock();

    this.fileContent.onDidFileContentChange(async content => {
      await this.state.update(content);
    });

    this.state.onDidUpdateContent(content => {
      this.mainContainer.handleUpdate(content);
      this.selectList.setItems(content);
    });

    this.selectList.onDidSelectItem(item => {
      this.contextSwitcher.switchContext(item);
    });

    this.mainContainer.onDidSelectProject(project => {
      console.log(project);
    });

    await this.initializeContent();
  }

  /**
   * Atom package lifecycle method for deactivate the package.
   */
  async deactivate () {
    await this.disposables.dispose();

    this.state.clear();
    this.fileContent.destroy();

    if (this.mainContainer) {
      this.mainContainer.destroy();
      delete this.mainContainer;
    }
  }

  /**
   * Register all events such as commands, observers and emitters.
   * @private
   */
  handleEvents () {
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'project-viewer-plus:open-database-file': () => {
          this.fileContent.openFile();
        },
        'project-viewer-plus:open-editor': () => {
          this.openEditor();
        },
        'project-viewer-plus:toggle-visibility': () => {
          this.mainContainer.toggleVisibility();
        },
        'project-viewer-plus:toggle-focus': () => {
          this.mainContainer.toggleFocus();
        },
        'project-viewer-plus:toggle-select-list': () => {
          this.toggleSelectList();
        }
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
          this.handlePositionChange('left', item)
        ),
      atom.workspace
        .getRightDock()
        .onDidStopChangingActivePaneItem(item =>
          this.handlePositionChange('right', item)
        ),
      atom.config.onDidChange(`${PLUGIN_NAME}.dock.position`, () => {
        if (this.mainContainer) {
          this.mainContainer.destroy();
          delete this.mainContainer;
        }
        this.addToDock();
      })
    );
  }

  /**
   * @todo missing description
   * @param {string} position - dock emitter position
   * @param {Object} item - the active pane item
   */
  async handlePositionChange (position, item) {
    if (!atom.config.get(`${PLUGIN_NAME}.dock.saveChanges`)) {
      return;
    }
    if (item === (await this.getInstance())) {
      atom.config.set(`${PLUGIN_NAME}.dock.position`, position);
    }
  }

  /**
   * Gets the Project Viewer Container if already created or creates a new.
   * @returns {Object} the Project Viewer instance.
   */
  async getInstance () {
    if (!this.mainContainer) {
      this.mainContainer = new MainContainer();
    }
    return this.mainContainer;
  }

  /**
   *
   */
  toggleSelectList () {
    this.selectList.show();
  }

  /**
   *
   */
  async openEditor () {
    atom.workspace.open(await new EditorContainer());
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} serialized state
   */
  // serialize () {
  //   return {
  //     deserializer: DESERIALIZER,
  //     state: this.state.serialize()
  //   };
  // }
}
