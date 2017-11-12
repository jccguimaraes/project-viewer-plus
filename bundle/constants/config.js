Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
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
    order: 2
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbIm90aGVyUGFja2FnZXMiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidHlwZSIsImRlZmF1bHQiLCJvcmRlciIsImRvY2siLCJwcm9wZXJ0aWVzIiwicG9zaXRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiLCJzYXZlQ2hhbmdlcyJdLCJtYXBwaW5ncyI6Ijs7O2tCQUFlO0FBQ2JBLGlCQUFlO0FBQ2JDLFdBQU8sMEJBRE07QUFFYkMsaUJBQWEsZ0pBRkE7QUFHYkMsVUFBTSxTQUhPO0FBSWJDLGFBQVMsS0FKSTtBQUtiQyxXQUFPO0FBTE0sR0FERjtBQVFiQyxRQUFNO0FBQ0pILFVBQU0sUUFERjtBQUVKRixXQUFPLE1BRkg7QUFHSk0sZ0JBQVk7QUFDVkMsZ0JBQVU7QUFDUlAsZUFBTyxVQURDO0FBRVJFLGNBQU0sUUFGRTtBQUdSQyxpQkFBUyxPQUhEO0FBSVJLLGNBQU0sQ0FDSixNQURJLEVBRUosT0FGSSxDQUpFO0FBUVJKLGVBQU87QUFSQyxPQURBO0FBV1ZLLGlCQUFXO0FBQ1RULGVBQU8sY0FERTtBQUVUQyxxQkFBYSwwT0FGSjtBQUdUQyxjQUFNLFNBSEc7QUFJVEMsaUJBQVMsSUFKQTtBQUtUQyxlQUFPO0FBTEUsT0FYRDtBQWtCVk0sZ0JBQVU7QUFDUlYsZUFBTyxlQURDO0FBRVJDLHFCQUFhLHNRQUZMO0FBR1JDLGNBQU0sU0FIRTtBQUlSQyxpQkFBUyxJQUpEO0FBS1JDLGVBQU87QUFMQyxPQWxCQTtBQXlCVk8sbUJBQWE7QUFDWFgsZUFBTyxjQURJO0FBRVhDLHFCQUFhLHdKQUZGO0FBR1hDLGNBQU0sU0FISztBQUlYQyxpQkFBUyxLQUpFO0FBS1hDLGVBQU87QUFMSTtBQXpCSCxLQUhSO0FBb0NKQSxXQUFPO0FBcENIO0FBUk8sQyIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG90aGVyUGFja2FnZXM6IHtcbiAgICB0aXRsZTogJ01lc3Mgd2l0aCBvdGhlciBQYWNrYWdlcycsXG4gICAgZGVzY3JpcHRpb246ICdNZXNzaW5nIHdpdGggb3RoZXIgcGFja2FnZXMgY2FuIGJlIGRhbmdlcm91cyBhbmQgY2FuIGxlYWQgdG8gdW5kZXNpcmVkIGJlaGF2aW91cnMuIFNldHRpbmcgdGhpcyBvcHRpb24gdG8gYGZhbHNlYCB3aWxsIHN0b3AgbWVzc2luZyB3aXRoIHRoZW0uJyxcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgZGVmYXVsdDogZmFsc2UsXG4gICAgb3JkZXI6IDFcbiAgfSxcbiAgZG9jazoge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnRG9jaycsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgdGl0bGU6ICdQb3NpdGlvbicsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgICBlbnVtOiBbXG4gICAgICAgICAgJ2xlZnQnLFxuICAgICAgICAgICdyaWdodCdcbiAgICAgICAgXSxcbiAgICAgICAgb3JkZXI6IDFcbiAgICAgIH0sXG4gICAgICBpc1Zpc2libGU6IHtcbiAgICAgICAgdGl0bGU6ICdWaXNpYmxlIGRvY2snLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgc2hvdyB0aGUgPGVtPmRvY2s8L2VtPiB3aGVyZSBgUHJvamVjdC1WaWV3ZXJgIGlzIHBsYWNlZC48YnI+PGJyPjxzcGFuIGNsYXNzPVwicHYtbm90aWNlLXdhcm5pbmdcIj53YXJuaW5nOjwvc3Bhbj48YnI+S2VlcCBpbiBtaW5kIHRoYXQgdGhpcyBtYXkvb3Igd2lsbCBpbXBhY3Qgb3RoZXIgPGVtPml0ZW1zPC9lbT4gb24gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDJcbiAgICAgIH0sXG4gICAgICBpc0FjdGl2ZToge1xuICAgICAgICB0aXRsZTogJ0FjdGl2YXRlIGRvY2snLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgbWFrZSBgUHJvamVjdC1WaWV3ZXJgIHRoZSB2aXNpYmxlIDxlbT5pdGVtPC9lbT4gaW4gdGhlIHBsYWNlZCA8ZW0+ZG9jazwvZW0+Ljxicj48YnI+PHNwYW4gY2xhc3M9XCJwdi1ub3RpY2Utd2FybmluZ1wiPndhcm5pbmc6PC9zcGFuPjxicj5JZiA8ZW0+aXRlbTwvZW0+IGlzIHBvc2l0aW9uZWQgaW4gdGhlIGxlZnQgPGVtPmRvY2s8L2VtPiBpdCBtYXkgaGlkZSB0aGUgYHRyZWUtdmlld2AgPGVtPml0ZW08L2VtPi4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIG9yZGVyOiAzXG4gICAgICB9LFxuICAgICAgc2F2ZUNoYW5nZXM6IHtcbiAgICAgICAgdGl0bGU6ICdTYXZlIENoYW5nZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgc2F2ZSBhbGwgY2hhbmdlcyByZWxhdGVkIHRvIHRoZSBwb3NpdGlvbiBhbmQgdmlzaWJpbGl0eSBvZiB0aGUgYFByb2plY3QtVmlld2VyYFxcJ3MgPGVtPml0ZW08L2VtPiBpbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogNFxuICAgICAgfVxuICAgIH0sXG4gICAgb3JkZXI6IDJcbiAgfVxufTtcbiJdfQ==