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
      return _etch2.default.update(this, false);
    }

    return Promise.resolve();
  }

  /**
   *
   */
  handleClick() {
    this.props.onIconClick(this.props.icon);
    this.element.classList.toggle('selected');
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
    const iconClass = this.props ? `icon ${this.props.icon}-icon` : 'icon default-icon';

    return _etch2.default.dom('span', { on: this.events, className: iconClass });
  }
}
exports.default = IconComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlTW91c2VPdmVyIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUE7OztBQUxBOztBQVFlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0ssZUFBS0csTUFBTCxDQUFZLElBQVosRUFBa0IsS0FBbEIsQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLWCxLQUFMLENBQVdZLFdBQVgsQ0FBdUIsS0FBS1osS0FBTCxDQUFXYSxJQUFsQztBQUNBLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDs7QUFFRDs7O0FBR0FDLG9CQUFtQjtBQUNqQixTQUFLaEIsV0FBTCxDQUFpQmlCLEdBQWpCLENBQ0VDLEtBQUtDLFFBQUwsQ0FBY0YsR0FBZCxDQUNFLEtBQUtKLE9BRFAsRUFDZ0I7QUFDWk8sYUFBTyxLQUFLckIsS0FBTCxDQUFXYSxJQUROO0FBRVpTLGFBQU87QUFDTEMsY0FBTTtBQURELE9BRks7QUFLWkMsYUFBTztBQUxLLEtBRGhCLENBREY7QUFXRDs7QUFFRDs7O0FBR0FDLHFCQUFvQjtBQUNsQixTQUFLeEIsV0FBTCxDQUFpQnlCLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLGFBQU8sS0FBS2pCLFdBRFA7QUFFTGtCLGlCQUFXLEtBQUtaLGVBRlg7QUFHTGEsa0JBQVksS0FBS0w7QUFIWixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQU0sV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBS2hDLEtBQUwsR0FDYixRQUFPLEtBQUtBLEtBQUwsQ0FBV2EsSUFBSyxPQURWLEdBRWQsbUJBRko7O0FBSUEsV0FBTyw2QkFBTSxJQUFJLEtBQUtjLE1BQWYsRUFBdUIsV0FBV0ssU0FBbEMsR0FBUDtBQUNEO0FBeEZnQztrQkFBZGxDLGEiLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25Db21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcywgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlQ2xpY2sgKCkge1xuICAgIHRoaXMucHJvcHMub25JY29uQ2xpY2sodGhpcy5wcm9wcy5pY29uKTtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlTW91c2VPdmVyICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKFxuICAgICAgICB0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgICB0aXRsZTogdGhpcy5wcm9wcy5pY29uLFxuICAgICAgICAgIGRlbGF5OiB7XG4gICAgICAgICAgICBzaG93OiA1MDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNsYXNzOiAncHZwLXRvb2x0aXAnXG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVNb3VzZUxlYXZlICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLFxuICAgICAgbW91c2VvdmVyOiB0aGlzLmhhbmRsZU1vdXNlT3ZlcixcbiAgICAgIG1vdXNlbGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbkNsYXNzID0gdGhpcy5wcm9wc1xuICAgICAgPyBgaWNvbiAke3RoaXMucHJvcHMuaWNvbn0taWNvbmBcbiAgICAgIDogJ2ljb24gZGVmYXVsdC1pY29uJztcblxuICAgIHJldHVybiA8c3BhbiBvbj17dGhpcy5ldmVudHN9IGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgfVxufVxuIl19