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
      return _etch2.default.update(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImhhbmRsZUljb25DbGljayIsImljb24iLCJjb25zb2xlIiwibG9nIiwiZGlkQ2xpY2tEZWxldGUiLCJkaWRDbGlja1VwZGF0ZSIsInJlbmRlciIsImVkaXRhYmxlIiwibW9kZWwiLCJuYW1lIiwidW5kZWZpbmVkIiwiY2xpY2siLCJnZXRVUkkiLCJnZXRUaXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxlQUFOLENBQXNCO0FBQ25DO0FBQ0FDLGdCQUFlO0FBQ2IsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUFDLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjQyxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULFdBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQU9ILGVBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPRSxRQUFRQyxPQUFSLEVBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixTQUFLUixPQUFMLENBQWFTLEtBQWI7QUFDQSxTQUFLVCxPQUFMLENBQWFVLE9BQWI7QUFDQSxTQUFLWixXQUFMLENBQWlCWSxPQUFqQjtBQUNBLFVBQU1SLGVBQUtNLE9BQUwsQ0FBYSxJQUFiLENBQU47QUFDRDs7QUFFRDtBQUNBRyxrQkFBaUJDLElBQWpCLEVBQXVCO0FBQ3JCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRDs7QUFFRDtBQUNBRyxtQkFBa0I7QUFDaEJGLFlBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUUsbUJBQWtCO0FBQ2hCSCxZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEO0FBQ0FHLFdBQVU7QUFDUixVQUFNQyxXQUFXLEtBQWpCOztBQUVBLFVBQU1iLFFBQVE7QUFDWmEsZ0JBQVVBLFFBREU7QUFFWkMsYUFBT0QsV0FDSDtBQUNBRSxjQUFNO0FBRE4sT0FERyxHQUlIQztBQU5RLEtBQWQ7O0FBU0EsV0FDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLDBEQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsT0FBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLGtCQUFJO0FBQ0ZDLHVCQUFPLEtBQUtQO0FBRFYsZUFETjtBQUlFLHlCQUFVO0FBSlo7QUFBQTtBQUFBLFdBREY7QUFTRTtBQUFBO0FBQUE7QUFDRSxrQkFBSTtBQUNGTyx1QkFBTyxLQUFLTjtBQURWLGVBRE47QUFJRSx5QkFBVTtBQUpaO0FBQUE7QUFBQTtBQVRGLFNBREY7QUFBQTtBQW1CRztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbkJIO0FBb0JFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FwQkY7QUFxQkU7QUFBQTtBQUFBLFlBQU8sU0FBTSxhQUFiO0FBQ0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEMsRUFBd0MsTUFBSyxNQUE3QyxHQURGO0FBQUE7QUFBQSxTQXJCRjtBQXdCRTtBQUFBO0FBQUEsWUFBTyxTQUFNLGFBQWI7QUFDRSx3Q0FBTyxTQUFNLGFBQWIsRUFBMkIsTUFBSyxPQUFoQyxFQUF3QyxNQUFLLE1BQTdDLEdBREY7QUFBQTtBQUFBO0FBeEJGLE9BREY7QUE4QkU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLHNDQUFPLFdBQVUsWUFBakIsRUFBOEIsTUFBSyxNQUFuQyxFQUEwQyxhQUFZLGFBQXRELEdBRkY7QUFHRTtBQUFBO0FBQUE7QUFBQTtBQUVFO0FBQUE7QUFBQSxjQUFRLFNBQU0sY0FBZDtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGRjtBQUZGLFNBSEY7QUFVRTtBQUFBO0FBQUE7QUFDRSx3Q0FBTyxTQUFNLGdCQUFiLEVBQThCLE1BQUssVUFBbkMsR0FERjtBQUFBO0FBR0Usd0NBQU8sU0FBTSxhQUFiLEVBQTJCLE1BQUssT0FBaEM7QUFIRjtBQVZGLE9BOUJGO0FBK0NFLHlCQUFDLGVBQUQsSUFBTyxhQUFhLEtBQUtMLGVBQXpCLEdBL0NGO0FBaURFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWY7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBREY7QUFFRTtBQUFBO0FBQUEsWUFBUSxXQUFVLGlCQUFsQjtBQUFBO0FBQUE7QUFGRjtBQWpERixLQURGO0FBd0REOztBQUVEO0FBQ0FZLFdBQVU7QUFDUixXQUFPLDRCQUFQO0FBQ0Q7O0FBRUQ7QUFDQUMsYUFBWTtBQUNWLFdBQU8sY0FBUDtBQUNEO0FBN0hrQztrQkFBaEI1QixlLEVBUHJCIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZW1pdHRlci5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlSWNvbkNsaWNrIChpY29uKSB7XG4gICAgY29uc29sZS5sb2coaWNvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja0RlbGV0ZSAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja1VwZGF0ZSAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGVkaXRhYmxlID0gZmFsc2U7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIGVkaXRhYmxlOiBlZGl0YWJsZSxcbiAgICAgIG1vZGVsOiBlZGl0YWJsZVxuICAgICAgICA/IHtcbiAgICAgICAgICBuYW1lOiAncHJvamVjdC12aWV3ZXItcGx1cydcbiAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2tcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb249e3tcbiAgICAgICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGlja0RlbGV0ZVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWVycm9yIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIERlbGV0ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMuZGlkQ2xpY2tVcGRhdGVcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFVwZGF0ZVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgLDxoMT5FZGl0IC4uLjwvaDE+XG4gICAgICAgICAgPGgyPlR5cGU8L2gyPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ0eXBlXCIgLz4gR3JvdXBcbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1yYWRpb1wiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJ0eXBlXCIgLz4gUHJvamVjdFxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPk9wdGlvbnM8L2gyPlxuICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJpbnB1dC10ZXh0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk5hbWUgb2YgLi4uXCIgLz5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBTb3J0IEJ5Jm5ic3A7XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiaW5wdXQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgIDxvcHRpb24+QWxwaGFiZXRpY2FsbHk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbj5Qb3NpdGlvbjwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1jaGVja2JveFwiIHR5cGU9XCJjaGVja2JveFwiIC8+XG4gICAgICAgICAgICAmbmJzcDtDb2xvciZuYnNwO1xuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtY29sb3JcIiB0eXBlPVwiY29sb3JcIiAvPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxJY29ucyBvbkljb25DbGljaz17dGhpcy5oYW5kbGVJY29uQ2xpY2t9IC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+UGF0aHM8L2gyPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+QWRkIHBhdGgocyk8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3Byb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ1BWUCAtIEVkaXRvcic7XG4gIH1cbn1cbiJdfQ==