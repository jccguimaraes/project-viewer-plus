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
   * @returns {Object} description
   */
  save() {
    (0, _devlog2.default)(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    const processEntries = entries => {
      const sc = [];
      if (!(entries instanceof Map) || entries.length === 0) {
        return sc;
      }

      for (let [key, value] of entries.entries()) {
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

    const directoryExpansionStates = pkg.mainModule.getTreeViewInstance().serialize().directoryExpansionStates;
    const rootPaths = Object.keys(directoryExpansionStates);

    return traverseFolders(rootPaths, directoryExpansionStates);
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

      const buildMap = (entries, parentPath) => {
        return entries.reduce((acc, value) => {
          const key = Object.keys(value)[0];
          const val = Object.values(value)[0];
          acc.set(key, traverseState([key], { [key]: val })[val]);
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

      pkg.mainModule.getTreeViewInstance().updateRoots(traverseState(Object.keys(state), state));

      resolve();
    });
  }
}, _class.packageName = 'tree-view', _class.config = `${_base.PLUGIN_NAME}.packages.treeView`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwicGtnIiwicHJvY2Vzc0VudHJpZXMiLCJlbnRyaWVzIiwic2MiLCJNYXAiLCJsZW5ndGgiLCJrZXkiLCJ2YWx1ZSIsInB1c2giLCJidWlsZEZvbGRlclN0YXRlIiwicGF0aCIsInN0YXRlIiwiaXNFeHBhbmRlZCIsInRyYXZlcnNlRm9sZGVycyIsInBhdGhzIiwicmVkdWNlIiwiYWNjIiwiZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzIiwibWFpbk1vZHVsZSIsImdldFRyZWVWaWV3SW5zdGFuY2UiLCJzZXJpYWxpemUiLCJyb290UGF0aHMiLCJPYmplY3QiLCJrZXlzIiwibG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiYnVpbGRNYXAiLCJwYXJlbnRQYXRoIiwidmFsIiwidmFsdWVzIiwic2V0IiwidHJhdmVyc2VTdGF0ZSIsInVwZGF0ZVJvb3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOLDBCQUFRLFFBQU9ULFFBQVFRLFdBQVksRUFBbkM7QUFDQSxVQUFNRSxNQUFNLEtBQUtULFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNTLEdBQUwsRUFBVTtBQUNSLGFBQU8sRUFBUDtB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SixDQUFlQyxtQkFBZixHQUFxQ2MsV0FBckMsQ0FDRUQsY0FBY1YsT0FBT0MsSUFBUCxDQUFZWixLQUFaLENBQWQsRUFBa0NBLEtBQWxDLENBREY7O0FBSUFlO0FBQ0QsS0FoQ00sQ0FBUDtBQWlDRDtBQXJHVyxDLFNBRUw1QixXLEdBQWMsVyxTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSxvQjtrQkFxR2xCSCxPIiwiZmlsZSI6InRyZWUtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICd0cmVlLXZpZXcnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLnRyZWVWaWV3YDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3QgcHJvY2Vzc0VudHJpZXMgPSBlbnRyaWVzID0+IHtcbiAgICAgIGNvbnN0IHNjID0gW107XG4gICAgICBpZiAoIShlbnRyaWVzIGluc3RhbmNlb2YgTWFwKSB8fCBlbnRyaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc2M7XG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgW2tleSwgdmFsdWVdIG9mIGVudHJpZXMuZW50cmllcygpKSB7XG4gICAgICAgIHNjLnB1c2goYnVpbGRGb2xkZXJTdGF0ZShrZXksIHsgW2tleV06IGVudHJpZXMuZ2V0KGtleSkgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNjO1xuICAgIH07XG5cbiAgICBjb25zdCBidWlsZEZvbGRlclN0YXRlID0gKHBhdGgsIHN0YXRlKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbcGF0aF06IHtcbiAgICAgICAgICBpc0V4cGFuZGVkOiBzdGF0ZVtwYXRoXS5pc0V4cGFuZGVkLFxuICAgICAgICAgIGVudHJpZXM6IHByb2Nlc3NFbnRyaWVzKHN0YXRlW3BhdGhdLmVudHJpZXMpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHRyYXZlcnNlRm9sZGVycyA9IChwYXRocywgc3RhdGUpID0+IHBhdGhzLnJlZHVjZSgoYWNjLCBwYXRoKSA9PiB7XG4gICAgICBhY2NbcGF0aF0gPSBidWlsZEZvbGRlclN0YXRlKHBhdGgsIHN0YXRlKVtwYXRoXTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzID0gcGtnLm1haW5Nb2R1bGUuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpXG4gICAgICAuc2VyaWFsaXplKCkuZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzO1xuICAgIGNvbnN0IHJvb3RQYXRocyA9IE9iamVjdC5rZXlzKGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG5cbiAgICByZXR1cm4gdHJhdmVyc2VGb2xkZXJzKHJvb3RQYXRocywgZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZGV2bG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZyB8fCAhc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBidWlsZE1hcCA9IChlbnRyaWVzLCBwYXJlbnRQYXRoKSA9PiB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHZhbHVlKVswXTtcbiAgICAgICAgICBjb25zdCB2YWwgPSBPYmplY3QudmFsdWVzKHZhbHVlKVswXTtcbiAgICAgICAgICBhY2Muc2V0KFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgdHJhdmVyc2VTdGF0ZShba2V5XSwgeyBba2V5XTogdmFsIH0pW3ZhbF0pO1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIG5ldyBNYXAoKSk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCB0cmF2ZXJzZVN0YXRlID0gKHBhdGhzLCBwYXJlbnRQYXRoKSA9PiBwYXRocy5yZWR1Y2UoKGFjYywgcGF0aCkgPT4ge1xuICAgICAgICBhY2NbcGF0aF0gPSB7XG4gICAgICAgICAgaXNFeHBhbmRlZDogcGFyZW50UGF0aFtwYXRoXS5pc0V4cGFuZGVkLFxuICAgICAgICAgIGVudHJpZXM6IGJ1aWxkTWFwKHBhcmVudFBhdGhbcGF0aF0uZW50cmllcywgcGFyZW50UGF0aClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICAgICAgcGtnLm1haW5Nb2R1bGUuZ2V0VHJlZVZpZXdJbnN0YW5jZSgpLnVwZGF0ZVJvb3RzKFxuICAgICAgICB0cmF2ZXJzZVN0YXRlKE9iamVjdC5rZXlzKHN0YXRlKSwgc3RhdGUpXG4gICAgICApO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==