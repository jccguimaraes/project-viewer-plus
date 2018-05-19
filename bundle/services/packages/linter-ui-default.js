'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _devlog = require('./../devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _base = require('./../../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
   */
  save() {
    (0, _devlog2.default)(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return;
    }

    // pkg.mainModule.instances.clear();
    // pkg.deactivate();
  }

  /**
   * description
   *
   * @returns {Promise} description
   */
  load() {
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve) {
        (0, _devlog2.default)(`load ${Package.packageName}`);
        const pkg = _this.getPackage();

        // if (pkg) {
        //   await pkg.activate();
        // }

        resolve();
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
  }
}, _class.packageName = 'linter-ui-default', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiZ2V0UGFja2FnZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJ1bmRlZmluZWQiLCJwYWNrYWdlcyIsImdldEFjdGl2ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInNhdmUiLCJwa2ciLCJsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJQTFVHSU5fTkFNRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0lBR01BLE8scUJBQU4sTUFBTUEsT0FBTixDQUFjOztBQUtaOzs7OztBQUtBQyxlQUFjO0FBQ1osV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSixRQUFRRyxNQUF4QixJQUFrQ0UsU0FBbEMsR0FDTEgsS0FBS0ksUUFBTCxDQUFjQyxnQkFBZCxDQUErQlAsUUFBUVEsV0FBdkMsQ0FERjtBQUVEOztBQUVEOzs7O0FBSUFDLFNBQVE7QUFDTiwwQkFBUSxRQUFPVCxRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsVUFBTUUsTUFBTSxLQUFLVCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDUyxHQUFMLEVBQVU7QUFDUjtBQUNEOztBQUVEO0FBQ0E7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUFBOztBQUNOLFdBQU8sSUFBSUMsT0FBSjtBQUFBLG1DQUFZLFdBQU1DLE9BQU4sRUFBaUI7QUFDbEMsOEJBQVEsUUFBT2IsUUFBUVEsV0FBWSxFQUFuQztBQUNBLGNBQU1FLE1BQU0sTUFBS1QsVUFBTCxFQUFaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQVk7QUFDRCxPQVRNOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7QUFVRDtBQS9DVyxDLFNBRUxMLFcsR0FBYyxtQixTQUNkTCxNLEdBQVUsR0FBRVcsaUJBQVksa0I7a0JBK0NsQmQsTyIsImZpbGUiOiJsaW50ZXItdWktZGVmYXVsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdsaW50ZXItdWktZGVmYXVsdCc7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMubGludGVyYDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcGtnLm1haW5Nb2R1bGUuaW5zdGFuY2VzLmNsZWFyKCk7XG4gICAgLy8gcGtnLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGRldmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgLy8gaWYgKHBrZykge1xuICAgICAgLy8gICBhd2FpdCBwa2cuYWN0aXZhdGUoKTtcbiAgICAgIC8vIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=