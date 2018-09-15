const list = {
  '123-asd': {
    type: 'group',
    id: '123-asd',
    name: 'group #1',
    sortBy: 'alphabetically',
    expanded: true,
    icon: 'node',
    children: ['098-zyx', '321-890']
  },
  '098-zyx': {
    type: 'group',
    id: '098-zyx',
    name: 'group #2',
    sortBy: 'position',
    expanded: false,
    icon: 'node',
    children: []
  },
  '321-890': {
    type: 'project',
    id: '321-890',
    name: 'project #1',
    icon: 'node',
    paths: ['path/to/somewhere']
  }
};

const defaultState = { groups: [], projects: [] };

module.exports = {
  defaultState,
  list
};
