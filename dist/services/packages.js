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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlcyIsImNvbnN0cnVjdG9yIiwidHJlZVZpZXciLCJUcmVlVmlldyIsImZpbmRBbmRSZXBsYWNlIiwiRmluZEFuZFJlcGxhY2UiLCJzdGF0dXNCYXIiLCJTdGF0dXNCYXIiLCJsaW50ZXIiLCJMaW50ZXIiLCJsaW50ZXJVSURlZmF1bHQiLCJMaW50ZXJVSURlZmF1bHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxRQUFOLENBQWU7O0FBRTVCOzs7OztBQUtBQyxnQkFBZTtBQUNiLFNBQUtDLFFBQUwsR0FBZ0IsSUFBSUMsa0JBQUosRUFBaEI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQUlDLHdCQUFKLEVBQXRCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFJQyxtQkFBSixFQUFqQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxnQkFBSixFQUFkO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QixJQUFJQyx5QkFBSixFQUF2QjtBQUNEO0FBYjJCO2tCQUFUWCxRIiwiZmlsZSI6InBhY2thZ2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyZWVWaWV3IGZyb20gJy4vcGFja2FnZXMvdHJlZS12aWV3JztcbmltcG9ydCBGaW5kQW5kUmVwbGFjZSBmcm9tICcuL3BhY2thZ2VzL2ZpbmQtYW5kLXJlcGxhY2UnO1xuaW1wb3J0IFN0YXR1c0JhciBmcm9tICcuL3BhY2thZ2VzL3N0YXR1cy1iYXInO1xuaW1wb3J0IExpbnRlciBmcm9tICcuL3BhY2thZ2VzL2xpbnRlcic7XG5pbXBvcnQgTGludGVyVUlEZWZhdWx0IGZyb20gJy4vcGFja2FnZXMvbGludGVyLXVpLWRlZmF1bHQnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFja2FnZXMge1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy50cmVlVmlldyA9IG5ldyBUcmVlVmlldygpO1xuICAgIHRoaXMuZmluZEFuZFJlcGxhY2UgPSBuZXcgRmluZEFuZFJlcGxhY2UoKTtcbiAgICB0aGlzLnN0YXR1c0JhciA9IG5ldyBTdGF0dXNCYXIoKTtcbiAgICB0aGlzLmxpbnRlciA9IG5ldyBMaW50ZXIoKTtcbiAgICB0aGlzLmxpbnRlclVJRGVmYXVsdCA9IG5ldyBMaW50ZXJVSURlZmF1bHQoKTtcbiAgfVxufVxuIl19