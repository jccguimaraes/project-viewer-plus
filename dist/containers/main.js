'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx etch.dom */

var _atom = require('atom');

var _etch = require('etch');

var _etch2 = _interopRequireDefault(_etch);

var _base = require('./../constants/base');

var _main = require('./../components/main');

var _main2 = _interopRequireDefault(_main);

var _empty = require('./../components/empty');

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 */
class MainContainer {
  /**
   *
   */
  constructor() {
    this.disposables = new _atom.CompositeDisposable();
    this.emitter = new _atom.Emitter();
    this.loading = true;

    _etch2.default.initialize(this);
  }

  /**
   *
   * @param {Object} props - description
   * @returns {Object} description
   */
  async update(props) {
    this.props = props;
    return _etch2.default.update(this);
  }

  /**
   *
   */
  handleCreate() {
    this.createFile();
  }

  /**
   *
   * @returns {Object} description
   */
  render() {
    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      this.props ? _etch2.default.dom(_main2.default, this.props) : _etch2.default.dom(_empty2.default, {
        loading: this.loading,
        onCreate: () => this.handleCreate()
      })
    );
  }

  /**
   * @todo
   */
  stopLoading() {
    this.loading = false;
    this.update();
  }

  /**
   *
   */
  startLoading() {
    this.loading = true;
    this.update();
  }

  /**
   *
   */
  async destroy() {
    this.disposables.dispose();
    this.emitter.emit(_base.EMITTER.ERROR);
  }

  /**
   *
   * @returns {string} description
   */
  getURI() {
    return _base.DOCK_URI;
  }

  /**
   *
   * @returns {string} description
   */
  getTitle() {
    return _base.DOCK_TITLE;
  }

  /**
   *
   * @returns {string} description
   */
  getIconName() {
    return _base.DOCK_ICON;
  }

  /**
   *
   * @returns {number} description
   */
  getPreferredWidth() {
    return _base.DOCK_SIZE;
  }

  /**
   *
   * @returns {string} description
   */
  getDefaultLocation() {
    return atom.config.get(`${_base.PLUGIN_NAME}.dock.position`) || _base.ALLOWED_DOCKS[1];
  }

  /**
   *
   * @returns {Array} description
   */
  getAllowedLocations() {
    return _base.ALLOWED_DOCKS;
  }

  /**
   *
   * @returns {boolean} description
   */
  isPermanentDockItem() {
    return true;
  }

  /**
   *
   */
  toggleVisibility() {
    atom.workspace.toggle(this.getURI());
  }

  /**
   *
   */
  async toggleFocus() {
    const dock = atom.workspace.paneContainerForItem(this);
    const pane = dock.getActivePane().getElement();

    if (this.activeElement && document.activeElement === pane) {
      this.activeElement.focus();
    } else {
      this.activeElement = document.activeElement;
      atom.workspace.open(this).then(() => this.element.focus());
    }
  }

  /**
   * @param {Function} callback - description
   * @returns {Object} description
   */
  onDidDestroy(callback) {
    return this.emitter.on(_base.EMITTER.ERROR, callback);
  }

  /**
   * @param {Function} callback - description
   */
  onDidSelectProject(callback) {
    this.emitter.on('main-select-project', callback);
  }

  /**
   * @param {Object} content - description
   */
  handleUpdate(content) {
    const data = {
      groups: [],
      projects: []
    };
    const mapping = {};
    content.forEach(value => {
      const resource = value.model;

      if (value.type === 'group') {
        resource.groups = [];
        resource.projects = [];
      }
      mapping[value.model.id] = _extends({}, resource, {
        expanded: value.expanded
      });

      if (value.parentId && value.type === 'group') {
        mapping[value.parentId].groups.push(mapping[value.model.id]);
      } else if (value.parentId && value.type === 'project') {
        mapping[value.parentId].projects.push(mapping[value.model.id]);
      } else if (!value.parentId && value.type === 'group') {
        data.groups.push(mapping[value.model.id]);
      } else if (!value.parentId && value.type === 'project') {
        data.projects.push(mapping[value.model.id]);
      }
    });

    this.update(data);
  }
}
exports.default = MainContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJsb2FkaW5nIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsImhhbmRsZUNyZWF0ZSIsImNyZWF0ZUZpbGUiLCJyZW5kZXIiLCJzdG9wTG9hZGluZyIsInN0YXJ0TG9hZGluZyIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiZW1pdCIsIkVNSVRURVIiLCJFUlJPUiIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJ3b3Jrc3BhY2UiLCJ0b2dnbGUiLCJ0b2dnbGVGb2N1cyIsImRvY2siLCJwYW5lQ29udGFpbmVyRm9ySXRlbSIsInBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiZ2V0RWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJkb2N1bWVudCIsImZvY3VzIiwib3BlbiIsInRoZW4iLCJlbGVtZW50Iiwib25EaWREZXN0cm95IiwiY2FsbGJhY2siLCJvbiIsIm9uRGlkU2VsZWN0UHJvamVjdCIsImhhbmRsZVVwZGF0ZSIsImNvbnRlbnQiLCJkYXRhIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJtYXBwaW5nIiwiZm9yRWFjaCIsInZhbHVlIiwicmVzb3VyY2UiLCJtb2RlbCIsInR5cGUiLCJpZCIsImV4cGFuZGVkIiwicGFyZW50SWQiLCJwdXNoIl0s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RkksTUFHQSxJQUFJLENBQUNKLE1BQU1NLFFBQVAsSUFBbUJOLE1BQU1HLElBQU4sS0FBZSxTQUF0QyxFQUFpRDtBQUNwRFIsYUFBS0UsUUFBTCxDQUFjVSxJQUFkLENBQW1CVCxRQUFRRSxNQUFNRSxLQUFOLENBQVlFLEVBQXBCLENBQW5CO0FBQ0Q7QUFDRixLQXhCRDs7QUEwQkEsU0FBSzFELE1BQUwsQ0FBWWlELElBQVo7QUFDRDtBQXpNZ0M7a0JBQWQxRCxhIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQGpzeCBldGNoLmRvbSAqL1xuXG5pbXBvcnQgeyBFbWl0dGVyLCBDb21wb3NpdGVEaXNwb3NhYmxlIH0gZnJvbSAnYXRvbSc7XG5pbXBvcnQgZXRjaCBmcm9tICdldGNoJztcbmltcG9ydCB7XG4gIERPQ0tfSUNPTixcbiAgRE9DS19USVRMRSxcbiAgRE9DS19VUkksXG4gIERPQ0tfU0laRSxcbiAgUExVR0lOX05BTUUsXG4gIEFMTE9XRURfRE9DS1MsXG4gIEVNSVRURVJcbn0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5pbXBvcnQgTWFpbkNvbXBvbmVudCBmcm9tICcuLy4uL2NvbXBvbmVudHMvbWFpbic7XG5pbXBvcnQgRW1wdHlDb21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL2VtcHR5JztcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluQ29udGFpbmVyIHtcbiAgLyoqXG4gICAqXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgZXRjaC5pbml0aWFsaXplKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBhc3luYyB1cGRhdGUgKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgIHJldHVybiBldGNoLnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgaGFuZGxlQ3JlYXRlICgpIHtcbiAgICB0aGlzLmNyZWF0ZUZpbGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sLXBhbmVsIHByb2plY3Qtdmlld2VyLXBsdXNcIiB0YWJJbmRleD1cIi0xXCI+XG4gICAgICAgIHt0aGlzLnByb3BzID9cbiAgICAgICAgICAoPE1haW5Db21wb25lbnQgey4uLnRoaXMucHJvcHN9IC8+KSA6XG4gICAgICAgICAgKDxFbXB0eUNvbXBvbmVudFxuICAgICAgICAgICAgbG9hZGluZz17dGhpcy5sb2FkaW5nfVxuICAgICAgICAgICAgb25DcmVhdGU9eygpID0+IHRoaXMuaGFuZGxlQ3JlYXRlKCl9XG4gICAgICAgICAgLz4pXG4gICAgICAgIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG9cbiAgICovXG4gIHN0b3BMb2FkaW5nICgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzdGFydExvYWRpbmcgKCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIERPQ0tfU0laRTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgQUxMT1dFRF9ET0NLU1sxXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9ET0NLUztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGlzUGVybWFuZW50RG9ja0l0ZW0gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBjb25zdCBkb2NrID0gYXRvbS53b3Jrc3BhY2UucGFuZUNvbnRhaW5lckZvckl0ZW0odGhpcyk7XG4gICAgY29uc3QgcGFuZSA9IGRvY2suZ2V0QWN0aXZlUGFuZSgpLmdldEVsZW1lbnQoKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcGFuZSkge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcykudGhlbigoKSA9PiB0aGlzLmVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkRGVzdHJveSAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLm9uKEVNSVRURVIuRVJST1IsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZFNlbGVjdFByb2plY3QgKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdtYWluLXNlbGVjdC1wcm9qZWN0JywgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50IC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGhhbmRsZVVwZGF0ZSAoY29udGVudCkge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBncm91cHM6IFtdLFxuICAgICAgcHJvamVjdHM6IFtdXG4gICAgfTtcbiAgICBjb25zdCBtYXBwaW5nID0ge307XG4gICAgY29udGVudC5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGNvbnN0IHJlc291cmNlID0gdmFsdWUubW9kZWw7XG5cbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHJlc291cmNlLmdyb3VwcyA9IFtdO1xuICAgICAgICByZXNvdXJjZS5wcm9qZWN0cyA9IFtdO1xuICAgICAgfVxuICAgICAgbWFwcGluZ1t2YWx1ZS5tb2RlbC5pZF0gPSB7XG4gICAgICAgIC4uLnJlc291cmNlLFxuICAgICAgICBleHBhbmRlZDogdmFsdWUuZXhwYW5kZWRcbiAgICAgIH07XG5cbiAgICAgIGlmICh2YWx1ZS5wYXJlbnRJZCAmJiB2YWx1ZS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIG1hcHBpbmdbdmFsdWUucGFyZW50SWRdLmdyb3Vwcy5wdXNoKG1hcHBpbmdbdmFsdWUubW9kZWwuaWRdKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbHVlLnBhcmVudElkICYmIHZhbHVlLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBtYXBwaW5nW3ZhbHVlLnBhcmVudElkXS5wcm9qZWN0cy5wdXNoKG1hcHBpbmdbdmFsdWUubW9kZWwuaWRdKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCF2YWx1ZS5wYXJlbnRJZCAmJiB2YWx1ZS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGRhdGEuZ3JvdXBzLnB1c2gobWFwcGluZ1t2YWx1ZS5tb2RlbC5pZF0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIXZhbHVlLnBhcmVudElkICYmIHZhbHVlLnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBkYXRhLnByb2plY3RzLnB1c2gobWFwcGluZ1t2YWx1ZS5tb2RlbC5pZF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGUoZGF0YSk7XG4gIH1cbn1cbiJdfQ==