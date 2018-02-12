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
    const children = this.props.children || [];
    const content = this.database.content || [];
    const className = this.props.root ? 'list-tree has-collapsable-children' : 'list-tree';

    return _etch2.default.dom(
      'ul',
      { className: className },
      children.map(id => {
        const resource = content.map[id];
        if (!resource) {
          return null;
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJyb290IiwibWFwIiwiaWQiLCJyZXNvdXJjZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FOQTs7QUFRQTs7O0lBR01BLGEsR0FBTixNQUFNQSxhQUFOLENBQW9CO0FBQ2xCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQix3QkFBaEI7QUFDQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNILEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtHLE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxRQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFdBQVcsS0FBS1IsS0FBTCxDQUFXUSxRQUFYLElBQXVCLEVBQXhDO0FBQ0EsVUFBTUMsVUFBVSxLQUFLUixRQUFMLENBQWNRLE9BQWQsSUFBeUIsRUFBekM7QUFDQSxVQUFNQyxZQUFZLEtBQUtWLEtBQUwsQ0FBV1csSUFBWCxHQUNkLG9DQURjLEdBRWQsV0FGSjs7QUFJQSxXQUNFO0FBQUE7QUFBQSxRQUFJLFdBQVdELFNBQWY7QUFDR0YsZUFBU0ksR0FBVCxDQUFhQyxNQUFNO0FBQ2xCLGNBQU1DLFdBQVdMLFFBQVFHLEdBQVIsQ0FBWUMsRUFBWixDQUFqQjtBQUNBLFlBQUksQ0FBQ0MsUUFBTCxFQUFlO0FBQ2IsaUJBQU8sSUFBUDtBQUNEOztBQUVELFlBQUlBLFNBQVNDLElBQVQsS0FBa0IsU0FBdEIsRUFBaUM7QUFDL0IsaUJBQU8sc0NBQXNCRCxRQUF0QixDQUFQO0FBQ0Q7QUFDRCxlQUFPLG9DQUFvQkEsUUFBcEIsQ0FBUDtBQUNELE9BVkE7QUFESCxLQURGO0FBZUQ7QUExRGlCLEM7a0JBNkRMaEIsYSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgR3JvdXBDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL2dyb3VwJztcbmltcG9ydCBQcm9qZWN0Q29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9wcm9qZWN0JztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIExpc3RDb250YWluZXIge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmRhdGFiYXNlID0gbmV3IERhdGFiYXNlKCk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuIHx8IFtdO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmRhdGFiYXNlLmNvbnRlbnQgfHwgW107XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5yb290XG4gICAgICA/ICdsaXN0LXRyZWUgaGFzLWNvbGxhcHNhYmxlLWNoaWxkcmVuJ1xuICAgICAgOiAnbGlzdC10cmVlJztcblxuICAgIHJldHVybiAoXG4gICAgICA8dWwgY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICB7Y2hpbGRyZW4ubWFwKGlkID0+IHtcbiAgICAgICAgICBjb25zdCByZXNvdXJjZSA9IGNvbnRlbnQubWFwW2lkXTtcbiAgICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzb3VyY2UudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gPFByb2plY3RDb21wb25lbnQgey4uLnJlc291cmNlfSAvPjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxHcm91cENvbXBvbmVudCB7Li4ucmVzb3VyY2V9IC8+O1xuICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q29udGFpbmVyO1xuIl19