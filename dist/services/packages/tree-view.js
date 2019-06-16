'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./../../constants/base');

/**
 * Class representing the Database
 */
class Package {

  /**
   * description
   *
   * @returns {Object} description
   */
  getPackage() {
    return atom.config.get(Package.config) ? undefined : atom.packages.getActivePackage(Package.packageName);
  }

  /**
   * description
   *
   * @param {Array} entries - description
   * @returns {Object} description
   */
  processEntries(entries) {
    const sc = [];
    if (!(entries instanceof Map) || entries.length === 0) {
      return sc;
    }

    for (let [key, value] of entries.entries()) {
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
  buildFolderState(path, state) {
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
  traverseFolders(paths, state) {
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
  save() {
    console.log(`save ${Package.packageName}`);

    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    const directoryExpansionStates = pkg.mainModule.getTreeViewInstance().serialize().directoryExpansionStates;
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
  buildMap(entries, parentPath) {
    return entries.reduce((acc, value) => {
      const key = Object.keys(value)[0];
      const val = Object.values(value)[0];
      acc.set(key, this.traverseState([key], { [key]: val })[key]);
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
  traverseState(paths, parentPath) {
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
  load(state) {
    return new Promise(resolve => {
      console.log(`load ${Package.packageName}`);

      const pkg = this.getPackage();

      if (!pkg || !state) {
        return resolve();
      }

      pkg.mainModule.getTreeViewInstance().updateRoots(this.traverseState(Object.keys(state), state));

      resolve();
    });
  }
}
exports.default = Package;
Package.packageName = 'tree-view';
Package.config = `${_base.PLUGIN_NAME}.packages.treeView`;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJwcm9jZXNzRW50cmllcyIsImVudHJpZXMiLCJzYyIsIk1hcCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwicHVzaCIsImJ1aWxkRm9sZGVyU3RhdGUiLCJwYXRoIiwic3RhdGUiLCJpc0V4cGFuZGVkIiwidHJhdmVyc2VGb2xkZXJzIiwicGF0aHMiLCJyZWR1Y2UiLCJhY2MiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsInBrZyIsImRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyIsIm1haW5Nb2R1bGUiLCJnZXRUcmVlVmlld0luc3RhbmNlIiwic2VyaWFsaXplIiwicm9vdFBhdGhzIiwiT2JqZWN0Iiwia2V5cyIsImJ1aWxkTWFwIiwicGFyZW50UGF0aCIsInZhbCIsInZhbHVlcyIsInNldCIsInRyYXZlcnNlU3RhdGUiLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cGRhdGVSb290cyIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0FBR2UsTUFBTUEsT0FBTixDQUFjOztBQUkzQjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFDSEUsU0FERyxHQUVISCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQUZKO0FBR0Q7O0FBRUQ7Ozs7OztBQU1BQyxpQkFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3ZCLFVBQU1DLEtBQUssRUFBWDtBQUNBLFFBQUksRUFBRUQsbUJBQW1CRSxHQUFyQixLQUE2QkYsUUFBUUcsTUFBUixLQUFtQixDQUFwRCxF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QVksRUFBeEM7O0FBRUEsWUFBTW9CLE1BQU0sS0FBSzNCLFVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUMyQixHQUFELElBQVEsQ0FBQ1QsS0FBYixFQUFvQjtBQUNsQixlQUFPeUIsU0FBUDtBQUNEOztBQUVEaEIsVUFBSUUsVUFBSixDQUNHQyxtQkFESCxHQUVHYyxXQUZILENBRWUsS0FBS0osYUFBTCxDQUFtQlAsT0FBT0MsSUFBUCxDQUFZaEIsS0FBWixDQUFuQixFQUF1Q0EsS0FBdkMsQ0FGZjs7QUFJQXlCO0FBQ0QsS0FkTSxDQUFQO0FBZUQ7QUE1STBCO2tCQUFSNUMsTztBQUFBQSxPLENBQ1pRLFcsR0FBYyxXO0FBREZSLE8sQ0FFWkcsTSxHQUFVLEdBQUUyQyxpQkFBWSxvQiIsImZpbGUiOiJ0cmVlLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZSB7XG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICd0cmVlLXZpZXcnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLnRyZWVWaWV3YDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoUGFja2FnZS5wYWNrYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZW50cmllcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBwcm9jZXNzRW50cmllcyAoZW50cmllcykge1xuICAgIGNvbnN0IHNjID0gW107XG4gICAgaWYgKCEoZW50cmllcyBpbnN0YW5jZW9mIE1hcCkgfHwgZW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBzYztcbiAgICB9XG5cbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcy5lbnRyaWVzKCkpIHtcbiAgICAgIHNjLnB1c2godGhpcy5idWlsZEZvbGRlclN0YXRlKGtleSwgeyBba2V5XTogZW50cmllcy5nZXQoa2V5KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiBzYztcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBidWlsZEZvbGRlclN0YXRlIChwYXRoLCBzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbcGF0aF06IHtcbiAgICAgICAgaXNFeHBhbmRlZDogc3RhdGVbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5wcm9jZXNzRW50cmllcyhzdGF0ZVtwYXRoXS5lbnRyaWVzKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGF0aHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgdHJhdmVyc2VGb2xkZXJzIChwYXRocywgc3RhdGUpIHtcbiAgICByZXR1cm4gcGF0aHMucmVkdWNlKChhY2MsIHBhdGgpID0+IHtcbiAgICAgIGFjY1twYXRoXSA9IHRoaXMuYnVpbGRGb2xkZXJTdGF0ZShwYXRoLCBzdGF0ZSlbcGF0aF07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgY29uc29sZS5sb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuXG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIGNvbnN0IGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyA9IHBrZy5tYWluTW9kdWxlXG4gICAgICAuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpXG4gICAgICAuc2VyaWFsaXplKCkuZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzO1xuICAgIGNvbnN0IHJvb3RQYXRocyA9IE9iamVjdC5rZXlzKGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG5cbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUZvbGRlcnMocm9vdFBhdGhzLCBkaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50UGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYnVpbGRNYXAgKGVudHJpZXMsIHBhcmVudFBhdGgpIHtcbiAgICByZXR1cm4gZW50cmllcy5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcbiAgICAgIGNvbnN0IHZhbCA9IE9iamVjdC52YWx1ZXModmFsdWUpWzBdO1xuICAgICAgYWNjLnNldChrZXksIHRoaXMudHJhdmVyc2VTdGF0ZShba2V5XSwgeyBba2V5XTogdmFsIH0pW2tleV0pO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBuZXcgTWFwKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhdGhzIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFBhdGggLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHRyYXZlcnNlU3RhdGUgKHBhdGhzLCBwYXJlbnRQYXRoKSB7XG4gICAgcmV0dXJuIHBhdGhzLnJlZHVjZSgoYWNjLCBwYXRoKSA9PiB7XG4gICAgICBhY2NbcGF0aF0gPSB7XG4gICAgICAgIGlzRXhwYW5kZWQ6IHBhcmVudFBhdGhbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5idWlsZE1hcChwYXJlbnRQYXRoW3BhdGhdLmVudHJpZXMsIHBhcmVudFBhdGgpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkIChzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZVxuICAgICAgICAuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpXG4gICAgICAgIC51cGRhdGVSb290cyh0aGlzLnRyYXZlcnNlU3RhdGUoT2JqZWN0LmtleXMoc3RhdGUpLCBzdGF0ZSkpO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==