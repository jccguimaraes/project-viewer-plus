'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class EditorContainer {
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
    this.disposables.dispose();
    this.emitter.emit('did-destroy');
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
    console.log(icon);
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
}
exports.default = EditorContainer; /** @jsx etch.dom */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImRpc3Bvc2UiLCJlbWl0IiwicmVuZGVyT3B0aW9ucyIsImhhbmRsZUljb25DbGljayIsImljb24iLCJjb25zb2xlIiwibG9nIiwicmVuZGVyIiwiZWRpdGFibGUiLCJtb2RlbCIsIm5hbWUiLCJ1bmRlZmluZWQiLCJvbkRpZERlc3Ryb3kiLCJjYWxsYmFjayIsIm9uIiwiZ2V0VVJJIiwiZ2V0VGl0bGUiLCJnZXRJY29uTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbkM7OztBQUdBQyxnQkFBZTtBQUNiLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBQyxtQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEOztBQUVEOzs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFPSCxlQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0UsUUFBUUMsT0FBUixFQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixTQUFLVixXQUFMLENBQWlCVyxPQUFqQjtBQUNBLFNBQUtULE9BQUwsQ0FBYVUsSUFBYixDQUFrQixhQUFsQjtBQUNEOztBQUVEOzs7QUFHQUMsa0JBQWlCLENBb0JoQjtBQW5CQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkY7Ozs7QUFJQUMsa0JBQWlCQyxJQUFqQixFQUF1QjtBQUNyQkMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUcsV0FBVTtBQUNSLFVBQU1DLFdBQVcsS0FBakI7O0FBRUEsVUFBTVosUUFBUTtBQUNaWSxnQkFBVUEsUUFERTtBQUVaQyxhQUFPRCxXQUNIO0FBQ0FFLGNBQU07QUFETixPQURHLEdBSUhDO0FBTlEsS0FBZDs7QUFTQSxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsMERBQWY7QUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQSxTQUZGO0FBS0U7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQTtBQUxGLE9BREY7QUFXRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUUsc0NBQU8sV0FBVSxZQUFqQixFQUE4QixNQUFLLE1BQW5DLEVBQTBDLGFBQVksYUFBdEQsR0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBRUU7QUFBQTtBQUFBLGNBQVEsU0FBTSxjQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZGO0FBRkYsU0FIRjtBQVVFO0FBQUE7QUFBQTtBQUNFLHdDQUFPLFNBQU0sZ0JBQWIsRUFBOEIsTUFBSyxVQUFuQyxHQURGO0FBQUE7QUFHRSx3Q0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQztBQUhGO0FBVkYsT0FYRjtBQTRCRSx5QkFBQyxlQUFELElBQU8sYUFBYSxLQUFLUixlQUF6QixHQTVCRjtBQThCRTtBQUFBO0FBQUEsVUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBLFlBQVEsV0FBVSxpQkFBbEI7QUFBQTtBQUFBO0FBRkY7QUE5QkYsS0FERjtBQXNDRDs7QUFFRDs7OztBQUlBUyxlQUFjQyxRQUFkLEVBQXdCO0FBQ3RCLFdBQU8sS0FBS3RCLE9BQUwsQ0FBYXVCLEVBQWIsQ0FBZ0IsYUFBaEIsRUFBK0JELFFBQS9CLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBRSxXQUFVO0FBQ1IsV0FBTyxZQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQUMsYUFBWTtBQUNWLFdBQU8sUUFBUDtBQUNEOztBQUVEOzs7O0FBSUFDLGdCQUFlO0FBQ2IsV0FBTyxRQUFQO0FBQ0Q7QUF4SmtDO2tCQUFoQjlCLGUsRUFUckIiLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1kZXN0cm95Jyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHJlbmRlck9wdGlvbnMgKCkge1xuICAgIC8qKlxuICAgIGlmICh0aGlzLnByb3BzLmVkaXRhYmxlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiPlVwZGF0ZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj4sXG4gICAgICAgIDxoMT5FZGl0IHt0aGlzLnByb3BzLm1vZGVsLm5hbWV9PC9oMT5cbiAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2tcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgaW5saW5lLWJsb2NrLXRpZ2h0XCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiPkNyZWF0ZTwvYnV0dG9uPlxuICAgICAgPC9kaXY+LFxuICAgICAgPGgxPk5hbWU8L2gxPlxuICAgIF07XG4gICAgKi9cbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWNvbiAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBoYW5kbGVJY29uQ2xpY2sgKGljb24pIHtcbiAgICBjb25zb2xlLmxvZyhpY29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBlZGl0YWJsZTogZWRpdGFibGUsXG4gICAgICBtb2RlbDogZWRpdGFibGVcbiAgICAgICAgPyB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3Qtdmlld2VyLXBsdXMnXG4gICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3IgcGFuZS1pdGVtIG5hdGl2ZS1rZXktYmluZGluZ3NcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LXJhZGlvXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInR5cGVcIiAvPiBHcm91cFxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiaW5wdXQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LXJhZGlvXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cInR5cGVcIiAvPiBQcm9qZWN0XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+T3B0aW9uczwvaDI+XG4gICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LXRleHRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTmFtZSBvZiAuLi5cIi8+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgU29ydCBCeSZuYnNwO1xuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImlucHV0LXNlbGVjdFwiPlxuICAgICAgICAgICAgICA8b3B0aW9uPkFscGhhYmV0aWNhbGx5PC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24+UG9zaXRpb248L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPSdpbnB1dC1jaGVja2JveCcgdHlwZT0nY2hlY2tib3gnIC8+XG4gICAgICAgICAgICAmbmJzcDtDb2xvciZuYnNwO1xuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtY29sb3JcIiB0eXBlPVwiY29sb3JcIiAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxJY29ucyBvbkljb25DbGljaz17dGhpcy5oYW5kbGVJY29uQ2xpY2t9IC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+UGF0aHM8L2gyPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QWRkIHBhdGgocyk8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWREZXN0cm95IChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oJ2RpZC1kZXN0cm95JywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHZwLWVkaXRvcic7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ0VkaXRvcic7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gJ2dpdGh1Yic7XG4gIH1cbn1cbiJdfQ==