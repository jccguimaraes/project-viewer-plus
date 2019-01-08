'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
/** @jsx etch.dom */

class IconComponent {
  /**
   *
   * @param {Object} [props] etch component properties
   */
  constructor(props) {
    this.props = props;
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    _etch2.default.initialize(this);
  }

  /**
   *
   */
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    if (props) {
      this.props = props;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  toggleSelected() {
    this.element.classList.toggle('selected');
  }

  /**
   *
   */
  handleClick() {
    this.props.onIconClick(this.props.icon);
    this.toggleSelected();
  }

  /**
   *
   */
  handleMouseOver() {
    this.disposables.add(atom.tooltips.add(this.element, {
      title: this.props.icon,
      delay: {
        show: 500
      },
      class: 'pvp-tooltip'
    }));
  }

  /**
   *
   */
  handleMouseLeave() {
    this.disposables.dispose();
  }

  /**
   *
   * @returns {Object} description
   */
  get events() {
    return {
      click: this.handleClick,
      mouseover: this.handleMouseOver,
      mouseleave: this.handleMouseLeave
    };
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const iconClass = this.props ? `icon ${this.props.icon}-icon ${this.props.selected ? 'selected' : ''}` : 'icon default-icon';

    return _etch2.default.dom('span', { on: this.events, className: iconClass });
  }
}
exports.default = IconComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwidG9nZ2xlU2VsZWN0ZWQiLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJoYW5kbGVNb3VzZU92ZXIiLCJhZGQiLCJhdG9tIiwidG9vbHRpcHMiLCJ0aXRsZSIsImRlbGF5Iiwic2hvdyIsImNsYXNzIiwiaGFuZGxlTW91c2VMZWF2ZSIsImRpc3Bvc2UiLCJldmVudHMiLCJjbGljayIsIm1vdXNlb3ZlciIsIm1vdXNlbGVhdmUiLCJyZW5kZXIiLCJpY29uQ2xhc3MiLCJzZWxlY3RlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBOzs7QUFMQTs7QUFRZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNRixlQUFLRSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjUixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9LLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFREMsbUJBQWtCO0FBQ2hCLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDs7QUFFRDs7O0FBR0FDLGdCQUFlO0FBQ2IsU0FBS2YsS0FBTCxDQUFXZ0IsV0FBWCxDQUF1QixLQUFLaEIsS0FBTCxDQUFXaUIsSUFBbEM7QUFDQSxTQUFLTixjQUFMO0FBQ0Q7O0FBRUQ7OztBQUdBTyxvQkFBbUI7QUFDakIsU0FBS2pCLFdBQUwsQ0FBaUJrQixHQUFqQixDQUNFQyxLQUFLQyxRQUFMLENBQWNGLEdBQWQsQ0FDRSxLQUFLUCxPQURQLEVBQ2dCO0FBQ1pVLGFBQU8sS0FBS3RCLEtBQUwsQ0FBV2lCLElBRE47QUFFWk0sYUFBTztBQUNMQyxjQUFNO0FBREQsT0FGSztBQUtaQyxhQUFPO0FBTEssS0FEaEIsQ0FERjtBQVdEOztBQUVEOzs7QUFHQUMscUJBQW9CO0FBQ2xCLFNBQUt6QixXQUFMLENBQWlCMEIsT0FBakI7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsYUFBTyxLQUFLZCxXQURQO0FBRUxlLGlCQUFXLEtBQUtaLGVBRlg7QUFHTGEsa0JBQVksS0FBS0w7QUFIWixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQU0sV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBS2pDLEtBQUwsR0FDYixRQUFPLEtBQUtBLEtBQUwsQ0FBV2lCLElBQUssU0FBUSxLQUFLakIsS0FBTCxDQUFXa0MsUUFBWCxHQUFzQixVQUF0QixHQUFrQyxFQUFHLEVBRHZELEdBRWQsbUJBRko7O0FBSUEsV0FBTyw2QkFBTSxJQUFJLEtBQUtOLE1BQWYsRUFBdUIsV0FBV0ssU0FBbEMsR0FBUDtBQUNEO0FBNUZnQztrQkFBZG5DLGEiLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25Db21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgdG9nZ2xlU2VsZWN0ZWQgKCkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVDbGljayAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkljb25DbGljayh0aGlzLnByb3BzLmljb24pO1xuICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlTW91c2VPdmVyICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKFxuICAgICAgICB0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5pY29uLFxuICAgICAgICAgIGRlbGF5OiB7XG4gICAgICAgICAgICBzaG93OiA1MDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNsYXNzOiAncHZwLXRvb2x0aXAnXG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVNb3VzZUxlYXZlICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLFxuICAgICAgbW91c2VvdmVyOiB0aGlzLmhhbmRsZU1vdXNlT3ZlcixcbiAgICAgIG1vdXNlbGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbkNsYXNzID0gdGhpcy5wcm9wc1xuICAgICAgPyBgaWNvbiAke3RoaXMucHJvcHMuaWNvbn0taWNvbiAke3RoaXMucHJvcHMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnOiAnJ31gXG4gICAgICA6ICdpY29uIGRlZmF1bHQtaWNvbic7XG5cbiAgICByZXR1cm4gPHNwYW4gb249e3RoaXMuZXZlbnRzfSBjbGFzc05hbWU9e2ljb25DbGFzc30gLz47XG4gIH1cbn1cbiJdfQ==