'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    console.log('didClick project', event.type, this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrag(event) {
    console.log('didDrag project', event.type, this);
    event.target.classList.add('dragging');
  }

  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */
  didDragEnd(event) {
    console.log('didDragEnd project', event.type, this);
    event.target.classList.remove('dragging');
  }

  /**
   * Project needs to be initialized as an etch component
   * @param {Object} props - etch component properties
   */
  constructor(props) {
    console.log('created project', props);

    this.updateEntry(props);
    _etch2.default.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * @param {Object} [props] etch component properties
   * @returns {Promise} description
   */
  async update(props) {
    console.log('updated project', this, props);
    if (props) {
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    console.log('destroyed project', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log('rendered project', this);

    const selected = this.selected ? 'selected' : '';
    const icon = this.icon && atom.packages.isPackageActive('file-icons') ? this.icon : null;

    return _etch2.default.dom(
      'li',
      {
        id: this.id,
        className: `list-item pv-project ${selected}`,
        on: {
          click: this.didClick,
          dragstart: this.didDrag,
          dragend: this.didDragEnd
        },
        draggable: true
      },
      _etch2.default.dom(
        'span',
        { className: icon },
        this.name
      )
    );
  }
}
exports.default = ProjectComponent; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImRpZERyYWciLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxNQUFNQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsTUFBTUUsSUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxNQUFNRyxRQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosTUFBTUksS0FBbkI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VMLE1BQU1LLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPUixNQUFNSyxJQUFLLE9BRHZCLEdBRUksSUFITjtBQUlEOztBQUVEO0FBQ0FJLFdBQVVDLEtBQVYsRUFBaUI7QUFDZkMsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDRixNQUFNRyxJQUF0QyxFQUE0QyxJQUE1QztBQUNEOztBQUVEO0FBQ0FDLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZEMsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCRixNQUFNRyxJQUFyQyxFQUEyQyxJQUEzQztBQUNBSCxVQUFNSyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVIsS0FBWixFQUFtQjtBQUNqQkMsWUFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDRixNQUFNRyxJQUF4QyxFQUE4QyxJQUE5QztBQUNBSCxVQUFNSyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQlYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCUyxLQUEvQjs7QUFFQSxTQUFLdEIsV0FBTCxDQUFpQnNCLEtBQWpCO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQlYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBQXFDUyxLQUFyQztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZmhCLFlBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBLFVBQU1VLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JqQixZQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0MsSUFBaEM7O0FBRUEsVUFBTVQsV0FBVyxLQUFLQSxRQUFMLEdBQWdCLFVBQWhCLEdBQTZCLEVBQTlDO0FBQ0EsVUFBTUUsT0FDSixLQUFLQSxJQUFMLElBQWFDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFiLEdBQ0ksS0FBS0gsSUFEVCxHQUVJLElBSE47O0FBS0EsV0FDRTtBQUFBO0FBQUE7QUFDRSxZQUFJLEtBQUtKLEVBRFg7QUFFRSxtQkFBWSx3QkFBdUJFLFFBQVMsRUFGOUM7QUFHRSxZQUFJO0FBQ0YwQixpQkFBTyxLQUFLcEIsUUFEVjtBQUVGcUIscUJBQVcsS0FBS2hCLE9BRmQ7QUFHRmlCLG1CQUFTLEtBQUtiO0FBSFosU0FITjtBQVFFO0FBUkY7QUFVRTtBQUFBO0FBQUEsVUFBTSxXQUFXYixJQUFqQjtBQUF3QixhQUFLSDtBQUE3QjtBQVZGLEtBREY7QUFjRDtBQTFGbUM7a0JBQWpCSixnQixFQVByQiIsImZpbGUiOiJwcm9qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtaXRlbWAgKGFrYSBwcm9qZWN0KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0Q29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGVudHJ5LnNlbGVjdGVkO1xuICAgIHRoaXMucGF0aHMgPSBlbnRyeS5wYXRocztcbiAgICB0aGlzLmljb24gPVxuICAgICAgZW50cnkuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHtlbnRyeS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkQ2xpY2sgcHJvamVjdCcsIGV2ZW50LnR5cGUsIHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkRHJhZyBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZERyYWdFbmQgcHJvamVjdCcsIGV2ZW50LnR5cGUsIHRoaXMpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3QgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgcHJvamVjdCcsIHByb3BzKTtcblxuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBwcm9qZWN0JywgdGhpcywgcHJvcHMpO1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgcHJvamVjdCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIHByb2plY3QnLCB0aGlzKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmRcbiAgICAgICAgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==