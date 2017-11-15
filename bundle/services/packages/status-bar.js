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
   * @returns {Object} description
   */
  save() {
    console.log(`save ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg) {
      return {};
    }

    return {};
  }

  /**
   * description
   *
   * @param {Object} state - description
   * @returns {Promise} description
   */
  load(state) {
    console.log(`load ${Package.packageName}`);
    const pkg = this.getPackage();

    if (!pkg || !state) {
      return Promise.resolve();
    }

    pkg.mainModule.fileInfo.update();
    return pkg.mainModule.gitInfo.update();
  }
}, _class.packageName = 'status-bar', _class.config = `${_base.PLUGIN_NAME}.packages.statusBar`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9zdGF0dXMtYmFyLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0QWN0aXZlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsImNvbnNvbGUiLCJsb2ciLCJwa2ciLCJsb2FkIiwic3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1haW5Nb2R1bGUiLCJmaWxlSW5mbyIsInVwZGF0ZSIsImdpdEluZm8iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTkMsWUFBUUMsR0FBUixDQUFhLFFBQU9YLFFBQVFRLFdBQVksRUFBeEM7QUFDQSxVQUFNSSxNQUFNLEtBQUtYLFVBQUwsRUFBWjs7QUFFQSxRQUFJLENBQUNXLEdBQUwsRUFBVTtBQUNSLGFBQU8sRUFBUDtBQUNEOztBQUVELFdBQU8sRUFBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQUMsT0FBTUMsS0FBTixFQUFhO0FBQ1hKLFlBQVFDLEdBQVIsQ0FBYSxRQUFPWCxRQUFRUSxXQUFZLEVBQXhDO0FBQ0EsVUFBTUksTUFBTSxLQUFLWCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDVyxHQUFELElBQVEsQ0FBQ0UsS0FBYixFQUFvQjtBQUNsQixhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFREosUUFBSUssVUFBSixDQUFlQyxRQUFmLENBQXdCQyxNQUF4QjtBQUNBLFdBQU9QLElBQUlLLFVBQUosQ0FBZUcsT0FBZixDQUF1QkQsTUFBdkIsRUFBUDtBQUNEO0FBL0NXLEMsU0FFTFgsVyxHQUFjLFksU0FDZEwsTSxHQUFVLEdBQUQsaUJBQWUscUI7a0JBK0NsQkgsTyIsImZpbGUiOiJzdGF0dXMtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdzdGF0dXMtYmFyJztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5zdGF0dXNCYXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBjb25zb2xlLmxvZyhgc2F2ZSAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICBpZiAoIXBrZykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgY29uc29sZS5sb2coYGxvYWQgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cgfHwgIXN0YXRlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgcGtnLm1haW5Nb2R1bGUuZmlsZUluZm8udXBkYXRlKCk7XG4gICAgcmV0dXJuIHBrZy5tYWluTW9kdWxlLmdpdEluZm8udXBkYXRlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFja2FnZTtcbiJdfQ==