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
let StatusComponent = class StatusComponent {

  /**
   *
   * @param {Object} props - description
   */
  constructor(props) {
    this.props = props;
    this.database = new _database2.default();

    this.database.onDidError(this.didError);
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
      _this.props = props;
      return _etch2.default.update(_this);
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
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom('div', { 'class': 'block .pv-status-bar' });
  }

  /**
   *
   * @todo improve JSDoc
   * @param {Object} error - description
   */
  didError(error) {
    devlog(error);
  }
};
exports.default = StatusComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL3N0YXR1cy1jb250YWluZXIuanMiXSwibmFtZXMiOlsiU3RhdHVzQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImRhdGFiYXNlIiwib25EaWRFcnJvciIsImRpZEVycm9yIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJlcnJvciIsImRldmxvZyJdLCJtYXBwaW5ncyI6Ijs7OztBQUVBOzs7O0FBQ0E7Ozs7OzsyY0FIQTs7QUFLQTs7O0lBR01BLGUsR0FBTixNQUFNQSxlQUFOLENBQXNCOztBQUVwQjs7OztBQUlBQyxjQUFhQyxLQUFiLEVBQW9CO0FBQ2xCLFNBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0Isd0JBQWhCOztBQUVBLFNBQUtBLFFBQUwsQ0FBY0MsVUFBZCxDQUF5QixLQUFLQyxRQUE5QjtBQUNBLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS01DLFFBQU4sQ0FBY0wsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFlBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU8sZUFBS0ssTUFBTCxPQUFQO0FBRm1CO0FBR3BCOztBQUVEOzs7QUFHTUMsU0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTSxlQUFLQSxPQUFMLFFBQU47QUFEZTtBQUVoQjs7QUFFRDs7OztBQUlBQyxXQUFVO0FBQ1IsV0FDRSw0QkFBSyxTQUFNLHNCQUFYLEdBREY7QUFHRDs7QUFFRDs7Ozs7QUFLQUosV0FBVUssS0FBVixFQUFpQjtBQUNmQyxXQUFPRCxLQUFQO0FBQ0Q7QUFoRG1CLEM7a0JBbURQVixlIiwiZmlsZSI6InN0YXR1cy1jb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuLy4uL3NlcnZpY2VzL2RhdGFiYXNlJztcblxuLyoqXG4gKlxuICovXG5jbGFzcyBTdGF0dXNDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcblxuICAgIHRoaXMuZGF0YWJhc2Uub25EaWRFcnJvcih0aGlzLmRpZEVycm9yKTtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3M9J2Jsb2NrIC5wdi1zdGF0dXMtYmFyJz48L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtPYmplY3R9IGVycm9yIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGRpZEVycm9yIChlcnJvcikge1xuICAgIGRldmxvZyhlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzQ29tcG9uZW50O1xuIl19