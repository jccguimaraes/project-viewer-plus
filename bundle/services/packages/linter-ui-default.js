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
}, _class.packageName = 'linter-ui-default', _class.config = `${_base.PLUGIN_NAME}.packages.linter`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdC5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlIiwiZ2V0UGFja2FnZSIsImF0b20iLCJjb25maWciLCJnZXQiLCJ1bmRlZmluZWQiLCJwYWNrYWdlcyIsImdldEFjdGl2ZVBhY2thZ2UiLCJwYWNrYWdlTmFtZSIsInNhdmUiLCJjb25zb2xlIiwibG9nIiwicGtnIiwiZGVhY3RpdmF0ZSIsImxvYWQiLCJhY3RpdmF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFFQTs7O0lBR01BLE8scUJBQU4sTUFBTUEsT0FBTixDQUFjOztBQUtaOzs7OztBQUtBQyxlQUFjO0FBQ1osV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSixRQUFRRyxNQUF4QixJQUFrQ0UsU0FBbEMsR0FDTEgsS0FBS0ksUUFBTCxDQUFjQyxnQkFBZCxDQUErQlAsUUFBUVEsV0FBdkMsQ0FERjtBQUVEOztBQUVEOzs7O0FBSUFDLFNBQVE7QUFDTkMsWUFBUUMsR0FBUixDQUFhLFFBQU9YLFFBQVFRLFdBQVksRUFBeEM7QUFDQSxVQUFNSSxNQUFNLEtBQUtYLFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNXLEdBQUwsRUFBVTtBQUNSO0FBQ0Q7O0FBRURBLFFBQUlDLFVBQUo7QUFDRDs7QUFFRDs7Ozs7QUFLQUMsU0FBUTtBQUNOSixZQUFRQyxHQUFSLENBQWEsUUFBT1gsUUFBUVEsV0FBWSxFQUF4QztBQUNBLFVBQU1JLE1BQU0sS0FBS1gsVUFBTCxFQUFaOztBQUVBLFdBQU9XLE1BQU1BLElBQUlHLFFBQUosRUFBTixHQUF1QkMsUUFBUUMsT0FBUixFQUE5QjtBQUNEO0FBeENXLEMsU0FFTFQsVyxHQUFjLG1CLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLGtCO2tCQXdDbEJILE8iLCJmaWxlIjoibGludGVyLXVpLWRlZmF1bHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2xpbnRlci11aS1kZWZhdWx0JztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5saW50ZXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBjb25zb2xlLmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHBrZy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkICgpIHtcbiAgICBjb25zb2xlLmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICByZXR1cm4gcGtnID8gcGtnLmFjdGl2YXRlKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWNrYWdlO1xuIl19