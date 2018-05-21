'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (...messages) => {
  var _console;

  if (process.env.NODE_ENV === 'production') {
    return;
  }
  (_console = console).log.apply(_console, ['PV+'].concat(messages));
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kZXZsb2cuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFBZSxDQUFDLEdBQUdBLFFBQUosS0FBaUI7QUFBQTs7QUFDOUIsTUFBSUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDO0FBQ0Q7QUFDRCx1QkFBUUMsR0FBUixrQkFBWSxLQUFaLFNBQXNCSixRQUF0QjtBQUNELEMiLCJmaWxlIjoiZGV2bG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgKC4uLm1lc3NhZ2VzKSA9PiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUubG9nKCdQVisnLCAuLi5tZXNzYWdlcyk7XG59O1xuIl19