"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/**
 * Component that generates an Atom `list-item` (aka project)
 */
class ProjectComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(entry) {
    this.id = entry.id;
    this.name = entry.name;
    this.selected = entry.selected;
    this.paths = entry.paths;
    this.icon = entry.icon && atom.packages.isPackageActive('file-icons') ? `icon ${entry.icon}-icon` : null;
  }
  /* eslint-disable-next-line require-jsdoc */


  didClick(event) {
    atom.open({
      pathsToOpen: this.paths
    });
  }
  /* eslint-disable-next-line require-jsdoc */


  didDrag(event) {
    event.dataTransfer.setData('text/plain', this.id);
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('dragging');
  }
  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */


  didDragEnd(event) {
    event.target.classList.remove('dragging');
  }
  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */


  didDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.remove('dragging');
  }
  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */


  didDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    this.onDidDrop(event.dataTransfer.getData('text/plain'), this.id);
  }
  /**
   * Project needs to be initialized as an etch component
   * @param {Object} props - etch component properties
   */


  constructor(props) {
    this.updateEntry(props);
    this.onDidDrop = props.onDidDrop;

    _etch.default.initialize(this);
  }
  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * @param {Object} [props] etch component properties
   * @returns {Promise} description
   */


  async update(props) {
    if (props) {
      this.updateEntry(props);
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    const selected = this.selected ? 'selected' : '';
    const icon = this.icon && atom.packages.isPackageActive('file-icons') ? this.icon : null;
    return _etch.default.dom("li", {
      id: this.id,
      className: `list-item pv-project ${selected}`,
      on: {
        click: this.didClick,
        dragstart: this.didDrag,
        dragend: this.didDragEnd,
        dragover: this.didDragOver,
        drop: this.didDrop
      },
      draggable: true
    }, _etch.default.dom("span", {
      className: icon
    }, this.name));
  }

}

exports.default = ProjectComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJvcGVuIiwicGF0aHNUb09wZW4iLCJkaWREcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImRyb3BFZmZlY3QiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiZGlkRHJhZ092ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImRpZERyb3AiLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJhZ292ZXIiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTs7QUFJQTs7O0FBR2UsTUFBTUEsZ0JBQU4sQ0FBdUI7QUFDcEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLLENBQUNDLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNFLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDRyxRQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosS0FBSyxDQUFDSSxLQUFuQjtBQUNBLFNBQUtDLElBQUwsR0FDRUwsS0FBSyxDQUFDSyxJQUFOLElBQWNDLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPUixL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QVM7QUFWWCxPQVlFO0FBQU0sTUFBQSxTQUFTLEVBQUVwQjtBQUFqQixPQUF3QixLQUFLSCxJQUE3QixDQVpGLENBREY7QUFnQkQ7O0FBL0dtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LWl0ZW1gIChha2EgcHJvamVjdClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBlbnRyeS5zZWxlY3RlZDtcbiAgICB0aGlzLnBhdGhzID0gZW50cnkucGF0aHM7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgYXRvbS5vcGVuKHsgcGF0aHNUb09wZW46IHRoaXMucGF0aHMgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17e1xuICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZCxcbiAgICAgICAgICBkcmFnb3ZlcjogdGhpcy5kaWREcmFnT3ZlcixcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==