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
    console.log('addMainItem');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJpc0luRG9jayIsImRlc3Ryb3lNYWluSXRlbSIsImFkZE1haW5JdGVtIiwid29ya3NwYWNlIiwicGFuZUZvclVSSSIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwiYWN0aXZhdGVJdGVtIiwiYWN0aXZhdGVQYW5lIiwibG9jYXRpb24iLCJkZXN0cm95SXRlbSIsImZvY3VzTWFpbkl0ZW0iLCJlbGVtZW50IiwiZm9jdXMiLCJ0b2dnbGVGb2N1cyIsImdldEFjdGl2ZVBhbmVDb250YWluZXIiLCJnZXRBY3RpdmVQYW5lSXRlbSIsImFjdGl2ZVBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiYWN0aXZlUGFuZUl0ZW0iLCJhY3RpdmVFbGVtZW50IiwiZG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsImdyb3VwcyIsInByb2plY3RzIiwic3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwidXBkYXRlIiwic2VyaWFsaXplR3JvdXBCeUlkIiwiZXRjaCIsImluaXRpYWxpemUiLCJkZXN0cm95IiwicHJvcHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFFQTs7QUFTQTs7OztBQUNBOzs7Ozs7QUFFQTtBQWhCQTs7QUFpQmUsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxXQUFVO0FBQ1IsV0FB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QUFoQjtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmM0IsWUFBUUMsR0FBUixDQUFZLDBCQUFaLEVBQXdDLElBQXhDO0FBQ0EsVUFBTXdCLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNSixNQUFOLENBQWNLLEtBQWQsRUFBcUI7QUFDbkI1QixZQUFRQyxHQUFSLENBQVksd0JBQVosRUFBc0MsSUFBdEMsRUFBNEMyQixLQUE1Qzs7QUFFQSxRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLVCxNQUFMLEdBQWNTLE1BQU1ULE1BQXBCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQlEsTUFBTVIsUUFBdEI7O0FBRUEsYUFBT0ssZUFBS0YsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9NLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUi9CLFlBQVFDLEdBQVIsQ0FBWSx5QkFBWixFQUF1QyxJQUF2Qzs7QUFFQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsZ0NBQWYsRUFBZ0QsVUFBUyxJQUF6RDtBQUNFLHlCQUFDLGNBQUQsSUFBZSxRQUFRLEtBQUtrQixNQUE1QixFQUFvQyxVQUFVLEtBQUtDLFFBQW5EO0FBREYsS0FERjtBQUtEO0FBL0lnQztrQkFBZDNDLGEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQge1xuICBET0NLX0lDT04sXG4gIERPQ0tfVElUTEUsXG4gIERPQ0tfVVJJLFxuICBET0NLX1NJWkUsXG4gIFBMVUdJTl9OQU1FLFxuICBBTExPV0VEX0RPQ0tTLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcbmltcG9ydCBNYWluQ29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9tYWluJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Db250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiBET0NLX1VSSTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gRE9DS19USVRMRTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0UHJlZmVycmVkV2lkdGggKCkge1xuICAgIHJldHVybiBET0NLX1NJWkU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXREZWZhdWx0TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gKSB8fCBBTExPV0VEX0RPQ0tTWzFdO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0QWxsb3dlZExvY2F0aW9ucyAoKSB7XG4gICAgcmV0dXJuIEFMTE9XRURfRE9DS1M7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpc1Blcm1hbmVudERvY2tJdGVtICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZVZpc2liaWxpdHkgKCkge1xuICAgIHRoaXMuaXNJbkRvY2soKSA/IHRoaXMuZGVzdHJveU1haW5JdGVtKCkgOiB0aGlzLmFkZE1haW5JdGVtKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpc0luRG9jayAoKSB7XG4gICAgcmV0dXJuICEhYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSSh0aGlzLmdldFVSSSgpKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZE1haW5JdGVtICgpIHtcbiAgICBjb25zb2xlLmxvZygnYWRkTWFpbkl0ZW0nKTtcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuKHRoaXMsIHtcbiAgICAgIGFjdGl2YXRlSXRlbTogYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLmlzQWN0aXZlYCksXG4gICAgICBhY3RpdmF0ZVBhbmU6IGF0b20uY29uZmlnLmdldChgJHtQTFVHSU5fTkFNRX0uZG9jay5pc1Zpc2libGVgKSxcbiAgICAgIGxvY2F0aW9uOiBhdG9tLmNvbmZpZy5nZXQoYCR7UExVR0lOX05BTUV9LmRvY2sucG9zaXRpb25gKVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveU1haW5JdGVtICgpIHtcbiAgICBhd2FpdCBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKHRoaXMuZ2V0VVJJKCkpLmRlc3Ryb3lJdGVtKHRoaXMsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIFBWUCBvbiB0aGUgY3VycmVudCBkb2NrIGlmIHZpc2libGVcbiAgICovXG4gIGZvY3VzTWFpbkl0ZW0gKCkge1xuICAgIGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkodGhpcy5nZXRVUkkoKSkuYWN0aXZhdGVJdGVtKHRoaXMpO1xuICAgIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgdG9nZ2xlRm9jdXMgKCkge1xuICAgIGlmICghdGhpcy5pc0luRG9jaygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmVDb250YWluZXIoKS5nZXRBY3RpdmVQYW5lSXRlbSgpICE9PSB0aGlzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCk7XG4gICAgICB0aGlzLmFjdGl2ZVBhbmVJdGVtID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlUGFuZUl0ZW0oKTtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLmZvY3VzTWFpbkl0ZW0oKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5hY3RpdmVQYW5lICYmIHRoaXMuYWN0aXZlUGFuZUl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFuZS5hY3RpdmF0ZUl0ZW0odGhpcy5hY3RpdmVQYW5lSXRlbSk7XG4gICAgICB0aGlzLmFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZVBhbmU7XG4gICAgICBkZWxldGUgdGhpcy5hY3RpdmVQYW5lSXRlbTtcbiAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBtYWluIGNvbnRhaW5lciBpcyB0aGUgb25seSBFdGNoIGVsZW1lbnQgdGhhdCB3aWxsIG5vdCBiZSBwYXNzZWQgYVxuICAgKiBwcm9wcyBwYXJhbWV0ZXIuIFdlIHdhbnQgdGhlIHN0YXRlIHRvIGhhbmRsZSB0aGUgdXBkYXRlIG9mIGdyb3VwcyBhbmRcbiAgICogcHJvamVjdHMuIEZvciB0aGlzIG1hdHRlciwgdGhpcyBpcyBhbHNvIHRoZSBvbmx5IGNvbXBvbmVudCB0aGF0XG4gICAqIGluaXRpYWxpemVzIGdyb3VwcyBhbmQgcHJvamVjdHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgbWFpbiBjb250YWluZXInKTtcblxuICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuXG4gICAgLy8gZW50cnlwb2ludCB0aGF0IHdpbGwgdXBkYXRlIGFsbCBVSSAoZG9jaylcbiAgICBzdGF0ZS5vbkRpZENoYW5nZVN0YXRlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKHN0YXRlLnNlcmlhbGl6ZUdyb3VwQnlJZCgpKTtcbiAgICB9KTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgbWFpbiBjb250YWluZXInLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIG1haW4gY29udGFpbmVyJywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmdyb3VwcyA9IHByb3BzLmdyb3VwcztcbiAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9wcy5wcm9qZWN0cztcblxuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIG1haW4gY29udGFpbmVyJywgdGhpcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLXBhbmVsIHByb2plY3Qtdmlld2VyLXBsdXNcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIDxNYWluQ29tcG9uZW50IGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19