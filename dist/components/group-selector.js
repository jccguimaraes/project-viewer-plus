"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _listSelector = _interopRequireDefault(require("./list-selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx etch.dom */

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class GroupSelectorComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(props) {
    this.id = props.id;
    this.name = props.name;
    this.groups = props.groups;
    this.selectedId = props.selectedId;
    this.didClick = props.onDidClick;
  }
  /**
   * Group needs to be initialized as an etch component
   * @param {Object} props etch component properties
   * @param {Object} props.id the group resource model and extras
   * @param {Object} props.name the group resource model and extras
   * @param {Object} props.folding the group resource model and extras
   * new state
   */


  constructor(props) {
    this.updateEntry(props);

    _etch.default.initialize(this);
  }
  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */


  async update(props) {
    if (props) {
      this.updateEntry(props);
      return _etch.default.update(this);
    }

    return Promise.resolve();
  }
  /**
   * Called whenever etch destroys the component
   */


  async destroy() {
    await _etch.default.destroy(this);
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
    let className = this.groups.length ? 'list-nested-item ' : '';
    className += this.id === this.selectedId ? 'selected' : '';
    className.trim();
    const listItem = [_etch.default.dom("div", {
      class: "list-item"
    }, _etch.default.dom("span", null, this.name))];

    if (this.groups.length) {
      listItem.push(_etch.default.dom(_listSelector.default, {
        groups: this.groups,
        selectedId: this.selectedId
      }));
    }

    return _etch.default.dom("li", {
      id: this.id,
      className: className || null,
      on: {
        click: () => this.didClick(this.id)
      }
    }, listItem);
  }

}

exports.default = GroupSelectorComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLXNlbGVjdG9yLmpzIl0sIm5hbWVzIjpbIkdyb3VwU2VsZWN0b3JDb21wb25lbnQiLCJ1cGRhdGVFbnRyeSIsInByb3BzIiwiaWQiLCJuYW1lIiwiZ3JvdXBzIiwic2VsZWN0ZWRJZCIsImRpZENsaWNrIiwib25EaWRDbGljayIsImNvbnN0cnVjdG9yIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJ0cmltIiwibGlzdEl0ZW0iLCJwdXNoIiwiY2xpY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFFQTs7OztBQUpBOztBQU1BOzs7QUFHZSxNQUFNQSxzQkFBTixDQUE2QjtBQUMxQztBQUNBQyxFQUFBQSxXQUFXLENBQUVDLEtBQUYsRUFBUztBQUNsQixTQUFLQyxFQUFMLEdBQVVELEtBQUssQ0FBQ0MsRUFBaEI7QUFDQSxTQUFLQyxJQUFMLEdBQVlGLEtBQUssQ0FBQ0UsSUFBbEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILEtBQUssQ0FBQ0csTUFBcEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCSixLQUFLLENBQUNJLFVBQXhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkwsS0FBSyxDQUFDTSxVQUF0QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFRQUMsRUFBQUEsV0FBVyxDQUFFUCxLQUFGLEVBQVM7QUFDbEIsU0FBS0QsV0FBTCxDQUFpQkMsS0FBakI7O0FBQ0FRLGtCQUFLQyxVQUFMLENBQWdCLElBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQSxRQUFNQyxNQUFOLENBQWNWLEtBQWQsRUFBcUI7QUFDbkIsUUFBSUEsS0FBSixFQUFXO0FBQ1QsV0FBS0QsV0FBTCxDQUFpQkMsS0FBakI7QUFDQSxhQUFPUSxjQUFLRSxNQUFMLENBQVksSUFBWixDQUFQO0FBQ0Q7O0FBRUQsV0FBT0MsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDRDtBQUVEOzs7OztBQUdBLFFBQU1DLE9BQU4sR0FBaUI7QUFDZixVQUFNTCxjQUFLSyxPQUFMLENBQWEsSUFBYixDQUFOO0FBQ0Q7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixRQUFJQyxTQUFTLEdBQUcsS0FBS1osTUFBTCxDQUFZYSxNQUFaLEdBQXFCLG1CQUFyQixHQUEyQyxFQUEzRDtBQUNBRCxJQUFBQSxTQUFTLElBQUksS0FBS2QsRUFBTCxLQUFZLEtBQUtHLFVBQWpCLEdBQThCLFVBQTlCLEdBQTJDLEVBQXhEO0FBQ0FXLElBQUFBLFNBQVMsQ0FBQ0UsSUFBVjtBQUVBLFVBQU1DLFFBQVEsR0FBRyxDQUNmO0FBQUssTUFBQSxLQUFLLEVBQUM7QUFBWCxPQUNFLGdDQUFPLEtBQUtoQixJQUFaLENBREYsQ0FEZSxDQUFqQjs7QUFNQSxRQUFJLEtBQUtDLE1BQUwsQ0FBWWEsTUFBaEIsRUFBd0I7QUFDdEJFLE1BQUFBLFFBQVEsQ0FBQ0MsSUFBVCxDQUNFLGtCQUFDLHFCQUFEO0FBQWMsUUFBQSxNQUFNLEVBQUUsS0FBS2hCLE1BQTNCO0FBQW1DLFFBQUEsVUFBVSxFQUFFLEtBQUtDO0FBQXBELFFBREY7QUFHRDs7QUFFRCxXQUNFO0FBQ0UsTUFBQSxFQUFFLEVBQUUsS0FBS0gsRUFEWDtBQUVFLE1BQUEsU0FBUyxFQUFFYyxTQUFTLElBQUksSUFGMUI7QUFHRSxNQUFBLEVBQUUsRUFBRTtBQUNGSyxRQUFBQSxLQUFLLEVBQUUsTUFBTSxLQUFLZixRQUFMLENBQWMsS0FBS0osRUFBbkI7QUFEWDtBQUhOLE9BT0dpQixRQVBILENBREY7QUFXRDs7QUE5RXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5cbmltcG9ydCBMaXN0U2VsZWN0b3IgZnJvbSAnLi9saXN0LXNlbGVjdG9yJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1uZXN0ZWQtaXRlbWAgKGFrYSBncm91cClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBTZWxlY3RvckNvbXBvbmVudCB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHVwZGF0ZUVudHJ5IChwcm9wcykge1xuICAgIHRoaXMuaWQgPSBwcm9wcy5pZDtcbiAgICB0aGlzLm5hbWUgPSBwcm9wcy5uYW1lO1xuICAgIHRoaXMuZ3JvdXBzID0gcHJvcHMuZ3JvdXBzO1xuICAgIHRoaXMuc2VsZWN0ZWRJZCA9IHByb3BzLnNlbGVjdGVkSWQ7XG4gICAgdGhpcy5kaWRDbGljayA9IHByb3BzLm9uRGlkQ2xpY2s7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXAgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmlkIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5uYW1lIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5mb2xkaW5nIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIG5ldyBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBDYWxsaW5nIGV0Y2gudXBkYXRlIHJldHVybnMgYSBQcm9taXNlIHdoaWNoIGNhbiBiZSBoZWxwZnVsIGluIHRoZSBmdXR1cmVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGlmIChwcm9wcykge1xuICAgICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5ncm91cHMubGVuZ3RoID8gJ2xpc3QtbmVzdGVkLWl0ZW0gJyA6ICcnO1xuICAgIGNsYXNzTmFtZSArPSB0aGlzLmlkID09PSB0aGlzLnNlbGVjdGVkSWQgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgY2xhc3NOYW1lLnRyaW0oKTtcblxuICAgIGNvbnN0IGxpc3RJdGVtID0gW1xuICAgICAgPGRpdiBjbGFzcz1cImxpc3QtaXRlbVwiPlxuICAgICAgICA8c3Bhbj57dGhpcy5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIF07XG5cbiAgICBpZiAodGhpcy5ncm91cHMubGVuZ3RoKSB7XG4gICAgICBsaXN0SXRlbS5wdXNoKFxuICAgICAgICA8TGlzdFNlbGVjdG9yIGdyb3Vwcz17dGhpcy5ncm91cHN9IHNlbGVjdGVkSWQ9e3RoaXMuc2VsZWN0ZWRJZH0gLz5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaVxuICAgICAgICBpZD17dGhpcy5pZH1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfHwgbnVsbH1cbiAgICAgICAgb249e3tcbiAgICAgICAgICBjbGljazogKCkgPT4gdGhpcy5kaWRDbGljayh0aGlzLmlkKVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bGlzdEl0ZW19XG4gICAgICA8L2xpPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==