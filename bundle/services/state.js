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
                                 entry, or undefined if none exists
   */
  getEntry(id) {
    return this.state.get(id);
  }

  /**
   * Wrapper to retrieve a group
   * @param {number} id - A valid reference to a group
   * @returns {Object|undefined} If id refers to a group it will return that
                                 group Object, or undefined if none exists
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
                                project Object, or undefined if none exists
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
   *                           two properties `groups` and `projects`
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
        currentIds.push(group.model.id);

        if (!group) {
          return;
        }

        this.setItem(group);
        this.build(candidate, group.model.id, currentIds);
      });
    }

    if (Array.isArray(content.projects)) {
      content.projects.forEach(candidate => {
        const project = this.setProject(candidate, { parentId });
        currentIds.push(project.model.id);

        if (!project) {
          return;
        }

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
                                           children to be deleted
   */
  removeItem(optional) {
    if (optional.id) {
      this.state.delete(optional.id);
    }
  }
};
exports.default = State;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJzdGF0ZSIsIk1hcCIsImNsZWFyIiwibGlzdCIsImVudHJpZXMiLCJpZHMiLCJrZXlzIiwiZ2V0RW50cnkiLCJpZCIsImdldCIsImdldEdyb3VwIiwiZW50cnkiLCJ1bmRlZmluZWQiLCJ0eXBlIiwiZ2V0UHJvamVjdCIsInNldEdyb3VwIiwiY2FuZGlkYXRlIiwib3B0aW9uYWwiLCJoYXNPd25Qcm9wZXJ0eSIsImV4cGFuZGVkIiwicGFyZW50SWQiLCJtb2RlbCIsIm5hbWUiLCJzb3J0QnkiLCJpY29uIiwiZ3JvdXBzIiwicHJvamVjdHMiLCJzZXRQcm9qZWN0IiwicGF0aHMiLCJidWlsZCIsImNvbnRlbnQiLCJjdXJyZW50SWRzIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsImdyb3VwIiwicHVzaCIsInNldEl0ZW0iLCJwcm9qZWN0IiwidXBkYXRlIiwicmVtb3ZlSWRzIiwiaW5jbHVkZXMiLCJyZW1vdmVJdGVtIiwiaGFzIiwib2xkRW50cnkiLCJ1cGRhdGVkQXQiLCJEYXRlIiwibm93Iiwic2V0IiwiZGVsZXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7SUFDcUJBLEssR0FBTixNQUFNQSxLQUFOLENBQVk7O0FBSXpCOzs7QUFHQUMsZ0JBQWU7QUFDYixRQUFJRCxNQUFNRSxRQUFWLEVBQW9CO0FBQ2xCLGFBQU9GLE1BQU1FLFFBQWI7QUFDRDtBQUNERixVQUFNRSxRQUFOLEdBQWlCLElBQWpCOztBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxHQUFKLEVBQWI7QUFDRDs7QUFFRDs7O0FBR0FDLFVBQVM7QUFDUCxTQUFLRixLQUFMLENBQVdFLEtBQVg7QUFDRDs7QUFFRDs7OztBQUlBQyxTQUFRO0FBQ04sV0FBTyxLQUFLSCxLQUFMLENBQVdJLE9BQVgsRUFBUDtBQUNEOztBQUVEOzs7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O0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQStCLGFBQVl6QixRQUFaLEVBQXNCO0FBQ3BCLFFBQUlBLFNBQVNULEVBQWIsRUFBaUI7QUFDZixXQUFLUixLQUFMLENBQVdpRCxNQUFYLENBQWtCaEMsU0FBU1QsRUFBM0I7QUFDRDtBQUNGO0FBN053QixDO2tCQUFOWCxLIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8qKiBTdGF0ZSBtYW5hZ2VtZW50ICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0ZSB7XG5cbiAgc3RhdGljIGluc3RhbmNlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc2luZ2xldG9uIFN0YXRlIGluc3RhbmNlXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgaWYgKFN0YXRlLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gU3RhdGUuaW5zdGFuY2U7XG4gICAgfVxuICAgIFN0YXRlLmluc3RhbmNlID0gdGhpcztcblxuICAgIHRoaXMuc3RhdGUgPSBuZXcgTWFwKCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byBqdXN0IGNsZWFyIHRoZSBzdGF0ZSBNYXBcbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLnN0YXRlLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byBqdXN0IGdldCBhbiBpdGVyYXRvclxuICAgKiBAcmV0dXJucyB7SXRlcmF0b3J9IEFuIGl0ZXJhdG9yIG9mIHRoZSBjdXJyZW50IHN0YXRlIE1hcFxuICAgKi9cbiAgbGlzdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZW50cmllcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgdG8ganVzdCBnZXQgYWxsIHRoZSBjcmVhdGVkIGlkc1xuICAgKiBAcmV0dXJucyB7SXRlcmF0b3J9IEFuIGl0ZXJhdG9yIG9mIHRoZSBjdXJyZW50IHN0YXRlIE1hcFxuICAgKi9cbiAgaWRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5rZXlzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIGVudHJ5IGZyb20gdGhlIHN0YXRlIE1hcFxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBBIHZhbGlkIHJlZmVyZW5jZSB0byBhbiBlbnRyeVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gSWYgaWQgaXMgc2V0IGl0IHdpbGwgcmV0cmlldmUgdGhlIGFzc29jaWF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LCBvciB1bmRlZmluZWQgaWYgbm9uZSBleGlzdHNcbiAgICovXG4gIGdldEVudHJ5IChpZCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmdldChpZCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciB0byByZXRyaWV2ZSBhIGdyb3VwXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIEEgdmFsaWQgcmVmZXJlbmNlIHRvIGEgZ3JvdXBcbiAgICogQHJldHVybnMge09iamVjdHx1bmRlZmluZWR9IElmIGlkIHJlZmVycyB0byBhIGdyb3VwIGl0IHdpbGwgcmV0dXJuIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwIE9iamVjdCwgb3IgdW5kZWZpbmVkIGlmIG5vbmUgZXhpc3RzXG4gICAqL1xuICBnZXRHcm91cCAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZW50cnkudHlwZSA9PT0gJ2dyb3VwJyA/IGVudHJ5IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICogV3JhcHBlciB0byByZXRyaWV2ZSBhIHByb2plY3RcbiAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBBIHZhbGlkIHJlZmVyZW5jZSB0byBhIHByb2plY3RcbiAgKiBAcmV0dXJucyB7T2JqZWN0fHVuZGVmaW5lZH0gSWYgaWQgcmVmZXJzIHRvIGEgcHJvamVjdCBpdCB3aWxsIHJldHVybiB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QgT2JqZWN0LCBvciB1bmRlZmluZWQgaWYgbm9uZSBleGlzdHNcbiAgICovXG4gIGdldFByb2plY3QgKGlkKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0JyA/IGVudHJ5IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBuZXcgZ3JvdXAgT2JqZWN0IGJhc2VkIG9uIGEgY2FuZGlkYXRlIE9iamVjdFxuICAgKiBAcGFyYW0ge09iamVjdH0gY2FuZGlkYXRlIC0gQW4gb2JqZWN0IHdpdGggYSBjYW5kaWRhdGUgZm9yIGEgZ3JvdXBcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25hbD17fV0gLSBBbnkgb3B0aW9uYWwgaW5mb3JtYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25hbC5wYXJlbnRJZF0gLSBUaGUgaWQgb2YgYSBwYXJlbnQgZ3JvdXBcbiAgICogQHJldHVybnMge09iamVjdH0gQSBncm91cCBPYmplY3RcbiAgICovXG4gIHNldEdyb3VwIChjYW5kaWRhdGUsIG9wdGlvbmFsID0ge30pIHtcblxuICAgIGlmICghY2FuZGlkYXRlLmhhc093blByb3BlcnR5KCduYW1lJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgIHBhcmVudElkOiBvcHRpb25hbC5wYXJlbnRJZCxcbiAgICAgIG1vZGVsOiB7XG4gICAgICAgIGlkOiBjYW5kaWRhdGUuaWQgfHwgdXVpZCgpLFxuICAgICAgICBuYW1lOiBjYW5kaWRhdGUubmFtZSxcbiAgICAgICAgc29ydEJ5OiBjYW5kaWRhdGUuc29ydEJ5IHx8ICdwb3NpdGlvbicsXG4gICAgICAgIGljb246IGNhbmRpZGF0ZS5pY29uLFxuICAgICAgICBncm91cHM6IGNhbmRpZGF0ZS5ncm91cHMgfHwgW10sXG4gICAgICAgIHByb2plY3RzOiBjYW5kaWRhdGUucHJvamVjdHMgfHwgW11cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgYSBuZXcgcHJvamVjdCBPYmplY3QgYmFzZWQgb24gYSBjYW5kaWRhdGUgT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjYW5kaWRhdGUgLSBBbiBvYmplY3Qgd2l0aCBhIGNhbmRpZGF0ZSBmb3IgYSBwcm9qZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uYWw9e31dIC0gQW55IG9wdGlvbmFsIGluZm9ybWF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9uYWwucGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IGdyb3VwXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgcHJvamVjdCBPYmplY3RcbiAgICovXG4gIHNldFByb2plY3QgKGNhbmRpZGF0ZSwgb3B0aW9uYWwgPSB7fSkge1xuXG4gICAgaWYgKCFjYW5kaWRhdGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBwYXJlbnRJZDogb3B0aW9uYWwucGFyZW50SWQsXG4gICAgICBtb2RlbDoge1xuICAgICAgICBpZDogY2FuZGlkYXRlLmlkIHx8IHV1aWQoKSxcbiAgICAgICAgbmFtZTogY2FuZGlkYXRlLm5hbWUsXG4gICAgICAgIHBhdGhzOiBjYW5kaWRhdGUucGF0aHMgfHwgW10sXG4gICAgICAgIGljb246IGNhbmRpZGF0ZS5pY29uXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjdXJyZW50IHN0YXRlIHdpdGggYSBnaXZlbiBub3JtYWxpemVkIGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRlbnQgLSBDb250ZW50IGZyb20gYSByZXNvdXJjZSBhbmQgc2hvdWxkIGhhdmUgb25seVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHR3byBwcm9wZXJ0aWVzIGBncm91cHNgIGFuZCBgcHJvamVjdHNgXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGFyZW50SWRdIC0gVGhlIGlkIG9mIGEgcGFyZW50IGdyb3VwXG4gICAqIEBwYXJhbSB7QXJyYXl9IGN1cnJlbnRJZHMgLSBBIGxpc3Qgb2YgYWxsIGlkcyBjcmVhdGVkIC8gdXBkYXRlZFxuICAgKiBAZXhhbXBsZSAgeyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfVxuICAgKi9cbiAgYnVpbGQgKGNvbnRlbnQsIHBhcmVudElkLCBjdXJyZW50SWRzKSB7XG4gICAgaWYgKCFjb250ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudC5ncm91cHMpKSB7XG4gICAgICBjb250ZW50Lmdyb3Vwcy5mb3JFYWNoKGNhbmRpZGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5zZXRHcm91cChjYW5kaWRhdGUsIHsgcGFyZW50SWQgfSk7XG4gICAgICAgIGN1cnJlbnRJZHMucHVzaChncm91cC5tb2RlbC5pZCk7XG5cbiAgICAgICAgaWYgKCFncm91cCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SXRlbShncm91cCk7XG4gICAgICAgIHRoaXMuYnVpbGQoY2FuZGlkYXRlLCBncm91cC5tb2RlbC5pZCwgY3VycmVudElkcyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50LnByb2plY3RzKSkge1xuICAgICAgY29udGVudC5wcm9qZWN0cy5mb3JFYWNoKGNhbmRpZGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnNldFByb2plY3QoY2FuZGlkYXRlLCB7IHBhcmVudElkIH0pO1xuICAgICAgICBjdXJyZW50SWRzLnB1c2gocHJvamVjdC5tb2RlbC5pZCk7XG5cbiAgICAgICAgaWYgKCFwcm9qZWN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRJdGVtKHByb2plY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgZm9yIGJ1aWxkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZW50IC0gQ29udGVudCBmcm9tIGFueSByZXNvdXJjZVxuICAgKi9cbiAgdXBkYXRlIChjb250ZW50KSB7XG4gICAgY29uc3QgY3VycmVudElkcyA9IFtdO1xuICAgIHRoaXMuYnVpbGQoY29udGVudCwgdW5kZWZpbmVkLCBjdXJyZW50SWRzKTtcblxuICAgIGNvbnN0IHJlbW92ZUlkcyA9IFtdO1xuICAgIGZvciAoY29uc3QgaWQgb2YgdGhpcy5pZHMoKSkge1xuICAgICAgaWYgKCFjdXJyZW50SWRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICByZW1vdmVJZHMucHVzaChpZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlSWRzLmZvckVhY2goaWQgPT4gdGhpcy5yZW1vdmVJdGVtKHsgaWQgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgbmV3IGNvbnRlbnQgb3IgdXBkYXRlcyBhbiBleGlzdGluZyByZXNvdXJjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBDb250ZW50IGZyb20gYW55IHJlc291cmNlXG4gICAqL1xuICBzZXRJdGVtIChlbnRyeSkge1xuICAgIGlmIChlbnRyeS5tb2RlbC5pZCAmJiB0aGlzLnN0YXRlLmhhcyhlbnRyeS5tb2RlbC5pZCkpIHtcbiAgICAgIGNvbnN0IG9sZEVudHJ5ID0gdGhpcy5zdGF0ZS5nZXQoZW50cnkubW9kZWwuaWQpO1xuXG4gICAgICBlbnRyeSA9IHtcbiAgICAgICAgLi4ub2xkRW50cnksXG4gICAgICAgIC4uLmVudHJ5LFxuICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KClcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuc3RhdGUuc2V0KGVudHJ5Lm1vZGVsLmlkLCBlbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBleGlzdGluZyByZXNvdXJjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbmFsXSAtIENvbnRlbnQgZnJvbSBhbnkgcmVzb3VyY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25hbC5pZF0gLSBUaGUgaWQgb2YgcmVzb3VyY2UgdG8gYmUgcmVtb3ZlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbmFsLnBhcmVudElkXSAtIFRoZSBpZCBvZiBhIHBhcmVudCByZXNvdXJjZSBmb3IgaXQnc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuIHRvIGJlIGRlbGV0ZWRcbiAgICovXG4gIHJlbW92ZUl0ZW0gKG9wdGlvbmFsKSB7XG4gICAgaWYgKG9wdGlvbmFsLmlkKSB7XG4gICAgICB0aGlzLnN0YXRlLmRlbGV0ZShvcHRpb25hbC5pZCk7XG4gICAgfVxuICB9XG59XG4iXX0=