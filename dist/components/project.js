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
    this.icon = entry.icon ? `icon ${entry.icon}-icon` : null;
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
    const selected = this.selected ? ' selected' : '';
    return _etch.default.dom("li", {
      id: this.id,
      className: `list-item pv-project${selected}`,
      on: {
        click: this.didClick,
        dragstart: this.didDrag,
        dragend: this.didDragEnd,
        dragover: this.didDragOver,
        drop: this.didDrop
      },
      draggable: true
    }, _etch.default.dom("span", {
      className: this.icon
    }, this.name));
  }

}

exports.default = ProjectComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImRpZENsaWNrIiwiZXZlbnQiLCJhdG9tIiwib3BlbiIsInBhdGhzVG9PcGVuIiwiZGlkRHJhZyIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJkcm9wRWZmZWN0IiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyYWdPdmVyIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJkaWREcm9wIiwib25EaWREcm9wIiwiZ2V0RGF0YSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJhZ2VuZCIsImRyYWdvdmVyIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7O0FBRkE7O0FBSUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsS0FBSyxDQUFDQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBSyxDQUFDRSxJQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JILEtBQUssQ0FBQ0csUUFBdEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLEtBQUssQ0FBQ0ksS0FBbkI7QUFDQSxTQUFLQyxJQUFMLEdBQVlMLEtBQUssQ0FBQ0ssSUFBTixHQUFjLFFBQU9MLEtBQUssQ0FBQ0ssSUFBSyxPQUFoQyxHQUF5QyxJQUFyRDtBQUNEO0FBRUQ7OztBQUNBQyxFQUFBQSxRQUFRLENBQUVDLEtBQUYsRUFBUztBQUNmQyxJQUFBQSxJQUFJLENBQUNDLElBQUwsQ0FBVTtBQUFFQyxNQUFBQSxXQUFXLEVBQUUsS0FBS047QUFBcEIsS0FBVjtBQUNEO0FBRUQ7OztBQUNBTyxFQUFBQSxPQUFPLENBQUVKLEtBQUYsRUFBUztBQUNkQSxJQUFBQSxLQUFLLENBQUNLLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCLFlBQTNCLEVBQXlDLEtBQUtaLEVBQTlDO0FBQ0FNLElBQUFBLEtBQUssQ0FBQ0ssWUFBTixDQUFtQkUsVUFBbkIsR0FBZ0MsTUFBaEM7QUFDQVAsSUFBQUEsS0FBSyxDQUFDUSxNQUFOLENBQWFDLFNBQWIsQ0FBdUJDLEdBQXZCLENBQTJCLFVBQTNCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFDLEVBQUFBLFVBQVUsQ0FBRVgsS0FBRixFQUFTO0FBQ2pCQSxJQUFBQSxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkcsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsV0FBVyxDQUFFYixLQUFGLEVBQVM7QUFDbEJBLElBQUFBLEtBQUssQ0FBQ2MsY0FBTjtBQUNBZCxJQUFBQSxLQUFLLENBQUNlLGVBQU47QUFFQWYsSUFBQUEsS0FBSyxDQUFDSyxZQUFOLENBQW1CRSxVQUFuQixHQUFnQyxNQUFoQztBQUNBUCxJQUFBQSxLQUFLLENBQUNRLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkcsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDtBQUVEOzs7Ozs7QUFJQUksRUFBQUEsT0FBTyxDQUFFaEIsS0FBRixFQUFTO0FBQ2RBLElBQUFBLEtBQUssQ0FBQ2UsZUFBTjtBQUNBZixJQUFBQSxLQUFLLENBQUNjLGNBQU47QUFFQSxTQUFLRyxTQUFMLENBQWVqQixLQUFLLENBQUNLLFlBQU4sQ0FBbUJhLE9BQW5CLENBQTJCLFlBQTNCLENBQWYsRUFBeUQsS0FBS3hCLEVBQTlEO0FBQ0Q7QUFFRDs7Ozs7O0FBSUF5QixFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLNUIsV0FBTCxDQUFpQjRCLEtBQWpCO0FBRUEsU0FBS0gsU0FBTCxHQUFpQkcsS0FBSyxDQUFDSCxTQUF2Qjs7QUFDQUksa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLNUIsV0FBTCxDQUFpQjRCLEtBQWpCO0FBQ0EsYUFBT0MsY0FBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0Q7QUFFRDs7O0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1MLGNBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsVUFBTS9CLFFBQVEsR0FBRyxLQUFLQSxRQUFMLEdBQWdCLFdBQWhCLEdBQThCLEVBQS9DO0FBRUEsV0FDRTtBQUNFLE1BQUEsRUFBRSxFQUFFLEtBQUtGLEVBRFg7QUFFRSxNQUFBLFNBQVMsRUFBRyx1QkFBc0JFLFFBQVMsRUFGN0M7QUFHRSxNQUFBLEVBQUUsRUFBRTtBQUNGZ0MsUUFBQUEsS0FBSyxFQUFFLEtBQUs3QixRQURWO0FBRUY4QixRQUFBQSxTQUFTLEVBQUUsS0FBS3pCLE9BRmQ7QUFHRjBCLFFBQUFBLE9BQU8sRUFBRSxLQUFLbkIsVUFIWjtBQUlGb0IsUUFBQUEsUUFBUSxFQUFFLEtBQUtsQixXQUpiO0FBS0ZtQixRQUFBQSxJQUFJLEVBQUUsS0FBS2hCO0FBTFQsT0FITjtBQVVFLE1BQUEsU0FBUztBQVZYLE9BWUU7QUFBTSxNQUFBLFNBQVMsRUFBRSxLQUFLbEI7QUFBdEIsT0FBNkIsS0FBS0gsSUFBbEMsQ0FaRixDQURGO0FBZ0JEOztBQXhHbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gZW50cnkuc2VsZWN0ZWQ7XG4gICAgdGhpcy5wYXRocyA9IGVudHJ5LnBhdGhzO1xuICAgIHRoaXMuaWNvbiA9IGVudHJ5Lmljb24gPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gIDogbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGF0b20ub3Blbih7IHBhdGhzVG9PcGVuOiB0aGlzLnBhdGhzIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMuaWQpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMub25EaWREcm9wKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksIHRoaXMuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2plY3QgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCA/ICcgc2VsZWN0ZWQnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGlkPXt0aGlzLmlkfVxuICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWl0ZW0gcHYtcHJvamVjdCR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgZHJhZ292ZXI6IHRoaXMuZGlkRHJhZ092ZXIsXG4gICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgIH19XG4gICAgICAgIGRyYWdnYWJsZVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3RoaXMuaWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==