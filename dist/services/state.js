"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _atom = require("atom");

var _base = require("../constants/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable-next-line require-jsdoc */
class State {
  /* eslint-disable-next-line require-jsdoc */
  activate() {
    this.mapping = new Map();
    this.emitter = new _atom.Emitter();
  }
  /**
   * Clears the mapping
   */


  deactivate() {
    this.emitter.dispose();
    this.mapping.clear();
  }
  /**
   * Clears the mapping
   */


  clearState() {
    this.mapping.clear();
    this.emitter.emit('did-change-state');
  }
  /* eslint-disable-next-line require-jsdoc */


  createGroup() {
    var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var childrenIds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;
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


  createProject() {
    var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
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
    var id = isRoot ? NaN : entry.id || (0, _uuid.default)();
    var childrenIds = [];
    entry.groups.forEach(group => childrenIds.push(this.deserializeGroupAndReturnId(group, false, id)));
    entry.projects.forEach(project => childrenIds.push(this.deserializeProjectAndReturnId(project, id)));
    var group = this.createGroup(entry, childrenIds, isRoot ? undefined : parentId);
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
    var id = entry.id || (0, _uuid.default)();
    var project = this.createProject(entry, parentId);
    this.mapping.set(id, project);
    return id;
  }
  /**
   * Parse state to store in cache or file
   * @param {number} id - the current id of the group (NaN for root)
   * @param {boolean} withContext - false for saving to file
   * @returns {Object} the serialized state
   */


  serializeGroupById(id) {
    var withContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var level = {
      groups: [],
      projects: []
    };
    var group = this.getEntry(id || NaN);

    if (!group) {
      return level;
    }

    group.childrenIds.forEach(childId => {
      var entry = this.getEntry(childId);

      if (entry.type === 'group') {
        var serializedLevel = this.serializeGroupById(childId, withContext);
        level.groups.push(_objectSpread({}, withContext ? {
          id: childId
        } : {}, {}, withContext ? {
          parentId: id
        } : {}, {
          name: entry.name,
          icon: entry.icon,
          order: entry.order
        }, withContext ? {
          folding: entry.folding
        } : {}, {}, serializedLevel));
      } else if (entry.type === 'project') {
        level.projects.push(_objectSpread({}, withContext ? {
          id: childId
        } : {}, {}, withContext ? {
          parentId: id
        } : {}, {
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
    var entry = this.getEntry(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, _objectSpread({}, entry, {}, state));
  }
  /* eslint-disable-next-line require-jsdoc */


  getEntry(id) {
    return this.mapping.get(id);
  }
  /* eslint-disable-next-line require-jsdoc */


  deleteEntry(id) {
    var entry = this.getEntry(id);

    if (entry.type === 'group') {
      entry.childrenIds.forEach(childId => this.deleteEntry(childId));
    }

    if (entry.parentId || isNaN(entry.parentId)) {
      var group = this.getEntry(entry.parentId);
      var idx = group.childrenIds.indexOf(id);
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


  getProjectsInGroup(groupId) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (this.mapping.size === 0) {
      return list;
    }

    var group = this.getEntry(groupId || NaN);

    if (!group || group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      var entry = this.getEntry(entryId);

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
  /**
   * Given an group id it will search all groups underneath it
   * @param {number} groupId - the group id to search for groups
   * @param {array} list - the container for all groups
   * @returns {array} the container for all groups
   */


  getGroupsInGroup(groupId) {
    var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var group = this.getEntry(groupId || NaN);

    if (!group || group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      var entry = this.getEntry(entryId);

      if (entry.type === 'group') {
        var subList = [];
        acc.push({
          id: entryId,
          name: entry.name,
          groups: this.getGroupsInGroup(entryId, subList)
        });
      }

      return acc;
    }, list);
  }
  /* eslint-disable-next-line require-jsdoc */


  editEntry(id, newState) {
    var entry = this.getEntry(id);

    if (entry.parentId !== newState.parentId) {
      var oldParent = this.getEntry(entry.parentId);
      var newParent = this.getEntry(newState.parentId);
      oldParent.childrenIds.splice(oldParent.childrenIds.indexOf(id), 1);
      newParent.childrenIds.push(id);
    }

    this.fullOrParcialUpdateExistingEntry(id, newState);
    this.emitter.emit('did-change-state');
  }
  /* eslint-disable-next-line require-jsdoc */


  addEntry(entry) {
    if (!entry) {
      return;
    }

    console.log('entry', entry);
    var id = (0, _uuid.default)();
    this.mapping.set(id, entry);
    var parent = this.getEntry(entry.parentId);

    if (parent) {
      parent.childrenIds.push(id);
    }

    this.fullOrParcialUpdateExistingEntry(entry.parentId, parent);
    this.emitter.emit('did-change-state');
  }
  /* eslint-disable-next-line require-jsdoc */


  setParentOfEntry(entryId) {
    var parentId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

    if (entryId === parentId || entryId === _base.DOCK_URI) {
      return;
    }

    var entry = this.getEntry(entryId);
    var oldParent = this.getEntry(entry.parentId);
    var newParent = this.getEntry(parentId);

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

} // same instance is shared across the package


var _default = new State();

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImFjdGl2YXRlIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjbGVhciIsImNsZWFyU3RhdGUiLCJlbWl0IiwiY3JlYXRlR3JvdXAiLCJlbnRyeSIsImNoaWxkcmVuSWRzIiwicGFyZW50SWQiLCJOYU4iLCJ0eXBlIiwibmFtZSIsImljb24iLCJvcmRlciIsImZvbGRpbmciLCJjcmVhdGVQcm9qZWN0IiwicGF0aHMiLCJkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQiLCJpc1Jvb3QiLCJpZCIsImdyb3VwcyIsImZvckVhY2giLCJncm91cCIsInB1c2giLCJwcm9qZWN0cyIsInByb2plY3QiLCJkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCIsInVuZGVmaW5lZCIsInNldCIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIndpdGhDb250ZXh0IiwibGV2ZWwiLCJnZXRFbnRyeSIsImNoaWxkSWQiLCJzZXJpYWxpemVkTGV2ZWwiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInN0YXRlIiwiRXJyb3IiLCJnZXQiLCJkZWxldGVFbnRyeSIsImlzTmFOIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImdldFByb2plY3RzSW5Hcm91cCIsImdyb3VwSWQiLCJsaXN0Iiwic2l6ZSIsInJlZHVjZSIsImFjYyIsImVudHJ5SWQiLCJnZXRHcm91cHNJbkdyb3VwIiwic3ViTGlzdCIsImVkaXRFbnRyeSIsIm5ld1N0YXRlIiwib2xkUGFyZW50IiwibmV3UGFyZW50IiwiYWRkRW50cnkiLCJjb25zb2xlIiwibG9nIiwicGFyZW50Iiwic2V0UGFyZW50T2ZFbnRyeSIsIkRPQ0tfVVJJIiwiaW5pdGlhbGl6ZVN0YXRlIiwiY3VycmVudFN0YXRlIiwib25EaWRDaGFuZ2VTdGF0ZSIsImNiIiwi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QUF0QixDQUE4QlMsT0FBOUIsQ0FBN0IsRUFBcUUsQ0FBckU7QUFFQU0sSUFBQUEsU0FBUyxDQUFDbEQsV0FBVixDQUFzQmdCLElBQXRCLENBQTJCNEIsT0FBM0I7QUFFQTdDLElBQUFBLEtBQUssQ0FBQ0UsUUFBTixHQUFpQkEsUUFBakI7QUFFQSxTQUFLMkIsZ0NBQUwsQ0FBc0NnQixPQUF0QyxFQUErQzdDLEtBQS9DO0FBQ0EsU0FBSzZCLGdDQUFMLENBQXNDN0IsS0FBSyxDQUFDRSxRQUE1QyxFQUFzRGdELFNBQXREO0FBQ0EsU0FBS3JCLGdDQUFMLENBQXNDM0IsUUFBdEMsRUFBZ0RpRCxTQUFoRDtBQUVBLFNBQUszRCxPQUFMLENBQWFNLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7QUFFRDs7O0FBQ0E0RCxFQUFBQSxlQUFlLENBQUVDLFlBQUYsRUFBZ0I7QUFDN0IsU0FBS2hELDJCQUFMLENBQWlDZ0QsWUFBakMsRUFBK0MsSUFBL0M7QUFDQSxTQUFLbkUsT0FBTCxDQUFhTSxJQUFiLENBQWtCLGtCQUFsQjtBQUNEO0FBRUQ7OztBQUNBOEQsRUFBQUEsZ0JBQWdCLENBQUVDLEVBQUYsRUFBTTtBQUNwQixTQUFLckUsT0FBTCxDQUFhc0UsRUFBYixDQUFnQixrQkFBaEIsRUFBb0NELEVBQXBDO0FBQ0Q7O0FBN1RTLEMsQ0FnVVo7OztlQUNlLElBQUl6RSxLQUFKLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuaW1wb3J0IHsgRE9DS19VUkkgfSBmcm9tICcuLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG5jbGFzcyBTdGF0ZSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFjdGl2YXRlICgpIHtcbiAgICB0aGlzLm1hcHBpbmcgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGRlYWN0aXZhdGUgKCkge1xuICAgIHRoaXMuZW1pdHRlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5tYXBwaW5nLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBtYXBwaW5nXG4gICAqL1xuICBjbGVhclN0YXRlICgpIHtcbiAgICB0aGlzLm1hcHBpbmcuY2xlYXIoKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlR3JvdXAgKGVudHJ5ID0ge30sIGNoaWxkcmVuSWRzID0gW10sIHBhcmVudElkID0gTmFOKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICBuYW1lOiBlbnRyeS5uYW1lIHx8ICcnLFxuICAgICAgaWNvbjogZW50cnkuaWNvbiB8fCAnJyxcbiAgICAgIG9yZGVyOiBlbnRyeS5vcmRlciB8fCAnYWxwaGFiZXRpY2FsbHknLFxuICAgICAgZm9sZGluZzogZW50cnkuZm9sZGluZyB8fCAnY29sbGFwc2VkJyxcbiAgICAgIGNoaWxkcmVuSWRzLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY3JlYXRlUHJvamVjdCAoZW50cnkgPSB7fSwgcGFyZW50SWQgPSBOYU4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3Byb2plY3QnLFxuICAgICAgbmFtZTogZW50cnkubmFtZSB8fCAnJyxcbiAgICAgIGljb246IGVudHJ5Lmljb24gfHwgJycsXG4gICAgICBwYXRoczogZW50cnkucGF0aHMgfHwgW10sXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC4gSW4gY2FzZSBvZiB0aGUgcm9vdFxuICAgKiBsZXZlbCwgdGhlIG9iamVjdCBpcyBzdG9yZWQgd2l0aCB0aGUgXCJpZFwiIE5hTi5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggZ3JvdXAgY29udGVudFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUm9vdCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyZW50SWQgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBncm91cFxuICAgKi9cbiAgZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIChlbnRyeSwgaXNSb290LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gaXNSb290ID8gTmFOIDogZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IGNoaWxkcmVuSWRzID0gW107XG5cbiAgICBlbnRyeS5ncm91cHMuZm9yRWFjaChncm91cCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChncm91cCwgZmFsc2UsIGlkKSlcbiAgICApO1xuXG4gICAgZW50cnkucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQocHJvamVjdCwgaWQpKVxuICAgICk7XG5cbiAgICBjb25zdCBncm91cCA9IHRoaXMuY3JlYXRlR3JvdXAoXG4gICAgICBlbnRyeSxcbiAgICAgIGNoaWxkcmVuSWRzLFxuICAgICAgaXNSb290ID8gdW5kZWZpbmVkIDogcGFyZW50SWRcbiAgICApO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZ3JvdXApO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyZW50SWQgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGlkIG9mIHRoZSBkZXNlcmlhbGl6ZWQgcHJvamVjdFxuICAgKi9cbiAgZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQgKGVudHJ5LCBwYXJlbnRJZCkge1xuICAgIGNvbnN0IGlkID0gZW50cnkuaWQgfHwgdXVpZCgpO1xuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLmNyZWF0ZVByb2plY3QoZW50cnksIHBhcmVudElkKTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHByb2plY3QpO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHN0YXRlIHRvIHN0b3JlIGluIGNhY2hlIG9yIGZpbGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gdGhlIGN1cnJlbnQgaWQgb2YgdGhlIGdyb3VwIChOYU4gZm9yIHJvb3QpXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aENvbnRleHQgLSBmYWxzZSBmb3Igc2F2aW5nIHRvIGZpbGVcbiAgICogQHJldHVybnMge09iamVjdH0gdGhlIHNlcmlhbGl6ZWQgc3RhdGVcbiAgICovXG4gIHNlcmlhbGl6ZUdyb3VwQnlJZCAoaWQsIHdpdGhDb250ZXh0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoaWQgfHwgTmFOKTtcblxuICAgIGlmICghZ3JvdXApIHtcbiAgICAgIHJldHVybiBsZXZlbDtcbiAgICB9XG5cbiAgICBncm91cC5jaGlsZHJlbklkcy5mb3JFYWNoKGNoaWxkSWQgPT4ge1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGNoaWxkSWQpO1xuXG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBjb25zdCBzZXJpYWxpemVkTGV2ZWwgPSB0aGlzLnNlcmlhbGl6ZUdyb3VwQnlJZChjaGlsZElkLCB3aXRoQ29udGV4dCk7XG5cbiAgICAgICAgbGV2ZWwuZ3JvdXBzLnB1c2goe1xuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBpZDogY2hpbGRJZCB9IDoge30sXG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IHBhcmVudElkOiBpZCB9IDoge30sXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgZm9sZGluZzogZW50cnkuZm9sZGluZyB9IDoge30sXG4gICAgICAgICAgLi4uc2VyaWFsaXplZExldmVsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZW50cnkudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICAgIGxldmVsLnByb2plY3RzLnB1c2goe1xuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBpZDogY2hpbGRJZCB9IDoge30sXG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IHBhcmVudElkOiBpZCB9IDoge30sXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFyY2lhbGx5IG9yIGZ1bGx5IGFuIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gdGhlIG5ldyBzdGF0ZSAocGFydGlhbCBwYXJhbWV0ZXJzIG9yIGFsbCBvZiB0aGVtKVxuICAgKi9cbiAgZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkgKGlkLCBzdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhpc3RpbmdfZW50cnknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCB7XG4gICAgICAuLi5lbnRyeSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRFbnRyeSAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nLmdldChpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGVudHJ5LmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB0aGlzLmRlbGV0ZUVudHJ5KGNoaWxkSWQpKTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkucGFyZW50SWQgfHwgaXNOYU4oZW50cnkucGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuICAgICAgY29uc3QgaWR4ID0gZ3JvdXAuY2hpbGRyZW5JZHMuaW5kZXhPZihpZCk7XG4gICAgICBncm91cC5jaGlsZHJlbklkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIGdyb3VwKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuZGVsZXRlKGlkKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGdyb3VwIGlkIGl0IHdpbGwgc2VhcmNoIGFsbCBwcm9qZWN0cyB1bmRlcm5lYXRoIGl0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBncm91cElkIC0gdGhlIGdyb3VwIGlkIHRvIHNlYXJjaCBmb3IgcHJvamVjdHNcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdCAtIHRoZSBjb250YWluZXIgZm9yIGFsbCBwcm9qZWN0c1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHRoZSBjb250YWluZXIgZm9yIGFsbCBwcm9qZWN0c1xuICAgKi9cbiAgZ2V0UHJvamVjdHNJbkdyb3VwIChncm91cElkLCBsaXN0ID0gW10pIHtcbiAgICBpZiAodGhpcy5tYXBwaW5nLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90X2FfZ3JvdXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuY2hpbGRyZW5JZHMucmVkdWNlKChhY2MsIGVudHJ5SWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdHNJbkdyb3VwKGVudHJ5SWQsIGFjYyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgIGlkOiBlbnRyeUlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGdyb3VwIGlkIGl0IHdpbGwgc2VhcmNoIGFsbCBncm91cHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIGdyb3Vwc1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIGdyb3Vwc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHRoZSBjb250YWluZXIgZm9yIGFsbCBncm91cHNcbiAgICovXG4gIGdldEdyb3Vwc0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90X2FfZ3JvdXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuY2hpbGRyZW5JZHMucmVkdWNlKChhY2MsIGVudHJ5SWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHN1Ykxpc3QgPSBbXTtcblxuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgaWQ6IGVudHJ5SWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBncm91cHM6IHRoaXMuZ2V0R3JvdXBzSW5Hcm91cCAoZW50cnlJZCwgc3ViTGlzdClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbGlzdCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkLCBuZXdTdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoZW50cnkucGFyZW50SWQgIT09IG5ld1N0YXRlLnBhcmVudElkKSB7XG4gICAgICBjb25zdCBvbGRQYXJlbnQgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICAgIGNvbnN0IG5ld1BhcmVudCA9IHRoaXMuZ2V0RW50cnkobmV3U3RhdGUucGFyZW50SWQpO1xuXG4gICAgICBvbGRQYXJlbnQuY2hpbGRyZW5JZHMuc3BsaWNlKG9sZFBhcmVudC5jaGlsZHJlbklkcy5pbmRleE9mKGlkKSwgMSk7XG4gICAgICBuZXdQYXJlbnQuY2hpbGRyZW5JZHMucHVzaChpZCk7XG4gICAgfVxuXG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShpZCwgbmV3U3RhdGUpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhZGRFbnRyeSAoZW50cnkpIHtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ2VudHJ5JywgZW50cnkpO1xuXG4gICAgY29uc3QgaWQgPSB1dWlkKCk7XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBlbnRyeSk7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG5cbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW5JZHMucHVzaChpZCk7XG4gICAgfVxuXG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgcGFyZW50KTtcblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBzZXRQYXJlbnRPZkVudHJ5IChlbnRyeUlkLCBwYXJlbnRJZCA9IE5hTikge1xuICAgIGlmIChlbnRyeUlkID09PSBwYXJlbnRJZCB8fCBlbnRyeUlkID09PSBET0NLX1VSSSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgY29uc3Qgb2xkUGFyZW50ID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG5cbiAgICBsZXQgbmV3UGFyZW50ID0gdGhpcy5nZXRFbnRyeShwYXJlbnRJZCk7XG5cbiAgICBpZiAobmV3UGFyZW50LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgcGFyZW50SWQgPSBuZXdQYXJlbnQucGFyZW50SWQ7XG4gICAgICBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KG5ld1BhcmVudC5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgb2xkUGFyZW50LmNoaWxkcmVuSWRzLnNwbGljZShvbGRQYXJlbnQuY2hpbGRyZW5JZHMuaW5kZXhPZihlbnRyeUlkKSwgMSk7XG5cbiAgICBuZXdQYXJlbnQuY2hpbGRyZW5JZHMucHVzaChlbnRyeUlkKTtcblxuICAgIGVudHJ5LnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5SWQsIGVudHJ5KTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBvbGRQYXJlbnQpO1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkocGFyZW50SWQsIG5ld1BhcmVudCk7XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaW5pdGlhbGl6ZVN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENoYW5nZVN0YXRlIChjYikge1xuICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWNoYW5nZS1zdGF0ZScsIGNiKTtcbiAgfVxufVxuXG4vLyBzYW1lIGluc3RhbmNlIGlzIHNoYXJlZCBhY3Jvc3MgdGhlIHBhY2thZ2VcbmV4cG9ydCBkZWZhdWx0IG5ldyBTdGF0ZSgpO1xuIl19