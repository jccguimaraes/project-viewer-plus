import devlog from './../devlog';
import { PLUGIN_NAME } from './../../constants/base';

/**
 * Class representing the Database
 */
class Package {

  static packageName = 'linter';
  static config = `${PLUGIN_NAME}.packages.linter`;

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
   */
  save () {
    devlog(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return;
    }

    pkg.deactivate();
  }

  /**
   * description
   *
   * @returns {Promise} description
   */
  load () {
    return new Promise(async resolve => {
      devlog(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      if (pkg) {
        await pkg.activate();
      }

      resolve();
    });
  }
}

export default Package;
