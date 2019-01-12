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
  setParentOfEntry(entryId, parentId = NaN) {
    if (entryId === parentId) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJwYXJlbnRJZCIsImlkIiwiTmFOIiwidHlwZSIsIm5hbWUiLCJpY29uIiwiY2hpbGRyZW5JZHMiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwicHJvamVjdHMiLCJwcm9qZWN0IiwiZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQiLCJ1bmRlZmluZWQiLCJvcmRlciIsImZvbGRpbmciLCJzZXQiLCJwYXRocyIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsImxldmVsIiwiZ2V0RW50cnkiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJzdGF0ZSIsIkVycm9yIiwiZ2V0IiwiZGVsZXRlRW50cnkiLCJncm91cElkIiwicHJvamVjdElkIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImVtaXQiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJsaXN0IiwicmVkdWNlIiwiYWNjIiwiZW50cnlJZCIsInNldFBhcmVudE9mRW50cnkiLCJvbGRQYXJlbnQiLCJuZXdQYXJlbnQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwiY2IiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7QUFDQSxNQUFNQSxLQUFOLENBQVk7QUFDVjtBQUNBQyxnQkFBYztBQUNaLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxHQUFKLEVBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmO0FBQ0Q7O0FB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LE1BQU1FLFFBQXBCLENBQWxCOztBQUVBLFFBQUkyQyxZQUFZLEtBQUt0QixRQUFMLENBQWNyQixRQUFkLENBQWhCOztBQUVBLFFBQUkyQyxVQUFVeEMsSUFBVixLQUFtQixTQUF2QixFQUFrQztBQUNoQ0gsaUJBQVcyQyxVQUFVM0MsUUFBckI7QUFDQTJDLGtCQUFZLEtBQUt0QixRQUFMLENBQWNzQixVQUFVM0MsUUFBeEIsQ0FBWjtBQUNEOztBQUVEMEMsY0FBVXBDLFdBQVYsQ0FBc0IyQixNQUF0QixDQUNFUyxVQUFVcEMsV0FBVixDQUFzQjBCLE9BQXRCLENBQThCUSxPQUE5QixDQURGLEVBRUUsQ0FGRjs7QUFLQUcsY0FBVXJDLFdBQVYsQ0FBc0JJLElBQXRCLENBQTJCOEIsT0FBM0I7O0FBRUExQyxVQUFNRSxRQUFOLEdBQWlCQSxRQUFqQjs7QUFFQSxTQUFLd0IsZ0NBQUwsQ0FBc0NnQixPQUF0QyxFQUErQzFDLEtBQS9DO0FBQ0EsU0FBSzBCLGdDQUFMLENBQXNDMUIsTUFBTUUsUUFBNUMsRUFBc0QwQyxTQUF0RDtBQUNBLFNBQUtsQixnQ0FBTCxDQUFzQ3hCLFFBQXRDLEVBQWdEMkMsU0FBaEQ7O0FBRUEsU0FBS2xELE9BQUwsQ0FBYTBDLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7O0FBRUQ7QUFDQVMsa0JBQWlCQyxZQUFqQixFQUErQjtBQUM3QixTQUFLaEQsMkJBQUwsQ0FBaUNnRCxZQUFqQyxFQUErQyxJQUEvQztBQUNBLFNBQUtwRCxPQUFMLENBQWEwQyxJQUFiLENBQWtCLGtCQUFsQjtBQUNEOztBQUVEO0FBQ0FXLG1CQUFrQkMsRUFBbEIsRUFBc0I7QUFDcEIsU0FBS3RELE9BQUwsQ0FBYXVELEVBQWIsQ0FBZ0Isa0JBQWhCLEVBQW9DRCxFQUFwQztBQUNEO0FBdk9TOztBQTBPWjtrQkFDZSxJQUFJMUQsS0FBSixFIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuY2xhc3MgU3RhdGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXBwaW5nID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBtYXBwaW5nXG4gICAqL1xuICBkZWFjdGl2YXRlICgpIHtcbiAgICAvLyB0aGlzLmVtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMubWFwcGluZy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuIEluIGNhc2Ugb2YgdGhlIHJvb3RcbiAgICogbGV2ZWwsIHRoZSBvYmplY3QgaXMgc3RvcmVkIHdpdGggdGhlIFwiaWRcIiBOYU4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIGdyb3VwIGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1Jvb3QgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmVudElkIC0gaW5kaWNhdGVzIGlmIHRoaXMgbGV2ZWwgaXMgdGhlIHJvb3RcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGlkIG9mIHRoZSBkZXNlcmlhbGl6ZWQgZ3JvdXBcbiAgICovXG4gIGRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZCAoZW50cnksIGlzUm9vdCwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGlzUm9vdCA/IE5hTiA6IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ2dyb3VwJztcbiAgICBjb25zdCBuYW1lID0gaXNSb290ID8ge30gOiB7IG5hbWU6IGVudHJ5Lm5hbWUgfTtcbiAgICBjb25zdCBpY29uID0gZW50cnkuaWNvbiB8fCAnJztcbiAgICBjb25zdCBjaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZW50cnkuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoZ3JvdXAsIGZhbHNlLCBpZCkpXG4gICAgKTtcblxuICAgIGVudHJ5LnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkKHByb2plY3QsIGlkKSlcbiAgICApO1xuXG4gICAgY29uc3QgZ3JvdXAgPSB7XG4gICAgICB0eXBlLFxuICAgICAgcGFyZW50SWQ6IGlzUm9vdCA/IHVuZGVmaW5lZCA6IHBhcmVudElkLFxuICAgICAgLi4ubmFtZSxcbiAgICAgIGljb24sXG4gICAgICBvcmRlcjogZW50cnkub3JkZXIgfHwgJ2FscGhhYmV0aWNhbGx5JyxcbiAgICAgIGZvbGRpbmc6IGVudHJ5LmZvbGRpbmcgfHwgJ2NvbGxhcHNlZCcsXG4gICAgICBjaGlsZHJlbklkc1xuICAgIH07XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBncm91cCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRJZCAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBwcm9qZWN0XG4gICAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCAoZW50cnksIHBhcmVudElkKSB7XG4gICAgY29uc3QgaWQgPSBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgdHlwZSA9ICdwcm9qZWN0JztcbiAgICBjb25zdCBuYW1lID0gZW50cnkubmFtZTtcbiAgICBjb25zdCBpY29uID0gZW50cnkuaWNvbiB8fCAnJztcbiAgICBjb25zdCBwYXRocyA9IGVudHJ5LnBhdGhzIHx8IFtdO1xuXG4gICAgY29uc3QgcHJvamVjdCA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBwYXJlbnRJZCxcbiAgICAgIG5hbWUsXG4gICAgICBpY29uLFxuICAgICAgcGF0aHNcbiAgICB9O1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgcHJvamVjdCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc3RhdGUgdG8gc3RvcmUgaW4gY2FjaGUgb3IgZmlsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY3VycmVudCBpZCBvZiB0aGUgZ3JvdXAgKE5hTiBmb3Igcm9vdClcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZUdyb3VwQnlJZCAoaWQpIHtcbiAgICBjb25zdCBsZXZlbCA9IHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH07XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGlkIHx8IE5hTik7XG5cbiAgICBncm91cC5jaGlsZHJlbklkcy5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGNoaWxkSWQpO1xuXG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkTGV2ZWwgPSB0aGlzLnNlcmlhbGl6ZUdyb3VwQnlJZChjaGlsZElkKTtcblxuICAgICAgICBsZXZlbC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNoaWxkSWQsXG4gICAgICAgICAgcGFyZW50SWQ6IGlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgaWNvbjogZW50cnkuaWNvbixcbiAgICAgICAgICBvcmRlcjogZW50cnkub3JkZXIsXG4gICAgICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyxcbiAgICAgICAgICAuLi5zZXJpYWxpemVkTGV2ZWxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgbGV2ZWwucHJvamVjdHMucHVzaCh7XG4gICAgICAgICAgaWQ6IGNoaWxkSWQsXG4gICAgICAgICAgcGFyZW50SWQ6IGlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgaWNvbjogZW50cnkuaWNvbixcbiAgICAgICAgICBwYXRoczogZW50cnkucGF0aHNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHBhcmNpYWxseSBvciBmdWxseSBhbiBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSAtIHRoZSBuZXcgc3RhdGUgKHBhcnRpYWwgcGFyYW1ldGVycyBvciBhbGwgb2YgdGhlbSlcbiAgICovXG4gIGZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5IChpZCwgc3RhdGUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4aXN0aW5nX2VudHJ5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwge1xuICAgICAgLi4uZW50cnksXG4gICAgICAuLi5zdGF0ZVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0RW50cnkgKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwcGluZy5nZXQoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cElkID0+IHRoaXMuZGVsZXRlRW50cnkoZ3JvdXBJZCkpO1xuICAgICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0SWQgPT4gdGhpcy5kZWxldGVFbnRyeShwcm9qZWN0SWQpKTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkucGFyZW50SWQpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG4gICAgICBjb25zdCBpZHggPSBncm91cC5jaGlsZHJlbklkcy5pbmRleE9mKGlkKTtcbiAgICAgIGdyb3VwLmNoaWxkcmVuSWRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgZ3JvdXApO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5kZWxldGUoaWQpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gZ3JvdXAgaWQgaXQgd2lsbCBzZWFyY2ggYWxsIHByb2plY3RzIHVuZGVybmVhdGggaXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGdyb3VwSWQgLSB0aGUgZ3JvdXAgaWQgdG8gc2VhcmNoIGZvciBwcm9qZWN0c1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqIEByZXR1cm5zIHthcnJheX0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqL1xuICBnZXRQcm9qZWN0c0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoZ3JvdXAudHlwZSAhPT0gJ2dyb3VwJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3RfYV9ncm91cCcpO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cC5jaGlsZHJlbklkcy5yZWR1Y2UoKGFjYywgZW50cnlJZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGVudHJ5SWQpO1xuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgdGhpcy5nZXRQcm9qZWN0c0luR3JvdXAoZW50cnlJZCwgYWNjKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgaWQ6IGVudHJ5SWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBwYXRoczogZW50cnkucGF0aHNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbGlzdCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBzZXRQYXJlbnRPZkVudHJ5IChlbnRyeUlkLCBwYXJlbnRJZCA9IE5hTikge1xuICAgIGlmIChlbnRyeUlkID09PSBwYXJlbnRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgY29uc3Qgb2xkUGFyZW50ID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG5cbiAgICBsZXQgbmV3UGFyZW50ID0gdGhpcy5nZXRFbnRyeShwYXJlbnRJZCk7XG5cbiAgICBpZiAobmV3UGFyZW50LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgcGFyZW50SWQgPSBuZXdQYXJlbnQucGFyZW50SWQ7XG4gICAgICBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KG5ld1BhcmVudC5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgb2xkUGFyZW50LmNoaWxkcmVuSWRzLnNwbGljZShcbiAgICAgIG9sZFBhcmVudC5jaGlsZHJlbklkcy5pbmRleE9mKGVudHJ5SWQpLFxuICAgICAgMVxuICAgICk7XG5cbiAgICBuZXdQYXJlbnQuY2hpbGRyZW5JZHMucHVzaChlbnRyeUlkKTtcblxuICAgIGVudHJ5LnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5SWQsIGVudHJ5KTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBvbGRQYXJlbnQpO1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkocGFyZW50SWQsIG5ld1BhcmVudCk7XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaW5pdGlhbGl6ZVN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENoYW5nZVN0YXRlIChjYikge1xuICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWNoYW5nZS1zdGF0ZScsIGNiKTtcbiAgfVxufVxuXG4vLyBzYW1lIGluc3RhbmNlIGlzIHNoYXJlZCBhY3Jvc3MgdGhlIHBhY2thZ2VcbmV4cG9ydCBkZWZhdWx0IG5ldyBTdGF0ZSgpO1xuIl19