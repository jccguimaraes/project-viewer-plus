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
   * @param {Object} state - description
   * @returns {Promise} description
   */
  reload() {
    return new Promise(resolve => {
      console.log(`reload ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg) {
        return resolve();
      }

      pkg.mainModule.fileInfo.update();
      pkg.mainModule.gitInfo.update();

      resolve();
    });
  }
}
exports.default = Package;
Package.packageName = 'status-bar';
Package.config = `${_base.PLUGIN_NAME}.packages.statusBar`;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9zdGF0dXMtYmFyLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0QWN0aXZlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwicmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb25zb2xlIiwibG9nIiwicGtnIiwibWFpbk1vZHVsZSIsImZpbGVJbmZvIiwidXBkYXRlIiwiZ2l0SW5mbyIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0FBR2UsTUFBTUEsT0FBTixDQUFjOztBQUszQjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7O0FBTUFDLFdBQVU7QUFDUixXQUFPLElBQUlDLE9BQUosQ0FBWUMsV0FBVztBQUM1QkMsY0FBUUMsR0FBUixDQUFhLFVBQVNiLFFBQVFRLFdBQVksRUFBMUM7QUFDQSxZQUFNTSxNQUFNLEtBQUtiLFVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUNhLEdBQUwsRUFBVTtBQUNSLGVBQU9ILFNBQVA7QUFDRDs7QUFFREcsVUFBSUMsVUFBSixDQUFlQyxRQUFmLENBQXdCQyxNQUF4QjtBQUNBSCxVQUFJQyxVQUFKLENBQWVHLE9BQWYsQ0FBdUJELE1BQXZCOztBQUVBTjtBQUNELEtBWk0sQ0FBUDtBQWFEO0FBbkMwQjtrQkFBUlgsTztBQUFBQSxPLENBRVpRLFcsR0FBYyxZO0FBRkZSLE8sQ0FHWkcsTSxHQUFVLEdBQUVnQixpQkFBWSxxQiIsImZpbGUiOiJzdGF0dXMtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdzdGF0dXMtYmFyJztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5zdGF0dXNCYXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgcmVsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZykge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZS5maWxlSW5mby51cGRhdGUoKTtcbiAgICAgIHBrZy5tYWluTW9kdWxlLmdpdEluZm8udXBkYXRlKCk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19