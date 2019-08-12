"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _atom = require("atom");

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class IconComponent {
  /* eslint-disable-next-line require-jsdoc */
  handleClick() {
    this.element.classList.toggle('selected');
    this.selected = this.element.classList.contains('selected');
    this.onDidClick(this.selected ? this.icon : '');
  }
  /* eslint-disable-next-line require-jsdoc */


  handleMouseOver() {
    this.disposables.add(atom.tooltips.add(this.element, {
      title: this.icon,
      delay: {
        show: 500
      },
      class: 'pvp-tooltip'
    }));
  }
  /* eslint-disable-next-line require-jsdoc */


  handleMouseLeave() {
    this.disposables.dispose();
  }
  /* eslint-disable-next-line require-jsdoc */


  get events() {
    return {
      click: this.handleClick,
      mouseover: this.handleMouseOver,
      mouseleave: this.handleMouseLeave
    };
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props) {
    this.icon = props.icon;
    this.selected = props.selected;
    this.onDidClick = props.onDidClick;
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    _etch.default.initialize(this);
  }
  /**
   *
   */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
      this.icon = props.icon;
      this.selected = props.selected || false;
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /**
   *
   * @returns {Object} description
   */


  render() {
    const iconClass = this.icon ? `icon ${this.icon}-icon ${this.selected ? 'selected' : ''}` : 'icon default-icon';
    return _etch.default.dom("span", {
      on: this.events,
      className: iconClass
    });
  }

}

exports.default = IconComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImhhbmRsZUNsaWNrIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInNlbGVjdGVkIiwiY29udGFpbnMiLCJvbkRpZENsaWNrIiwiaWNvbiIsImhhbmRsZU1vdXNlT3ZlciIsImRpc3Bvc2FibGVzIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFIQTs7QUFLQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsRUFBQUEsV0FBVyxHQUFJO0FBQ2IsU0FBS0MsT0FBTCxDQUFhQyxTQUFiLENBQXVCQyxNQUF2QixDQUE4QixVQUE5QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0gsT0FBTCxDQUFhQyxTQUFiLENBQXVCRyxRQUF2QixDQUFnQyxVQUFoQyxDQUFoQjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0IsS0FBS0YsUUFBTCxHQUFnQixLQUFLRyxJQUFyQixHQUEyQixFQUEzQztBQUNEO0FBRUQ7OztBQUNBQyxFQUFBQSxlQUFlLEdBQUk7QUFDakIsU0FBS0MsV0FBTCxDQUFpQkMsR0FBakIsQ0FDRUMsSUFBSSxDQUFDQyxRQUFMLENBQWNGLEdBQWQsQ0FBa0IsS0FBS1QsT0FBdkIsRUFBZ0M7QUFDOUJZLE1BQUFBLEtBQUssRUFBRSxLQUFLTixJQURrQjtBQUU5Qk8sTUFBQUEsS0FBSyxFQUFFO0FBQ0xDLFFBQUFBLElBQUksRUFBRTtBQURELE9BRnVCO0FBSzlCQyxNQUFBQSxLQUFLLEVBQUU7QUFMdUIsS0FBaEMsQ0FERjtBQVNEO0FBRUQ7OztBQUNBQyxFQUFBQSxnQkFBZ0IsR0FBSTtBQUNsQixTQUFLUixXQUFMLENBQWlCUyxPQUFqQjtBQUNEO0FBRUQ7OztBQUNBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsTUFBQUEsS0FBSyxFQUFFLEtBQUtwQixXQURQO0FBRUxxQixNQUFBQSxTQUFTLEVBQUUsS0FBS2IsZUFGWDtBQUdMYyxNQUFBQSxVQUFVLEVBQUUsS0FBS0w7QUFIWixLQUFQO0FBS0Q7QUFFRDs7O0FBQ0FNLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtqQixJQUFMLEdBQVlpQixLQUFLLENBQUNqQixJQUFsQjtBQUNBLFNBQUtILFFBQUwsR0FBZ0JvQixLQUFLLENBQUNwQixRQUF0QjtBQUNBLFNBQUtFLFVBQUwsR0FBa0JrQixLQUFLLENBQUNsQixVQUF4QjtBQUNBLFNBQUtHLFdBQUwsR0FBbUIsSUFBSWdCLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNRixjQUFLRSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLakIsSUFBTCxHQUFZaUIsS0FBSyxDQUFDakIsSUFBbEI7QUFDQSxXQUFLSCxRQUFMLEdBQWdCb0IsS0FBSyxDQUFDcEIsUUFBTixJQUFrQixLQUFsQztBQUNBLGFBQU93QixjQUFLRyxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1IsVUFBTUMsU0FBUyxHQUFHLEtBQUs1QixJQUFMLEdBQ2IsUUFBTyxLQUFLQSxJQUFLLFNBQVEsS0FBS0gsUUFBTCxHQUFnQixVQUFoQixHQUE2QixFQUFHLEVBRDVDLEdBRWQsbUJBRko7QUFJQSxXQUFPO0FBQU0sTUFBQSxFQUFFLEVBQUUsS0FBS2UsTUFBZjtBQUF1QixNQUFBLFNBQVMsRUFBRWdCO0FBQWxDLE1BQVA7QUFDRDs7QUE5RWdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2xpY2sgKCkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMub25EaWRDbGljayh0aGlzLnNlbGVjdGVkID8gdGhpcy5pY29uOiAnJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVNb3VzZU92ZXIgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuYWRkKFxuICAgICAgYXRvbS50b29sdGlwcy5hZGQodGhpcy5lbGVtZW50LCB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmljb24sXG4gICAgICAgIGRlbGF5OiB7XG4gICAgICAgICAgc2hvdzogNTAwXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzOiAncHZwLXRvb2x0aXAnXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVNb3VzZUxlYXZlICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldCBldmVudHMgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGljazogdGhpcy5oYW5kbGVDbGljayxcbiAgICAgIG1vdXNlb3ZlcjogdGhpcy5oYW5kbGVNb3VzZU92ZXIsXG4gICAgICBtb3VzZWxlYXZlOiB0aGlzLmhhbmRsZU1vdXNlTGVhdmVcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5pY29uID0gcHJvcHMuaWNvbjtcbiAgICB0aGlzLnNlbGVjdGVkID0gcHJvcHMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5vbkRpZENsaWNrID0gcHJvcHMub25EaWRDbGljaztcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5pY29uID0gcHJvcHMuaWNvbjtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBwcm9wcy5zZWxlY3RlZCB8fCBmYWxzZTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbkNsYXNzID0gdGhpcy5pY29uXG4gICAgICA/IGBpY29uICR7dGhpcy5pY29ufS1pY29uICR7dGhpcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ31gXG4gICAgICA6ICdpY29uIGRlZmF1bHQtaWNvbic7XG5cbiAgICByZXR1cm4gPHNwYW4gb249e3RoaXMuZXZlbnRzfSBjbGFzc05hbWU9e2ljb25DbGFzc30gLz47XG4gIH1cbn1cbiJdfQ==