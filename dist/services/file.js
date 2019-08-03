'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.saveFile = undefined;

var _atom = require('atom');

const checkFile = async filePath => {
  const file = new _atom.File(filePath);
  const exists = await file.exists();

  if (!exists) {
    throw Error();
  }

  return file;
};

/**
 * Helper function to save a file
 * @param {string} filePath the full path of the file to saveFile
 * @param {string} content the current serialized state
 * @returns {Object|Error}
 */
const saveFile = exports.saveFile = async (filePath, content) => {
  const file = await checkFile(filePath);

  await file.write(content);
};

/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */
const readFile = exports.readFile = async filePath => {
  const file = await checkFile(filePath);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLmpzIl0sIm5hbWVzIjpbImNoZWNrRmlsZSIsImZpbGVQYXRoIiwiZmlsZSIsIkZpbGUiLCJleGlzdHMiLCJFcnJvciIsInNhdmVGaWxlIiwiY29udGVudCIsIndyaXRlIiwicmVhZEZpbGUiLCJyZWFkIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxZQUFZLE1BQU1DLFFBQU4sSUFBa0I7QUFDbEMsUUFBTUMsT0FBTyxJQUFJQyxVQUFKLENBQVNGLFFBQVQsQ0FBYjtBQUNBLFFBQU1HLFNBQVMsTUFBTUYsS0FBS0UsTUFBTCxFQUFyQjs7QUFFQSxNQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLFVBQU1DLE9BQU47QUFDRDs7QUFFRCxTQUFPSCxJQUFQO0FBQ0QsQ0FURDs7QUFXQTs7Ozs7O0FBTU8sTUFBTUksOEJBQVcsT0FBT0wsUUFBUCxFQUFpQk0sT0FBakIsS0FBNkI7QUFDbkQsUUFBTUwsT0FBTyxNQUFNRixVQUFVQyxRQUFWLENBQW5COztBQUVBLFFBQU1DLEtBQUtNLEtBQUwsQ0FBV0QsT0FBWCxDQUFOO0FBQ0QsQ0FKTTs7QUFNUDs7Ozs7QUFLTyxNQUFNRSw4QkFBVyxNQUFNUixRQUFOLElBQWtCO0FBQ3hDLFFBQU1DLE9BQU8sTUFBTUYsVUFBVUMsUUFBVixDQUFuQjs7QUFFQSxRQUFNTSxVQUFVLE1BQU1MLEtBQUtRLElBQUwsQ0FBVSxJQUFWLENBQXRCOztBQUVBLE1BQUksQ0FBQ0gsT0FBTCxFQUFjO0FBQ1osVUFBTUYsT0FBTjtBQUNEOztBQUVELE1BQUk7QUFDRixXQUFPTSxLQUFLQyxLQUFMLENBQVdMLE9BQVgsQ0FBUDtBQUNELEdBRkQsQ0FHQSxPQUFPTSxHQUFQLEVBQVk7QUFDVixXQUFPLEVBQUVDLFFBQVEsRUFBVixFQUFjQyxVQUFVLEVBQXhCLEVBQVA7QUFDRDtBQUNGLENBZk0iLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpbGUgfSBmcm9tICdhdG9tJztcblxuY29uc3QgY2hlY2tGaWxlID0gYXN5bmMgZmlsZVBhdGggPT4ge1xuICBjb25zdCBmaWxlID0gbmV3IEZpbGUoZmlsZVBhdGgpO1xuICBjb25zdCBleGlzdHMgPSBhd2FpdCBmaWxlLmV4aXN0cygpO1xuXG4gIGlmICghZXhpc3RzKSB7XG4gICAgdGhyb3cgRXJyb3IoKTtcbiAgfVxuXG4gIHJldHVybiBmaWxlO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2F2ZSBhIGZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIHRvIHNhdmVGaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB0aGUgY3VycmVudCBzZXJpYWxpemVkIHN0YXRlXG4gKiBAcmV0dXJucyB7T2JqZWN0fEVycm9yfVxuICovXG5leHBvcnQgY29uc3Qgc2F2ZUZpbGUgPSBhc3luYyAoZmlsZVBhdGgsIGNvbnRlbnQpID0+IHtcbiAgY29uc3QgZmlsZSA9IGF3YWl0IGNoZWNrRmlsZShmaWxlUGF0aCk7XG5cbiAgYXdhaXQgZmlsZS53cml0ZShjb250ZW50KTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHJlYWQgYSBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSB0byByZWFkRmlsZVxuICogQHJldHVybnMge09iamVjdHxFcnJvcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlYWRGaWxlID0gYXN5bmMgZmlsZVBhdGggPT4ge1xuICBjb25zdCBmaWxlID0gYXdhaXQgY2hlY2tGaWxlKGZpbGVQYXRoKTtcblxuICBjb25zdCBjb250ZW50ID0gYXdhaXQgZmlsZS5yZWFkKHRydWUpO1xuXG4gIGlmICghY29udGVudCkge1xuICAgIHRocm93IEVycm9yKCk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQpO1xuICB9XG4gIGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgfVxufTtcbiJdfQ==