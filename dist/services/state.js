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
   * @param {boolean} parentId - indicates if this level is the root
   * @returns {number} the id of the deserialized group
   */
  deserializeGroupAndReturnId(entry, isRoot, parentId) {
    const id = isRoot ? NaN : entry.id || (0, _uuid2.default)();
    const type = 'group';
    const name = isRoot ? {} : { name: entry.name };
    const icon = entry.icon || '';
    const childrenIds = [];

    entry.groups.forEach(group => childrenIds.push(this.deserializeGroupAndReturnId(group, false, id)));

    entry.projects.forEach(project => childrenIds.push(this.deserializeProjectAndReturnId(project, id)));

    const group = _extends({
      type,
      parentId: isRoot ? undefined : parentId
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
   * @param {Object} parentId - an object already validated with project content
   * @returns {number} the id of the deserialized project
   */
  deserializeProjectAndReturnId(entry, parentId) {
    const id = entry.id || (0, _uuid2.default)();
    const type = 'project';
    const name = entry.name;
    const icon = entry.icon || '';
    const paths = entry.paths || [];

    const project = {
      type,
      parentId,
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
    const group = this.getEntry(id || NaN);

    group.childrenIds.forEach(childId => {
      const entry = this.getEntry(childId);

      if (entry.type === 'group') {
        const serializedLevel = this.serializeGroupById(childId);

        level.groups.push(_extends({
          id: childId,
          parentId: id,
          name: entry.name,
          icon: entry.icon,
          order: entry.order,
          folding: entry.folding
        }, serializedLevel));
      } else if (entry.type === 'project') {
        level.projects.push({
          id: childId,
          parentId: id,
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
    const entry = this.getEntry(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, _extends({}, entry, state));
  }

  /* eslint-disable-next-line require-jsdoc */
  getEntry(id) {
    return this.mapping.get(id);
  }

  /* eslint-disable-next-line require-jsdoc */
  deleteEntry(id) {
    const entry = this.getEntry(id);

    if (entry.type === 'group') {
      entry.groups.forEach(groupId => this.deleteEntry(groupId));
      entry.projects.forEach(projectId => this.deleteEntry(projectId));
    }

    if (entry.parentId) {
      const group = this.getEntry(entry.parentId);
      const idx = group.childrenIds.indexOf(id);
      group.childrenIds.splice(idx, 1);
      this.fullOrParcialUpdateExistingEntry(entry.parentId, group);
    }

    this.mapping.delete(id);
    this.emitter.emit('did-change-state');
  }

  /**
   * Given an group id it will search all projects underneath it
   * @param {number} groupId - the group id to search for projects
   * @param {array} list - the container for all projects
   * @returns {array} the container for all projects
   */
  getProjectsInGroup(groupId, list = []) {
    const group = this.getEntry(groupId || NaN);

    if (group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      const entry = this.getEntry(entryId);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJwYXJlbnRJZCIsImlkIiwiTmFOIiwidHlwZSIsIm5hbWUiLCJpY29uIiwiY2hpbGRyZW5JZHMiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwicHJvamVjdHMiLCJwcm9qZWN0IiwiZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQiLCJ1bmRlZmluZWQiLCJvcmRlciIsImZvbGRpbmciLCJzZXQiLCJwYXRocyIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsImxldmVsIiwiZ2V0RW50cnkiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJzdGF0ZSIsIkVycm9yIiwiZ2V0IiwiZGVsZXRlRW50cnkiLCJncm91cElkIiwicHJvamVjdElkIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImVtaXQiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJsaXN0IiwicmVkdWNlIiwiYWNjIiwiZW50cnlJZCIsImluaXRpYWxpemVTdGF0ZSIsImN1cnJlbnRTdGF0ZSIsIm9uRGlkQ2hhbmdlU3RhdGUiLCJjYiIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTtBQUNBLE1BQU1BLEtBQU4sQ0FBWTtBQUNWO0FBQ0FDLGdCQUFjO0FBQ1osU0FBS0MsT0FBTCxHQUFlLElBQUlDLEdBQUosRUFBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxhQUFKLEVBQWY7QUFDRDs7QUFFRDs7O0FBR0FDLGVBQWM7QUFDWjtBQUNBLFNBQUtKLE9BQUwsQ0FBYUss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QUF4TVM7O0FBMk1aO2tCQUNlLElBQUl2RCxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIC8vIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5tYXBwaW5nLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50SWQgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gaXNSb290ID8gTmFOIDogZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IHR5cGUgPSAnZ3JvdXAnO1xuICAgIGNvbnN0IG5hbWUgPSBpc1Jvb3QgPyB7fSA6IHsgbmFtZTogZW50cnkubmFtZSB9O1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IGNoaWxkcmVuSWRzID0gW107XG5cbiAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChncm91cCwgZmFsc2UsIGlkKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCwgaWQpKVxuICAgICk7XG5cbiAgICBjb25zdCBncm91cCA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBwYXJlbnRJZDogaXNSb290ID8gdW5kZWZpbmVkIDogcGFyZW50SWQsXG4gICAgICAuLi5uYW1lLFxuICAgICAgaWNvbixcbiAgICAgIG9yZGVyOiBlbnRyeS5vcmRlciB8fCAnYWxwaGFiZXRpY2FsbHknLFxuICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyB8fCAnY29sbGFwc2VkJyxcbiAgICAgIGNoaWxkcmVuSWRzXG4gICAgfTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGdyb3VwKTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudElkIC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIHByb2plY3RcbiAgICovXG4gIGRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIChlbnRyeSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ3Byb2plY3QnO1xuICAgIGNvbnN0IG5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IHBhdGhzID0gZW50cnkucGF0aHMgfHwgW107XG5cbiAgICBjb25zdCBwcm9qZWN0ID0ge1xuICAgICAgdHlwZSxcbiAgICAgIHBhcmVudElkLFxuICAgICAgbmFtZSxcbiAgICAgIGljb24sXG4gICAgICBwYXRoc1xuICAgIH07XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBwcm9qZWN0KTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzdGF0ZSB0byBzdG9yZSBpbiBjYWNoZSBvciBmaWxlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjdXJyZW50IGlkIG9mIHRoZSBncm91cCAoTmFOIGZvciByb290KVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoaWQgfHwgTmFOKTtcblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQpO1xuXG4gICAgICAgIGxldmVsLmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFyY2lhbGx5IG9yIGZ1bGx5IGFuIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gdGhlIG5ldyBzdGF0ZSAocGFydGlhbCBwYXJhbWV0ZXJzIG9yIGFsbCBvZiB0aGVtKVxuICAgKi9cbiAgZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkgKGlkLCBzdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhpc3RpbmdfZW50cnknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCB7XG4gICAgICAuLi5lbnRyeSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRFbnRyeSAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nLmdldChpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGVudHJ5Lmdyb3Vwcy5mb3JFYWNoKGdyb3VwSWQgPT4gdGhpcy5kZWxldGVFbnRyeShncm91cElkKSk7XG4gICAgICBlbnRyeS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3RJZCA9PiB0aGlzLmRlbGV0ZUVudHJ5KHByb2plY3RJZCkpO1xuICAgIH1cblxuICAgIGlmIChlbnRyeS5wYXJlbnRJZCkge1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICAgIGNvbnN0IGlkeCA9IGdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YoaWQpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW5JZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBncm91cCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXBwaW5nLmRlbGV0ZShpZCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgcHJvamVjdHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIHByb2plY3RzXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICovXG4gIGdldFByb2plY3RzSW5Hcm91cCAoZ3JvdXBJZCwgbGlzdCA9IFtdKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGdyb3VwSWQgfHwgTmFOKTtcblxuICAgIGlmIChncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICB0aGlzLmdldFByb2plY3RzSW5Hcm91cChlbnRyeUlkLCBhY2MpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBpZDogZW50cnlJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBsaXN0KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGluaXRpYWxpemVTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDaGFuZ2VTdGF0ZSAoY2IpIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2Utc3RhdGUnLCBjYik7XG4gIH1cbn1cblxuLy8gc2FtZSBpbnN0YW5jZSBpcyBzaGFyZWQgYWNyb3NzIHRoZSBwYWNrYWdlXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RhdGUoKTtcbiJdfQ==