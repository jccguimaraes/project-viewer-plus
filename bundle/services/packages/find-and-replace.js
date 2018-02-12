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
    return atom.config.get(Package.config) ? undefined : atom.packages.getLoadedPackage(Package.packageName);
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

      (0, _devlog2.default)(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg || !pkg.mainActivated || !state) {
        return resolve();
      }

      resolve();
    });
  }
}, _class.packageName = 'find-and-replace', _class.config = `${_base.PLUGIN_NAME}.packages.findAndReplace`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0TG9hZGVkUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsInBrZyIsInNlcmlhbGl6ZSIsImxvYWQiLCJzdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwibWFpbkFjdGl2YXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOLDBCQUFRLFFBQU9ULFFBQVFRLFdBQVksRUFBbkM7QUFDQSxVQUFNRSxNQUFNLEtBQUtULFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNTLEdBQUwsRUFBVTtBQUNSLGFBQU8sRUFBUDtBQUNEOztBQUVELFdBQU9BLElBQUlDLFNBQUosRUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQUMsT0FBTUMsS0FBTixFQUFhO0FBQ1gsV0FBTyxJQUFJQyxPQUFKLENBQVlDLFdBQVc7O0FBRTVCLDRCQUFRLFFBQU9mLFFBQVFRLFdBQVksRUFBbkM7QUFDQSxZQUFNRSxNQUFNLEtBQUtULFVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUNTLEdBQUQsSUFBUSxDQUFDQSxJQUFJTSxhQUFiLElBQThCLENBQUNILEtBQW5DLEVBQTBDO0FBQ3hDLGVBQU9FLFNBQVA7QUFDRDs7QUFFREE7QUFDRCxLQVZNLENBQVA7QUFXRDtBQWpEVyxDLFNBRUxQLFcsR0FBYyxrQixTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSwwQjtrQkFpRGxCSCxPIiwiZmlsZSI6ImZpbmQtYW5kLXJlcGxhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGV2bG9nIGZyb20gJy4vLi4vZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5jbGFzcyBQYWNrYWdlIHtcblxuICBzdGF0aWMgcGFja2FnZU5hbWUgPSAnZmluZC1hbmQtcmVwbGFjZSc7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMuZmluZEFuZFJlcGxhY2VgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBkZXZsb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGtnLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZCAoc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgIGRldmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgaWYgKCFwa2cgfHwgIXBrZy5tYWluQWN0aXZhdGVkIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==