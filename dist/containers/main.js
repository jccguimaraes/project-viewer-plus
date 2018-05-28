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
   * @todo
   * @returns {Object} description
   */
  render() {
    const { projects, groups } = this.props || {};

    return _etch2.default.dom(
      'div',
      { className: 'tool-panel project-viewer-plus', tabIndex: '-1' },
      this.props ? _etch2.default.dom(_main2.default, {
        groups: groups,
        projects: projects,
        onSelectProject: project => this.emitter.emit('main-select-project', project)
      }) : _etch2.default.dom(_empty2.default, {
        loading: this.loading,
        onCreate: () => this.handleCreate()
      })
    );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb250YWluZXJzL21haW4uanMiXSwibmFtZXMiOlsiTWFpbkNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZGlzcG9zYWJsZXMiLCJDb21wb3NpdGVEaXNwb3NhYmxlIiwiZW1pdHRlciIsIkVtaXR0ZXIiLCJsb2FkaW5nIiwiZXRjaCIsImluaXRpYWxpemUiLCJ1cGRhdGUiLCJwcm9wcyIsImhhbmRsZUNyZWF0ZSIsImNyZWF0ZUZpbGUiLCJzdG9wTG9hZGluZyIsInN0YXJ0TG9hZGluZyIsImRlc3Ryb3kiLCJkaXNwb3NlIiwiZW1pdCIsIkVNSVRURVIiLCJFUlJPUiIsImdldFVSSSIsIkRPQ0tfVVJJIiwiZ2V0VGl0bGUiLCJET0NLX1RJVExFIiwiZ2V0SWNvbk5hbWUiLCJET0NLX0lDT04iLCJnZXRQcmVmZXJyZWRXaWR0aCIsIkRPQ0tfU0laRSIsImdldERlZmF1bHRMb2NhdGlvbiIsImF0b20iLCJjb25maWciLCJnZXQiLCJQTFVHSU5fTkFNRSIsIkFMTE9XRURfRE9DS1MiLCJnZXRBbGxvd2VkTG9jYXRpb25zIiwiaXNQZXJtYW5lbnREb2NrSXRlbSIsInRvZ2dsZVZpc2liaWxpdHkiLCJ3b3Jrc3BhY2UiLCJ0b2dnbGUiLCJ0b2dnbGVGb2N1cyIsImRvY2siLCJwYW5lQ29udGFpbmVyRm9ySXRlbSIsInBhbmUiLCJnZXRBY3RpdmVQYW5lIiwiZ2V0RWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJkb2N1bWVudCIsImZvY3VzIiwib3BlbiIsInRoZW4iLCJlbGVtZW50IiwicmVuZGVyIiwicHJvamVjdHMiLCJncm91cHMiLCJwcm9qZWN0Iiwib25EaWREZXN0cm95IiwiY2FsbGJhY2siLCJvbiIsIm9uRGlkU2VsZWN0UHJvamVjdCIsImhhbmRsZVVwZGF0ZSIsImNvbnRlbnQiLCJkYXRhIiwibWFwcGluZyIsImZvckVhY2giLCJ2YWx1ZSIsInJlc291cmNlIiwibW9kZWwiLCJ0eXBlIiwiaWQiLCJleHBhbmRlZCIsInBhcmVudElk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TixDQUFZRSxFQUFwQixDQUF0QztBQUNELE9BRkksTUFHQSxJQUFJLENBQUNKLE1BQU1NLFFBQVAsSUFBbUJOLE1BQU1HLElBQU4sS0FBZSxPQUF0QyxFQUErQztBQUNsRE4sYUFBS1IsTUFBTCxDQUFZa0IsSUFBWixDQUFpQlQsUUFBUUUsTUFBTUUsS0FBTixDQUFZRSxFQUFwQixDQUFqQjtBQUNELE9BRkksTUFHQSxJQUFJLENBQUNKLE1BQU1NLFFBQVAsSUFBbUJOLE1BQU1HLElBQU4sS0FBZSxTQUF0QyxFQUFpRDtBQUNwRE4sYUFBS1QsUUFBTCxDQUFjbUIsSUFBZCxDQUFtQlQsUUFBUUUsTUFBTUUsS0FBTixDQUFZRSxFQUFwQixDQUFuQjtBQUNEO0FBQ0YsS0F4QkQ7O0FBMEJBLFNBQUszRCxNQUFMLENBQVlvRCxJQUFaO0FBQ0Q7QUFsTmdDO2tCQUFkN0QsYSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3ggZXRjaC5kb20gKi9cblxuaW1wb3J0IHsgRW1pdHRlciwgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IGV0Y2ggZnJvbSAnZXRjaCc7XG5pbXBvcnQge1xuICBET0NLX0lDT04sXG4gIERPQ0tfVElUTEUsXG4gIERPQ0tfVVJJLFxuICBET0NLX1NJWkUsXG4gIFBMVUdJTl9OQU1FLFxuICBBTExPV0VEX0RPQ0tTLFxuICBFTUlUVEVSXG59IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuaW1wb3J0IE1haW5Db21wb25lbnQgZnJvbSAnLi8uLi9jb21wb25lbnRzL21haW4nO1xuaW1wb3J0IEVtcHR5Q29tcG9uZW50IGZyb20gJy4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkNvbnRhaW5lciB7XG4gIC8qKlxuICAgKlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIGV0Y2guaW5pdGlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgYXN5bmMgdXBkYXRlIChwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICByZXR1cm4gZXRjaC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGhhbmRsZUNyZWF0ZSAoKSB7XG4gICAgdGhpcy5jcmVhdGVGaWxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQHRvZG9cbiAgICovXG4gIHN0b3BMb2FkaW5nICgpIHtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzdGFydExvYWRpbmcgKCkge1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgYXN5bmMgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5kaXNwb3NhYmxlcy5kaXNwb3NlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoRU1JVFRFUi5FUlJPUik7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldFVSSSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVVJJO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRUaXRsZSAoKSB7XG4gICAgcmV0dXJuIERPQ0tfVElUTEU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ30gZGVzY3JpcHRpb25cbiAgICovXG4gIGdldEljb25OYW1lICgpIHtcbiAgICByZXR1cm4gRE9DS19JQ09OO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRQcmVmZXJyZWRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIERPQ0tfU0laRTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdExvY2F0aW9uICgpIHtcbiAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KGAke1BMVUdJTl9OQU1FfS5kb2NrLnBvc2l0aW9uYCkgfHwgQUxMT1dFRF9ET0NLU1sxXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBnZXRBbGxvd2VkTG9jYXRpb25zICgpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9ET0NLUztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gZGVzY3JpcHRpb25cbiAgICovXG4gIGlzUGVybWFuZW50RG9ja0l0ZW0gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICB0b2dnbGVWaXNpYmlsaXR5ICgpIHtcbiAgICBhdG9tLndvcmtzcGFjZS50b2dnbGUodGhpcy5nZXRVUkkoKSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGFzeW5jIHRvZ2dsZUZvY3VzICgpIHtcbiAgICBjb25zdCBkb2NrID0gYXRvbS53b3Jrc3BhY2UucGFuZUNvbnRhaW5lckZvckl0ZW0odGhpcyk7XG4gICAgY29uc3QgcGFuZSA9IGRvY2suZ2V0QWN0aXZlUGFuZSgpLmdldEVsZW1lbnQoKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gcGFuZSkge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4odGhpcykudGhlbigoKSA9PiB0aGlzLmVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0b2RvXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGRlc2NyaXB0aW9uXG4gICAqL1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgcHJvamVjdHMsIGdyb3VwcyB9ID0gdGhpcy5wcm9wcyB8fCB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2wtcGFuZWwgcHJvamVjdC12aWV3ZXItcGx1c1wiIHRhYkluZGV4PVwiLTFcIj5cbiAgICAgICAge3RoaXMucHJvcHMgPyAoXG4gICAgICAgICAgPE1haW5Db21wb25lbnRcbiAgICAgICAgICAgIGdyb3Vwcz17Z3JvdXBzfVxuICAgICAgICAgICAgcHJvamVjdHM9e3Byb2plY3RzfVxuICAgICAgICAgICAgb25TZWxlY3RQcm9qZWN0PXtwcm9qZWN0ID0+XG4gICAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KCdtYWluLXNlbGVjdC1wcm9qZWN0JywgcHJvamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFbXB0eUNvbXBvbmVudFxuICAgICAgICAgICAgbG9hZGluZz17dGhpcy5sb2FkaW5nfVxuICAgICAgICAgICAgb25DcmVhdGU9eygpID0+IHRoaXMuaGFuZGxlQ3JlYXRlKCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWREZXN0cm95IChjYWxsYmFjaykge1xuICAgIHJldHVybiB0aGlzLmVtaXR0ZXIub24oRU1JVFRFUi5FUlJPUiwgY2FsbGJhY2spO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIG9uRGlkU2VsZWN0UHJvamVjdCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ21haW4tc2VsZWN0LXByb2plY3QnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgaGFuZGxlVXBkYXRlIChjb250ZW50KSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuICAgIGNvbnN0IG1hcHBpbmcgPSB7fTtcbiAgICBjb250ZW50LmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2UgPSB2YWx1ZS5tb2RlbDtcblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgcmVzb3VyY2UuZ3JvdXBzID0gW107XG4gICAgICAgIHJlc291cmNlLnByb2plY3RzID0gW107XG4gICAgICB9XG4gICAgICBtYXBwaW5nW3ZhbHVlLm1vZGVsLmlkXSA9IHtcbiAgICAgICAgLi4ucmVzb3VyY2UsXG4gICAgICAgIGV4cGFuZGVkOiB2YWx1ZS5leHBhbmRlZFxuICAgICAgfTtcblxuICAgICAgaWYgKHZhbHVlLnBhcmVudElkICYmIHZhbHVlLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgbWFwcGluZ1t2YWx1ZS5wYXJlbnRJZF0uZ3JvdXBzLnB1c2gobWFwcGluZ1t2YWx1ZS5tb2RlbC5pZF0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsdWUucGFyZW50SWQgJiYgdmFsdWUudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIG1hcHBpbmdbdmFsdWUucGFyZW50SWRdLnByb2plY3RzLnB1c2gobWFwcGluZ1t2YWx1ZS5tb2RlbC5pZF0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIXZhbHVlLnBhcmVudElkICYmIHZhbHVlLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgZGF0YS5ncm91cHMucHVzaChtYXBwaW5nW3ZhbHVlLm1vZGVsLmlkXSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghdmFsdWUucGFyZW50SWQgJiYgdmFsdWUudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGRhdGEucHJvamVjdHMucHVzaChtYXBwaW5nW3ZhbHVlLm1vZGVsLmlkXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZShkYXRhKTtcbiAgfVxufVxuIl19