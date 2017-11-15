import { PLUGIN_NAME } from './../../constants/base';

/**
 * Class representing the Database
 */
class Package {

  static packageName = 'tree-view';
  static config = `${PLUGIN_NAME}.packages.treeView`;

  /**
   * description
   *
   * @returns {Object} description
   */
  getPackage () {
    return atom.config.get(Package.config) ? undefined :
      atom.packages.getActivePackage(Package.packageName);
  }

  /**
   * description
   *
   * @returns {Object} description
   */
  save () {
    console.log(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    return pkg.mainModule.getTreeViewInstance().serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   * @returns {Promise} description
   */
  load (state) {
    console.log(`load ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg || !state) {
      return Promise.resolve();
    }

    // does nothing
    pkg.mainModule.treeView = null;
    pkg.mainModule.getTreeViewInstance(state);

    return Promise.resolve();
  }
}

export default Package;
