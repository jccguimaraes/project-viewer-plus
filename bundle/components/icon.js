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
      title: this.props.icon.replace('-icon', ''),
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
    const iconClass = this.props ? `icon ${this.props.icon}` : 'icon default-icon';

    return _etch2.default.dom('span', { on: this.events, className: iconClass });
  }
};
exports.default = IconComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlTW91c2VPdmVyIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJyZXBsYWNlIiwiZGVsYXkiLCJzaG93IiwiY2xhc3MiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZGlzcG9zZSIsImV2ZW50cyIsImNsaWNrIiwibW91c2VvdmVyIiwibW91c2VsZWF2ZSIsInJlbmRlciIsImljb25DbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7OzsyY0FIQTs7QUFLQTs7O0lBR01BLGEsR0FBTixNQUFNQSxhQUFOLENBQW9CO0FBQ2xCOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQiwrQkFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsbUJBQWY7O0FBRUEsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU0sZUFBS0EsT0FBTCxPQUFOO0FBRGU7QUFFaEI7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0wsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGVBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sZUFBS0ssTUFBTCxRQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLUixLQUFMLENBQVdTLFdBQVgsQ0FBdUIsS0FBS1QsS0FBTCxDQUFXVSxJQUFsQztBQUNBLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDRDs7QUFFRDs7O0FBR0FDLG9CQUFtQjtBQUNqQixTQUFLYixXQUFMLENBQWlCYyxHQUFqQixDQUNFQyxLQUFLQyxRQUFMLENBQWNGLEdBQWQsQ0FDRSxLQUFLSixPQURQLEVBQ2dCO0FBQ1pPLGFBQU8sS0FBS2xCLEtBQUwsQ0FBV1UsSUFBWCxDQUFnQlMsT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsRUFBakMsQ0FESztBQUVaQyxhQUFPO0FBQ0xDLGNBQU07QUFERCxPQUZLO0FBS1pDLGFBQU87QUFMSyxLQURoQixDQURGO0FBV0Q7O0FBRUQ7OztBQUdBQyxxQkFBb0I7QUFDbEIsU0FBS3RCLFdBQUwsQ0FBaUJ1QixPQUFqQjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxhQUFPLEtBQUtsQixXQURQO0FBRUxtQixpQkFBVyxLQUFLYixlQUZYO0FBR0xjLGtCQUFZLEtBQUtMO0FBSFosS0FBUDtBQUtEOztBQUVEOzs7O0FBSUFNLFdBQVU7QUFDUixVQUFNQyxZQUFZLEtBQUs5QixLQUFMLEdBQ2IsUUFBTyxLQUFLQSxLQUFMLENBQVdVLElBQUssRUFEVixHQUVkLG1CQUZKOztBQUlBLFdBQU8sNkJBQU0sSUFBSSxLQUFLZSxNQUFmLEVBQXVCLFdBQVdLLFNBQWxDLEdBQVA7QUFDRDtBQXhGaUIsQztrQkEyRkxoQyxhIiwiZmlsZSI6Imljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVDbGljayAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkljb25DbGljayh0aGlzLnByb3BzLmljb24pO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVNb3VzZU92ZXIgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQoXG4gICAgICAgIHRoaXMuZWxlbWVudCwge1xuICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLmljb24ucmVwbGFjZSgnLWljb24nLCAnJyksXG4gICAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICAgIHNob3c6IDUwMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY2xhc3M6ICdwdnAtdG9vbHRpcCdcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssXG4gICAgICBtb3VzZW92ZXI6IHRoaXMuaGFuZGxlTW91c2VPdmVyLFxuICAgICAgbW91c2VsZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uQ2xhc3MgPSB0aGlzLnByb3BzXG4gICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5pY29ufWBcbiAgICAgIDogJ2ljb24gZGVmYXVsdC1pY29uJztcblxuICAgIHJldHVybiA8c3BhbiBvbj17dGhpcy5ldmVudHN9IGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJY29uQ29tcG9uZW50O1xuIl19