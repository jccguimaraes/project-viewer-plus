/**
 *
 * @param {Object} legacyContent - legacy database object
 * @returns {Object} a normalized subContent
 */
exports.transformLegacyContent = (legacyContent) => {
  const content = {
    groups: [],
    projects: []
  };
  legacyContent.forEach(item => {
    if (item.type === 'group') {
      content.groups.push({
        name: item.name,
        sortBy: item.sortBy,
        icon: icons.find(icon => item.icon.includes(icon)) || '',
        ...this.transformLegacyContent(item.list)
      });
    }
    else if (item.type === 'project') {
      content.projects.push({
        name: item.name,
        paths: item.paths,
        icon: icons.find(icon => item.icon.includes(icon)) || ''
      });
    }
  });
  return content;
};
