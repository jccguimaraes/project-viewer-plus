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

    pkg.deactivate();
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

        if (pkg) {
          yield pkg.activate();
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXIuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwicGtnIiwiZGVhY3RpdmF0ZSIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImFjdGl2YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7QUFJQUMsU0FBUTtBQUNOLDBCQUFRLFFBQU9ULFFBQVFRLFdBQVksRUFBbkM7QUFDQSxVQUFNRSxNQUFNLEtBQUtULFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNTLEdBQUwsRUFBVTtBQUNSO0FBQ0Q7O0FBRURBLFFBQUlDLFVBQUo7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUFBOztBQUNOLFdBQU8sSUFBSUMsT0FBSjtBQUFBLG1DQUFZLFdBQU1DLE9BQU4sRUFBaUI7QUFDbEMsOEJBQVEsUUFBT2QsUUFBUVEsV0FBWSxFQUFuQztBQUNBLGNBQU1FLE1BQU0sTUFBS1QsVUFBTCxFQUFaOztBQUVBLFlBQUlTLEdBQUosRUFBUztBQUNQLGdCQUFNQSxJQUFJSyxRQUFKLEVBQU47QUFDRDs7QUFFREQ7QUFDRCxPQVRNOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7QUFVRDtBQTlDVyxDLFNBRUxOLFcsR0FBYyxRLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLGtCO2tCQThDbEJILE8iLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2xpbnRlcic7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMubGludGVyYDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0QWN0aXZlUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGtnLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGRldmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgaWYgKHBrZykge1xuICAgICAgICBhd2FpdCBwa2cuYWN0aXZhdGUoKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=