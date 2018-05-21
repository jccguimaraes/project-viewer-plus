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
        return resolve();
      }

      pkg.mainModule.getTreeViewInstance().updateRoots(this.traverseState(Object.keys(state), state));

      resolve();
    });
  }
}, _class.packageName = 'tree-view', _class.config = `${_base.PLUGIN_NAME}.packages.treeView`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJwcm9jZXNzRW50cmllcyIsImVudHJpZXMiLCJzYyIsIk1hcCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwicHVzaCIsImJ1aWxkRm9sZGVyU3RhdGUiLCJwYXRoIiwic3RhdGUiLCJpc0V4cGFuZGVkIiwidHJhdmVyc2VGb2xkZXJzIiwicGF0aHMiLCJyZWR1Y2UiLCJhY2MiLCJzYXZlIiwicGtnIiwiZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzIiwibWFpbk1vZHVsZSIsImdldFRyZWVWaWV3SW5zdGFuY2UiLCJzZXJpYWxpemUiLCJyb290UGF0aHMiLCJPYmplY3QiLCJrZXlzIiwiYnVpbGRNYXAiLCJwYXJlbnRQYXRoIiwidmFsIiwidmFsdWVzIiwic2V0IiwidHJhdmVyc2VTdGF0ZSIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInVwZGF0ZVJvb3RzIiwiUExVR0lOX05BTUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7OztBQU1BQyxpQkFBZ0JDLE9BQWhCLEVBQXlCO0FBQ3ZCLFVBQU1DLEtBQUssRUFBWDtBQUNBLFFBQUksRUFBRUQsbUJBQW1CRSxHQUFyQixLQUE2QkYsUUFBUUcsTUFBUixLQUFtQixD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LE1BQU0sS0FBS3pCLFVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUN5QixHQUFELElBQVEsQ0FBQ1AsS0FBYixFQUFvQjtBQUNsQixlQUFPdUIsU0FBUDtBQUNEOztBQUVEaEIsVUFBSUUsVUFBSixDQUFlQyxtQkFBZixHQUFxQ2MsV0FBckMsQ0FDRSxLQUFLSixhQUFMLENBQW1CUCxPQUFPQyxJQUFQLENBQVlkLEtBQVosQ0FBbkIsRUFBdUNBLEtBQXZDLENBREY7O0FBSUF1QjtBQUNELEtBZE0sQ0FBUDtBQWVEO0FBOUlXLEMsU0FFTGxDLFcsR0FBYyxXLFNBQ2RMLE0sR0FBVSxHQUFFeUMsaUJBQVksb0I7a0JBOElsQjVDLE8iLCJmaWxlIjoidHJlZS12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ3RyZWUtdmlldyc7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMudHJlZVZpZXdgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGVudHJpZXMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcHJvY2Vzc0VudHJpZXMgKGVudHJpZXMpIHtcbiAgICBjb25zdCBzYyA9IFtdO1xuICAgIGlmICghKGVudHJpZXMgaW5zdGFuY2VvZiBNYXApIHx8IGVudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gc2M7XG4gICAgfVxuXG4gICAgZm9yKGxldCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcy5lbnRyaWVzKCkpIHtcbiAgICAgIHNjLnB1c2godGhpcy5idWlsZEZvbGRlclN0YXRlKGtleSwgeyBba2V5XTogZW50cmllcy5nZXQoa2V5KSB9KSk7XG4gICAgfVxuICAgIHJldHVybiBzYztcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBidWlsZEZvbGRlclN0YXRlIChwYXRoLCBzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICBbcGF0aF06IHtcbiAgICAgICAgaXNFeHBhbmRlZDogc3RhdGVbcGF0aF0uaXNFeHBhbmRlZCxcbiAgICAgICAgZW50cmllczogdGhpcy5wcm9jZXNzRW50cmllcyhzdGF0ZVtwYXRoXS5lbnRyaWVzKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGF0aHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgdHJhdmVyc2VGb2xkZXJzIChwYXRocywgc3RhdGUpIHtcbiAgICByZXR1cm4gcGF0aHMucmVkdWNlKChhY2MsIHBhdGgpID0+IHtcbiAgICAgIGFjY1twYXRoXSA9IHRoaXMuYnVpbGRGb2xkZXJTdGF0ZShwYXRoLCBzdGF0ZSlbcGF0aF07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXMgPSBwa2cubWFpbk1vZHVsZS5nZXRUcmVlVmlld0luc3RhbmNlKClcbiAgICAgIC5zZXJpYWxpemUoKS5kaXJlY3RvcnlFeHBhbnNpb25TdGF0ZXM7XG4gICAgY29uc3Qgcm9vdFBhdGhzID0gT2JqZWN0LmtleXMoZGlyZWN0b3J5RXhwYW5zaW9uU3RhdGVzKTtcblxuICAgIHJldHVybiB0aGlzLnRyYXZlcnNlRm9sZGVycyhyb290UGF0aHMsIGRpcmVjdG9yeUV4cGFuc2lvblN0YXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gZW50cmllcyAtIGRlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJlbnRQYXRoIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBidWlsZE1hcCAoZW50cmllcywgcGFyZW50UGF0aCkge1xuICAgIHJldHVybiBlbnRyaWVzLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXModmFsdWUpWzBdO1xuICAgICAgY29uc3QgdmFsID0gT2JqZWN0LnZhbHVlcyh2YWx1ZSlbMF07XG4gICAgICBhY2Muc2V0KFxuICAgICAgICBrZXksXG4gICAgICAgIHRoaXMudHJhdmVyc2VTdGF0ZShba2V5XSwgeyBba2V5XTogdmFsIH0pW2tleV1cbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG5ldyBNYXAoKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcGF0aHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyZW50UGF0aCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgdHJhdmVyc2VTdGF0ZSAocGF0aHMsIHBhcmVudFBhdGgpIHtcbiAgICByZXR1cm4gcGF0aHMucmVkdWNlKChhY2MsIHBhdGgpID0+IHtcbiAgICAgIGFjY1twYXRoXSA9IHtcbiAgICAgICAgaXNFeHBhbmRlZDogcGFyZW50UGF0aFtwYXRoXS5pc0V4cGFuZGVkLFxuICAgICAgICBlbnRyaWVzOiB0aGlzLmJ1aWxkTWFwKHBhcmVudFBhdGhbcGF0aF0uZW50cmllcywgcGFyZW50UGF0aClcbiAgICAgIH07XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZGV2bG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcblxuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZS5nZXRUcmVlVmlld0luc3RhbmNlKCkudXBkYXRlUm9vdHMoXG4gICAgICAgIHRoaXMudHJhdmVyc2VTdGF0ZShPYmplY3Qua2V5cyhzdGF0ZSksIHN0YXRlKVxuICAgICAgKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=