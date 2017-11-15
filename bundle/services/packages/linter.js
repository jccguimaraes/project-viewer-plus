Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _base = require('./../../constants/base');

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
    console.log(`save ${Package.packageName}`);
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
    console.log(`load ${Package.packageName}`);
    const pkg = this.getPackage();

    return pkg ? pkg.activate() : Promise.resolve();
  }
}, _class.packageName = 'linter', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXIuanMiXSwibmFtZXMiOlsiUGFja2FnZSIsImdldFBhY2thZ2UiLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwidW5kZWZpbmVkIiwicGFja2FnZXMiLCJnZXRBY3RpdmVQYWNrYWdlIiwicGFja2FnZU5hbWUiLCJzYXZlIiwiY29uc29sZSIsImxvZyIsInBrZyIsImRlYWN0aXZhdGUiLCJsb2FkIiwiYWN0aXZhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBRUE7OztJQUdNQSxPLHFCQUFOLE1BQU1BLE9BQU4sQ0FBYzs7QUFLWjs7Ozs7QUFLQUMsZUFBYztBQUNaLFdBQU9DLEtBQUtDLE1BQUwsQ0FBWUMsR0FBWixDQUFnQkosUUFBUUcsTUFBeEIsSUFBa0NFLFNBQWxDLEdBQ0xILEtBQUtJLFFBQUwsQ0FBY0MsZ0JBQWQsQ0FBK0JQLFFBQVFRLFdBQXZDLENBREY7QUFFRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ05DLFlBQVFDLEdBQVIsQ0FBYSxRQUFPWCxRQUFRUSxXQUFZLEVBQXhDO0FBQ0EsVUFBTUksTUFBTSxLQUFLWCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDVyxHQUFMLEVBQVU7QUFDUjtBQUNEOztBQUVEQSxRQUFJQyxVQUFKO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTkosWUFBUUMsR0FBUixDQUFhLFFBQU9YLFFBQVFRLFdBQVksRUFBeEM7QUFDQSxVQUFNSSxNQUFNLEtBQUtYLFVBQUwsRUFBWjs7QUFFQSxXQUFPVyxNQUFNQSxJQUFJRyxRQUFKLEVBQU4sR0FBdUJDLFFBQVFDLE9BQVIsRUFBOUI7QUFDRDtBQXhDVyxDLFNBRUxULFcsR0FBYyxRLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLGtCO2tCQXdDbEJILE8iLCJmaWxlIjoibGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdsaW50ZXInO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLmxpbnRlcmA7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQYWNrYWdlICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KFBhY2thZ2UuY29uZmlnKSA/IHVuZGVmaW5lZCA6XG4gICAgICBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoUGFja2FnZS5wYWNrYWdlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICovXG4gIHNhdmUgKCkge1xuICAgIGNvbnNvbGUubG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcGtnLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKCkge1xuICAgIGNvbnNvbGUubG9nKGBsb2FkICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIHJldHVybiBwa2cgPyBwa2cuYWN0aXZhdGUoKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=