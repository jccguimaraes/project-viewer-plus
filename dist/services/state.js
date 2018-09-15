'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _atom = require('atom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line */
class State {
  /* eslint-disable-next-line */
  constructor() {
    this.mapping = new Map();
    this.emitter = new _atom.Emitter();
  }

  /**
   * Clears the mapping
   */
  deactivate() {
    // this.emitter.dispose();
    this.mapping.clear();
  }

  /**
   * Stores in the Map an object with valid group content. In case of the root
   * level, the object is stored with the "id" NaN.
   * @param {Object} entry - an object already validated with group content
   * @param {boolean} isRoot - indicates if this level is the root
   * @returns {number} the id of the deserialized group
   */
  deserializeGroupAndReturnId(entry, isRoot) {
    const id = isRoot ? NaN : entry.id || (0, _uuid2.default)();
    const type = 'group';
    const name = isRoot ? {} : { name: entry.name };
    const icon = entry.icon || '';
    const childrenIds = [];

    entry.groups.forEach(group => childrenIds.push(this.deserializeGroupAndReturnId(group)));

    entry.projects.forEach(project => childrenIds.push(this.deserializeProjectAndReturnId(project)));

    const group = _extends({
      type
    }, name, {
      icon,
      order: entry.order || 'alphabetically',
      expanded: entry.expanded || false,
      childrenIds
    });

    this.mapping.set(id, group);

    return id;
  }

  /**
   * Stores in the Map an object with valid group content.
   * @param {Object} entry - an object already validated with project content
   * @returns {number} the id of the deserialized project
   */
  deserializeProjectAndReturnId(entry) {
    const id = entry.id || (0, _uuid2.default)();
    const type = 'project';
    const name = entry.name;
    const icon = entry.icon || '';
    const paths = entry.paths || [];

    const project = {
      type,
      name,
      icon,
      paths
    };

    this.mapping.set(id, project);

    return id;
  }

  /**
   * Parse state to store in cache or file
   * @param {number} id - the current id of the group (NaN for root)
   * @returns {Object} the serialized state
   */
  serializeGroupById(id) {
    const level = { groups: [], projects: [] };
    const group = this.mapping.get(id || NaN);

    group.childrenIds.forEach(childId => {
      const entry = this.mapping.get(childId);

      if (entry.type === 'group') {
        const serializedLevel = this.serializeGroupById(childId);

        level.groups.push(_extends({
          id: childId,
          name: entry.name,
          icon: entry.icon,
          order: entry.order,
          expanded: entry.expanded
        }, serializedLevel));
      } else if (entry.type === 'project') {
        level.projects.push({
          id: childId,
          name: entry.name,
          icon: entry.icon,
          paths: entry.paths
        });
      }
    });

    return level;
  }

  /**
   * Update parcially or fully an existing entry
   * @param {string} id - the id of the existing entry
   * @param {string} state - the new state (partial parameters or all of them)
   */
  fullOrParcialUpdateExistingEntry(id, state) {
    const entry = this.mapping.get(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, _extends({}, entry, state));
  }

  /**
   * Given an group id it will search all projects underneath it
   * @param {number} groupId - the group id to search for projects
   * @param {array} list - the container for all projects
   * @returns {array} the container for all projects
   */
  getProjectsInGroup(groupId, list = []) {
    const group = this.mapping.get(groupId || NaN);

    if (group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      const entry = this.mapping.get(entryId);
      if (entry.type === 'group') {
        this.getProjectsInGroup(entryId, acc);
      } else {
        acc.push({
          id: entryId,
          name: entry.name,
          paths: entry.paths
        });
      }

      return acc;
    }, list);
  }

  /* eslint-disable-next-line require-jsdoc */
  initializeState(currentState) {
    this.deserializeGroupAndReturnId(currentState, true);
    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  onDidChangeState(cb) {
    this.emitter.on('did-change-state', cb);
  }
}

// same instance is shared across the package
exports.default = new State();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJpZCIsIk5hTiIsInR5cGUiLCJuYW1lIiwiaWNvbiIsImNoaWxkcmVuSWRzIiwiZ3JvdXBzIiwiZm9yRWFjaCIsImdyb3VwIiwicHVzaCIsInByb2plY3RzIiwicHJvamVjdCIsImRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIiwib3JkZXIiLCJleHBhbmRlZCIsInNldCIsInBhdGhzIiwic2VyaWFsaXplR3JvdXBCeUlkIiwibGV2ZWwiLCJnZXQiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJzdGF0ZSIsIkVycm9yIiwiZ2V0UHJvamVjdHNJbkdyb3VwIiwiZ3JvdXBJZCIsImxpc3QiLCJyZWR1Y2UiLCJhY2MiLCJlbnRyeUlkIiwiaW5pdGlhbGl6ZVN0YXRlIiwiY3VycmVudFN0YXRlIiwiZW1pdCIsIm9uRGlkQ2hhbmdlU3RhdGUiLCJjYiIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTtBQUNBLE1BQU1BLEtBQU4sQ0FBWTtBQUNWO0FBQ0FDLGdCQUFjO0FBQ1osU0FBS0MsT0FBTCxHQUFlLElBQUlDLEdBQUosRUFBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7QUFDRDs7QUFFRDs7O0FBR0FDLGVBQWM7QUFDWjtBQUNBLFNBQUtKLE9BQUwsQ0FBYUssS0FBYjtBQUNEOztBQUVEOzs7Ozs7O0FBT0FDLDhCQUE2QkMsS0FBN0IsRUFBb0NDLE1BQXBDLEVBQTRDO0FBQzFDLFVBQU1DLEtBQUtELFNBQVNFLEdBQVQsR0FB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RUFBb0NELEVBQXBDO0FBQ0Q7QUF6S1M7O0FBNEtaO2tCQUNlLElBQUk5QyxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIC8vIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5tYXBwaW5nLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIGdyb3VwXG4gICAqL1xuICBkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQgKGVudHJ5LCBpc1Jvb3QpIHtcbiAgICBjb25zdCBpZCA9IGlzUm9vdCA/IE5hTiA6IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ2dyb3VwJztcbiAgICBjb25zdCBuYW1lID0gaXNSb290ID8ge30gOiB7IG5hbWU6IGVudHJ5Lm5hbWUgfTtcbiAgICBjb25zdCBpY29uID0gZW50cnkuaWNvbiB8fCAnJztcbiAgICBjb25zdCBjaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZW50cnkuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoZ3JvdXApKVxuICAgICk7XG5cbiAgICBlbnRyeS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZChwcm9qZWN0KSlcbiAgICApO1xuXG4gICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICB0eXBlLFxuICAgICAgLi4ubmFtZSxcbiAgICAgIGljb24sXG4gICAgICBvcmRlcjogZW50cnkub3JkZXIgfHwgJ2FscGhhYmV0aWNhbGx5JyxcbiAgICAgIGV4cGFuZGVkOiBlbnRyeS5leHBhbmRlZCB8fCBmYWxzZSxcbiAgICAgIGNoaWxkcmVuSWRzXG4gICAgfTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGdyb3VwKTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGlkIG9mIHRoZSBkZXNlcmlhbGl6ZWQgcHJvamVjdFxuICAgKi9cbiAgZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQgKGVudHJ5KSB7XG4gICAgY29uc3QgaWQgPSBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgdHlwZSA9ICdwcm9qZWN0JztcbiAgICBjb25zdCBuYW1lID0gZW50cnkubmFtZTtcbiAgICBjb25zdCBpY29uID0gZW50cnkuaWNvbiB8fCAnJztcbiAgICBjb25zdCBwYXRocyA9IGVudHJ5LnBhdGhzIHx8IFtdO1xuXG4gICAgY29uc3QgcHJvamVjdCA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBuYW1lLFxuICAgICAgaWNvbixcbiAgICAgIHBhdGhzXG4gICAgfTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHByb2plY3QpO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHN0YXRlIHRvIHN0b3JlIGluIGNhY2hlIG9yIGZpbGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGN1cnJlbnQgaWQgb2YgdGhlIGdyb3VwIChOYU4gZm9yIHJvb3QpXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBzZXJpYWxpemVkIHN0YXRlXG4gICAqL1xuICBzZXJpYWxpemVHcm91cEJ5SWQgKGlkKSB7XG4gICAgY29uc3QgbGV2ZWwgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5tYXBwaW5nLmdldChpZCB8fCBOYU4pO1xuXG4gICAgZ3JvdXAuY2hpbGRyZW5JZHMuZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5tYXBwaW5nLmdldChjaGlsZElkKTtcblxuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZExldmVsID0gdGhpcy5zZXJpYWxpemVHcm91cEJ5SWQoY2hpbGRJZCk7XG5cbiAgICAgICAgbGV2ZWwuZ3JvdXBzLnB1c2goe1xuICAgICAgICAgIGlkOiBjaGlsZElkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgaWNvbjogZW50cnkuaWNvbixcbiAgICAgICAgICBvcmRlcjogZW50cnkub3JkZXIsXG4gICAgICAgICAgZXhwYW5kZWQ6IGVudHJ5LmV4cGFuZGVkLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwYXJjaWFsbHkgb3IgZnVsbHkgYW4gZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgLSB0aGUgbmV3IHN0YXRlIChwYXJ0aWFsIHBhcmFtZXRlcnMgb3IgYWxsIG9mIHRoZW0pXG4gICAqL1xuICBmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSAoaWQsIHN0YXRlKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm1hcHBpbmcuZ2V0KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGlzdGluZ19lbnRyeScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHtcbiAgICAgIC4uLmVudHJ5LFxuICAgICAgLi4uc3RhdGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgcHJvamVjdHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIHByb2plY3RzXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICovXG4gIGdldFByb2plY3RzSW5Hcm91cCAoZ3JvdXBJZCwgbGlzdCA9IFtdKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLm1hcHBpbmcuZ2V0KGdyb3VwSWQgfHwgTmFOKTtcblxuICAgIGlmIChncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMubWFwcGluZy5nZXQoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICB0aGlzLmdldFByb2plY3RzSW5Hcm91cChlbnRyeUlkLCBhY2MpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBpZDogZW50cnlJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBsaXN0KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGluaXRpYWxpemVTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDaGFuZ2VTdGF0ZSAoY2IpIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2Utc3RhdGUnLCBjYik7XG4gIH1cbn1cblxuLy8gc2FtZSBpbnN0YW5jZSBpcyBzaGFyZWQgYWNyb3NzIHRoZSBwYWNrYWdlXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RhdGUoKTtcbiJdfQ==