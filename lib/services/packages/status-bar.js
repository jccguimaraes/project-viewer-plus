import { PLUGIN_NAME } from './../../constants/base';

/**
 * Class representing the Database
 */
class Package {

  static packageName = 'status-bar';
  static config = `${PLUGIN_NAME}.packages.statusBar`;

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

    return {};
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

    pkg.mainModule.fileInfo.update();
    return pkg.mainModule.gitInfo.update();
  }
}

export default Package;
