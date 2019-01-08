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
  /* eslint-disable-next-line require-jsdoc */
  toggleSelected() {
    this.element.classList.toggle('selected');
    this.props.selected = !this.props.selected;
  }

  /* eslint-disable-next-line require-jsdoc */
  handleClick() {
    this.props.onIconClick(this.props.icon);
    this.toggleSelected();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleMouseOver() {
    this.disposables.add(atom.tooltips.add(this.element, {
      title: this.props.icon,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsInRvZ2dsZVNlbGVjdGVkIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInByb3BzIiwic2VsZWN0ZWQiLCJoYW5kbGVDbGljayIsIm9uSWNvbkNsaWNrIiwiaWNvbiIsImhhbmRsZU1vdXNlT3ZlciIsImRpc3Bvc2FibGVzIiwiYWRkIiwiYXRvbSIsInRvb2x0aXBzIiwidGl0bGUiLCJkZWxheSIsInNob3ciLCJjbGFzcyIsImhhbmRsZU1vdXNlTGVhdmUiLCJkaXNwb3NlIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW92ZXIiLCJtb3VzZWxlYXZlIiwiY29uc3RydWN0b3IiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciIsImljb25DbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBOzs7QUFMQTs7QUFRZSxNQUFNQSxhQUFOLENBQW9CO0FBQ2pDO0FBQ0FDLG1CQUFrQjtBQUNoQixTQUFLQyxPQUFMLENBQWFDLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCLFVBQTlCO0FBQ0EsU0FBS0MsS0FBTCxDQUFXQyxRQUFYLEdBQXNCLENBQUMsS0FBS0QsS0FBTCxDQUFXQyxRQUFsQztBQUNEOztBQUVEO0FBQ0FDLGdCQUFlO0FBQ2IsU0FBS0YsS0FBTCxDQUFXRyxXQUFYLENBQXVCLEtBQUtILEtBQUwsQ0FBV0ksSUFBbEM7QUFDQSxTQUFLUixjQUFMO0FBQ0Q7O0FBRUQ7QUFDQVMsb0JBQW1CO0FBQ2pCLFNBQUtDLFdBQUwsQ0FBaUJDLEdBQWpCLENBQ0VDLEtBQUtDLFFBQUwsQ0FBY0YsR0FBZCxDQUFrQixLQUFLVixPQUF2QixFQUFnQztBQUM5QmEsYUFBTyxLQUFLVixLQUFMLENBQVdJLElBRFk7QUFFOUJPLGFBQU87QUFDTEMsY0FBTTtBQURELE9BRnVCO0FBSzlCQyxhQUFPO0FBTHVCLEtBQWhDLENBREY7QUFTRDs7QUFFRDtBQUNBQyxxQkFBb0I7QUFDbEIsU0FBS1IsV0FBTCxDQUFpQlMsT0FBakI7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlDLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsYUFBTyxLQUFLZixXQURQO0FBRUxnQixpQkFBVyxLQUFLYixlQUZYO0FBR0xjLGtCQUFZLEtBQUtMO0FBSFosS0FBUDtBQUtEOztBQUVEOzs7O0FBSUFNLGNBQWFwQixLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtNLFdBQUwsR0FBbUIsSUFBSWUseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUYsZUFBS0UsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBYzNCLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT3dCLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsVUFBTUMsWUFBWSxLQUFLL0IsS0FBTCxHQUNiLFFBQU8sS0FBS0EsS0FBTCxDQUFXSSxJQUFLLFNBQVEsS0FBS0osS0FBTCxDQUFXQyxRQUFYLEdBQXNCLFVBQXRCLEdBQW1DLEVBQUcsRUFEeEQsR0FFZCxtQkFGSjs7QUFJQSxXQUFPLDZCQUFNLElBQUksS0FBS2UsTUFBZixFQUF1QixXQUFXZSxTQUFsQyxHQUFQO0FBQ0Q7QUF0RmdDO2tCQUFkcEMsYSIsImZpbGUiOiJpY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkNvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHRvZ2dsZVNlbGVjdGVkICgpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnByb3BzLnNlbGVjdGVkID0gIXRoaXMucHJvcHMuc2VsZWN0ZWQ7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDbGljayAoKSB7XG4gICAgdGhpcy5wcm9wcy5vbkljb25DbGljayh0aGlzLnByb3BzLmljb24pO1xuICAgIHRoaXMudG9nZ2xlU2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgdGl0bGU6IHRoaXMucHJvcHMuaWNvbixcbiAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICBzaG93OiA1MDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3M6ICdwdnAtdG9vbHRpcCdcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2ssXG4gICAgICBtb3VzZW92ZXI6IHRoaXMuaGFuZGxlTW91c2VPdmVyLFxuICAgICAgbW91c2VsZWF2ZTogdGhpcy5oYW5kbGVNb3VzZUxlYXZlXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbkNsYXNzID0gdGhpcy5wcm9wc1xuICAgICAgPyBgaWNvbiAke3RoaXMucHJvcHMuaWNvbn0taWNvbiAke3RoaXMucHJvcHMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyd9YFxuICAgICAgOiAnaWNvbiBkZWZhdWx0LWljb24nO1xuXG4gICAgcmV0dXJuIDxzcGFuIG9uPXt0aGlzLmV2ZW50c30gY2xhc3NOYW1lPXtpY29uQ2xhc3N9IC8+O1xuICB9XG59XG4iXX0=