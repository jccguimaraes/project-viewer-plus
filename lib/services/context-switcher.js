import Database from './database';
import { MESSAGES } from './../constants/base';

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

    this.database = new Database();
    ContextSwitcher.instance = this;
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  getTreeView () {
    return atom.packages.getActivePackage('tree-view');
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  saveTreeView () {
    console.log('save tree-view');
    const pkg = this.getTreeView();

    if (!pkg) {
      return {};
    }

    return pkg.mainModule.getTreeViewInstance().serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   */
  loadTreeView (state) {
    console.log('load tree-view');
    const pkg = this.getTreeView();

    if (!pkg || !state) {
      return;
    }

    // does nothing
    pkg.mainModule.treeView = null;
    pkg.mainModule.getTreeViewInstance(state);
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  getStatusBar () {
    return atom.packages.getActivePackage('status-bar');
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  getLinter () {
    return atom.packages.getActivePackage('linter');
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  getFindAndReplace () {
    return atom.packages.getLoadedPackage('find-and-replace');
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  saveFindAndReplace () {
    console.log('save find-and-replace');
    const pkg = this.getFindAndReplace();

    if (!pkg) {
      return;
    }

    return pkg.serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   */
  loadFindAndReplace (state) {
    console.log('load find-and-replace');
    const pkg = this.getFindAndReplace();

    if (!pkg || !pkg.mainActivated || !state) {
      return;
    }

    pkg.mainModule.findHistory.items = state.findHistory;
    pkg.mainModule.findHistory.length = state.findHistory.length;

    pkg.mainModule.findOptions
      .caseSensitive = state.findOptions.caseSensitive;
    pkg.mainModule.findOptions
      .findPattern = state.findOptions.findPattern;
    pkg.mainModule.findOptions
      .inCurrentSelection = state.findOptions.inCurrentSelection;
    pkg.mainModule.findOptions
      .leadingContextLineCount = state.findOptions.leadingContextLineCount;
    pkg.mainModule.findOptions
      .pathsPattern = state.findOptions.pathsPattern;
    pkg.mainModule.findOptions
      .replacePattern = state.findOptions.replacePattern;
    pkg.mainModule.findOptions
      .trailingContextLineCount = state.findOptions.trailingContextLineCount;
    pkg.mainModule.findOptions
      .useRegex = state.findOptions.useRegex;
    pkg.mainModule.findOptions
      .wholeWord = state.findOptions.wholeWord;

    pkg.mainModule.pathsHistory.items = state.pathsHistory;
    pkg.mainModule.pathsHistory.length = state.pathsHistory.length;

    pkg.mainModule.replaceHistory.items = state.replaceHistory;
    pkg.mainModule.replaceHistory.length = state.replaceHistory.length;
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  saveOtherPackages (states) {
    // tree-view is not serialized into workspace.packageStates
    states['tree-view'] = this.saveTreeView();
    states['find-and-replace'] = this.saveFindAndReplace();
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  loadOtherPackages (states) {
    this.loadTreeView(states['tree-view']);
    this.loadFindAndReplace(states['find-and-replace']);
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  saveContext (project) {
    const context = {
      current_project: null,
      next_project: project,
      key: null,
      state: null
    };

    if (this.database.content.selectedId) {
      context.current_project = this.database.content.map[
        this.database.content.selectedId
      ];
      console.log('try to save context for', context.current_project);
    }
    else {
      context.current_project = { model: { paths: atom.project.getPaths() } };
      console.log(
        'try to save context for first time', context.current_project
      );
    }

    // validate if same projects (paths) - tip: use atom.getStateKey

    context.key = atom.getStateKey(context.current_project.model.paths);
    context.state = atom.serialize();
    context.state.extraStates = {};

    this.saveOtherPackages(context.state.extraStates);

    if (context.key && context.state) {
      atom.getStorageFolder().storeSync(context.key, context.state);
    }

    return Promise.resolve(context);
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  loadContext (context) {
    console.log('load', context.next_project);

    if (context.next_project.type !== 'project') {
      return Promise.reject(MESSAGES.CONTEXT.NOT_A_PROJECT);
    }
    if (!this.database.content.ids.includes(context.next_project.id)) {
      return Promise.reject(MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
    }

    context.key = atom.getStateKey(context.next_project.model.paths);
    context.state = atom.getStorageFolder().load(context.key);

    if (!context.state) {
      atom.project.setPaths(context.next_project.model.paths);
      atom.workspace.getCenter().paneContainer.activePane.destroy();

      this.database.content.selectedId = context.next_project.id;

      context.current_project.selected = false;
      context.next_project.selected = true;

      this.database.update();
      return Promise.resolve(context);
    }

    // this must run only if context is to be kept in same instance
    context.state.workspace.paneContainers.bottom.paneContainer = {};
    context.state.workspace.paneContainers.left.paneContainer = {};
    context.state.workspace.paneContainers.center.paneContainer = {};
    context.state.workspace.paneContainers.right.paneContainer = {};

    return atom.deserialize(context.state)
      .then(() => {
        // reload / update / whatever Other packages
        this.loadOtherPackages(context.state.extraStates);

        this.getStatusBar().mainModule.fileInfo.update();
        this.getStatusBar().mainModule.gitInfo.update();

        this.database.content.selectedId = context.next_project.id;

        // needs a better mechanism because collapsing a group will erase then
        // selected project
        context.current_project.selected = false;
        context.next_project.selected = true;

        this.database.update();
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
      .catch(reason => console.log(reason));
  }
}

export default ContextSwitcher;
