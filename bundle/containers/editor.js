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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiZW1pdHRlciIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJlbWl0IiwicmVuZGVyT3B0aW9ucyIsImhhbmRsZUljb25DbGljayIsImljb24iLCJyZW5kZXIiLCJlZGl0YWJsZSIsIm1vZGVsIiwibmFtZSIsInVuZGVmaW5lZCIsIm9uRGlkRGVzdHJveSIsImNhbGxiYWNrIiwib24iLCJnZXRVUkkiLCJnZXRUaXRsZSIsImdldEljb25OYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OzsyY0FMQTs7QUFPQTs7O0lBR01BLGUsR0FBTixNQUFNQSxlQUFOLENBQXNCO0FBQ3BCOzs7QUFHQUMsZ0JBQWU7QUFDYixTQUFLQyxXQUFMLEdBQW1CLCtCQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxtQkFBZjs7QUFFQSxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtNQyxRQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQixVQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxlQUFPLGVBQUtELE1BQUwsT0FBUDtBQUNEOztBQUVELGFBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQU5tQjtBQU9wQjs7QUFFRDs7O0FBR01DLFNBQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmLGFBQUtQLFdBQUwsQ0FBaUJRLE9BQWpCO0FBQ0EsYUFBS1AsT0FBTCxDQUFhUSxJQUFiLENBQWtCLGFBQWxCO0FBRmU7QUFHaEI7O0FBRUQ7OztBQUdBQyxrQkFBaUIsQ0FvQmhCO0FBbkJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCRjs7OztBQUlBQyxrQkFBaUJDLElBQWpCLEVBQXVCO0FBQ3JCLDBCQUFPQSxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsV0FBVTtBQUNSLFVBQU1DLFdBQVcsS0FBakI7O0FBRUEsVUFBTVYsUUFBUTtBQUNaVSxnQkFBVUEsUUFERTtBQUVaQyxhQUFPRCxXQUNIO0FBQ0FFLGNBQU07QUFETixPQURHLEdBSUhDO0FBTlEsS0FBZDs7QUFTQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQSxTQUZGO0FBS0U7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQTtBQUxGLE9BREY7QUFXRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsc0NBQU8sV0FBVSxZQUFqQixFQUE4QixNQUFLLE1BQW5DLEVBQTBDLGFBQVksYUFBdEQsR0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGNBQVEsU0FBTSxjQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGO0FBRkYsU0FIRjtBQVVFO0FBQUE7QUFBQTtBQUNFLHdDQUFPLFNBQU0sZ0JBQWIsRUFBOEIsTUFBSyxVQUFuQyxHQURGO0FBQUE7QUFHRSx3Q0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQztBQUhGO0FBVkYsT0FYRjtBQTRCRSw0Q0FBTyxhQUFhLEtBQUtOLGVBQXpCLEdBNUJGO0FBOEJFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBUSxXQUFVLGlCQUFsQjtBQUFBO0FBQUE7QUFGRjtBQTlCRixLQURGO0FBc0NEOztBQUVEOzs7O0FBSUFPLGVBQWNDLFFBQWQsRUFBd0I7QUFDdEIsV0FBTyxLQUFLbEIsT0FBTCxDQUFhbUIsRUFBYixDQUFnQixhQUFoQixFQUErQkQsUUFBL0IsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUFFLFdBQVU7QUFDUixXQUFPLFlBQVA7QUFDRDs7QUFFRDs7OztBQUlBQyxhQUFZO0FBQ1YsV0FBTyxRQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsZ0JBQWU7QUFDYixXQUFPLFFBQVA7QUFDRDtBQXhKbUIsQztrQkEySlB6QixlIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IGRldmxvZyBmcm9tICcuLy4uL3NlcnZpY2VzL2RldmxvZyc7XG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95Jyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHJlbmRlck9wdGlvbnMgKCkge1xuICAgIC8qKlxuICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiPlVwZGF0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICAgIDxoMT5FZGl0IHt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9oMT5cbiAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2tcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgaW5saW5lLWJsb2NrLXRpZ2h0XCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiPkNyZWF0ZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+LFxuICAgICAgPGgxPk5hbWU8L2gxPlxuICAgIF07XG4gICAgKi9cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBoYW5kbGVJY29uQ2xpY2sgKGljb24pIHtcbiAgICBkZXZsb2coaWNvbik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgZWRpdGFibGUgPSBmYWxzZTtcblxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgZWRpdGFibGU6IGVkaXRhYmxlLFxuICAgICAgbW9kZWw6IGVkaXRhYmxlXG4gICAgICAgID8ge1xuICAgICAgICAgIG5hbWU6ICdwcm9qZWN0LXZpZXdlci1wbHVzJ1xuICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yIHBhbmUtaXRlbSBuYXRpdmUta2V5LWJpbmRpbmdzXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlR5cGU8L2gyPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ0eXBlXCIgLz4gR3JvdXBcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ0eXBlXCIgLz4gUHJvamVjdFxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPk9wdGlvbnM8L2gyPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJpbnB1dC10ZXh0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk5hbWUgb2YgLi4uXCIvPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIFNvcnQgQnkmbmJzcDtcbiAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJpbnB1dC1zZWxlY3RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbj5BbHBoYWJldGljYWxseTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uPlBvc2l0aW9uPC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz0naW5wdXQtY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94JyAvPlxuICAgICAgICAgICAgJm5ic3A7Q29sb3ImbmJzcDtcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LWNvbG9yXCIgdHlwZT1cImNvbG9yXCIgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8SWNvbnMgb25JY29uQ2xpY2s9e3RoaXMuaGFuZGxlSWNvbkNsaWNrfSAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPkFkZCBwYXRoKHMpPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkRGVzdHJveSAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKCdkaWQtZGVzdHJveScsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3B2cC1lZGl0b3InO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdFZGl0b3InO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRJY29uTmFtZSAoKSB7XG4gICAgcmV0dXJuICdnaXRodWInO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVkaXRvckNvbnRhaW5lcjtcbiJdfQ==