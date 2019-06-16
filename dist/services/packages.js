'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
class Packages {
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
}
exports.default = Packages;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlcyIsImNvbnN0cnVjdG9yIiwidHJlZVZpZXciLCJUcmVlVmlldyIsImZpbmRBbmRSZXBsYWNlIiwiRmluZEFuZFJlcGxhY2UiLCJzdGF0dXNCYXIiLCJTdGF0dXNCYXIiLCJsaW50ZXIiLCJMaW50ZXIiLCJsaW50ZXJVSURlZmF1bHQiLCJMaW50ZXJVSURlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxRQUFOLENBQWU7QUFDNUI7Ozs7O0FBS0FDLGdCQUFlO0FBQ2IsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxrQkFBSixFQUFoQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBSUMsd0JBQUosRUFBdEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElBQUlDLG1CQUFKLEVBQWpCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQUlDLGdCQUFKLEVBQWQ7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLElBQUlDLHlCQUFKLEVBQXZCO0FBQ0Q7QUFaMkI7a0JBQVRYLFEiLCJmaWxlIjoicGFja2FnZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVHJlZVZpZXcgZnJvbSAnLi9wYWNrYWdlcy90cmVlLXZpZXcnO1xuaW1wb3J0IEZpbmRBbmRSZXBsYWNlIGZyb20gJy4vcGFja2FnZXMvZmluZC1hbmQtcmVwbGFjZSc7XG5pbXBvcnQgU3RhdHVzQmFyIGZyb20gJy4vcGFja2FnZXMvc3RhdHVzLWJhcic7XG5pbXBvcnQgTGludGVyIGZyb20gJy4vcGFja2FnZXMvbGludGVyJztcbmltcG9ydCBMaW50ZXJVSURlZmF1bHQgZnJvbSAnLi9wYWNrYWdlcy9saW50ZXItdWktZGVmYXVsdCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWNrYWdlcyB7XG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy50cmVlVmlldyA9IG5ldyBUcmVlVmlldygpO1xuICAgIHRoaXMuZmluZEFuZFJlcGxhY2UgPSBuZXcgRmluZEFuZFJlcGxhY2UoKTtcbiAgICB0aGlzLnN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXIoKTtcbiAgICB0aGlzLmxpbnRlciA9IG5ldyBMaW50ZXIoKTtcbiAgICB0aGlzLmxpbnRlclVJRGVmYXVsdCA9IG5ldyBMaW50ZXJVSURlZmF1bHQoKTtcbiAgfVxufVxuIl19