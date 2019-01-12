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
  setParentOfEntry(entryId, parentId) {
    if (entryId === parentId) {
      return;
    }
    const entry = this.getEntry(entryId);
    const oldParent = this.getEntry(entry.parentId);
    const newParent = this.getEntry(parentId);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiZW50cnkiLCJpc1Jvb3QiLCJwYXJlbnRJZCIsImlkIiwiTmFOIiwidHlwZSIsIm5hbWUiLCJpY29uIiwiY2hpbGRyZW5JZHMiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwicHJvamVjdHMiLCJwcm9qZWN0IiwiZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQiLCJ1bmRlZmluZWQiLCJvcmRlciIsImZvbGRpbmciLCJzZXQiLCJwYXRocyIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsImxldmVsIiwiZ2V0RW50cnkiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJzdGF0ZSIsIkVycm9yIiwiZ2V0IiwiZGVsZXRlRW50cnkiLCJncm91cElkIiwicHJvamVjdElkIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImVtaXQiLCJnZXRQcm9qZWN0c0luR3JvdXAiLCJsaXN0IiwicmVkdWNlIiwiYWNjIiwiZW50cnlJZCIsInNldFBhcmVudE9mRW50cnkiLCJvbGRQYXJlbnQiLCJuZXdQYXJlbnQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwiY2IiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7QUFDQSxNQUFNQSxLQUFOLENBQVk7QUFDVjtBQUNBQyxnQkFBYztBQUNaLFNBQUtDLE9BQUwsR0FBZSxJQUFJQyxHQUFKLEVBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBSUMsYUFBSixFQUFmO0FBQ0Q7O0FB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LFFBQXBCLENBQWxCO0FBQ0EsVUFBTTJDLFlBQVksS0FBS3RCLFFBQUwsQ0FBY3JCLFFBQWQsQ0FBbEI7O0FBRUEwQyxjQUFVcEMsV0FBVixDQUFzQjJCLE1BQXRCLENBQ0VTLFVBQVVwQyxXQUFWLENBQXNCMEIsT0FBdEIsQ0FBOEJRLE9BQTlCLENBREYsRUFFRSxDQUZGOztBQUtBRyxjQUFVckMsV0FBVixDQUFzQkksSUFBdEIsQ0FBMkI4QixPQUEzQjs7QUFFQTFDLFVBQU1FLFFBQU4sR0FBaUJBLFFBQWpCOztBQUVBLFNBQUt3QixnQ0FBTCxDQUFzQ2dCLE9BQXRDLEVBQStDMUMsS0FBL0M7QUFDQSxTQUFLMEIsZ0NBQUwsQ0FBc0MxQixNQUFNRSxRQUE1QyxFQUFzRDBDLFNBQXREO0FBQ0EsU0FBS2xCLGdDQUFMLENBQXNDeEIsUUFBdEMsRUFBZ0QyQyxTQUFoRDs7QUFFQSxTQUFLbEQsT0FBTCxDQUFhMEMsSUFBYixDQUFrQixrQkFBbEI7QUFDRDs7QUFFRDtBQUNBUyxrQkFBaUJDLFlBQWpCLEVBQStCO0FBQzdCLFNBQUtoRCwyQkFBTCxDQUFpQ2dELFlBQWpDLEVBQStDLElBQS9DO0FBQ0EsU0FBS3BELE9BQUwsQ0FBYTBDLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7O0FBRUQ7QUFDQVcsbUJBQWtCQyxFQUFsQixFQUFzQjtBQUNwQixTQUFLdEQsT0FBTCxDQUFhdUQsRUFBYixDQUFnQixrQkFBaEIsRUFBb0NELEVBQXBDO0FBQ0Q7QUFqT1M7O0FBb09aO2tCQUNlLElBQUkxRCxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIC8vIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5tYXBwaW5nLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50SWQgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gaXNSb290ID8gTmFOIDogZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IHR5cGUgPSAnZ3JvdXAnO1xuICAgIGNvbnN0IG5hbWUgPSBpc1Jvb3QgPyB7fSA6IHsgbmFtZTogZW50cnkubmFtZSB9O1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IGNoaWxkcmVuSWRzID0gW107XG5cbiAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChncm91cCwgZmFsc2UsIGlkKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCwgaWQpKVxuICAgICk7XG5cbiAgICBjb25zdCBncm91cCA9IHtcbiAgICAgIHR5cGUsXG4gICAgICBwYXJlbnRJZDogaXNSb290ID8gdW5kZWZpbmVkIDogcGFyZW50SWQsXG4gICAgICAuLi5uYW1lLFxuICAgICAgaWNvbixcbiAgICAgIG9yZGVyOiBlbnRyeS5vcmRlciB8fCAnYWxwaGFiZXRpY2FsbHknLFxuICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyB8fCAnY29sbGFwc2VkJyxcbiAgICAgIGNoaWxkcmVuSWRzXG4gICAgfTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGdyb3VwKTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudElkIC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIHByb2plY3RcbiAgICovXG4gIGRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIChlbnRyeSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCB0eXBlID0gJ3Byb2plY3QnO1xuICAgIGNvbnN0IG5hbWUgPSBlbnRyeS5uYW1lO1xuICAgIGNvbnN0IGljb24gPSBlbnRyeS5pY29uIHx8ICcnO1xuICAgIGNvbnN0IHBhdGhzID0gZW50cnkucGF0aHMgfHwgW107XG5cbiAgICBjb25zdCBwcm9qZWN0ID0ge1xuICAgICAgdHlwZSxcbiAgICAgIHBhcmVudElkLFxuICAgICAgbmFtZSxcbiAgICAgIGljb24sXG4gICAgICBwYXRoc1xuICAgIH07XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBwcm9qZWN0KTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzdGF0ZSB0byBzdG9yZSBpbiBjYWNoZSBvciBmaWxlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjdXJyZW50IGlkIG9mIHRoZSBncm91cCAoTmFOIGZvciByb290KVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoaWQgfHwgTmFOKTtcblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQpO1xuXG4gICAgICAgIGxldmVsLmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFyY2lhbGx5IG9yIGZ1bGx5IGFuIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gdGhlIG5ldyBzdGF0ZSAocGFydGlhbCBwYXJhbWV0ZXJzIG9yIGFsbCBvZiB0aGVtKVxuICAgKi9cbiAgZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkgKGlkLCBzdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhpc3RpbmdfZW50cnknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCB7XG4gICAgICAuLi5lbnRyeSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRFbnRyeSAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nLmdldChpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGVudHJ5Lmdyb3Vwcy5mb3JFYWNoKGdyb3VwSWQgPT4gdGhpcy5kZWxldGVFbnRyeShncm91cElkKSk7XG4gICAgICBlbnRyeS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3RJZCA9PiB0aGlzLmRlbGV0ZUVudHJ5KHByb2plY3RJZCkpO1xuICAgIH1cblxuICAgIGlmIChlbnRyeS5wYXJlbnRJZCkge1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICAgIGNvbnN0IGlkeCA9IGdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YoaWQpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW5JZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBncm91cCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXBwaW5nLmRlbGV0ZShpZCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgcHJvamVjdHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIHByb2plY3RzXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICovXG4gIGdldFByb2plY3RzSW5Hcm91cCAoZ3JvdXBJZCwgbGlzdCA9IFtdKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGdyb3VwSWQgfHwgTmFOKTtcblxuICAgIGlmIChncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICB0aGlzLmdldFByb2plY3RzSW5Hcm91cChlbnRyeUlkLCBhY2MpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBpZDogZW50cnlJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBsaXN0KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHNldFBhcmVudE9mRW50cnkgKGVudHJ5SWQsIHBhcmVudElkKSB7XG4gICAgaWYgKGVudHJ5SWQgPT09IHBhcmVudElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICBjb25zdCBvbGRQYXJlbnQgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICBjb25zdCBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KHBhcmVudElkKTtcblxuICAgIG9sZFBhcmVudC5jaGlsZHJlbklkcy5zcGxpY2UoXG4gICAgICBvbGRQYXJlbnQuY2hpbGRyZW5JZHMuaW5kZXhPZihlbnRyeUlkKSxcbiAgICAgIDFcbiAgICApO1xuXG4gICAgbmV3UGFyZW50LmNoaWxkcmVuSWRzLnB1c2goZW50cnlJZCk7XG5cbiAgICBlbnRyeS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeUlkLCBlbnRyeSk7XG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgb2xkUGFyZW50KTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHBhcmVudElkLCBuZXdQYXJlbnQpO1xuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGluaXRpYWxpemVTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDaGFuZ2VTdGF0ZSAoY2IpIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2Utc3RhdGUnLCBjYik7XG4gIH1cbn1cblxuLy8gc2FtZSBpbnN0YW5jZSBpcyBzaGFyZWQgYWNyb3NzIHRoZSBwYWNrYWdlXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RhdGUoKTtcbiJdfQ==