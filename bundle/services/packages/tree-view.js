Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _devlog = require('./../devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _base = require('./../../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing the Database
 */
let Package = (_temp = _class = class Package {

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
    (0, _devlog2.default)(`save ${Package.packageName}`);

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
      (0, _devlog2.default)(`load ${Package.packageName}`);

      const pkg = this.getPackage();

      if (!pkg || !state) {
        return Promise.resolve();
      }

      pkg.mainModule.getTreeViewInstance().updateRoots(this.traverseState(Object.keys(state), state));

      resolve();
    });
  }
}, _class.packageName = 'tree-view', _class.config = `${_base.PLUGIN_NAME}.packages.treeView`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJwcm9jZXNzRW50cmllcyIsImVudHJpZXMiLCJzYyIsIk1hcCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwicHVzaCIsImJ1aWxkRm9sZGVyU3RhdGUiLCJwYXRoIiwic3RhdGUiLCJpc0V4cGFuZGVkIiwidHJhdmVyc2VGb2xkZXJzIiwicGF0aHMiLCJyZWR1Y2UiLCJhY2MiLCJzYXZlIiwicGtnIiwiZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzIiwibWFpbk1vZHVsZSIsImdldFRyZWVWaWV3SW5zdGFuY2UiLCJzZXJpYWxpemUiLCJyb290UGF0aHMiLCJPYmplY3QiLCJrZXlzIiwiYnVpbGRNYXAiLCJwYXJlbnRQYXRoIiwidmFsIiwidmFsdWVzIiwic2V0IiwidHJhdmVyc2VTdGF0ZSIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVwZGF0ZVJvb3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7O0FBTUFDLGlCQUFnQkMsT0FBaEIsRUFBeUI7QUFDdkIsVUFBTUMsS0FBSyxFQUFYO0FBQ0EsUUFBSSxFQUFFRCxtQkFBbUJFLEdBQXJCLEtBQTZCRixRQUFRRyxNQUFSLEtBQW1CLENBQXBELEVBQXVEO0FBQ3JELGFBQU9GLEVBQVA7QUFDRDs7QUFFRCxTQUFJLElBQUksQ0FBQ0csR0FBRCxFQUFNQyxLQUFOLENBQVIsSUFBd0JMLFFBQVFBLE9BQVIsRUFBeEIsRUFBMkM7QUFDekNDLFNBQUdLLElBQUgsQ0FBUSxLQUFLQyxnQkFBTCxDQUFzQkgsR0FBdEIsRUFBMkIsRUFBRSxDQUFDQSxHQUFELEdBQU9KLFFBQVFOLEdBQVIsQ0FBWVUsR0FBWixDQUFULEVBQTNCLENBQVI7QUFDRDtBQUNELFdBQU9ILEVBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BTSxtQkFBa0JDLElBQWxCLEVBQXdCQyxLQUF4QixFQUErQjtBQUM3QixXQUFPO0FBQ0wsT0FBQ0QsSUFBRCxHQUFRO0FBQ05FLG9CQUFZRCxNQUFNRCxJQUFOLEVBQVlFLFVBRGxCO0FBRU5WLGlCQUFTLEtBQUtELGNBQUwsQ0FBb0JVLE1BQU1ELElBQU4sRUFBWVIsT0FBaEM7QUFGSDtBQURILEtBQVA7QUFNRDs7QUFFRDs7Ozs7OztBQU9BVyxrQkFBaUJDLEtBQWpCLEVBQXdCSCxLQUF4QixFQUErQjtBQUM3QixXQUFPRyxNQUFNQyxNQUFOLENBQWEsQ0FBQ0MsR0FBRCxFQUFNTixJQUFOLEtBQWU7QUFDakNNLFVBQUlOLElBQUosSUFBWSxLQUFLRCxnQkFBTCxDQUFzQkMsSUFBdEIsRUFBNEJDLEtBQTVCLEVBQW1DRCxJQUFuQyxDQUFaO0FBQ0EsYUFBT00sR0FBUDtBQUNELEtBSE0sRUFHSixFQUhJLENBQVA7QUFJRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOLDBCQUFRLFFBQU96QixRQUFRUSxXQUFZLEVBQW5DOztBQUVBLFVBQU1rQixNQUFNLEtBQUt6QixVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDeUIsR0FBTCxFQUFVO0FBQ1IsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsVUFBTUMsMkJBQTJCRCxJQUFJRSxVQUFKLENBQWVDLG1CQUFmLEdBQzlCQyxTQUQ4QixHQUNsQkgsd0JBRGY7QUFFQSxVQUFNSSxZQUFZQyxPQUFPQyxJQUFQLENBQVlOLHdCQUFaLENBQWxCOztBQUVBLFdBQU8sS0FBS04sZUFBTCxDQUFxQlUsU0FBckIsRUFBZ0NKLHdCQUFoQyxDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQU8sV0FBVXhCLE9BQVYsRUFBbUJ5QixVQUFuQixFQUErQjtBQUM3QixXQUFPekIsUUFBUWEsTUFBUixDQUFlLENBQUNDLEdBQUQsRUFBTVQsS0FBTixLQUFnQjtBQUNwQyxZQUFNRCxNQUFNa0IsT0FBT0MsSUFBUCxDQUFZbEIsS0FBWixFQUFtQixDQUFuQixDQUFaO0FBQ0EsWUFBTXFCLE1BQU1KLE9BQU9LLE1BQVAsQ0FBY3RCLEtBQWQsRUFBcUIsQ0FBckIsQ0FBWjtBQUNBUyxVQUFJYyxHQUFKLENBQ0V4QixHQURGLEVBRUUsS0FBS3lCLGFBQUwsQ0FBbUIsQ0FBQ3pCLEdBQUQsQ0FBbkIsRUFBMEIsRUFBRSxDQUFDQSxHQUFELEdBQU9zQixHQUFULEVBQTFCLEVBQTBDdEIsR0FBMUMsQ0FGRjtBQUlBLGFBQU9VLEdBQVA7QUFDRCxLQVJNLEVBUUosSUFBSVosR0FBSixFQVJJLENBQVA7QUFTRDs7QUFFRDs7Ozs7OztBQU9BMkIsZ0JBQWVqQixLQUFmLEVBQXNCYSxVQUF0QixFQUFrQztBQUNoQyxXQUFPYixNQUFNQyxNQUFOLENBQWEsQ0FBQ0MsR0FBRCxFQUFNTixJQUFOLEtBQWU7QUFDakNNLFVBQUlOLElBQUosSUFBWTtBQUNWRSxvQkFBWWUsV0FBV2pCLElBQVgsRUFBaUJFLFVBRG5CO0FBRVZWLGlCQUFTLEtBQUt3QixRQUFMLENBQWNDLFdBQVdqQixJQUFYLEVBQWlCUixPQUEvQixFQUF3Q3lCLFVBQXhDO0FBRkMsT0FBWjtBQUlBLGFBQU9YLEdBQVA7QUFDRCxLQU5NLEVBTUosRUFOSSxDQUFQO0FBT0Q7O0FBRUQ7Ozs7OztBQU1BZ0IsT0FBTXJCLEtBQU4sRUFBYTtBQUNYLFdBQU8sSUFBSXNCLE9BQUosQ0FBWUMsV0FBVztBQUM1Qiw0QkFBUSxRQUFPMUMsUUFBUVEsV0FBWSxFQUFuQzs7QUFFQSxZQUFNa0IsTUFBTSxLQUFLekIsVUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ3lCLEdBQUQsSUFBUSxDQUFDUCxLQUFiLEVBQW9CO0FBQ2xCLGVBQU9zQixRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRGhCLFVBQUlFLFVBQUosQ0FBZUMsbUJBQWYsR0FBcUNjLFdBQXJDLENBQ0UsS0FBS0osYUFBTCxDQUFtQlAsT0FBT0MsSUFBUCxDQUFZZCxLQUFaLENBQW5CLEVBQXVDQSxLQUF2QyxDQURGOztBQUlBdUI7QUFDRCxLQWRNLENBQVA7QUFlRDtBQTlJVyxDLFNBRUxsQyxXLEdBQWMsVyxTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSxvQjtrQkE4SWxCSCxPIiwiZmlsZSI6InRyZWUtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICd0cmVlLXZpZXcnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLnRyZWVWaWV3YDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBlbnRyaWVzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHByb2Nlc3NFbnRyaWVzIChlbnRyaWVzKSB7XG4gICAgY29uc3Qgc2MgPSBbXTtcbiAgICBpZiAoIShlbnRyaWVzIGluc3RhbmNlb2YgTWFwKSB8fCBlbnRyaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHNjO1xuICAgIH1cblxuICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMuZW50cmllcygpKSB7XG4gICAgICBzYy5wdXNoKHRoaXMuYnVpbGRGb2xkZXJTdGF0ZShrZXksIHsgW2tleV06IGVudHJpZXMuZ2V0KGtleSkgfSkpO1xuICAgIH1cbiAgICByZXR1cm4gc2M7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYnVpbGRGb2xkZXJTdGF0ZSAocGF0aCwgc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgW3BhdGhdOiB7XG4gICAgICAgIGlzRXhwYW5kZWQ6IHN0YXRlW3BhdGhdLmlzRXhwYW5kZWQsXG4gICAgICAgIGVudHJpZXM6IHRoaXMucHJvY2Vzc0VudHJpZXMoc3RhdGVbcGF0aF0uZW50cmllcylcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhdGhzIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHRyYXZlcnNlRm9sZGVycyAocGF0aHMsIHN0YXRlKSB7XG4gICAgcmV0dXJuIHBhdGhzLnJlZHVjZSgoYWNjLCBwYXRoKSA9PiB7XG4gICAgICBhY2NbcGF0aF0gPSB0aGlzLmJ1aWxkRm9sZGVyU3RhdGUocGF0aCwgc3RhdGUpW3BhdGhdO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNhdmUgKCkge1xuICAgIGRldmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG5cbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzID0gcGtnLm1haW5Nb2R1bGUuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpXG4gICAgICAuc2VyaWFsaXplKCkuZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzO1xuICAgIGNvbnN0IHJvb3RQYXRocyA9IE9iamVjdC5rZXlzKGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG5cbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZUZvbGRlcnMocm9vdFBhdGhzLCBkaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50UGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYnVpbGRNYXAgKGVudHJpZXMsIHBhcmVudFBhdGgpIHtcbiAgICByZXR1cm4gZW50cmllcy5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcbiAgICAgIGNvbnN0IHZhbCA9IE9iamVjdC52YWx1ZXModmFsdWUpWzBdO1xuICAgICAgYWNjLnNldChcbiAgICAgICAga2V5LFxuICAgICAgICB0aGlzLnRyYXZlcnNlU3RhdGUoW2tleV0sIHsgW2tleV06IHZhbCB9KVtrZXldXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBuZXcgTWFwKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhdGhzIC0gZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmVudFBhdGggLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHRyYXZlcnNlU3RhdGUgKHBhdGhzLCBwYXJlbnRQYXRoKSB7XG4gICAgcmV0dXJuIHBhdGhzLnJlZHVjZSgoYWNjLCBwYXRoKSA9PiB7XG4gICAgICBhY2NbcGF0aF0gPSB7XG4gICAgICAgIGlzRXhwYW5kZWQ6IHBhcmVudFBhdGhbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5idWlsZE1hcChwYXJlbnRQYXRoW3BhdGhdLmVudHJpZXMsIHBhcmVudFBhdGgpXG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkIChzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGRldmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG5cbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZyB8fCAhc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZS5nZXRUcmVlVmlld0luc3RhbmNlKCkudXBkYXRlUm9vdHMoXG4gICAgICAgIHRoaXMudHJhdmVyc2VTdGF0ZShPYmplY3Qua2V5cyhzdGF0ZSksIHN0YXRlKVxuICAgICAgKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=