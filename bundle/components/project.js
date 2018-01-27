'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _electron = require('electron');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3Byb2plY3QuanMiXSwibmFtZXMiOlsiUHJvamVjdENvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwicHJvcHMiLCJjb250ZXh0U3dpdGNoZXIiLCJpbml0aWFsaXplIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiZGlkQ2xpY2siLCJldmVudCIsInR5cGUiLCJzd2l0Y2hDb250ZXh0IiwiZGlkRHJhZyIsImRpZERyb3AiLCJldmVudHMiLCJjbGljayIsImRyYWdzdGFydCIsImRyb3AiLCJyZW5kZXIiLCJpY29uIiwibW9kZWwiLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJzZWxlY3RlZCIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7OzJjQUxBOztBQU9BOzs7SUFHTUEsZ0IsR0FBTixNQUFNQSxnQkFBTixDQUF1QjtBQUNyQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsK0JBQXZCOztBQUVBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sZUFBS0csTUFBTCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLFFBQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxXQUFVQyxLQUFWLEVBQWlCO0FBQ2Y7QUFDQSwwQkFBT0EsTUFBTUMsSUFBYixFQUFtQixLQUFLVCxLQUF4QjtBQUNBLFNBQUtDLGVBQUwsQ0FBcUJTLGFBQXJCLENBQW1DLEtBQUtWLEtBQXhDO0FBQ0Q7O0FBRUQ7Ozs7QUFJQVcsVUFBU0gsS0FBVCxFQUFnQjtBQUNkLDBCQUFPQSxNQUFNQyxJQUFiLEVBQW1CLEtBQUtULEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQVksVUFBU0osS0FBVCxFQUFnQjtBQUNkLDBCQUFPQSxNQUFNQyxJQUFiLEVBQW1CLEtBQUtULEtBQXhCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxNQUFJYSxNQUFKLEdBQWM7QUFDWixXQUFPO0FBQ0xDLGFBQU8sS0FBS1AsUUFEUDtBQUVMUSxpQkFBVyxLQUFLSixPQUZYO0FBR0xLLFlBQU0sS0FBS0o7QUFITixLQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQUssV0FBVTtBQUNSLFVBQU1DLE9BQ0osS0FBS2xCLEtBQUwsQ0FBV21CLEtBQVgsQ0FBaUJELElBQWpCLElBQXlCRSxLQUFLQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBekIsR0FDSyxRQUFPLEtBQUt0QixLQUFMLENBQVdtQixLQUFYLENBQWlCRCxJQUFLLE9BRGxDLEdBRUksRUFITjtBQUlBLFVBQU1LLFdBQVcsS0FBS3ZCLEtBQUwsQ0FBV3VCLFFBQVgsR0FBc0IsVUFBdEIsR0FBbUMsRUFBcEQ7O0FBRUEsV0FDRTtBQUFBO0FBQUE7QUFDRSxtQkFBWSx3QkFBdUJBLFFBQVMsRUFEOUM7QUFFRSxZQUFJLEtBQUtWLE1BRlg7QUFHRSxtQkFBVTtBQUhaO0FBS0U7QUFBQTtBQUFBLFVBQU0sV0FBV0ssSUFBakI7QUFBd0IsYUFBS2xCLEtBQUwsQ0FBV21CLEtBQVgsQ0FBaUJLO0FBQXpDO0FBTEYsS0FERjtBQVNEO0FBM0ZvQixDO2tCQThGUjFCLGdCIiwiZmlsZSI6InByb2plY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgQ29udGV4dFN3aXRjaGVyIGZyb20gJy4vLi4vc2VydmljZXMvY29udGV4dC1zd2l0Y2hlcic7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgUHJvamVjdENvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyID0gbmV3IENvbnRleHRTd2l0Y2hlcigpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZENsaWNrIChldmVudCkge1xuICAgIC8vIGlwY1JlbmRlcmVyLnNlbmQoJ3B2eC1jaGFubmVsJywgdGhpcyk7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICAgIHRoaXMuY29udGV4dFN3aXRjaGVyLnN3aXRjaENvbnRleHQodGhpcy5wcm9wcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZGV2bG9nKGV2ZW50LnR5cGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGRldmxvZyhldmVudC50eXBlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0IGV2ZW50cyAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICBkcm9wOiB0aGlzLmRpZERyb3BcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5wcm9wcy5tb2RlbC5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyBgaWNvbiAke3RoaXMucHJvcHMubW9kZWwuaWNvbn0taWNvbmBcbiAgICAgICAgOiAnJztcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpXG4gICAgICAgIGNsYXNzTmFtZT17YGxpc3QtaXRlbSBwdi1wcm9qZWN0ICR7c2VsZWN0ZWR9YH1cbiAgICAgICAgb249e3RoaXMuZXZlbnRzfVxuICAgICAgICBkcmFnZ2FibGU9XCJ0cnVlXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpY29ufT57dGhpcy5wcm9wcy5tb2RlbC5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0Q29tcG9uZW50O1xuIl19