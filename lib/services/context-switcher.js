import Packages from './packages';
import { PLUGIN_NAME, MESSAGES } from './../constants/base';

/**
 * Class representing the context switcher
 */
export default class ContextSwitcher {
  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor () {
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
    return this.packages.treeView
      .load(states.treeView)
      .then(() => this.packages.findAndReplace.load(states.findAndReplace))
      .then(() => this.packages.statusBar.reload())
      .then(() => this.packages.linter.load())
      .then(() => this.packages.linterUIDefault.load());
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  saveContext (context) {
    return new Promise(async resolve => {
      /* this.database.content.selectedId ?
        this.database.content.map[this.database.content.selectedId] : */
      context.current_project = { model: { paths: atom.project.getPaths() } };

      console.log('start save context', context.current_project);

      context.key = atom.getStateKey(context.current_project.paths);

      context.state = atom.serialize();

      context.docker = atom.workspace.getCenter();

      context.state.extraStates = {};

      if (context.key && context.state) {
        this.savePackages(context.state.extraStates);
        await atom.stateStore.save(context.key, context.state);
      }

      console.log('end save context', context);

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
    return new Promise(async (resolve, reject) => {
      console.log('start load context', context.next_project);

      context.key = atom.getStateKey(context.next_project.paths);
      context.state = await atom.stateStore.load(context.key);

      if (
        !context.state ||
        atom.getStateKey(context.state.project.paths) !== context.key
      ) {
        atom.project.setPaths(context.next_project.paths);

        const pane = atom.workspace.getCenter().paneContainer.activePane;

        if (pane) {
          pane.destroy();
        }

        // this.database.content.selectedId = context.next_project.id;

        context.current_project.selected = false;
        context.next_project.selected = true;

        return resolve(context);
      }

      atom.project
        .deserialize(context.state.project)
        .then(() =>
          atom.workspace
            .getCenter()
            .deserialize(
              context.state.workspace.paneContainers.center,
              atom.deserializers
            )
        )
        .then(() => this.loadOrReloadPackages(context.state.extraStates))
        .then(() => {
          // this.database.content.selectedId = context.next_project.id;

          context.current_project.selected = false;
          context.next_project.selected = true;

          // TODO: this is bad for performance
          // this.database.update();

          console.log('end load context');

          resolve(context);
        });
    });
  }

  /**
   * @param {Object} project - description
   * @returns {Promise} description
   */
  validateContext (project) {
    return new Promise((resolve, reject) => {
      if (!atom.stateStore && !atom.stateStore.save && !atom.stateStore.load) {
        reject(MESSAGES.ATOM.INVALID_ATOM_API);
      }

      // else if (project.id === this.database.content.selectedId) {
      //   reject(MESSAGES.CONTEXT.SAME_PROJECT_ID);
      // }

      // else if (project.type !== 'project') {
      //   return reject(MESSAGES.CONTEXT.NOT_A_PROJECT);
      // }

      // else if (!this.database.content.ids.includes(project.id)) {
      //   return reject(MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
      // }

      resolve({
        current_project: null,
        next_project: project,
        key: null,
        state: null
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
    console.log(project);

    return this.validateContext(project)
      .then(context => this.saveContext(context))
      .then(context => this.loadContext(context))
      .catch(reason => console.log('switching error', reason));
  }
}
