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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJwcm9jZXNzRW50cmllcyIsImVudHJpZXMiLCJzYyIsIk1hcCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwicHVzaCIsImJ1aWxkRm9sZGVyU3RhdGUiLCJwYXRoIiwic3RhdGUiLCJpc0V4cGFuZGVkIiwidHJhdmVyc2VGb2xkZXJzIiwicGF0aHMiLCJyZWR1Y2UiLCJhY2MiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsInBrZyIsImRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyIsIm1haW5Nb2R1bGUiLCJnZXRUcmVlVmlld0luc3RhbmNlIiwic2VyaWFsaXplIiwicm9vdFBhdGhzIiwiT2JqZWN0Iiwia2V5cyIsImJ1aWxkTWFwIiwicGFyZW50UGF0aCIsInZhbCIsInZhbHVlcyIsInNldCIsInRyYXZlcnNlU3RhdGUiLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cGRhdGVSb290cyIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0FBR2UsTUFBTUEsT0FBTixDQUFjOztBQUszQjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7O0FBTUFDLGlCQUFnQkMsT0FBaEIsRUFBeUI7QUFDdkIsVUFBTUMsS0FBSyxFQUFYO0FBQ0EsUUFBSSxFQUFFRCxtQkFBbUJFLEdBQXJCLEtBQTZCRixRQUFRRyxNQUFSLEtBQW1CLENBQXBELEVBQXVEO0FBQ3JELGFBQU9GLEVBQVA7QUFDRDs7QUFFRCxTQUFJLElBQUksQ0FBQ0csR0FBRCxFQUFNQyxLQUFOLENBQVIsSUFBd0JMLFFBQVFBLE9BQVIsRUFBeEIsRUFBMkM7QUFDekNDLFNBQUdLLElBQUgsQ0FBUSxLQUFLQyxnQkFBTCxDQUFzQkgsR0FBdEIsRUFBMkIsRUFBRSxDQUFDQSxHQUFELEdBQU9KLFFBQVFOLEdBQVIsQ0FBWVUsR0FBWixDQUFULEVBQTNCLENBQVI7QUFDRDtBQUNELFdBQU9ILEVBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BTSxtQkFBa0JDLElBQWxCLEVBQXdCQyxLQUF4QixFQUErQjtBQUM3QixXQUFPO0FBQ0wsT0FBQ0QsSUFBRCxHQUFRO0FBQ05FLG9CQUFZRCxNQUFNRCxJQUFOLEVBQVlFLFVBRGxCO0FBRU5WLGlCQUFTLEtBQUtELGNBQUwsQ0FBb0JVLE1BQU1ELElBQU4sRUFBWVIsT0FBaEM7QUFGSDtBQURILEtBQVA7QUFNRDs7QUFFRDs7Ozs7OztBQU9BVyxrQkFBaUJDLEtBQWpCLEVBQXdCSCxLQUF4QixFQUErQjtBQUM3QixXQUFPRyxNQUFNQyxNQUFOLENBQWEsQ0FBQ0MsR0FBRCxFQUFNTixJQUFOLEtBQWU7QUFDakNNLFVBQUlOLElBQUosSUFBWSxLQUFLRCxnQkFBTCxDQUFzQkMsSUFBdEIsRUFBNEJDLEtBQTVCLEVBQW1DRCxJQUFuQyxDQUFaO0FBQ0EsYUFBT00sR0FBUDtBQUNELEtBSE0sRUFHSixFQUhJLENBQVA7QUFJRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOQyxZQUFRQyxHQUFSLENBQWEsUUFBTzNCLFFBQVFRLFdBQVksRUFBeEM7O0FBRUEsVUFBTW9CLE1BQU0sS0FBSzNCLFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUMyQixHQUFMLEVBQVU7QUFDUixhQUFPLEVBQVA7QUFDRDs7QUFFRCxVQUFNQywyQkFBMkJELElBQUlFLFVBQUosQ0FBZUMsbUJBQWYsR0FDOUJDLFNBRDhCLEdBQ2xCSCx3QkFEZjtBQUVBLFVBQU1JLFlBQVlDLE9BQU9DLElBQVAsQ0FBWU4sd0JBQVosQ0FBbEI7O0FBRUEsV0FBTyxLQUFLUixlQUFMLENBQXFCWSxTQUFyQixFQUFnQ0osd0JBQWhDLENBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BTyxXQUFVMUIsT0FBVixFQUFtQjJCLFVBQW5CLEVBQStCO0FBQzdCLFdBQU8zQixRQUFRYSxNQUFSLENBQWUsQ0FBQ0MsR0FBRCxFQUFNVCxLQUFOLEtBQWdCO0FBQ3BDLFlBQU1ELE1BQU1vQixPQUFPQyxJQUFQLENBQVlwQixLQUFaLEVBQW1CLENBQW5CLENBQVo7QUFDQSxZQUFNdUIsTUFBTUosT0FBT0ssTUFBUCxDQUFjeEIsS0FBZCxFQUFxQixDQUFyQixDQUFaO0FBQ0FTLFVBQUlnQixHQUFKLENBQ0UxQixHQURGLEVBRUUsS0FBSzJCLGFBQUwsQ0FBbUIsQ0FBQzNCLEdBQUQsQ0FBbkIsRUFBMEIsRUFBRSxDQUFDQSxHQUFELEdBQU93QixHQUFULEVBQTFCLEVBQTBDeEIsR0FBMUMsQ0FGRjtBQUlBLGFBQU9VLEdBQVA7QUFDRCxLQVJNLEVBUUosSUFBSVosR0FBSixFQVJJLENBQVA7QUFTRDs7QUFFRDs7Ozs7OztBQU9BNkIsZ0JBQWVuQixLQUFmLEVBQXNCZSxVQUF0QixFQUFrQztBQUNoQyxXQUFPZixNQUFNQyxNQUFOLENBQWEsQ0FBQ0MsR0FBRCxFQUFNTixJQUFOLEtBQWU7QUFDakNNLFVBQUlOLElBQUosSUFBWTtBQUNWRSxvQkFBWWlCLFdBQVduQixJQUFYLEVBQWlCRSxVQURuQjtBQUVWVixpQkFBUyxLQUFLMEIsUUFBTCxDQUFjQyxXQUFXbkIsSUFBWCxFQUFpQlIsT0FBL0IsRUFBd0MyQixVQUF4QztBQUZDLE9BQVo7QUFJQSxhQUFPYixHQUFQO0FBQ0QsS0FOTSxFQU1KLEVBTkksQ0FBUDtBQU9EOztBQUVEOzs7Ozs7QUFNQWtCLE9BQU12QixLQUFOLEVBQWE7QUFDWCxXQUFPLElBQUl3QixPQUFKLENBQVlDLFdBQVc7QUFDNUJsQixjQUFRQyxHQUFSLENBQWEsUUFBTzNCLFFBQVFRLFdBQVksRUFBeEM7O0FBRUEsWUFBTW9CLE1BQU0sS0FBSzNCLFVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUMyQixHQUFELElBQVEsQ0FBQ1QsS0FBYixFQUFvQjtBQUNsQixlQUFPeUIsU0FBUDtBQUNEOztBQUVEaEIsVUFBSUUsVUFBSixDQUFlQyxtQkFBZixHQUFxQ2MsV0FBckMsQ0FDRSxLQUFLSixhQUFMLENBQW1CUCxPQUFPQyxJQUFQLENBQVloQixLQUFaLENBQW5CLEVBQXVDQSxLQUF2QyxDQURGOztBQUlBeUI7QUFDRCxLQWRNLENBQVA7QUFlRDtBQTlJMEI7a0JBQVI1QyxPO0FBQUFBLE8sQ0FFWlEsVyxHQUFjLFc7QUFGRlIsTyxDQUdaRyxNLEdBQVUsR0FBRTJDLGlCQUFZLG9CIiwiZmlsZSI6InRyZWUtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlIHtcblxuICBzdGF0aWMgcGFja2FnZU5hbWUgPSAndHJlZS12aWV3JztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy50cmVlVmlld2A7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKSA/IHVuZGVmaW5lZCA6XG4gICAgICBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoUGFja2FnZS5wYWNrYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZW50cmllcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBwcm9jZXNzRW50cmllcyAoZW50cmllcykge1xuICAgIGNvbnN0IHNjID0gW107XG4gICAgaWYgKCEoZW50cmllcyBpbnN0YW5jZW9mIE1hcCkgfHwgZW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBzYztcbiAgICB9XG5cbiAgICBmb3IobGV0IFtrZXksIHZhbHVlXSBvZiBlbnRyaWVzLmVudHJpZXMoKSkge1xuICAgICAgc2MucHVzaCh0aGlzLmJ1aWxkRm9sZGVyU3RhdGUoa2V5LCB7IFtrZXldOiBlbnRyaWVzLmdldChrZXkpIH0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHNjO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGJ1aWxkRm9sZGVyU3RhdGUgKHBhdGgsIHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFtwYXRoXToge1xuICAgICAgICBpc0V4cGFuZGVkOiBzdGF0ZVtwYXRoXS5pc0V4cGFuZGVkLFxuICAgICAgICBlbnRyaWVzOiB0aGlzLnByb2Nlc3NFbnRyaWVzKHN0YXRlW3BhdGhdLmVudHJpZXMpXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXRocyAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICB0cmF2ZXJzZUZvbGRlcnMgKHBhdGhzLCBzdGF0ZSkge1xuICAgIHJldHVybiBwYXRocy5yZWR1Y2UoKGFjYywgcGF0aCkgPT4ge1xuICAgICAgYWNjW3BhdGhdID0gdGhpcy5idWlsZEZvbGRlclN0YXRlKHBhdGgsIHN0YXRlKVtwYXRoXTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBjb25zb2xlLmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG5cbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzID0gcGtnLm1haW5Nb2R1bGUuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpXG4gICAgICAuc2VyaWFsaXplKCkuZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzO1xuICAgIGNvbnN0IHJvb3RQYXRocyA9IE9iamVjdC5rZXlzKGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG5cbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUZvbGRlcnMocm9vdFBhdGhzLCBkaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50UGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYnVpbGRNYXAgKGVudHJpZXMsIHBhcmVudFBhdGgpIHtcbiAgICByZXR1cm4gZW50cmllcy5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcbiAgICAgIGNvbnN0IHZhbCA9IE9iamVjdC52YWx1ZXModmFsdWUpWzBdO1xuICAgICAgYWNjLnNldChcbiAgICAgICAga2V5LFxuICAgICAgICB0aGlzLnRyYXZlcnNlU3RhdGUoW2tleV0sIHsgW2tleV06IHZhbCB9KVtrZXldXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBuZXcgTWFwKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhdGhzIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFBhdGggLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHRyYXZlcnNlU3RhdGUgKHBhdGhzLCBwYXJlbnRQYXRoKSB7XG4gICAgcmV0dXJuIHBhdGhzLnJlZHVjZSgoYWNjLCBwYXRoKSA9PiB7XG4gICAgICBhY2NbcGF0aF0gPSB7XG4gICAgICAgIGlzRXhwYW5kZWQ6IHBhcmVudFBhdGhbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5idWlsZE1hcChwYXJlbnRQYXRoW3BhdGhdLmVudHJpZXMsIHBhcmVudFBhdGgpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkIChzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZS5nZXRUcmVlVmlld0luc3RhbmNlKCkudXBkYXRlUm9vdHMoXG4gICAgICAgIHRoaXMudHJhdmVyc2VTdGF0ZShPYmplY3Qua2V5cyhzdGF0ZSksIHN0YXRlKVxuICAgICAgKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=