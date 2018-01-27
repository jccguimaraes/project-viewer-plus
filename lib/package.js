import { CompositeDisposable } from 'atom';
import devlog from './services/devlog';
import { PLUGIN_NAME } from './constants/base';
import Config from './constants/config';
import Database from './services/database';
import ContextSwitcher from './services/context-switcher';
import MainContainer from './containers/main';
import SelectList from './containers/select-list';

/**
 * Class representing the Project Viewer Package
 */
class ProjectViewerPlus {
  /**
   * Atom package lifecycle method for activating the package
   * @param {Object} [state] - description
   */
  async activate (state) {
    devlog('activate', state);
    this.disposables = new CompositeDisposable();
    this.database = new Database(state);
    this.contextSwitcher = new ContextSwitcher();
    this.selectList = new SelectList();

    this.database.onDidChange(() => {
      this.database.setInitialSelectedProject();
      this.selectList.setItems(this.database.content);
    }, true);

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

    atom.workspace
      .getLeftDock()
      .observePaneItems(item => devlog('left observePaneItems', item));

    atom.workspace
      .getLeftDock()
      .onDidAddPaneItem(item => devlog('left onDidAddPaneItem', item));

    atom.workspace
      .getLeftDock()
      .onDidChangeVisible(visible =>
        devlog('left onDidChangeVisibile', visible)
      );

    atom.workspace
      .getRightDock()
      .observePaneItems(item => devlog('right observePaneItems', item));

    atom.workspace
      .getRightDock()
      .onDidAddPaneItem(item => devlog('right onDidAddPaneItem', item));

    atom.workspace
      .getRightDock()
      .onDidChangeVisible(visible =>
        devlog('right onDidChangeVisibile', visible)
      );
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
        'project-viewer-plus:open-database-file': () => {
          this.database.openFile();
        },
        'project-viewer-plus:open-editor': () => {
          this.projectViewer.openEditor();
        },
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
          devlog('core:move-up', this);
        },
        'core:move-down': function () {
          devlog('core:move-down');
        },
        'core:move-left': function () {
          devlog('core:move-left');
        },
        'core:move-right': function () {
          devlog('core:move-right');
        },
        'core:confirm': function () {
          devlog('core:confirm');
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
