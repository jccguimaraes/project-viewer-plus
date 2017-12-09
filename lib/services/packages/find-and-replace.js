import devlog from './../devlog';
import { PLUGIN_NAME } from './../../constants/base';

/**
 * Class representing the Database
 */
class Package {

  static packageName = 'find-and-replace';
  static config = `${PLUGIN_NAME}.packages.findAndReplace`;

  /**
   * description
   *
   * @returns {Object} description
   */
  getPackage () {
    return atom.config.get(Package.config) ? undefined :
      atom.packages.getLoadedPackage(Package.packageName);
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

    return pkg.serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   * @returns {Promise} description
   */
  load (state) {
    return new Promise(resolve => {

      devlog(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg || !pkg.mainActivated || !state) {
        return resolve();
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

      resolve();
    });
  }
}

export default Package;
