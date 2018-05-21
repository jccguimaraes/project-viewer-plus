import { CompositeDisposable } from 'atom';
import * as dependencies from 'atom-package-deps';
import devlog from './services/devlog';
import { PLUGIN_NAME } from './constants/base';
import Config from './constants/config';
import Database from './services/database';
import State from './services/state';
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
  async activate (state = {}) {
    devlog('package:activate', state);
    this.state = new State();
    this.state.update(state.db);
    console.log(this.state);
    this.disposables = new CompositeDisposable();
    this.database = new Database();
    this.contextSwitcher = new ContextSwitcher();
    this.selectList = new SelectList();

    this.database.onDidChange(() => {
      this.database.setInitialSelectedProject();
      this.selectList.setItems(this.database.content);
    }, true);

    this.database.onDidError(options => {
      atom.notifications.addWarning('Database', options);
    });

    this.database.initialize(state.db);
    this.addToDock();

    if (process.env.NODE_ENV !== 'test') {
      dependencies.install(PLUGIN_NAME);
    }
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
    await atom.workspace.open(await this.getInstance(), {
      activateItem: atom.config.get(`${PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${PLUGIN_NAME}.dock.isVisible`),
      location: atom.config.get(`${PLUGIN_NAME}.dock.position`)
    });

    this.handleEvents();
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
   * @private
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
      }),
      atom.workspace.getLeftDock().onDidStopChangingActivePaneItem(
        item => this.handlePositionChange('left', item)
      ),
      atom.workspace.getRightDock().onDidStopChangingActivePaneItem(
        item => this.handlePositionChange('right', item)
      ),
      atom.config.onDidChange(`${PLUGIN_NAME}.dock.position`,
        () => {
          if (this.projectViewer) {
            this.projectViewer.destroy();
          }
          this.addToDock();
        }
      )
    );
  }

  /**
   *
   * @param {string} position - dock emitter position
   * @param {Object} item - the active pane item
   */
  async handlePositionChange (position, item) {
    if (!atom.config.get(`${PLUGIN_NAME}.dock.saveChanges`)) {
      return;
    }
    if (item === await this.getInstance()) {
      atom.config.set(`${PLUGIN_NAME}.dock.position`, position);
    }
  }

  /**
   * Gets the Project Viewer instance if already set or create a new if not.
   * @todo improve description
   * @returns {Object} the Project Viewer instance.
   */
  async getInstance () {
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
