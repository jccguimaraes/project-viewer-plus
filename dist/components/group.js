"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _etch = _interopRequireDefault(require("etch"));

var _list = _interopRequireDefault(require("./../containers/list"));

var _state = _interopRequireDefault(require("../services/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Component that generates an Atom `list-nested-item` (aka group)
 */
class GroupComponent {
  /* eslint-disable-next-line require-jsdoc */
  updateEntry(entry) {
    this.id = entry.id;
    this.name = entry.name;
    this.groups = entry.groups;
    this.projects = entry.projects;
    this.folding = entry.folding;
    this.icon = entry.icon && atom.packages.isPackageActive('file-icons') ? "icon ".concat(entry.icon, "-icon") : null;
  }
  /**
   * handler for click events
   * @param {Object} event the click event object
   */


  didClick(event) {
    this.folding = this.folding === 'expanded' ? 'collapsed' : 'expanded';

    _state.default.fullOrParcialUpdateExistingEntry(this.id, {
      folding: this.folding
    });

    this.update(this);
  }
  /**
   * handler for drag start events
   * @param {Object} event the drag event object
   */


  didDrag(event) {
    event.dataTransfer.setData('text/plain', this.id);
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.add('dragging');
  }
  /**
   * handler for drag end events
   * @param {Object} event the drag event object
   */


  didDragEnd(event) {
    event.target.classList.remove('dragging');
  }
  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */


  didDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'move';
    event.target.classList.remove('dragging');
  }
  /**
   * handler for drop end events
   * @param {Object} event the drop event object
   */


  didDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    this.onDidDrop(event.dataTransfer.getData('text/plain'), this.id);
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
    this.onDidDrop = props.onDidDrop;

    _etch.default.initialize(this);
  }
  /**
   * Should be called whenever the component's state changes in a way that
   * affects the results of render
   * Calling etch.update returns a Promise which can be helpful in the future
   * @param {Object} [props] etch component properties
   */


  update(props) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var icon = props.icon;

      if (icon && icon.includes(' ')) {
        icon = icon.split(' ')[1].split('-')[0];
      }

      if (props) {
        _this.updateEntry(_objectSpread({}, props, {
          icon
        }));

        return _etch.default.update(_this);
      }

      return Promise.resolve();
    })();
  }
  /**
   * Called whenever etch destroys the component
   */


  destroy() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _etch.default.destroy(_this2);
    })();
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
    var icon = this.icon && atom.packages.isPackageActive('file-icons') ? this.icon : null;
    return _etch.default.dom("li", {
      id: this.id,
      className: "list-nested-item ".concat(this.folding)
    }, _etch.default.dom("div", {
      className: "list-item pv-group",
      draggable: true,
      on: {
        click: this.didClick,
        dragstart: this.didDrag,
        dragend: this.didDragEnd,
        dragover: this.didDragOver,
        drop: this.didDrop
      }
    }, _etch.default.dom("span", {
      className: icon
    }, this.name)), _etch.default.dom(_list.default, {
      groups: this.groups,
      projects: this.projects
    }));
  }

}

exports.default = GroupComponent;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZHJvcEVmZmVjdCIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlkRHJvcCIsIm9uRGlkRHJvcCIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiZXRjaCIsImluaXRpYWxpemUiLCJpbmNsdWRlcyIsInNwbGl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJkZXN0cm95IiwicmVuZGVyIiwiY2xpY2siLCJkcmFnc3RhcnQiLCJkcmFnZW5kIiwiZHJhZ292ZXIiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLLENBQUNDLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNFLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxLQUFLLENBQUNHLE1BQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkosS0FBSyxDQUFDSSxRQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUwsS0FBSyxDQUFDSyxPQUFy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YixDQUFOO0FBRGU7QUFFaEI7QUFFRDs7Ozs7OztBQUtBQyxFQUFBQSxNQUFNLEdBQUk7QUFDUixRQUFNakMsSUFBSSxHQUNSLEtBQUtBLElBQUwsSUFBYUMsSUFBSSxDQUFDQyxRQUFMLENBQWNDLGVBQWQsQ0FBOEIsWUFBOUIsQ0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOO0FBS0EsV0FDRTtBQUFJLE1BQUEsRUFBRSxFQUFFLEtBQUtMLEVBQWI7QUFBaUIsTUFBQSxTQUFTLDZCQUFzQixLQUFLSSxPQUEzQjtBQUExQixPQUNFO0FBQ0UsTUFBQSxTQUFTLEVBQUMsb0JBRFo7QUFFRSxNQUFBLFNBQVMsTUFGWDtBQUdFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZtQyxRQUFBQSxLQUFLLEVBQUUsS0FBSzlCLFFBRFY7QUFFRitCLFFBQUFBLFNBQVMsRUFBRSxLQUFLMUIsT0FGZDtBQUdGMkIsUUFBQUEsT0FBTyxFQUFFLEtBQUtwQixVQUhaO0FBSUZxQixRQUFBQSxRQUFRLEVBQUUsS0FBS25CLFdBSmI7QUFLRm9CLFFBQUFBLElBQUksRUFBRSxLQUFLakI7QUFMVDtBQUhOLE9BV0U7QUFBTSxNQUFBLFNBQVMsRUFBRXJCO0FBQWpCLE9BQXdCLEtBQUtKLElBQTdCLENBWEYsQ0FERixFQWVFLGtCQUFDLGFBQUQ7QUFBZSxNQUFBLE1BQU0sRUFBRSxLQUFLQyxNQUE1QjtBQUFvQyxNQUFBLFFBQVEsRUFBRSxLQUFLQztBQUFuRCxNQWZGLENBREY7QUFtQkQ7O0FBM0lpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGV0Y2guZG9tICovXG5cbmltcG9ydCBldGNoIGZyb20gJ2V0Y2gnO1xuaW1wb3J0IExpc3RDb250YWluZXIgZnJvbSAnLi8uLi9jb250YWluZXJzL2xpc3QnO1xuaW1wb3J0IHN0YXRlIGZyb20gJy4uL3NlcnZpY2VzL3N0YXRlJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBnZW5lcmF0ZXMgYW4gQXRvbSBgbGlzdC1uZXN0ZWQtaXRlbWAgKGFrYSBncm91cClcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBDb21wb25lbnQge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICB1cGRhdGVFbnRyeSAoZW50cnkpIHtcbiAgICB0aGlzLmlkID0gZW50cnkuaWQ7XG4gICAgdGhpcy5uYW1lID0gZW50cnkubmFtZTtcbiAgICB0aGlzLmdyb3VwcyA9IGVudHJ5Lmdyb3VwcztcbiAgICB0aGlzLnByb2plY3RzID0gZW50cnkucHJvamVjdHM7XG4gICAgdGhpcy5mb2xkaW5nID0gZW50cnkuZm9sZGluZztcbiAgICB0aGlzLmljb24gPVxuICAgICAgZW50cnkuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gYGljb24gJHtlbnRyeS5pY29ufS1pY29uYFxuICAgICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgY2xpY2sgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgY2xpY2sgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWRDbGljayAoZXZlbnQpIHtcbiAgICB0aGlzLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmcgPT09ICdleHBhbmRlZCcgPyAnY29sbGFwc2VkJyA6ICdleHBhbmRlZCc7XG4gICAgc3RhdGUuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkodGhpcy5pZCwge1xuICAgICAgZm9sZGluZzogdGhpcy5mb2xkaW5nXG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlciBmb3IgZHJhZyBzdGFydCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZyAoZXZlbnQpIHtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMuaWQpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyYWcgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnRW5kIChldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcmFnT3ZlciAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyb3AgZW5kIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGRyb3AgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBkaWREcm9wIChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcChldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpLCB0aGlzLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcm91cCBuZWVkcyB0byBiZSBpbml0aWFsaXplZCBhcyBhbiBldGNoIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuaWQgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLm5hbWUgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmZvbGRpbmcgdGhlIGdyb3VwIHJlc291cmNlIG1vZGVsIGFuZCBleHRyYXNcbiAgICogbmV3IHN0YXRlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLnVwZGF0ZUVudHJ5KHByb3BzKTtcblxuICAgIHRoaXMub25EaWREcm9wID0gcHJvcHMub25EaWREcm9wO1xuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQncyBzdGF0ZSBjaGFuZ2VzIGluIGEgd2F5IHRoYXRcbiAgICogYWZmZWN0cyB0aGUgcmVzdWx0cyBvZiByZW5kZXJcbiAgICogQ2FsbGluZyBldGNoLnVwZGF0ZSByZXR1cm5zIGEgUHJvbWlzZSB3aGljaCBjYW4gYmUgaGVscGZ1bCBpbiB0aGUgZnV0dXJlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcHNdIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICovXG4gIGFzeW5jIHVwZGF0ZSAocHJvcHMpIHtcbiAgICBsZXQgaWNvbiA9IHByb3BzLmljb247XG5cbiAgICBpZiAoaWNvbiAmJiBpY29uLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgIGljb24gPSBpY29uLnNwbGl0KCcgJylbMV0uc3BsaXQoJy0nKVswXTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkoeyAuLi5wcm9wcywgaWNvbiB9KTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgYXdhaXQgZXRjaC5kZXN0cm95KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlciB1cG9uIGFuIGV0Y2ggdXBkYXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHJldHVybnMgYSB2aXJ0dWFsIERPTSB0cmVlIHJlcHJlc2VudGluZyB0aGUgY3VycmVudFxuICAgKiBzdGF0ZSBvZiB0aGUgY29tcG9uZW50XG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke3RoaXMuZm9sZGluZ31gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgICBkcmFnb3ZlcjogdGhpcy5kaWREcmFnT3ZlcixcbiAgICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGlzdENvbnRhaW5lciBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19