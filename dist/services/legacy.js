'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *
 * @param {Object} legacyContent - legacy database object
 * @returns {Object} a normalized subContent
 */
exports.transformLegacyContent = legacyContent => {
  const content = {
    groups: [],
    projects: []
  };
  legacyContent.forEach(item => {
    if (item.type === 'group') {
      content.groups.push(_extends({
        name: item.name,
        sortBy: item.sortBy,
        icon: icons.find(icon => item.icon.includes(icon)) || ''
      }, undefined.transformLegacyContent(item.list)));
    } else if (item.type === 'project') {
      content.projects.push({
        name: item.name,
        paths: item.paths,
        icon: icons.find(icon => item.icon.includes(icon)) || ''
      });
    }
  });
  return content;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9sZWdhY3kuanMiXSwibmFtZXMiOlsiZXhwb3J0cyIsInRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQiLCJsZWdhY3lDb250ZW50IiwiY29udGVudCIsImdyb3VwcyIsInByb2plY3RzIiwiZm9yRWFjaCIsIml0ZW0iLCJ0eXBlIiwicHVzaCIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwiaWNvbnMiLCJmaW5kIiwiaW5jbHVkZXMiLCJsaXN0IiwicGF0aHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7QUFLQUEsUUFBUUMsc0JBQVIsR0FBa0NDLGFBQUQsSUFBbUI7QUFDbEQsUUFBTUMsVUFBVTtBQUNkQyxZQUFRLEVBRE07QUFFZEMsY0FBVTtBQUZJLEdBQWhCO0FBSUFILGdCQUFjSSxPQUFkLENBQXNCQyxRQUFRO0FBQzVCLFFBQUlBLEtBQUtDLElBQUwsS0FBYyxPQUFsQixFQUEyQjtBQUN6QkwsY0FBUUMsTUFBUixDQUFlSyxJQUFmO0FBQ0VDLGNBQU1ILEtBQUtHLElBRGI7QUFFRUMsZ0JBQVFKLEtBQUtJLE1BRmY7QUFHRUMsY0FBTUMsTUFBTUMsSUFBTixDQUFXRixRQUFRTCxLQUFLSyxJQUFMLENBQVVHLFFBQVYsQ0FBbUJILElBQW5CLENBQW5CLEtBQWdEO0FBSHhELFNBSUssVUFBS1gsc0JBQUwsQ0FBNEJNLEtBQUtTLElBQWpDLENBSkw7QUFNRCxLQVBELE1BUUssSUFBSVQsS0FBS0MsSUFBTCxLQUFjLFNBQWxCLEVBQTZCO0FBQ2hDTCxjQUFRRSxRQUFSLENBQWlCSSxJQUFqQixDQUFzQjtBQUNwQkMsY0FBTUgsS0FBS0csSUFEUztBQUVwQk8sZUFBT1YsS0FBS1UsS0FGUTtBQUdwQkwsY0FBTUMsTUFBTUMsSUFBTixDQUFXRixRQUFRTCxLQUFLSyxJQUFMLENBQVVHLFFBQVYsQ0FBbUJILElBQW5CLENBQW5CLEtBQWdEO0FBSGxDLE9BQXRCO0FBS0Q7QUFDRixHQWhCRDtBQWlCQSxTQUFPVCxPQUFQO0FBQ0QsQ0F2QkQiLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxlZ2FjeUNvbnRlbnQgLSBsZWdhY3kgZGF0YWJhc2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhIG5vcm1hbGl6ZWQgc3ViQ29udGVudFxuICovXG5leHBvcnRzLnRyYW5zZm9ybUxlZ2FjeUNvbnRlbnQgPSAobGVnYWN5Q29udGVudCkgPT4ge1xuICBjb25zdCBjb250ZW50ID0ge1xuICAgIGdyb3VwczogW10sXG4gICAgcHJvamVjdHM6IFtdXG4gIH07XG4gIGxlZ2FjeUNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAoaXRlbS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBjb250ZW50Lmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBzb3J0Qnk6IGl0ZW0uc29ydEJ5LFxuICAgICAgICBpY29uOiBpY29ucy5maW5kKGljb24gPT4gaXRlbS5pY29uLmluY2x1ZGVzKGljb24pKSB8fCAnJyxcbiAgICAgICAgLi4udGhpcy50cmFuc2Zvcm1MZWdhY3lDb250ZW50KGl0ZW0ubGlzdClcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgY29udGVudC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaXRlbS5uYW1lLFxuICAgICAgICBwYXRoczogaXRlbS5wYXRocyxcbiAgICAgICAgaWNvbjogaWNvbnMuZmluZChpY29uID0+IGl0ZW0uaWNvbi5pbmNsdWRlcyhpY29uKSkgfHwgJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250ZW50O1xufTtcbiJdfQ==