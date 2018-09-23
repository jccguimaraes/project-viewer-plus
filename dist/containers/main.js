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
  constructor() {
    console.log('main');
    this.groups = [];
    this.projects = [];

    _state2.default.onDidChangeState(() => {
      this.update(_state2.default.serializeGroupById());
    });

    _etch2.default.initialize(this);
  }

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

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props = {}) {
    this.groups = props.groups || this.groups;
    this.projects = props.projects || this.projects;
    return await _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      _etch2.default.dom(_main2.default, { groups: this.groups, projects: this.projects })
    );
  }
}
exports.default = MainContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiY29uc29sZSIsImxvZyIsImdyb3VwcyIsInByb2plY3RzIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiZXRjaCIsImluaXRpYWxpemUiLCJnZXRVUkkiLCJET0NLX1VSSSIsImdldFRpdGxlIiwiRE9DS19USVRMRSIsImdldEljb25OYW1lIiwiRE9DS19JQ09OIiwiZ2V0UHJlZmVycmVkV2lkdGgiLCJET0NLX1NJWkUiLCJnZXREZWZhdWx0TG9jYXRpb24iLCJhdG9tIiwiY29uZmlnIiwiZ2V0IiwiUExVR0lOX05BTUUiLCJBTExPV0VEX0RPQ0tTIiwiZ2V0QWxsb3dlZExvY2F0aW9ucyIsImlzUGVybWFuZW50RG9ja0l0ZW0iLCJ0b2dnbGVWaXNpYmlsaXR5IiwiaXNJbkRvY2siLCJkZXN0cm95TWFpbkl0ZW0iLCJhZGRNYWluSXRlbSIsIndvcmtzcGFjZSIsInBhbmVGb3JVUkkiLCJvcGVuIiwiYWN0aXZhdGVJdGVtIiwiYWN0aXZhdGVQYW5lIiwibG9jYXRpb24iLCJkZXN0cm95SXRlbSIsImZvY3VzTWFpbkl0ZW0iLCJlbGVtZW50IiwiZm9jdXMiLCJ0b2dnbGVGb2N1cyIsImdldEFjdGl2ZVBhbmVDb250YWluZXIiLCJnZXRBY3RpdmVQYW5lSXRlbSIsImFjdGl2ZVBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiYWN0aXZlUGFuZUl0ZW0iLCJhY3RpdmVFbGVtZW50IiwiZG9jdW1lbnQiLCJkZXN0cm95IiwicHJvcHMiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBRUE7O0FBU0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFoQkE7O0FBaUJlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsZ0JBQWU7QUFDYkMsWUFBUUMsR0FBUixDQUFZLE1BQVo7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QWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTTFDLE1BQU4sQ0FBYzJDLFFBQVEsRUFBdEIsRUFBMEI7QUFDeEIsU0FBSy9DLE1BQUwsR0FBYytDLE1BQU0vQyxNQUFOLElBQWdCLEtBQUtBLE1BQW5DO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQjhDLE1BQU05QyxRQUFOLElBQWtCLEtBQUtBLFFBQXZDO0FBQ0EsV0FBTyxNQUFNSyxlQUFLRixNQUFMLENBQVksSUFBWixDQUFiO0FBQ0Q7O0FBRUQ7QUFDQTRDLFdBQVU7QUFDUixXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZ0NBQWYsRUFBZ0QsVUFBUyxJQUF6RDtBQUNFLHlCQUFDLGNBQUQsSUFBZSxRQUFRLEtBQUtoRCxNQUE1QixFQUFvQyxVQUFVLEtBQUtDLFFBQW5EO0FBREYsS0FERjtBQUtEO0FBN0hnQztrQkFBZEwsYSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCB7XG4gIERPQ0tfSUNPTixcbiAgRE9DS19USVRMRSxcbiAgRE9DS19VUkksXG4gIERPQ0tfU0laRSxcbiAgUExVR0lOX05BTUUsXG4gIEFMTE9XRURfRE9DS1MsXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuaW1wb3J0IE1haW5Db21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL21haW4nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBjb25zb2xlLmxvZygnbWFpbicpO1xuICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuXG4gICAgc3RhdGUub25EaWRDaGFuZ2VTdGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZShzdGF0ZS5zZXJpYWxpemVHcm91cEJ5SWQoKSk7XG4gICAgfSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gRE9DS19USVRMRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiBET0NLX1NJWkU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXREZWZhdWx0TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gKSB8fCBBTExPV0VEX0RPQ0tTWzFdO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1M7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpc1Blcm1hbmVudERvY2tJdGVtICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZVZpc2liaWxpdHkgKCkge1xuICAgIHRoaXMuaXNJbkRvY2soKSA/IHRoaXMuZGVzdHJveU1haW5JdGVtKCkgOiB0aGlzLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpc0luRG9jayAoKSB7XG4gICAgcmV0dXJuICEhYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSSh0aGlzLmdldFVSSSgpKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZE1haW5JdGVtICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMsIHtcbiAgICAgIGFjdGl2YXRlSXRlbTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzQWN0aXZlYCksXG4gICAgICBhY3RpdmF0ZVBhbmU6IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc1Zpc2libGVgKSxcbiAgICAgIGxvY2F0aW9uOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gKVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveU1haW5JdGVtICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHRoaXMuZ2V0VVJJKCkpLmRlc3Ryb3lJdGVtKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIFBWUCBvbiB0aGUgY3VycmVudCBkb2NrIGlmIHZpc2libGVcbiAgICovXG4gIGZvY3VzTWFpbkl0ZW0gKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSkuYWN0aXZhdGVJdGVtKHRoaXMpO1xuICAgIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdG9nZ2xlRm9jdXMgKCkge1xuICAgIGlmICghdGhpcy5pc0luRG9jaygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVDb250YWluZXIoKS5nZXRBY3RpdmVQYW5lSXRlbSgpICE9PSB0aGlzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCk7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmVJdGVtID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLmZvY3VzTWFpbkl0ZW0oKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5hY3RpdmVQYW5lICYmIHRoaXMuYWN0aXZlUGFuZUl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFuZS5hY3RpdmF0ZUl0ZW0odGhpcy5hY3RpdmVQYW5lSXRlbSk7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZVBhbmU7XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVQYW5lSXRlbTtcbiAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMgPSB7fSkge1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzIHx8IHRoaXMuZ3JvdXBzO1xuICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cyB8fCB0aGlzLnByb2plY3RzO1xuICAgIHJldHVybiBhd2FpdCBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9vbC1wYW5lbCBwcm9qZWN0LXZpZXdlci1wbHVzXCIgdGFiSW5kZXg9XCItMVwiPlxuICAgICAgICA8TWFpbkNvbXBvbmVudCBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==