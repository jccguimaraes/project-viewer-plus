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
  handleChangeIcon(icon) {
    console.log(icon);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeName(value) {
    this.entry.name = value;
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction(action) {
    console.log(action, this.entry);

    if (!this.id && action === 'save') {
      _state2.default.addEntry(this.entry);
    } else if (action === 'save') {
      _state2.default.editEntry(this.id, this.entry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeType(type) {
    switch (type) {
      case 'group':
        this.entry = _state2.default.createGroup();
        break;
      default:
        this.entry = _state2.default.createProject();
    }
    this.update(this.entry);
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

    this.id = id;
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
    this.entry = props;
    return _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const icon = this.entry ? this.entry.icon : undefined;
    const blocks = [];

    if (!this.entry) {
      blocks.push(_etch2.default.dom(
        _editor.EditorType,
        { onDidChange: type => this.handleChangeType(type) },
        _etch2.default.dom(
          'h2',
          null,
          'Type'
        )
      ));
    } else {
      blocks.push(_etch2.default.dom(
        _editor.EditorName,
        {
          entry: this.entry,
          onDidChange: value => this.handleChangeName(value)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Name'
        )
      ));
    }

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(_editor.EditorOptions, { ondidClick: action => this.handleChangeAction(action) }),
      blocks.map(block => block)
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
                                               onDidChange={value => this.handleChangeName(value)}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VJY29uIiwiaWNvbiIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVDaGFuZ2VOYW1lIiwidmFsdWUiLCJlbnRyeSIsIm5hbWUiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJpZCIsInN0YXRlIiwiYWRkRW50cnkiLCJlZGl0RW50cnkiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0QWN0aXZlUGFuZSIsImRlc3Ryb3lBY3RpdmVJdGVtIiwiaGFuZGxlQ2hhbmdlVHlwZSIsInR5cGUiLCJjcmVhdGVHcm91cCIsImNyZWF0ZVByb2plY3QiLCJ1cGRhdGUiLCJnZXRVUkkiLCJnZXRUaXRsZSIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJnZXRFbnRyeSIsImV0Y2giLCJpbml0aWFsaXplIiwicHJvcHMiLCJkZXN0cm95IiwiY2xlYXIiLCJkaXNwb3NlIiwicmVuZGVyIiwidW5kZWZpbmVkIiwiYmxvY2tzIiwicHVzaCIsIm1hcCIsImJsb2NrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQztBQUNBQyxtQkFBa0JDLElBQWxCLEVBQXdCO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRDs7QUFFRDtBQUNBRyxtQkFBa0JDLEtBQWxCLEVBQXlCO0FBQ3ZCLFNBQUtDLEtBQUwsQ0FBV0MsSUFBWCxHQUFrQkYsS0FBbEI7QUFDRDs7QUFFRDtBQUNBRyxxQkFBb0JDLE1BQXBCLEVBQTRCO0FBQzFCUCxZQUFRQyxHQUFSLENBQVlNLE1BQVosRUFBb0IsS0FBS0gsS0FBekI7O0FBRUEsUUFBSSxDQUFDLEtBQUtJLEVBQU4sSUFBWUQsV0FBVyxNQUEzQixFQUFtQztBQUNqQ0Usc0JBQU1DLFFBQU4sQ0FBZSxLQUFLTixLQUFwQjtBQUNELEtBRkQsTUFHSyxJQUFJRyxXQUFXLE1BQWYsRUFBdUI7QUFDMUJFLHNCQUFNRSxTQUFOLENBQWdCLEtBQUtILEVBQXJCLEVBQXlCLEtBQUtKLEtBQTlCO0FBQ0Q7O0FBRURRLFNBQUtDLFNBQUwsQ0FBZUMsYUFBZixHQUErQkMsaUJBQS9CO0FBQ0Q7O0FBRUQ7QUFDQUMsbUJBQWtCQyxJQUFsQixFQUF3QjtBQUN0QixZQUFRQSxJQUFSO0FBQ0UsV0FBSyxPQUFMO0FBQ0UsYUFBS2IsS0FBTCxHQUFhSyxnQkFBTVMsV0FBTixFQUFiO0FBQ0E7QUFDRjtBQUNFLGFBQUtkLEtBQUwsR0FBYUssZ0JBQU1VLGFBQU4sRUFBYjtBQUxKO0FBT0EsU0FBS0MsTUFBTCxDQUFZLEtBQUtoQixLQUFqQjtBQUNEOztBQUVEO0FBQ0FpQixXQUFVO0FBQ1IsV0FBTyw0QkFBUDtBQUNEOztBQUVEO0FBQ0FDLGFBQVk7QUFDVixXQUFPLGNBQVA7QUFDRDs7QUFFRDtBQUNBQyxjQUFhZixFQUFiLEVBQWlCO0FBQ2ZSLFlBQVFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4Qk8sRUFBOUI7O0FBRUEsU0FBS2dCLFdBQUwsR0FBbUIsSUFBSUMseUJBQUosRUFBbkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmOztBQUVBLFNBQUtuQixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLSixLQUFMLEdBQWFLLGdCQUFNbUIsUUFBTixDQUFlcEIsRUFBZixDQUFiO0FBQ0FSLFlBQVFDLEdBQVIsQ0FBWSxRQUFaLEVBQXNCTyxFQUF0QixFQUEwQixLQUFLSixLQUEvQjs7QUFFQXlCLG1CQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsUUFBTVYsTUFBTixDQUFjVyxLQUFkLEVBQXFCO0FBQ25CLFNBQUszQixLQUFMLEdBQWEyQixLQUFiO0FBQ0EsV0FBT0YsZUFBS1QsTUFBTCxDQUFZLElBQVosQ0FBUDtBQUNEOztBQUVEO0FBQ0EsUUFBTVksT0FBTixHQUFpQjtBQUNmLFNBQUtOLE9BQUwsQ0FBYU8sS0FBYjtBQUNBLFNBQUtQLE9BQUwsQ0FBYVEsT0FBYjtBQUNBLFNBQUtWLFdBQUwsQ0FBaUJVLE9BQWpCO0FBQ0EsVUFBTUwsZUFBS0csT0FBTCxDQUFhLElBQWIsQ0FBTjtBQUNEOztBQUVEO0FBQ0FHLFdBQVU7QUFDUixVQUFNcEMsT0FBTyxLQUFLSyxLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXTCxJQUF4QixHQUErQnFDLFNBQTVDO0FBQ0EsVUFBTUMsU0FBUyxFQUFmOztBQUVBLFFBQUksQ0FBQyxLQUFLakMsS0FBVixFQUFpQjtBQUNmaUMsYUFBT0MsSUFBUCxDQUNFO0FBQUMsMEJBQUQ7QUFBQSxVQUFZLGFBQWFyQixRQUFRLEtBQUtELGdCQUFMLENBQXNCQyxJQUF0QixDQUFqQztBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixPQURGO0FBS0QsS0FORCxNQU9LO0FBQ0hvQixhQUFPQyxJQUFQLENBQ0U7QUFBQywwQkFBRDtBQUFBO0FBQ0UsaUJBQU8sS0FBS2xDLEtBRGQ7QUFFRSx1QkFBYUQsU0FBUyxLQUFLRCxnQkFBTCxDQUFzQkMsS0FBdEI7QUFGeEI7QUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSkYsT0FERjtBQVFEOztBQUVELFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSwwREFBZjtBQUNFLHlCQUFDLHFCQUFELElBQWUsWUFBWUksVUFBVSxLQUFLRCxrQkFBTCxDQUF3QkMsTUFBeEIsQ0FBckMsR0FERjtBQUVHOEIsYUFBT0UsR0FBUCxDQUFXQyxTQUFTQSxLQUFwQjtBQUZILEtBREY7QUFNRDtBQTVHa0M7O2tCQUFoQjNDLGUsRUErR3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBL0hBIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCB7IEVtaXR0ZXIsIENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJztcbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG5pbXBvcnQgSWNvbnMgZnJvbSAnLi9pY29ucyc7XG5pbXBvcnQge1xuICBFZGl0b3JUeXBlLFxuICBFZGl0b3JPcmRlcixcbiAgRWRpdG9yT3B0aW9ucyxcbiAgRWRpdG9yTmFtZSxcbiAgRWRpdG9yUGF0aHNcbn0gZnJvbSAnLi4vY29tcG9uZW50cy9lZGl0b3InO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvckNvbnRhaW5lciB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICBjb25zb2xlLmxvZyhpY29uKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZU5hbWUgKHZhbHVlKSB7XG4gICAgdGhpcy5lbnRyeS5uYW1lID0gdmFsdWU7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgdGhpcy5lbnRyeSk7XG5cbiAgICBpZiAoIXRoaXMuaWQgJiYgYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmFkZEVudHJ5KHRoaXMuZW50cnkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChhY3Rpb24gPT09ICdzYXZlJykge1xuICAgICAgc3RhdGUuZWRpdEVudHJ5KHRoaXMuaWQsIHRoaXMuZW50cnkpO1xuICAgIH1cblxuICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlVHlwZSAodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmVudHJ5ID0gc3RhdGUuY3JlYXRlUHJvamVjdCgpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuICdwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdQVlAgLSBFZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yJywgaWQpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLmVudHJ5ID0gc3RhdGUuZ2V0RW50cnkoaWQpO1xuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHRoaXMuZW50cnkgPSBwcm9wcztcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMuZW50cnkgPyB0aGlzLmVudHJ5Lmljb24gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgYmxvY2tzID0gW107XG5cbiAgICBpZiAoIXRoaXMuZW50cnkpIHtcbiAgICAgIGJsb2Nrcy5wdXNoKFxuICAgICAgICA8RWRpdG9yVHlwZSBvbkRpZENoYW5nZT17dHlwZSA9PiB0aGlzLmhhbmRsZUNoYW5nZVR5cGUodHlwZSl9PlxuICAgICAgICAgIDxoMj5UeXBlPC9oMj5cbiAgICAgICAgPC9FZGl0b3JUeXBlPlxuICAgICAgKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvck5hbWVcbiAgICAgICAgICBlbnRyeT17dGhpcy5lbnRyeX1cbiAgICAgICAgICBvbkRpZENoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VOYW1lKHZhbHVlKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxoMj5OYW1lPC9oMj5cbiAgICAgICAgPC9FZGl0b3JOYW1lPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9ucyBvbmRpZENsaWNrPXthY3Rpb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VBY3Rpb24oYWN0aW9uKX0gLz5cbiAgICAgICAge2Jsb2Nrcy5tYXAoYmxvY2sgPT4gYmxvY2spfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG4vKlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPk9yZGVyPC9oMj5cbiAgICAgICAgICA8RWRpdG9yT3JkZXIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAgICA8aDI+TmFtZTwvaDI+XG4gICAgICAgICAgPEVkaXRvck5hbWVcbiAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICBvbkRpZENoYW5nZT17dmFsdWUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VOYW1lKHZhbHVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJsb2NrLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxoMj5JY29uczwvaDI+XG4gICAgICAgICAgPEljb25zIHNlbGVjdGVkPXtpY29ufSBvbkljb25DbGljaz17dGhpcy5oYW5kbGVJY29uQ2xpY2t9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgICA8RWRpdG9yUGF0aHMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICovXG4iXX0=