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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsInVwZGF0ZUVudHJ5IiwiZW50cnkiLCJpZCIsIm5hbWUiLCJzZWxlY3RlZCIsInBhdGhzIiwiaWNvbiIsImF0b20iLCJwYWNrYWdlcyIsImlzUGFja2FnZUFjdGl2ZSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxnQkFBTixDQUF1QjtBQUNwQztBQUNBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsTUFBTUMsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLE1BQU1FLElBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkgsTUFBTUcsUUFBdEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFKLE1BQU1JLEtBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUNFTCxNQUFNSyxJQUFOLElBQWNDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFkLEdBQ0ssUUFBT1IsTUFBTUssSUFBSyxPQUR2QixHQUVJLElBSE47QUFJRDs7QUFFRDtBQUNBSSxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ0YsTUFBTUcsSUFBdEMsRUFBNEMsSUFBNUM7QUFDRDs7QUFFRDtBQUNBQyxVQUFTSixLQUFULEVBQWdCO0FBQ2RBLFVBQU1LLFlBQU4sQ0FBbUJDLE9BQW5CLENBQTJCLFlBQTNCLEVBQXlDLEtBQUtmLEVBQTlDO0FBQ0FTLFVBQU1PLE1BQU4sQ0FBYUMsU0FBYixDQUF1QkMsR0FBdkIsQ0FBMkIsVUFBM0I7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZVixLQUFaLEVBQW1CO0FBQ2pCQSxVQUFNTyxNQUFOLENBQWFDLFNBQWIsQ0FBdUJHLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsVUFBU1osS0FBVCxFQUFnQjtBQUNkQSxVQUFNYSxlQUFOOztBQUVBLFNBQUtDLFNBQUwsQ0FDRWQsTUFBTUssWUFBTixDQUFtQlUsT0FBbkIsQ0FBMkIsWUFBM0IsQ0FERixFQUVFLEtBQUt4QixFQUZQO0FBSUQ7O0FBRUQ7Ozs7QUFJQXlCLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEJoQixZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JlLEtBQS9COztBQUVBLFNBQUs1QixXQUFMLENBQWlCNEIsS0FBakI7O0FBRUEsU0FBS0gsU0FBTCxHQUFpQkcsTUFBTUgsU0FBdkI7QUFDQUksbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsUUFBTUMsTUFBTixDQUFjSCxLQUFkLEVBQXFCO0FBQ25CaEIsWUFBUUMsR0FBUixDQUFZLGlCQUFaLEVBQStCLElBQS9CLEVBQXFDZSxLQUFyQztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9DLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZnRCLFlBQVFDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxJQUFqQztBQUNBLFVBQU1nQixlQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUMsV0FBVTtBQUNSdkIsWUFBUUMsR0FBUixDQUFZLGtCQUFaLEVBQWdDLElBQWhDOztBQUVBLFVBQU1ULFdBQVcsS0FBS0EsUUFBTCxHQUFnQixVQUFoQixHQUE2QixFQUE5QztBQUNBLFVBQU1FLE9BQ0osS0FBS0EsSUFBTCxJQUFhQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOOztBQUtBLFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBSSxLQUFLSixFQURYO0FBRUUsbUJBQVksd0JBQXVCRSxRQUFTLEVBRjlDO0FBR0UsWUFBSTtBQUNGZ0MsaUJBQU8sS0FBSzFCLFFBRFY7QUFFRjJCLHFCQUFXLEtBQUt0QixPQUZkO0FBR0Z1QixtQkFBUyxLQUFLakIsVUFIWjtBQUlGa0IsZ0JBQU0sS0FBS2hCO0FBSlQsU0FITjtBQVNFO0FBVEY7QUFXRTtBQUFBO0FBQUEsVUFBTSxXQUFXakIsSUFBakI7QUFBd0IsYUFBS0g7QUFBN0I7QUFYRixLQURGO0FBZUQ7QUF6R21DO2tCQUFqQkosZ0IsRUFQckIiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGdlbmVyYXRlcyBhbiBBdG9tIGBsaXN0LWl0ZW1gIChha2EgcHJvamVjdClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChlbnRyeSkge1xuICAgIHRoaXMuaWQgPSBlbnRyeS5pZDtcbiAgICB0aGlzLm5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBlbnRyeS5zZWxlY3RlZDtcbiAgICB0aGlzLnBhdGhzID0gZW50cnkucGF0aHM7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2RpZENsaWNrIHByb2plY3QnLCBldmVudC50eXBlLCB0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBcbiAgICB0aGlzLm9uRGlkRHJvcChcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksXG4gICAgICB0aGlzLmlkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIHByb2plY3QnLCBwcm9wcyk7XG5cbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBjb25zb2xlLmxvZygndXBkYXRlZCBwcm9qZWN0JywgdGhpcywgcHJvcHMpO1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgcHJvamVjdCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIHByb2plY3QnLCB0aGlzKTtcblxuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgaWQ9e3RoaXMuaWR9XG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgIH19XG4gICAgICAgIGRyYWdnYWJsZVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=