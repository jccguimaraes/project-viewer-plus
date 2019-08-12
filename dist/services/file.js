"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.saveFile = void 0;

var _atom = require("atom");

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


const saveFile = async (filePath, content) => {
  const file = await checkFile(filePath);
  await file.write(content);
};
/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */


exports.saveFile = saveFile;

const readFile = async filePath => {
  const file = await checkFile(filePath);
  const content = await file.read(true);

  if (!content) {
    throw Error();
  }

  try {
    return JSON.parse(content);
  } catch (err) {
    return {
      groups: [],
      projects: []
    };
  }
};

exports.readFile = readFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLmpzIl0sIm5hbWVzIjpbImNoZWNrRmlsZSIsImZpbGVQYXRoIiwiZmlsZSIsIkZpbGUiLCJleGlzdHMiLCJFcnJvciIsInNhdmVGaWxlIiwiY29udGVudCIsIndyaXRlIiwicmVhZEZpbGUiLCJyZWFkIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxTQUFTLEdBQUcsTUFBTUMsUUFBTixJQUFrQjtBQUNsQyxRQUFNQyxJQUFJLEdBQUcsSUFBSUMsVUFBSixDQUFTRixRQUFULENBQWI7QUFDQSxRQUFNRyxNQUFNLEdBQUcsTUFBTUYsSUFBSSxDQUFDRSxNQUFMLEVBQXJCOztBQUVBLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsVUFBTUMsS0FBSyxFQUFYO0FBQ0Q7O0FBRUQsU0FBT0gsSUFBUDtBQUNELENBVEQ7QUFXQTs7Ozs7Ozs7QUFNTyxNQUFNSSxRQUFRLEdBQUcsT0FBT0wsUUFBUCxFQUFpQk0sT0FBakIsS0FBNkI7QUFDbkQsUUFBTUwsSUFBSSxHQUFHLE1BQU1GLFNBQVMsQ0FBQ0MsUUFBRCxDQUE1QjtBQUVBLFFBQU1DLElBQUksQ0FBQ00sS0FBTCxDQUFXRCxPQUFYLENBQU47QUFDRCxDQUpNO0FBTVA7Ozs7Ozs7OztBQUtPLE1BQU1FLFFBQVEsR0FBRyxNQUFNUixRQUFOLElBQWtCO0FBQ3hDLFFBQU1DLElBQUksR0FBRyxNQUFNRixTQUFTLENBQUNDLFFBQUQsQ0FBNUI7QUFFQSxRQUFNTSxPQUFPLEdBQUcsTUFBTUwsSUFBSSxDQUFDUSxJQUFMLENBQVUsSUFBVixDQUF0Qjs7QUFFQSxNQUFJLENBQUNILE9BQUwsRUFBYztBQUNaLFVBQU1GLEtBQUssRUFBWDtBQUNEOztBQUVELE1BQUk7QUFDRixXQUFPTSxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsT0FBWCxDQUFQO0FBQ0QsR0FGRCxDQUdBLE9BQU9NLEdBQVAsRUFBWTtBQUNWLFdBQU87QUFBRUMsTUFBQUEsTUFBTSxFQUFFLEVBQVY7QUFBY0MsTUFBQUEsUUFBUSxFQUFFO0FBQXhCLEtBQVA7QUFDRDtBQUNGLENBZk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlIH0gZnJvbSAnYXRvbSc7XG5cbmNvbnN0IGNoZWNrRmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+IHtcbiAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKGZpbGVQYXRoKTtcbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcblxuICBpZiAoIWV4aXN0cykge1xuICAgIHRocm93IEVycm9yKCk7XG4gIH1cblxuICByZXR1cm4gZmlsZTtcbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNhdmUgYSBmaWxlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVBhdGggdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSB0byBzYXZlRmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgdGhlIGN1cnJlbnQgc2VyaWFsaXplZCBzdGF0ZVxuICogQHJldHVybnMge09iamVjdHxFcnJvcn1cbiAqL1xuZXhwb3J0IGNvbnN0IHNhdmVGaWxlID0gYXN5bmMgKGZpbGVQYXRoLCBjb250ZW50KSA9PiB7XG4gIGNvbnN0IGZpbGUgPSBhd2FpdCBjaGVja0ZpbGUoZmlsZVBhdGgpO1xuXG4gIGF3YWl0IGZpbGUud3JpdGUoY29udGVudCk7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byByZWFkIGEgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVhZEZpbGVcbiAqIEByZXR1cm5zIHtPYmplY3R8RXJyb3J9XG4gKi9cbmV4cG9ydCBjb25zdCByZWFkRmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+IHtcbiAgY29uc3QgZmlsZSA9IGF3YWl0IGNoZWNrRmlsZShmaWxlUGF0aCk7XG5cbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZpbGUucmVhZCh0cnVlKTtcblxuICBpZiAoIWNvbnRlbnQpIHtcbiAgICB0aHJvdyBFcnJvcigpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gIH1cbn07XG4iXX0=