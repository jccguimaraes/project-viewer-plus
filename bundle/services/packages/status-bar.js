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
   * @returns {Object} description
   */
  save() {
    (0, _devlog2.default)(`save ${Package.packageName}`);
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
  load() {
    return new Promise(resolve => {
      (0, _devlog2.default)(`load ${Package.packageName}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9zdGF0dXMtYmFyLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0QWN0aXZlUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsInBrZyIsImxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsIm1haW5Nb2R1bGUiLCJmaWxlSW5mbyIsInVwZGF0ZSIsImdpdEluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTiwwQkFBUSxRQUFPVCxRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsVUFBTUUsTUFBTSxLQUFLVCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDUyxHQUFMLEVBQVU7QUFDUixhQUFPLEVBQVA7QUFDRDs7QUFFRCxXQUFPLEVBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUFDLFNBQVE7QUFDTixXQUFPLElBQUlDLE9BQUosQ0FBWUMsV0FBVztBQUM1Qiw0QkFBUSxRQUFPYixRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsWUFBTUUsTUFBTSxLQUFLVCxVQUFMLEVBQVo7O0FBRUEsVUFBSSxDQUFDUyxHQUFMLEVBQVU7QUFDUixlQUFPRyxTQUFQO0FBQ0Q7O0FBRURILFVBQUlJLFVBQUosQ0FBZUMsUUFBZixDQUF3QkMsTUFBeEI7QUFDQU4sVUFBSUksVUFBSixDQUFlRyxPQUFmLENBQXVCRCxNQUF2Qjs7QUFFQUg7QUFDRCxLQVpNLENBQVA7QUFhRDtBQW5EVyxDLFNBRUxMLFcsR0FBYyxZLFNBQ2RMLE0sR0FBVSxHQUFELGlCQUFlLHFCO2tCQW1EbEJILE8iLCJmaWxlIjoic3RhdHVzLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9kZXZsb2cnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUgfSBmcm9tICcuLy4uLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIFBhY2thZ2Uge1xuXG4gIHN0YXRpYyBwYWNrYWdlTmFtZSA9ICdzdGF0dXMtYmFyJztcbiAgc3RhdGljIGNvbmZpZyA9IGAke1BMVUdJTl9OQU1FfS5wYWNrYWdlcy5zdGF0dXNCYXJgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBkZXZsb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkICgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkZXZsb2coYGxvYWQgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG5cbiAgICAgIHBrZy5tYWluTW9kdWxlLmZpbGVJbmZvLnVwZGF0ZSgpO1xuICAgICAgcGtnLm1haW5Nb2R1bGUuZ2l0SW5mby51cGRhdGUoKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=