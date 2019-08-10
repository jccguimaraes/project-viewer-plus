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
      yield _etch.default.destroy(_this2);
    })();
  }
  /* eslint-disable-next-line require-jsdoc */


  render() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2hpbGRyZW4iLCJuYW1lIiwiZW50cnkiLCJ0eXBlIiwib25EaWRDaGFuZ2UiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIiwia2V5dXAiLCJldmVudCIsInRhcmdldCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxVQUFOLENBQWlCO0FBQzlCO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTQyxRQUFULEVBQW1CO0FBQzVCLFNBQUtDLElBQUwsR0FBWUYsS0FBSyxDQUFDRyxLQUFOLENBQVlELElBQVosSUFBb0IsRUFBaEM7QUFDQSxTQUFLRSxJQUFMLEdBQVlKLEtBQUssQ0FBQ0csS0FBTixDQUFZQyxJQUFaLElBQW9CLEtBQWhDO0FBQ0EsU0FBS0gsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLSSxXQUFMLEdBQW1CTCxLQUFLLENBQUNLLFdBQXpCOztBQUVBQyxrQkFBS0MsVUFBTCxDQUFnQixJQUFoQjtBQUNEO0FBRUQ7Ozs7Ozs7QUFLTUMsRUFBQUEsTUFBTixDQUFjUixLQUFkLEVBQXFCO0FBQUE7O0FBQUE7QUFDbkIsVUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBQSxLQUFJLENBQUNFLElBQUwsR0FBWUYsS0FBSyxDQUFDRyxLQUFOLENBQVlELElBQVosSUFBb0IsRUFBaEM7QUFDQSxRQUFBLEtBQUksQ0FBQ0UsSUFBTCxHQUFZSixLQUFLLENBQUNHLEtBQU4sQ0FBWUMsSUFBWixJQUFvQixLQUFoQztBQUNBLGVBQU9FLGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQVBtQjtBQVFwQjtBQUVEOzs7QUFDTUMsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTUwsY0FBS0ssT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7OztBQUNBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHLEtBQUtYLFFBQUwsQ0FBY1ksR0FBZCxDQUFrQkMsS0FBSyxJQUFJQSxLQUEzQixDQURILEVBRUU7QUFDRSxNQUFBLFNBQVMsRUFBQyxZQURaO0FBRUUsTUFBQSxJQUFJLEVBQUMsTUFGUDtBQUdFLE1BQUEsV0FBVyxFQUFFLGFBQWEsS0FBS1YsSUFBbEIsR0FBeUIsS0FIeEM7QUFJRSxNQUFBLEtBQUssRUFBRSxLQUFLRixJQUpkO0FBS0UsTUFBQSxFQUFFLEVBQUU7QUFDRmEsUUFBQUEsS0FBSyxFQUFFQyxLQUFLLElBQUksS0FBS1gsV0FBTCxDQUFpQlcsS0FBSyxDQUFDQyxNQUFOLENBQWFDLEtBQTlCO0FBRGQ7QUFMTixNQUZGLENBREY7QUFjRDs7QUEvQzZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3JOYW1lIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzLCBjaGlsZHJlbikge1xuICAgIHRoaXMubmFtZSA9IHByb3BzLmVudHJ5Lm5hbWUgfHwgJyc7XG4gICAgdGhpcy50eXBlID0gcHJvcHMuZW50cnkudHlwZSB8fCAnLi4uJztcbiAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMubmFtZSA9IHByb3BzLmVudHJ5Lm5hbWUgfHwgJyc7XG4gICAgICB0aGlzLnR5cGUgPSBwcm9wcy5lbnRyeS50eXBlIHx8ICcuLi4nO1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0LXRleHRcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17J05hbWUgb2YgJyArIHRoaXMudHlwZSArICcuLi4nfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLm5hbWV9XG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGtleXVwOiBldmVudCA9PiB0aGlzLm9uRGlkQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19