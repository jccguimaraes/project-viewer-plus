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
  didClickAction(action) {
    console.log(action, this.entry);

    if (action === 'create') {
      _state2.default.addEntry(this.entry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  didChangeType(type) {
    switch (type) {
      case 'group':
        this.entry = _state2.default.createGroup();
        break;
      default:
        this.entry = _state2.default.createProject();
    }
  }

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
    console.log('created editor', id);

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
  didClickNo() {
    console.log('didClickNo');
  }

  /* eslint-disable-next-line require-jsdoc */
  didClickYes() {
    console.log('didClickYes', this.entry);
  }

  /* eslint-disable-next-line require-jsdoc */
  didChangeName(value) {
    this.entry.name = value;
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    console.log(this.entry);
    const icon = this.entry ? this.entry.icon : undefined;
    const name = this.entry ? this.entry.name : '';

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(_editor.EditorOptions, {
        pristine: !this.entry,
        ondidClick: action => this.didClickAction(action)
      }),
      _etch2.default.dom(
        _editor.EditorType,
        { onDidChange: type => this.didChangeType(type) },
        _etch2.default.dom(
          'h2',
          null,
          'Type'
        )
      ),
      _etch2.default.dom(
        'div',
        { className: 'block-container' },
        _etch2.default.dom(
          'h2',
          null,
          'Name'
        ),
        _etch2.default.dom(_editor.EditorName, {
          name: name,
          onDidChange: value => this.didChangeName(value)
        })
      )
    );
  }
}

exports.default = EditorContainer; /*
                                   
                                           <div className="block-container">
                                             <h2>Order</h2>
                                             <EditorOrder />
                                           </div>
                                   
                                           <div className="block-container">
                                             <h2>Name</h2>
                                             <EditorName
                                               name={name}
                                               onDidChange={value => this.didChangeName(value)}
                                             />
                                           </div>
                                   
                                           <div className="block-container">
                                             <h2>Icons</h2>
                                             <Icons selected={icon} onIconClick={this.handleIconClick} />
                                           </div>
                                   
                                           <div className="block-container">
                                             <h2>Paths</h2>
                                             <EditorPaths />
                                           </div>
                                           */
/** @jsx etch.dom */

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJkaWRDbGlja0FjdGlvbiIsImFjdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJlbnRyeSIsInN0YXRlIiwiYWRkRW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiZGlkQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiaWQiLCJkaXNwb3NhYmxlcyIsIkNvbXBvc2l0ZURpc3Bvc2FibGUiLCJlbWl0dGVyIiwiRW1pdHRlciIsImdldEVudHJ5IiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsImhhbmRsZUljb25DbGljayIsImljb24iLCJkaWRDbGlja05vIiwiZGlkQ2xpY2tZZXMiLCJkaWRDaGFuZ2VOYW1lIiwidmFsdWUiLCJuYW1lIiwicmVuZGVyIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxpQkFBZ0JDLE1BQWhCLEVBQXdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLE1BQVosRUFBb0IsS0FBS0csS0FBekI7O0FBRUEsUUFBSUgsV0FBVyxRQUFmLEVBQXlCO0FBQ3ZCSSxzQkFBTUMsUUFBTixDQUFlLEtBQUtGLEtBQXBCO0FBQ0Q7O0FBRURHLFNBQUtDLFNBQUwsQ0FBZUMsYUFBZixHQUErQkMsaUJBQS9CO0FBQ0Q7O0FBRUQ7QUFDQUMsZ0JBQWVDLElBQWYsRUFBcUI7QUFDbkIsWUFBUUEsSUFBUjtBQUNFLFdBQUssT0FBTDtBQUNFLGFBQUtSLEtBQUwsR0FBYUMsZ0JBQU1RLFdBQU4sRUFBYjtBQUNBO0FBQ0Y7QUFDRSxhQUFLVCxLQUFMLEdBQWFDLGdCQUFNUyxhQUFOLEVBQWI7QUFMSjtBQU9EOztBQUVEO0FBQ0FDLFdBQVU7QUFDUixXQUFPLDRCQUFQO0FBQ0Q7O0FBRUQ7QUFDQUMsYUFBWTtBQUNWLFdBQU8sY0FBUDtBQUNEOztBQUVEO0FBQ0FDLGNBQWFDLEVBQWIsRUFBaUI7QUFDZmhCLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QmUsRUFBOUI7O0FBRUEsU0FBS0MsV0FBTCxHQUFtQixJQUFJQyx5QkFBSixFQUFuQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7O0FBRUEsU0FBS2xCLEtBQUwsR0FBYUMsZ0JBQU1rQixRQUFOLENBQWVMLEVBQWYsQ0FBYjtBQUNBaEIsWUFBUUMsR0FBUixDQUFZLFFBQVosRUFBc0JlLEVBQXRCLEVBQTBCLEtBQUtkLEtBQS9COztBQUVBb0IsbUJBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDs7QUFFRDs7Ozs7QUFLQSxRQUFNQyxNQUFOLENBQWNDLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBT0gsZUFBS0UsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVELFdBQU9FLFFBQVFDLE9BQVIsRUFBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTUMsT0FBTixHQUFpQjtBQUNmLFNBQUtULE9BQUwsQ0FBYVUsS0FBYjtBQUNBLFNBQUtWLE9BQUwsQ0FBYVcsT0FBYjtBQUNBLFNBQUtiLFdBQUwsQ0FBaUJhLE9BQWpCO0FBQ0EsVUFBTVIsZUFBS00sT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FHLGtCQUFpQkMsSUFBakIsRUFBdUI7QUFDckJoQyxZQUFRQyxHQUFSLENBQVkrQixJQUFaO0FBQ0Q7O0FBRUQ7QUFDQUMsZUFBYztBQUNaakMsWUFBUUMsR0FBUixDQUFZLFlBQVo7QUFDRDs7QUFFRDtBQUNBaUMsZ0JBQWU7QUFDYmxDLFlBQVFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLEtBQUtDLEtBQWhDO0FBQ0Q7O0FBRUQ7QUFDQWlDLGdCQUFlQyxLQUFmLEVBQXNCO0FBQ3BCLFNBQUtsQyxLQUFMLENBQVdtQyxJQUFYLEdBQWtCRCxLQUFsQjtBQUNEOztBQUVEO0FBQ0FFLFdBQVU7QUFDUnRDLFlBQVFDLEdBQVIsQ0FBWSxLQUFLQyxLQUFqQjtBQUNBLFVBQU04QixPQUFPLEtBQUs5QixLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXOEIsSUFBeEIsR0FBK0JPLFNBQTVDO0FBQ0EsVUFBTUYsT0FBTyxLQUFLbkMsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV21DLElBQXhCLEdBQStCLEVBQTVDOztBQUVBLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwREFBZjtBQUNFLHlCQUFDLHFCQUFEO0FBQ0Usa0JBQVUsQ0FBQyxLQUFLbkMsS0FEbEI7QUFFRSxvQkFBWUgsVUFBVSxLQUFLRCxjQUFMLENBQW9CQyxNQUFwQjtBQUZ4QixRQURGO0FBTUU7QUFBQywwQkFBRDtBQUFBLFVBQVksYUFBYVcsUUFBUSxLQUFLRCxhQUFMLENBQW1CQyxJQUFuQixDQUFqQztBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQU5GO0FBVUU7QUFBQTtBQUFBLFVBQUssV0FBVSxpQkFBZjtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFLDJCQUFDLGtCQUFEO0FBQ0UsZ0JBQU0yQixJQURSO0FBRUUsdUJBQWFELFNBQVMsS0FBS0QsYUFBTCxDQUFtQkMsS0FBbkI7QUFGeEI7QUFGRjtBQVZGLEtBREY7QUFvQkQ7QUFsSGtDOztrQkFBaEJ2QyxlLEVBcUhyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXJJQSIsImZpbGUiOiJlZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuaW1wb3J0IEljb25zIGZyb20gJy4vaWNvbnMnO1xuaW1wb3J0IHtcbiAgRWRpdG9yVHlwZSxcbiAgRWRpdG9yT3JkZXIsXG4gIEVkaXRvck9wdGlvbnMsXG4gIEVkaXRvck5hbWUsXG4gIEVkaXRvclBhdGhzXG59IGZyb20gJy4uL2NvbXBvbmVudHMvZWRpdG9yJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja0FjdGlvbiAoYWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coYWN0aW9uLCB0aGlzLmVudHJ5KTtcblxuICAgIGlmIChhY3Rpb24gPT09ICdjcmVhdGUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLmVudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENoYW5nZVR5cGUgKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZUdyb3VwKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5lbnRyeSA9IHN0YXRlLmNyZWF0ZVByb2plY3QoKTtcbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRVUkkgKCkge1xuICAgIHJldHVybiAncHJvamVjdC12aWV3ZXItcGx1cy1lZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0VGl0bGUgKCkge1xuICAgIHJldHVybiAnUFZQIC0gRWRpdG9yJztcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChpZCkge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGVkaXRvcicsIGlkKTtcblxuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZW1pdHRlci5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlSWNvbkNsaWNrIChpY29uKSB7XG4gICAgY29uc29sZS5sb2coaWNvbik7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGlja05vICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGlkQ2xpY2tObycpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2xpY2tZZXMgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkaWRDbGlja1llcycsIHRoaXMuZW50cnkpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkQ2hhbmdlTmFtZSAodmFsdWUpIHtcbiAgICB0aGlzLmVudHJ5Lm5hbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5lbnRyeSk7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuZW50cnkgPyB0aGlzLmVudHJ5Lmljb24gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZW50cnkgPyB0aGlzLmVudHJ5Lm5hbWUgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3Qtdmlld2VyLXBsdXMtZWRpdG9yIHBhbmUtaXRlbSBuYXRpdmUta2V5LWJpbmRpbmdzXCI+XG4gICAgICAgIDxFZGl0b3JPcHRpb25zXG4gICAgICAgICAgcHJpc3RpbmU9eyF0aGlzLmVudHJ5fVxuICAgICAgICAgIG9uZGlkQ2xpY2s9e2FjdGlvbiA9PiB0aGlzLmRpZENsaWNrQWN0aW9uKGFjdGlvbil9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5kaWRDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5OYW1lPC9oMj5cbiAgICAgICAgICA8RWRpdG9yTmFtZVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIG9uRGlkQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmRpZENoYW5nZU5hbWUodmFsdWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vKlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPk9yZGVyPC9oMj5cbiAgICAgICAgICA8RWRpdG9yT3JkZXIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgICAgPEVkaXRvck5hbWVcbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICBvbkRpZENoYW5nZT17dmFsdWUgPT4gdGhpcy5kaWRDaGFuZ2VOYW1lKHZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgICAgPEljb25zIHNlbGVjdGVkPXtpY29ufSBvbkljb25DbGljaz17dGhpcy5oYW5kbGVJY29uQ2xpY2t9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgICA8RWRpdG9yUGF0aHMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICovXG4iXX0=