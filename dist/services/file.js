'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = undefined;

var _atom = require('atom');

/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */
const readFile = exports.readFile = async filePath => {
  const file = new _atom.File(filePath);
  const exists = await file.exists();

  if (!exists) {
    throw Error();
  }

  const content = await file.read(true);

  if (!content) {
    throw Error();
  }

  try {
    return JSON.parse(content);
  } catch (err) {
    return { groups: [], projects: [] };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLmpzIl0sIm5hbWVzIjpbInJlYWRGaWxlIiwiZmlsZVBhdGgiLCJmaWxlIiwiRmlsZSIsImV4aXN0cyIsIkVycm9yIiwiY29udGVudCIsInJlYWQiLCJKU09OIiwicGFyc2UiLCJlcnIiLCJncm91cHMiLCJwcm9qZWN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7OztBQUtPLE1BQU1BLDhCQUFXLE1BQU1DLFFBQU4sSUFBa0I7QUFDeEMsUUFBTUMsT0FBTyxJQUFJQyxVQUFKLENBQVNGLFFBQVQsQ0FBYjtBQUNBLFFBQU1HLFNBQVMsTUFBTUYsS0FBS0UsTUFBTCxFQUFyQjs7QUFFQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFVBQU1DLE9BQU47QUFDRDs7QUFFRCxRQUFNQyxVQUFVLE1BQU1KLEtBQUtLLElBQUwsQ0FBVSxJQUFWLENBQXRCOztBQUVBLE1BQUksQ0FBQ0QsT0FBTCxFQUFjO0FBQ1osVUFBTUQsT0FBTjtBQUNEOztBQUVELE1BQUk7QUFDRixXQUFPRyxLQUFLQyxLQUFMLENBQVdILE9BQVgsQ0FBUDtBQUNELEdBRkQsQ0FHQSxPQUFPSSxHQUFQLEVBQVk7QUFDVixXQUFPLEVBQUVDLFFBQVEsRUFBVixFQUFjQyxVQUFVLEVBQXhCLEVBQVA7QUFDRDtBQUNGLENBcEJNIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlIH0gZnJvbSAnYXRvbSc7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHJlYWQgYSBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkRmlsZVxuICogQHJldHVybnMge09iamVjdHxFcnJvcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gYXN5bmMgZmlsZVBhdGggPT4ge1xuICBjb25zdCBmaWxlID0gbmV3IEZpbGUoZmlsZVBhdGgpO1xuICBjb25zdCBleGlzdHMgPSBhd2FpdCBmaWxlLmV4aXN0cygpO1xuXG4gIGlmICghZXhpc3RzKSB7XG4gICAgdGhyb3cgRXJyb3IoKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmaWxlLnJlYWQodHJ1ZSk7XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgdGhyb3cgRXJyb3IoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG4gIH1cbiAgY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICB9XG59O1xuIl19