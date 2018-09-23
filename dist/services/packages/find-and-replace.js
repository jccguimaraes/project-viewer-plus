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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0TG9hZGVkUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsImNvbnNvbGUiLCJsb2ciLCJwa2ciLCJzZXJpYWxpemUiLCJsb2FkIiwic3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1haW5BY3RpdmF0ZWQiLCJQTFVHSU5fTkFNRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7OztBQUdlLE1BQU1BLE9BQU4sQ0FBYzs7QUFLM0I7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTkMsWUFBUUMsR0FBUixDQUFhLFFBQU9YLFFBQVFRLFdBQVksRUFBeEM7QUFDQSxVQUFNSSxNQUFNLEtBQUtYLFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNXLEdBQUwsRUFBVTtBQUNSLGFBQU8sRUFBUDtBQUNEOztBQUVELFdBQU9BLElBQUlDLFNBQUosRUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQUMsT0FBTUMsS0FBTixFQUFhO0FBQ1gsV0FBTyxJQUFJQyxPQUFKLENBQVlDLFdBQVc7O0FBRTVCUCxjQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFlBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ1csR0FBRCxJQUFRLENBQUNBLElBQUlNLGFBQWIsSUFBOEIsQ0FBQ0gsS0FBbkMsRUFBMEM7QUFDeEMsZUFBT0UsU0FBUDtBQUNEOztBQUVEQTtBQUNELEtBVk0sQ0FBUDtBQVdEO0FBakQwQjtrQkFBUmpCLE87QUFBQUEsTyxDQUVaUSxXLEdBQWMsa0I7QUFGRlIsTyxDQUdaRyxNLEdBQVUsR0FBRWdCLGlCQUFZLDBCIiwiZmlsZSI6ImZpbmQtYW5kLXJlcGxhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2ZpbmQtYW5kLXJlcGxhY2UnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlYDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgY29uc29sZS5sb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGtnLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZCAoc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAoIXBrZyB8fCAhcGtnLm1haW5BY3RpdmF0ZWQgfHwgIXN0YXRlKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19