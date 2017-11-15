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
    console.log(`save ${Package.packageName}`);
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
    console.log(`load ${Package.packageName}`);
    const pkg = this.getPackage();

    return pkg ? pkg.activate() : Promise.resolve();
  }
}

export default Package;
