import { PLUGIN_NAME } from './../../constants/base';

/**
 * Class representing the Database
 */
export default class Package {
  static packageName = 'linter-ui-default';
  static config = `${PLUGIN_NAME}.packages.linter`;

  /**
   * description
   *
   * @returns {Object} description
   */
  getPackage () {
    return atom.config.get(Package.config)
      ? undefined
      : atom.packages.getActivePackage(Package.packageName);
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
  }

  /**
   * description
   *
   * @returns {Promise} description
   */
  load () {
    return new Promise(async resolve => {
      console.log(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      resolve();
    });
  }
}
