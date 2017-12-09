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
}, _class.packageName = 'linter-ui-default', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiZ2V0UGFja2FnZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJ1bmRlZmluZWQiLCJwYWNrYWdlcyIsImdldEFjdGl2ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInNhdmUiLCJwa2ciLCJkZWFjdGl2YXRlIiwibG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiYWN0aXZhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7QUFJQUMsU0FBUTtBQUNOLDBCQUFRLFFBQU9ULFFBQVFRLFdBQVksRUFBbkM7QUFDQSxVQUFNRSxNQUFNLEtBQUtULFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNTLEdBQUwsRUFBVTtBQUNSO0FBQ0Q7O0FBRURBLFFBQUlDLFVBQUo7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUFBOztBQUNOLFdBQU8sSUFBSUMsT0FBSjtBQUFBLG1DQUFZLFdBQU1DLE9BQU4sRUFBaUI7QUFDbEMsOEJBQVEsUUFBT2QsUUFBUVEsV0FBWSxFQUFuQztBQUNBLGNBQU1FLE1BQU0sTUFBS1QsVUFBTCxFQUFaOztBQUVBLFlBQUlTLEdBQUosRUFBUztBQUNQLGdCQUFNQSxJQUFJSyxRQUFKLEVBQU47QUFDRDs7QUFFREQ7QUFDRCxPQVRNOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVA7QUFVRDtBQTlDVyxDLFNBRUxOLFcsR0FBYyxtQixTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSxrQjtrQkE4Q2xCSCxPIiwiZmlsZSI6ImxpbnRlci11aS1kZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2xpbnRlci11aS1kZWZhdWx0JztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5saW50ZXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBkZXZsb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwa2cuZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZCAoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgZGV2bG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgICBpZiAocGtnKSB7XG4gICAgICAgIGF3YWl0IHBrZy5hY3RpdmF0ZSgpO1xuICAgICAgfVxuXG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==