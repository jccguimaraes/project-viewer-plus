Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = message => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(message);
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9kZXZsb2cuanMiXSwibmFtZXMiOlsibWVzc2FnZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7a0JBQWVBLFdBQVc7QUFDeEIsTUFBSUMsUUFBUUMsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDO0FBQ0Q7QUFDREMsVUFBUUMsR0FBUixDQUFZTCxPQUFaO0FBQ0QsQyIsImZpbGUiOiJkZXZsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBtZXNzYWdlID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc29sZS5sb2cobWVzc2FnZSk7XG59O1xuIl19