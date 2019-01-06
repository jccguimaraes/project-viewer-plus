'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _base = require('./../constants/base');

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

var _main = require('./../components/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

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
    return atom.config.get(`${_base.PLUGIN_NAME}.dock.position`) || _base.ALLOWED_DOCKS[1];
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
    atom.workspace.open(this, {
      activateItem: atom.config.get(`${_base.PLUGIN_NAME}.dock.isActive`),
      activatePane: atom.config.get(`${_base.PLUGIN_NAME}.dock.isVisible`),
      location: atom.config.get(`${_base.PLUGIN_NAME}.dock.position`)
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroyMainItem() {
    await atom.workspace.paneForURI(this.getURI()).destroyItem(this, true);
  }

  /**
   * Focus PVP on the current dock if visible
   */
  focusMainItem() {
    atom.workspace.paneForURI(this.getURI()).activateItem(this);
    this.element.focus();
  }

  /* eslint-disable-next-line require-jsdoc */
  async toggleFocus() {
    if (!this.isInDock()) {
      return;
    }

    if (atom.workspace.getActivePaneContainer().getActivePaneItem() !== this) {
      this.activePane = atom.workspace.getActivePane();
      this.activePaneItem = atom.workspace.getActivePaneItem();
      this.activeElement = document.activeElement;
      this.focusMainItem();
    } else if (this.activePane && this.activePaneItem) {
      this.activePane.activateItem(this.activePaneItem);
      this.activeElement.focus();
      delete this.activePane;
      delete this.activePaneItem;
      delete this.activeElement;
    }
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
    this.projects = [];

    // entrypoint that will update all UI (dock)
    _state2.default.onDidChangeState(() => {
      this.update(_state2.default.serializeGroupById());
    });

    _etch2.default.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed main container', this);
    await _etch2.default.destroy(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    console.log('updated main container', this, props);

    if (props) {
      this.groups = props.groups;
      this.projects = props.projects;

      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered main container', this);

    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      _etch2.default.dom(_main2.default, { groups: this.groups, projects: this.projects })
    );
  }
}
exports.default = MainContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJpc0luRG9jayIsImRlc3Ryb3lNYWluSXRlbSIsImFkZE1haW5JdGVtIiwid29ya3NwYWNlIiwicGFuZUZvclVSSSIsIm9wZW4iLCJhY3RpdmF0ZUl0ZW0iLCJhY3RpdmF0ZVBhbmUiLCJsb2NhdGlvbiIsImRlc3Ryb3lJdGVtIiwiZm9jdXNNYWluSXRlbSIsImVsZW1lbnQiLCJmb2N1cyIsInRvZ2dsZUZvY3VzIiwiZ2V0QWN0aXZlUGFuZUNvbnRhaW5lciIsImdldEFjdGl2ZVBhbmVJdGVtIiwiYWN0aXZlUGFuZSIsImdldEFjdGl2ZVBhbmUiLCJhY3RpdmVQYW5lSXRlbSIsImFjdGl2ZUVsZW1lbnQiLCJkb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImdyb3VwcyIsInByb2plY3RzIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFFQTs7QUFTQTs7OztBQUNBOzs7Ozs7QUFFQTtBQWhCQTs7QUFpQmUsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxXQUFVO0FBQ1IsV0FB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R0FBaUI7QUFDZlYsWUFBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLElBQXhDO0FBQ0EsVUFBTU8sZUFBS0UsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1KLE1BQU4sQ0FBY0ssS0FBZCxFQUFxQjtBQUNuQlgsWUFBUUMsR0FBUixDQUFZLHdCQUFaLEVBQXNDLElBQXRDLEVBQTRDVSxLQUE1Qzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLVCxNQUFMLEdBQWNTLE1BQU1ULE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQlEsTUFBTVIsUUFBdEI7O0FBRUEsYUFBT0ssZUFBS0YsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9NLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUmQsWUFBUUMsR0FBUixDQUFZLHlCQUFaLEVBQXVDLElBQXZDOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxnQ0FBZixFQUFnRCxVQUFTLElBQXpEO0FBQ0UseUJBQUMsY0FBRCxJQUFlLFFBQVEsS0FBS0MsTUFBNUIsRUFBb0MsVUFBVSxLQUFLQyxRQUFuRDtBQURGLEtBREY7QUFLRDtBQTlJZ0M7a0JBQWQzQyxhIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IHtcbiAgRE9DS19JQ09OLFxuICBET0NLX1RJVExFLFxuICBET0NLX1VSSSxcbiAgRE9DS19TSVpFLFxuICBQTFVHSU5fTkFNRSxcbiAgQUxMT1dFRF9ET0NLUyxcbiAgRU1JVFRFUlxufSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5pbXBvcnQgTWFpbkNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbic7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gRE9DS19VUkk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRJY29uTmFtZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfSUNPTjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFByZWZlcnJlZFdpZHRoICgpIHtcbiAgICByZXR1cm4gRE9DS19TSVpFO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgQUxMT1dFRF9ET0NLU1sxXTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEFsbG93ZWRMb2NhdGlvbnMgKCkge1xuICAgIHJldHVybiBBTExPV0VEX0RPQ0tTO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaXNQZXJtYW5lbnREb2NrSXRlbSAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICB0aGlzLmlzSW5Eb2NrKCkgPyB0aGlzLmRlc3Ryb3lNYWluSXRlbSgpIDogdGhpcy5hZGRNYWluSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaXNJbkRvY2sgKCkge1xuICAgIHJldHVybiAhIWF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRNYWluSXRlbSAoKSB7XG4gICAgYXRvbS53b3Jrc3BhY2Uub3Blbih0aGlzLCB7XG4gICAgICBhY3RpdmF0ZUl0ZW06IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc0FjdGl2ZWApLFxuICAgICAgYWN0aXZhdGVQYW5lOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2suaXNWaXNpYmxlYCksXG4gICAgICBsb2NhdGlvbjogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYClcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3lNYWluSXRlbSAoKSB7XG4gICAgYXdhaXQgYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSSh0aGlzLmdldFVSSSgpKS5kZXN0cm95SXRlbSh0aGlzLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyBQVlAgb24gdGhlIGN1cnJlbnQgZG9jayBpZiB2aXNpYmxlXG4gICAqL1xuICBmb2N1c01haW5JdGVtICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHRoaXMuZ2V0VVJJKCkpLmFjdGl2YXRlSXRlbSh0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBpZiAoIXRoaXMuaXNJbkRvY2soKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lQ29udGFpbmVyKCkuZ2V0QWN0aXZlUGFuZUl0ZW0oKSAhPT0gdGhpcykge1xuICAgICAgdGhpcy5hY3RpdmVQYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZSgpO1xuICAgICAgdGhpcy5hY3RpdmVQYW5lSXRlbSA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVJdGVtKCk7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgdGhpcy5mb2N1c01haW5JdGVtKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFuZSAmJiB0aGlzLmFjdGl2ZVBhbmVJdGVtKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmUuYWN0aXZhdGVJdGVtKHRoaXMuYWN0aXZlUGFuZUl0ZW0pO1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVQYW5lO1xuICAgICAgZGVsZXRlIHRoaXMuYWN0aXZlUGFuZUl0ZW07XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWFpbiBjb250YWluZXIgaXMgdGhlIG9ubHkgRXRjaCBlbGVtZW50IHRoYXQgd2lsbCBub3QgYmUgcGFzc2VkIGFcbiAgICogcHJvcHMgcGFyYW1ldGVyLiBXZSB3YW50IHRoZSBzdGF0ZSB0byBoYW5kbGUgdGhlIHVwZGF0ZSBvZiBncm91cHMgYW5kXG4gICAqIHByb2plY3RzLiBGb3IgdGhpcyBtYXR0ZXIsIHRoaXMgaXMgYWxzbyB0aGUgb25seSBjb21wb25lbnQgdGhhdFxuICAgKiBpbml0aWFsaXplcyBncm91cHMgYW5kIHByb2plY3RzLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIG1haW4gY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcblxuICAgIC8vIGVudHJ5cG9pbnQgdGhhdCB3aWxsIHVwZGF0ZSBhbGwgVUkgKGRvY2spXG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIG1haW4gY29udGFpbmVyJywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBtYWluIGNvbnRhaW5lcicsIHRoaXMsIHByb3BzKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5ncm91cHMgPSBwcm9wcy5ncm91cHM7XG4gICAgICB0aGlzLnByb2plY3RzID0gcHJvcHMucHJvamVjdHM7XG5cbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBtYWluIGNvbnRhaW5lcicsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8TWFpbkNvbXBvbmVudCBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==