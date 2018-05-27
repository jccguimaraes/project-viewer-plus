'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

var _atom = require('atom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.disposables = new _atom.CompositeDisposable();
    this.props = props;

    _etch2.default.initialize(this);
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
  async destroy() {
    await _etch2.default.destroy(this);
  }

  /**
   *
   * @param {Object} event - description
   */
  didClick(event) {
    console.log(event.type, this.props);
    this.props.onUpdate(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    console.log(event.type, this.props);
  }

  /**
   *
   * @returns {Object} description
   */
  get events() {
    return {
      click: this.didClick,
      dragstart: this.didDrag,
      drop: this.didDrop
    };
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const icon = this.props.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.icon}-icon` : '';
    const selected = this.props.selected ? 'selected' : '';

    return _etch2.default.dom(
      'li',
      {
        className: `list-item pv-project ${selected}`,
        on: this.events,
        draggable: 'true'
      },
      _etch2.default.dom(
        'span',
        { className: icon },
        this.props.name
      )
    );
  }
}
exports.default = ProjectComponent; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwidHlwZSIsIm9uVXBkYXRlIiwiZGlkRHJhZyIsImRpZERyb3AiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJyZW5kZXIiLCJpY29uIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlQWN0aXZlIiwic2VsZWN0ZWQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7OztBQUdlLE1BQU1BLGdCQUFOLENBQXVCO0FBQ3BDOzs7O0FBSUFDLGNBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtGLEtBQUwsR0FBYUEsS0FBYjs7QUFFQUcsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNMLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0csZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEOzs7QUFHQSxRQUFNQyxPQUFOLEdBQWlCO0FBQ2YsVUFBTUwsZUFBS0ssT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEOzs7O0FBSUFDLFdBQVVDLEtBQVYsRUFBaUI7QUFDZkMsWUFBUUMsR0FBUixDQUFZRixNQUFNRyxJQUFsQixFQUF3QixLQUFLYixLQUE3QjtBQUNBLFNBQUtBLEtBQUwsQ0FBV2MsUUFBWCxDQUFvQixLQUFLZCxLQUF6QjtBQUNEOztBQUVEOzs7O0FBSUFlLFVBQVNMLEtBQVQsRUFBZ0I7QUFDZEMsWUFBUUMsR0FBUixDQUFZRixNQUFNRyxJQUFsQixFQUF3QixLQUFLYixLQUE3QjtBQUNEOztBQUVEOzs7O0FBSUFnQixVQUFTTixLQUFULEVBQWdCO0FBQ2RDLFlBQVFDLEdBQVIsQ0FBWUYsTUFBTUcsSUFBbEIsRUFBd0IsS0FBS2IsS0FBN0I7QUFDRDs7QUFFRDs7OztBQUlBLE1BQUlpQixNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLGFBQU8sS0FBS1QsUUFEUDtBQUVMVSxpQkFBVyxLQUFLSixPQUZYO0FBR0xLLFlBQU0sS0FBS0o7QUFITixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQUssV0FBVTtBQUNSLFVBQU1DLE9BQ0osS0FBS3RCLEtBQUwsQ0FBV3NCLElBQVgsSUFBbUJDLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUFuQixHQUNLLFFBQU8sS0FBS3pCLEtBQUwsQ0FBV3NCLElBQUssT0FENUIsR0FFSSxFQUhOO0FBSUEsVUFBTUksV0FBVyxLQUFLMUIsS0FBTCxDQUFXMEIsUUFBWCxHQUFzQixVQUF0QixHQUFtQyxFQUFwRDs7QUFFQSxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFZLHdCQUF1QkEsUUFBUyxFQUQ5QztBQUVFLFlBQUksS0FBS1QsTUFGWDtBQUdFLG1CQUFVO0FBSFo7QUFLRTtBQUFBO0FBQUEsVUFBTSxXQUFXSyxJQUFqQjtBQUF3QixhQUFLdEIsS0FBTCxDQUFXMkI7QUFBbkM7QUFMRixLQURGO0FBU0Q7QUExRm1DO2tCQUFqQjdCLGdCLEVBVHJCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RDb21wb25lbnQge1xuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgICB0aGlzLnByb3BzLm9uVXBkYXRlKHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcmFnIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnByb3BzLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5pY29ufS1pY29uYFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=