'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _atom = require('atom');

var _base = require('../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-next-line require-jsdoc */
class State {
  /* eslint-disable-next-line require-jsdoc */
  constructor() {
    this.mapping = new Map();
    this.emitter = new _atom.Emitter();
  }

  /**
   * Clears the mapping
   */
  deactivate() {
    // this.emitter.dispose();
    this.clearState();
    this.emitter.emit('did-change-state');
  }

  /**
   * Clears the mapping
   */
  clearState() {
    this.mapping.clear();
  }

  /* eslint-disable-next-line require-jsdoc */
  createGroup(entry = {}, childrenIds = [], parentId = NaN) {
    return {
      type: 'group',
      name: entry.name || '',
      icon: entry.icon || '',
      order: entry.order || 'alphabetically',
      folding: entry.folding || 'collapsed',
      childrenIds,
      parentId
    };
  }

  /* eslint-disable-next-line require-jsdoc */
  createProject(entry = {}, parentId = NaN) {
    return {
      type: 'project',
      name: entry.name || '',
      icon: entry.icon || '',
      paths: entry.paths || [],
      parentId
    };
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
    const childrenIds = [];

    entry.groups.forEach(group => childrenIds.push(this.deserializeGroupAndReturnId(group, false, id)));

    entry.projects.forEach(project => childrenIds.push(this.deserializeProjectAndReturnId(project, id)));

    const group = this.createGroup(entry, childrenIds, isRoot ? undefined : parentId);

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
    const project = this.createProject(entry, parentId);

    this.mapping.set(id, project);

    return id;
  }

  /**
   * Parse state to store in cache or file
   * @param {number} id - the current id of the group (NaN for root)
   * @param {boolean} withContext - false for saving to file
   * @returns {Object} the serialized state
   */
  serializeGroupById(id, withContext = true) {
    const level = { groups: [], projects: [] };
    const group = this.getEntry(id || NaN);

    group.childrenIds.forEach(childId => {
      const entry = this.getEntry(childId);

      if (entry.type === 'group') {
        const serializedLevel = this.serializeGroupById(childId, withContext);

        level.groups.push(_extends({}, withContext ? { id: childId } : {}, withContext ? { parentId: id } : {}, {
          name: entry.name,
          icon: entry.icon,
          order: entry.order
        }, withContext ? { folding: entry.folding } : {}, serializedLevel));
      } else if (entry.type === 'project') {
        level.projects.push(_extends({}, withContext ? { id: childId } : {}, withContext ? { parentId: id } : {}, {
          name: entry.name,
          icon: entry.icon,
          paths: entry.paths
        }));
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
      entry.childrenIds.forEach(childId => this.deleteEntry(childId));
    }

    if (entry.parentId || isNaN(entry.parentId)) {
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
  editEntry(id, entry) {
    this.fullOrParcialUpdateExistingEntry(id, entry);
    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  addEntry(entry) {
    if (!entry) {
      return;
    }

    const id = (0, _uuid2.default)();

    this.mapping.set(id, entry);
    const parent = this.getEntry(entry.parentId);
    parent.childrenIds.push(id);
    this.fullOrParcialUpdateExistingEntry(entry.parentId, parent);

    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  setParentOfEntry(entryId, parentId = NaN) {
    if (entryId === parentId || entryId === _base.DOCK_URI) {
      return;
    }
    const entry = this.getEntry(entryId);
    const oldParent = this.getEntry(entry.parentId);

    let newParent = this.getEntry(parentId);

    if (newParent.type === 'project') {
      parentId = newParent.parentId;
      newParent = this.getEntry(newParent.parentId);
    }

    oldParent.childrenIds.splice(oldParent.childrenIds.indexOf(entryId), 1);

    newParent.childrenIds.push(entryId);

    entry.parentId = parentId;

    this.fullOrParcialUpdateExistingEntry(entryId, entry);
    this.fullOrParcialUpdateExistingEntry(entry.parentId, oldParent);
    this.fullOrParcialUpdateExistingEntry(parentId, newParent);

    this.emitter.emit('did-change-state');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyU3RhdGUiLCJlbWl0IiwiY2xlYXIiLCJjcmVhdGVHcm91cCIsImVudHJ5IiwiY2hpbGRyZW5JZHMiLCJwYXJlbnRJZCIsIk5hTiIsInR5cGUiLCJuYW1lIiwiaWNvbiIsIm9yZGVyIiwiZm9sZGluZyIsImNyZWF0ZVByb2plY3QiLCJwYXRocyIsImRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZCIsImlzUm9vdCIsImlkIiwiZ3JvdXBzIiwiZm9yRWFjaCIsImdyb3VwIiwicHVzaCIsInByb2plY3RzIiwicHJvamVjdCIsImRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIiwidW5kZWZpbmVkIiwic2V0Iiwic2VyaWFsaXplR3JvdXBCeUlkIiwid2l0aENvbnRleHQiLCJsZXZlbCIsImdldEVudHJ5IiwiY2hpbGRJZCIsInNlcmlhbGl6ZWRMZXZlbCIsImZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5Iiwic3RhdGUiLCJFcnJvciIsImdldCIsImRlbGV0ZUVudHJ5IiwiaXNOYU4iLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiZGVsZXRlIiwiZ2V0UHJvamVjdHNJbkdyb3VwIiwiZ3JvdXBJZCIsImxpc3QiLCJyZWR1Y2UiLCJhY2MiLCJlbnRyeUlkIiwiZWRpdEVudHJ5IiwiYWRkRW50cnkiLCJwYXJlbnQiLCJzZXRQYXJlbnRPZkVudHJ5IiwiRE9DS19VUkkiLCJvbGRQYXJlbnQiLCJuZXdQYXJlbnQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwiY2IiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBRUE7QUFDQSxNQUFNQSxLQUFOLENB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RSxRQUFwQixDQUFsQjs7QUFFQSxRQUFJaUQsWUFBWSxLQUFLekIsUUFBTCxDQUFjeEIsUUFBZCxDQUFoQjs7QUFFQSxRQUFJaUQsVUFBVS9DLElBQVYsS0FBbUIsU0FBdkIsRUFBa0M7QUFDaENGLGlCQUFXaUQsVUFBVWpELFFBQXJCO0FBQ0FpRCxrQkFBWSxLQUFLekIsUUFBTCxDQUFjeUIsVUFBVWpELFFBQXhCLENBQVo7QUFDRDs7QUFFRGdELGNBQVVqRCxXQUFWLENBQXNCb0MsTUFBdEIsQ0FBNkJhLFVBQVVqRCxXQUFWLENBQXNCbUMsT0FBdEIsQ0FBOEJRLE9BQTlCLENBQTdCLEVBQXFFLENBQXJFOztBQUVBTyxjQUFVbEQsV0FBVixDQUFzQmdCLElBQXRCLENBQTJCMkIsT0FBM0I7O0FBRUE1QyxVQUFNRSxRQUFOLEdBQWlCQSxRQUFqQjs7QUFFQSxTQUFLMkIsZ0NBQUwsQ0FBc0NlLE9BQXRDLEVBQStDNUMsS0FBL0M7QUFDQSxTQUFLNkIsZ0NBQUwsQ0FBc0M3QixNQUFNRSxRQUE1QyxFQUFzRGdELFNBQXREO0FBQ0EsU0FBS3JCLGdDQUFMLENBQXNDM0IsUUFBdEMsRUFBZ0RpRCxTQUFoRDs7QUFFQSxTQUFLMUQsT0FBTCxDQUFhSSxJQUFiLENBQWtCLGtCQUFsQjtBQUNEOztBQUVEO0FBQ0F1RCxrQkFBaUJDLFlBQWpCLEVBQStCO0FBQzdCLFNBQUsxQywyQkFBTCxDQUFpQzBDLFlBQWpDLEVBQStDLElBQS9DO0FBQ0EsU0FBSzVELE9BQUwsQ0FBYUksSUFBYixDQUFrQixrQkFBbEI7QUFDRDs7QUFFRDtBQUNBeUQsbUJBQWtCQyxFQUFsQixFQUFzQjtBQUNwQixTQUFLOUQsT0FBTCxDQUFhK0QsRUFBYixDQUFnQixrQkFBaEIsRUFBb0NELEVBQXBDO0FBQ0Q7QUF4UVM7O0FBMlFaO2tCQUNlLElBQUlsRSxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuaW1wb3J0IHsgRE9DS19VUkkgfSBmcm9tICcuLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIC8vIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5jbGVhclN0YXRlKCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGNsZWFyU3RhdGUgKCkge1xuICAgIHRoaXMubWFwcGluZy5jbGVhcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlR3JvdXAgKGVudHJ5ID0ge30sIGNoaWxkcmVuSWRzID0gW10sIHBhcmVudElkID0gTmFOKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICBuYW1lOiBlbnRyeS5uYW1lIHx8ICcnLFxuICAgICAgaWNvbjogZW50cnkuaWNvbiB8fCAnJyxcbiAgICAgIG9yZGVyOiBlbnRyeS5vcmRlciB8fCAnYWxwaGFiZXRpY2FsbHknLFxuICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyB8fCAnY29sbGFwc2VkJyxcbiAgICAgIGNoaWxkcmVuSWRzLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlUHJvamVjdCAoZW50cnkgPSB7fSwgcGFyZW50SWQgPSBOYU4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3Byb2plY3QnLFxuICAgICAgbmFtZTogZW50cnkubmFtZSB8fCAnJyxcbiAgICAgIGljb246IGVudHJ5Lmljb24gfHwgJycsXG4gICAgICBwYXRoczogZW50cnkucGF0aHMgfHwgW10sXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50SWQgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gaXNSb290ID8gTmFOIDogZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuSWRzID0gW107XG5cbiAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChncm91cCwgZmFsc2UsIGlkKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCwgaWQpKVxuICAgICk7XG5cbiAgICBjb25zdCBncm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoXG4gICAgICBlbnRyeSxcbiAgICAgIGNoaWxkcmVuSWRzLFxuICAgICAgaXNSb290ID8gdW5kZWZpbmVkIDogcGFyZW50SWRcbiAgICApO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZ3JvdXApO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50SWQgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGlkIG9mIHRoZSBkZXNlcmlhbGl6ZWQgcHJvamVjdFxuICAgKi9cbiAgZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQgKGVudHJ5LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLmNyZWF0ZVByb2plY3QoZW50cnksIHBhcmVudElkKTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHByb2plY3QpO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHN0YXRlIHRvIHN0b3JlIGluIGNhY2hlIG9yIGZpbGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGN1cnJlbnQgaWQgb2YgdGhlIGdyb3VwIChOYU4gZm9yIHJvb3QpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aENvbnRleHQgLSBmYWxzZSBmb3Igc2F2aW5nIHRvIGZpbGVcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZUdyb3VwQnlJZCAoaWQsIHdpdGhDb250ZXh0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoaWQgfHwgTmFOKTtcblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQsIHdpdGhDb250ZXh0KTtcblxuICAgICAgICBsZXZlbC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IGlkOiBjaGlsZElkIH0gOiB7fSxcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgcGFyZW50SWQ6IGlkIH0gOiB7fSxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgb3JkZXI6IGVudHJ5Lm9yZGVyLFxuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nIH0gOiB7fSxcbiAgICAgICAgICAuLi5zZXJpYWxpemVkTGV2ZWxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgbGV2ZWwucHJvamVjdHMucHVzaCh7XG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IGlkOiBjaGlsZElkIH0gOiB7fSxcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgcGFyZW50SWQ6IGlkIH0gOiB7fSxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwYXJjaWFsbHkgb3IgZnVsbHkgYW4gZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgLSB0aGUgbmV3IHN0YXRlIChwYXJ0aWFsIHBhcmFtZXRlcnMgb3IgYWxsIG9mIHRoZW0pXG4gICAqL1xuICBmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSAoaWQsIHN0YXRlKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGlzdGluZ19lbnRyeScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHtcbiAgICAgIC4uLmVudHJ5LFxuICAgICAgLi4uc3RhdGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEVudHJ5IChpZCkge1xuICAgIHJldHVybiB0aGlzLm1hcHBpbmcuZ2V0KGlkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlbGV0ZUVudHJ5IChpZCkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgZW50cnkuY2hpbGRyZW5JZHMuZm9yRWFjaChjaGlsZElkID0+IHRoaXMuZGVsZXRlRW50cnkoY2hpbGRJZCkpO1xuICAgIH1cblxuICAgIGlmIChlbnRyeS5wYXJlbnRJZCB8fCBpc05hTihlbnRyeS5wYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG4gICAgICBjb25zdCBpZHggPSBncm91cC5jaGlsZHJlbklkcy5pbmRleE9mKGlkKTtcbiAgICAgIGdyb3VwLmNoaWxkcmVuSWRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgZ3JvdXApO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5kZWxldGUoaWQpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gZ3JvdXAgaWQgaXQgd2lsbCBzZWFyY2ggYWxsIHByb2plY3RzIHVuZGVybmVhdGggaXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGdyb3VwSWQgLSB0aGUgZ3JvdXAgaWQgdG8gc2VhcmNoIGZvciBwcm9qZWN0c1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqIEByZXR1cm5zIHthcnJheX0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqL1xuICBnZXRQcm9qZWN0c0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoZ3JvdXAudHlwZSAhPT0gJ2dyb3VwJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3RfYV9ncm91cCcpO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cC5jaGlsZHJlbklkcy5yZWR1Y2UoKGFjYywgZW50cnlJZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGVudHJ5SWQpO1xuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgdGhpcy5nZXRQcm9qZWN0c0luR3JvdXAoZW50cnlJZCwgYWNjKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgaWQ6IGVudHJ5SWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBwYXRoczogZW50cnkucGF0aHNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbGlzdCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkLCBlbnRyeSkge1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoaWQsIGVudHJ5KTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdXVpZCgpO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZW50cnkpO1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuICAgIHBhcmVudC5jaGlsZHJlbklkcy5wdXNoKGlkKTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBwYXJlbnQpO1xuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHNldFBhcmVudE9mRW50cnkgKGVudHJ5SWQsIHBhcmVudElkID0gTmFOKSB7XG4gICAgaWYgKGVudHJ5SWQgPT09IHBhcmVudElkIHx8IGVudHJ5SWQgPT09IERPQ0tfVVJJKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICBjb25zdCBvbGRQYXJlbnQgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcblxuICAgIGxldCBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KHBhcmVudElkKTtcblxuICAgIGlmIChuZXdQYXJlbnQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBwYXJlbnRJZCA9IG5ld1BhcmVudC5wYXJlbnRJZDtcbiAgICAgIG5ld1BhcmVudCA9IHRoaXMuZ2V0RW50cnkobmV3UGFyZW50LnBhcmVudElkKTtcbiAgICB9XG5cbiAgICBvbGRQYXJlbnQuY2hpbGRyZW5JZHMuc3BsaWNlKG9sZFBhcmVudC5jaGlsZHJlbklkcy5pbmRleE9mKGVudHJ5SWQpLCAxKTtcblxuICAgIG5ld1BhcmVudC5jaGlsZHJlbklkcy5wdXNoKGVudHJ5SWQpO1xuXG4gICAgZW50cnkucGFyZW50SWQgPSBwYXJlbnRJZDtcblxuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnlJZCwgZW50cnkpO1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIG9sZFBhcmVudCk7XG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShwYXJlbnRJZCwgbmV3UGFyZW50KTtcblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpbml0aWFsaXplU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG9uRGlkQ2hhbmdlU3RhdGUgKGNiKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLXN0YXRlJywgY2IpO1xuICB9XG59XG5cbi8vIHNhbWUgaW5zdGFuY2UgaXMgc2hhcmVkIGFjcm9zcyB0aGUgcGFja2FnZVxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXRlKCk7XG4iXX0=