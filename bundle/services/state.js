'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** State management */
let State = class State {

  /**
   * Creates a singleton State instance
   */
  constructor() {
    if (State.instance) {
      return State.instance;
    }
    State.instance = this;

    this.state = new Map();
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
  build(content, parentId, currentIds) {
    if (!content) {
      return;
    }

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
    const currentIds = [];
    this.build(content, undefined, currentIds);

    const removeIds = [];
    for (const id of this.ids()) {
      if (!currentIds.includes(id)) {
        removeIds.push(id);
      }
    }

    removeIds.forEach(id => this.removeItem({ id }));
  }

  /**
   * Appends new content or updates an existing resource
   * @param {Object} entry - Content from any resource
   */
  setItem(entry) {
    if (entry.model.id && this.state.has(entry.model.id)) {
      const oldEntry = this.state.get(entry.model.id);

      entry = _extends({}, oldEntry, entry, {
        updatedAt: Date.now()
      });
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
};
exports.default = State;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJzdGF0ZSIsIk1hcCIsImNsZWFyIiwibGlzdCIsImVudHJpZXMiLCJpZHMiLCJrZXlzIiwiZ2V0RW50cnkiLCJpZCIsImdldCIsImdldEdyb3VwIiwiZW50cnkiLCJ1bmRlZmluZWQiLCJ0eXBlIiwiZ2V0UHJvamVjdCIsInNldEdyb3VwIiwiY2FuZGlkYXRlIiwib3B0aW9uYWwiLCJoYXNPd25Qcm9wZXJ0eSIsImV4cGFuZGVkIiwicGFyZW50SWQiLCJtb2RlbCIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJzZXRQcm9qZWN0IiwicGF0aHMiLCJidWlsZCIsImNvbnRlbnQiLCJjdXJyZW50SWRzIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImdyb3VwIiwicHVzaCIsInNldEl0ZW0iLCJwcm9qZWN0IiwidXBkYXRlIiwicmVtb3ZlSWRzIiwiaW5jbHVkZXMiLCJyZW1vdmVJdGVtIiwiaGFzIiwib2xkRW50cnkiLCJ1cGRhdGVkQXQiLCJEYXRlIiwibm93Iiwic2V0IiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7SUFDcUJBLEssR0FBTixNQUFNQSxLQUFOLENBQVk7O0FBR3pCOzs7QUFHQUMsZ0JBQWU7QUFDYixRQUFJRCxNQUFNRSxRQUFWLEVBQW9CO0FBQ2xCLGFBQU9GLE1BQU1FLFFBQWI7QUFDRDtBQUNERixVQUFNRSxRQUFOLEdBQWlCLElBQWpCOztBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxHQUFKLEVBQWI7QUFDRDs7QUFFRDs7O0FBR0FDLFVBQVM7QUFDUCxTQUFLRixLQUFMLENBQVdFLEtBQVg7QUFDRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ04sV0FBTyxLQUFLSCxLQUFMLENBQVdJLE9BQVgsRUFBUDtBQUNEOztBQUVEOzs7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QjtBQUNEOztBQUVEOzs7Ozs7O0FBT0ErQixhQUFZekIsUUFBWixFQUFzQjtBQUNwQixRQUFJQSxZQUFZQSxTQUFTVCxFQUF6QixFQUE2QjtBQUMzQixXQUFLUixLQUFMLENBQVdpRCxNQUFYLENBQWtCaEMsU0FBU1QsRUFBM0I7QUFDRDtBQUNGO0FBNU53QixDO2tCQUFOWCxLIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8qKiBTdGF0ZSBtYW5hZ2VtZW50ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZSB7XG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNpbmdsZXRvbiBTdGF0ZSBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChTdGF0ZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFN0YXRlLmluc3RhbmNlO1xuICAgIH1cbiAgICBTdGF0ZS5pbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLnN0YXRlID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgdG8ganVzdCBjbGVhciB0aGUgc3RhdGUgTWFwXG4gICAqL1xuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zdGF0ZS5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgdG8ganVzdCBnZXQgYW4gaXRlcmF0b3JcbiAgICogQHJldHVybnMge0l0ZXJhdG9yfSBBbiBpdGVyYXRvciBvZiB0aGUgY3VycmVudCBzdGF0ZSBNYXBcbiAgICovXG4gIGxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmVudHJpZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIHRvIGp1c3QgZ2V0IGFsbCB0aGUgY3JlYXRlZCBpZHNcbiAgICogQHJldHVybnMge0l0ZXJhdG9yfSBBbiBpdGVyYXRvciBvZiB0aGUgY3VycmVudCBzdGF0ZSBNYXBcbiAgICovXG4gIGlkcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUua2V5cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhbiBlbnRyeSBmcm9tIHRoZSBzdGF0ZSBNYXBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gQSB2YWxpZCByZWZlcmVuY2UgdG8gYW4gZW50cnlcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IElmIGlkIGlzIHNldCBpdCB3aWxsIHJldHJpZXZlIHRoZSBhc3NvY2lhdGVkXG4gICAqIGVudHJ5LCBvciB1bmRlZmluZWQgaWYgbm9uZSBleGlzdHNcbiAgICovXG4gIGdldEVudHJ5IChpZCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChpZCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byByZXRyaWV2ZSBhIGdyb3VwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEEgdmFsaWQgcmVmZXJlbmNlIHRvIGEgZ3JvdXBcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IElmIGlkIHJlZmVycyB0byBhIGdyb3VwIGl0IHdpbGwgcmV0dXJuIHRoYXRcbiAgICogZ3JvdXAgT2JqZWN0LCBvciB1bmRlZmluZWQgaWYgbm9uZSBleGlzdHNcbiAgICovXG4gIGdldEdyb3VwIChpZCkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBlbnRyeS50eXBlID09PSAnZ3JvdXAnID8gZW50cnkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgKiBXcmFwcGVyIHRvIHJldHJpZXZlIGEgcHJvamVjdFxuICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEEgdmFsaWQgcmVmZXJlbmNlIHRvIGEgcHJvamVjdFxuICAqIEByZXR1cm5zIHtPYmplY3R8dW5kZWZpbmVkfSBJZiBpZCByZWZlcnMgdG8gYSBwcm9qZWN0IGl0IHdpbGwgcmV0dXJuIHRoYXRcbiAgKiBwcm9qZWN0IE9iamVjdCwgb3IgdW5kZWZpbmVkIGlmIG5vbmUgZXhpc3RzXG4gICAqL1xuICBnZXRQcm9qZWN0IChpZCkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBlbnRyeS50eXBlID09PSAncHJvamVjdCcgPyBlbnRyeSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGEgbmV3IGdyb3VwIE9iamVjdCBiYXNlZCBvbiBhIGNhbmRpZGF0ZSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbmRpZGF0ZSAtIEFuIG9iamVjdCB3aXRoIGEgY2FuZGlkYXRlIGZvciBhIGdyb3VwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uYWw9e31dIC0gQW55IG9wdGlvbmFsIGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9uYWwucGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IGdyb3VwXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgZ3JvdXAgT2JqZWN0XG4gICAqL1xuICBzZXRHcm91cCAoY2FuZGlkYXRlLCBvcHRpb25hbCA9IHt9KSB7XG4gICAgaWYgKCFjYW5kaWRhdGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgcGFyZW50SWQ6IG9wdGlvbmFsLnBhcmVudElkLFxuICAgICAgbW9kZWw6IHtcbiAgICAgICAgaWQ6IGNhbmRpZGF0ZS5pZCB8fCB1dWlkKCksXG4gICAgICAgIG5hbWU6IGNhbmRpZGF0ZS5uYW1lLFxuICAgICAgICBzb3J0Qnk6IGNhbmRpZGF0ZS5zb3J0QnkgfHwgJ3Bvc2l0aW9uJyxcbiAgICAgICAgaWNvbjogY2FuZGlkYXRlLmljb24sXG4gICAgICAgIGdyb3VwczogY2FuZGlkYXRlLmdyb3VwcyB8fCBbXSxcbiAgICAgICAgcHJvamVjdHM6IGNhbmRpZGF0ZS5wcm9qZWN0cyB8fCBbXVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBhIG5ldyBwcm9qZWN0IE9iamVjdCBiYXNlZCBvbiBhIGNhbmRpZGF0ZSBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGNhbmRpZGF0ZSAtIEFuIG9iamVjdCB3aXRoIGEgY2FuZGlkYXRlIGZvciBhIHByb2plY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25hbD17fV0gLSBBbnkgb3B0aW9uYWwgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25hbC5wYXJlbnRJZF0gLSBUaGUgaWQgb2YgYSBwYXJlbnQgZ3JvdXBcbiAgICogQHJldHVybnMge09iamVjdH0gQSBwcm9qZWN0IE9iamVjdFxuICAgKi9cbiAgc2V0UHJvamVjdCAoY2FuZGlkYXRlLCBvcHRpb25hbCA9IHt9KSB7XG4gICAgaWYgKCFjYW5kaWRhdGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBwYXJlbnRJZDogb3B0aW9uYWwucGFyZW50SWQsXG4gICAgICBtb2RlbDoge1xuICAgICAgICBpZDogY2FuZGlkYXRlLmlkIHx8IHV1aWQoKSxcbiAgICAgICAgbmFtZTogY2FuZGlkYXRlLm5hbWUsXG4gICAgICAgIHBhdGhzOiBjYW5kaWRhdGUucGF0aHMgfHwgW10sXG4gICAgICAgIGljb246IGNhbmRpZGF0ZS5pY29uXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHN0YXRlIHdpdGggYSBnaXZlbiBub3JtYWxpemVkIGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBDb250ZW50IGZyb20gYSByZXNvdXJjZSBhbmQgc2hvdWxkIGhhdmUgb25seVxuICAgKiB0d28gcHJvcGVydGllcyBgZ3JvdXBzYCBhbmQgYHByb2plY3RzYFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3BhcmVudElkXSAtIFRoZSBpZCBvZiBhIHBhcmVudCBncm91cFxuICAgKiBAcGFyYW0ge0FycmF5fSBjdXJyZW50SWRzIC0gQSBsaXN0IG9mIGFsbCBpZHMgY3JlYXRlZCAvIHVwZGF0ZWRcbiAgICogQGV4YW1wbGUgIHsgZ3JvdXBzOiBbXSwgcHJvamVjdHM6IFtdIH1cbiAgICovXG4gIGJ1aWxkIChjb250ZW50LCBwYXJlbnRJZCwgY3VycmVudElkcykge1xuICAgIGlmICghY29udGVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQuZ3JvdXBzKSkge1xuICAgICAgY29udGVudC5ncm91cHMuZm9yRWFjaChjYW5kaWRhdGUgPT4ge1xuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuc2V0R3JvdXAoY2FuZGlkYXRlLCB7IHBhcmVudElkIH0pO1xuXG4gICAgICAgIGlmICghZ3JvdXApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50SWRzLnB1c2goZ3JvdXAubW9kZWwuaWQpO1xuXG4gICAgICAgIHRoaXMuc2V0SXRlbShncm91cCk7XG4gICAgICAgIHRoaXMuYnVpbGQoY2FuZGlkYXRlLCBncm91cC5tb2RlbC5pZCwgY3VycmVudElkcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50LnByb2plY3RzKSkge1xuICAgICAgY29udGVudC5wcm9qZWN0cy5mb3JFYWNoKGNhbmRpZGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnNldFByb2plY3QoY2FuZGlkYXRlLCB7IHBhcmVudElkIH0pO1xuXG4gICAgICAgIGlmICghcHJvamVjdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRJZHMucHVzaChwcm9qZWN0Lm1vZGVsLmlkKTtcblxuICAgICAgICB0aGlzLnNldEl0ZW0ocHJvamVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBmb3IgYnVpbGRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBDb250ZW50IGZyb20gYW55IHJlc291cmNlXG4gICAqL1xuICB1cGRhdGUgKGNvbnRlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50SWRzID0gW107XG4gICAgdGhpcy5idWlsZChjb250ZW50LCB1bmRlZmluZWQsIGN1cnJlbnRJZHMpO1xuXG4gICAgY29uc3QgcmVtb3ZlSWRzID0gW107XG4gICAgZm9yIChjb25zdCBpZCBvZiB0aGlzLmlkcygpKSB7XG4gICAgICBpZiAoIWN1cnJlbnRJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICAgIHJlbW92ZUlkcy5wdXNoKGlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVJZHMuZm9yRWFjaChpZCA9PiB0aGlzLnJlbW92ZUl0ZW0oeyBpZCB9KSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBuZXcgY29udGVudCBvciB1cGRhdGVzIGFuIGV4aXN0aW5nIHJlc291cmNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIENvbnRlbnQgZnJvbSBhbnkgcmVzb3VyY2VcbiAgICovXG4gIHNldEl0ZW0gKGVudHJ5KSB7XG4gICAgaWYgKGVudHJ5Lm1vZGVsLmlkICYmIHRoaXMuc3RhdGUuaGFzKGVudHJ5Lm1vZGVsLmlkKSkge1xuICAgICAgY29uc3Qgb2xkRW50cnkgPSB0aGlzLnN0YXRlLmdldChlbnRyeS5tb2RlbC5pZCk7XG5cbiAgICAgIGVudHJ5ID0ge1xuICAgICAgICAuLi5vbGRFbnRyeSxcbiAgICAgICAgLi4uZW50cnksXG4gICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5zZXQoZW50cnkubW9kZWwuaWQsIGVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFuIGV4aXN0aW5nIHJlc291cmNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uYWxdIC0gQ29udGVudCBmcm9tIGFueSByZXNvdXJjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbmFsLmlkXSAtIFRoZSBpZCBvZiByZXNvdXJjZSB0byBiZSByZW1vdmVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9uYWwucGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IHJlc291cmNlIGZvciBpdCdzXG4gICAqIGNoaWxkcmVuIHRvIGJlIGRlbGV0ZWRcbiAgICovXG4gIHJlbW92ZUl0ZW0gKG9wdGlvbmFsKSB7XG4gICAgaWYgKG9wdGlvbmFsICYmIG9wdGlvbmFsLmlkKSB7XG4gICAgICB0aGlzLnN0YXRlLmRlbGV0ZShvcHRpb25hbC5pZCk7XG4gICAgfVxuICB9XG59XG4iXX0=