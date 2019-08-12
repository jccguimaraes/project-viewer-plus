"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

var dependencies = _interopRequireWildcard(require("atom-package-deps"));

var _base = require("./../constants/base");

var _state = _interopRequireDefault(require("../services/state"));

var _main = _interopRequireDefault(require("./../components/main"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class MainContainer {
  /* eslint-disable-next-line require-jsdoc */
  getURI() {
    return _base.DOCK_URI;
  }
  /* eslint-disable-next-line require-jsdoc */


  getTitle() {
    return _base.DOCK_TITLE;
  }
  /* eslint-disable-next-line require-jsdoc */


  getIconName() {
    return _base.DOCK_ICON;
  }
  /* eslint-disable-next-line require-jsdoc */


  getPreferredWidth() {
    return _base.DOCK_SIZE;
  }
  /* eslint-disable-next-line require-jsdoc */


  getDefaultLocation() {
    return _base.ALLOWED_DOCKS[1];
  }
  /* eslint-disable-next-line require-jsdoc */


  getAllowedLocations() {
    return _base.ALLOWED_DOCKS;
  }
  /* eslint-disable-next-line require-jsdoc */


  async toggleFocus() {
    if (document.activeElement !== this.element) {
      this.element.focus();
    } else {
      atom.workspace.getCenter().activate();
    }
  }
  /**
   * The main container is the only Etch element that will not be passed a
   * props parameter. We want the state to handle the update of groups and
   * projects. For this matter, this is also the only component that
   * initializes groups and projects.
   */


  constructor() {
    this.subscriptions = new _atom.CompositeDisposable();
    this.isViewActive = false;
    this.groups = [];
    this.projects = [];

    _etch.default.initialize(this);

    _etch.default.setScheduler(atom.views); // addCommands does not do anything for now


    this.addCommands();
    this.addContextMenu();
  }
  /* eslint-disable-next-line require-jsdoc */


  activate(doUpdate) {
    _state.default.onDidChangeState(() => {
      this.update(_state.default.serializeGroupById());
    });

    this.isViewActive = true;

    if (doUpdate) {
      this.update(_state.default.serializeGroupById());
    }

    atom.packages.onDidActivatePackage(pkg => {
      if (pkg.name === 'file-icons') {
        this.update(_state.default.serializeGroupById());
      }
    });
    dependencies.install(_base.PLUGIN_NAME);
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    this.subscriptions.dispose();
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  addCommands() {} // this.subscriptions.add(
  //   atom.commands.add(this.element, {
  //     'core:move-up': function () {},
  //     'core:move-down': function () {},
  //     'core:move-left': function () {},
  //     'core:move-right': function () {},
  //     'core:confirm': function () {}
  //   })
  // );

  /* eslint-disable-next-line require-jsdoc */


  addContextMenu() {
    this.subscriptions.add(atom.contextMenu.add({
      '.project-viewer-plus': [{
        command: 'project-viewer-plus:add-entry',
        label: 'Add group/project...',
        shouldDisplay: evt => evt.target.nodeName === 'UL' || !evt.target.closest('li').className.includes('pv-project')
      }],
      '.project-viewer-plus .pv-group': [{
        command: 'project-viewer-plus:edit-entry',
        label: 'Edit group...'
      }, {
        command: 'project-viewer-plus:delete-entry',
        label: 'Delete group...'
      }],
      '.project-viewer-plus .pv-project': [{
        command: 'project-viewer-plus:edit-entry',
        label: 'Edit project...'
      }, {
        command: 'project-viewer-plus:delete-entry',
        label: 'Delete project...'
      }]
    }));
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    if (!this.isViewActive) {
      return _etch.default.dom("div", {
        className: "pvp-loader"
      }, _etch.default.dom("span", {
        className: "loading loading-spinner-small inline-block"
      }));
    }

    return _etch.default.dom("div", {
      className: "tool-panel project-viewer-plus",
      tabIndex: "-1"
    }, _etch.default.dom(_main.default, {
      groups: this.groups,
      projects: this.projects
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  serialize() {
    return {
      deserializer: 'project-viewer-plus/mainView'
    };
  }

}

exports.default = MainContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwidG9nZ2xlRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJlbGVtZW50IiwiZm9jdXMiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0Q2VudGVyIiwiYWN0aXZhdGUiLCJjb25zdHJ1Y3RvciIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaXNWaWV3QWN0aXZlIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInNldFNjaGVkdWxlciIsInZpZXdzIiwiYWRkQ29tbWFuZHMiLCJhZGRDb250ZXh0TWVudSIsImRvVXBkYXRlIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwicGFja2FnZXMiLCJvbkRpZEFjdGl2YXRlUGFja2FnZSIsInBrZyIsIm5hbWUiLCJkZXBlbmRlbmNpZXMiLCJpbnN0YWxsIiwiUExVR0lOX05BTUUiLCJkZXN0cm95IiwiZGlzcG9zZSIsImFkZCIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXplciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUVBOztB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QUFPO0FBQ0xDLE1BQUFBLFlBQVksRUFBRTtBQURULEtBQVA7QUFHRDs7QUFqTGdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQge1xuICBET0NLX0lDT04sXG4gIERPQ0tfVElUTEUsXG4gIERPQ0tfVVJJLFxuICBET0NLX1NJWkUsXG4gIFBMVUdJTl9OQU1FLFxuICBBTExPV0VEX0RPQ0tTLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCBNYWluQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9tYWluJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gRE9DS19USVRMRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiBET0NLX1NJWkU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXREZWZhdWx0TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBBTExPV0VEX0RPQ0tTWzFdO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1M7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB0b2dnbGVGb2N1cyAoKSB7XG4gICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkuYWN0aXZhdGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIG1haW4gY29udGFpbmVyIGlzIHRoZSBvbmx5IEV0Y2ggZWxlbWVudCB0aGF0IHdpbGwgbm90IGJlIHBhc3NlZCBhXG4gICAqIHByb3BzIHBhcmFtZXRlci4gV2Ugd2FudCB0aGUgc3RhdGUgdG8gaGFuZGxlIHRoZSB1cGRhdGUgb2YgZ3JvdXBzIGFuZFxuICAgKiBwcm9qZWN0cy4gRm9yIHRoaXMgbWF0dGVyLCB0aGlzIGlzIGFsc28gdGhlIG9ubHkgY29tcG9uZW50IHRoYXRcbiAgICogaW5pdGlhbGl6ZXMgZ3JvdXBzIGFuZCBwcm9qZWN0cy5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuaXNWaWV3QWN0aXZlID0gZmFsc2U7XG5cbiAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgICBldGNoLnNldFNjaGVkdWxlcihhdG9tLnZpZXdzKTtcblxuICAgIC8vIGFkZENvbW1hbmRzIGRvZXMgbm90IGRvIGFueXRoaW5nIGZvciBub3dcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgdGhpcy5hZGRDb250ZXh0TWVudSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWN0aXZhdGUgKGRvVXBkYXRlKSB7XG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzVmlld0FjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoZG9VcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICB9XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlKHBrZyA9PiB7XG4gICAgICBpZiAocGtnLm5hbWUgPT09ICdmaWxlLWljb25zJykge1xuICAgICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICAvLyB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgIC8vICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgLy8gICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAvLyAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge30sXG4gICAgLy8gICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHt9LFxuICAgIC8vICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge30sXG4gICAgLy8gICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7fVxuICAgIC8vICAgfSlcbiAgICAvLyApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkQ29udGV4dE1lbnUgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbnRleHRNZW51LmFkZCh7XG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdBZGQgZ3JvdXAvcHJvamVjdC4uLicsXG4gICAgICAgICAgICBzaG91bGREaXNwbGF5OiBldnQgPT5cbiAgICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1VMJyB8fFxuICAgICAgICAgICAgICAhZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmNsYXNzTmFtZS5pbmNsdWRlcygncHYtcHJvamVjdCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LWdyb3VwJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IGdyb3VwLi4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIGdyb3VwLi4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1wcm9qZWN0JzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IHByb2plY3QuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgcHJvamVjdC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmlld0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdnAtbG9hZGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibG9hZGluZyBsb2FkaW5nLXNwaW5uZXItc21hbGwgaW5saW5lLWJsb2NrXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8TWFpbkNvbXBvbmVudCBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNlcmlhbGl6ZXI6ICdwcm9qZWN0LXZpZXdlci1wbHVzL21haW5WaWV3J1xuICAgIH07XG4gIH1cbn1cbiJdfQ==