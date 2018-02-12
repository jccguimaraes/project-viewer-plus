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
   * @param {Object} state - description
   * @returns {Promise} description
   */
  reload () {
    return new Promise(resolve => {
      devlog(`reload ${Package.packageName}`);
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
