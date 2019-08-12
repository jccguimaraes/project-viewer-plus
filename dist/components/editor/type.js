"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/* eslint-disable-next-line require-jsdoc */
class EditorType {
  /* eslint-disable-next-line require-jsdoc */
  didClick(evt) {
    const type = evt.target.closest('label').textContent.toLowerCase();
    this.onDidChange(type);
  }
  /* eslint-disable-next-line require-jsdoc */


  constructor(props, children) {
    this.onDidChange = props.onDidChange;
    this.children = children;

    _etch.default.initialize(this);
  }
  /**
   *
   * @param {Object} [props] etch component properties
   * @returns {Object} description
   */


  async update(props) {
    if (props) {
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
    }, this.children.map(child => child), _etch.default.dom("label", {
      class: "input-label"
    }, _etch.default.dom("input", {
      class: "input-radio",
      type: "radio",
      name: "type",
      on: {
        click: evt => this.didClick(evt)
      }
    }), "Group"), _etch.default.dom("label", {
      class: "input-label"
    }, _etch.default.dom("input", {
      class: "input-radio",
      type: "radio",
      name: "type",
      on: {
        click: evt => this.didClick(evt)
      }
    }), "Project"));
  }

}

exports.default = EditorType;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21wb25lbnRzL2VkaXRvci90eXBlLmpzIl0sIm5hbWVzIjpbIkVkaXRvclR5cGUiLCJkaWRDbGljayIsImV2dCIsInR5cGUiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGV4dENvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsIm9uRGlkQ2hhbmdlIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNoaWxkcmVuIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJtYXAiLCJjaGlsZCIsImNsaWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7Ozs7QUFGQTs7QUFJQTtBQUNlLE1BQU1BLFVBQU4sQ0FBaUI7QUFDOUI7QUFDQUMsRUFBQUEsUUFBUSxDQUFFQyxHQUFGLEVBQU87QUFDYixVQUFNQyxJQUFJLEdBQUdELEdBQUcsQ0FBQ0UsTUFBSixDQUFXQyxPQUFYLENBQW1CLE9BQW5CLEVBQTRCQyxXQUE1QixDQUF3Q0MsV0FBeEMsRUFBYjtBQUNBLFNBQUtDLFdBQUwsQ0FBaUJMLElBQWpCO0FBQ0Q7QUFFRDs7O0FBQ0FNLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTQyxRQUFULEVBQW1CO0FBQzVCLFNBQUtILFdBQUwsR0FBbUJFLEtBQUssQ0FBQ0YsV0FBekI7QUFDQSxTQUFLRyxRQUFMLEdBQWdCQSxRQUFoQjs7QUFDQUMsa0JBQUtDLFVBQUwsQ0FBZ0IsSUFBaEI7QUFDRDtBQUVEOzs7Ozs7O0FBS0EsUUFBTUMsTUFBTixDQUFjSixLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9FLGNBQUtFLE1BQUwsQ0FBWSxJQUFaLENBQVA7QUFDRDs7QUFFRCxXQUFPQyxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNEO0FBRUQ7OztBQUNBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7O0FBQ0FDLEVBQUFBLE1BQU0sR0FBSTtBQUNSLFdBQ0U7QUFBSyxNQUFBLFNBQVMsRUFBQztBQUFmLE9BQ0csS0FBS1AsUUFBTCxDQUFjUSxHQUFkLENBQWtCQyxLQUFLLElBQUlBLEtBQTNCLENBREgsRUFFRTtBQUFPLE1BQUEsS0FBSyxFQUFDO0FBQWIsT0FDRTtBQUNFLE1BQUEsS0FBSyxFQUFDLGFBRFI7QUFFRSxNQUFBLElBQUksRUFBQyxPQUZQO0FBR0UsTUFBQSxJQUFJLEVBQUMsTUFIUDtBQUlFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZDLFFBQUFBLEtBQUssRUFBRW5CLEdBQUcsSUFBSSxLQUFLRCxRQUFMLENBQWNDLEdBQWQ7QUFEWjtBQUpOLE1BREYsVUFGRixFQWFFO0FBQU8sTUFBQSxLQUFLLEVBQUM7QUFBYixPQUNFO0FBQ0UsTUFBQSxLQUFLLEVBQUMsYUFEUjtBQUVFLE1BQUEsSUFBSSxFQUFDLE9BRlA7QUFHRSxNQUFBLElBQUksRUFBQyxNQUhQO0FBSUUsTUFBQSxFQUFFLEVBQUU7QUFDRm1CLFFBQUFBLEtBQUssRUFBRW5CLEdBQUcsSUFBSSxLQUFLRCxRQUFMLENBQWNDLEdBQWQ7QUFEWjtBQUpOLE1BREYsWUFiRixDQURGO0FBMkJEOztBQTdENkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvclR5cGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkaWRDbGljayAoZXZ0KSB7XG4gICAgY29uc3QgdHlwZSA9IGV2dC50YXJnZXQuY2xvc2VzdCgnbGFiZWwnKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMub25EaWRDaGFuZ2UodHlwZSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdGhpcy5vbkRpZENoYW5nZSA9IHByb3BzLm9uRGlkQ2hhbmdlO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgcmV0dXJuIGV0Y2gudXBkYXRlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmxvY2stY29udGFpbmVyXCI+XG4gICAgICAgIHt0aGlzLmNoaWxkcmVuLm1hcChjaGlsZCA9PiBjaGlsZCl9XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImlucHV0LXJhZGlvXCJcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICBuYW1lPVwidHlwZVwiXG4gICAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgICBjbGljazogZXZ0ID0+IHRoaXMuZGlkQ2xpY2soZXZ0KVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIEdyb3VwXG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImlucHV0LWxhYmVsXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImlucHV0LXJhZGlvXCJcbiAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICBuYW1lPVwidHlwZVwiXG4gICAgICAgICAgICBvbj17e1xuICAgICAgICAgICAgICBjbGljazogZXZ0ID0+IHRoaXMuZGlkQ2xpY2soZXZ0KVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIFByb2plY3RcbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==