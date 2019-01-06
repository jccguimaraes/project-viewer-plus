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
    const group = this.mapping.get(id || NaN);

    group.childrenIds.forEach(childId => {
      const entry = this.mapping.get(childId);

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
    const entry = this.mapping.get(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, _extends({}, entry, state));
  }

  getEntry(id) {
    return this.mapping.get(id);
  }

  deleteEntry(id) {
    const entry = this.getEntry(id);

    if (entry.parentId) {
      const entryGroup = this.getEntry(entry.parentId);
      const idx = entryGroup.childrenIds.indexOf(id);
      entryGroup.childrenIds.splice(idx, 1);
      this.fullOrParcialUpdateExistingEntry(entry.parentId, entryGroup);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJwYXJlbnRJZCIsImlkIiwiTmFOIiwidHlwZSIsIm5hbWUiLCJpY29uIiwiY2hpbGRyZW5JZHMiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwicHJvamVjdHMiLCJwcm9qZWN0IiwiZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQiLCJ1bmRlZmluZWQiLCJvcmRlciIsImZvbGRpbmciLCJzZXQiLCJwYXRocyIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsImxldmVsIiwiZ2V0IiwiY2hpbGRJZCIsInNlcmlhbGl6ZWRMZXZlbCIsImZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5Iiwic3RhdGUiLCJFcnJvciIsImdldEVudHJ5IiwiZGVsZXRlRW50cnkiLCJlbnRyeUdyb3VwIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImVtaXQiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJncm91cElkIiwibGlzdCIsInJlZHVjZSIsImFjYyIsImVudHJ5SWQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwiY2IiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7QUFDQSxNQUFNQSxLQUFOLENBQVk7QUFDVjtBQUNBQyxnQkFBYztBQUNaLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxHQUFKLEVBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmO0FBQ0Q7O0FBRUQ7OztBQUdBQyxlQUFjO0FBQ1o7QUFDQSxTQUFLSixPQUFMLENBQWFL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RUFBNkJDLE9BQU8sRUFBcEMsRUFBd0M7QUFDdEMsVUFBTTVCLFFBQVEsS0FBS2xCLE9BQUwsQ0FBYThCLEdBQWIsQ0FBaUJlLFdBQVdsQyxHQUE1QixDQUFkOztBQUVBLFFBQUlPLE1BQU1OLElBQU4sS0FBZSxPQUFuQixFQUE0QjtBQUMxQixZQUFNLElBQUl1QixLQUFKLENBQVUsYUFBVixDQUFOO0FBQ0Q7O0FBRUQsV0FBT2pCLE1BQU1ILFdBQU4sQ0FBa0JnQyxNQUFsQixDQUF5QixDQUFDQyxHQUFELEVBQU1DLE9BQU4sS0FBa0I7QUFDaEQsWUFBTTFDLFFBQVEsS0FBS1AsT0FBTCxDQUFhOEIsR0FBYixDQUFpQm1CLE9BQWpCLENBQWQ7QUFDQSxVQUFJMUMsTUFBTUssSUFBTixLQUFlLE9BQW5CLEVBQTRCO0FBQzFCLGFBQUtnQyxrQkFBTCxDQUF3QkssT0FBeEIsRUFBaUNELEdBQWpDO0FBQ0QsT0FGRCxNQUdLO0FBQ0hBLFlBQUk3QixJQUFKLENBQVM7QUFDUFQsY0FBSXVDLE9BREc7QUFFUHBDLGdCQUFNTixNQUFNTSxJQUZMO0FBR1BjLGlCQUFPcEIsTUFBTW9CO0FBSE4sU0FBVDtBQUtEOztBQUVELGFBQU9xQixHQUFQO0FBQ0QsS0FkTSxFQWNKRixJQWRJLENBQVA7QUFlRDs7QUFFRDtBQUNBSSxrQkFBaUJDLFlBQWpCLEVBQStCO0FBQzdCLFNBQUs3QywyQkFBTCxDQUFpQzZDLFlBQWpDLEVBQStDLElBQS9DO0FBQ0EsU0FBS2pELE9BQUwsQ0FBYXlDLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7O0FBRUQ7QUFDQVMsbUJBQWtCQyxFQUFsQixFQUFzQjtBQUNwQixTQUFLbkQsT0FBTCxDQUFhb0QsRUFBYixDQUFnQixrQkFBaEIsRUFBb0NELEVBQXBDO0FBQ0Q7QUFqTVM7O0FBb01aO2tCQUNlLElBQUl2RCxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIC8vIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5tYXBwaW5nLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50SWQgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gaXNSb290ID8gTmFOIDogZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IHR5cGUgPSAnZ3JvdXAnO1xuICAgIGNvbnN0IG5hbWUgPSBpc1Jvb3QgPyB7fSA6IHsgbmFtZTogZW50cnkubmFtZSB9O1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IGNoaWxkcmVuSWRzID0gW107XG5cbiAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChncm91cCwgZmFsc2UsIGlkKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCwgaWQpKVxuICAgICk7XG5cbiAgICBjb25zdCBncm91cCA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBwYXJlbnRJZDogaXNSb290ID8gdW5kZWZpbmVkIDogcGFyZW50SWQsXG4gICAgICAuLi5uYW1lLFxuICAgICAgaWNvbixcbiAgICAgIG9yZGVyOiBlbnRyeS5vcmRlciB8fCAnYWxwaGFiZXRpY2FsbHknLFxuICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyB8fCAnY29sbGFwc2VkJyxcbiAgICAgIGNoaWxkcmVuSWRzXG4gICAgfTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGdyb3VwKTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudElkIC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIHByb2plY3RcbiAgICovXG4gIGRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIChlbnRyeSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ3Byb2plY3QnO1xuICAgIGNvbnN0IG5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IHBhdGhzID0gZW50cnkucGF0aHMgfHwgW107XG5cbiAgICBjb25zdCBwcm9qZWN0ID0ge1xuICAgICAgdHlwZSxcbiAgICAgIHBhcmVudElkLFxuICAgICAgbmFtZSxcbiAgICAgIGljb24sXG4gICAgICBwYXRoc1xuICAgIH07XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBwcm9qZWN0KTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzdGF0ZSB0byBzdG9yZSBpbiBjYWNoZSBvciBmaWxlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjdXJyZW50IGlkIG9mIHRoZSBncm91cCAoTmFOIGZvciByb290KVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMubWFwcGluZy5nZXQoaWQgfHwgTmFOKTtcblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMubWFwcGluZy5nZXQoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQpO1xuXG4gICAgICAgIGxldmVsLmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFyY2lhbGx5IG9yIGZ1bGx5IGFuIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gdGhlIG5ldyBzdGF0ZSAocGFydGlhbCBwYXJhbWV0ZXJzIG9yIGFsbCBvZiB0aGVtKVxuICAgKi9cbiAgZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkgKGlkLCBzdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5tYXBwaW5nLmdldChpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhpc3RpbmdfZW50cnknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCB7XG4gICAgICAuLi5lbnRyeSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfSk7XG4gIH1cblxuICBnZXRFbnRyeSAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nLmdldChpZCk7XG4gIH1cblxuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnBhcmVudElkKSB7XG4gICAgICBjb25zdCBlbnRyeUdyb3VwID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG4gICAgICBjb25zdCBpZHggPSBlbnRyeUdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YoaWQpO1xuICAgICAgZW50cnlHcm91cC5jaGlsZHJlbklkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIGVudHJ5R3JvdXApO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5kZWxldGUoaWQpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gZ3JvdXAgaWQgaXQgd2lsbCBzZWFyY2ggYWxsIHByb2plY3RzIHVuZGVybmVhdGggaXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGdyb3VwSWQgLSB0aGUgZ3JvdXAgaWQgdG8gc2VhcmNoIGZvciBwcm9qZWN0c1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqIEByZXR1cm5zIHthcnJheX0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqL1xuICBnZXRQcm9qZWN0c0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5tYXBwaW5nLmdldChncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoZ3JvdXAudHlwZSAhPT0gJ2dyb3VwJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3RfYV9ncm91cCcpO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cC5jaGlsZHJlbklkcy5yZWR1Y2UoKGFjYywgZW50cnlJZCkgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLm1hcHBpbmcuZ2V0KGVudHJ5SWQpO1xuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgdGhpcy5nZXRQcm9qZWN0c0luR3JvdXAoZW50cnlJZCwgYWNjKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgaWQ6IGVudHJ5SWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBwYXRoczogZW50cnkucGF0aHNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbGlzdCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpbml0aWFsaXplU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG9uRGlkQ2hhbmdlU3RhdGUgKGNiKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLXN0YXRlJywgY2IpO1xuICB9XG59XG5cbi8vIHNhbWUgaW5zdGFuY2UgaXMgc2hhcmVkIGFjcm9zcyB0aGUgcGFja2FnZVxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXRlKCk7XG4iXX0=