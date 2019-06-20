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
        description: 'In which dock to position `project-viewer-plus`. Only valid for new Atom instances',
        type: 'string',
        default: 'right',
        enum: ['left', 'right'],
        order: 1
      },
      isVisible: {
        title: 'Visible dock',
        description:
          'If set to `true`, it will show the <em>dock</em> where `project-viewer-plus` is placed.<br><br><span class="pv-notice-warning">warning:</span><br>Keep in mind that this may/or will impact other <em>items</em> on the placed <em>dock</em>.',
        type: 'boolean',
        default: true,
        order: 2
      },
      isActive: {
        title: 'Activate dock',
        description:
          'If set to `true`, it will make `project-viewer-plus` the visible <em>item</em> in the placed <em>dock</em>.<br><br><span class="pv-notice-warning">warning:</span><br>If <em>item</em> is positioned in the left <em>dock</em> it may hide the `tree-view` <em>item</em>.',
        type: 'boolean',
        default: true,
        order: 3
      }
    },
    order: 2
  }
};
