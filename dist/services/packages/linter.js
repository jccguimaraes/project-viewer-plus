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
Package.packageName = 'linter';
Package.config = `${_base.PLUGIN_NAME}.packages.linter`;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXIuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsInBrZyIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0FBR2UsTUFBTUEsT0FBTixDQUFjOztBQUkzQjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFDSEUsU0FERyxHQUVISCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQUZKO0FBR0Q7O0FBRUQ7Ozs7QUFJQUMsU0FBUTtBQUNOQyxZQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFVBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFFBQUksQ0FBQ1csR0FBTCxFQUFVO0FBQ1I7QUFDRDtBQUNGOztBQUVEOzs7OztBQUtBQyxTQUFRO0FBQ04sV0FBTyxJQUFJQyxPQUFKLENBQVksTUFBTUMsT0FBTixJQUFpQjtBQUNsQ0wsY0FBUUMsR0FBUixDQUFhLFFBQU9YLFFBQVFRLFdBQVksRUFBeEM7QUFDQSxZQUFNSSxNQUFNLEtBQUtYLFVBQUwsRUFBWjs7QUFFQWM7QUFDRCxLQUxNLENBQVA7QUFNRDtBQXhDMEI7a0JBQVJmLE87QUFBQUEsTyxDQUNaUSxXLEdBQWMsUTtBQURGUixPLENBRVpHLE0sR0FBVSxHQUFFYSxpQkFBWSxrQiIsImZpbGUiOiJsaW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZSB7XG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdsaW50ZXInO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLmxpbnRlcmA7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKVxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBjb25zb2xlLmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==