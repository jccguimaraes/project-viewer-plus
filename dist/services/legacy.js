'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformLegacyContent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _icons = require('./../constants/icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} legacyContent - legacy database object
 * @returns {Object} a normalized subContent
 */
const transformLegacyContent = exports.transformLegacyContent = legacyContent => {
  const content = {
    groups: [],
    projects: []
  };
  legacyContent.forEach(item => {
    if (item.type === 'group') {
      content.groups.push(_extends({
        name: item.name,
        sortBy: item.sortBy,
        icon: _icons2.default.find(icon => item.icon.includes(icon)) || ''
      }, undefined.transformLegacyContent(item.list)));
    } else if (item.type === 'project') {
      content.projects.push({
        name: item.name,
        paths: item.paths,
        icon: _icons2.default.find(icon => item.icon.includes(icon)) || ''
      });
    }
  });
  return content;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9sZWdhY3kuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtTGVnYWN5Q29udGVudCIsImxlZ2FjeUNvbnRlbnQiLCJjb250ZW50IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJmb3JFYWNoIiwiaXRlbSIsInR5cGUiLCJwdXNoIiwibmFtZSIsInNvcnRCeSIsImljb24iLCJpY29ucyIsImZpbmQiLCJpbmNsdWRlcyIsImxpc3QiLCJwYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7OztBQUtPLE1BQU1BLDBEQUF5QkMsaUJBQWlCO0FBQ3JELFFBQU1DLFVBQVU7QUFDZEMsWUFBUSxFQURNO0FBRWRDLGNBQVU7QUFGSSxHQUFoQjtBQUlBSCxnQkFBY0ksT0FBZCxDQUFzQkMsUUFBUTtBQUM1QixRQUFJQSxLQUFLQyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekJMLGNBQVFDLE1BQVIsQ0FBZUssSUFBZjtBQUNFQyxjQUFNSCxLQUFLRyxJQURiO0FBRUVDLGdCQUFRSixLQUFLSSxNQUZmO0FBR0VDLGNBQU1DLGdCQUFNQyxJQUFOLENBQVdGLFFBQVFMLEtBQUtLLElBQUwsQ0FBVUcsUUFBVixDQUFtQkgsSUFBbkIsQ0FBbkIsS0FBZ0Q7QUFIeEQsU0FJSyxVQUFLWCxzQkFBTCxDQUE0Qk0sS0FBS1MsSUFBakMsQ0FKTDtBQU1ELEtBUEQsTUFRSyxJQUFJVCxLQUFLQyxJQUFMLEtBQWMsU0FBbEIsRUFBNkI7QUFDaENMLGNBQVFFLFFBQVIsQ0FBaUJJLElBQWpCLENBQXNCO0FBQ3BCQyxjQUFNSCxLQUFLRyxJQURTO0FBRXBCTyxlQUFPVixLQUFLVSxLQUZRO0FBR3BCTCxjQUFNQyxnQkFBTUMsSUFBTixDQUFXRixRQUFRTCxLQUFLSyxJQUFMLENBQVVHLFFBQVYsQ0FBbUJILElBQW5CLENBQW5CLEtBQWdEO0FBSGxDLE9BQXRCO0FBS0Q7QUFDRixHQWhCRDtBQWlCQSxTQUFPVCxPQUFQO0FBQ0QsQ0F2Qk0iLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGljb25zIGZyb20gJy4vLi4vY29uc3RhbnRzL2ljb25zJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxlZ2FjeUNvbnRlbnQgLSBsZWdhY3kgZGF0YWJhc2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhIG5vcm1hbGl6ZWQgc3ViQ29udGVudFxuICovXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtTGVnYWN5Q29udGVudCA9IGxlZ2FjeUNvbnRlbnQgPT4ge1xuICBjb25zdCBjb250ZW50ID0ge1xuICAgIGdyb3VwczogW10sXG4gICAgcHJvamVjdHM6IFtdXG4gIH07XG4gIGxlZ2FjeUNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBjb250ZW50Lmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBzb3J0Qnk6IGl0ZW0uc29ydEJ5LFxuICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJyxcbiAgICAgICAgLi4udGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGl0ZW0ubGlzdClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgY29udGVudC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBwYXRoczogaXRlbS5wYXRocyxcbiAgICAgICAgaWNvbjogaWNvbnMuZmluZChpY29uID0+IGl0ZW0uaWNvbi5pbmNsdWRlcyhpY29uKSkgfHwgJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250ZW50O1xufTtcbiJdfQ==