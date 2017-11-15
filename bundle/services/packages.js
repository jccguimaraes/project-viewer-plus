Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _treeView = require('./packages/tree-view');

var _treeView2 = _interopRequireDefault(_treeView);

var _findAndReplace = require('./packages/find-and-replace');

var _findAndReplace2 = _interopRequireDefault(_findAndReplace);

var _statusBar = require('./packages/status-bar');

var _statusBar2 = _interopRequireDefault(_statusBar);

var _linter = require('./packages/linter');

var _linter2 = _interopRequireDefault(_linter);

var _linterUiDefault = require('./packages/linter-ui-default');

var _linterUiDefault2 = _interopRequireDefault(_linterUiDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing the Database
 */
let Packages = class Packages {

  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor() {
    this.treeView = new _treeView2.default();
    this.findAndReplace = new _findAndReplace2.default();
    this.statusBar = new _statusBar2.default();
    this.linter = new _linter2.default();
    this.linterUIDefault = new _linterUiDefault2.default();
  }
};
exports.default = Packages;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlcyIsImNvbnN0cnVjdG9yIiwidHJlZVZpZXciLCJmaW5kQW5kUmVwbGFjZSIsInN0YXR1c0JhciIsImxpbnRlciIsImxpbnRlclVJRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0lBR3FCQSxRLEdBQU4sTUFBTUEsUUFBTixDQUFlOztBQUU1Qjs7Ozs7QUFLQUMsZ0JBQWU7QUFDYixTQUFLQyxRQUFMLEdBQWdCLHdCQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsOEJBQXRCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQix5QkFBakI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsc0JBQWQ7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLCtCQUF2QjtBQUNEO0FBYjJCLEM7a0JBQVROLFEiLCJmaWxlIjoicGFja2FnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZVZpZXcgZnJvbSAnLi9wYWNrYWdlcy90cmVlLXZpZXcnO1xuaW1wb3J0IEZpbmRBbmRSZXBsYWNlIGZyb20gJy4vcGFja2FnZXMvZmluZC1hbmQtcmVwbGFjZSc7XG5pbXBvcnQgU3RhdHVzQmFyIGZyb20gJy4vcGFja2FnZXMvc3RhdHVzLWJhcic7XG5pbXBvcnQgTGludGVyIGZyb20gJy4vcGFja2FnZXMvbGludGVyJztcbmltcG9ydCBMaW50ZXJVSURlZmF1bHQgZnJvbSAnLi9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlcyB7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnRyZWVWaWV3ID0gbmV3IFRyZWVWaWV3KCk7XG4gICAgdGhpcy5maW5kQW5kUmVwbGFjZSA9IG5ldyBGaW5kQW5kUmVwbGFjZSgpO1xuICAgIHRoaXMuc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcigpO1xuICAgIHRoaXMubGludGVyID0gbmV3IExpbnRlcigpO1xuICAgIHRoaXMubGludGVyVUlEZWZhdWx0ID0gbmV3IExpbnRlclVJRGVmYXVsdCgpO1xuICB9XG59XG4iXX0=