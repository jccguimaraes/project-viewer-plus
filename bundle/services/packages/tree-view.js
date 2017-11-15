Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _base = require('./../../constants/base');

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
    console.log(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    return pkg.mainModule.getTreeViewInstance().serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   * @returns {Promise} description
   */
  load(state) {
    console.log(`load ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg || !state) {
      return Promise.resolve();
    }

    // does nothing
    pkg.mainModule.treeView = null;
    pkg.mainModule.getTreeViewInstance(state);

    return Promise.resolve();
  }
}, _class.packageName = 'tree-view', _class.config = `${_base.PLUGIN_NAME}.packages.treeView`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy90cmVlLXZpZXcuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsInBrZyIsIm1haW5Nb2R1bGUiLCJnZXRUcmVlVmlld0luc3RhbmNlIiwic2VyaWFsaXplIiwibG9hZCIsInN0YXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0cmVlVmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOQyxZQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFVBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFFBQUksQ0FBQ1csR0FBTCxFQUFVO0FBQ1IsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsV0FBT0EsSUFBSUMsVUFBSixDQUFlQyxtQkFBZixHQUFxQ0MsU0FBckMsRUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQUMsT0FBTUMsS0FBTixFQUFhO0FBQ1hQLFlBQVFDLEdBQVIsQ0FBYSxRQUFPWCxRQUFRUSxXQUFZLEVBQXhDO0FBQ0EsVUFBTUksTUFBTSxLQUFLWCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDVyxHQUFELElBQVEsQ0FBQ0ssS0FBYixFQUFvQjtBQUNsQixhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBUCxRQUFJQyxVQUFKLENBQWVPLFFBQWYsR0FBMEIsSUFBMUI7QUFDQVIsUUFBSUMsVUFBSixDQUFlQyxtQkFBZixDQUFtQ0csS0FBbkM7O0FBRUEsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7QUFsRFcsQyxTQUVMWCxXLEdBQWMsVyxTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSxvQjtrQkFrRGxCSCxPIiwiZmlsZSI6InRyZWUtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5jbGFzcyBQYWNrYWdlIHtcblxuICBzdGF0aWMgcGFja2FnZU5hbWUgPSAndHJlZS12aWV3JztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy50cmVlVmlld2A7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKSA/IHVuZGVmaW5lZCA6XG4gICAgICBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoUGFja2FnZS5wYWNrYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNhdmUgKCkge1xuICAgIGNvbnNvbGUubG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHBrZy5tYWluTW9kdWxlLmdldFRyZWVWaWV3SW5zdGFuY2UoKS5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coYGxvYWQgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cgfHwgIXN0YXRlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLy8gZG9lcyBub3RoaW5nXG4gICAgcGtnLm1haW5Nb2R1bGUudHJlZVZpZXcgPSBudWxsO1xuICAgIHBrZy5tYWluTW9kdWxlLmdldFRyZWVWaWV3SW5zdGFuY2Uoc3RhdGUpO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=