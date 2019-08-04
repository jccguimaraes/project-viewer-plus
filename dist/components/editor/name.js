"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class EditorName {
  /* eslint-disable-next-line require-jsdoc */
  constructor(props, children) {
    console.log('created editor-name component', props);
    this.name = props.entry.name || '';
    this.type = props.entry.type || '...';
    this.children = children;
    this.onDidChange = props.onDidChange;

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      console.log('updated editor-name component', _this, props);

      if (props) {
        _this.name = props.entry.name || '';
        _this.type = props.entry.type || '...';
        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      console.log('destroyed editor-name component', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
    console.log('rendered editor-name component', this);
    return _etch.default.dom("div", {
      className: "block-container"
    }, this.children.map(child => child), _etch.default.dom("input", {
      className: "input-text",
      type: "text",
      placeholder: 'Name of ' + this.type + '...',
      value: this.name,
      on: {
        keyup: event => this.onDidChange(event.target.value)
      }
    }));
  }

}

exports.default = EditorName;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2hpbGRyZW4iLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImVudHJ5IiwidHlwZSIsIm9uRGlkQ2hhbmdlIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImtleXVwIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBO0FBQ2UsTUFBTUEsVUFBTixDQUFpQjtBQUM5QjtBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBU0MsUUFBVCxFQUFtQjtBQUM1QkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkNILEtBQTdDO0FBRUEsU0FBS0ksSUFBTCxHQUFZSixLQUFLLENBQUNLLEtBQU4sQ0FBWUQsSUFBWixJQUFvQixFQUFoQztBQUNBLFNBQUtFLElBQUwsR0FBWU4sS0FBSyxDQUFDSyxLQUFOLENBQVlDLElBQVosSUFBb0IsS0FBaEM7QUFDQSxTQUFLTCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtNLFdBQUwsR0FBbUJQLEtBQUssQ0FBQ08sV0FBekI7O0FBRUFDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtNQyxFQUFBQSxNQUFOLENBQWNWLEtBQWQsRUFBcUI7QUFBQTs7QUFBQTtBQUNuQkUsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksK0JBQVosRUFBNkMsS0FBN0MsRUFBbURILEtBQW5EOztBQUVBLFVBQUlBLEtBQUosRUFBVztBQUNULFFBQUEsS0FBSSxDQUFDSSxJQUFMLEdBQVlKLEtBQUssQ0FBQ0ssS0FBTixDQUFZRCxJQUFaLElBQW9CLEVBQWhDO0FBQ0EsUUFBQSxLQUFJLENBQUNFLElBQUwsR0FBWU4sS0FBSyxDQUFDSyxLQUFOLENBQVlDLElBQVosSUFBb0IsS0FBaEM7QUFDQSxlQUFPRSxjQUFLRSxNQUFMLENBQVksS0FBWixDQUFQO0FBQ0Q7O0FBRUQsYUFBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFUbUI7QUFVcEI7QUFFRDs7O0FBQ01DLEVBQUFBLE9BQU4sR0FBaUI7QUFBQTs7QUFBQTtBQUNmWCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQyxNQUEvQztBQUNBLFlBQU1LLGNBQUtLLE9BQUwsQ0FBYSxNQUFiLENBQU47QUFGZTtBQUdoQjtBQUVEOzs7QUFDQUMsRUFBQUEsTUFBTSxHQUFJO0FBQ1JaLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFaLEVBQThDLElBQTlDO0FBRUEsV0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRyxLQUFLRixRQUFMLENBQWNjLEdBQWQsQ0FBa0JDLEtBQUssSUFBSUEsS0FBM0IsQ0FESCxFQUVFO0FBQ0UsTUFBQSxTQUFTLEVBQUMsWUFEWjtBQUVFLE1BQUEsSUFBSSxFQUFDLE1BRlA7QUFHRSxNQUFBLFdBQVcsRUFBRSxhQUFhLEtBQUtWLElBQWxCLEdBQXlCLEtBSHhDO0FBSUUsTUFBQSxLQUFLLEVBQUUsS0FBS0YsSUFKZDtBQUtFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZhLFFBQUFBLEtBQUssRUFBRUMsS0FBSyxJQUFJLEtBQUtYLFdBQUwsQ0FBaUJXLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxLQUE5QjtBQURkO0FBTE4sTUFGRixDQURGO0FBY0Q7O0FBdEQ2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yTmFtZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcywgY2hpbGRyZW4pIHtcbiAgICBjb25zb2xlLmxvZygnY3JlYXRlZCBlZGl0b3ItbmFtZSBjb21wb25lbnQnLCBwcm9wcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5lbnRyeS5uYW1lIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHByb3BzLmVudHJ5LnR5cGUgfHwgJy4uLic7XG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgIHRoaXMub25EaWRDaGFuZ2UgPSBwcm9wcy5vbkRpZENoYW5nZTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZWRpdG9yLW5hbWUgY29tcG9uZW50JywgdGhpcywgcHJvcHMpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLm5hbWUgPSBwcm9wcy5lbnRyeS5uYW1lIHx8ICcnO1xuICAgICAgdGhpcy50eXBlID0gcHJvcHMuZW50cnkudHlwZSB8fCAnLi4uJztcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBjb25zb2xlLmxvZygnZGVzdHJveWVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGVkaXRvci1uYW1lIGNvbXBvbmVudCcsIHRoaXMpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXRleHRcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17J05hbWUgb2YgJyArIHRoaXMudHlwZSArICcuLi4nfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLm5hbWV9XG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLm9uRGlkQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19