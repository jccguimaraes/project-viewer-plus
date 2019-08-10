"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

var _base = require("./../constants/base");

var _state = _interopRequireDefault(require("../services/state"));

var _main = _interopRequireDefault(require("./../components/main"));

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
    return atom.config.get("".concat(_base.PLUGIN_NAME, ".dock.position")) || _base.ALLOWED_DOCKS[1];
  }
  /* eslint-disable-next-line require-jsdoc */


  getAllowedLocations() {
    return _base.ALLOWED_DOCKS;
  }
  /* eslint-disable-next-line require-jsdoc */
  // isPermanentDockItem () {
  //   return true;
  // }

  /* eslint-disable-next-line require-jsdoc */


  toggleVisibility() {
    atom.workspace.toggle(_base.DOCK_URI); // this.isInDock() ? this.destroyMainItem() : this.addMainItem();
  }
  /* eslint-disable-next-line require-jsdoc */


  isInDock() {
    return !!atom.workspace.paneForURI(this.getURI());
  }
  /* eslint-disable-next-line require-jsdoc */


  destroyMainItem() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.toggleVisibility();

      _this.destroy();
    })();
  }
  /**
   * Focus PVP on the current dock if visible
   */


  focusMainItem() {
    atom.workspace.paneForURI(this.getURI()).activateItem(this); // this.element.focus();
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleFocus() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.isInDock()) {
        return;
      }

      if (atom.workspace.getActivePaneContainer().getActivePaneItem() !== _this2) {//   this.activePane = atom.workspace.getActivePane();
        //   this.activePaneItem = atom.workspace.getActivePaneItem();
        //   this.activeElement = document.activeElement;
        //   this.focusMainItem();
      } else if (_this2.activePane && _this2.activePaneItem) {//   this.activePane.activateItem(this.activePaneItem);
        //   this.activeElement.focus();
        //   delete this.activePane;
        //   delete this.activePaneItem;
        //   delete this.activeElement;
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
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      _this3.subscriptions.dispose();

      yield _etch.default.destroy(_this3);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  addCommands() {
    this.subscriptions.add(atom.commands.add(this.element, {
      'core:move-up': function coreMoveUp() {},
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
    var _this4 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this4.groups = props.groups;
        _this4.projects = props.projects;
        return _etch.default.update(_this4);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwidG9nZ2xlVmlzaWJpbGl0eSIsIndvcmtzcGFjZSIsInRvZ2dsZSIsImlzSW5Eb2NrIiwicGFuZUZvclVSSSIsImRlc3Ryb3lNYWluSXRlbSIsImRlc3Ryb3kiLCJmb2N1c01haW5JdGVtIiwiYWN0aXZhdGVJdGVtIiwidG9nZ2xlRm9jdXMiLCJnZXRBY3RpdmVQYW5lQ29udGFpbmVyIiwiZ2V0QWN0aXZlUGFuZUl0ZW0iLCJhY3RpdmVQYW5lIiwiYWN0aXZlUGFuZUl0ZW0iLCJjb25zdHJ1Y3RvciIsInN1YnNjcmlwdGlvbnMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiaXNWaWV3QWN0aXZlIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImFkZENvbW1hbmRzIiwiYWRkQ29udGV4dE1lbnUiLCJhY3RpdmF0ZSIsImRvVXBkYXRlIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiZGlzcG9zZSIsImFkZCIsImNvbW1hbmRzIiwiZWxlbWVudCIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciIsInNlcmlhbGl6ZSIs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RUQsUUFBQUEsT0FBTyxFQUFFLGtDQURYO0FBRUVDLFFBQUFBLEtBQUssRUFBRTtBQUZULE9BTGtDO0FBcEJqQixLQUFyQixDQURGO0FBaUNEO0FBRUQ7Ozs7Ozs7QUFLTVIsRUFBQUEsTUFBTixDQUFjZ0IsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsTUFBSSxDQUFDMUIsTUFBTCxHQUFjMEIsS0FBSyxDQUFDMUIsTUFBcEI7QUFDQSxRQUFBLE1BQUksQ0FBQ0MsUUFBTCxHQUFnQnlCLEtBQUssQ0FBQ3pCLFFBQXRCO0FBRUEsZUFBT0MsY0FBS1EsTUFBTCxDQUFZLE1BQVosQ0FBUDtBQUNEOztBQUVELGFBQU9pQixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVJtQjtBQVNwQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsUUFBSSxDQUFDLEtBQUs5QixZQUFWLEVBQXdCO0FBQ3RCLGFBQ0U7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLFNBQ0U7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixRQURGLENBREY7QUFLRDs7QUFFRCxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUMsZ0NBQWY7QUFBZ0QsTUFBQSxRQUFRLEVBQUM7QUFBekQsT0FDRSxrQkFBQyxhQUFEO0FBQWUsTUFBQSxNQUFNLEVBQUUsS0FBS0MsTUFBNUI7QUFBb0MsTUFBQSxRQUFRLEVBQUUsS0FBS0M7QUFBbkQsTUFERixDQURGO0FBS0Q7QUFFRDs7O0FBQ0E2QixFQUFBQSxTQUFTLEdBQUk7QUFDWCxXQUFPO0FBQ0xDLE1BQUFBLFlBQVksRUFBRTtBQURULEtBQVA7QUFHRDs7QUFoTmdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSwgRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCB7XG4gIERPQ0tfSUNPTixcbiAgRE9DS19USVRMRSxcbiAgRE9DS19VUkksXG4gIERPQ0tfU0laRSxcbiAgUExVR0lOX05BTUUsXG4gIEFMTE9XRURfRE9DS1MsXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IE1haW5Db21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL21haW4nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiBET0NLX1RJVExFO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0SWNvbk5hbWUgKCkge1xuICAgIHJldHVybiBET0NLX0lDT047XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIERPQ0tfU0laRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldERlZmF1bHRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5wb3NpdGlvbmApIHx8IEFMTE9XRURfRE9DS1NbMV07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9ET0NLUztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIC8vIGlzUGVybWFuZW50RG9ja0l0ZW0gKCkge1xuICAvLyAgIHJldHVybiB0cnVlO1xuICAvLyB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdG9nZ2xlVmlzaWJpbGl0eSAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2UudG9nZ2xlKERPQ0tfVVJJKTtcbiAgICAvLyB0aGlzLmlzSW5Eb2NrKCkgPyB0aGlzLmRlc3Ryb3lNYWluSXRlbSgpIDogdGhpcy5hZGRNYWluSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaXNJbkRvY2sgKCkge1xuICAgIHJldHVybiAhIWF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95TWFpbkl0ZW0gKCkge1xuICAgIHRoaXMudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIFBWUCBvbiB0aGUgY3VycmVudCBkb2NrIGlmIHZpc2libGVcbiAgICovXG4gIGZvY3VzTWFpbkl0ZW0gKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSkuYWN0aXZhdGVJdGVtKHRoaXMpO1xuICAgIC8vIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdG9nZ2xlRm9jdXMgKCkge1xuICAgIGlmICghdGhpcy5pc0luRG9jaygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVDb250YWluZXIoKS5nZXRBY3RpdmVQYW5lSXRlbSgpICE9PSB0aGlzKSB7XG4gICAgLy8gICB0aGlzLmFjdGl2ZVBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCk7XG4gICAgLy8gICB0aGlzLmFjdGl2ZVBhbmVJdGVtID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICAvLyAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgLy8gICB0aGlzLmZvY3VzTWFpbkl0ZW0oKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5hY3RpdmVQYW5lICYmIHRoaXMuYWN0aXZlUGFuZUl0ZW0pIHtcbiAgICAvLyAgIHRoaXMuYWN0aXZlUGFuZS5hY3RpdmF0ZUl0ZW0odGhpcy5hY3RpdmVQYW5lSXRlbSk7XG4gICAgLy8gICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAvLyAgIGRlbGV0ZSB0aGlzLmFjdGl2ZVBhbmU7XG4gICAgLy8gICBkZWxldGUgdGhpcy5hY3RpdmVQYW5lSXRlbTtcbiAgICAvLyAgIGRlbGV0ZSB0aGlzLmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYWluIGNvbnRhaW5lciBpcyB0aGUgb25seSBFdGNoIGVsZW1lbnQgdGhhdCB3aWxsIG5vdCBiZSBwYXNzZWQgYVxuICAgKiBwcm9wcyBwYXJhbWV0ZXIuIFdlIHdhbnQgdGhlIHN0YXRlIHRvIGhhbmRsZSB0aGUgdXBkYXRlIG9mIGdyb3VwcyBhbmRcbiAgICogcHJvamVjdHMuIEZvciB0aGlzIG1hdHRlciwgdGhpcyBpcyBhbHNvIHRoZSBvbmx5IGNvbXBvbmVudCB0aGF0XG4gICAqIGluaXRpYWxpemVzIGdyb3VwcyBhbmQgcHJvamVjdHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmlzVmlld0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICB0aGlzLnByb2plY3RzID0gW107XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG4gICAgdGhpcy5hZGRDb250ZXh0TWVudSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWN0aXZhdGUgKGRvVXBkYXRlKSB7XG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzVmlld0FjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAoZG9VcGRhdGUpIHtcbiAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZENvbW1hbmRzICgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgYXRvbS5jb21tYW5kcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgICAgICdjb3JlOm1vdmUtdXAnOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgJ2NvcmU6bW92ZS1kb3duJzogZnVuY3Rpb24gKCkge30sXG4gICAgICAgICdjb3JlOm1vdmUtbGVmdCc6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICAnY29yZTptb3ZlLXJpZ2h0JzogZnVuY3Rpb24gKCkge30sXG4gICAgICAgICdjb3JlOmNvbmZpcm0nOiBmdW5jdGlvbiAoKSB7fVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkQ29udGV4dE1lbnUgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbnRleHRNZW51LmFkZCh7XG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyc6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czphZGQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdBZGQgZ3JvdXAvcHJvamVjdC4uLicsXG4gICAgICAgICAgICBzaG91bGREaXNwbGF5OiBldnQgPT5cbiAgICAgICAgICAgICAgZXZ0LnRhcmdldC5ub2RlTmFtZSA9PT0gJ1VMJyB8fFxuICAgICAgICAgICAgICAhZXZ0LnRhcmdldC5jbG9zZXN0KCdsaScpLmNsYXNzTmFtZS5pbmNsdWRlcygncHYtcHJvamVjdCcpXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LWdyb3VwJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IGdyb3VwLi4uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZGVsZXRlLWVudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnRGVsZXRlIGdyb3VwLi4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzIC5wdi1wcm9qZWN0JzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmVkaXQtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdFZGl0IHByb2plY3QuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgcHJvamVjdC4uLidcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmlld0FjdGl2ZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdnAtbG9hZGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibG9hZGluZyBsb2FkaW5nLXNwaW5uZXItc21hbGwgaW5saW5lLWJsb2NrXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8TWFpbkNvbXBvbmVudCBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBzZXJpYWxpemUgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkZXNlcmlhbGl6ZXI6ICdwcm9qZWN0LXZpZXdlci1wbHVzL21haW5WaWV3J1xuICAgIH07XG4gIH1cbn1cbiJdfQ==