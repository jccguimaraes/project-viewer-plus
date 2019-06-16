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
    return atom.config.get(Package.config) ? undefined : atom.packages.getLoadedPackage(Package.packageName);
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

    return pkg.serialize();
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

      if (!pkg || !pkg.mainActivated || !state) {
        return resolve();
      }

      resolve();
    });
  }
}
exports.default = Package;
Package.packageName = 'find-and-replace';
Package.config = `${_base.PLUGIN_NAME}.packages.findAndReplace`;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0TG9hZGVkUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsImNvbnNvbGUiLCJsb2ciLCJwa2ciLCJzZXJpYWxpemUiLCJsb2FkIiwic3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1haW5BY3RpdmF0ZWQiLCJQTFVHSU5fTkFNRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7OztBQUdlLE1BQU1BLE9BQU4sQ0FBYzs7QUFJM0I7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQ0hFLFNBREcsR0FFSEgsS0FBS0ksUUFBTCxDQUFjQyxnQkFBZCxDQUErQlAsUUFBUVEsV0FBdkMsQ0FGSjtBQUdEOztBQUVEOzs7OztBQUtBQyxTQUFRO0FBQ05DLFlBQVFDLEdBQVIsQ0FBYSxRQUFPWCxRQUFRUSxXQUFZLEVBQXhDO0FBQ0EsVUFBTUksTUFBTSxLQUFLWCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDVyxHQUFMLEVBQVU7QUFDUixhQUFPLEVBQVA7QUFDRDs7QUFFRCxXQUFPQSxJQUFJQyxTQUFKLEVBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUFDLE9BQU1DLEtBQU4sRUFBYTtBQUNYLFdBQU8sSUFBSUMsT0FBSixDQUFZQyxXQUFXO0FBQzVCUCxjQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFlBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ1csR0FBRCxJQUFRLENBQUNBLElBQUlNLGFBQWIsSUFBOEIsQ0FBQ0gsS0FBbkMsRUFBMEM7QUFDeEMsZUFBT0UsU0FBUDtBQUNEOztBQUVEQTtBQUNELEtBVE0sQ0FBUDtBQVVEO0FBaEQwQjtrQkFBUmpCLE87QUFBQUEsTyxDQUNaUSxXLEdBQWMsa0I7QUFERlIsTyxDQUVaRyxNLEdBQVUsR0FBRWdCLGlCQUFZLDBCIiwiZmlsZSI6ImZpbmQtYW5kLXJlcGxhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZSB7XG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdmaW5kLWFuZC1yZXBsYWNlJztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5maW5kQW5kUmVwbGFjZWA7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKVxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBjb25zb2xlLmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiBwa2cuc2VyaWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkIChzdGF0ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZyB8fCAhcGtnLm1haW5BY3RpdmF0ZWQgfHwgIXN0YXRlKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19