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

    return _etch2.default.dom(
      'ul',
      { className: className },
      this.props.children.map(id => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJyb290IiwiY2hpbGRyZW4iLCJtYXAiLCJpZCIsInJlc291cmNlIiwiY29udGVudCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FOQTs7QUFRQTs7O0lBR01BLGEsR0FBTixNQUFNQSxhQUFOLENBQW9CO0FBQ2xCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQix3QkFBaEI7QUFDQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBS1IsS0FBTCxDQUFXUyxJQUFYLEdBQ2Qsb0NBRGMsR0FFZCxXQUZKOztBQUlBLFdBQ0U7QUFBQTtBQUFBLFFBQUksV0FBV0QsU0FBZjtBQUNHLFdBQUtSLEtBQUwsQ0FBV1UsUUFBWCxDQUFvQkMsR0FBcEIsQ0FBd0JDLE1BQU07QUFDN0IsY0FBTUMsV0FBVyxLQUFLWixRQUFMLENBQWNhLE9BQWQsQ0FBc0JILEdBQXRCLENBQTBCQyxFQUExQixDQUFqQjtBQUNBLFlBQUlDLFNBQVNFLElBQVQsS0FBa0IsU0FBdEIsRUFBaUM7QUFDL0IsaUJBQU8sc0NBQXNCRixRQUF0QixDQUFQO0FBQ0Q7QUFDRCxlQUFPLG9DQUFvQkEsUUFBcEIsQ0FBUDtBQUNELE9BTkE7QUFESCxLQURGO0FBV0Q7QUFwRGlCLEM7a0JBdURMZixhIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBHcm91cENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvZ3JvdXAnO1xuaW1wb3J0IFByb2plY3RDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL3Byb2plY3QnO1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vLi4vc2VydmljZXMvZGF0YWJhc2UnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgTGlzdENvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnJvb3RcbiAgICAgID8gJ2xpc3QtdHJlZSBoYXMtY29sbGFwc2FibGUtY2hpbGRyZW4nXG4gICAgICA6ICdsaXN0LXRyZWUnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuLm1hcChpZCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW2lkXTtcbiAgICAgICAgICBpZiAocmVzb3VyY2UudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gPFByb2plY3RDb21wb25lbnQgey4uLnJlc291cmNlfSAvPjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxHcm91cENvbXBvbmVudCB7Li4ucmVzb3VyY2V9IC8+O1xuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udGFpbmVyO1xuIl19