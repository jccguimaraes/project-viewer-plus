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
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsImVtaXR0ZXIiLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaGFuZGxlQ2xpY2siLCJvbkljb25DbGljayIsImljb24iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaGFuZGxlTW91c2VPdmVyIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJyZXBsYWNlIiwiZGVsYXkiLCJzaG93IiwiaGFuZGxlTW91c2VMZWF2ZSIsImRpc3Bvc2UiLCJldmVudHMiLCJjbGljayIsIm1vdXNlb3ZlciIsIm1vdXNlbGVhdmUiLCJyZW5kZXIiLCJpY29uQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUNBOzs7Ozs7MmNBSEE7O0FBS0E7OztJQUdNQSxhLEdBQU4sTUFBTUEsYUFBTixDQUFvQjtBQUNsQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsK0JBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLG1CQUFmOztBQUVBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7OztBQUdNQyxTQUFOLEdBQWlCO0FBQUE7O0FBQUE7QUFDZixZQUFNLGVBQUtBLE9BQUwsT0FBTjtBQURlO0FBRWhCOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxlQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtLLE1BQUwsUUFBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR0FDLGdCQUFlO0FBQ2IsU0FBS1IsS0FBTCxDQUFXUyxXQUFYLENBQXVCLEtBQUtULEtBQUwsQ0FBV1UsSUFBbEM7QUFDQSxTQUFLQyxPQUFMLENBQWFDLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCLFVBQTlCO0FBQ0Q7O0FBRUQ7OztBQUdBQyxvQkFBbUI7QUFDakIsU0FBS2IsV0FBTCxDQUFpQmMsR0FBakIsQ0FDRUMsS0FBS0MsUUFBTCxDQUFjRixHQUFkLENBQ0UsS0FBS0osT0FEUCxFQUNnQjtBQUNaTyxhQUFPLEtBQUtsQixLQUFMLENBQVdVLElBQVgsQ0FBZ0JTLE9BQWhCLENBQXdCLE9BQXhCLEVBQWlDLEVBQWpDLENBREs7QUFFWkMsYUFBTztBQUNMQyxjQUFNO0FBREQ7QUFGSyxLQURoQixDQURGO0FBVUQ7O0FBRUQ7OztBQUdBQyxxQkFBb0I7QUFDbEIsU0FBS3JCLFdBQUwsQ0FBaUJzQixPQUFqQjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxhQUFPLEtBQUtqQixXQURQO0FBRUxrQixpQkFBVyxLQUFLWixlQUZYO0FBR0xhLGtCQUFZLEtBQUtMO0FBSFosS0FBUDtBQUtEOztBQUVEOzs7O0FBSUFNLFdBQVU7QUFDUixVQUFNQyxZQUFZLEtBQUs3QixLQUFMLEdBQ2IsUUFBTyxLQUFLQSxLQUFMLENBQVdVLElBQUssRUFEVixHQUVkLG1CQUZKOztBQUlBLFdBQU8sNkJBQU0sSUFBSSxLQUFLYyxNQUFmLEVBQXVCLFdBQVdLLFNBQWxDLEdBQVA7QUFDRDtBQXZGaUIsQztrQkEwRkwvQixhIiwiZmlsZSI6Imljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVDbGljayAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkljb25DbGljayh0aGlzLnByb3BzLmljb24pO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBoYW5kbGVNb3VzZU92ZXIgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQoXG4gICAgICAgIHRoaXMuZWxlbWVudCwge1xuICAgICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLmljb24ucmVwbGFjZSgnLWljb24nLCAnJyksXG4gICAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICAgIHNob3c6IDUwMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssXG4gICAgICBtb3VzZW92ZXI6IHRoaXMuaGFuZGxlTW91c2VPdmVyLFxuICAgICAgbW91c2VsZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uQ2xhc3MgPSB0aGlzLnByb3BzXG4gICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5pY29ufWBcbiAgICAgIDogJ2ljb24gZGVmYXVsdC1pY29uJztcblxuICAgIHJldHVybiA8c3BhbiBvbj17dGhpcy5ldmVudHN9IGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJY29uQ29tcG9uZW50O1xuIl19