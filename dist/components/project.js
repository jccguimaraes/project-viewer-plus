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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIm9wZW4iLCJwYXRoc1RvT3BlbiIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxnQkFBTixDQUF1QjtBQUNwQztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxFQUFMLEdBQVVELEtBQUssQ0FBQ0MsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLEtBQUssQ0FBQ0UsSUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCSCxLQUFLLENBQUNHLFFBQXRCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhSixLQUFLLENBQUNJLEtBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUNFTCxLQUFLLENBQUNLLElBQU4sSUFBY0MsSUFBSSxDQUFDQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBZCxrQkFDWVIsS0FBSyxDQUFDSyxJQURsQixhQUVJLElBSE47QUFJRDtBQUVEOzs7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QWpCLE9BQXdCLEtBQUtILElBQTdCLENBWEYsQ0FERjtBQWVEOztBQXZHbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gZW50cnkuc2VsZWN0ZWQ7XG4gICAgdGhpcy5wYXRocyA9IGVudHJ5LnBhdGhzO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDbGljayBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gICAgYXRvbS5vcGVuKHsgcGF0aHNUb09wZW46IHRoaXMucGF0aHMgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpLCB0aGlzLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIHByb2plY3QnLCBwcm9wcyk7XG5cbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBwcm9qZWN0JywgdGhpcywgcHJvcHMpO1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBwcm9qZWN0JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgcHJvamVjdCcsIHRoaXMpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17e1xuICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZCxcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==