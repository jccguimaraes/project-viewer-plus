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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2xpc3QuanMiXSwibmFtZXMiOlsiTGlzdENvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkYXRhYmFzZSIsIkRhdGFiYXNlIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjaGlsZHJlbiIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJyb290IiwibWFwIiwiaWQiLCJyZXNvdXJjZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FOQTs7QUFRQTs7O0lBR01BLGEsR0FBTixNQUFNQSxhQUFOLENBQW9CO0FBQ2xCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFJQyxrQkFBSixFQUFoQjtBQUNBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPRyxlQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUwsZUFBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCOztBQUVEOzs7O0FBSUFDLFdBQVU7QUFDUixVQUFNQyxXQUFXLEtBQUtWLEtBQUwsQ0FBV1UsUUFBWCxJQUF1QixFQUF4QztBQUNBLFVBQU1DLFVBQVUsS0FBS1YsUUFBTCxDQUFjVSxPQUFkLElBQXlCLEVBQXpDO0FBQ0EsVUFBTUMsWUFBWSxLQUFLWixLQUFMLENBQVdhLElBQVgsR0FDZCxvQ0FEYyxHQUVkLFdBRko7O0FBSUEsV0FDRTtBQUFBO0FBQUEsUUFBSSxXQUFXRCxTQUFmO0FBQ0dGLGVBQVNJLEdBQVQsQ0FBYUMsTUFBTTtBQUNsQixjQUFNQyxXQUFXTCxRQUFRRyxHQUFSLENBQVlDLEVBQVosQ0FBakI7QUFDQSxZQUFJLENBQUNDLFFBQUwsRUFBZTtBQUNiLGlCQUFPLElBQVA7QUFDRDs7QUFFRCxZQUFJQSxTQUFTQyxJQUFULEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CLGlCQUFPLG1CQUFDLGlCQUFELEVBQXNCRCxRQUF0QixDQUFQO0FBQ0Q7QUFDRCxlQUFPLG1CQUFDLGVBQUQsRUFBb0JBLFFBQXBCLENBQVA7QUFDRCxPQVZBO0FBREgsS0FERjtBQWVEO0FBMURpQixDO2tCQTZETGxCLGEiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEdyb3VwQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9ncm91cCc7XG5pbXBvcnQgUHJvamVjdENvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvcHJvamVjdCc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kYXRhYmFzZSc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vLi4vc2VydmljZXMvZGV2bG9nJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBMaXN0Q29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbiB8fCBbXTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5kYXRhYmFzZS5jb250ZW50IHx8IFtdO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMucm9vdFxuICAgICAgPyAnbGlzdC10cmVlIGhhcy1jb2xsYXBzYWJsZS1jaGlsZHJlbidcbiAgICAgIDogJ2xpc3QtdHJlZSc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgICAge2NoaWxkcmVuLm1hcChpZCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzb3VyY2UgPSBjb250ZW50Lm1hcFtpZF07XG4gICAgICAgICAgaWYgKCFyZXNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc291cmNlLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIDxQcm9qZWN0Q29tcG9uZW50IHsuLi5yZXNvdXJjZX0gLz47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8R3JvdXBDb21wb25lbnQgey4uLnJlc291cmNlfSAvPjtcbiAgICAgICAgfSl9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdENvbnRhaW5lcjtcbiJdfQ==