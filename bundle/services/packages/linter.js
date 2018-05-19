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

    // pkg.mainModule.subscriptions.dispose();

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
}, _class.packageName = 'linter', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXIuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwicGtnIiwibG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiUExVR0lOX05BTUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ04sMEJBQVEsUUFBT1QsUUFBUVEsV0FBWSxFQUFuQztBQUNBLFVBQU1FLE1BQU0sS0FBS1QsVUFBTCxFQUFaOztBQUVBLFFBQUksQ0FBQ1MsR0FBTCxFQUFVO0FBQ1I7QUFDRDs7QUFFRDs7QUFFQTtBQUNEOztBQUVEOzs7OztBQUtBQyxTQUFRO0FBQUE7O0FBQ04sV0FBTyxJQUFJQyxPQUFKO0FBQUEsbUNBQVksV0FBTUMsT0FBTixFQUFpQjtBQUNsQyw4QkFBUSxRQUFPYixRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsY0FBTUUsTUFBTSxNQUFLVCxVQUFMLEVBQVo7O0FBRUE7QUFDQTtBQUNBOztBQUVBWTtBQUNELE9BVE07O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDtBQVVEO0FBaERXLEMsU0FFTEwsVyxHQUFjLFEsU0FDZEwsTSxHQUFVLEdBQUVXLGlCQUFZLGtCO2tCQWdEbEJkLE8iLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2xpbnRlcic7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMubGludGVyYDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcGtnLm1haW5Nb2R1bGUuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG5cbiAgICAvLyBwa2cuZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZCAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgZGV2bG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICAvLyBpZiAocGtnKSB7XG4gICAgICAvLyAgIGF3YWl0IHBrZy5hY3RpdmF0ZSgpO1xuICAgICAgLy8gfVxuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==