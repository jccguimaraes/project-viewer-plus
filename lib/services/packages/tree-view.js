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
   * @returns {Object} description
   */
  save () {
    devlog(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    const processEntries = entries => {
      const sc = [];
      if (!(entries instanceof Map) || entries.length === 0) {
        return sc;
      }

      for(let [key, value] of entries.entries()) {
        sc.push(buildFolderState(key, { [key]: entries.get(key) }));
      }
      return sc;
    };

    const buildFolderState = (path, state) => {
      return {
        [path]: {
          isExpanded: state[path].isExpanded,
          entries: processEntries(state[path].entries)
        }
      };
    };

    const traverseFolders = (paths, state) => paths.reduce((acc, path) => {
      acc[path] = buildFolderState(path, state)[path];
      return acc;
    }, {});

    const directoryExpansionStates = pkg.mainModule.getTreeViewInstance()
      .serialize().directoryExpansionStates;
    const rootPaths = Object.keys(directoryExpansionStates);

    return traverseFolders(rootPaths, directoryExpansionStates);
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

      const buildMap = (entries, parentPath) => {
        return entries.reduce((acc, value) => {
          const key = Object.keys(value)[0];
          const val = Object.values(value)[0];
          acc.set(
            key,
            traverseState([key], { [key]: val })[val]);
          return acc;
        }, new Map());
      };

      const traverseState = (paths, parentPath) => paths.reduce((acc, path) => {
        acc[path] = {
          isExpanded: parentPath[path].isExpanded,
          entries: buildMap(parentPath[path].entries, parentPath)
        };
        return acc;
      }, {});

      pkg.mainModule.getTreeViewInstance().updateRoots(
        traverseState(Object.keys(state), state)
      );

      resolve();
    });
  }
}

export default Package;
