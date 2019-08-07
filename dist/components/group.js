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
    console.log('created group', props);
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
      console.log('updated group', _this, props);
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
      console.log('destroyed group', _this2);
      yield _etch.default.destroy(_this2);
    })();
  }
  /**
   * render upon an etch update
   * @returns {Object} returns a virtual DOM tree representing the current
   * state of the component
   */


  render() {
    console.log('rendered group', this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiZHJvcEVmZmVjdCIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRpZERyYWdFbmQiLCJyZW1vdmUiLCJkaWREcmFnT3ZlciIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGlkRHJvcCIsIm9uRGlkRHJvcCIsImdldERhdGEiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwiY29uc29sZSIsImxvZyIsImV0Y2giLCJpbml0aWFsaXplIiwiaW5jbHVkZXMiLCJzcGxpdCIsIlByb21pc2UiLCJyZXNvbHZlIiwiZGVzdHJveSIsInJlbmRlciIsImNsaWNrIiwiZHJhZ3N0YXJ0IiwiZHJhZ2VuZCIsImRyYWdvdmVyIiwiZHJvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7QUFHZSxNQUFNQSxjQUFOLENBQXFCO0FBQ2xDO0FBQ0FDLEVBQUFBLFdBQVcsQ0FBRUMsS0FBRixFQUFTO0FBQ2xCLFNBQUtDLEVBQUwsR0FBVUQsS0FBSyxDQUFDQyxFQUFoQjtBQUNBLFNBQUtDLElBQUwsR0FBWUYsS0FBSyxDQUFDRSxJQUFsQjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsS0FBSyxDQUFDRyxNQUFwQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JKLEtBQUssQ0FBQ0ksUUFBdEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVM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Q29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5ncm91cHMgPSBlbnRyeS5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IGVudHJ5LnByb2plY3RzO1xuICAgIHRoaXMuZm9sZGluZyA9IGVudHJ5LmZvbGRpbmc7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nID09PSAnZXhwYW5kZWQnID8gJ2NvbGxhcHNlZCcgOiAnZXhwYW5kZWQnO1xuICAgIHN0YXRlLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHRoaXMuaWQsIHtcbiAgICAgIGZvbGRpbmc6IHRoaXMuZm9sZGluZ1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ092ZXIgKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AoZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKSwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXAgbmVlZHMgdG8gYmUgaW5pdGlhbGl6ZWQgYXMgYW4gZXRjaCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIGV0Y2ggY29tcG9uZW50IHByb3BlcnRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzLmlkIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5uYW1lIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5mb2xkaW5nIHRoZSBncm91cCByZXNvdXJjZSBtb2RlbCBhbmQgZXh0cmFzXG4gICAqIG5ldyBzdGF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ2NyZWF0ZWQgZ3JvdXAnLCBwcm9wcyk7XG4gICAgdGhpcy51cGRhdGVFbnRyeShwcm9wcyk7XG5cbiAgICB0aGlzLm9uRGlkRHJvcCA9IHByb3BzLm9uRGlkRHJvcDtcbiAgICBldGNoLmluaXRpYWxpemUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50J3Mgc3RhdGUgY2hhbmdlcyBpbiBhIHdheSB0aGF0XG4gICAqIGFmZmVjdHMgdGhlIHJlc3VsdHMgb2YgcmVuZGVyXG4gICAqIENhbGxpbmcgZXRjaC51cGRhdGUgcmV0dXJucyBhIFByb21pc2Ugd2hpY2ggY2FuIGJlIGhlbHBmdWwgaW4gdGhlIGZ1dHVyZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzXSBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZWQgZ3JvdXAnLCB0aGlzLCBwcm9wcyk7XG5cbiAgICBsZXQgaWNvbiA9IHByb3BzLmljb247XG5cbiAgICBpZiAoaWNvbiAmJiBpY29uLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgIGljb24gPSBpY29uLnNwbGl0KCcgJylbMV0uc3BsaXQoJy0nKVswXTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlRW50cnkoeyAuLi5wcm9wcywgaWNvbiB9KTtcbiAgICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIGV0Y2ggZGVzdHJveXMgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgY29uc29sZS5sb2coJ2Rlc3Ryb3llZCBncm91cCcsIHRoaXMpO1xuICAgIGF3YWl0IGV0Y2guZGVzdHJveSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW5kZXIgdXBvbiBhbiBldGNoIHVwZGF0ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXR1cm5zIGEgdmlydHVhbCBET00gdHJlZSByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnRcbiAgICogc3RhdGUgb2YgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zb2xlLmxvZygncmVuZGVyZWQgZ3JvdXAnLCB0aGlzKTtcblxuICAgIGNvbnN0IGljb24gPVxuICAgICAgdGhpcy5pY29uICYmIGF0b20ucGFja2FnZXMuaXNQYWNrYWdlQWN0aXZlKCdmaWxlLWljb25zJylcbiAgICAgICAgPyB0aGlzLmljb25cbiAgICAgICAgOiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxsaSBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtgbGlzdC1uZXN0ZWQtaXRlbSAke3RoaXMuZm9sZGluZ31gfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3QtaXRlbSBwdi1ncm91cFwiXG4gICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgb249e3tcbiAgICAgICAgICAgIGNsaWNrOiB0aGlzLmRpZENsaWNrLFxuICAgICAgICAgICAgZHJhZ3N0YXJ0OiB0aGlzLmRpZERyYWcsXG4gICAgICAgICAgICBkcmFnZW5kOiB0aGlzLmRpZERyYWdFbmQsXG4gICAgICAgICAgICBkcmFnb3ZlcjogdGhpcy5kaWREcmFnT3ZlcixcbiAgICAgICAgICAgIGRyb3A6IHRoaXMuZGlkRHJvcFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ljb259Pnt0aGlzLm5hbWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8TGlzdENvbnRhaW5lciBncm91cHM9e3RoaXMuZ3JvdXBzfSBwcm9qZWN0cz17dGhpcy5wcm9qZWN0c30gLz5cbiAgICAgIDwvbGk+XG4gICAgKTtcbiAgfVxufVxuIl19