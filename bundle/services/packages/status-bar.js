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
   * @param {Object} state - description
   * @returns {Promise} description
   */
  reload() {
    return new Promise(resolve => {
      (0, _devlog2.default)(`reload ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg) {
        return resolve();
      }

      pkg.mainModule.fileInfo.update();
      pkg.mainModule.gitInfo.update();

      resolve();
    });
  }
}, _class.packageName = 'status-bar', _class.config = `${_base.PLUGIN_NAME}.packages.statusBar`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9zdGF0dXMtYmFyLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0QWN0aXZlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwicmVsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJwa2ciLCJtYWluTW9kdWxlIiwiZmlsZUluZm8iLCJ1cGRhdGUiLCJnaXRJbmZvIiwiUExVR0lOX05BTUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7OztBQU1BQyxXQUFVO0FBQ1IsV0FBTyxJQUFJQyxPQUFKLENBQVlDLFdBQVc7QUFDNUIsNEJBQVEsVUFBU1gsUUFBUVEsV0FBWSxFQUFyQztBQUNBLFlBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ1csR0FBTCxFQUFVO0FBQ1IsZUFBT0QsU0FBUDtBQUNEOztBQUVEQyxVQUFJQyxVQUFKLENBQWVDLFFBQWYsQ0FBd0JDLE1BQXhCO0FBQ0FILFVBQUlDLFVBQUosQ0FBZUcsT0FBZixDQUF1QkQsTUFBdkI7O0FBRUFKO0FBQ0QsS0FaTSxDQUFQO0FBYUQ7QUFuQ1csQyxTQUVMSCxXLEdBQWMsWSxTQUNkTCxNLEdBQVUsR0FBRWMsaUJBQVkscUI7a0JBbUNsQmpCLE8iLCJmaWxlIjoic3RhdHVzLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdzdGF0dXMtYmFyJztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5zdGF0dXNCYXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkZXZsb2coYHJlbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgaWYgKCFwa2cpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH1cblxuICAgICAgcGtnLm1haW5Nb2R1bGUuZmlsZUluZm8udXBkYXRlKCk7XG4gICAgICBwa2cubWFpbk1vZHVsZS5naXRJbmZvLnVwZGF0ZSgpO1xuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==