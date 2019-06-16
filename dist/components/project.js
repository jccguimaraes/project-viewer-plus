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
    atom.emitter.emit('application:reopen-project', { paths: this.paths });
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrag(event) {
    event.dataTransfer.setData('text/plain', this.id);
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
  didDrop(event) {
    event.stopPropagation();

    this.onDidDrop(event.dataTransfer.getData('text/plain'), this.id);
  }

  /**
   * Project needs to be initialized as an etch component
   * @param {Object} props - etch component properties
   */
  constructor(props) {
    console.log('created project', props);

    this.updateEntry(props);

    this.onDidDrop = props.onDidDrop;
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
      this.updateEntry(props);
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
          dragend: this.didDragEnd,
          drop: this.didDrop
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImVtaXR0ZXIiLCJlbWl0IiwiZGlkRHJhZyIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiZGlkRHJvcCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uRGlkRHJvcCIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayIsImRyYWdzdGFydCIsImRyYWdlbmQiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDO0FBQ0FDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxNQUFNQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsTUFBTUUsSUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxNQUFNRyxRQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosTUFBTUksS0FBbkI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VMLE1BQU1LLElBQU4sSUFBY0MsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWQsR0FDSyxRQUFPUixNQUFNSyxJQUFLLE9BRHZCLEdBRUksSUFITjtBQUlEOztBQUVEO0FBQ0FJLFdBQVVDLEtBQVYsRUFBaUI7QUFDZkMsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDRixNQUFNRyxJQUF0QyxFQUE0QyxJQUE1QztBQUNBUCxTQUFLUSxPQUFMLENBQWFDLElBQWIsQ0FBa0IsNEJBQWxCLEVBQWdELEVBQUVYLE9BQU8sS0FBS0EsS0FBZCxFQUFoRDtBQUNEOztBQUVEO0FBQ0FZLFVBQVNOLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTU8sWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBS2pCLEVBQTlDO0FBQ0FTLFVBQU1TLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZWixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNUyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU2QsS0FBVCxFQUFnQjtBQUNkQSxVQUFNZSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FBZWhCLE1BQU1PLFlBQU4sQ0FBbUJVLE9BQW5CLENBQTJCLFlBQTNCLENBQWYsRUFBeUQsS0FBSzFCLEVBQTlEO0FBQ0Q7O0FBRUQ7Ozs7QUFJQTJCLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJsQixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JpQixLQUEvQjs7QUFFQSxTQUFLOUIsV0FBTCxDQUFpQjhCLEtBQWpCOztBQUVBLFNBQUtILFNBQUwsR0FBaUJHLE1BQU1ILFNBQXZCO0FBQ0FJLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQmxCLFlBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQixFQUFxQ2lCLEtBQXJDO0FBQ0EsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBSzlCLFdBQUwsQ0FBaUI4QixLQUFqQjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZnhCLFlBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBLFVBQU1rQixlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSekIsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDOztBQUVBLFVBQU1ULFdBQVcsS0FBS0EsUUFBTCxHQUFnQixVQUFoQixHQUE2QixFQUE5QztBQUNBLFVBQU1FLE9BQ0osS0FBS0EsSUFBTCxJQUFhQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOOztBQUtBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBSSxLQUFLSixFQURYO0FBRUUsbUJBQVksd0JBQXVCRSxRQUFTLEVBRjlDO0FBR0UsWUFBSTtBQUNGa0MsaUJBQU8sS0FBSzVCLFFBRFY7QUFFRjZCLHFCQUFXLEtBQUt0QixPQUZkO0FBR0Z1QixtQkFBUyxLQUFLakIsVUFIWjtBQUlGa0IsZ0JBQU0sS0FBS2hCO0FBSlQsU0FITjtBQVNFO0FBVEY7QUFXRTtBQUFBO0FBQUEsVUFBTSxXQUFXbkIsSUFBakI7QUFBd0IsYUFBS0g7QUFBN0I7QUFYRixLQURGO0FBZUQ7QUF2R21DO2tCQUFqQkosZ0IsRUFQckIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LWl0ZW1gIChha2EgcHJvamVjdClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBlbnRyeS5zZWxlY3RlZDtcbiAgICB0aGlzLnBhdGhzID0gZW50cnkucGF0aHM7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZENsaWNrIHByb2plY3QnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgICBhdG9tLmVtaXR0ZXIuZW1pdCgnYXBwbGljYXRpb246cmVvcGVuLXByb2plY3QnLCB7IHBhdGhzOiB0aGlzLnBhdGhzIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMuaWQpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBwcm9qZWN0JywgcHJvcHMpO1xuXG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgcHJvamVjdCcsIHRoaXMsIHByb3BzKTtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgcHJvamVjdCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIHByb2plY3QnLCB0aGlzKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgIH19XG4gICAgICAgIGRyYWdnYWJsZVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=