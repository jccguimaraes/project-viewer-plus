"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformLegacyContent = void 0;

var _icons = _interopRequireDefault(require("./../constants/icons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {Object} legacyContent - legacy database object
 * @returns {Object} a normalized subContent
 */
var transformLegacyContent = legacyContent => {
  var content = {
    groups: [],
    projects: []
  };
  legacyContent.forEach(item => {
    if (item.type === 'group') {
      content.groups.push(_objectSpread({
        name: item.name,
        sortBy: item.sortBy,
        icon: _icons.default.find(icon => item.icon.includes(icon)) || ''
      }, (void 0).transformLegacyContent(item.list)));
    } else if (item.type === 'project') {
      content.projects.push({
        name: item.name,
        paths: item.paths,
        icon: _icons.default.find(icon => item.icon.includes(icon)) || ''
      });
    }
  });
  return content;
};

exports.transformLegacyContent = transformLegacyContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9sZWdhY3kuanMiXSwibmFtZXMiOlsidHJhbnNmb3JtTGVnYWN5Q29udGVudCIsImxlZ2FjeUNvbnRlbnQiLCJjb250ZW50IiwiZ3JvdXBzIiwicHJvamVjdHMiLCJmb3JFYWNoIiwiaXRlbSIsInR5cGUiLCJwdXNoIiwibmFtZSIsInNvcnRCeSIsImljb24iLCJpY29ucyIsImZpbmQiLCJpbmNsdWRlcyIsImxpc3QiLCJwYXRocyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0FBRUE7Ozs7O0FBS08sSUFBTUEsc0JBQXNCLEdBQUdDLGFBQWEsSUFBSTtBQUNyRCxNQUFNQyxPQUFPLEdBQUc7QUFDZEMsSUFBQUEsTUFBTSxFQUFFLEVBRE07QUFFZEMsSUFBQUEsUUFBUSxFQUFFO0FBRkksR0FBaEI7QUFJQUgsRUFBQUEsYUFBYSxDQUFDSSxPQUFkLENBQXNCQyxJQUFJLElBQUk7QUFDNUIsUUFBSUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekJMLE1BQUFBLE9BQU8sQ0FBQ0MsTUFBUixDQUFlSyxJQUFmO0FBQ0VDLFFBQUFBLElBQUksRUFBRUgsSUFBSSxDQUFDRyxJQURiO0FBRUVDLFFBQUFBLE1BQU0sRUFBRUosSUFBSSxDQUFDSSxNQUZmO0FBR0VDLFFBQUFBLElBQUksRUFBRUMsZUFBTUMsSUFBTixDQUFXRixJQUFJLElBQUlMLElBQUksQ0FBQ0ssSUFBTCxDQUFVRyxRQUFWLENBQW1CSCxJQUFuQixDQUFuQixLQUFnRDtBQUh4RCxTQUlLLFNBQUtYLHNCQUFMLENBQTRCTSxJQUFJLENBQUNTLElBQWpDLENBSkw7QUFNRCxLQVBELE1BUUssSUFBSVQsSUFBSSxDQUFDQyxJQUFMLEtBQWMsU0FBbEIsRUFBNkI7QUFDaENMLE1BQUFBLE9BQU8sQ0FBQ0UsUUFBUixDQUFpQkksSUFBakIsQ0FBc0I7QUFDcEJDLFFBQUFBLElBQUksRUFBRUgsSUFBSSxDQUFDRyxJQURTO0FBRXBCTyxRQUFBQSxLQUFLLEVBQUVWLElBQUksQ0FBQ1UsS0FGUTtBQUdwQkwsUUFBQUEsSUFBSSxFQUFFQyxlQUFNQyxJQUFOLENBQVdGLElBQUksSUFBSUwsSUFBSSxDQUFDSyxJQUFMLENBQVVHLFFBQVYsQ0FBbUJILElBQW5CLENBQW5CLEtBQWdEO0FBSGxDLE9BQXRCO0FBS0Q7QUFDRixHQWhCRDtBQWlCQSxTQUFPVCxPQUFQO0FBQ0QsQ0F2Qk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaWNvbnMgZnJvbSAnLi8uLi9jb25zdGFudHMvaWNvbnMnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGVnYWN5Q29udGVudCAtIGxlZ2FjeSBkYXRhYmFzZSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IGEgbm9ybWFsaXplZCBzdWJDb250ZW50XG4gKi9cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1MZWdhY3lDb250ZW50ID0gbGVnYWN5Q29udGVudCA9PiB7XG4gIGNvbnN0IGNvbnRlbnQgPSB7XG4gICAgZ3JvdXBzOiBbXSxcbiAgICBwcm9qZWN0czogW11cbiAgfTtcbiAgbGVnYWN5Q29udGVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGlmIChpdGVtLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGNvbnRlbnQuZ3JvdXBzLnB1c2goe1xuICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgIHNvcnRCeTogaXRlbS5zb3J0QnksXG4gICAgICAgIGljb246IGljb25zLmZpbmQoaWNvbiA9PiBpdGVtLmljb24uaW5jbHVkZXMoaWNvbikpIHx8ICcnLFxuICAgICAgICAuLi50aGlzLnRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQoaXRlbS5saXN0KVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBjb250ZW50LnByb2plY3RzLnB1c2goe1xuICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgIHBhdGhzOiBpdGVtLnBhdGhzLFxuICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJ1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuIl19