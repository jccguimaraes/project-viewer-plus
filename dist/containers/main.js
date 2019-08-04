"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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


  isPermanentDockItem() {
    return true;
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleVisibility() {
    this.isInDock() ? this.destroyMainItem() : this.addMainItem();
  }
  /* eslint-disable-next-line require-jsdoc */


  isInDock() {
    return !!atom.workspace.paneForURI(this.getURI());
  }
  /* eslint-disable-next-line require-jsdoc */


  addMainItem() {
    console.log('addMainItem');
    atom.workspace.open(this, {
      activateItem: atom.config.get("".concat(_base.PLUGIN_NAME, ".dock.isActive")),
      activatePane: atom.config.get("".concat(_base.PLUGIN_NAME, ".dock.isVisible")),
      location: atom.config.get("".concat(_base.PLUGIN_NAME, ".dock.position"))
    });
  }
  /* eslint-disable-next-line require-jsdoc */


  destroyMainItem() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield atom.workspace.paneForURI(_this.getURI()).destroyItem(_this, true);
    })();
  }
  /**
   * Focus PVP on the current dock if visible
   */


  focusMainItem() {
    atom.workspace.paneForURI(this.getURI()).activateItem(this);
    this.element.focus();
  }
  /* eslint-disable-next-line require-jsdoc */


  toggleFocus() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.isInDock()) {
        return;
      }

      if (atom.workspace.getActivePaneContainer().getActivePaneItem() !== _this2) {
        _this2.activePane = atom.workspace.getActivePane();
        _this2.activePaneItem = atom.workspace.getActivePaneItem();
        _this2.activeElement = document.activeElement;

        _this2.focusMainItem();
      } else if (_this2.activePane && _this2.activePaneItem) {
        _this2.activePane.activateItem(_this2.activePaneItem);

        _this2.activeElement.focus();

        delete _this2.activePane;
        delete _this2.activePaneItem;
        delete _this2.activeElement;
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
    console.log('created main container');
    this.groups = [];
    this.projects = []; // entrypoint that will update all UI (dock)

    _state.default.onDidChangeState(() => {
      this.update(_state.default.serializeGroupById());
    });

    _etch.default.initialize(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      console.log('destroyed main container', _this3);
      yield _etch.default.destroy(_this3);
    })();
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      console.log('updated main container', _this4, props);

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
    console.log('rendered main container', this);
    return _etch.default.dom("div", {
      className: "tool-panel project-viewer-plus",
      tabIndex: "-1"
    }, _etch.default.dom(_main.default, {
      groups: this.groups,
      projects: this.projects
    }));
  }

}

exports.default = MainContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJpc0luRG9jayIsImRlc3Ryb3lNYWluSXRlbSIsImFkZE1haW5JdGVtIiwid29ya3NwYWNlIiwicGFuZUZvclVSSSIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwiYWN0aXZhdGVJdGVtIiwiYWN0aXZhdGVQYW5lIiwibG9jYXRpb24iLCJkZXN0cm95SXRlbSIsImZvY3VzTWFpbkl0ZW0iLCJlbGVtZW50IiwiZm9jdXMiLCJ0b2dnbGVGb2N1cyIsImdldEFjdGl2ZVBhbmVDb250YWluZXIiLCJnZXRBY3RpdmVQYW5lSXRlbSIsImFjdGl2ZVBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiYWN0aXZlUGFuZUl0ZW0iLCJhY3RpdmVFbGVtZW50IiwiZG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsImdyb3VwcyIsInByb2plY3RzIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUVBOztBQVNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixX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LENBQVkseUJBQVosRUFBdUMsSUFBdkM7QUFFQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUMsZ0NBQWY7QUFBZ0QsTUFBQSxRQUFRLEVBQUM7QUFBekQsT0FDRSxrQkFBQyxhQUFEO0FBQWUsTUFBQSxNQUFNLEVBQUUsS0FBS2tCLE1BQTVCO0FBQW9DLE1BQUEsUUFBUSxFQUFFLEtBQUtDO0FBQW5ELE1BREYsQ0FERjtBQUtEOztBQS9JZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IHtcbiAgRE9DS19JQ09OLFxuICBET0NLX1RJVExFLFxuICBET0NLX1VSSSxcbiAgRE9DS19TSVpFLFxuICBQTFVHSU5fTkFNRSxcbiAgQUxMT1dFRF9ET0NLUyxcbiAgRU1JVFRFUlxufSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgTWFpbkNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gRE9DS19VUkk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRJY29uTmFtZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfSUNPTjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFByZWZlcnJlZFdpZHRoICgpIHtcbiAgICByZXR1cm4gRE9DS19TSVpFO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgQUxMT1dFRF9ET0NLU1sxXTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEFsbG93ZWRMb2NhdGlvbnMgKCkge1xuICAgIHJldHVybiBBTExPV0VEX0RPQ0tTO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaXNQZXJtYW5lbnREb2NrSXRlbSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICB0aGlzLmlzSW5Eb2NrKCkgPyB0aGlzLmRlc3Ryb3lNYWluSXRlbSgpIDogdGhpcy5hZGRNYWluSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaXNJbkRvY2sgKCkge1xuICAgIHJldHVybiAhIWF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRNYWluSXRlbSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2FkZE1haW5JdGVtJyk7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3lNYWluSXRlbSAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSSh0aGlzLmdldFVSSSgpKS5kZXN0cm95SXRlbSh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBQVlAgb24gdGhlIGN1cnJlbnQgZG9jayBpZiB2aXNpYmxlXG4gICAqL1xuICBmb2N1c01haW5JdGVtICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHRoaXMuZ2V0VVJJKCkpLmFjdGl2YXRlSXRlbSh0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBpZiAoIXRoaXMuaXNJbkRvY2soKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lQ29udGFpbmVyKCkuZ2V0QWN0aXZlUGFuZUl0ZW0oKSAhPT0gdGhpcykge1xuICAgICAgdGhpcy5hY3RpdmVQYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpO1xuICAgICAgdGhpcy5hY3RpdmVQYW5lSXRlbSA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCk7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgdGhpcy5mb2N1c01haW5JdGVtKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFuZSAmJiB0aGlzLmFjdGl2ZVBhbmVJdGVtKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmUuYWN0aXZhdGVJdGVtKHRoaXMuYWN0aXZlUGFuZUl0ZW0pO1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVQYW5lO1xuICAgICAgZGVsZXRlIHRoaXMuYWN0aXZlUGFuZUl0ZW07XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiBjb250YWluZXIgaXMgdGhlIG9ubHkgRXRjaCBlbGVtZW50IHRoYXQgd2lsbCBub3QgYmUgcGFzc2VkIGFcbiAgICogcHJvcHMgcGFyYW1ldGVyLiBXZSB3YW50IHRoZSBzdGF0ZSB0byBoYW5kbGUgdGhlIHVwZGF0ZSBvZiBncm91cHMgYW5kXG4gICAqIHByb2plY3RzLiBGb3IgdGhpcyBtYXR0ZXIsIHRoaXMgaXMgYWxzbyB0aGUgb25seSBjb21wb25lbnQgdGhhdFxuICAgKiBpbml0aWFsaXplcyBncm91cHMgYW5kIHByb2plY3RzLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIG1haW4gY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcblxuICAgIC8vIGVudHJ5cG9pbnQgdGhhdCB3aWxsIHVwZGF0ZSBhbGwgVUkgKGRvY2spXG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIG1haW4gY29udGFpbmVyJywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBtYWluIGNvbnRhaW5lcicsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBtYWluIGNvbnRhaW5lcicsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8TWFpbkNvbXBvbmVudCBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==