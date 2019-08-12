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
    return null;
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
  const file = new _atom.File(filePath);
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

  if (!file) {
    return false;
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLmpzIl0sIm5hbWVzIjpbImNoZWNrRmlsZSIsImZpbGVQYXRoIiwiZmlsZSIsIkZpbGUiLCJleGlzdHMiLCJzYXZlRmlsZSIsImNvbnRlbnQiLCJ3cml0ZSIsInJlYWRGaWxlIiwicmVhZCIsIkVycm9yIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxNQUFNQSxTQUFTLEdBQUcsTUFBTUMsUUFBTixJQUFrQjtBQUNsQyxRQUFNQyxJQUFJLEdBQUcsSUFBSUMsVUFBSixDQUFTRixRQUFULENBQWI7QUFDQSxRQUFNRyxNQUFNLEdBQUcsTUFBTUYsSUFBSSxDQUFDRSxNQUFMLEVBQXJCOztBQUVBLE1BQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsU0FBT0YsSUFBUDtBQUNELENBVEQ7QUFXQTs7Ozs7Ozs7QUFNTyxNQUFNRyxRQUFRLEdBQUcsT0FBT0osUUFBUCxFQUFpQkssT0FBakIsS0FBNkI7QUFDbkQsUUFBTUosSUFBSSxHQUFHLElBQUlDLFVBQUosQ0FBU0YsUUFBVCxDQUFiO0FBRUEsUUFBTUMsSUFBSSxDQUFDSyxLQUFMLENBQVdELE9BQVgsQ0FBTjtBQUNELENBSk07QUFNUDs7Ozs7Ozs7O0FBS08sTUFBTUUsUUFBUSxHQUFHLE1BQU1QLFFBQU4sSUFBa0I7QUFDeEMsUUFBTUMsSUFBSSxHQUFHLE1BQU1GLFNBQVMsQ0FBQ0MsUUFBRCxDQUE1Qjs7QUFFQSxNQUFJLENBQUNDLElBQUwsRUFBVztBQUNULFdBQU8sS0FBUDtBQUNEOztBQUVELFFBQU1JLE9BQU8sR0FBRyxNQUFNSixJQUFJLENBQUNPLElBQUwsQ0FBVSxJQUFWLENBQXRCOztBQUVBLE1BQUksQ0FBQ0gsT0FBTCxFQUFjO0FBQ1osVUFBTUksS0FBSyxFQUFYO0FBQ0Q7O0FBRUQsTUFBSTtBQUNGLFdBQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXTixPQUFYLENBQVA7QUFDRCxHQUZELENBR0EsT0FBT08sR0FBUCxFQUFZO0FBQ1YsV0FBTztBQUFFQyxNQUFBQSxNQUFNLEVBQUUsRUFBVjtBQUFjQyxNQUFBQSxRQUFRLEVBQUU7QUFBeEIsS0FBUDtBQUNEO0FBQ0YsQ0FuQk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWxlIH0gZnJvbSAnYXRvbSc7XG5cbmNvbnN0IGNoZWNrRmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+IHtcbiAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKGZpbGVQYXRoKTtcbiAgY29uc3QgZXhpc3RzID0gYXdhaXQgZmlsZS5leGlzdHMoKTtcblxuICBpZiAoIWV4aXN0cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGZpbGU7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzYXZlIGEgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgdG8gc2F2ZUZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHRoZSBjdXJyZW50IHNlcmlhbGl6ZWQgc3RhdGVcbiAqIEByZXR1cm5zIHtPYmplY3R8RXJyb3J9XG4gKi9cbmV4cG9ydCBjb25zdCBzYXZlRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgY29udGVudCkgPT4ge1xuICBjb25zdCBmaWxlID0gbmV3IEZpbGUoZmlsZVBhdGgpO1xuXG4gIGF3YWl0IGZpbGUud3JpdGUoY29udGVudCk7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byByZWFkIGEgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgdG8gcmVhZEZpbGVcbiAqIEByZXR1cm5zIHtPYmplY3R8RXJyb3J9XG4gKi9cbmV4cG9ydCBjb25zdCByZWFkRmlsZSA9IGFzeW5jIGZpbGVQYXRoID0+IHtcbiAgY29uc3QgZmlsZSA9IGF3YWl0IGNoZWNrRmlsZShmaWxlUGF0aCk7XG5cbiAgaWYgKCFmaWxlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY29udGVudCA9IGF3YWl0IGZpbGUucmVhZCh0cnVlKTtcblxuICBpZiAoIWNvbnRlbnQpIHtcbiAgICB0aHJvdyBFcnJvcigpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgfVxuICBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gIH1cbn07XG4iXX0=