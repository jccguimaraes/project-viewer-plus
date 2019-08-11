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

    _etch.default.initialize(this); // addCommands does not do anything for now
    // this.addCommands();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiZm9jdXNNYWluSXRlbSIsImF0b20iLCJ3b3Jrc3BhY2UiLCJwYW5lRm9yVVJJIiwiYWN0aXZhdGVJdGVtIiwidG9nZ2xlRm9jdXMiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJlbGVtZW50IiwiZm9jdXMiLCJnZXRDZW50ZXIiLCJhY3RpdmF0ZSIsImNvbnN0cnVjdG9yIiwic3Vic2NyaXB0aW9ucyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJpc1ZpZXdBY3RpdmUiLCJncm91cHMiLCJwcm9qZWN0cyIsImV0Y2giLCJpbml0aWFsaXplIiwiYWRkQ29udGV4dE1lbnUiLCJkb1VwZGF0ZSIsInN0YXRlIiwib25EaWRDaGFuZ2VTdGF0ZSIsInVwZGF0ZSIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsInBhY2thZ2VzIiwib25EaWRBY3RpdmF0ZVBhY2thZ2UiLCJwa2ciLCJuYW1lIiwiY29uc29sZSIsImxvZyIsImRlcGVuZGVuY2llcyIsImluc3RhbGwiLCJQTFVHSU5fTkFNRSIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiYWRkQ29tbWFuZHMiLCJhZGQiLCJjb21tYW5kcyIsImNvbnRleHRNZW51IiwiY29tbWFuZCIsImxhYmVsIiwic2hvdWxkRGlzcGxheSIsImV2dCIsInRhcmdldCIsIm5vZGVOYW1lIiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsImluY2x1ZGVzIiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciIsInNlcmlhbGl6ZSIsImRlc2VyaWFsaXpl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QyxRQUFMLEdBQWdCaUMsS0FBSyxDQUFDakMsUUFBdEI7QUFFQSxlQUFPQyxjQUFLTSxNQUFMLENBQVksTUFBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBTzJCLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBUm1CO0FBU3BCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixRQUFJLENBQUMsS0FBS3RDLFlBQVYsRUFBd0I7QUFDdEIsYUFDRTtBQUFLLFFBQUEsU0FBUyxFQUFDO0FBQWYsU0FDRTtBQUFNLFFBQUEsU0FBUyxFQUFDO0FBQWhCLFFBREYsQ0FERjtBQUtEOztBQUVELFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQyxnQ0FBZjtBQUFnRCxNQUFBLFFBQVEsRUFBQztBQUF6RCxPQUNFLGtCQUFDLGFBQUQ7QUFBZSxNQUFBLE1BQU0sRUFBRSxLQUFLQyxNQUE1QjtBQUFvQyxNQUFBLFFBQVEsRUFBRSxLQUFLQztBQUFuRCxNQURGLENBREY7QUFLRDtBQUVEOzs7QUFDQXFDLEVBQUFBLFNBQVMsR0FBSTtBQUNYLFdBQU87QUFDTEMsTUFBQUEsWUFBWSxFQUFFO0FBRFQsS0FBUDtBQUdEOztBQXpMZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlLCBEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCAqIGFzIGRlcGVuZGVuY2llcyBmcm9tICdhdG9tLXBhY2thZ2UtZGVwcyc7XG5cbmltcG9ydCB7XG4gIERPQ0tfSUNPTixcbiAgRE9DS19USVRMRSxcbiAgRE9DS19VUkksXG4gIERPQ0tfU0laRSxcbiAgUExVR0lOX05BTUUsXG4gIEFMTE9XRURfRE9DS1MsXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IE1haW5Db21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL21haW4nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiBET0NLX1RJVExFO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0SWNvbk5hbWUgKCkge1xuICAgIHJldHVybiBET0NLX0lDT047XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIERPQ0tfU0laRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldERlZmF1bHRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1NbMV07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9ET0NLUztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBQVlAgb24gdGhlIGN1cnJlbnQgZG9jayBpZiB2aXNpYmxlXG4gICAqL1xuICBmb2N1c01haW5JdGVtICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHRoaXMuZ2V0VVJJKCkpLmFjdGl2YXRlSXRlbSh0aGlzKTtcbiAgICAvLyB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKS5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiBjb250YWluZXIgaXMgdGhlIG9ubHkgRXRjaCBlbGVtZW50IHRoYXQgd2lsbCBub3QgYmUgcGFzc2VkIGFcbiAgICogcHJvcHMgcGFyYW1ldGVyLiBXZSB3YW50IHRoZSBzdGF0ZSB0byBoYW5kbGUgdGhlIHVwZGF0ZSBvZiBncm91cHMgYW5kXG4gICAqIHByb2plY3RzLiBGb3IgdGhpcyBtYXR0ZXIsIHRoaXMgaXMgYWxzbyB0aGUgb25seSBjb21wb25lbnQgdGhhdFxuICAgKiBpbml0aWFsaXplcyBncm91cHMgYW5kIHByb2plY3RzLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5pc1ZpZXdBY3RpdmUgPSBmYWxzZTtcblxuICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuXG4gICAgLy8gYWRkQ29tbWFuZHMgZG9lcyBub3QgZG8gYW55dGhpbmcgZm9yIG5vd1xuICAgIC8vIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgICB0aGlzLmFkZENvbnRleHRNZW51KCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhY3RpdmF0ZSAoZG9VcGRhdGUpIHtcbiAgICBzdGF0ZS5vbkRpZENoYW5nZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaXNWaWV3QWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmIChkb1VwZGF0ZSkge1xuICAgICAgdGhpcy51cGRhdGUoc3RhdGUuc2VyaWFsaXplR3JvdXBCeUlkKCkpO1xuICAgIH1cblxuICAgIGF0b20ucGFja2FnZXMub25EaWRBY3RpdmF0ZVBhY2thZ2UocGtnID0+IHtcbiAgICAgIGlmIChwa2cubmFtZSA9PT0gJ2ZpbGUtaWNvbnMnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHBrZyk7XG4gICAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlcGVuZGVuY2llcy5pbnN0YWxsKFBMVUdJTl9OQU1FKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkQ29tbWFuZHMgKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgJ2NvcmU6bW92ZS11cCc6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgICAnY29yZTptb3ZlLWRvd24nOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgJ2NvcmU6bW92ZS1sZWZ0JzogZnVuY3Rpb24gKCkge30sXG4gICAgICAgICdjb3JlOm1vdmUtcmlnaHQnOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgJ2NvcmU6Y29uZmlybSc6IGZ1bmN0aW9uICgpIHt9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRDb250ZXh0TWVudSAoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIGF0b20uY29udGV4dE1lbnUuYWRkKHtcbiAgICAgICAgJy5wcm9qZWN0LXZpZXdlci1wbHVzJzogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmFkZC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0FkZCBncm91cC9wcm9qZWN0Li4uJyxcbiAgICAgICAgICAgIHNob3VsZERpc3BsYXk6IGV2dCA9PlxuICAgICAgICAgICAgICBldnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVUwnIHx8XG4gICAgICAgICAgICAgICFldnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJykuY2xhc3NOYW1lLmluY2x1ZGVzKCdwdi1wcm9qZWN0JylcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICcucHJvamVjdC12aWV3ZXItcGx1cyAucHYtZ3JvdXAnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgZ3JvdXAuLi4nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb21tYW5kOiAncHJvamVjdC12aWV3ZXItcGx1czpkZWxldGUtZW50cnknLFxuICAgICAgICAgICAgbGFiZWw6ICdEZWxldGUgZ3JvdXAuLi4nXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAnLnByb2plY3Qtdmlld2VyLXBsdXMgLnB2LXByb2plY3QnOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29tbWFuZDogJ3Byb2plY3Qtdmlld2VyLXBsdXM6ZWRpdC1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0VkaXQgcHJvamVjdC4uLidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdwcm9qZWN0LXZpZXdlci1wbHVzOmRlbGV0ZS1lbnRyeScsXG4gICAgICAgICAgICBsYWJlbDogJ0RlbGV0ZSBwcm9qZWN0Li4uJ1xuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb3BzLnByb2plY3RzO1xuXG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBpZiAoIXRoaXMuaXNWaWV3QWN0aXZlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB2cC1sb2FkZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsb2FkaW5nIGxvYWRpbmctc3Bpbm5lci1zbWFsbCBpbmxpbmUtYmxvY2tcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLXBhbmVsIHByb2plY3Qtdmlld2VyLXBsdXNcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIDxNYWluQ29tcG9uZW50IGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc2VyaWFsaXplcjogJ3Byb2plY3Qtdmlld2VyLXBsdXMvbWFpblZpZXcnXG4gICAgfTtcbiAgfVxufVxuIl19