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
  /**
   * Project needs to be initialized as an etch component
   * @param {Object} [props] etch component properties
   */
  constructor(props) {
    this.resource = props.resource;

    _etch2.default.initialize(this);
  }

  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * @param {Object} [props] etch component properties
   * @returns {Promise} description
   */
  async update(props) {
    // console.log('updated', this, props);
    if (props) {
      this.props = props;
      return _etch2.default.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    // console.log('destroyed', this);
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClick(event) {
    console.log(event.type, this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrag(event) {
    console.log(event.type, this.props);
  }

  /* eslint-disable-next-line require-jsdoc */
  didDrop(event) {
    console.log(event.type, this.props);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const selected = this.resource.selected ? 'selected' : '';
    const icon = this.resource.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.resource.icon}-icon` : null;

    return _etch2.default.dom(
      'li',
      {
        className: `list-item pv-project ${selected}`,
        on: {
          click: this.didClick,
          dragstart: this.didDrag,
          drop: this.didDrop
        },
        draggable: true
      },
      _etch2.default.dom(
        'span',
        { className: icon },
        this.resource.name
      )
    );
  }
}
exports.default = ProjectComponent; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJyZXNvdXJjZSIsImV0Y2giLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiZGlkQ2xpY2siLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJ0eXBlIiwiZGlkRHJhZyIsImRpZERyb3AiLCJyZW5kZXIiLCJzZWxlY3RlZCIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsUUFBTCxHQUFnQkQsTUFBTUMsUUFBdEI7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFFBQU1DLE1BQU4sQ0FBY0osS0FBZCxFQUFxQjtBQUNuQjtBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9FLGVBQUtFLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZjtBQUNBLFVBQU1MLGVBQUtLLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2ZDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsSUFBeEI7QUFDRDs7QUFFRDtBQUNBQyxVQUFTSixLQUFULEVBQWdCO0FBQ2RDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS1osS0FBN0I7QUFDRDs7QUFFRDtBQUNBYyxVQUFTTCxLQUFULEVBQWdCO0FBQ2RDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS1osS0FBN0I7QUFDRDs7QUFFRDtBQUNBZSxXQUFVO0FBQ1IsVUFBTUMsV0FBVyxLQUFLZixRQUFMLENBQWNlLFFBQWQsR0FBeUIsVUFBekIsR0FBc0MsRUFBdkQ7QUFDQSxVQUFNQyxPQUNKLEtBQUtoQixRQUFMLENBQWNnQixJQUFkLElBQXNCQyxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBdEIsR0FDSyxRQUFPLEtBQUtuQixRQUFMLENBQWNnQixJQUFLLE9BRC9CLEdBRUksSUFITjs7QUFLQSxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFZLHdCQUF1QkQsUUFBUyxFQUQ5QztBQUVFLFlBQUk7QUFDRkssaUJBQU8sS0FBS2IsUUFEVjtBQUVGYyxxQkFBVyxLQUFLVCxPQUZkO0FBR0ZVLGdCQUFNLEtBQUtUO0FBSFQsU0FGTjtBQU9FO0FBUEY7QUFTRTtBQUFBO0FBQUEsVUFBTSxXQUFXRyxJQUFqQjtBQUF3QixhQUFLaEIsUUFBTCxDQUFjdUI7QUFBdEM7QUFURixLQURGO0FBYUQ7QUFyRW1DO2tCQUFqQjFCLGdCLEVBUHJCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1pdGVtYCAoYWthIHByb2plY3QpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKipcbiAgICogUHJvamVjdCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnJlc291cmNlID0gcHJvcHMucmVzb3VyY2U7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3VwZGF0ZWQnLCB0aGlzLCBwcm9wcyk7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcywgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucmVzb3VyY2Uuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnJlc291cmNlLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5yZXNvdXJjZS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICAgICAgfX1cbiAgICAgICAgZHJhZ2dhYmxlXG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMucmVzb3VyY2UubmFtZX08L3NwYW4+XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==