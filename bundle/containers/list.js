'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _group = require('./../components/group');

var _group2 = _interopRequireDefault(_group);

var _project = require('./../components/project');

var _project2 = _interopRequireDefault(_project);

var _database = require('./../services/database');

var _database2 = _interopRequireDefault(_database);

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let ListContainer = class ListContainer {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    this.database = new _database2.default();
    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.props = props;
        return _etch2.default.update(_this);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this2);
    })();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const className = this.props.root ? 'list-tree has-collapsable-children' : 'list-tree';

    const children = this.props.children || [];

    return _etch2.default.dom(
      'ul',
      { className: className },
      children.map(id => {
        const resource = this.database.content.map[id];
        if (resource.type === 'project') {
          return _etch2.default.dom(_project2.default, resource);
        }
        return _etch2.default.dom(_group2.default, resource);
      })
    );
  }
};
exports.default = ListContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJyb290IiwiY2hpbGRyZW4iLCJtYXAiLCJpZCIsInJlc291cmNlIiwiY29udGVudCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FOQTs7QUFRQTs7O0lBR01BLGEsR0FBTixNQUFNQSxhQUFOLENBQW9CO0FBQ2xCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQix3QkFBaEI7QUFDQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBS1IsS0FBTCxDQUFXUyxJQUFYLEdBQ2Qsb0NBRGMsR0FFZCxXQUZKOztBQUlBLFVBQU1DLFdBQVcsS0FBS1YsS0FBTCxDQUFXVSxRQUFYLElBQXVCLEVBQXhDOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBV0YsU0FBZjtBQUNHRSxlQUFTQyxHQUFULENBQWFDLE1BQU07QUFDbEIsY0FBTUMsV0FBVyxLQUFLWixRQUFMLENBQWNhLE9BQWQsQ0FBc0JILEdBQXRCLENBQTBCQyxFQUExQixDQUFqQjtBQUNBLFlBQUlDLFNBQVNFLElBQVQsS0FBa0IsU0FBdEIsRUFBaUM7QUFDL0IsaUJBQU8sc0NBQXNCRixRQUF0QixDQUFQO0FBQ0Q7QUFDRCxlQUFPLG9DQUFvQkEsUUFBcEIsQ0FBUDtBQUNELE9BTkE7QUFESCxLQURGO0FBV0Q7QUF0RGlCLEM7a0JBeURMZixhIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZ3JvdXAnO1xuaW1wb3J0IFByb2plY3RDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2plY3QnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnJvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IFtdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtjaGlsZHJlbi5tYXAoaWQgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5kYXRhYmFzZS5jb250ZW50Lm1hcFtpZF07XG4gICAgICAgICAgaWYgKHJlc291cmNlLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIDxQcm9qZWN0Q29tcG9uZW50IHsuLi5yZXNvdXJjZX0gLz47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8R3JvdXBDb21wb25lbnQgey4uLnJlc291cmNlfSAvPjtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRhaW5lcjtcbiJdfQ==