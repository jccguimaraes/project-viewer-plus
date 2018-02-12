'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let IconComponent = class IconComponent {
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
  destroy() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this);
    })();
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this2.props = props;
        return _etch2.default.update(_this2);
      }

      return Promise.resolve();
    })();
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
};
exports.default = IconComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlTW91c2VPdmVyIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7Ozs7OzJjQUhBOztBQUtBOzs7SUFHTUEsYSxHQUFOLE1BQU1BLGFBQU4sQ0FBb0I7QUFDbEI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxtQkFBZjs7QUFFQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLE9BQU47QUFEZTtBQUVoQjs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjTCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsZUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBTyxlQUFLSyxNQUFMLFFBQVA7QUFDRDs7QUFFRCxhQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFObUI7QUFPcEI7O0FBRUQ7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtSLEtBQUwsQ0FBV1MsV0FBWCxDQUF1QixLQUFLVCxLQUFMLENBQVdVLElBQWxDO0FBQ0EsU0FBS0MsT0FBTCxDQUFhQyxTQUFiLENBQXVCQyxNQUF2QixDQUE4QixVQUE5QjtBQUNEOztBQUVEOzs7QUFHQUMsb0JBQW1CO0FBQ2pCLFNBQUtiLFdBQUwsQ0FBaUJjLEdBQWpCLENBQ0VDLEtBQUtDLFFBQUwsQ0FBY0YsR0FBZCxDQUNFLEtBQUtKLE9BRFAsRUFDZ0I7QUFDWk8sYUFBTyxLQUFLbEIsS0FBTCxDQUFXVSxJQUROO0FBRVpTLGFBQU87QUFDTEMsY0FBTTtBQURELE9BRks7QUFLWkMsYUFBTztBQUxLLEtBRGhCLENBREY7QUFXRDs7QUFFRDs7O0FBR0FDLHFCQUFvQjtBQUNsQixTQUFLckIsV0FBTCxDQUFpQnNCLE9BQWpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJQyxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLGFBQU8sS0FBS2pCLFdBRFA7QUFFTGtCLGlCQUFXLEtBQUtaLGVBRlg7QUFHTGEsa0JBQVksS0FBS0w7QUFIWixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQU0sV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBSzdCLEtBQUwsR0FDYixRQUFPLEtBQUtBLEtBQUwsQ0FBV1UsSUFBSyxPQURWLEdBRWQsbUJBRko7O0FBSUEsV0FBTyw2QkFBTSxJQUFJLEtBQUtjLE1BQWYsRUFBdUIsV0FBV0ssU0FBbEMsR0FBUDtBQUNEO0FBeEZpQixDO2tCQTJGTC9CLGEiLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEljb25Db21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZUNsaWNrICgpIHtcbiAgICB0aGlzLnByb3BzLm9uSWNvbkNsaWNrKHRoaXMucHJvcHMuaWNvbik7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3NlbGVjdGVkJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZU1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZChcbiAgICAgICAgdGhpcy5lbGVtZW50LCB7XG4gICAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMuaWNvbixcbiAgICAgICAgICBkZWxheToge1xuICAgICAgICAgICAgc2hvdzogNTAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjbGFzczogJ3B2cC10b29sdGlwJ1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGljazogdGhpcy5oYW5kbGVDbGljayxcbiAgICAgIG1vdXNlb3ZlcjogdGhpcy5oYW5kbGVNb3VzZU92ZXIsXG4gICAgICBtb3VzZWxlYXZlOiB0aGlzLmhhbmRsZU1vdXNlTGVhdmVcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb25DbGFzcyA9IHRoaXMucHJvcHNcbiAgICAgID8gYGljb24gJHt0aGlzLnByb3BzLmljb259LWljb25gXG4gICAgICA6ICdpY29uIGRlZmF1bHQtaWNvbic7XG5cbiAgICByZXR1cm4gPHNwYW4gb249e3RoaXMuZXZlbnRzfSBjbGFzc05hbWU9e2ljb25DbGFzc30gLz47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSWNvbkNvbXBvbmVudDtcbiJdfQ==