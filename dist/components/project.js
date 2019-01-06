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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImRpZERyYWciLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxNQUFNQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsTUFBTUUsSUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxNQUFNRyxRQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosTUFBTUksS0FBbkI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VMLE1BQU1LLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPUixNQUFNSyxJQUFLLE9BRHZCLEdBRUksSUFITjtBQUlEOztBQUVEO0FBQ0FJLFdBQVVDLEtBQVYsRUFBaUI7QUFDZkMsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDRixNQUFNRyxJQUF0QyxFQUE0QyxJQUE1QztBQUNEOztBQUVEO0FBQ0FDLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZEMsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCRixNQUFNRyxJQUFyQyxFQUEyQyxJQUEzQztBQUNBSCxVQUFNSyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWVIsS0FBWixFQUFtQjtBQUNqQkMsWUFBUUMsR0FBUixDQUFZLG9CQUFaLEVBQWtDRixNQUFNRyxJQUF4QyxFQUE4QyxJQUE5QztBQUNBSCxVQUFNSyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQlYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCUyxLQUEvQjs7QUFFQSxTQUFLdEIsV0FBTCxDQUFpQnNCLEtBQWpCO0FBQ0FDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQlYsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBQXFDUyxLQUFyQztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZmhCLFlBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBLFVBQU1VLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVO0FBQ1JqQixZQUFRQyxHQUFSLENBQVksa0JBQVosRUFBZ0MsSUFBaEM7O0FBRUEsVUFBTVQsV0FBVyxLQUFLQSxRQUFMLEdBQWdCLFVBQWhCLEdBQTZCLEVBQTlDO0FBQ0EsVUFBTUUsT0FDSixLQUFLQSxJQUFMLElBQWFDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFiLEdBQ0ksS0FBS0gsSUFEVCxHQUNnQixJQUZsQjs7QUFJQSxXQUNFO0FBQUE7QUFBQTtBQUNFLFlBQUksS0FBS0osRUFEWDtBQUVFLG1CQUFZLHdCQUF1QkUsUUFBUyxFQUY5QztBQUdFLFlBQUk7QUFDRjBCLGlCQUFPLEtBQUtwQixRQURWO0FBRUZxQixxQkFBVyxLQUFLaEIsT0FGZDtBQUdGaUIsbUJBQVMsS0FBS2I7QUFIWixTQUhOO0FBUUU7QUFSRjtBQVVFO0FBQUE7QUFBQSxVQUFNLFdBQVdiLElBQWpCO0FBQXdCLGFBQUtIO0FBQTdCO0FBVkYsS0FERjtBQWNEO0FBekZtQztrQkFBakJKLGdCLEVBUHJCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gZW50cnkuc2VsZWN0ZWQ7XG4gICAgdGhpcy5wYXRocyA9IGVudHJ5LnBhdGhzO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDbGljayBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWREcmFnIHByb2plY3QnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkRHJhZ0VuZCBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBwcm9qZWN0JywgcHJvcHMpO1xuXG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHByb2plY3QnLCB0aGlzLCBwcm9wcyk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBwcm9qZWN0JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgcHJvamVjdCcsIHRoaXMpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb24gOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17e1xuICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZFxuICAgICAgICB9fVxuICAgICAgICBkcmFnZ2FibGVcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19