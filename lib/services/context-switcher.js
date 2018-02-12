import devlog from './devlog';
import Database from './database';
import Packages from './packages';
import { PLUGIN_NAME, MESSAGES } from './../constants/base';

/**
 * Class representing the Database
 */
class ContextSwitcher {

  static instance;

  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor () {
    if (ContextSwitcher.instance) {
      return ContextSwitcher.instance;
    }
    ContextSwitcher.instance = this;

    this.database = new Database();
    this.packages = new Packages();
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  savePackages (states) {
    states.treeView = this.packages.treeView.save();
    states.findAndReplace = this.packages.findAndReplace.save();
    this.packages.linterUIDefault.save();
    this.packages.linter.save();
  }

  /**
   * description
   *
   * @param {Object} states - description
   * @returns {Promise} description
   */
  loadOrReloadPackages (states) {
    if (!states) {
      return Promise.resolve();
    }
    return this.packages.treeView.load(states.treeView)
      .then(() => this.packages.findAndReplace.load(states.findAndReplace))
      .then(() => this.packages.statusBar.reload())
      .then(() => this.packages.linter.load())
      .then(() => this.packages.linterUIDefault.load());
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  saveContext (project) {
    return new Promise(resolve => {
      const context = {
        current_project: null,
        next_project: project,
        key: null,
        state: null
      };

      context.current_project = this.database.content.selectedId ?
        this.database.content.map[this.database.content.selectedId] :
        { model: { paths: atom.project.getPaths() } };

      devlog('start save context', context.current_project);

      context.key = atom.getStateKey(context.current_project.model.paths);

      context.state = atom.serialize();

      context.docker = atom.workspace.getCenter();

      context.state.extraStates = {};

      if (context.key && context.state) {
        this.savePackages(context.state.extraStates);
        atom.getStorageFolder().storeSync(context.key, context.state);
      }

      devlog('end save context', context);

      resolve(context);
    });
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  loadContext (context) {
    return new Promise((resolve, reject) => {
      devlog('start load context', context.next_project);

      if (context.next_project.type !== 'project') {
        return reject(MESSAGES.CONTEXT.NOT_A_PROJECT);
      }
      if (!this.database.content.ids.includes(context.next_project.id)) {
        return reject(MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
      }

      context.key = atom.getStateKey(context.next_project.model.paths);
      context.state = atom.getStorageFolder().load(context.key);

      if (
        !context.state ||
        atom.getStateKey(context.state.project.paths) !== context.key
      ) {
        atom.project.setPaths(context.next_project.model.paths);
        atom.workspace.getCenter().paneContainer.activePane.destroy();

        this.database.content.selectedId = context.next_project.id;

        context.current_project.selected = false;
        context.next_project.selected = true;

        return resolve(context);
      }

      atom.project.deserialize(context.state.project)
        .then(() => atom.workspace.getCenter().deserialize(
          context.state.workspace.paneContainers.center, atom.deserializers
        ))
        .then(() => this.loadOrReloadPackages(context.state.extraStates))
        .then(() => {
          this.database.content.selectedId = context.next_project.id;

          context.current_project.selected = false;
          context.next_project.selected = true;

          // TODO: this is bad for performance
          this.database.update();

          devlog('end load context');

          resolve(context);
        });
    });
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  switchContext (project) {
    if (project.id === this.database.content.selectedId) {
      return;
    }

    return this.saveContext(project)
      .then(context => this.loadContext(context))
      .catch(reason => devlog('switching error', reason));
  }
}

export default ContextSwitcher;
