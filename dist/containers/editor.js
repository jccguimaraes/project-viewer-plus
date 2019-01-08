'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _editor = require('../components/editor');

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  getURI() {
    return 'project-viewer-plus-editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  getTitle() {
    return 'PVP - Editor';
  }

  /* eslint-disable-next-line require-jsdoc */
  constructor(id) {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();

    this.entry = _state2.default.getEntry(id);
    console.log('editor', id, this.entry);

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

    console.log(this.entry);

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(_editor.EditorOptions, { pristine: !this.entry }),
        _etch2.default.dom(_editor.EditorType, null),
        _etch2.default.dom(_editor.EditorOrder, null)
      ),
      _etch2.default.dom(_icons2.default, { selected: this.entry.icon, onIconClick: this.handleIconClick })
    );
  }
}
exports.default = EditorContainer; /** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImVudHJ5Iiwic3RhdGUiLCJnZXRFbnRyeSIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwiaGFuZGxlSWNvbkNsaWNrIiwiaWNvbiIsImRpZENsaWNrRGVsZXRlIiwiZGlkQ2xpY2tVcGRhdGUiLCJyZW5kZXIiLCJlZGl0YWJsZSIsIm1vZGVsIiwibmFtZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQTtBQUNlLE1BQU1BLGVBQU4sQ0FBc0I7QUFDbkM7QUFDQUMsV0FBVTtBQUNSLFdBQU8sNEJBQVA7QUFDRDs7QUFFRDtBQUNBQyxhQUFZO0FBQ1YsV0FBTyxjQUFQO0FBQ0Q7O0FBRUQ7QUFDQUMsY0FBYUMsRUFBYixFQUFpQjtBQUNmLFNBQUtDLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBLFNBQUtDLEtBQUwsR0FBYUMsZ0JBQU1DLFFBQU4sQ0FBZVAsRUFBZixDQUFiO0FBQ0FRLFlBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCVCxFQUF0QixFQUEwQixLQUFLSyxLQUEvQjs7QUFFQUssbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0gsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFNBQUtiLE9BQUwsQ0FBYWMsS0FBYjtBQUNBLFNBQUtkLE9BQUwsQ0FBYWUsT0FBYjtBQUNBLFNBQUtqQixXQUFMLENBQWlCaUIsT0FBakI7QUFDQSxVQUFNUixlQUFLTSxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7O0FBRUQ7QUFDQUcsa0JBQWlCQyxJQUFqQixFQUF1QjtBQUNyQlosWUFBUUMsR0FBUixDQUFZVyxJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUMsbUJBQWtCO0FBQ2hCYixZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEOztBQUVEO0FBQ0FhLG1CQUFrQjtBQUNoQmQsWUFBUUMsR0FBUixDQUFZLElBQVo7QUFDRDs7QUFFRDtBQUNBYyxXQUFVO0FBQ1IsVUFBTUMsV0FBVyxLQUFqQjs7QUFFQSxVQUFNWCxRQUFRO0FBQ1pXLGdCQUFVQSxRQURFO0FBRVpDLGFBQU9ELFdBQ0g7QUFDQUUsY0FBTTtBQUROLE9BREcsR0FJSEM7QUFOUSxLQUFkOztBQVNBbkIsWUFBUUMsR0FBUixDQUFZLEtBQUtKLEtBQWpCOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwREFBZjtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsaUJBQWY7QUFDRSwyQkFBQyxxQkFBRCxJQUFlLFVBQVUsQ0FBQyxLQUFLQSxLQUEvQixHQURGO0FBRUUsMkJBQUMsa0JBQUQsT0FGRjtBQUdFLDJCQUFDLG1CQUFEO0FBSEYsT0FERjtBQU9FLHlCQUFDLGVBQUQsSUFBTyxVQUFVLEtBQUtBLEtBQUwsQ0FBV2UsSUFBNUIsRUFBa0MsYUFBYSxLQUFLRCxlQUFwRDtBQVBGLEtBREY7QUFXRDtBQXJGa0M7a0JBQWhCdkIsZSxFQVZyQiIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHsgRWRpdG9yVHlwZSwgRWRpdG9yT3JkZXIsIEVkaXRvck9wdGlvbnMgfSBmcm9tICcuLi9jb21wb25lbnRzL2VkaXRvcic7XG5pbXBvcnQgc3RhdGUgZnJvbSAnLi4vc2VydmljZXMvc3RhdGUnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yQ29udGFpbmVyIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VVJJICgpIHtcbiAgICByZXR1cm4gJ3Byb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFRpdGxlICgpIHtcbiAgICByZXR1cm4gJ1BWUCAtIEVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAoaWQpIHtcbiAgICB0aGlzLmRpc3Bvc2FibGVzID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuXG4gICAgdGhpcy5lbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcbiAgICBjb25zb2xlLmxvZygnZWRpdG9yJywgaWQsIHRoaXMuZW50cnkpO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUljb25DbGljayAoaWNvbikge1xuICAgIGNvbnNvbGUubG9nKGljb24pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2tEZWxldGUgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2tVcGRhdGUgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCBlZGl0YWJsZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBlZGl0YWJsZTogZWRpdGFibGUsXG4gICAgICBtb2RlbDogZWRpdGFibGVcbiAgICAgICAgPyB7XG4gICAgICAgICAgbmFtZTogJ3Byb2plY3Qtdmlld2VyLXBsdXMnXG4gICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2codGhpcy5lbnRyeSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxFZGl0b3JPcHRpb25zIHByaXN0aW5lPXshdGhpcy5lbnRyeX0gLz5cbiAgICAgICAgICA8RWRpdG9yVHlwZSAvPlxuICAgICAgICAgIDxFZGl0b3JPcmRlciAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8SWNvbnMgc2VsZWN0ZWQ9e3RoaXMuZW50cnkuaWNvbn0gb25JY29uQ2xpY2s9e3RoaXMuaGFuZGxlSWNvbkNsaWNrfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19