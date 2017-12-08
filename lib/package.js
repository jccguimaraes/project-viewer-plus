import { CompositeDisposable } from 'atom';
import { PLUGIN_NAME } from './constants/base';
import Config from './constants/config';
import Database from './services/database';
import ContextSwitcher from './services/context-switcher';
import MainContainer from './containers/main-container';
import SelectList from './containers/select-list-container';

/**
 * Class representing the Project Viewer Package
 */
class ProjectViewerPlus {

  /**
   * Atom package lifecycle method for activating the package
   * @param {Object} [state] - description
   */
  async activate (state) {
    console.log('activate', state);
    this.disposables = new CompositeDisposable();
    this.database = new Database(state);
    this.contextSwitcher = new ContextSwitcher();
    this.selectList = new SelectList();

    this.database.onDidChange(
      () => {
        this.database.setInitialSelectedProject();
        this.selectList.setItems(this.database.content);
      },
      true
    );

    this.database.initialize();

    this.addToDock();
  }

  /**
   * @returns {Object} the package configuration
   */
  get config () {
    return Config;
  }

  /**
   * adds the project-viewer item to the specified dock.
   * @todo add alternative as a panel (settings)
   */
  async addToDock () {
    await atom.workspace.open(await this.getIntance(), {
      activateItem: atom.config.get(`${PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${PLUGIN_NAME}.dock.isVisible`)
    });

    this.handleEvents();

    // atom.workspace.getLeftDock().observePaneItems(item =>
    //   console.log('left observePaneItems', item)
    // );
    //
    // atom.workspace.getLeftDock().onDidAddPaneItem(item =>
    //   console.log('left onDidAddPaneItem', item)
    // );
    //
    // atom.workspace.getLeftDock().onDidChangeVisible(visible =>
    //   console.log('left onDidChangeVisibile', visible)
    // );
    //
    // atom.workspace.getRightDock().observePaneItems(item =>
    //   console.log('right observePaneItems', item)
    // );
    //
    // atom.workspace.getRightDock().onDidAddPaneItem(item =>
    //   console.log('right onDidAddPaneItem', item)
    // );
    //
    // atom.workspace.getRightDock().onDidChangeVisible(visible =>
    //   console.log('right onDidChangeVisibile', visible)
    // );
  }

  /**
   * Atom package lifecycle method for deactivate the package.
   */
  async deactivate () {
    await this.disposables.dispose();

    this.database.destroy();

    if (this.projectViewer) {
      this.projectViewer.destroy();
    }
    delete this.projectViewer;
  }

  /**
   * Register all events such as commands, observers and emitters.
   */
  handleEvents () {
    this.disposables.add(
      atom.commands.add('atom-workspace', {
        'project-viewer-plus:toggle-visibility': () => {
          this.projectViewer.toggleVisibility();
        },
        'project-viewer-plus:toggle-focus': () => {
          this.projectViewer.toggleFocus();
        },
        'project-viewer-plus:toggle-select-list': () => {
          this.projectViewer.toggleSelectList();
        }
      }),
      atom.commands.add(this.projectViewer.element, {
        'core:move-up': function () {
          // console.log('core:move-up', this);
        },
        'core:move-down': function () {
          // console.log('core:move-down');
        },
        'core:move-left': function () {
          // console.log('core:move-left');
        },
        'core:move-right': function () {
          // console.log('core:move-right');
        },
        'core:confirm': function () {
          // console.log('core:confirm');
        }
      })
    );
  }

  /**
   * Gets the Project Viewer instance if already set or create a new if not.
   * @todo improve description
   * @returns {Object} the Project Viewer instance.
   */
  async getIntance () {
    if (!this.projectViewer) {
      this.projectViewer = new MainContainer();
    }
    return this.projectViewer;
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} description
   */
  serialize () {
    return this.database.serialize();
  }

  /**
   *
   * @param {Object} data - description
   * @returns {Object} description
   */
  deserializeDatabase (data) {
    return data;
  }

}

export default ProjectViewerPlus;
