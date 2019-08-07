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
    console.log('didClick project', event.type, this);
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
    console.log('created project', props);
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
      console.log('updated project', _this, props);

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
      console.log('destroyed project', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered project', this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIm9wZW4iLCJwYXRoc1RvT3BlbiIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZHJvcEVmZmVjdCIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlkRHJvcCIsIm9uRGlkRHJvcCIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayIsImRyYWdzdGFydCIsImRyYWdlbmQiLCJkcmFnb3ZlciIsImRyb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsZ0JBQU4sQ0FBdUI7QUFDcEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLLENBQUNDLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNFLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsS0FBSyxDQUFDRyxRQUF0QjtBQUNBLFNBQUtDLEtBQUwsR0FBYUosS0FBSyxDQUFDSSxLQUFuQjtBQUNBLFNBQUtDLElBQUwsR0FDRUwsS0FBSyxDQUFDSyxJQUFOLElBQWNDLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlB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LElBQWFDLElBQUksQ0FBQ0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWIsR0FDSSxLQUFLSCxJQURULEdBRUksSUFITjtBQUtBLFdBQ0U7QUFDRSxNQUFBLEVBQUUsRUFBRSxLQUFLSixFQURYO0FBRUUsTUFBQSxTQUFTLGlDQUEwQkUsUUFBMUIsQ0FGWDtBQUdFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZxQyxRQUFBQSxLQUFLLEVBQUUsS0FBSy9CLFFBRFY7QUFFRmdDLFFBQUFBLFNBQVMsRUFBRSxLQUFLekIsT0FGZDtBQUdGMEIsUUFBQUEsT0FBTyxFQUFFLEtBQUtuQixVQUhaO0FBSUZvQixRQUFBQSxRQUFRLEVBQUUsS0FBS2xCLFdBSmI7QUFLRm1CLFFBQUFBLElBQUksRUFBRSxLQUFLaEI7QUFMVCxPQUhOO0FBVUUsTUFBQSxTQUFTO0FBVlgsT0FZRTtBQUFNLE1BQUEsU0FBUyxFQUFFdkI7QUFBakIsT0FBd0IsS0FBS0gsSUFBN0IsQ0FaRixDQURGO0FBZ0JEOztBQXRIbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gZW50cnkuc2VsZWN0ZWQ7XG4gICAgdGhpcy5wYXRocyA9IGVudHJ5LnBhdGhzO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDbGljayBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgYXRvbS5vcGVuKHsgcGF0aHNUb09wZW46IHRoaXMucGF0aHMgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdPdmVyIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBwcm9qZWN0JywgcHJvcHMpO1xuXG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgcHJvamVjdCcsIHRoaXMsIHByb3BzKTtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgcHJvamVjdCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIHByb2plY3QnLCB0aGlzKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgZHJhZ292ZXI6IHRoaXMuZGlkRHJhZ092ZXIsXG4gICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgIH19XG4gICAgICAgIGRyYWdnYWJsZVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=