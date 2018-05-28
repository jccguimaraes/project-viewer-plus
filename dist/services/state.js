'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _atom = require('atom');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** State management */
class State {

  /**
   * Creates a State instance
   * @param {Object} content - Content from any resource
   */
  constructor(content) {
    this.emitter = new _atom.Emitter();
    this.state = new Map();
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} description
   */
  serialize() {
    const data = {
      groups: [],
      projects: []
    };
    const mapping = {};
    this.state.forEach(value => {
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

    return data;
  }

  /**
   * Simple wrapper to detect if state is empty or not
   * @returns {boolean} true if state is empty
   */
  isEmpty() {
    return this.state.size === 0;
  }

  /**
   * Wrapper to just clear the state Map
   */
  clear() {
    this.state.clear();
  }

  /**
   * Wrapper to just get an iterator
   * @returns {Iterator} An iterator of the current state Map
   */
  list() {
    return this.state.entries();
  }

  /**
   * Wrapper to just get all the created ids
   * @returns {Iterator} An iterator of the current state Map
   */
  ids() {
    return this.state.keys();
  }

  /**
   * Retrieves an entry from the state Map
   * @param {number} id - A valid reference to an entry
   * @returns {Object|undefined} If id is set it will retrieve the associated
   * entry, or undefined if none exists
   */
  getEntry(id) {
    return this.state.get(id);
  }

  /**
   * Wrapper to retrieve a group
   * @param {number} id - A valid reference to a group
   * @returns {Object|undefined} If id refers to a group it will return that
   * group Object, or undefined if none exists
   */
  getGroup(id) {
    const entry = this.getEntry(id);

    if (!entry) {
      return undefined;
    }

    return entry.type === 'group' ? entry : undefined;
  }

  /**
   * Wrapper to retrieve a project
   * @param {number} id - A valid reference to a project
   * @returns {Object|undefined} If id refers to a project it will return that
   * project Object, or undefined if none exists
   */
  getProject(id) {
    const entry = this.getEntry(id);

    if (!entry) {
      return undefined;
    }

    return entry.type === 'project' ? entry : undefined;
  }

  /**
   * Defines a new group Object based on a candidate Object
   * @param {Object} candidate - An object with a candidate for a group
   * @param {Object} [optional={}] - Any optional information
   * @param {string} [optional.parentId] - The id of a parent group
   * @returns {Object} A group Object
   */
  setGroup(candidate, optional = {}) {
    if (!candidate.hasOwnProperty('name')) {
      return;
    }

    return {
      type: 'group',
      expanded: false,
      parentId: optional.parentId,
      model: {
        id: candidate.id || (0, _uuid2.default)(),
        name: candidate.name,
        sortBy: candidate.sortBy || 'position',
        icon: candidate.icon,
        groups: candidate.groups || [],
        projects: candidate.projects || []
      }
    };
  }

  /**
   * Defines a new project Object based on a candidate Object
   * @param {Object} candidate - An object with a candidate for a project
   * @param {Object} [optional={}] - Any optional information
   * @param {string} [optional.parentId] - The id of a parent group
   * @returns {Object} A project Object
   */
  setProject(candidate, optional = {}) {
    if (!candidate.hasOwnProperty('name')) {
      return;
    }

    return {
      type: 'project',
      parentId: optional.parentId,
      model: {
        id: candidate.id || (0, _uuid2.default)(),
        name: candidate.name,
        paths: candidate.paths || [],
        icon: candidate.icon
      }
    };
  }

  /**
   * Updates the current state with a given normalized content
   * @param {Object} content - Content from a resource and should have only
   * two properties `groups` and `projects`
   * @param {string} [parentId] - The id of a parent group
   * @param {Array} currentIds - A list of all ids created / updated
   * @example  { groups: [], projects: [] }
   */
  build(content, parentId, currentIds = []) {
    if (Array.isArray(content.groups)) {
      content.groups.forEach(candidate => {
        const group = this.setGroup(candidate, { parentId });

        if (!group) {
          return;
        }

        currentIds.push(group.model.id);

        this.setItem(group);
        this.build(candidate, group.model.id, currentIds);
      });
    }

    if (Array.isArray(content.projects)) {
      content.projects.forEach(candidate => {
        const project = this.setProject(candidate, { parentId });

        if (!project) {
          return;
        }

        currentIds.push(project.model.id);

        this.setItem(project);
      });
    }
  }

  /**
   * Wrapper for build
   * @param {Object} content - Content from any resource
   */
  update(content) {
    if (!content) {
      this.emitter.emit('state-error-content');
      return;
    }

    const currentIds = [];
    this.build(content, undefined, currentIds);

    const removeIds = [];
    for (const id of this.ids()) {
      if (!currentIds.includes(id)) {
        removeIds.push(id);
      }
    }

    removeIds.forEach(id => this.removeItem({ id }));

    this.emitter.emit('state-update-content', this.state);
  }

  /**
   * Appends new content or updates an existing resource
   * @param {Object} entry - Content from any resource
   */
  setItem(entry) {
    if (entry.model.id && this.state.has(entry.model.id)) {
      const oldEntry = this.state.get(entry.model.id);

      // TODO this should not be necessary after proper detach of database/state
      Object.keys(oldEntry.model).forEach(prop => {
        oldEntry.model[prop] = entry.model[prop];
      });

      Object.keys(oldEntry).forEach(prop => {
        oldEntry[prop] = entry[prop];
      });
      // TODO this should not be necessary after proper detach of database/state

      entry = _extends({}, oldEntry, {
        updatedAt: Date.now()
      });
      // TODO end

      // entry = {
      //   ...oldEntry,
      //   ...entry,
      //   updatedAt: Date.now()
      // };
    }
    this.state.set(entry.model.id, entry);
  }

  /**
   * Removes an existing resource
   * @param {Object} [optional] - Content from any resource
   * @param {string} [optional.id] - The id of resource to be removed
   * @param {string} [optional.parentId] - The id of a parent resource for it's
   * children to be deleted
   */
  removeItem(optional) {
    if (optional && optional.id) {
      this.state.delete(optional.id);
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidUpdateContent(callback) {
    this.emitter.on('state-update-content', callback);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidErrorContent(callback) {
    this.emitter.on('state-error-content', callback);
  }
}
exports.default = State;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwiY29udGVudCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwic3RhdGUiLCJNYXAiLCJzZXJpYWxpemUiLCJkYXRhIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJtYXBwaW5nIiwiZm9yRWFjaCIsInZhbHVlIiwicmVzb3VyY2UiLCJtb2RlbCIsInR5cGUiLCJpZCIsImV4cGFuZGVkIiwicGFyZW50SWQiLCJwdXNoIiwiaXNFbXB0eSIsInNpemUiLCJjbGVhciIsImxpc3QiLCJlbnRyaWVzIiwiaWRzIiwia2V5cyIsImdldEVudHJ5IiwiZ2V0IiwiZ2V0R3JvdXAiLCJlbnRyeSIsInVuZGVmaW5lZCIsImdldFByb2plY3QiLCJzZXRHcm91cCIsImNhbmRpZGF0ZSIsIm9wdGlvbmFsIiwiaGFzT3duUHJvcGVydHkiLCJuYW1lIiwic29ydEJ5IiwiaWNvbiIsInNldFByb2plY3QiLCJwYXRocyIsImJ1aWxkIiwiY3VycmVudElkcyIsIkFycmF5IiwiaXNBcnJheSIsImdyb3VwIiwic2V0SXRlbSIsInByb2plY3QiLCJ1cGRhdGUiLCJlbWl0IiwicmVtb3ZlSWRzIiwiaW5jbHVkZXMiLCJyZW1vdmVJdGVtIiwiaGFzIiwib2xkRW50cnkiLCJPYmplY3QiLCJwcm9wIiwidXBkYXRlZEF0IiwiRGF0ZSIsIm5vdyIsInNldCIsImRlbGV0ZSIsIm9uRGlkVXBkYXRlQ29udGVudCIsImNhbGxiYWNrIiwib24iLCJvbkRpZEVycm9yQ29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7O0FBRUE7QUFDZSxNQUFNQSxLQUFOLENBQVk7O0FBRXpCOzs7O0FBSUFDLGNBQWFDLE9BQWIsRUFBc0I7QUFDcEIsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxHQUFKLEVBQWI7QUFDRDs7QUFFRDs7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QUFhK0QsRUFBYixDQUFnQixzQkFBaEIsRUFBd0NELFFBQXhDO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BRSxvQkFBbUJGLFFBQW5CLEVBQTZCO0FBQzNCLFNBQUs5RCxPQUFMLENBQWErRCxFQUFiLENBQWdCLHFCQUFoQixFQUF1Q0QsUUFBdkM7QUFDRDtBQS9Td0I7a0JBQU5qRSxLIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJ2F0b20nO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8qKiBTdGF0ZSBtYW5hZ2VtZW50ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBTdGF0ZSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIENvbnRlbnQgZnJvbSBhbnkgcmVzb3VyY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yIChjb250ZW50KSB7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0b20ncyBpbnRlcm5hbCBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAgICogQHJldHVybnMge09iamVjdH0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNlcmlhbGl6ZSAoKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBwcm9qZWN0czogW11cbiAgICB9O1xuICAgIGNvbnN0IG1hcHBpbmcgPSB7fTtcbiAgICB0aGlzLnN0YXRlLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgY29uc3QgcmVzb3VyY2UgPSB2YWx1ZS5tb2RlbDtcblxuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgcmVzb3VyY2UuZ3JvdXBzID0gW107XG4gICAgICAgIHJlc291cmNlLnByb2plY3RzID0gW107XG4gICAgICB9XG5cbiAgICAgIG1hcHBpbmdbdmFsdWUubW9kZWwuaWRdID0ge1xuICAgICAgICAuLi5yZXNvdXJjZSxcbiAgICAgICAgZXhwYW5kZWQ6IHZhbHVlLmV4cGFuZGVkXG4gICAgICB9O1xuXG4gICAgICBpZiAodmFsdWUucGFyZW50SWQgJiYgdmFsdWUudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBtYXBwaW5nW3ZhbHVlLnBhcmVudElkXS5ncm91cHMucHVzaChtYXBwaW5nW3ZhbHVlLm1vZGVsLmlkXSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh2YWx1ZS5wYXJlbnRJZCAmJiB2YWx1ZS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgbWFwcGluZ1t2YWx1ZS5wYXJlbnRJZF0ucHJvamVjdHMucHVzaChtYXBwaW5nW3ZhbHVlLm1vZGVsLmlkXSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghdmFsdWUucGFyZW50SWQgJiYgdmFsdWUudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBkYXRhLmdyb3Vwcy5wdXNoKG1hcHBpbmdbdmFsdWUubW9kZWwuaWRdKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCF2YWx1ZS5wYXJlbnRJZCAmJiB2YWx1ZS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgZGF0YS5wcm9qZWN0cy5wdXNoKG1hcHBpbmdbdmFsdWUubW9kZWwuaWRdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIFNpbXBsZSB3cmFwcGVyIHRvIGRldGVjdCBpZiBzdGF0ZSBpcyBlbXB0eSBvciBub3RcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgc3RhdGUgaXMgZW1wdHlcbiAgICovXG4gIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLnNpemUgPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byBqdXN0IGNsZWFyIHRoZSBzdGF0ZSBNYXBcbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byBqdXN0IGdldCBhbiBpdGVyYXRvclxuICAgKiBAcmV0dXJucyB7SXRlcmF0b3J9IEFuIGl0ZXJhdG9yIG9mIHRoZSBjdXJyZW50IHN0YXRlIE1hcFxuICAgKi9cbiAgbGlzdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgdG8ganVzdCBnZXQgYWxsIHRoZSBjcmVhdGVkIGlkc1xuICAgKiBAcmV0dXJucyB7SXRlcmF0b3J9IEFuIGl0ZXJhdG9yIG9mIHRoZSBjdXJyZW50IHN0YXRlIE1hcFxuICAgKi9cbiAgaWRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5rZXlzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIGVudHJ5IGZyb20gdGhlIHN0YXRlIE1hcFxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBBIHZhbGlkIHJlZmVyZW5jZSB0byBhbiBlbnRyeVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gSWYgaWQgaXMgc2V0IGl0IHdpbGwgcmV0cmlldmUgdGhlIGFzc29jaWF0ZWRcbiAgICogZW50cnksIG9yIHVuZGVmaW5lZCBpZiBub25lIGV4aXN0c1xuICAgKi9cbiAgZ2V0RW50cnkgKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZ2V0KGlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIHRvIHJldHJpZXZlIGEgZ3JvdXBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gQSB2YWxpZCByZWZlcmVuY2UgdG8gYSBncm91cFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gSWYgaWQgcmVmZXJzIHRvIGEgZ3JvdXAgaXQgd2lsbCByZXR1cm4gdGhhdFxuICAgKiBncm91cCBPYmplY3QsIG9yIHVuZGVmaW5lZCBpZiBub25lIGV4aXN0c1xuICAgKi9cbiAgZ2V0R3JvdXAgKGlkKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVudHJ5LnR5cGUgPT09ICdncm91cCcgPyBlbnRyeSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIHRvIHJldHJpZXZlIGEgcHJvamVjdFxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBBIHZhbGlkIHJlZmVyZW5jZSB0byBhIHByb2plY3RcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IElmIGlkIHJlZmVycyB0byBhIHByb2plY3QgaXQgd2lsbCByZXR1cm4gdGhhdFxuICAgKiBwcm9qZWN0IE9iamVjdCwgb3IgdW5kZWZpbmVkIGlmIG5vbmUgZXhpc3RzXG4gICAqL1xuICBnZXRQcm9qZWN0IChpZCkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBlbnRyeS50eXBlID09PSAncHJvamVjdCcgPyBlbnRyeSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgbmV3IGdyb3VwIE9iamVjdCBiYXNlZCBvbiBhIGNhbmRpZGF0ZSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbmRpZGF0ZSAtIEFuIG9iamVjdCB3aXRoIGEgY2FuZGlkYXRlIGZvciBhIGdyb3VwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uYWw9e31dIC0gQW55IG9wdGlvbmFsIGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9uYWwucGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IGdyb3VwXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgZ3JvdXAgT2JqZWN0XG4gICAqL1xuICBzZXRHcm91cCAoY2FuZGlkYXRlLCBvcHRpb25hbCA9IHt9KSB7XG4gICAgaWYgKCFjYW5kaWRhdGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgcGFyZW50SWQ6IG9wdGlvbmFsLnBhcmVudElkLFxuICAgICAgbW9kZWw6IHtcbiAgICAgICAgaWQ6IGNhbmRpZGF0ZS5pZCB8fCB1dWlkKCksXG4gICAgICAgIG5hbWU6IGNhbmRpZGF0ZS5uYW1lLFxuICAgICAgICBzb3J0Qnk6IGNhbmRpZGF0ZS5zb3J0QnkgfHwgJ3Bvc2l0aW9uJyxcbiAgICAgICAgaWNvbjogY2FuZGlkYXRlLmljb24sXG4gICAgICAgIGdyb3VwczogY2FuZGlkYXRlLmdyb3VwcyB8fCBbXSxcbiAgICAgICAgcHJvamVjdHM6IGNhbmRpZGF0ZS5wcm9qZWN0cyB8fCBbXVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBhIG5ldyBwcm9qZWN0IE9iamVjdCBiYXNlZCBvbiBhIGNhbmRpZGF0ZSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbmRpZGF0ZSAtIEFuIG9iamVjdCB3aXRoIGEgY2FuZGlkYXRlIGZvciBhIHByb2plY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25hbD17fV0gLSBBbnkgb3B0aW9uYWwgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25hbC5wYXJlbnRJZF0gLSBUaGUgaWQgb2YgYSBwYXJlbnQgZ3JvdXBcbiAgICogQHJldHVybnMge09iamVjdH0gQSBwcm9qZWN0IE9iamVjdFxuICAgKi9cbiAgc2V0UHJvamVjdCAoY2FuZGlkYXRlLCBvcHRpb25hbCA9IHt9KSB7XG4gICAgaWYgKCFjYW5kaWRhdGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBwYXJlbnRJZDogb3B0aW9uYWwucGFyZW50SWQsXG4gICAgICBtb2RlbDoge1xuICAgICAgICBpZDogY2FuZGlkYXRlLmlkIHx8IHV1aWQoKSxcbiAgICAgICAgbmFtZTogY2FuZGlkYXRlLm5hbWUsXG4gICAgICAgIHBhdGhzOiBjYW5kaWRhdGUucGF0aHMgfHwgW10sXG4gICAgICAgIGljb246IGNhbmRpZGF0ZS5pY29uXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHN0YXRlIHdpdGggYSBnaXZlbiBub3JtYWxpemVkIGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBDb250ZW50IGZyb20gYSByZXNvdXJjZSBhbmQgc2hvdWxkIGhhdmUgb25seVxuICAgKiB0d28gcHJvcGVydGllcyBgZ3JvdXBzYCBhbmQgYHByb2plY3RzYFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmVudElkXSAtIFRoZSBpZCBvZiBhIHBhcmVudCBncm91cFxuICAgKiBAcGFyYW0ge0FycmF5fSBjdXJyZW50SWRzIC0gQSBsaXN0IG9mIGFsbCBpZHMgY3JlYXRlZCAvIHVwZGF0ZWRcbiAgICogQGV4YW1wbGUgIHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH1cbiAgICovXG4gIGJ1aWxkIChjb250ZW50LCBwYXJlbnRJZCwgY3VycmVudElkcyA9IFtdKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudC5ncm91cHMpKSB7XG4gICAgICBjb250ZW50Lmdyb3Vwcy5mb3JFYWNoKGNhbmRpZGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5zZXRHcm91cChjYW5kaWRhdGUsIHsgcGFyZW50SWQgfSk7XG5cbiAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRJZHMucHVzaChncm91cC5tb2RlbC5pZCk7XG5cbiAgICAgICAgdGhpcy5zZXRJdGVtKGdyb3VwKTtcbiAgICAgICAgdGhpcy5idWlsZChjYW5kaWRhdGUsIGdyb3VwLm1vZGVsLmlkLCBjdXJyZW50SWRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQucHJvamVjdHMpKSB7XG4gICAgICBjb250ZW50LnByb2plY3RzLmZvckVhY2goY2FuZGlkYXRlID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMuc2V0UHJvamVjdChjYW5kaWRhdGUsIHsgcGFyZW50SWQgfSk7XG5cbiAgICAgICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudElkcy5wdXNoKHByb2plY3QubW9kZWwuaWQpO1xuXG4gICAgICAgIHRoaXMuc2V0SXRlbShwcm9qZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIGZvciBidWlsZFxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGVudCAtIENvbnRlbnQgZnJvbSBhbnkgcmVzb3VyY2VcbiAgICovXG4gIHVwZGF0ZSAoY29udGVudCkge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3N0YXRlLWVycm9yLWNvbnRlbnQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SWRzID0gW107XG4gICAgdGhpcy5idWlsZChjb250ZW50LCB1bmRlZmluZWQsIGN1cnJlbnRJZHMpO1xuXG4gICAgY29uc3QgcmVtb3ZlSWRzID0gW107XG4gICAgZm9yIChjb25zdCBpZCBvZiB0aGlzLmlkcygpKSB7XG4gICAgICBpZiAoIWN1cnJlbnRJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgIHJlbW92ZUlkcy5wdXNoKGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJZHMuZm9yRWFjaChpZCA9PiB0aGlzLnJlbW92ZUl0ZW0oeyBpZCB9KSk7XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnc3RhdGUtdXBkYXRlLWNvbnRlbnQnLCB0aGlzLnN0YXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIG5ldyBjb250ZW50IG9yIHVwZGF0ZXMgYW4gZXhpc3RpbmcgcmVzb3VyY2VcbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gQ29udGVudCBmcm9tIGFueSByZXNvdXJjZVxuICAgKi9cbiAgc2V0SXRlbSAoZW50cnkpIHtcbiAgICBpZiAoZW50cnkubW9kZWwuaWQgJiYgdGhpcy5zdGF0ZS5oYXMoZW50cnkubW9kZWwuaWQpKSB7XG4gICAgICBjb25zdCBvbGRFbnRyeSA9IHRoaXMuc3RhdGUuZ2V0KGVudHJ5Lm1vZGVsLmlkKTtcblxuICAgICAgLy8gVE9ETyB0aGlzIHNob3VsZCBub3QgYmUgbmVjZXNzYXJ5IGFmdGVyIHByb3BlciBkZXRhY2ggb2YgZGF0YWJhc2Uvc3RhdGVcbiAgICAgIE9iamVjdC5rZXlzKG9sZEVudHJ5Lm1vZGVsKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvbGRFbnRyeS5tb2RlbFtwcm9wXSA9IGVudHJ5Lm1vZGVsW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG9sZEVudHJ5KS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBvbGRFbnRyeVtwcm9wXSA9IGVudHJ5W3Byb3BdO1xuICAgICAgfSk7XG4gICAgICAvLyBUT0RPIHRoaXMgc2hvdWxkIG5vdCBiZSBuZWNlc3NhcnkgYWZ0ZXIgcHJvcGVyIGRldGFjaCBvZiBkYXRhYmFzZS9zdGF0ZVxuXG4gICAgICBlbnRyeSA9IHtcbiAgICAgICAgLi4ub2xkRW50cnksXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKVxuICAgICAgfTtcbiAgICAgIC8vIFRPRE8gZW5kXG5cbiAgICAgIC8vIGVudHJ5ID0ge1xuICAgICAgLy8gICAuLi5vbGRFbnRyeSxcbiAgICAgIC8vICAgLi4uZW50cnksXG4gICAgICAvLyAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKVxuICAgICAgLy8gfTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5zZXQoZW50cnkubW9kZWwuaWQsIGVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGV4aXN0aW5nIHJlc291cmNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uYWxdIC0gQ29udGVudCBmcm9tIGFueSByZXNvdXJjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbmFsLmlkXSAtIFRoZSBpZCBvZiByZXNvdXJjZSB0byBiZSByZW1vdmVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9uYWwucGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IHJlc291cmNlIGZvciBpdCdzXG4gICAqIGNoaWxkcmVuIHRvIGJlIGRlbGV0ZWRcbiAgICovXG4gIHJlbW92ZUl0ZW0gKG9wdGlvbmFsKSB7XG4gICAgaWYgKG9wdGlvbmFsICYmIG9wdGlvbmFsLmlkKSB7XG4gICAgICB0aGlzLnN0YXRlLmRlbGV0ZShvcHRpb25hbC5pZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgb25EaWRVcGRhdGVDb250ZW50IChjYWxsYmFjaykge1xuICAgIHRoaXMuZW1pdHRlci5vbignc3RhdGUtdXBkYXRlLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBvbkRpZEVycm9yQ29udGVudCAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ3N0YXRlLWVycm9yLWNvbnRlbnQnLCBjYWxsYmFjayk7XG4gIH1cbn1cbiJdfQ==