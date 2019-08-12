"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

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


  async update(props) {
    if (props) {
      this.name = props.entry.name || '';
      this.type = props.entry.type || '...';
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /* eslint-disable-next-line require-jsdoc */


  async destroy() {
    await _etch.default.destroy(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci9uYW1lLmpzIl0sIm5hbWVzIjpbIkVkaXRvck5hbWUiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY2hpbGRyZW4iLCJuYW1lIiwiZW50cnkiLCJ0eXBlIiwib25EaWRDaGFuZ2UiLCJldGNoIiwiaW5pdGlhbGl6ZSIsInVwZGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsIm1hcCIsImNoaWxkIiwia2V5dXAiLCJldmVudCIsInRhcmdldCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTs7QUFJQTtBQUNlLE1BQU1BLFVBQU4sQ0FBaUI7QUFDOUI7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVNDLFFBQVQsRUFBbUI7QUFDNUIsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNHLEtBQU4sQ0FBWUQsSUFBWixJQUFvQixFQUFoQztBQUNBLFNBQUtFLElBQUwsR0FBWUosS0FBSyxDQUFDRyxLQUFOLENBQVlDLElBQVosSUFBb0IsS0FBaEM7QUFDQSxTQUFLSCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtJLFdBQUwsR0FBbUJMLEtBQUssQ0FBQ0ssV0FBekI7O0FBRUFDLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBLFFBQU1DLE1BQU4sQ0FBY1IsS0FBZCxFQUFxQjtBQUNuQixRQUFJQSxLQUFKLEVBQVc7QUFDVCxXQUFLRSxJQUFMLEdBQVlGLEtBQUssQ0FBQ0csS0FBTixDQUFZRCxJQUFaLElBQW9CLEVBQWhDO0FBQ0EsV0FBS0UsSUFBTCxHQUFZSixLQUFLLENBQUNHLEtBQU4sQ0FBWUMsSUFBWixJQUFvQixLQUFoQztBQUNBLGFBQU9FLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS1gsUUFBTCxDQUFjWSxHQUFkLENBQWtCQyxLQUFLLElBQUlBLEtBQTNCLENBREgsRUFFRTtBQUNFLE1BQUEsU0FBUyxFQUFDLFlBRFo7QUFFRSxNQUFBLElBQUksRUFBQyxNQUZQO0FBR0UsTUFBQSxXQUFXLEVBQUUsYUFBYSxLQUFLVixJQUFsQixHQUF5QixLQUh4QztBQUlFLE1BQUEsS0FBSyxFQUFFLEtBQUtGLElBSmQ7QUFLRSxNQUFBLEVBQUUsRUFBRTtBQUNGYSxRQUFBQSxLQUFLLEVBQUVDLEtBQUssSUFBSSxLQUFLWCxXQUFMLENBQWlCVyxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBOUI7QUFEZDtBQUxOLE1BRkYsQ0FERjtBQWNEOztBQS9DNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvck5hbWUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5uYW1lID0gcHJvcHMuZW50cnkubmFtZSB8fCAnJztcbiAgICB0aGlzLnR5cGUgPSBwcm9wcy5lbnRyeS50eXBlIHx8ICcuLi4nO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB0aGlzLm9uRGlkQ2hhbmdlID0gcHJvcHMub25EaWRDaGFuZ2U7XG5cbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy5uYW1lID0gcHJvcHMuZW50cnkubmFtZSB8fCAnJztcbiAgICAgIHRoaXMudHlwZSA9IHByb3BzLmVudHJ5LnR5cGUgfHwgJy4uLic7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jay1jb250YWluZXJcIj5cbiAgICAgICAge3RoaXMuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkKX1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXQtdGV4dFwiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPXsnTmFtZSBvZiAnICsgdGhpcy50eXBlICsgJy4uLid9XG4gICAgICAgICAgdmFsdWU9e3RoaXMubmFtZX1cbiAgICAgICAgICBvbj17e1xuICAgICAgICAgICAga2V5dXA6IGV2ZW50ID0+IHRoaXMub25EaWRDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=