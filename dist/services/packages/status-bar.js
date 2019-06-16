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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9zdGF0dXMtYmFyLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0QWN0aXZlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwicmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb25zb2xlIiwibG9nIiwicGtnIiwibWFpbk1vZHVsZSIsImZpbGVJbmZvIiwidXBkYXRlIiwiZ2l0SW5mbyIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0FBR2UsTUFBTUEsT0FBTixDQUFjOztBQUkzQjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFDSEUsU0FERyxHQUVISCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQUZKO0FBR0Q7O0FBRUQ7Ozs7OztBQU1BQyxXQUFVO0FBQ1IsV0FBTyxJQUFJQyxPQUFKLENBQVlDLFdBQVc7QUFDNUJDLGNBQVFDLEdBQVIsQ0FBYSxVQUFTYixRQUFRUSxXQUFZLEVBQTFDO0FBQ0EsWUFBTU0sTUFBTSxLQUFLYixVQUFMLEVBQVo7O0FBRUEsVUFBSSxDQUFDYSxHQUFMLEVBQVU7QUFDUixlQUFPSCxTQUFQO0FBQ0Q7O0FBRURHLFVBQUlDLFVBQUosQ0FBZUMsUUFBZixDQUF3QkMsTUFBeEI7QUFDQUgsVUFBSUMsVUFBSixDQUFlRyxPQUFmLENBQXVCRCxNQUF2Qjs7QUFFQU47QUFDRCxLQVpNLENBQVA7QUFhRDtBQW5DMEI7a0JBQVJYLE87QUFBQUEsTyxDQUNaUSxXLEdBQWMsWTtBQURGUixPLENBRVpHLE0sR0FBVSxHQUFFZ0IsaUJBQVkscUIiLCJmaWxlIjoic3RhdHVzLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlIHtcbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ3N0YXR1cy1iYXInO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLnN0YXR1c0JhcmA7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKVxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgcmVsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZykge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICBwa2cubWFpbk1vZHVsZS5maWxlSW5mby51cGRhdGUoKTtcbiAgICAgIHBrZy5tYWluTW9kdWxlLmdpdEluZm8udXBkYXRlKCk7XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19