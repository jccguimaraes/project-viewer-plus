'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _database = require('./../services/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let EmptyComponent = class EmptyComponent {
  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    this.database = new _database2.default();

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
   */
  onCreate() {
    this.database.createDatabase();
  }

  /**
   *
   */
  onImport() {
    this.database.importContent();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const loader = _etch2.default.dom(
      'div',
      { className: 'empty-options' },
      _etch2.default.dom('span', { className: 'loading loading-spinner-small inline-block' })
    );

    const buttons = _etch2.default.dom(
      'div',
      { className: 'empty-options' },
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.onCreate } },
        'Create'
      ),
      _etch2.default.dom(
        'button',
        { className: 'btn btn-info btn-xs', on: { click: this.onImport } },
        'Import legacy'
      )
    );

    return this.props.loading ? loader : buttons;
  }
};
exports.default = EmptyComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5Q29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsIm9uQ3JlYXRlIiwiY3JlYXRlRGF0YWJhc2UiLCJvbkltcG9ydCIsImltcG9ydENvbnRlbnQiLCJyZW5kZXIiLCJsb2FkZXIiLCJidXR0b25zIiwiY2xpY2siLCJsb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7MmNBSEE7O0FBS0E7OztJQUdNQSxjLEdBQU4sTUFBTUEsY0FBTixDQUFxQjtBQUNuQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isd0JBQWhCOztBQUVBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0gsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGVBQU8sZUFBS0csTUFBTCxPQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsUUFBUUMsT0FBUixFQUFQO0FBTm1CO0FBT3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLFFBQU47QUFEZTtBQUVoQjs7QUFFRDs7O0FBR0FDLGFBQVk7QUFDVixTQUFLTixRQUFMLENBQWNPLGNBQWQ7QUFDRDs7QUFFRDs7O0FBR0FDLGFBQVk7QUFDVixTQUFLUixRQUFMLENBQWNTLGFBQWQ7QUFDRDs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsVUFBTUMsU0FBUztBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWY7QUFDYixtQ0FBTSxXQUFVLDRDQUFoQjtBQURhLEtBQWY7O0FBSUEsVUFBTUMsVUFBVTtBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWY7QUFDZDtBQUFBO0FBQUEsVUFBUSxXQUFVLHFCQUFsQixFQUF3QyxJQUFJLEVBQUVDLE9BQU8sS0FBS1AsUUFBZCxFQUE1QztBQUFBO0FBQUEsT0FEYztBQUlkO0FBQUE7QUFBQSxVQUFRLFdBQVUscUJBQWxCLEVBQXdDLElBQUksRUFBRU8sT0FBTyxLQUFLTCxRQUFkLEVBQTVDO0FBQUE7QUFBQTtBQUpjLEtBQWhCOztBQVNBLFdBQU8sS0FBS1QsS0FBTCxDQUFXZSxPQUFYLEdBQXFCSCxNQUFyQixHQUE4QkMsT0FBckM7QUFDRDtBQWxFa0IsQztrQkFxRU5mLGMiLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBFbXB0eUNvbXBvbmVudCB7XG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBvbkNyZWF0ZSAoKSB7XG4gICAgdGhpcy5kYXRhYmFzZS5jcmVhdGVEYXRhYmFzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBvbkltcG9ydCAoKSB7XG4gICAgdGhpcy5kYXRhYmFzZS5pbXBvcnRDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gPGRpdiBjbGFzc05hbWU9XCJlbXB0eS1vcHRpb25zXCI+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9J2xvYWRpbmcgbG9hZGluZy1zcGlubmVyLXNtYWxsIGlubGluZS1ibG9jayc+PC9zcGFuPlxuICAgIDwvZGl2PjtcblxuICAgIGNvbnN0IGJ1dHRvbnMgPSA8ZGl2IGNsYXNzTmFtZT1cImVtcHR5LW9wdGlvbnNcIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvIGJ0bi14c1wiIG9uPXt7IGNsaWNrOiB0aGlzLm9uQ3JlYXRlIH19PlxuICAgICAgICBDcmVhdGVcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gYnRuLXhzXCIgb249e3sgY2xpY2s6IHRoaXMub25JbXBvcnQgfX0+XG4gICAgICAgIEltcG9ydCBsZWdhY3lcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PjtcblxuICAgIHJldHVybiB0aGlzLnByb3BzLmxvYWRpbmcgPyBsb2FkZXIgOiBidXR0b25zO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVtcHR5Q29tcG9uZW50O1xuIl19