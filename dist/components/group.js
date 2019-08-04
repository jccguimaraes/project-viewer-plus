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


  didDrop(event) {
    event.stopPropagation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL2dyb3VwLmpzIl0sIm5hbWVzIjpbIkdyb3VwQ29tcG9uZW50IiwidXBkYXRlRW50cnkiLCJlbnRyeSIsImlkIiwibmFtZSIsImdyb3VwcyIsInByb2plY3RzIiwiZm9sZGluZyIsImljb24iLCJhdG9tIiwicGFja2FnZXMiLCJpc1BhY2thZ2VBY3RpdmUiLCJkaWRDbGljayIsImV2ZW50Iiwic3RhdGUiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInVwZGF0ZSIsImRpZERyYWciLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGlkRHJhZ0VuZCIsInJlbW92ZSIsImRpZERyb3AiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkRpZERyb3AiLCJnZXREYXRhIiwiY29uc3RydWN0b3IiLCJwcm9wcyIsImNvbnNvbGUiLCJsb2ciLCJldGNoIiwiaW5pdGlhbGl6ZSIsImluY2x1ZGVzIiwic3BsaXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImRlc3Ryb3kiLCJyZW5kZXIiLCJjbGljayIsImRyYWdzdGFydCIsImRyYWdlbmQiLCJkcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUE7OztBQUdlLE1BQU1BLGNBQU4sQ0FBcUI7QUFDbEM7QUFDQUMsRUFBQUEsV0FBVyxDQUFFQyxLQUFGLEVBQVM7QUFDbEIsU0FBS0MsRUFBTCxHQUFVRCxLQUFLLENBQUNDLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZRixLQUFLLENBQUNFLElBQWxCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxLQUFLLENBQUNHLE1BQXBCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkosS0FBSyxDQUFDSSxRQUF0QjtBQUNBLFNBQUtDLE9BQUwsR0FBZUwsS0FBSyxDQUFDSyxPQUFyQjtBQUNBLFNBQUtDLElBQUwsR0FDRU4sS0FBSyxDQUFDTSxJQUFO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Q0FBYixHQUNJLEtBQUtILElBRFQsR0FFSSxJQUhOO0FBS0EsV0FDRTtBQUFJLE1BQUEsRUFBRSxFQUFFLEtBQUtMLEVBQWI7QUFBaUIsTUFBQSxTQUFTLDZCQUFzQixLQUFLSSxPQUEzQjtBQUExQixPQUNFO0FBQ0UsTUFBQSxTQUFTLEVBQUMsb0JBRFo7QUFFRSxNQUFBLFNBQVMsTUFGWDtBQUdFLE1BQUEsRUFBRSxFQUFFO0FBQ0ZrQyxRQUFBQSxLQUFLLEVBQUUsS0FBSzdCLFFBRFY7QUFFRjhCLFFBQUFBLFNBQVMsRUFBRSxLQUFLekIsT0FGZDtBQUdGMEIsUUFBQUEsT0FBTyxFQUFFLEtBQUtwQixVQUhaO0FBSUZxQixRQUFBQSxJQUFJLEVBQUUsS0FBS25CO0FBSlQ7QUFITixPQVVFO0FBQU0sTUFBQSxTQUFTLEVBQUVqQjtBQUFqQixPQUF3QixLQUFLSixJQUE3QixDQVZGLENBREYsRUFjRSxrQkFBQyxhQUFEO0FBQWUsTUFBQSxNQUFNLEVBQUUsS0FBS0MsTUFBNUI7QUFBb0MsTUFBQSxRQUFRLEVBQUUsS0FBS0M7QUFBbkQsTUFkRixDQURGO0FBa0JEOztBQW5JaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCBMaXN0Q29udGFpbmVyIGZyb20gJy4vLi4vY29udGFpbmVycy9saXN0JztcbmltcG9ydCBzdGF0ZSBmcm9tICcuLi9zZXJ2aWNlcy9zdGF0ZSc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgZ2VuZXJhdGVzIGFuIEF0b20gYGxpc3QtbmVzdGVkLWl0ZW1gIChha2EgZ3JvdXApXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwQ29tcG9uZW50IHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlRW50cnkgKGVudHJ5KSB7XG4gICAgdGhpcy5pZCA9IGVudHJ5LmlkO1xuICAgIHRoaXMubmFtZSA9IGVudHJ5Lm5hbWU7XG4gICAgdGhpcy5ncm91cHMgPSBlbnRyeS5ncm91cHM7XG4gICAgdGhpcy5wcm9qZWN0cyA9IGVudHJ5LnByb2plY3RzO1xuICAgIHRoaXMuZm9sZGluZyA9IGVudHJ5LmZvbGRpbmc7XG4gICAgdGhpcy5pY29uID1cbiAgICAgIGVudHJ5Lmljb24gJiYgYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VBY3RpdmUoJ2ZpbGUtaWNvbnMnKVxuICAgICAgICA/IGBpY29uICR7ZW50cnkuaWNvbn0taWNvbmBcbiAgICAgICAgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGNsaWNrIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkQ2xpY2sgKGV2ZW50KSB7XG4gICAgdGhpcy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nID09PSAnZXhwYW5kZWQnID8gJ2NvbGxhcHNlZCcgOiAnZXhwYW5kZWQnO1xuICAgIHN0YXRlLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHRoaXMuaWQsIHtcbiAgICAgIGZvbGRpbmc6IHRoaXMuZm9sZGluZ1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXIgZm9yIGRyYWcgc3RhcnQgZXZlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZHJhZyBldmVudCBvYmplY3RcbiAgICovXG4gIGRpZERyYWcgKGV2ZW50KSB7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLmlkKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcmFnIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcmFnIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJhZ0VuZCAoZXZlbnQpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVyIGZvciBkcm9wIGVuZCBldmVudHNcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBkcm9wIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgZGlkRHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMub25EaWREcm9wKGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyksIHRoaXMuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyb3VwIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkIGFzIGFuIGV0Y2ggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBldGNoIGNvbXBvbmVudCBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5pZCB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMubmFtZSB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMuZm9sZGluZyB0aGUgZ3JvdXAgcmVzb3VyY2UgbW9kZWwgYW5kIGV4dHJhc1xuICAgKiBuZXcgc3RhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCdjcmVhdGVkIGdyb3VwJywgcHJvcHMpO1xuICAgIHRoaXMudXBkYXRlRW50cnkocHJvcHMpO1xuXG4gICAgdGhpcy5vbkRpZERyb3AgPSBwcm9wcy5vbkRpZERyb3A7XG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCdzIHN0YXRlIGNoYW5nZXMgaW4gYSB3YXkgdGhhdFxuICAgKiBhZmZlY3RzIHRoZSByZXN1bHRzIG9mIHJlbmRlclxuICAgKiBDYWxsaW5nIGV0Y2gudXBkYXRlIHJldHVybnMgYSBQcm9taXNlIHdoaWNoIGNhbiBiZSBoZWxwZnVsIGluIHRoZSBmdXR1cmVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wc10gZXRjaCBjb21wb25lbnQgcHJvcGVydGllc1xuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIGNvbnNvbGUubG9nKCd1cGRhdGVkIGdyb3VwJywgdGhpcywgcHJvcHMpO1xuXG4gICAgbGV0IGljb24gPSBwcm9wcy5pY29uO1xuXG4gICAgaWYgKGljb24gJiYgaWNvbi5pbmNsdWRlcygnICcpKSB7XG4gICAgICBpY29uID0gaWNvbi5zcGxpdCgnICcpWzFdLnNwbGl0KCctJylbMF07XG4gICAgfVxuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICB0aGlzLnVwZGF0ZUVudHJ5KHsgLi4ucHJvcHMsIGljb24gfSk7XG4gICAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciBldGNoIGRlc3Ryb3lzIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGFzeW5jIGRlc3Ryb3kgKCkge1xuICAgIGNvbnNvbGUubG9nKCdkZXN0cm95ZWQgZ3JvdXAnLCB0aGlzKTtcbiAgICBhd2FpdCBldGNoLmRlc3Ryb3kodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcmVuZGVyIHVwb24gYW4gZXRjaCB1cGRhdGVcbiAgICogQHJldHVybnMge09iamVjdH0gcmV0dXJucyBhIHZpcnR1YWwgRE9NIHRyZWUgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50XG4gICAqIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICovXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbmRlcmVkIGdyb3VwJywgdGhpcyk7XG5cbiAgICBjb25zdCBpY29uID1cbiAgICAgIHRoaXMuaWNvbiAmJiBhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnZmlsZS1pY29ucycpXG4gICAgICAgID8gdGhpcy5pY29uXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8bGkgaWQ9e3RoaXMuaWR9IGNsYXNzTmFtZT17YGxpc3QtbmVzdGVkLWl0ZW0gJHt0aGlzLmZvbGRpbmd9YH0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gcHYtZ3JvdXBcIlxuICAgICAgICAgIGRyYWdnYWJsZVxuICAgICAgICAgIG9uPXt7XG4gICAgICAgICAgICBjbGljazogdGhpcy5kaWRDbGljayxcbiAgICAgICAgICAgIGRyYWdzdGFydDogdGhpcy5kaWREcmFnLFxuICAgICAgICAgICAgZHJhZ2VuZDogdGhpcy5kaWREcmFnRW5kLFxuICAgICAgICAgICAgZHJvcDogdGhpcy5kaWREcm9wXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aWNvbn0+e3RoaXMubmFtZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxMaXN0Q29udGFpbmVyIGdyb3Vwcz17dGhpcy5ncm91cHN9IHByb2plY3RzPXt0aGlzLnByb2plY3RzfSAvPlxuICAgICAgPC9saT5cbiAgICApO1xuICB9XG59XG4iXX0=