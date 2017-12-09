import devlog from './../devlog';
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
    devlog(`save ${Package.packageName}`);
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
  load () {
    return new Promise(resolve => {
      devlog(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg) {
        return resolve();
      }

      pkg.mainModule.fileInfo.update();
      pkg.mainModule.gitInfo.update();

      resolve();
    });
  }
}

export default Package;
