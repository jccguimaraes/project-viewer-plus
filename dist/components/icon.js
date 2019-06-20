'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
/** @jsx etch.dom */

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
      this.icon = props.icon;
      this.selected = props.selected || false;
      return _etch2.default.update(this);
    }

    return Promise.resolve();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const iconClass = this.icon ? `icon ${this.icon}-icon ${this.selected ? 'selected' : ''}` : 'icon default-icon';

    return _etch2.default.dom('span', { on: this.events, className: iconClass });
  }
}
exports.default = IconComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImhhbmRsZUNsaWNrIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInNlbGVjdGVkIiwiY29udGFpbnMiLCJvbkRpZENsaWNrIiwiaWNvbiIsImhhbmRsZU1vdXNlT3ZlciIsImRpc3Bvc2FibGVzIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImV0Y2giLCJpbml0aWFsaXplIiwiZGVzdHJveSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVuZGVyIiwiaWNvbkNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7Ozs7O0FBRUE7QUFMQTs7QUFNZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLGdCQUFlO0FBQ2IsU0FBS0MsT0FBTCxDQUFhQyxTQUFiLENBQXVCQyxNQUF2QixDQUE4QixVQUE5QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBS0gsT0FBTCxDQUFhQyxTQUFiLENBQXVCRyxRQUF2QixDQUFnQyxVQUFoQyxDQUFoQjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0IsS0FBS0YsUUFBTCxHQUFnQixLQUFLRyxJQUFyQixHQUEyQixFQUEzQztBQUNEOztBQUVEO0FBQ0FDLG9CQUFtQjtBQUNqQixTQUFLQyxXQUFMLENBQWlCQyxHQUFqQixDQUNFQyxLQUFLQyxRQUFMLENBQWNGLEdBQWQsQ0FBa0IsS0FBS1QsT0FBdkIsRUFBZ0M7QUFDOUJZLGFBQU8sS0FBS04sSUFEa0I7QUFFOUJPLGFBQU87QUFDTEMsY0FBTTtBQURELE9BRnVCO0FBSzlCQyxhQUFPO0FBTHVCLEtBQWhDLENBREY7QUFTRDs7QUFFRDtBQUNBQyxxQkFBb0I7QUFDbEIsU0FBS1IsV0FBTCxDQUFpQlMsT0FBakI7QUFDRDs7QUFFRDtBQUNBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsYUFBTyxLQUFLcEIsV0FEUDtBQUVMcUIsaUJBQVcsS0FBS2IsZUFGWDtBQUdMYyxrQkFBWSxLQUFLTDtBQUhaLEtBQVA7QUFLRDs7QUFFRDtBQUNBTSxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtqQixJQUFMLEdBQVlpQixNQUFNakIsSUFBbEI7QUFDQSxTQUFLSCxRQUFMLEdBQWdCb0IsTUFBTXBCLFFBQXRCO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQmtCLE1BQU1sQixVQUF4QjtBQUNBLFNBQUtHLFdBQUwsR0FBbUIsSUFBSWdCLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7O0FBR0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFVBQU1GLGVBQUtFLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNQLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS2pCLElBQUwsR0FBWWlCLE1BQU1qQixJQUFsQjtBQUNBLFdBQUtILFFBQUwsR0FBZ0JvQixNQUFNcEIsUUFBTixJQUFrQixLQUFsQztBQUNBLGFBQU93QixlQUFLRyxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFlBQVksS0FBSzVCLElBQUwsR0FDYixRQUFPLEtBQUtBLElBQUssU0FBUSxLQUFLSCxRQUFMLEdBQWdCLFVBQWhCLEdBQTZCLEVBQUcsRUFENUMsR0FFZCxtQkFGSjs7QUFJQSxXQUFPLDZCQUFNLElBQUksS0FBS2UsTUFBZixFQUF1QixXQUFXZ0IsU0FBbEMsR0FBUDtBQUNEO0FBOUVnQztrQkFBZHBDLGEiLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkNvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNsaWNrICgpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLm9uRGlkQ2xpY2sodGhpcy5zZWxlY3RlZCA/IHRoaXMuaWNvbjogJycpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlTW91c2VPdmVyICgpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzLmFkZChcbiAgICAgIGF0b20udG9vbHRpcHMuYWRkKHRoaXMuZWxlbWVudCwge1xuICAgICAgICB0aXRsZTogdGhpcy5pY29uLFxuICAgICAgICBkZWxheToge1xuICAgICAgICAgIHNob3c6IDUwMFxuICAgICAgICB9LFxuICAgICAgICBjbGFzczogJ3B2cC10b29sdGlwJ1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlTW91c2VMZWF2ZSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssXG4gICAgICBtb3VzZW92ZXI6IHRoaXMuaGFuZGxlTW91c2VPdmVyLFxuICAgICAgbW91c2VsZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgfTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuaWNvbiA9IHByb3BzLmljb247XG4gICAgdGhpcy5zZWxlY3RlZCA9IHByb3BzLnNlbGVjdGVkO1xuICAgIHRoaXMub25EaWRDbGljayA9IHByb3BzLm9uRGlkQ2xpY2s7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMuaWNvbiA9IHByb3BzLmljb247XG4gICAgICB0aGlzLnNlbGVjdGVkID0gcHJvcHMuc2VsZWN0ZWQgfHwgZmFsc2U7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb25DbGFzcyA9IHRoaXMuaWNvblxuICAgICAgPyBgaWNvbiAke3RoaXMuaWNvbn0taWNvbiAke3RoaXMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyd9YFxuICAgICAgOiAnaWNvbiBkZWZhdWx0LWljb24nO1xuXG4gICAgcmV0dXJuIDxzcGFuIG9uPXt0aGlzLmV2ZW50c30gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IC8+O1xuICB9XG59XG4iXX0=