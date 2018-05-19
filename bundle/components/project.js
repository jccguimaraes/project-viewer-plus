'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

var _atom = require('atom');

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _contextSwitcher = require('./../services/context-switcher');

var _contextSwitcher2 = _interopRequireDefault(_contextSwitcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let ProjectComponent = class ProjectComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.disposables = new _atom.CompositeDisposable();
    this.props = props;
    this.contextSwitcher = new _contextSwitcher2.default();

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (props) {
        _this.props = props;
        return _etch2.default.update(_this);
      }

      return Promise.resolve();
    })();
  }

  /**
   *
   */
  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch2.default.destroy(_this2);
    })();
  }

  /**
   *
   * @param {Object} event - description
   */
  didClick(event) {
    // ipcRenderer.send('pvx-channel', this);
    (0, _devlog2.default)(event.type, this.props);
    this.contextSwitcher.switchContext(this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrag(event) {
    (0, _devlog2.default)(event.type, this.props);
  }

  /**
   *
   * @param {Object} event - description
   */
  didDrop(event) {
    (0, _devlog2.default)(event.type, this.props);
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
    const icon = this.props.model.icon && atom.packages.isPackageActive('file-icons') ? `icon ${this.props.model.icon}-icon` : '';
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
        this.props.model.name
      )
    );
  }
};
exports.default = ProjectComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJjb250ZXh0U3dpdGNoZXIiLCJDb250ZXh0U3dpdGNoZXIiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpZENsaWNrIiwiZXZlbnQiLCJ0eXBlIiwic3dpdGNoQ29udGV4dCIsImRpZERyYWciLCJkaWREcm9wIiwiZXZlbnRzIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcm9wIiwicmVuZGVyIiwiaWNvbiIsIm1vZGVsIiwiYXRvbSIsInBhY2thZ2VzIiwiaXNQYWNrYWdlQWN0aXZlIiwic2VsZWN0ZWQiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FOQTs7QUFRQTs7O0lBR01BLGdCLEdBQU4sTUFBTUEsZ0JBQU4sQ0FBdUI7QUFDckI7Ozs7QUFJQUMsY0FBYUMsS0FBYixFQUFvQjtBQUNsQixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0csZUFBTCxHQUF1QixJQUFJQyx5QkFBSixFQUF2Qjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjUCxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBT0ssZUFBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLFlBQU1MLGVBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2Y7QUFDQSwwQkFBT0EsTUFBTUMsSUFBYixFQUFtQixLQUFLYixLQUF4QjtBQUNBLFNBQUtHLGVBQUwsQ0FBcUJXLGFBQXJCLENBQW1DLEtBQUtkLEtBQXhDO0FBQ0Q7O0FBRUQ7Ozs7QUFJQWUsVUFBU0gsS0FBVCxFQUFnQjtBQUNkLDBCQUFPQSxNQUFNQyxJQUFiLEVBQW1CLEtBQUtiLEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQWdCLFVBQVNKLEtBQVQsRUFBZ0I7QUFDZCwwQkFBT0EsTUFBTUMsSUFBYixFQUFtQixLQUFLYixLQUF4QjtBQUNEOztBQUVEOzs7O0FBSUEsTUFBSWlCLE1BQUosR0FBYztBQUNaLFdBQU87QUFDTEMsYUFBTyxLQUFLUCxRQURQO0FBRUxRLGlCQUFXLEtBQUtKLE9BRlg7QUFHTEssWUFBTSxLQUFLSjtBQUhOLEtBQVA7QUFLRDs7QUFFRDs7OztBQUlBSyxXQUFVO0FBQ1IsVUFBTUMsT0FDSixLQUFLdEIsS0FBTCxDQUFXdUIsS0FBWCxDQUFpQkQsSUFBakIsSUFBeUJFLEtBQUtDLFFBQUwsQ0FBY0MsZUFBZCxDQUE4QixZQUE5QixDQUF6QixHQUNLLFFBQU8sS0FBSzFCLEtBQUwsQ0FBV3VCLEtBQVgsQ0FBaUJELElBQUssT0FEbEMsR0FFSSxFQUhOO0FBSUEsVUFBTUssV0FBVyxLQUFLM0IsS0FBTCxDQUFXMkIsUUFBWCxHQUFzQixVQUF0QixHQUFtQyxFQUFwRDs7QUFFQSxXQUNFO0FBQUE7QUFBQTtBQUNFLG1CQUFZLHdCQUF1QkEsUUFBUyxFQUQ5QztBQUVFLFlBQUksS0FBS1YsTUFGWDtBQUdFLG1CQUFVO0FBSFo7QUFLRTtBQUFBO0FBQUEsVUFBTSxXQUFXSyxJQUFqQjtBQUF3QixhQUFLdEIsS0FBTCxDQUFXdUIsS0FBWCxDQUFpQks7QUFBekM7QUFMRixLQURGO0FBU0Q7QUE1Rm9CLEM7a0JBK0ZSOUIsZ0IiLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZGV2bG9nIGZyb20gJy4vLi4vc2VydmljZXMvZGV2bG9nJztcbmltcG9ydCBDb250ZXh0U3dpdGNoZXIgZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBQcm9qZWN0Q29tcG9uZW50IHtcbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIgPSBuZXcgQ29udGV4dFN3aXRjaGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgLy8gaXBjUmVuZGVyZXIuc2VuZCgncHZ4LWNoYW5uZWwnLCB0aGlzKTtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gICAgdGhpcy5jb250ZXh0U3dpdGNoZXIuc3dpdGNoQ29udGV4dCh0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBkZXZsb2coZXZlbnQudHlwZSwgdGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyb3AgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXQgZXZlbnRzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2ssXG4gICAgICBkcmFnc3RhcnQ6IHRoaXMuZGlkRHJhZyxcbiAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbiA9XG4gICAgICB0aGlzLnByb3BzLm1vZGVsLmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7dGhpcy5wcm9wcy5tb2RlbC5pY29ufS1pY29uYFxuICAgICAgICA6ICcnO1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcm9wcy5zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8bGlcbiAgICAgICAgY2xhc3NOYW1lPXtgbGlzdC1pdGVtIHB2LXByb2plY3QgJHtzZWxlY3RlZH1gfVxuICAgICAgICBvbj17dGhpcy5ldmVudHN9XG4gICAgICAgIGRyYWdnYWJsZT1cInRydWVcIlxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9zcGFuPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RDb21wb25lbnQ7XG4iXX0=