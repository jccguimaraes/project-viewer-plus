"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    this.icon = entry.icon && atom.packages.isPackageActive('file-icons') ? "icon ".concat(entry.icon, "-icon") : null;
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


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.updateEntry(props);

        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    var selected = this.selected ? 'selected' : '';
    var icon = this.icon && atom.packages.isPackageActive('file-icons') ? this.icon : null;
    return _etch.default.dom("li", {
      id: this.id,
      className: "list-item pv-project ".concat(selected),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJvcGVuIiwicGF0aHNUb09wZW4iLCJkaWREcmFnIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImRyb3BFZmZlY3QiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkaWREcmFnRW5kIiwicmVtb3ZlIiwiZGlkRHJhZ092ZXIiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImRpZERyb3AiLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJhZ292ZXIiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsS0FBSyxDQUFDQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBSyxDQUFDRSxJQUFsQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JILEtBQUssQ0FBQ0csUUFBdEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLEtBQUssQ0FBQ0ksS0FBbkI7QUFDQSxTQUFLQyxJQUFMLEdBQ0VMLEtBQUssQ0FBQ0ssSUFBTixJQUFjQyxJQUFJLENBQUNDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFkLGtCQUNZUixLQUFLLENB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QUUsS0FBS2hCO0FBTFQsT0FITjtBQVVFLE1BQUEsU0FBUztBQVZYLE9BWUU7QUFBTSxNQUFBLFNBQVMsRUFBRXBCO0FBQWpCLE9BQXdCLEtBQUtILElBQTdCLENBWkYsQ0FERjtBQWdCRDs7QUEvR21DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtaXRlbWAgKGFrYSBwcm9qZWN0KVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0Q29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGVudHJ5LnNlbGVjdGVkO1xuICAgIHRoaXMucGF0aHMgPSBlbnRyeS5wYXRocztcbiAgICB0aGlzLmljb24gPVxuICAgICAgZW50cnkuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHtlbnRyeS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBhdG9tLm9wZW4oeyBwYXRoc1RvT3BlbjogdGhpcy5wYXRocyB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ092ZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpLCB0aGlzLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AgPSBwcm9wcy5vbkRpZERyb3A7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IHRoaXMuaWNvblxuICAgICAgICA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGlkPXt0aGlzLmlkfVxuICAgICAgICBjbGFzc05hbWU9e2BsaXN0LWl0ZW0gcHYtcHJvamVjdCAke3NlbGVjdGVkfWB9XG4gICAgICAgIG9uPXt7XG4gICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kLFxuICAgICAgICAgIGRyYWdvdmVyOiB0aGlzLmRpZERyYWdPdmVyLFxuICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICB9fVxuICAgICAgICBkcmFnZ2FibGVcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19