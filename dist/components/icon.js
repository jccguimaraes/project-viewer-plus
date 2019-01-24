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
    this.selected = !this.selected;
    this.onDidClick(this.icon);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2ljb24uanMiXSwibmFtZXMiOlsiSWNvbkNvbXBvbmVudCIsImhhbmRsZUNsaWNrIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInNlbGVjdGVkIiwib25EaWRDbGljayIsImljb24iLCJoYW5kbGVNb3VzZU92ZXIiLCJkaXNwb3NhYmxlcyIsImFkZCIsImF0b20iLCJ0b29sdGlwcyIsInRpdGxlIiwiZGVsYXkiLCJzaG93IiwiY2xhc3MiLCJoYW5kbGVNb3VzZUxlYXZlIiwiZGlzcG9zZSIsImV2ZW50cyIsImNsaWNrIiwibW91c2VvdmVyIiwibW91c2VsZWF2ZSIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJldGNoIiwiaW5pdGlhbGl6ZSIsImRlc3Ryb3kiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlbmRlciIsImljb25DbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7OztBQUVBO0FBTEE7O0FBTWUsTUFBTUEsYUFBTixDQUFvQjtBQUNqQztBQUNBQyxnQkFBZTtBQUNiLFNBQUtDLE9BQUwsQ0FBYUMsU0FBYixDQUF1QkMsTUFBdkIsQ0FBOEIsVUFBOUI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQUMsS0FBS0EsUUFBdEI7QUFDQSxTQUFLQyxVQUFMLENBQWdCLEtBQUtDLElBQXJCO0FBQ0Q7O0FBRUQ7QUFDQUMsb0JBQW1CO0FBQ2pCLFNBQUtDLFdBQUwsQ0FBaUJDLEdBQWpCLENBQ0VDLEtBQUtDLFFBQUwsQ0FBY0YsR0FBZCxDQUFrQixLQUFLUixPQUF2QixFQUFnQztBQUM5QlcsYUFBTyxLQUFLTixJQURrQjtBQUU5Qk8sYUFBTztBQUNMQyxjQUFNO0FBREQsT0FGdUI7QUFLOUJDLGFBQU87QUFMdUIsS0FBaEMsQ0FERjtBQVNEOztBQUVEO0FBQ0FDLHFCQUFvQjtBQUNsQixTQUFLUixXQUFMLENBQWlCUyxPQUFqQjtBQUNEOztBQUVEO0FBQ0EsTUFBSUMsTUFBSixHQUFjO0FBQ1osV0FBTztBQUNMQyxhQUFPLEtBQUtuQixXQURQO0FBRUxvQixpQkFBVyxLQUFLYixlQUZYO0FBR0xjLGtCQUFZLEtBQUtMO0FBSFosS0FBUDtBQUtEOztBQUVEO0FBQ0FNLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS2pCLElBQUwsR0FBWWlCLE1BQU1qQixJQUFsQjtBQUNBLFNBQUtGLFFBQUwsR0FBZ0JtQixNQUFNbkIsUUFBdEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCa0IsTUFBTWxCLFVBQXhCO0FBQ0EsU0FBS0csV0FBTCxHQUFtQixJQUFJZ0IseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUYsZUFBS0UsT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1AsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLakIsSUFBTCxHQUFZaUIsTUFBTWpCLElBQWxCO0FBQ0EsV0FBS0YsUUFBTCxHQUFnQm1CLE1BQU1uQixRQUFOLElBQWtCLEtBQWxDO0FBQ0EsYUFBT3VCLGVBQUtHLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsVUFBTUMsWUFBWSxLQUFLNUIsSUFBTCxHQUNiLFFBQU8sS0FBS0EsSUFBSyxTQUFRLEtBQUtGLFFBQUwsR0FBZ0IsVUFBaEIsR0FBNkIsRUFBRyxFQUQ1QyxHQUVkLG1CQUZKOztBQUlBLFdBQU8sNkJBQU0sSUFBSSxLQUFLYyxNQUFmLEVBQXVCLFdBQVdnQixTQUFsQyxHQUFQO0FBQ0Q7QUE5RWdDO2tCQUFkbkMsYSIsImZpbGUiOiJpY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY29uQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2xpY2sgKCkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICB0aGlzLm9uRGlkQ2xpY2sodGhpcy5pY29uKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlT3ZlciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5hZGQoXG4gICAgICBhdG9tLnRvb2x0aXBzLmFkZCh0aGlzLmVsZW1lbnQsIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuaWNvbixcbiAgICAgICAgZGVsYXk6IHtcbiAgICAgICAgICBzaG93OiA1MDBcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3M6ICdwdnAtdG9vbHRpcCdcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZU1vdXNlTGVhdmUgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrLFxuICAgICAgbW91c2VvdmVyOiB0aGlzLmhhbmRsZU1vdXNlT3ZlcixcbiAgICAgIG1vdXNlbGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZVxuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmljb24gPSBwcm9wcy5pY29uO1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBwcm9wcy5zZWxlY3RlZDtcbiAgICB0aGlzLm9uRGlkQ2xpY2sgPSBwcm9wcy5vbkRpZENsaWNrO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLmljb24gPSBwcm9wcy5pY29uO1xuICAgICAgdGhpcy5zZWxlY3RlZCA9IHByb3BzLnNlbGVjdGVkIHx8IGZhbHNlO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBpY29uQ2xhc3MgPSB0aGlzLmljb25cbiAgICAgID8gYGljb24gJHt0aGlzLmljb259LWljb24gJHt0aGlzLnNlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICcnfWBcbiAgICAgIDogJ2ljb24gZGVmYXVsdC1pY29uJztcblxuICAgIHJldHVybiA8c3BhbiBvbj17dGhpcy5ldmVudHN9IGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgfVxufVxuIl19