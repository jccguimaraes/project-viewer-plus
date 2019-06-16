import TreeView from './packages/tree-view';
import FindAndReplace from './packages/find-and-replace';
import StatusBar from './packages/status-bar';
import Linter from './packages/linter';
import LinterUIDefault from './packages/linter-ui-default';

/**
 * Class representing the Database
 */
export default class Packages {
  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor () {
    this.treeView = new TreeView();
    this.findAndReplace = new FindAndReplace();
    this.statusBar = new StatusBar();
    this.linter = new Linter();
    this.linterUIDefault = new LinterUIDefault();
  }
}
