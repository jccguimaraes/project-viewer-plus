/* eslint max-len: ["error", { "ignoreStrings": true }] */

export default {
  database: {
    type: 'object',
    title: 'Database',
    properties: {
      localPath: {
        title: 'Path to local database file',
        type: 'string',
        default: atom.getConfigDirPath(),
        order: 1
      }
    },
    order: 1
  },
  dock: {
    type: 'object',
    title: 'Dock',
    properties: {
      position: {
        title: 'Position',
        description: 'In which dock to position `project-viewer-plus`.',
        type: 'string',
        default: 'right',
        enum: [
          'left',
          'right'
        ],
        order: 1
      },
      isVisible: {
        title: 'Visible dock',
        description: 'If set to `true`, it will show the <em>dock</em> where `project-viewer-plus` is placed.<br><br><span class="pv-notice-warning">warning:</span><br>Keep in mind that this may/or will impact other <em>items</em> on the placed <em>dock</em>.',
        type: 'boolean',
        default: true,
        order: 2
      },
      isActive: {
        title: 'Activate dock',
        description: 'If set to `true`, it will make `project-viewer-plus` the visible <em>item</em> in the placed <em>dock</em>.<br><br><span class="pv-notice-warning">warning:</span><br>If <em>item</em> is positioned in the left <em>dock</em> it may hide the `tree-view` <em>item</em>.',
        type: 'boolean',
        default: true,
        order: 3
      },
      saveChanges: {
        title: 'Save Changes',
        description: 'If set to `true`, it will save all changes related to the position and visibility of the `project-viewer-plus`\'s <em>item</em> in the placed <em>dock</em>.',
        type: 'boolean',
        default: false,
        order: 4
      }
    },
    order: 2
  },
  packages: {
    title: 'Packages',
    type: 'object',
    properties: {
      treeView: {
        title: 'tree-view',
        description: 'Tick to disable messing with `tree-view` package.',
        type: 'boolean',
        default: false,
        order: 1
      },
      findAndReplace: {
        title: 'find-and-replace',
        description: 'Tick to disable messing with `find-and-replace` package.',
        type: 'boolean',
        default: false,
        order: 2
      },
      statusBar: {
        title: 'status-bar',
        description: 'Tick to disable messing with `status-bar` package.',
        type: 'boolean',
        default: false,
        order: 3
      },
      linter: {
        title: 'linter & linter-ui-default',
        description: 'Tick to disable messing with `linter` and `linter-ui-default` packages.',
        type: 'boolean',
        default: false,
        order: 4
      },
      github: {
        title: 'github',
        description: 'Tick to disable messing with `github` package.',
        type: 'boolean',
        default: false,
        order: 5
      }
    },
    order: 3
  }
};
