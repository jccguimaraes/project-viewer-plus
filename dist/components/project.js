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
    atom.open({ pathsToOpen: this.paths });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIm9wZW4iLCJwYXRoc1RvT3BlbiIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxnQkFBTixDQUF1QjtBQUNwQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsTUFBTUcsUUFBdEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLE1BQU1JLEtBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUNFTCxNQUFNSyxJQUFOLElBQWNDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFkLEdBQ0ssUUFBT1IsTUFBTUssSUFBSyxPQUR2QixHQUVJLElBSE47QUFJRDs7QUFFRDtBQUNBSSxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0YsTUFBTUcsSUFBdEMsRUFBNEMsSUFBNUM7QUFDQVAsU0FBS1EsSUFBTCxDQUFVLEVBQUVDLGFBQWEsS0FBS1gsS0FBcEIsRUFBVjtBQUNEOztBQUVEO0FBQ0FZLFVBQVNOLEtBQVQsRUFBZ0I7QUFDZEEsVUFBTU8sWUFBTixDQUFtQkMsT0FBbkIsQ0FBMkIsWUFBM0IsRUFBeUMsS0FBS2pCLEVBQTlDO0FBQ0FTLFVBQU1TLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZWixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNUyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU2QsS0FBVCxFQUFnQjtBQUNkQSxVQUFNZSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FBZWhCLE1BQU1PLFlBQU4sQ0FBbUJVLE9BQW5CLENBQTJCLFlBQTNCLENBQWYsRUFBeUQsS0FBSzFCLEVBQTlEO0FBQ0Q7O0FBRUQ7Ozs7QUFJQTJCLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJsQixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JpQixLQUEvQjs7QUFFQSxTQUFLOUIsV0FBTCxDQUFpQjhCLEtBQWpCOztBQUVBLFNBQUtILFNBQUwsR0FBaUJHLE1BQU1ILFNBQXZCO0FBQ0FJLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQmxCLFlBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQixJQUEvQixFQUFxQ2lCLEtBQXJDO0FBQ0EsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBSzlCLFdBQUwsQ0FBaUI4QixLQUFqQjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZnhCLFlBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBLFVBQU1rQixlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSekIsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDOztBQUVBLFVBQU1ULFdBQVcsS0FBS0EsUUFBTCxHQUFnQixVQUFoQixHQUE2QixFQUE5QztBQUNBLFVBQU1FLE9BQ0osS0FBS0EsSUFBTCxJQUFhQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOOztBQUtBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBSSxLQUFLSixFQURYO0FBRUUsbUJBQVksd0JBQXVCRSxRQUFTLEVBRjlDO0FBR0UsWUFBSTtBQUNGa0MsaUJBQU8sS0FBSzVCLFFBRFY7QUFFRjZCLHFCQUFXLEtBQUt0QixPQUZkO0FBR0Z1QixtQkFBUyxLQUFLakIsVUFIWjtBQUlGa0IsZ0JBQU0sS0FBS2hCO0FBSlQsU0FITjtBQVNFO0FBVEY7QUFXRTtBQUFBO0FBQUEsVUFBTSxXQUFXbkIsSUFBakI7QUFBd0IsYUFBS0g7QUFBN0I7QUFYRixLQURGO0FBZUQ7QUF2R21DO2tCQUFqQkosZ0IsRUFQckIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LWl0ZW1gIChha2EgcHJvamVjdClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBlbnRyeS5zZWxlY3RlZDtcbiAgICB0aGlzLnBhdGhzID0gZW50cnkucGF0aHM7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZENsaWNrIHByb2plY3QnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgICBhdG9tLm9wZW4oeyBwYXRoc1RvT3BlbjogdGhpcy5wYXRocyB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMub25EaWREcm9wKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksIHRoaXMuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3QgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgcHJvamVjdCcsIHByb3BzKTtcblxuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AgPSBwcm9wcy5vbkRpZERyb3A7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIHByb2plY3QnLCB0aGlzLCBwcm9wcyk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIHByb2plY3QnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJlZCBwcm9qZWN0JywgdGhpcyk7XG5cbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IHRoaXMuaWNvblxuICAgICAgICA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGlkPXt0aGlzLmlkfVxuICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWl0ZW0gcHYtcHJvamVjdCAke3NlbGVjdGVkfWB9XG4gICAgICAgIG9uPXt7XG4gICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kLFxuICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICB9fVxuICAgICAgICBkcmFnZ2FibGVcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19