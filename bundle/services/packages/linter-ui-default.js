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
}, _class.packageName = 'linter-ui-default', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiZ2V0UGFja2FnZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJ1bmRlZmluZWQiLCJwYWNrYWdlcyIsImdldEFjdGl2ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInNhdmUiLCJwa2ciLCJkZWFjdGl2YXRlIiwibG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiYWN0aXZhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ04sMEJBQVEsUUFBT1QsUUFBUVEsV0FBWSxFQUFuQztBQUNBLFVBQU1FLE1BQU0sS0FBS1QsVUFBTCxFQUFaOztBQUVBLFFBQUksQ0FBQ1MsR0FBTCxFQUFVO0FBQ1I7QUFDRDs7QUFFREEsUUFBSUMsVUFBSjtBQUNEOztBQUVEOzs7OztBQUtBQyxTQUFRO0FBQUE7O0FBQ04sV0FBTyxJQUFJQyxPQUFKO0FBQUEsbUNBQVksV0FBTUMsT0FBTixFQUFpQjtBQUNsQyw4QkFBUSxRQUFPZCxRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsY0FBTUUsTUFBTSxNQUFLVCxVQUFMLEVBQVo7O0FBRUEsWUFBSVMsR0FBSixFQUFTO0FBQ1AsZ0JBQU1BLElBQUlLLFFBQUosRUFBTjtBQUNEOztBQUVERDtBQUNELE9BVE07O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUDtBQVVEO0FBOUNXLEMsU0FFTE4sVyxHQUFjLG1CLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLGtCO2tCQThDbEJILE8iLCJmaWxlIjoibGludGVyLXVpLWRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGV2bG9nIGZyb20gJy4vLi4vZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5jbGFzcyBQYWNrYWdlIHtcblxuICBzdGF0aWMgcGFja2FnZU5hbWUgPSAnbGludGVyLXVpLWRlZmF1bHQnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLmxpbnRlcmA7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKSA/IHVuZGVmaW5lZCA6XG4gICAgICBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoUGFja2FnZS5wYWNrYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICovXG4gIHNhdmUgKCkge1xuICAgIGRldmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBrZy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBkZXZsb2coYGxvYWQgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmIChwa2cpIHtcbiAgICAgICAgYXdhaXQgcGtnLmFjdGl2YXRlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWNrYWdlO1xuIl19