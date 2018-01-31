'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (...messages) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log('PV+', ...messages);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kZXZsb2cuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQWUsQ0FBQyxHQUFHQSxRQUFKLEtBQWlCO0FBQzlCLE1BQUlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QztBQUNEO0FBQ0RDLFVBQVFDLEdBQVIsQ0FBWSxLQUFaLEVBQW1CLEdBQUdMLFFBQXRCO0FBQ0QsQyIsImZpbGUiOiJkZXZsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAoLi4ubWVzc2FnZXMpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc29sZS5sb2coJ1BWKycsIC4uLm1lc3NhZ2VzKTtcbn07XG4iXX0=