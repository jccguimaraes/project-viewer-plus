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
      folding: entry.folding || 'collapsed',
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
          folding: entry.folding
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
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJpZCIsIk5hTiIsInR5cGUiLCJuYW1lIiwiaWNvbiIsImNoaWxkcmVuSWRzIiwiZ3JvdXBzIiwiZm9yRWFjaCIsImdyb3VwIiwicHVzaCIsInByb2plY3RzIiwicHJvamVjdCIsImRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIiwib3JkZXIiLCJmb2xkaW5nIiwic2V0IiwicGF0aHMiLCJzZXJpYWxpemVHcm91cEJ5SWQiLCJsZXZlbCIsImdldCIsImNoaWxkSWQiLCJzZXJpYWxpemVkTGV2ZWwiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInN0YXRlIiwiRXJyb3IiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJncm91cElkIiwibGlzdCIsInJlZHVjZSIsImFjYyIsImVudHJ5SWQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJlbWl0Iiwib25EaWRDaGFuZ2VTdGF0ZSIsImNiIiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBO0FBQ0EsTUFBTUEsS0FBTixDQUFZO0FBQ1Y7QUFDQUMsZ0JBQWM7QUFDWixTQUFLQyxPQUFMLEdBQWUsSUFBSUMsR0FBSixFQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjtBQUNEOztBQUVEOzs7QUFHQUMsZUFBYztBQUNaO0FBQ0EsU0FBS0osT0FBTCxDQUFhSyxLQUFiO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQUMsOEJBQTZCQyxLQUE3QixFQUFvQ0MsTUFBcEMsRUFBNEM7QUFDMUMsVUFBTUMsS0FBS0QsU0FBU0UsR0FBVCxHQUFl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QW9DRCxFQUFwQztBQUNEO0FBektTOztBQTRLWjtrQkFDZSxJQUFJOUMsS0FBSixFIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuY2xhc3MgU3RhdGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXBwaW5nID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBtYXBwaW5nXG4gICAqL1xuICBkZWFjdGl2YXRlICgpIHtcbiAgICAvLyB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMubWFwcGluZy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuIEluIGNhc2Ugb2YgdGhlIHJvb3RcbiAgICogbGV2ZWwsIHRoZSBvYmplY3QgaXMgc3RvcmVkIHdpdGggdGhlIFwiaWRcIiBOYU4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIGdyb3VwIGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1Jvb3QgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290KSB7XG4gICAgY29uc3QgaWQgPSBpc1Jvb3QgPyBOYU4gOiBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgdHlwZSA9ICdncm91cCc7XG4gICAgY29uc3QgbmFtZSA9IGlzUm9vdCA/IHt9IDogeyBuYW1lOiBlbnRyeS5uYW1lIH07XG4gICAgY29uc3QgaWNvbiA9IGVudHJ5Lmljb24gfHwgJyc7XG4gICAgY29uc3QgY2hpbGRyZW5JZHMgPSBbXTtcblxuICAgIGVudHJ5Lmdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGdyb3VwKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCkpXG4gICAgKTtcblxuICAgIGNvbnN0IGdyb3VwID0ge1xuICAgICAgdHlwZSxcbiAgICAgIC4uLm5hbWUsXG4gICAgICBpY29uLFxuICAgICAgb3JkZXI6IGVudHJ5Lm9yZGVyIHx8ICdhbHBoYWJldGljYWxseScsXG4gICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nIHx8ICdjb2xsYXBzZWQnLFxuICAgICAgY2hpbGRyZW5JZHNcbiAgICB9O1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZ3JvdXApO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBwcm9qZWN0XG4gICAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCAoZW50cnkpIHtcbiAgICBjb25zdCBpZCA9IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ3Byb2plY3QnO1xuICAgIGNvbnN0IG5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IHBhdGhzID0gZW50cnkucGF0aHMgfHwgW107XG5cbiAgICBjb25zdCBwcm9qZWN0ID0ge1xuICAgICAgdHlwZSxcbiAgICAgIG5hbWUsXG4gICAgICBpY29uLFxuICAgICAgcGF0aHNcbiAgICB9O1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgcHJvamVjdCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc3RhdGUgdG8gc3RvcmUgaW4gY2FjaGUgb3IgZmlsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY3VycmVudCBpZCBvZiB0aGUgZ3JvdXAgKE5hTiBmb3Igcm9vdClcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZUdyb3VwQnlJZCAoaWQpIHtcbiAgICBjb25zdCBsZXZlbCA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLm1hcHBpbmcuZ2V0KGlkIHx8IE5hTik7XG5cbiAgICBncm91cC5jaGlsZHJlbklkcy5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLm1hcHBpbmcuZ2V0KGNoaWxkSWQpO1xuXG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkTGV2ZWwgPSB0aGlzLnNlcmlhbGl6ZUdyb3VwQnlJZChjaGlsZElkKTtcblxuICAgICAgICBsZXZlbC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNoaWxkSWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwYXJjaWFsbHkgb3IgZnVsbHkgYW4gZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgLSB0aGUgbmV3IHN0YXRlIChwYXJ0aWFsIHBhcmFtZXRlcnMgb3IgYWxsIG9mIHRoZW0pXG4gICAqL1xuICBmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSAoaWQsIHN0YXRlKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm1hcHBpbmcuZ2V0KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGlzdGluZ19lbnRyeScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHtcbiAgICAgIC4uLmVudHJ5LFxuICAgICAgLi4uc3RhdGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgcHJvamVjdHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIHByb2plY3RzXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICovXG4gIGdldFByb2plY3RzSW5Hcm91cCAoZ3JvdXBJZCwgbGlzdCA9IFtdKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLm1hcHBpbmcuZ2V0KGdyb3VwSWQgfHwgTmFOKTtcblxuICAgIGlmIChncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMubWFwcGluZy5nZXQoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICB0aGlzLmdldFByb2plY3RzSW5Hcm91cChlbnRyeUlkLCBhY2MpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBpZDogZW50cnlJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBsaXN0KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGluaXRpYWxpemVTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDaGFuZ2VTdGF0ZSAoY2IpIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2Utc3RhdGUnLCBjYik7XG4gIH1cbn1cblxuLy8gc2FtZSBpbnN0YW5jZSBpcyBzaGFyZWQgYWNyb3NzIHRoZSBwYWNrYWdlXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RhdGUoKTtcbiJdfQ==