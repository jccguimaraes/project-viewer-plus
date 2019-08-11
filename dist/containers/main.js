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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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


  toggleVisibility() {
    atom.workspace.toggle(_base.DOCK_URI);
  }
  /**
   * Focus PVP on the current dock if visible
   */


  focusMainItem() {
    atom.workspace.paneForURI(this.getURI()).activateItem(this); // this.element.focus();
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleFocus() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (document.activeElement !== _this.element) {
        _this.element.focus();
      } else {
        atom.workspace.getCenter().activate();
      }
    })();
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
        console.log(pkg);
        this.update(_state.default.serializeGroupById());
      }
    });
    dependencies.install(_base.PLUGIN_NAME);
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.subscriptions.dispose();

      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  addCommands() {
    this.subscriptions.add(atom.commands.add(this.element, {
      'core:move-up': function coreMoveUp() {
        console.log('up');
      },
      'core:move-down': function coreMoveDown() {},
      'core:move-left': function coreMoveLeft() {},
      'core:move-right': function coreMoveRight() {},
      'core:confirm': function coreConfirm() {}
    }));
  }
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


  update(props) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this3.groups = props.groups;
        _this3.projects = props.projects;
        return _etch.default.update(_this3);
      }

      return Promise.resolve();
    })();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwidG9nZ2xlVmlzaWJpbGl0eSIsImF0b20iLCJ3b3Jrc3BhY2UiLCJ0b2dnbGUiLCJmb2N1c01haW5JdGVtIiwicGFuZUZvclVSSSIsImFjdGl2YXRlSXRlbSIsInRvZ2dsZUZvY3VzIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiZWxlbWVudCIsImZvY3VzIiwiZ2V0Q2VudGVyIiwiYWN0aXZhdGUiLCJjb25zdHJ1Y3RvciIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaXNWaWV3QWN0aXZlIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJkb1VwZGF0ZSIsInN0YXRlIiwib25EaWRDaGFuZ2VTdGF0ZSIsInVwZGF0ZSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZVBhY2thZ2UiLCJwa2ciLCJuYW1lIiwiY29uc29sZSIsImxvZyIsImRlcGVuZGVuY2llcyIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiYWRkIiwiY29tbWFuZHMiLCJjb250ZXh0TWVudSIsImNvbW1hbmQiLCJsYWJlbCIsInNob3VsZERpc3BsYXkiLCJldnQiLCJ0YXJnZXQiLCJub2RlTmFtZSIsImNsb3Nlc3QiLCJjbGFzc05hbWUiLCJpbmNsdWRlcyIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5k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REY7QUFpQ0Q7QUFFRDs7Ozs7OztBQUtNakIsRUFBQUEsTUFBTixDQUFjeUIsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsTUFBSSxDQUFDbEMsTUFBTCxHQUFja0MsS0FBSyxDQUFDbEMsTUFBcEI7QUFDQSxRQUFBLE1BQUksQ0FBQ0MsUUFBTCxHQUFnQmlDLEtBQUssQ0FBQ2pDLFFBQXRCO0FBRUEsZUFBT0MsY0FBS08sTUFBTCxDQUFZLE1BQVosQ0FBUDtBQUNEOztBQUVELGFBQU8wQixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsUUFBSSxDQUFDLEtBQUt0QyxZQUFWLEVBQXdCO0FBQ3RCLGFBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQ0U7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixRQURGLENBREY7QUFLRDs7QUFFRCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUMsZ0NBQWY7QUFBZ0QsTUFBQSxRQUFRLEVBQUM7QUFBekQsT0FDRSxrQkFBQyxhQUFEO0FBQWUsTUFBQSxNQUFNLEVBQUUsS0FBS0MsTUFBNUI7QUFBb0MsTUFBQSxRQUFRLEVBQUUsS0FBS0M7QUFBbkQsTUFERixDQURGO0FBS0Q7QUFFRDs7O0FBQ0FxQyxFQUFBQSxTQUFTLEdBQUk7QUFDWCxXQUFPO0FBQ0xDLE1BQUFBLFlBQVksRUFBRTtBQURULEtBQVA7QUFHRDs7QUE3TGdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgKiBhcyBkZXBlbmRlbmNpZXMgZnJvbSAnYXRvbS1wYWNrYWdlLWRlcHMnO1xuXG5pbXBvcnQge1xuICBET0NLX0lDT04sXG4gIERPQ0tfVElUTEUsXG4gIERPQ0tfVVJJLFxuICBET0NLX1NJWkUsXG4gIFBMVUdJTl9OQU1FLFxuICBBTExPV0VEX0RPQ0tTLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCBNYWluQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9tYWluJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gRE9DS19USVRMRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiBET0NLX1NJWkU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXREZWZhdWx0TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBBTExPV0VEX0RPQ0tTWzFdO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1M7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUoRE9DS19VUkkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIFBWUCBvbiB0aGUgY3VycmVudCBkb2NrIGlmIHZpc2libGVcbiAgICovXG4gIGZvY3VzTWFpbkl0ZW0gKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSkuYWN0aXZhdGVJdGVtKHRoaXMpO1xuICAgIC8vIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdG9nZ2xlRm9jdXMgKCkge1xuICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGF0b20ud29ya3NwYWNlLmdldENlbnRlcigpLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYWluIGNvbnRhaW5lciBpcyB0aGUgb25seSBFdGNoIGVsZW1lbnQgdGhhdCB3aWxsIG5vdCBiZSBwYXNzZWQgYVxuICAgKiBwcm9wcyBwYXJhbWV0ZXIuIFdlIHdhbnQgdGhlIHN0YXRlIHRvIGhhbmRsZSB0aGUgdXBkYXRlIG9mIGdyb3VwcyBhbmRcbiAgICogcHJvamVjdHMuIEZvciB0aGlzIG1hdHRlciwgdGhpcyBpcyBhbHNvIHRoZSBvbmx5IGNvbXBvbmVudCB0aGF0XG4gICAqIGluaXRpYWxpemVzIGdyb3VwcyBhbmQgcHJvamVjdHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmlzVmlld0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgdGhpcy5hZGRDb250ZXh0TWVudSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWN0aXZhdGUgKGRvVXBkYXRlKSB7XG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzVmlld0FjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoZG9VcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICB9XG5cbiAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlKHBrZyA9PiB7XG4gICAgICBpZiAocGtnLm5hbWUgPT09ICdmaWxlLWljb25zJykge1xuICAgICAgICBjb25zb2xlLmxvZyhwa2cpO1xuICAgICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkZXBlbmRlbmNpZXMuaW5zdGFsbChQTFVHSU5fTkFNRSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCd1cCcpO30sXG4gICAgICAgICdjb3JlOm1vdmUtZG93bic6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICAnY29yZTptb3ZlLWxlZnQnOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgJ2NvcmU6bW92ZS1yaWdodCc6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICAnY29yZTpjb25maXJtJzogZnVuY3Rpb24gKCkge31cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbnRleHRNZW51ICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb250ZXh0TWVudS5hZGQoe1xuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6YWRkLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQWRkIGdyb3VwL3Byb2plY3QuLi4nLFxuICAgICAgICAgICAgc2hvdWxkRGlzcGxheTogZXZ0ID0+XG4gICAgICAgICAgICAgIGV2dC50YXJnZXQubm9kZU5hbWUgPT09ICdVTCcgfHxcbiAgICAgICAgICAgICAgIWV2dC50YXJnZXQuY2xvc2VzdCgnbGknKS5jbGFzc05hbWUuaW5jbHVkZXMoJ3B2LXByb2plY3QnKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1ncm91cCc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRWRpdCBncm91cC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBncm91cC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtcHJvamVjdCc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czplZGl0LWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRWRpdCBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIHByb2plY3QuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGlmICghdGhpcy5pc1ZpZXdBY3RpdmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHZwLWxvYWRlclwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxvYWRpbmcgbG9hZGluZy1zcGlubmVyLXNtYWxsIGlubGluZS1ibG9ja1wiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2wtcGFuZWwgcHJvamVjdC12aWV3ZXItcGx1c1wiIHRhYkluZGV4PVwiLTFcIj5cbiAgICAgICAgPE1haW5Db21wb25lbnQgZ3JvdXBzPXt0aGlzLmdyb3Vwc30gcHJvamVjdHM9e3RoaXMucHJvamVjdHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgc2VyaWFsaXplICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGVzZXJpYWxpemVyOiAncHJvamVjdC12aWV3ZXItcGx1cy9tYWluVmlldydcbiAgICB9O1xuICB9XG59XG4iXX0=