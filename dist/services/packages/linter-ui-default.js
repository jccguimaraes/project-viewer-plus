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
   */
  save() {
    console.log(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return;
    }
  }

  /**
   * description
   *
   * @returns {Promise} description
   */
  load() {
    return new Promise(async resolve => {
      console.log(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      resolve();
    });
  }
}
exports.default = Package;
Package.packageName = 'linter-ui-default';
Package.config = `${_base.PLUGIN_NAME}.packages.linter`;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiZ2V0UGFja2FnZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJ1bmRlZmluZWQiLCJwYWNrYWdlcyIsImdldEFjdGl2ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInNhdmUiLCJjb25zb2xlIiwibG9nIiwicGtnIiwibG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiUExVR0lOX05BTUUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBOzs7QUFHZSxNQUFNQSxPQUFOLENBQWM7O0FBSTNCOzs7OztBQUtBQyxlQUFjO0FBQ1osV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSixRQUFRRyxNQUF4QixJQUNIRSxTQURHLEdBRUhILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBRko7QUFHRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ05DLFlBQVFDLEdBQVIsQ0FBYSxRQUFPWCxRQUFRUSxXQUFZLEVBQXhDO0FBQ0EsVUFBTUksTUFBTSxLQUFLWCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDVyxHQUFMLEVBQVU7QUFDUjtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTixXQUFPLElBQUlDLE9BQUosQ0FBWSxNQUFNQyxPQUFOLElBQWlCO0FBQ2xDTCxjQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFlBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBYztBQUNELEtBTE0sQ0FBUDtBQU1EO0FBeEMwQjtrQkFBUmYsTztBQUFBQSxPLENBQ1pRLFcsR0FBYyxtQjtBQURGUixPLENBRVpHLE0sR0FBVSxHQUFFYSxpQkFBWSxrQiIsImZpbGUiOiJsaW50ZXItdWktZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlIHtcbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2xpbnRlci11aS1kZWZhdWx0JztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5saW50ZXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZylcbiAgICAgID8gdW5kZWZpbmVkXG4gICAgICA6IGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgY29uc29sZS5sb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=