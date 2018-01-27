'use strict';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9wYWNrYWdlcy5qcyJdLCJuYW1lcyI6WyJQYWNrYWdlcyIsImNvbnN0cnVjdG9yIiwidHJlZVZpZXciLCJmaW5kQW5kUmVwbGFjZSIsInN0YXR1c0JhciIsImxpbnRlciIsImxpbnRlclVJRGVmYXVsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7SUFHcUJBLFEsR0FBTixNQUFNQSxRQUFOLENBQWU7O0FBRTVCOzs7OztBQUtBQyxnQkFBZTtBQUNiLFNBQUtDLFFBQUwsR0FBZ0Isd0JBQWhCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQiw4QkFBdEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLHlCQUFqQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxzQkFBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsK0JBQXZCO0FBQ0Q7QUFiMkIsQztrQkFBVE4sUSIsImZpbGUiOiJwYWNrYWdlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmVlVmlldyBmcm9tICcuL3BhY2thZ2VzL3RyZWUtdmlldyc7XG5pbXBvcnQgRmluZEFuZFJlcGxhY2UgZnJvbSAnLi9wYWNrYWdlcy9maW5kLWFuZC1yZXBsYWNlJztcbmltcG9ydCBTdGF0dXNCYXIgZnJvbSAnLi9wYWNrYWdlcy9zdGF0dXMtYmFyJztcbmltcG9ydCBMaW50ZXIgZnJvbSAnLi9wYWNrYWdlcy9saW50ZXInO1xuaW1wb3J0IExpbnRlclVJRGVmYXVsdCBmcm9tICcuL3BhY2thZ2VzL2xpbnRlci11aS1kZWZhdWx0JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhY2thZ2VzIHtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudHJlZVZpZXcgPSBuZXcgVHJlZVZpZXcoKTtcbiAgICB0aGlzLmZpbmRBbmRSZXBsYWNlID0gbmV3IEZpbmRBbmRSZXBsYWNlKCk7XG4gICAgdGhpcy5zdGF0dXNCYXIgPSBuZXcgU3RhdHVzQmFyKCk7XG4gICAgdGhpcy5saW50ZXIgPSBuZXcgTGludGVyKCk7XG4gICAgdGhpcy5saW50ZXJVSURlZmF1bHQgPSBuZXcgTGludGVyVUlEZWZhdWx0KCk7XG4gIH1cbn1cbiJdfQ==