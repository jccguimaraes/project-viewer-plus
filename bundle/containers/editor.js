'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _devlog = require('./../services/devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /** @jsx etch.dom */

/**
 *
 */
let EditorContainer = class EditorContainer {
  /**
   *
   */
  constructor() {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

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
      _this2.disposables.dispose();
      _this2.emitter.emit('did-destroy');
    })();
  }

  /**
   *
   */
  renderOptions() {}
  /**
  if (this.props.editable) {
    return [
      <div className="block">
        <button className="btn btn-error inline-block-tight">Delete</button>
        <button className="btn btn-success inline-block-tight">Update</button>
      </div>,
      <h1>Edit {this.props.model.name}</h1>
    ];
  }
   return [
    <div className="block">
      <button className="btn btn-warning inline-block-tight">Cancel</button>
      <button className="btn btn-success inline-block-tight">Create</button>
    </div>,
    <h1>Name</h1>
  ];
  */


  /**
   *
   * @param {string} icon - description
   */
  handleIconClick(icon) {
    (0, _devlog2.default)(icon);
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    const editable = false;

    const props = {
      editable: editable,
      model: editable ? {
        name: 'project-viewer-plus'
      } : undefined
    };

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Type'
        ),
        _etch2.default.dom(
          'label',
          { 'class': 'input-label' },
          _etch2.default.dom('input', { 'class': 'input-radio', type: 'radio', name: 'type' }),
          ' Group'
        ),
        _etch2.default.dom(
          'label',
          { 'class': 'input-label' },
          _etch2.default.dom('input', { 'class': 'input-radio', type: 'radio', name: 'type' }),
          ' Project'
        )
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Options'
        ),
        _etch2.default.dom('input', { className: 'input-text', type: 'text', placeholder: 'Name of ...' }),
        _etch2.default.dom(
          'label',
          null,
          'Sort By\xA0',
          _etch2.default.dom(
            'select',
            { 'class': 'input-select' },
            _etch2.default.dom(
              'option',
              null,
              'Alphabetically'
            ),
            _etch2.default.dom(
              'option',
              null,
              'Position'
            )
          )
        ),
        _etch2.default.dom(
          'label',
          null,
          _etch2.default.dom('input', { 'class': 'input-checkbox', type: 'checkbox' }),
          '\xA0Color\xA0',
          _etch2.default.dom('input', { 'class': 'input-color', type: 'color' })
        )
      ),
      _etch2.default.dom(_icons2.default, { onIconClick: this.handleIconClick }),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Paths'
        ),
        _etch2.default.dom(
          'button',
          { className: 'btn btn-primary' },
          'Add path(s)'
        )
      )
    );
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy(callback) {
    return this.emitter.on('did-destroy', callback);
  }

  /**
   *
   * @returns {string} description
   */
  getURI() {
    return 'pvp-editor';
  }

  /**
   *
   * @returns {string} description
   */
  getTitle() {
    return 'Editor';
  }

  /**
   *
   * @returns {string} description
   */
  getIconName() {
    return 'github';
  }
};
exports.default = EditorContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJlbWl0IiwicmVuZGVyT3B0aW9ucyIsImhhbmRsZUljb25DbGljayIsImljb24iLCJyZW5kZXIiLCJlZGl0YWJsZSIsIm1vZGVsIiwibmFtZSIsInVuZGVmaW5lZCIsIm9uRGlkRGVzdHJveSIsImNhbGxiYWNrIiwib24iLCJnZXRVUkkiLCJnZXRUaXRsZSIsImdldEljb25OYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FMQTs7QUFPQTs7O0lBR01BLGUsR0FBTixNQUFNQSxlQUFOLENBQXNCO0FBQ3BCOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLQyxXQUFMLEdBQW1CLElBQUlDLHlCQUFKLEVBQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjs7QUFFQUMsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLTUMsUUFBTixDQUFjQyxLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsY0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsZUFBT0gsZUFBS0UsTUFBTCxDQUFZLEtBQVosQ0FBUDtBQUNEOztBQUVELGFBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLGFBQUtWLFdBQUwsQ0FBaUJXLE9BQWpCO0FBQ0EsYUFBS1QsT0FBTCxDQUFhVSxJQUFiLENBQWtCLGFBQWxCO0FBRmU7QUFHaEI7O0FBRUQ7OztBQUdBQyxrQkFBaUIsQ0FvQmhCO0FBbkJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCRjs7OztBQUlBQyxrQkFBaUJDLElBQWpCLEVBQXVCO0FBQ3JCLDBCQUFPQSxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFdBQVcsS0FBakI7O0FBRUEsVUFBTVYsUUFBUTtBQUNaVSxnQkFBVUEsUUFERTtBQUVaQyxhQUFPRCxXQUNIO0FBQ0FFLGNBQU07QUFETixPQURHLEdBSUhDO0FBTlEsS0FBZDs7QUFTQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQSxTQUZGO0FBS0U7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQTtBQUxGLE9BREY7QUFXRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsc0NBQU8sV0FBVSxZQUFqQixFQUE4QixNQUFLLE1BQW5DLEVBQTBDLGFBQVksYUFBdEQsR0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGNBQVEsU0FBTSxjQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGO0FBRkYsU0FIRjtBQVVFO0FBQUE7QUFBQTtBQUNFLHdDQUFPLFNBQU0sZ0JBQWIsRUFBOEIsTUFBSyxVQUFuQyxHQURGO0FBQUE7QUFHRSx3Q0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQztBQUhGO0FBVkYsT0FYRjtBQTRCRSx5QkFBQyxlQUFELElBQU8sYUFBYSxLQUFLTixlQUF6QixHQTVCRjtBQThCRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQVEsV0FBVSxpQkFBbEI7QUFBQTtBQUFBO0FBRkY7QUE5QkYsS0FERjtBQXNDRDs7QUFFRDs7OztBQUlBTyxlQUFjQyxRQUFkLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS3BCLE9BQUwsQ0FBYXFCLEVBQWIsQ0FBZ0IsYUFBaEIsRUFBK0JELFFBQS9CLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBRSxXQUFVO0FBQ1IsV0FBTyxZQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWTtBQUNWLFdBQU8sUUFBUDtBQUNEOztBQUVEOzs7O0FBSUFDLGdCQUFlO0FBQ2IsV0FBTyxRQUFQO0FBQ0Q7QUF4Sm1CLEM7a0JBMkpQNUIsZSIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBkZXZsb2cgZnJvbSAnLi8uLi9zZXJ2aWNlcy9kZXZsb2cnO1xuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEVkaXRvckNvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtZGVzdHJveScpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICByZW5kZXJPcHRpb25zICgpIHtcbiAgICAvKipcbiAgICBpZiAodGhpcy5wcm9wcy5lZGl0YWJsZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9ja1wiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHRcIj5VcGRhdGU8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgICA8aDE+RWRpdCB7dGhpcy5wcm9wcy5tb2RlbC5uYW1lfTwvaDE+XG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIGlubGluZS1ibG9jay10aWdodFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHRcIj5DcmVhdGU8L2J1dHRvbj5cbiAgICAgIDwvZGl2PixcbiAgICAgIDxoMT5OYW1lPC9oMT5cbiAgICBdO1xuICAgICovXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGljb24gLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaGFuZGxlSWNvbkNsaWNrIChpY29uKSB7XG4gICAgZGV2bG9nKGljb24pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIGVkaXRhYmxlOiBlZGl0YWJsZSxcbiAgICAgIG1vZGVsOiBlZGl0YWJsZVxuICAgICAgICA/IHtcbiAgICAgICAgICBuYW1lOiAncHJvamVjdC12aWV3ZXItcGx1cydcbiAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5UeXBlPC9oMj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtcmFkaW9cIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwidHlwZVwiIC8+IEdyb3VwXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtcmFkaW9cIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwidHlwZVwiIC8+IFByb2plY3RcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5PcHRpb25zPC9oMj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaW5wdXQtdGV4dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJOYW1lIG9mIC4uLlwiLz5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBTb3J0IEJ5Jm5ic3A7XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiaW5wdXQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgIDxvcHRpb24+QWxwaGFiZXRpY2FsbHk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbj5Qb3NpdGlvbjwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9J2lucHV0LWNoZWNrYm94JyB0eXBlPSdjaGVja2JveCcgLz5cbiAgICAgICAgICAgICZuYnNwO0NvbG9yJm5ic3A7XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1jb2xvclwiIHR5cGU9XCJjb2xvclwiIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPEljb25zIG9uSWNvbkNsaWNrPXt0aGlzLmhhbmRsZUljb25DbGlja30gLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5QYXRoczwvaDI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5BZGQgcGF0aChzKTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZERlc3Ryb3kgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5vbignZGlkLWRlc3Ryb3knLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuICdwdnAtZWRpdG9yJztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnRWRpdG9yJztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0SWNvbk5hbWUgKCkge1xuICAgIHJldHVybiAnZ2l0aHViJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0b3JDb250YWluZXI7XG4iXX0=