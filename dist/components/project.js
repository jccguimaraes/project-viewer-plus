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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxnQkFBTixDQUF1QjtBQUNwQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsTUFBTUcsUUFBdEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLE1BQU1JLEtBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUNFTCxNQUFNSyxJQUFOLElBQWNDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFkLEdBQ0ssUUFBT1IsTUFBTUssSUFBSyxPQUR2QixHQUVJLElBSE47QUFJRDs7QUFFRDtBQUNBSSxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0YsTUFBTUcsSUFBdEMsRUFBNEMsSUFBNUM7QUFDRDs7QUFFRDtBQUNBQyxVQUFTSixLQUFULEVBQWdCO0FBQ2RBLFVBQU1LLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCLFlBQTNCLEVBQXlDLEtBQUtmLEVBQTlDO0FBQ0FTLFVBQU1PLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZVixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNTyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1osS0FBVCxFQUFnQjtBQUNkQSxVQUFNYSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FDRWQsTUFBTUssWUFBTixDQUFtQlUsT0FBbkIsQ0FBMkIsWUFBM0IsQ0FERixFQUVFLEtBQUt4QixFQUZQO0FBSUQ7O0FBRUQ7Ozs7QUFJQXlCLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJoQixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JlLEtBQS9COztBQUVBLFNBQUs1QixXQUFMLENBQWlCNEIsS0FBakI7O0FBRUEsU0FBS0gsU0FBTCxHQUFpQkcsTUFBTUgsU0FBdkI7QUFDQUksbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsUUFBTUMsTUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQ25CaEIsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBQXFDZSxLQUFyQztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUs1QixXQUFMLENBQWlCNEIsS0FBakI7QUFDQSxhQUFPQyxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2Z0QixZQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUMsSUFBakM7QUFDQSxVQUFNZ0IsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FDLFdBQVU7QUFDUnZCLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQyxJQUFoQzs7QUFFQSxVQUFNVCxXQUFXLEtBQUtBLFFBQUwsR0FBZ0IsVUFBaEIsR0FBNkIsRUFBOUM7QUFDQSxVQUFNRSxPQUNKLEtBQUtBLElBQUwsSUFBYUMsS0FBS0MsUUFBTCxDQUFjQyxlQUFkLENBQThCLFlBQTlCLENBQWIsR0FDSSxLQUFLSCxJQURULEdBRUksSUFITjs7QUFLQSxXQUNFO0FBQUE7QUFBQTtBQUNFLFlBQUksS0FBS0osRUFEWDtBQUVFLG1CQUFZLHdCQUF1QkUsUUFBUyxFQUY5QztBQUdFLFlBQUk7QUFDRmdDLGlCQUFPLEtBQUsxQixRQURWO0FBRUYyQixxQkFBVyxLQUFLdEIsT0FGZDtBQUdGdUIsbUJBQVMsS0FBS2pCLFVBSFo7QUFJRmtCLGdCQUFNLEtBQUtoQjtBQUpULFNBSE47QUFTRTtBQVRGO0FBV0U7QUFBQTtBQUFBLFVBQU0sV0FBV2pCLElBQWpCO0FBQXdCLGFBQUtIO0FBQTdCO0FBWEYsS0FERjtBQWVEO0FBekdtQztrQkFBakJKLGdCLEVBUHJCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLnNlbGVjdGVkID0gZW50cnkuc2VsZWN0ZWQ7XG4gICAgdGhpcy5wYXRocyA9IGVudHJ5LnBhdGhzO1xuICAgIHRoaXMuaWNvbiA9XG4gICAgICBlbnRyeS5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke2VudHJ5Lmljb259LWljb25gXG4gICAgICAgIDogbnVsbDtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDbGljayBwcm9qZWN0JywgZXZlbnQudHlwZSwgdGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5pZCk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWdFbmQgKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJvcCBlbmQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJvcCBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcChcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksXG4gICAgICB0aGlzLmlkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIHByb2plY3QnLCBwcm9wcyk7XG5cbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBwcm9qZWN0JywgdGhpcywgcHJvcHMpO1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBwcm9qZWN0JywgdGhpcyk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgcHJvamVjdCcsIHRoaXMpO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17e1xuICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgIGRyYWdlbmQ6IHRoaXMuZGlkRHJhZ0VuZCxcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==