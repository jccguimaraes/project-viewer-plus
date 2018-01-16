import devlog from './../devlog';
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
   * @param {Array} entries - description
   * @returns {Object} description
   */
  processEntries (entries) {
    const sc = [];
    if (!(entries instanceof Map) || entries.length === 0) {
      return sc;
    }

    for(let [key, value] of entries.entries()) {
      sc.push(this.buildFolderState(key, { [key]: entries.get(key) }));
    }
    return sc;
  }

  /**
   * description
   *
   * @param {string} path - description
   * @param {Object} state - description
   * @returns {Object} description
   */
  buildFolderState (path, state) {
    return {
      [path]: {
        isExpanded: state[path].isExpanded,
        entries: this.processEntries(state[path].entries)
      }
    };
  }

  /**
   * description
   *
   * @param {Array} paths - description
   * @param {Object} state - description
   * @returns {Object} description
   */
  traverseFolders (paths, state) {
    return paths.reduce((acc, path) => {
      acc[path] = this.buildFolderState(path, state)[path];
      return acc;
    }, {});
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

    const directoryExpansionStates = pkg.mainModule.getTreeViewInstance()
      .serialize().directoryExpansionStates;
    const rootPaths = Object.keys(directoryExpansionStates);

    return this.traverseFolders(rootPaths, directoryExpansionStates);
  }

  /**
   * description
   *
   * @param {Array} entries - description
   * @param {string} parentPath - description
   * @returns {Promise} description
   */
  buildMap (entries, parentPath) {
    return entries.reduce((acc, value) => {
      const key = Object.keys(value)[0];
      const val = Object.values(value)[0];
      acc.set(
        key,
        this.traverseState([key], { [key]: val })[key]
      );
      return acc;
    }, new Map());
  }

  /**
   * description
   *
   * @param {Array} paths - description
   * @param {string} parentPath - description
   * @returns {Promise} description
   */
  traverseState (paths, parentPath) {
    return paths.reduce((acc, path) => {
      acc[path] = {
        isExpanded: parentPath[path].isExpanded,
        entries: this.buildMap(parentPath[path].entries, parentPath)
      };
      return acc;
    }, {});
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

      if (!pkg || !state) {
        return Promise.resolve();
      }

      pkg.mainModule.getTreeViewInstance().updateRoots(
        this.traverseState(Object.keys(state), state)
      );

      resolve();
    });
  }
}

export default Package;
