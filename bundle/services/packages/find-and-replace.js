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

      // pkg.mainModule.findHistory.items = state.findHistory;
      // pkg.mainModule.findHistory.length = state.findHistory.length;

      // pkg.mainModule.findOptions
      //   .caseSensitive = state.findOptions.caseSensitive;
      // pkg.mainModule.findOptions
      //   .findPattern = state.findOptions.findPattern;
      // pkg.mainModule.findOptions
      //   .inCurrentSelection = state.findOptions.inCurrentSelection;
      // pkg.mainModule.findOptions
      //   .leadingContextLineCount = state.findOptions.leadingContextLineCount;
      // pkg.mainModule.findOptions
      //   .pathsPattern = state.findOptions.pathsPattern;
      // pkg.mainModule.findOptions
      //   .replacePattern = state.findOptions.replacePattern;
      // pkg.mainModule.findOptions
      //   .trailingContextLineCount = state.findOptions.trailingContextLineCount;
      // pkg.mainModule.findOptions
      //   .useRegex = state.findOptions.useRegex;
      // pkg.mainModule.findOptions
      //   .wholeWord = state.findOptions.wholeWord;

      // pkg.mainModule.pathsHistory.items = state.pathsHistory;
      // pkg.mainModule.pathsHistory.length = state.pathsHistory.length;
      //
      // pkg.mainModule.replaceHistory.items = state.replaceHistory;
      // pkg.mainModule.replaceHistory.length = state.replaceHistory.length;

      // pkg.mainModule.findModel.setFindOptions(state.findOptions);
      // pkg.mainModule.resultsModel.clear();

      // pkg.mainModule.resultsModel.shoudldRerunSearch(null, null, null, {
      //   onlyRunIfChanged: true
      // });
      // pkg.mainModule.findModel.recreateMarkers();
      resolve();
    });
  }
}, _class.packageName = 'find-and-replace', _class.config = `${_base.PLUGIN_NAME}.packages.findAndReplace`, _temp);
exports.default = Package;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlLmpzIl0sIm5hbWVzIjpbIlBhY2thZ2UiLCJnZXRQYWNrYWdlIiwiYXRvbSIsImNvbmZpZyIsImdldCIsInVuZGVmaW5lZCIsInBhY2thZ2VzIiwiZ2V0TG9hZGVkUGFja2FnZSIsInBhY2thZ2VOYW1lIiwic2F2ZSIsInBrZyIsInNlcmlhbGl6ZSIsImxvYWQiLCJzdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwibWFpbkFjdGl2YXRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7SUFHTUEsTyxxQkFBTixNQUFNQSxPQUFOLENBQWM7O0FBS1o7Ozs7O0FBS0FDLGVBQWM7QUFDWixXQUFPQyxLQUFLQyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JKLFFBQVFHLE1BQXhCLElBQWtDRSxTQUFsQyxHQUNMSCxLQUFLSSxRQUFMLENBQWNDLGdCQUFkLENBQStCUCxRQUFRUSxXQUF2QyxDQURGO0FBRUQ7O0FBRUQ7Ozs7O0FBS0FDLFNBQVE7QUFDTiwwQkFBUSxRQUFPVCxRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsVUFBTUUsTUFBTSxLQUFLVCxVQUFMLEVBQVo7O0FBRUEsUUFBSSxDQUFDUyxHQUFMLEVBQVU7QUFDUixhQUFPLEVBQVA7QUFDRDs7QUFFRCxXQUFPQSxJQUFJQyxTQUFKLEVBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUFDLE9BQU1DLEtBQU4sRUFBYTtBQUNYLFdBQU8sSUFBSUMsT0FBSixDQUFZQyxXQUFXOztBQUU1Qiw0QkFBUSxRQUFPZixRQUFRUSxXQUFZLEVBQW5DO0FBQ0EsWUFBTUUsTUFBTSxLQUFLVCxVQUFMLEVBQVo7O0FBRUEsVUFBSSxDQUFDUyxHQUFELElBQVEsQ0FBQ0EsSUFBSU0sYUFBYixJQUE4QixDQUFDSCxLQUFuQyxFQUEwQztBQUN4QyxlQUFPRSxTQUFQO0FBQ0Q7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBO0FBQ0QsS0E3Q00sQ0FBUDtBQThDRDtBQXBGVyxDLFNBRUxQLFcsR0FBYyxrQixTQUNkTCxNLEdBQVUsR0FBRCxpQkFBZSwwQjtrQkFvRmxCSCxPIiwiZmlsZSI6ImZpbmQtYW5kLXJlcGxhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGV2bG9nIGZyb20gJy4vLi4vZGV2bG9nJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FIH0gZnJvbSAnLi8uLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5jbGFzcyBQYWNrYWdlIHtcblxuICBzdGF0aWMgcGFja2FnZU5hbWUgPSAnZmluZC1hbmQtcmVwbGFjZSc7XG4gIHN0YXRpYyBjb25maWcgPSBgJHtQTFVHSU5fTkFNRX0ucGFja2FnZXMuZmluZEFuZFJlcGxhY2VgO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0UGFja2FnZSAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChQYWNrYWdlLmNvbmZpZykgPyB1bmRlZmluZWQgOlxuICAgICAgYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKFBhY2thZ2UucGFja2FnZU5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlICgpIHtcbiAgICBkZXZsb2coYHNhdmUgJHtQYWNrYWdlLnBhY2thZ2VOYW1lfWApO1xuICAgIGNvbnN0IHBrZyA9IHRoaXMuZ2V0UGFja2FnZSgpO1xuXG4gICAgaWYgKCFwa2cpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGtnLnNlcmlhbGl6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZCAoc3RhdGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgIGRldmxvZyhgbG9hZCAke1BhY2thZ2UucGFja2FnZU5hbWV9YCk7XG4gICAgICBjb25zdCBwa2cgPSB0aGlzLmdldFBhY2thZ2UoKTtcblxuICAgICAgaWYgKCFwa2cgfHwgIXBrZy5tYWluQWN0aXZhdGVkIHx8ICFzdGF0ZSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kSGlzdG9yeS5pdGVtcyA9IHN0YXRlLmZpbmRIaXN0b3J5O1xuICAgICAgLy8gcGtnLm1haW5Nb2R1bGUuZmluZEhpc3RvcnkubGVuZ3RoID0gc3RhdGUuZmluZEhpc3RvcnkubGVuZ3RoO1xuXG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kT3B0aW9uc1xuICAgICAgLy8gICAuY2FzZVNlbnNpdGl2ZSA9IHN0YXRlLmZpbmRPcHRpb25zLmNhc2VTZW5zaXRpdmU7XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kT3B0aW9uc1xuICAgICAgLy8gICAuZmluZFBhdHRlcm4gPSBzdGF0ZS5maW5kT3B0aW9ucy5maW5kUGF0dGVybjtcbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLmZpbmRPcHRpb25zXG4gICAgICAvLyAgIC5pbkN1cnJlbnRTZWxlY3Rpb24gPSBzdGF0ZS5maW5kT3B0aW9ucy5pbkN1cnJlbnRTZWxlY3Rpb247XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kT3B0aW9uc1xuICAgICAgLy8gICAubGVhZGluZ0NvbnRleHRMaW5lQ291bnQgPSBzdGF0ZS5maW5kT3B0aW9ucy5sZWFkaW5nQ29udGV4dExpbmVDb3VudDtcbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLmZpbmRPcHRpb25zXG4gICAgICAvLyAgIC5wYXRoc1BhdHRlcm4gPSBzdGF0ZS5maW5kT3B0aW9ucy5wYXRoc1BhdHRlcm47XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kT3B0aW9uc1xuICAgICAgLy8gICAucmVwbGFjZVBhdHRlcm4gPSBzdGF0ZS5maW5kT3B0aW9ucy5yZXBsYWNlUGF0dGVybjtcbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLmZpbmRPcHRpb25zXG4gICAgICAvLyAgIC50cmFpbGluZ0NvbnRleHRMaW5lQ291bnQgPSBzdGF0ZS5maW5kT3B0aW9ucy50cmFpbGluZ0NvbnRleHRMaW5lQ291bnQ7XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5maW5kT3B0aW9uc1xuICAgICAgLy8gICAudXNlUmVnZXggPSBzdGF0ZS5maW5kT3B0aW9ucy51c2VSZWdleDtcbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLmZpbmRPcHRpb25zXG4gICAgICAvLyAgIC53aG9sZVdvcmQgPSBzdGF0ZS5maW5kT3B0aW9ucy53aG9sZVdvcmQ7XG5cbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLnBhdGhzSGlzdG9yeS5pdGVtcyA9IHN0YXRlLnBhdGhzSGlzdG9yeTtcbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLnBhdGhzSGlzdG9yeS5sZW5ndGggPSBzdGF0ZS5wYXRoc0hpc3RvcnkubGVuZ3RoO1xuICAgICAgLy9cbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLnJlcGxhY2VIaXN0b3J5Lml0ZW1zID0gc3RhdGUucmVwbGFjZUhpc3Rvcnk7XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5yZXBsYWNlSGlzdG9yeS5sZW5ndGggPSBzdGF0ZS5yZXBsYWNlSGlzdG9yeS5sZW5ndGg7XG5cbiAgICAgIC8vIHBrZy5tYWluTW9kdWxlLmZpbmRNb2RlbC5zZXRGaW5kT3B0aW9ucyhzdGF0ZS5maW5kT3B0aW9ucyk7XG4gICAgICAvLyBwa2cubWFpbk1vZHVsZS5yZXN1bHRzTW9kZWwuY2xlYXIoKTtcblxuICAgICAgLy8gcGtnLm1haW5Nb2R1bGUucmVzdWx0c01vZGVsLnNob3VkbGRSZXJ1blNlYXJjaChudWxsLCBudWxsLCBudWxsLCB7XG4gICAgICAvLyAgIG9ubHlSdW5JZkNoYW5nZWQ6IHRydWVcbiAgICAgIC8vIH0pO1xuICAgICAgLy8gcGtnLm1haW5Nb2R1bGUuZmluZE1vZGVsLnJlY3JlYXRlTWFya2VycygpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhY2thZ2U7XG4iXX0=