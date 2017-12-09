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
    states['tree-view'] = this.packages.treeView.save();
    states['find-and-replace'] = this.packages.findAndReplace.save();
    this.packages.statusBar.save();
    this.packages.linterUIDefault.save();
    this.packages.linter.save();
  }

  /**
   * description
   *
   * @param {Object} states - description
   * @returns {Promise} description
   */
  loadPackages (states) {
    return this.packages.treeView.load(states['tree-view'])
      .then(() => this.packages.findAndReplace.load(states['find-and-replace']))
      .then(() => this.packages.statusBar.load())
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

      devlog('save context', context.current_project);

      // validate if same projects (paths) - tip: use atom.getStateKey

      context.key = atom.getStateKey(context.current_project.model.paths);
      context.state = atom.serialize();
      context.state.extraStates = {};

      if (context.key && context.state) {
        this.savePackages(context.state.extraStates);
        atom.getStorageFolder().storeSync(context.key, context.state);
      }

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
      devlog('load context', context.next_project);

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

      // this must run only if context is to be kept in same instance
      context.state.workspace.paneContainers.bottom.paneContainer = {};
      context.state.workspace.paneContainers.left.paneContainer = {};
      context.state.workspace.paneContainers.center.paneContainer = {};
      context.state.workspace.paneContainers.right.paneContainer = {};

      atom.deserialize(context.state)
        .then(() => this.loadPackages(context.state.extraStates))
        .then(() => {
          this.database.content.selectedId = context.next_project.id;

          // TODO: needs a better mechanism because collapsing a group
          // will erase the selected project
          context.current_project.selected = false;
          context.next_project.selected = true;

          // TODO: this is bad for performance
          this.database.update();

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
    return this.saveContext(project)
      .then(context => this.loadContext(context))
      .catch(reason => devlog(reason));
  }
}

export default ContextSwitcher;
