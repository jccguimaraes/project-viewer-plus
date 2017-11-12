export default {
  otherPackages: {
    title: 'Mess with other Packages',
    description: 'Messing with other packages can be dangerous and can lead to undesired behaviours. Setting this option to `false` will stop messing with them.',
    type: 'boolean',
    default: false,
    order: 1
  },
  dock: {
    type: 'object',
    title: 'Dock',
    properties: {
      position: {
        title: 'Position',
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
        description: 'If set to `true`, it will show the <em>dock</em> where `Project-Viewer` is placed.<br><br><span class="pv-notice-warning">warning:</span><br>Keep in mind that this may/or will impact other <em>items</em> on the placed <em>dock</em>.',
        type: 'boolean',
        default: true,
        order: 2
      },
      isActive: {
        title: 'Activate dock',
        description: 'If set to `true`, it will make `Project-Viewer` the visible <em>item</em> in the placed <em>dock</em>.<br><br><span class="pv-notice-warning">warning:</span><br>If <em>item</em> is positioned in the left <em>dock</em> it may hide the `tree-view` <em>item</em>.',
        type: 'boolean',
        default: true,
        order: 3
      },
      saveChanges: {
        title: 'Save Changes',
        description: 'If set to `true`, it will save all changes related to the position and visibility of the `Project-Viewer`\'s <em>item</em> in the placed <em>dock</em>',
        type: 'boolean',
        default: false,
        order: 4
      }
    },
    order: 2
  }
};
