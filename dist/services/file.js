"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = exports.saveFile = void 0;

var _atom = require("atom");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkFile =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (filePath) {
    var file = new _atom.File(filePath);
    var exists = yield file.exists();

    if (!exists) {
      throw Error();
    }

    return file;
  });

  return function checkFile(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Helper function to save a file
 * @param {string} filePath the full path of the file to saveFile
 * @param {string} content the current serialized state
 * @returns {Object|Error}
 */


var saveFile =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(function* (filePath, content) {
    var file = yield checkFile(filePath);
    yield file.write(content);
  });

  return function saveFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Helper function to read a file
 * @param {string} filePath the full path of the file to readFile
 * @returns {Object|Error}
 */


exports.saveFile = saveFile;

var readFile =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(function* (filePath) {
    var file = yield checkFile(filePath);
    var content = yield file.read(true);

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
  });

  return function readFile(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.readFile = readFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9maWxlLmpzIl0sIm5hbWVzIjpbImNoZWNrRmlsZSIsImZpbGVQYXRoIiwiZmlsZSIsIkZpbGUiLCJleGlzdHMiLCJFcnJvciIsInNhdmVGaWxlIiwiY29udGVudCIsIndyaXRlIiwicmVhZEZpbGUiLCJyZWFkIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwiZ3JvdXBzIiwicHJvamVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUztBQUFBO0FBQUE7QUFBQSwrQkFBRyxXQUFNQyxRQUFOLEVBQWtCO0FBQ2xDLFFBQU1DLElBQUksR0FBRyxJQUFJQyxVQUFKLENBQVNGLFFBQVQsQ0FBYjtBQUNBLFFBQU1HLE1BQU0sU0FBU0YsSUFBSSxDQUFDRSxNQUFMLEVBQXJCOztBQUVBLFFBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gsWUFBTUMsS0FBSyxFQUFYO0FBQ0Q7O0FBRUQsV0FBT0gsSUFBUDtBQUNELEdBVGM7O0FBQUEsa0JBQVRGLFNBQVM7QUFBQTtBQUFBO0FBQUEsR0FBZjtBQVdBOzs7Ozs7OztBQU1PLElBQU1NLFFBQVE7QUFBQTtBQUFBO0FBQUEsZ0NBQUcsV0FBT0wsUUFBUCxFQUFpQk0sT0FBakIsRUFBNkI7QUFDbkQsUUFBTUwsSUFBSSxTQUFTRixTQUFTLENBQUNDLFFBQUQsQ0FBNUI7QUFFQSxVQUFNQyxJQUFJLENBQUNNLEtBQUwsQ0FBV0QsT0FBWCxDQUFOO0FBQ0QsR0FKb0I7O0FBQUEsa0JBQVJELFFBQVE7QUFBQTtBQUFBO0FBQUEsR0FBZDtBQU1QOzs7Ozs7Ozs7QUFLTyxJQUFNRyxRQUFRO0FBQUE7QUFBQTtBQUFBLGdDQUFHLFdBQU1SLFFBQU4sRUFBa0I7QUFDeEMsUUFBTUMsSUFBSSxTQUFTRixTQUFTLENBQUNDLFFBQUQsQ0FBNUI7QUFFQSxRQUFNTSxPQUFPLFNBQVNMLElBQUksQ0FBQ1EsSUFBTCxDQUFVLElBQVYsQ0FBdEI7O0FBRUEsUUFBSSxDQUFDSCxPQUFMLEVBQWM7QUFDWixZQUFNRixLQUFLLEVBQVg7QUFDRDs7QUFFRCxRQUFJO0FBQ0YsYUFBT00sSUFBSSxDQUFDQyxLQUFMLENBQVdMLE9BQVgsQ0FBUDtBQUNELEtBRkQsQ0FHQSxPQUFPTSxHQUFQLEVBQVk7QUFDVixhQUFPO0FBQUVDLFFBQUFBLE1BQU0sRUFBRSxFQUFWO0FBQWNDLFFBQUFBLFFBQVEsRUFBRTtBQUF4QixPQUFQO0FBQ0Q7QUFDRixHQWZvQjs7QUFBQSxrQkFBUk4sUUFBUTtBQUFBO0FBQUE7QUFBQSxHQUFkIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZSB9IGZyb20gJ2F0b20nO1xuXG5jb25zdCBjaGVja0ZpbGUgPSBhc3luYyBmaWxlUGF0aCA9PiB7XG4gIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShmaWxlUGF0aCk7XG4gIGNvbnN0IGV4aXN0cyA9IGF3YWl0IGZpbGUuZXhpc3RzKCk7XG5cbiAgaWYgKCFleGlzdHMpIHtcbiAgICB0aHJvdyBFcnJvcigpO1xuICB9XG5cbiAgcmV0dXJuIGZpbGU7XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzYXZlIGEgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVQYXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgdG8gc2F2ZUZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHRoZSBjdXJyZW50IHNlcmlhbGl6ZWQgc3RhdGVcbiAqIEByZXR1cm5zIHtPYmplY3R8RXJyb3J9XG4gKi9cbmV4cG9ydCBjb25zdCBzYXZlRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgY29udGVudCkgPT4ge1xuICBjb25zdCBmaWxlID0gYXdhaXQgY2hlY2tGaWxlKGZpbGVQYXRoKTtcblxuICBhd2FpdCBmaWxlLndyaXRlKGNvbnRlbnQpO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gcmVhZCBhIGZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlUGF0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBmaWxlIHRvIHJlYWRGaWxlXG4gKiBAcmV0dXJucyB7T2JqZWN0fEVycm9yfVxuICovXG5leHBvcnQgY29uc3QgcmVhZEZpbGUgPSBhc3luYyBmaWxlUGF0aCA9PiB7XG4gIGNvbnN0IGZpbGUgPSBhd2FpdCBjaGVja0ZpbGUoZmlsZVBhdGgpO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBmaWxlLnJlYWQodHJ1ZSk7XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgdGhyb3cgRXJyb3IoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG4gIH1cbiAgY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICB9XG59O1xuIl19