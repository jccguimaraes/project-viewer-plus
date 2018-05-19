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
    return atom.config.get(Package.config) ? undefined : atom.packages.getLoadedPackage(Package.packageName);
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

    return pkg.serialize();
  }

  /**
   * description
   *
   * @param {Object} state - description
   * @returns {Promise} description
   */
  load(state) {
    return new Promise(resolve => {

      (0, _devlog2.default)(`load ${Package.packageName}`);
      const pkg = this.getPackage();

      if (!pkg || !pkg.mainActivated || !state) {
        return resolve();
      }

      resolve();
    });
  }
}, _class.packageName = 'find-and-replace', _class.config = `${_base.PLUGIN_NAME}.packages.findAndReplace`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0TG9hZGVkUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsInBrZyIsInNlcmlhbGl6ZSIsImxvYWQiLCJzdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwibWFpbkFjdGl2YXRlZCIsIlBMVUdJTl9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7O0lBR01BLE8scUJBQU4sTUFBTUEsT0FBTixDQUFjOztBQUtaOzs7OztBQUtBQyxlQUFjO0FBQ1osV0FBT0MsS0FBS0MsTUFBTCxDQUFZQyxHQUFaLENBQWdCSixRQUFRRyxNQUF4QixJQUFrQ0UsU0FBbEMsR0FDTEgsS0FBS0ksUUFBTCxDQUFjQyxnQkFBZCxDQUErQlAsUUFBUVEsV0FBdkMsQ0FERjtBQUVEOztBQUVEOzs7OztBQUtBQyxTQUFRO0FBQ04sMEJBQVEsUUFBT1QsUUFBUVEsV0FBWSxFQUFuQztBQUNBLFVBQU1FLE1BQU0sS0FBS1QsVUFBTCxFQUFaOztBQUVBLFFBQUksQ0FBQ1MsR0FBTCxFQUFVO0FBQ1IsYUFBTyxFQUFQO0FBQ0Q7O0FBRUQsV0FBT0EsSUFBSUMsU0FBSixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BQyxPQUFNQyxLQUFOLEVBQWE7QUFDWCxXQUFPLElBQUlDLE9BQUosQ0FBWUMsV0FBVzs7QUFFNUIsNEJBQVEsUUFBT2YsUUFBUVEsV0FBWSxFQUFuQztBQUNBLFlBQU1FLE1BQU0sS0FBS1QsVUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ1MsR0FBRCxJQUFRLENBQUNBLElBQUlNLGFBQWIsSUFBOEIsQ0FBQ0gsS0FBbkMsRUFBMEM7QUFDeEMsZUFBT0UsU0FBUDtBQUNEOztBQUVEQTtBQUNELEtBVk0sQ0FBUDtBQVdEO0FBakRXLEMsU0FFTFAsVyxHQUFjLGtCLFNBQ2RMLE0sR0FBVSxHQUFFYyxpQkFBWSwwQjtrQkFpRGxCakIsTyIsImZpbGUiOiJmaW5kLWFuZC1yZXBsYWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL2RldmxvZyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSB9IGZyb20gJy4vLi4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgUGFja2FnZSB7XG5cbiAgc3RhdGljIHBhY2thZ2VOYW1lID0gJ2ZpbmQtYW5kLXJlcGxhY2UnO1xuICBzdGF0aWMgY29uZmlnID0gYCR7UExVR0lOX05BTUV9LnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlYDtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFBhY2thZ2UgKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoUGFja2FnZS5jb25maWcpID8gdW5kZWZpbmVkIDpcbiAgICAgIGF0b20ucGFja2FnZXMuZ2V0TG9hZGVkUGFja2FnZShQYWNrYWdlLnBhY2thZ2VOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZSAoKSB7XG4gICAgZGV2bG9nKGBzYXZlICR7UGFja2FnZS5wYWNrYWdlTmFtZX1gKTtcbiAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgIGlmICghcGtnKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHBrZy5zZXJpYWxpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWQgKHN0YXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXG4gICAgICBkZXZsb2coYGxvYWQgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgICAgY29uc3QgcGtnID0gdGhpcy5nZXRQYWNrYWdlKCk7XG5cbiAgICAgIGlmICghcGtnIHx8ICFwa2cubWFpbkFjdGl2YXRlZCB8fCAhc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=