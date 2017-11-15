Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint max-len: ["error", { "ignoreStrings": true }] */

exports.default = {
  dock: {
    type: 'object',
    title: 'Dock',
    properties: {
      position: {
        title: 'Position',
        type: 'string',
        default: 'right',
        enum: ['left', 'right'],
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
    order: 1
  },
  packages: {
    title: 'Packages',
    type: 'object',
    properties: {
      treeView: {
        title: 'tree-view',
        description: 'Tick to disable messing with `tree-view` package',
        type: 'boolean',
        default: false,
        order: 1
      },
      findAndReplace: {
        title: 'find-and-replace',
        description: 'Tick to disable messing with `find-and-replace` package',
        type: 'boolean',
        default: false,
        order: 2
      },
      statusBar: {
        title: 'status-bar',
        description: 'Tick to disable messing with `status-bar` package',
        type: 'boolean',
        default: false,
        order: 3
      }
    },
    order: 2
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRvY2siLCJ0eXBlIiwidGl0bGUiLCJwcm9wZXJ0aWVzIiwicG9zaXRpb24iLCJkZWZhdWx0IiwiZW51bSIsIm9yZGVyIiwiaXNWaXNpYmxlIiwiZGVzY3JpcHRpb24iLCJpc0FjdGl2ZSIsInNhdmVDaGFuZ2VzIiwicGFja2FnZXMiLCJ0cmVlVmlldyIsImZpbmRBbmRSZXBsYWNlIiwic3RhdHVzQmFyIl0sIm1hcHBpbmdzIjoiOzs7QUFBQTs7a0JBRWU7QUFDYkEsUUFBTTtBQUNKQyxVQUFNLFFBREY7QUFFSkMsV0FBTyxNQUZIO0FBR0pDLGdCQUFZO0FBQ1ZDLGdCQUFVO0FBQ1JGLGVBQU8sVUFEQztBQUVSRCxjQUFNLFFBRkU7QUFHUkksaUJBQVMsT0FIRDtBQUlSQyxjQUFNLENBQ0osTUFESSxFQUVKLE9BRkksQ0FKRTtBQVFSQyxlQUFPO0FBUkMsT0FEQTtBQVdWQyxpQkFBVztBQUNUTixlQUFPLGNBREU7QUFFVE8scUJBQWEsME9BRko7QUFHVFIsY0FBTSxTQUhHO0FBSVRJLGlCQUFTLElBSkE7QUFLVEUsZUFBTztBQUxFLE9BWEQ7QUFrQlZHLGdCQUFVO0FBQ1JSLGVBQU8sZUFEQztBQUVSTyxxQkFBYSxzUUFGTDtBQUdSUixjQUFNLFNBSEU7QUFJUkksaUJBQVMsSUFKRDtBQUtSRSxlQUFPO0FBTEMsT0FsQkE7QUF5QlZJLG1CQUFhO0FBQ1hULGVBQU8sY0FESTtBQUVYTyxxQkFBYSx3SkFGRjtBQUdYUixjQUFNLFNBSEs7QUFJWEksaUJBQVMsS0FKRTtBQUtYRSxlQUFPO0FBTEk7QUF6QkgsS0FIUjtBQW9DSkEsV0FBTztBQXBDSCxHQURPO0FBdUNiSyxZQUFVO0FBQ1JWLFdBQU8sVUFEQztBQUVSRCxVQUFNLFFBRkU7QUFHUkUsZ0JBQVk7QUFDVlUsZ0JBQVU7QUFDUlgsZUFBTyxXQURDO0FBRVJPLHFCQUFhLGtEQUZMO0FBR1JSLGNBQU0sU0FIRTtBQUlSSSxpQkFBUyxLQUpEO0FBS1JFLGVBQU87QUFMQyxPQURBO0FBUVZPLHNCQUFnQjtBQUNkWixlQUFPLGtCQURPO0FBRWRPLHFCQUFhLHlEQUZDO0FBR2RSLGNBQU0sU0FIUTtBQUlkSSxpQkFBUyxLQUpLO0FBS2RFLGVBQU87QUFMTyxPQVJOO0FBZVZRLGlCQUFXO0FBQ1RiLGVBQU8sWUFERTtBQUVUTyxxQkFBYSxtREFGSjtBQUdUUixjQUFNLFNBSEc7QUFJVEksaUJBQVMsS0FKQTtBQUtURSxlQUFPO0FBTEU7QUFmRCxLQUhKO0FBMEJSQSxXQUFPO0FBMUJDO0FBdkNHLEMiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIHsgXCJpZ25vcmVTdHJpbmdzXCI6IHRydWUgfV0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkb2NrOiB7XG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgdGl0bGU6ICdEb2NrJyxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB0aXRsZTogJ1Bvc2l0aW9uJyxcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGRlZmF1bHQ6ICdyaWdodCcsXG4gICAgICAgIGVudW06IFtcbiAgICAgICAgICAnbGVmdCcsXG4gICAgICAgICAgJ3JpZ2h0J1xuICAgICAgICBdLFxuICAgICAgICBvcmRlcjogMVxuICAgICAgfSxcbiAgICAgIGlzVmlzaWJsZToge1xuICAgICAgICB0aXRsZTogJ1Zpc2libGUgZG9jaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBzaG93IHRoZSA8ZW0+ZG9jazwvZW0+IHdoZXJlIGBQcm9qZWN0LVZpZXdlcmAgaXMgcGxhY2VkLjxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5LZWVwIGluIG1pbmQgdGhhdCB0aGlzIG1heS9vciB3aWxsIGltcGFjdCBvdGhlciA8ZW0+aXRlbXM8L2VtPiBvbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBvcmRlcjogMlxuICAgICAgfSxcbiAgICAgIGlzQWN0aXZlOiB7XG4gICAgICAgIHRpdGxlOiAnQWN0aXZhdGUgZG9jaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBtYWtlIGBQcm9qZWN0LVZpZXdlcmAgdGhlIHZpc2libGUgPGVtPml0ZW08L2VtPiBpbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uPGJyPjxicj48c3BhbiBjbGFzcz1cInB2LW5vdGljZS13YXJuaW5nXCI+d2FybmluZzo8L3NwYW4+PGJyPklmIDxlbT5pdGVtPC9lbT4gaXMgcG9zaXRpb25lZCBpbiB0aGUgbGVmdCA8ZW0+ZG9jazwvZW0+IGl0IG1heSBoaWRlIHRoZSBgdHJlZS12aWV3YCA8ZW0+aXRlbTwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDNcbiAgICAgIH0sXG4gICAgICBzYXZlQ2hhbmdlczoge1xuICAgICAgICB0aXRsZTogJ1NhdmUgQ2hhbmdlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBzYXZlIGFsbCBjaGFuZ2VzIHJlbGF0ZWQgdG8gdGhlIHBvc2l0aW9uIGFuZCB2aXNpYmlsaXR5IG9mIHRoZSBgUHJvamVjdC1WaWV3ZXJgXFwncyA8ZW0+aXRlbTwvZW0+IGluIHRoZSBwbGFjZWQgPGVtPmRvY2s8L2VtPicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiA0XG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMVxuICB9LFxuICBwYWNrYWdlczoge1xuICAgIHRpdGxlOiAnUGFja2FnZXMnLFxuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRyZWVWaWV3OiB7XG4gICAgICAgIHRpdGxlOiAndHJlZS12aWV3JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaWNrIHRvIGRpc2FibGUgbWVzc2luZyB3aXRoIGB0cmVlLXZpZXdgIHBhY2thZ2UnLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogMVxuICAgICAgfSxcbiAgICAgIGZpbmRBbmRSZXBsYWNlOiB7XG4gICAgICAgIHRpdGxlOiAnZmluZC1hbmQtcmVwbGFjZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGljayB0byBkaXNhYmxlIG1lc3Npbmcgd2l0aCBgZmluZC1hbmQtcmVwbGFjZWAgcGFja2FnZScsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiAyXG4gICAgICB9LFxuICAgICAgc3RhdHVzQmFyOiB7XG4gICAgICAgIHRpdGxlOiAnc3RhdHVzLWJhcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGljayB0byBkaXNhYmxlIG1lc3Npbmcgd2l0aCBgc3RhdHVzLWJhcmAgcGFja2FnZScsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiAzXG4gICAgICB9XG4gICAgfSxcbiAgICBvcmRlcjogMlxuICB9XG59O1xuIl19