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
   * @param {Object} props - description
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
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update(props) {
    if (props) {
      this.props = props;
      return _etch2.default.update(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlTW91c2VPdmVyIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUE7OztBQUxBOztBQVFlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNSLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0ssZUFBS0csTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLWCxLQUFMLENBQVdZLFdBQVgsQ0FBdUIsS0FBS1osS0FBTCxDQUFXYSxJQUFsQztBQUNBLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDs7QUFFRDs7O0FBR0FDLG9CQUFtQjtBQUNqQixTQUFLaEIsV0FBTCxDQUFpQmlCLEdBQWpCLENBQ0VDLEtBQUtDLFFBQUwsQ0FBY0YsR0FBZCxDQUNFLEtBQUtKLE9BRFAsRUFDZ0I7QUFDWk8sYUFBTyxLQUFLckIsS0FBTCxDQUFXYSxJQUROO0FBRVpTLGFBQU87QUFDTEMsY0FBTTtBQURELE9BRks7QUFLWkMsYUFBTztBQUxLLEtBRGhCLENBREY7QUFXRDs7QUFFRDs7O0FBR0FDLHFCQUFvQjtBQUNsQixTQUFLeEIsV0FBTCxDQUFpQnlCLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLGFBQU8sS0FBS2pCLFdBRFA7QUFFTGtCLGlCQUFXLEtBQUtaLGVBRlg7QUFHTGEsa0JBQVksS0FBS0w7QUFIWixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQU0sV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBS2hDLEtBQUwsR0FDYixRQUFPLEtBQUtBLEtBQUwsQ0FBV2EsSUFBSyxPQURWLEdBRWQsbUJBRko7O0FBSUEsV0FBTyw2QkFBTSxJQUFJLEtBQUtjLE1BQWYsRUFBdUIsV0FBV0ssU0FBbEMsR0FBUDtBQUNEO0FBeEZnQztrQkFBZGxDLGEiLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEljb25Db21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZUNsaWNrICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSWNvbkNsaWNrKHRoaXMucHJvcHMuaWNvbik7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZU1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZChcbiAgICAgICAgdGhpcy5lbGVtZW50LCB7XG4gICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMuaWNvbixcbiAgICAgICAgICBkZWxheToge1xuICAgICAgICAgICAgc2hvdzogNTAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczogJ3B2cC10b29sdGlwJ1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGljazogdGhpcy5oYW5kbGVDbGljayxcbiAgICAgIG1vdXNlb3ZlcjogdGhpcy5oYW5kbGVNb3VzZU92ZXIsXG4gICAgICBtb3VzZWxlYXZlOiB0aGlzLmhhbmRsZU1vdXNlTGVhdmVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb25DbGFzcyA9IHRoaXMucHJvcHNcbiAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLmljb259LWljb25gXG4gICAgICA6ICdpY29uIGRlZmF1bHQtaWNvbic7XG5cbiAgICByZXR1cm4gPHNwYW4gb249e3RoaXMuZXZlbnRzfSBjbGFzc05hbWU9e2ljb25DbGFzc30gLz47XG4gIH1cbn1cbiJdfQ==