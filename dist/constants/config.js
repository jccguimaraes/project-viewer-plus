'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint max-len: ["error", { "ignoreStrings": true }] */

exports.default = {
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
        enum: ['left', 'right'],
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
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb25zdGFudHMvY29uZmlnLmpzIl0sIm5hbWVzIjpbImRhdGFiYXNlIiwidHlwZSIsInRpdGxlIiwicHJvcGVydGllcyIsImxvY2FsUGF0aCIsImRlZmF1bHQiLCJhdG9tIiwiZ2V0Q29uZmlnRGlyUGF0aCIsIm9yZGVyIiwiZG9jayIsInBvc2l0aW9uIiwiZGVzY3JpcHRpb24iLCJlbnVtIiwiaXNWaXNpYmxlIiwiaXNBY3RpdmUiLCJwYWNrYWdlcyIsInRyZWVWaWV3IiwiZmluZEFuZFJlcGxhY2UiLCJzdGF0dXNCYXIiLCJsaW50ZXIiLCJnaXRodWIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O2tCQUVlO0FBQ2JBLFlBQVU7QUFDUkMsVUFBTSxRQURFO0FBRVJDLFdBQU8sVUFGQztBQUdSQyxnQkFBWTtBQUNWQyxpQkFBVztBQUNURixlQUFPLDZCQURFO0FBRVRELGNBQU0sUUFGRztBQUdUSSxpQkFBU0MsS0FBS0MsZ0JBQUwsRUFIQTtBQUlUQyxlQUFPO0FBSkU7QUFERCxLQUhKO0FBV1JBLFdBQU87QUFYQyxHQURHO0FBY2JDLFFBQU07QUFDSlIsVUFBTSxRQURGO0FBRUpDLFdBQU8sTUFGSDtBQUdKQyxnQkFBWTtBQUNWTyxnQkFBVTtBQUNSUixlQUFPLFVBREM7QUFFUlMscUJBQWEsa0RBRkw7QUFHUlYsY0FBTSxRQUhFO0FBSVJJLGlCQUFTLE9BSkQ7QUFLUk8sY0FBTSxDQUFDLE1BQUQsRUFBUyxPQUFULENBTEU7QUFNUkosZUFBTztBQU5DLE9BREE7QUFTVkssaUJBQVc7QUFDVFgsZUFBTyxjQURFO0FBRVRTLHFCQUNFLCtPQUhPO0FBSVRWLGNBQU0sU0FKRztBQUtUSSxpQkFBUyxJQUxBO0FBTVRHLGVBQU87QUFORSxPQVREO0FBaUJWTSxnQkFBVTtBQUNSWixlQUFPLGVBREM7QUFFUlMscUJBQ0UsMlFBSE07QUFJUlYsY0FBTSxTQUpFO0FBS1JJLGlCQUFTLElBTEQ7QUFNUkcsZUFBTztBQU5DO0FBakJBLEtBSFI7QUE2QkpBLFdBQU87QUE3QkgsR0FkTztBQTZDYk8sWUFBVTtBQUNSYixXQUFPLFVBREM7QUFFUkQsVUFBTSxRQUZFO0FBR1JFLGdCQUFZO0FBQ1ZhLGdCQUFVO0FBQ1JkLGVBQU8sV0FEQztBQUVSUyxxQkFBYSxtREFGTDtBQUdSVixjQUFNLFNBSEU7QUFJUkksaUJBQVMsS0FKRDtBQUtSRyxlQUFPO0FBTEMsT0FEQTtBQVFWUyxzQkFBZ0I7QUFDZGYsZUFBTyxrQkFETztBQUVkUyxxQkFBYSwwREFGQztBQUdkVixjQUFNLFNBSFE7QUFJZEksaUJBQVMsS0FKSztBQUtkRyxlQUFPO0FBTE8sT0FSTjtBQWVWVSxpQkFBVztBQUNUaEIsZUFBTyxZQURFO0FBRVRTLHFCQUFhLG9EQUZKO0FBR1RWLGNBQU0sU0FIRztBQUlUSSxpQkFBUyxLQUpBO0FBS1RHLGVBQU87QUFMRSxPQWZEO0FBc0JWVyxjQUFRO0FBQ05qQixlQUFPLDRCQUREO0FBRU5TLHFCQUNFLHlFQUhJO0FBSU5WLGNBQU0sU0FKQTtBQUtOSSxpQkFBUyxLQUxIO0FBTU5HLGVBQU87QUFORCxPQXRCRTtBQThCVlksY0FBUTtBQUNObEIsZUFBTyxRQUREO0FBRU5TLHFCQUFhLGdEQUZQO0FBR05WLGNBQU0sU0FIQTtBQUlOSSxpQkFBUyxLQUpIO0FBS05HLGVBQU87QUFMRDtBQTlCRSxLQUhKO0FBeUNSQSxXQUFPO0FBekNDO0FBN0NHLEMiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIHsgXCJpZ25vcmVTdHJpbmdzXCI6IHRydWUgfV0gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhYmFzZToge1xuICAgIHR5cGU6ICdvYmplY3QnLFxuICAgIHRpdGxlOiAnRGF0YWJhc2UnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIGxvY2FsUGF0aDoge1xuICAgICAgICB0aXRsZTogJ1BhdGggdG8gbG9jYWwgZGF0YWJhc2UgZmlsZScsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiBhdG9tLmdldENvbmZpZ0RpclBhdGgoKSxcbiAgICAgICAgb3JkZXI6IDFcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yZGVyOiAxXG4gIH0sXG4gIGRvY2s6IHtcbiAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICB0aXRsZTogJ0RvY2snLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRpdGxlOiAnUG9zaXRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0luIHdoaWNoIGRvY2sgdG8gcG9zaXRpb24gYHByb2plY3Qtdmlld2VyLXBsdXNgLicsXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgICBlbnVtOiBbJ2xlZnQnLCAncmlnaHQnXSxcbiAgICAgICAgb3JkZXI6IDFcbiAgICAgIH0sXG4gICAgICBpc1Zpc2libGU6IHtcbiAgICAgICAgdGl0bGU6ICdWaXNpYmxlIGRvY2snLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICAnSWYgc2V0IHRvIGB0cnVlYCwgaXQgd2lsbCBzaG93IHRoZSA8ZW0+ZG9jazwvZW0+IHdoZXJlIGBwcm9qZWN0LXZpZXdlci1wbHVzYCBpcyBwbGFjZWQuPGJyPjxicj48c3BhbiBjbGFzcz1cInB2LW5vdGljZS13YXJuaW5nXCI+d2FybmluZzo8L3NwYW4+PGJyPktlZXAgaW4gbWluZCB0aGF0IHRoaXMgbWF5L29yIHdpbGwgaW1wYWN0IG90aGVyIDxlbT5pdGVtczwvZW0+IG9uIHRoZSBwbGFjZWQgPGVtPmRvY2s8L2VtPi4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgIG9yZGVyOiAyXG4gICAgICB9LFxuICAgICAgaXNBY3RpdmU6IHtcbiAgICAgICAgdGl0bGU6ICdBY3RpdmF0ZSBkb2NrJyxcbiAgICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgICAgJ0lmIHNldCB0byBgdHJ1ZWAsIGl0IHdpbGwgbWFrZSBgcHJvamVjdC12aWV3ZXItcGx1c2AgdGhlIHZpc2libGUgPGVtPml0ZW08L2VtPiBpbiB0aGUgcGxhY2VkIDxlbT5kb2NrPC9lbT4uPGJyPjxicj48c3BhbiBjbGFzcz1cInB2LW5vdGljZS13YXJuaW5nXCI+d2FybmluZzo8L3NwYW4+PGJyPklmIDxlbT5pdGVtPC9lbT4gaXMgcG9zaXRpb25lZCBpbiB0aGUgbGVmdCA8ZW0+ZG9jazwvZW0+IGl0IG1heSBoaWRlIHRoZSBgdHJlZS12aWV3YCA8ZW0+aXRlbTwvZW0+LicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgb3JkZXI6IDNcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yZGVyOiAyXG4gIH0sXG4gIHBhY2thZ2VzOiB7XG4gICAgdGl0bGU6ICdQYWNrYWdlcycsXG4gICAgdHlwZTogJ29iamVjdCcsXG4gICAgcHJvcGVydGllczoge1xuICAgICAgdHJlZVZpZXc6IHtcbiAgICAgICAgdGl0bGU6ICd0cmVlLXZpZXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RpY2sgdG8gZGlzYWJsZSBtZXNzaW5nIHdpdGggYHRyZWUtdmlld2AgcGFja2FnZS4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogMVxuICAgICAgfSxcbiAgICAgIGZpbmRBbmRSZXBsYWNlOiB7XG4gICAgICAgIHRpdGxlOiAnZmluZC1hbmQtcmVwbGFjZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGljayB0byBkaXNhYmxlIG1lc3Npbmcgd2l0aCBgZmluZC1hbmQtcmVwbGFjZWAgcGFja2FnZS4nLFxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBvcmRlcjogMlxuICAgICAgfSxcbiAgICAgIHN0YXR1c0Jhcjoge1xuICAgICAgICB0aXRsZTogJ3N0YXR1cy1iYXInLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1RpY2sgdG8gZGlzYWJsZSBtZXNzaW5nIHdpdGggYHN0YXR1cy1iYXJgIHBhY2thZ2UuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDNcbiAgICAgIH0sXG4gICAgICBsaW50ZXI6IHtcbiAgICAgICAgdGl0bGU6ICdsaW50ZXIgJiBsaW50ZXItdWktZGVmYXVsdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICAgICdUaWNrIHRvIGRpc2FibGUgbWVzc2luZyB3aXRoIGBsaW50ZXJgIGFuZCBgbGludGVyLXVpLWRlZmF1bHRgIHBhY2thZ2VzLicsXG4gICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgIG9yZGVyOiA0XG4gICAgICB9LFxuICAgICAgZ2l0aHViOiB7XG4gICAgICAgIHRpdGxlOiAnZ2l0aHViJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaWNrIHRvIGRpc2FibGUgbWVzc2luZyB3aXRoIGBnaXRodWJgIHBhY2thZ2UuJyxcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgb3JkZXI6IDVcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yZGVyOiAzXG4gIH1cbn07XG4iXX0=