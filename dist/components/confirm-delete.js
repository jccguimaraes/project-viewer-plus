"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable-next-line require-jsdoc */
class ConfirmDelete {
  /* eslint-disable-next-line require-jsdoc */
  closePanel() {
    var panel = atom.workspace.getModalPanels().find(panel => panel.item === this);
    panel.destroy();
  }
  /* eslint-disable-next-line require-jsdoc */


  didDelete() {
    _state.default.deleteEntry(this.id);

    this.closePanel();
  }
  /* eslint-disable-next-line require-jsdoc */


  didCancel() {
    this.closePanel();
  }
  /**
   * @param {number} id - etch component properties
   */


  constructor(id) {
    this.id = id;
    this.entry = _state.default.getEntry(id);

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
      class: "inset-panel padded"
    }, _etch.default.dom("p", null, "Delete ", _etch.default.dom("strong", null, this.entry.name), "?"), _etch.default.dom("div", {
      class: "block"
    }, _etch.default.dom("button", {
      on: {
        click: this.didDelete
      },
      class: "btn btn-success inline-block-tight"
    }, "Confirm"), _etch.default.dom("button", {
      on: {
        click: this.didCancel
      },
      class: "btn btn-error inline-block-tight"
    }, "Cancel")));
  }

}

exports.default = ConfirmDelete;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2NvbmZpcm0tZGVsZXRlLmpzIl0sIm5hbWVzIjpbIkNvbmZpcm1EZWxldGUiLCJjbG9zZVBhbmVsIiwicGFuZWwiLCJhdG9tIiwid29ya3NwYWNlIiwiZ2V0TW9kYWxQYW5lbHMiLCJmaW5kIiwiaXRlbSIsImRlc3Ryb3kiLCJkaWREZWxldGUiLCJzdGF0ZSIsImRlbGV0ZUVudHJ5IiwiaWQiLCJkaWRDYW5jZWwiLCJjb25zdHJ1Y3RvciIsImVudHJ5IiwiZ2V0RW50cnkiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsInByb3BzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZW5kZXIiLCJuYW1lIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFFQTtBQUNlLE1BQU1BLGFBQU4sQ0FBb0I7QUFDakM7QUFDQUMsRUFBQUEsVUFBVSxHQUFJO0FBQ1osUUFBTUMsS0FBSyxHQUFHQyxJQUFJLENBQUNDLFNBQUwsQ0FDWEMsY0FEVyxHQUVYQyxJQUZXLENBRU5KLEtBQUssSUFBSUEsS0FBSyxDQUFDSyxJQUFOLEtBQWUsSUFGbEIsQ0FBZDtBQUdBTCxJQUFBQSxLQUFLLENBQUNNLE9BQU47QUFDRDtBQUVEOzs7QUFDQUMsRUFBQUEsU0FBUyxHQUFJO0FBQ1hDLG1CQUFNQyxXQUFOLENBQWtCLEtBQUtDLEVBQXZCOztBQUNBLFNBQUtYLFVBQUw7QUFDRDtBQUVEOzs7QUFDQVksRUFBQUEsU0FBUyxHQUFJO0FBQ1gsU0FBS1osVUFBTDtBQUNEO0FBRUQ7Ozs7O0FBR0FhLEVBQUFBLFdBQVcsQ0FBRUYsRUFBRixFQUFNO0FBQ2YsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0csS0FBTCxHQUFhTCxlQUFNTSxRQUFOLENBQWVKLEVBQWYsQ0FBYjs7QUFDQUssa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7O0FBS01DLEVBQUFBLE1BQU4sQ0FBY0MsS0FBZCxFQUFxQjtBQUFBOztBQUFBO0FBQ25CLFVBQUlBLEtBQUosRUFBVztBQUNULGVBQU9ILGNBQUtFLE1BQUwsQ0FBWSxLQUFaLENBQVA7QUFDRDs7QUFFRCxhQUFPRSxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUxtQjtBQU1wQjtBQUVEOzs7QUFDTWQsRUFBQUEsT0FBTixHQUFpQjtBQUFBOztBQUFBO0FBQ2YsWUFBTVMsY0FBS1QsT0FBTCxDQUFhLE1BQWIsQ0FBTjtBQURlO0FBRWhCO0FBRUQ7OztBQUNBZSxFQUFBQSxNQUFNLEdBQUk7QUFDUixXQUNFO0FBQUssTUFBQSxLQUFLLEVBQUM7QUFBWCxPQUNFLHdDQUNTLGtDQUFTLEtBQUtSLEtBQUwsQ0FBV1MsSUFBcEIsQ0FEVCxNQURGLEVBSUU7QUFBSyxNQUFBLEtBQUssRUFBQztBQUFYLE9BQ0U7QUFDRSxNQUFBLEVBQUUsRUFBRTtBQUNGQyxRQUFBQSxLQUFLLEVBQUUsS0FBS2hCO0FBRFYsT0FETjtBQUlFLE1BQUEsS0FBSyxFQUFDO0FBSlIsaUJBREYsRUFTRTtBQUNFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZnQixRQUFBQSxLQUFLLEVBQUUsS0FBS1o7QUFEVixPQUROO0FBSUUsTUFBQSxLQUFLLEVBQUM7QUFKUixnQkFURixDQUpGLENBREY7QUF5QkQ7O0FBMUVnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbmZpcm1EZWxldGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjbG9zZVBhbmVsICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGF0b20ud29ya3NwYWNlXG4gICAgICAuZ2V0TW9kYWxQYW5lbHMoKVxuICAgICAgLmZpbmQocGFuZWwgPT4gcGFuZWwuaXRlbSA9PT0gdGhpcyk7XG4gICAgcGFuZWwuZGVzdHJveSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGlkRGVsZXRlICgpIHtcbiAgICBzdGF0ZS5kZWxldGVFbnRyeSh0aGlzLmlkKTtcbiAgICB0aGlzLmNsb3NlUGFuZWwoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRpZENhbmNlbCAoKSB7XG4gICAgdGhpcy5jbG9zZVBhbmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuZW50cnkgPSBzdGF0ZS5nZXRFbnRyeShpZCk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhc3luYyBkZXN0cm95ICgpIHtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICByZW5kZXIgKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5zZXQtcGFuZWwgcGFkZGVkXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIERlbGV0ZSA8c3Ryb25nPnt0aGlzLmVudHJ5Lm5hbWV9PC9zdHJvbmc+P1xuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJibG9ja1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZERlbGV0ZVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGlubGluZS1ibG9jay10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ29uZmlybVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENhbmNlbFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1lcnJvciBpbmxpbmUtYmxvY2stdGlnaHRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==