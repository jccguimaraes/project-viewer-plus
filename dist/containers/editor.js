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

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  constructor() {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */
  async update(props) {
    if (props) {
      this.props = props;
      return _etch2.default.update(this, false);
    }

    return Promise.resolve();
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleIconClick(icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickDelete() {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickUpdate() {
    console.log(this);
  }

  /* eslint-disable-next-line require-jsdoc */
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
          'div',
          { className: 'block' },
          _etch2.default.dom(
            'button',
            {
              on: {
                click: this.didClickDelete
              },
              className: 'btn btn-error inline-block-tight'
            },
            'Delete'
          ),
          _etch2.default.dom(
            'button',
            {
              on: {
                click: this.didClickUpdate
              },
              className: 'btn btn-success inline-block-tight'
            },
            'Update'
          )
        ),
        ',',
        _etch2.default.dom(
          'h1',
          null,
          'Edit ...'
        ),
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

  /* eslint-disable-next-line require-jsdoc */
  getURI() {
    return 'project-viewer-plus-editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  getTitle() {
    return 'PVP - Editor';
  }
}
exports.default = EditorContainer; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImhhbmRsZUljb25DbGljayIsImljb24iLCJjb25zb2xlIiwibG9nIiwiZGlkQ2xpY2tEZWxldGUiLCJkaWRDbGlja1VwZGF0ZSIsInJlbmRlciIsImVkaXRhYmxlIiwibW9kZWwiLCJuYW1lIiwidW5kZWZpbmVkIiwiY2xpY2siLCJnZXRVUkkiLCJnZXRUaXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxlQUFOLENBQXNCO0FBQ25DO0FBQ0FDLGdCQUFlO0FBQ2IsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjQyxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9ILGVBQUtFLE1BQUwsQ0FBWSxJQUFaLEVBQWtCLEtBQWxCLENBQVA7QUFDRDs7QUFFRCxXQUFPRSxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixTQUFLUixPQUFMLENBQWFTLEtBQWI7QUFDQSxTQUFLVCxPQUFMLENBQWFVLE9BQWI7QUFDQSxTQUFLWixXQUFMLENBQWlCWSxPQUFqQjtBQUNBLFVBQU1SLGVBQUtNLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBRyxrQkFBaUJDLElBQWpCLEVBQXVCO0FBQ3JCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRDs7QUFFRDtBQUNBRyxtQkFBa0I7QUFDaEJGLFlBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUUsbUJBQWtCO0FBQ2hCSCxZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEO0FBQ0FHLFdBQVU7QUFDUixVQUFNQyxXQUFXLEtBQWpCOztBQUVBLFVBQU1iLFFBQVE7QUFDWmEsZ0JBQVVBLFFBREU7QUFFWkMsYUFBT0QsV0FDSDtBQUNBRSxjQUFNO0FBRE4sT0FERyxHQUlIQztBQU5RLEtBQWQ7O0FBU0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDBEQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsT0FBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGtCQUFJO0FBQ0ZDLHVCQUFPLEtBQUtQO0FBRFYsZUFETjtBQUlFLHlCQUFVO0FBSlo7QUFBQTtBQUFBLFdBREY7QUFTRTtBQUFBO0FBQUE7QUFDRSxrQkFBSTtBQUNGTyx1QkFBTyxLQUFLTjtBQURWLGVBRE47QUFJRSx5QkFBVTtBQUpaO0FBQUE7QUFBQTtBQVRGLFNBREY7QUFBQTtBQW1CRztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbkJIO0FBb0JFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FwQkY7QUFxQkU7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQSxTQXJCRjtBQXdCRTtBQUFBO0FBQUEsWUFBTyxTQUFNLGFBQWI7QUFDRSx3Q0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQyxFQUF3QyxNQUFLLE1BQTdDLEdBREY7QUFBQTtBQUFBO0FBeEJGLE9BREY7QUE4QkU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLHNDQUFPLFdBQVUsWUFBakIsRUFBOEIsTUFBSyxNQUFuQyxFQUEwQyxhQUFZLGFBQXRELEdBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxjQUFRLFNBQU0sY0FBZDtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGRjtBQUZGLFNBSEY7QUFVRTtBQUFBO0FBQUE7QUFDRSx3Q0FBTyxTQUFNLGdCQUFiLEVBQThCLE1BQUssVUFBbkMsR0FERjtBQUFBO0FBR0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEM7QUFIRjtBQVZGLE9BOUJGO0FBK0NFLHlCQUFDLGVBQUQsSUFBTyxhQUFhLEtBQUtMLGVBQXpCLEdBL0NGO0FBaURFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBUSxXQUFVLGlCQUFsQjtBQUFBO0FBQUE7QUFGRjtBQWpERixLQURGO0FBd0REOztBQUVEO0FBQ0FZLFdBQVU7QUFDUixXQUFPLDRCQUFQO0FBQ0Q7O0FBRUQ7QUFDQUMsYUFBWTtBQUNWLFdBQU8sY0FBUDtBQUNEO0FBN0hrQztrQkFBaEI1QixlLEVBUHJCIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUljb25DbGljayAoaWNvbikge1xuICAgIGNvbnNvbGUubG9nKGljb24pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2tEZWxldGUgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2tVcGRhdGUgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBlZGl0YWJsZTogZWRpdGFibGUsXG4gICAgICBtb2RlbDogZWRpdGFibGVcbiAgICAgICAgPyB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3Qtdmlld2VyLXBsdXMnXG4gICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3IgcGFuZS1pdGVtIG5hdGl2ZS1rZXktYmluZGluZ3NcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tEZWxldGVcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBEZWxldGVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrVXBkYXRlXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tc3VjY2VzcyBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBVcGRhdGVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICw8aDE+RWRpdCAuLi48L2gxPlxuICAgICAgICAgIDxoMj5UeXBlPC9oMj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtcmFkaW9cIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwidHlwZVwiIC8+IEdyb3VwXG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJpbnB1dC1sYWJlbFwiPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtcmFkaW9cIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwidHlwZVwiIC8+IFByb2plY3RcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5PcHRpb25zPC9oMj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaW5wdXQtdGV4dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJOYW1lIG9mIC4uLlwiIC8+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgU29ydCBCeSZuYnNwO1xuICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImlucHV0LXNlbGVjdFwiPlxuICAgICAgICAgICAgICA8b3B0aW9uPkFscGhhYmV0aWNhbGx5PC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24+UG9zaXRpb248L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtY2hlY2tib3hcIiB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgICAgICAgJm5ic3A7Q29sb3ImbmJzcDtcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LWNvbG9yXCIgdHlwZT1cImNvbG9yXCIgLz5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8SWNvbnMgb25JY29uQ2xpY2s9e3RoaXMuaGFuZGxlSWNvbkNsaWNrfSAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPkFkZCBwYXRoKHMpPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuICdwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdQVlAgLSBFZGl0b3InO1xuICB9XG59XG4iXX0=