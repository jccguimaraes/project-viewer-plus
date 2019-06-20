'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var _editor = require('../components/editor');

var _confirmDelete = require('../components/confirm-delete');

var _confirmDelete2 = _interopRequireDefault(_confirmDelete);

var _state = require('../services/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class EditorContainer {
  /* eslint-disable-next-line require-jsdoc */
  handleChangeAction(action) {
    console.log(action, this.entry);

    if (action === 'delete') {
      const item = new _confirmDelete2.default(this.id);
      const modal = atom.workspace.addModalPanel({ item });

      modal.onDidDestroy(() => !_state2.default.getEntry(this.id) && atom.workspace.getActivePane().destroyActiveItem());

      return;
    } else if (!this.id && action === 'save') {
      _state2.default.addEntry(this.newEntry);
    } else if (action === 'save') {
      _state2.default.editEntry(this.id, this.newEntry);
    }

    atom.workspace.getActivePane().destroyActiveItem();
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeName(name) {
    this.update(_extends({}, this.newEntry, {
      name
    }));
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeType(type) {
    let createdEntry;

    switch (type) {
      case 'group':
        createdEntry = _state2.default.createGroup();
        break;
      default:
        createdEntry = _state2.default.createProject();
    }

    this.update(createdEntry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleChangeIcon(icon) {
    this.update(_extends({}, this.newEntry, {
      icon
    }));
  }

  /* eslint-disable-next-line require-jsdoc */
  handleAddPaths(paths) {
    paths.forEach(path => {
      if (this.newEntry.paths.indexOf(path) === -1) {
        this.newEntry.paths.push(path);
      }
    });
    this.update(this.newEntry);
  }

  /* eslint-disable-next-line require-jsdoc */
  handleRemovePath(path) {
    const id = this.newEntry.paths.indexOf(path);

    if (id !== -1) {
      this.newEntry.paths.splice(id, 1);
    }

    this.update(this.newEntry);
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

    this.actions = [];
    this.id = id;
    const entry = _state2.default.getEntry(id);

    if (entry) {
      this.actions = ['delete'];
      this.entry = _extends({}, entry);
      this.newEntry = _extends({}, entry);
    }

    console.log('editor', id, this.entry);

    _etch2.default.initialize(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async update(props) {
    this.actions = [];

    if (this.id) {
      this.actions.push('delete');
    }

    if (JSON.stringify(this.entry) === JSON.stringify(props)) {
      const id = this.actions.indexOf('save');
      id !== -1 && this.actions.splice(id, 1);
    } else {
      this.actions.push('save');
    }

    this.newEntry = props;

    return _etch2.default.update(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  async destroy() {
    delete this.id;
    delete this.entry;
    this.emitter.clear();
    this.emitter.dispose();
    this.disposables.dispose();
    await _etch2.default.destroy(this);
  }

  /* eslint-disable-next-line require-jsdoc */
  render() {
    const blocks = [];
    const entry = this.newEntry || this.entry;

    if (!entry) {
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
          entry: entry,
          onDidChange: value => this.handleChangeName(value)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Name'
        )
      ), _etch2.default.dom(
        _icons2.default,
        {
          entry: entry,
          onDidChange: icon => this.handleChangeIcon(icon)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Icons'
        )
      ));
    }

    if (entry && entry.type === 'project') {
      blocks.push(_etch2.default.dom(
        _editor.EditorPaths,
        {
          entry: entry,
          onDidAddPaths: paths => this.handleAddPaths(paths),
          onDidRemovePath: path => this.handleRemovePath(path)
        },
        _etch2.default.dom(
          'h2',
          null,
          'Paths'
        )
      ));
    } else if (this.entry && entry.type === 'group') {
      blocks.push(_etch2.default.dom(
        _editor.EditorOrder,
        null,
        _etch2.default.dom(
          'h2',
          null,
          'Order'
        )
      ));
    }

    return _etch2.default.dom(
      'div',
      { className: 'project-viewer-plus-editor pane-item native-key-bindings' },
      _etch2.default.dom(_editor.EditorOptions, {
        allowedActions: this.actions,
        ondidClick: action => this.handleChangeAction(action)
      }),
      blocks.map(block => block)
    );
  }
}
exports.default = EditorContainer;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL2VkaXRvci5qcyJdLCJuYW1lcyI6WyJFZGl0b3JDb250YWluZXIiLCJoYW5kbGVDaGFuZ2VBY3Rpb24iLCJhY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiZW50cnkiLCJpdGVtIiwiQ29uZmlybURlbGV0ZSIsImlkIiwibW9kYWwiLCJhdG9tIiwid29ya3NwYWNlIiwiYWRkTW9kYWxQYW5lbCIsIm9uRGlkRGVzdHJveSIsInN0YXRlIiwiZ2V0RW50cnkiLCJnZXRBY3RpdmVQYW5lIiwiZGVzdHJveUFjdGl2ZUl0ZW0iLCJhZGRFbnRyeSIsIm5ld0VudHJ5IiwiZWRpdEVudHJ5IiwiaGFuZGxlQ2hhbmdlTmFtZSIsIm5hbWUiLCJ1cGRhdGUiLCJoYW5kbGVDaGFuZ2VUeXBlIiwidHlwZSIsImNyZWF0ZWRFbnRyeSIsImNyZWF0ZUdyb3VwIiwiY3JlYXRlUHJvamVjdCIsImhhbmRsZUNoYW5nZUljb24iLCJpY29uIiwiaGFuZGxlQWRkUGF0aHMiLCJwYXRocyIsImZvckVhY2giLCJwYXRoIiwiaW5kZXhPZiIsInB1c2giLCJoYW5kbGVSZW1vdmVQYXRoIiwic3BsaWNlIiwiZ2V0VVJJIiwiZ2V0VGl0bGUiLCJjb25zdHJ1Y3RvciIsImRpc3Bvc2FibGVzIiwiQ29tcG9zaXRlRGlzcG9zYWJsZSIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiYWN0aW9ucyIsImV0Y2giLCJpbml0aWFsaXplIiwicHJvcHMiLCJKU09OIiwic3RyaW5naWZ5IiwiZGVzdHJveSIsImNsZWFyIiwiZGlzcG9zZSIsInJlbmRlciIsImJsb2NrcyIsInZhbHVlIiwibWFwIiwiYmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7OztrUUFBQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7O0FBT0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxlQUFOLENBQXNCO0FBQ25DO0FBQ0FDLHFCQUFvQkMsTUFBcEIsRUFBNEI7QUFDMUJDLFlBQVFDLEdBQVIsQ0FB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S0FBS1UsT0FEdkI7QUFFRSxvQkFBWTVDLFVBQVUsS0FBS0Qsa0JBQUwsQ0FBd0JDLE1BQXhCO0FBRnhCLFFBREY7QUFLR3NELGFBQU9FLEdBQVAsQ0FBV0MsU0FBU0EsS0FBcEI7QUFMSCxLQURGO0FBU0Q7QUF2TWtDO2tCQUFoQjNELGUiLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBJY29ucyBmcm9tICcuL2ljb25zJztcbmltcG9ydCB7XG4gIEVkaXRvclR5cGUsXG4gIEVkaXRvck9yZGVyLFxuICBFZGl0b3JPcHRpb25zLFxuICBFZGl0b3JOYW1lLFxuICBFZGl0b3JQYXRoc1xufSBmcm9tICcuLi9jb21wb25lbnRzL2VkaXRvcic7XG5pbXBvcnQgQ29uZmlybURlbGV0ZSBmcm9tICcuLi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlJztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JDb250YWluZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBoYW5kbGVDaGFuZ2VBY3Rpb24gKGFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbiwgdGhpcy5lbnRyeSk7XG5cbiAgICBpZiAoYWN0aW9uID09PSAnZGVsZXRlJykge1xuICAgICAgY29uc3QgaXRlbSA9IG5ldyBDb25maXJtRGVsZXRlKHRoaXMuaWQpO1xuICAgICAgY29uc3QgbW9kYWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbSB9KTtcblxuICAgICAgbW9kYWwub25EaWREZXN0cm95KFxuICAgICAgICAoKSA9PlxuICAgICAgICAgICFzdGF0ZS5nZXRFbnRyeSh0aGlzLmlkKSAmJlxuICAgICAgICAgIGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVBhbmUoKS5kZXN0cm95QWN0aXZlSXRlbSgpXG4gICAgICApO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKCF0aGlzLmlkICYmIGFjdGlvbiA9PT0gJ3NhdmUnKSB7XG4gICAgICBzdGF0ZS5hZGRFbnRyeSh0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYWN0aW9uID09PSAnc2F2ZScpIHtcbiAgICAgIHN0YXRlLmVkaXRFbnRyeSh0aGlzLmlkLCB0aGlzLm5ld0VudHJ5KTtcbiAgICB9XG5cbiAgICBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKCkuZGVzdHJveUFjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZU5hbWUgKG5hbWUpIHtcbiAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAuLi50aGlzLm5ld0VudHJ5LFxuICAgICAgbmFtZVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQ2hhbmdlVHlwZSAodHlwZSkge1xuICAgIGxldCBjcmVhdGVkRW50cnk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgY3JlYXRlZEVudHJ5ID0gc3RhdGUuY3JlYXRlR3JvdXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjcmVhdGVkRW50cnkgPSBzdGF0ZS5jcmVhdGVQcm9qZWN0KCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUoY3JlYXRlZEVudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZUNoYW5nZUljb24gKGljb24pIHtcbiAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAuLi50aGlzLm5ld0VudHJ5LFxuICAgICAgaWNvblxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaGFuZGxlQWRkUGF0aHMgKHBhdGhzKSB7XG4gICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgIGlmICh0aGlzLm5ld0VudHJ5LnBhdGhzLmluZGV4T2YocGF0aCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMubmV3RW50cnkucGF0aHMucHVzaChwYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLm5ld0VudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGhhbmRsZVJlbW92ZVBhdGggKHBhdGgpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMubmV3RW50cnkucGF0aHMuaW5kZXhPZihwYXRoKTtcblxuICAgIGlmIChpZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMubmV3RW50cnkucGF0aHMuc3BsaWNlKGlkLCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZSh0aGlzLm5ld0VudHJ5KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuICdwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvcic7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuICdQVlAgLSBFZGl0b3InO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZWRpdG9yJywgaWQpO1xuXG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcblxuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICBjb25zdCBlbnRyeSA9IHN0YXRlLmdldEVudHJ5KGlkKTtcblxuICAgIGlmIChlbnRyeSkge1xuICAgICAgdGhpcy5hY3Rpb25zID0gWydkZWxldGUnXTtcbiAgICAgIHRoaXMuZW50cnkgPSB7IC4uLmVudHJ5IH07XG4gICAgICB0aGlzLm5ld0VudHJ5ID0geyAuLi5lbnRyeSB9O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdlZGl0b3InLCBpZCwgdGhpcy5lbnRyeSk7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gW107XG5cbiAgICBpZiAodGhpcy5pZCkge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ2RlbGV0ZScpO1xuICAgIH1cblxuICAgIGlmIChKU09OLnN0cmluZ2lmeSh0aGlzLmVudHJ5KSA9PT0gSlNPTi5zdHJpbmdpZnkocHJvcHMpKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuYWN0aW9ucy5pbmRleE9mKCdzYXZlJyk7XG4gICAgICBpZCAhPT0gLTEgJiYgdGhpcy5hY3Rpb25zLnNwbGljZShpZCwgMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3Rpb25zLnB1c2goJ3NhdmUnKTtcbiAgICB9XG5cbiAgICB0aGlzLm5ld0VudHJ5ID0gcHJvcHM7XG5cbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5pZDtcbiAgICBkZWxldGUgdGhpcy5lbnRyeTtcbiAgICB0aGlzLmVtaXR0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgYmxvY2tzID0gW107XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm5ld0VudHJ5IHx8IHRoaXMuZW50cnk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBibG9ja3MucHVzaChcbiAgICAgICAgPEVkaXRvclR5cGUgb25EaWRDaGFuZ2U9e3R5cGUgPT4gdGhpcy5oYW5kbGVDaGFuZ2VUeXBlKHR5cGUpfT5cbiAgICAgICAgICA8aDI+VHlwZTwvaDI+XG4gICAgICAgIDwvRWRpdG9yVHlwZT5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JOYW1lXG4gICAgICAgICAgZW50cnk9e2VudHJ5fVxuICAgICAgICAgIG9uRGlkQ2hhbmdlPXt2YWx1ZSA9PiB0aGlzLmhhbmRsZUNoYW5nZU5hbWUodmFsdWUpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPk5hbWU8L2gyPlxuICAgICAgICA8L0VkaXRvck5hbWU+LFxuICAgICAgICA8SWNvbnNcbiAgICAgICAgICBlbnRyeT17ZW50cnl9XG4gICAgICAgICAgb25EaWRDaGFuZ2U9e2ljb24gPT4gdGhpcy5oYW5kbGVDaGFuZ2VJY29uKGljb24pfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPkljb25zPC9oMj5cbiAgICAgICAgPC9JY29ucz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JQYXRoc1xuICAgICAgICAgIGVudHJ5PXtlbnRyeX1cbiAgICAgICAgICBvbkRpZEFkZFBhdGhzPXtwYXRocyA9PiB0aGlzLmhhbmRsZUFkZFBhdGhzKHBhdGhzKX1cbiAgICAgICAgICBvbkRpZFJlbW92ZVBhdGg9e3BhdGggPT4gdGhpcy5oYW5kbGVSZW1vdmVQYXRoKHBhdGgpfVxuICAgICAgICA+XG4gICAgICAgICAgPGgyPlBhdGhzPC9oMj5cbiAgICAgICAgPC9FZGl0b3JQYXRocz5cbiAgICAgICk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuZW50cnkgJiYgZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgYmxvY2tzLnB1c2goXG4gICAgICAgIDxFZGl0b3JPcmRlcj5cbiAgICAgICAgICA8aDI+T3JkZXI8L2gyPlxuICAgICAgICA8L0VkaXRvck9yZGVyPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9qZWN0LXZpZXdlci1wbHVzLWVkaXRvciBwYW5lLWl0ZW0gbmF0aXZlLWtleS1iaW5kaW5nc1wiPlxuICAgICAgICA8RWRpdG9yT3B0aW9uc1xuICAgICAgICAgIGFsbG93ZWRBY3Rpb25zPXt0aGlzLmFjdGlvbnN9XG4gICAgICAgICAgb25kaWRDbGljaz17YWN0aW9uID0+IHRoaXMuaGFuZGxlQ2hhbmdlQWN0aW9uKGFjdGlvbil9XG4gICAgICAgIC8+XG4gICAgICAgIHtibG9ja3MubWFwKGJsb2NrID0+IGJsb2NrKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==