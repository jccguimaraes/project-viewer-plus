'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJwcm9jZXNzRW50cmllcyIsImVudHJpZXMiLCJzYyIsIk1hcCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwicHVzaCIsImJ1aWxkRm9sZGVyU3RhdGUiLCJwYXRoIiwic3RhdGUiLCJpc0V4cGFuZGVkIiwidHJhdmVyc2VGb2xkZXJzIiwicGF0aHMiLCJyZWR1Y2UiLCJhY2MiLCJzYXZlIiwicGtnIiwiZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzIiwibWFpbk1vZHVsZSIsImdldFRyZWVWaWV3SW5zdGFuY2UiLCJzZXJpYWxpemUiLCJyb290UGF0aHMiLCJPYmplY3QiLCJrZXlzIiwiYnVpbGRNYXAiLCJwYXJlbnRQYXRoIiwidmFsIiwidmFsdWVzIiwic2V0IiwidHJhdmVyc2VTdGF0ZSIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVwZGF0ZVJvb3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7O0lBR01BLE8scUJBQU4sTUFBTUEsT0FBTixDQUFjOztBQUtaOzs7OztBQUtBQyxlQUFjO0FBQ1osV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSixRQUFRRyxNQUF4QixJQUFrQ0UsU0FBbEMsR0FDTEgsS0FBS0ksUUFBTCxDQUFjQyxnQkFBZCxDQUErQlAsUUFBUVEsV0FBdkMsQ0FERjtBQUVEOztBQUVEOzs7Ozs7QUFNQUMsaUJBQWdCQyxPQUFoQixFQUF5QjtBQUN2QixVQUFNQyxLQUFLLEVBQVg7QUFDQSxRQUFJLEVBQUVELG1CQUFtQkUsR0FBckIsS0FBNkJGLFFBQVFHLE1BQVIsS0FBbUIsQ0FBcEQsRUFBdUQ7QUFD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QUFMLEVBQVo7O0FBRUEsVUFBSSxDQUFDeUIsR0FBRCxJQUFRLENBQUNQLEtBQWIsRUFBb0I7QUFDbEIsZUFBT3NCLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEaEIsVUFBSUUsVUFBSixDQUFlQyxtQkFBZixHQUFxQ2MsV0FBckMsQ0FDRSxLQUFLSixhQUFMLENBQW1CUCxPQUFPQyxJQUFQLENBQVlkLEtBQVosQ0FBbkIsRUFBdUNBLEtBQXZDLENBREY7O0FBSUF1QjtBQUNELEtBZE0sQ0FBUDtBQWVEO0FBOUlXLEMsU0FFTGxDLFcsR0FBYyxXLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLG9CO2tCQThJbEJILE8iLCJmaWxlIjoidHJlZS12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ3RyZWUtdmlldyc7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMudHJlZVZpZXdgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcHJvY2Vzc0VudHJpZXMgKGVudHJpZXMpIHtcbiAgICBjb25zdCBzYyA9IFtdO1xuICAgIGlmICghKGVudHJpZXMgaW5zdGFuY2VvZiBNYXApIHx8IGVudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gc2M7XG4gICAgfVxuXG4gICAgZm9yKGxldCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcy5lbnRyaWVzKCkpIHtcbiAgICAgIHNjLnB1c2godGhpcy5idWlsZEZvbGRlclN0YXRlKGtleSwgeyBba2V5XTogZW50cmllcy5nZXQoa2V5KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiBzYztcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBidWlsZEZvbGRlclN0YXRlIChwYXRoLCBzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbcGF0aF06IHtcbiAgICAgICAgaXNFeHBhbmRlZDogc3RhdGVbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5wcm9jZXNzRW50cmllcyhzdGF0ZVtwYXRoXS5lbnRyaWVzKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGF0aHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgdHJhdmVyc2VGb2xkZXJzIChwYXRocywgc3RhdGUpIHtcbiAgICByZXR1cm4gcGF0aHMucmVkdWNlKChhY2MsIHBhdGgpID0+IHtcbiAgICAgIGFjY1twYXRoXSA9IHRoaXMuYnVpbGRGb2xkZXJTdGF0ZShwYXRoLCBzdGF0ZSlbcGF0aF07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXMgPSBwa2cubWFpbk1vZHVsZS5nZXRUcmVlVmlld0luc3RhbmNlKClcbiAgICAgIC5zZXJpYWxpemUoKS5kaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXM7XG4gICAgY29uc3Qgcm9vdFBhdGhzID0gT2JqZWN0LmtleXMoZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzKTtcblxuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRm9sZGVycyhyb290UGF0aHMsIGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZW50cmllcyAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRQYXRoIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBidWlsZE1hcCAoZW50cmllcywgcGFyZW50UGF0aCkge1xuICAgIHJldHVybiBlbnRyaWVzLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xuICAgICAgY29uc3QgdmFsID0gT2JqZWN0LnZhbHVlcyh2YWx1ZSlbMF07XG4gICAgICBhY2Muc2V0KFxuICAgICAgICBrZXksXG4gICAgICAgIHRoaXMudHJhdmVyc2VTdGF0ZShba2V5XSwgeyBba2V5XTogdmFsIH0pW2tleV1cbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG5ldyBNYXAoKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGF0aHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50UGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgdHJhdmVyc2VTdGF0ZSAocGF0aHMsIHBhcmVudFBhdGgpIHtcbiAgICByZXR1cm4gcGF0aHMucmVkdWNlKChhY2MsIHBhdGgpID0+IHtcbiAgICAgIGFjY1twYXRoXSA9IHtcbiAgICAgICAgaXNFeHBhbmRlZDogcGFyZW50UGF0aFtwYXRoXS5pc0V4cGFuZGVkLFxuICAgICAgICBlbnRyaWVzOiB0aGlzLmJ1aWxkTWFwKHBhcmVudFBhdGhbcGF0aF0uZW50cmllcywgcGFyZW50UGF0aClcbiAgICAgIH07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZGV2bG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHBrZy5tYWluTW9kdWxlLmdldFRyZWVWaWV3SW5zdGFuY2UoKS51cGRhdGVSb290cyhcbiAgICAgICAgdGhpcy50cmF2ZXJzZVN0YXRlKE9iamVjdC5rZXlzKHN0YXRlKSwgc3RhdGUpXG4gICAgICApO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==