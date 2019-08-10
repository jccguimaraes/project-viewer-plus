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
  activate(currentState) {
    this.mapping = new Map();
    this.emitter = new _atom.Emitter(); // this.emitter.on('update-state', this.updateState);
    // this.emitter.emit('update-state', currentState);
  }
  /* eslint-disable-next-line require-jsdoc */


  updateState(state) {} // console.log('updateState', state);

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

    if (!entry) {
      return;
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImFjdGl2YXRlIiwiY3VycmVudFN0YXRlIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwidXBkYXRlU3RhdGUiLCJzdGF0ZSIsImRlYWN0aXZhdGUiLCJkaXNwb3NlIiwiY2xlYXIiLCJjbGVhclN0YXRlIiwiZW1pdCIsImNyZWF0ZUdyb3VwIiwiZW50cnkiLCJjaGlsZHJlbklkcyIsInBhcmVudElkIiwiTmFOIiwidHlwZSIsIm5hbWUiLCJpY29uIiwib3JkZXIiLCJmb2xkaW5nIiwiY3JlYXRlUHJvamVjdCIsInBhdGhzIiwiZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkIiwiaXNSb290IiwiaWQiLCJncm91cHMiLCJmb3JFYWNoIiwiZ3JvdXAiLCJwdXNoIiwicHJvamVjdHMiLCJwcm9qZWN0IiwiZGVzZXJpYWxpemVQcm9qZWN0QW5kUmV0dXJuSWQiLCJ1bmRlZmluZWQiLCJzZXQiLCJzZXJpYWxpemVHcm91cEJ5SWQiLCJ3aXRoQ29udGV4dCIsImxldmVsIiwiZ2V0RW50cnkiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJFcnJvciIsImdldCIsImRlbGV0ZUVudHJ5IiwiaXNOYU4iLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwiZGVsZXRlIiwiZ2V0UHJvamVjdHNJbkdyb3VwIiwiZ3JvdXBJZCIsImxpc3QiLCJzaXplIiwicmVkdWNlIiwiYWNjIiwiZW50cnlJZCIsImdldEdyb3Vwc0luR3JvdXAiLCJzdWJMaXN0IiwiZWRpdEVudHJ5IiwibmV3U3RhdGUiLCJvbGRQYXJlbnQiLCJuZXdQYXJlbnQiLCJhZGRFbnRyeSIsInBhcmVudCIsInNldFBhcmVudE9mRW50cnkiLCJET0NLX1VSSSIsImluaXRpYWxpemVTdGF0ZSIsIm9uRGlkQ2hhbmdlU3RhdGUiLCJjYiIsIm9u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LElBQUFBLFNBQVMsQ0FBQ2hELFdBQVYsQ0FBc0JtQyxNQUF0QixDQUE2QmEsU0FBUyxDQUFDaEQsV0FBVixDQUFzQmtDLE9BQXRCLENBQThCUyxPQUE5QixDQUE3QixFQUFxRSxDQUFyRTtBQUVBTSxJQUFBQSxTQUFTLENBQUNqRCxXQUFWLENBQXNCZ0IsSUFBdEIsQ0FBMkIyQixPQUEzQjtBQUVBNUMsSUFBQUEsS0FBSyxDQUFDRSxRQUFOLEdBQWlCQSxRQUFqQjtBQUVBLFNBQUsyQixnQ0FBTCxDQUFzQ2UsT0FBdEMsRUFBK0M1QyxLQUEvQztBQUNBLFNBQUs2QixnQ0FBTCxDQUFzQzdCLEtBQUssQ0FBQ0UsUUFBNUMsRUFBc0QrQyxTQUF0RDtBQUNBLFNBQUtwQixnQ0FBTCxDQUFzQzNCLFFBQXRDLEVBQWdEZ0QsU0FBaEQ7QUFFQSxTQUFLNUQsT0FBTCxDQUFhUSxJQUFiLENBQWtCLGtCQUFsQjtBQUNEO0FBRUQ7OztBQUNBeUQsRUFBQUEsZUFBZSxDQUFFcEUsWUFBRixFQUFnQjtBQUM3QixTQUFLd0IsMkJBQUwsQ0FBaUN4QixZQUFqQyxFQUErQyxJQUEvQztBQUNBLFNBQUtHLE9BQUwsQ0FBYVEsSUFBYixDQUFrQixrQkFBbEI7QUFDRDtBQUVEOzs7QUFDQTBELEVBQUFBLGdCQUFnQixDQUFFQyxFQUFGLEVBQU07QUFDcEIsU0FBS25FLE9BQUwsQ0FBYW9FLEVBQWIsQ0FBZ0Isa0JBQWhCLEVBQW9DRCxFQUFwQztBQUNEOztBQXpVUyxDLENBNFVaOzs7ZUFDZSxJQUFJeEUsS0FBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSAnYXRvbSc7XG5cbmltcG9ydCB7IERPQ0tfVVJJIH0gZnJvbSAnLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuY2xhc3MgU3RhdGUge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBhY3RpdmF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5tYXBwaW5nID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbiAgICAvLyB0aGlzLmVtaXR0ZXIub24oJ3VwZGF0ZS1zdGF0ZScsIHRoaXMudXBkYXRlU3RhdGUpO1xuICAgIC8vIHRoaXMuZW1pdHRlci5lbWl0KCd1cGRhdGUtc3RhdGUnLCBjdXJyZW50U3RhdGUpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgdXBkYXRlU3RhdGUgKHN0YXRlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3VwZGF0ZVN0YXRlJywgc3RhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgbWFwcGluZ1xuICAgKi9cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm1hcHBpbmcuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGNsZWFyU3RhdGUgKCkge1xuICAgIHRoaXMubWFwcGluZy5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjcmVhdGVHcm91cCAoZW50cnkgPSB7fSwgY2hpbGRyZW5JZHMgPSBbXSwgcGFyZW50SWQgPSBOYU4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIG5hbWU6IGVudHJ5Lm5hbWUgfHwgJycsXG4gICAgICBpY29uOiBlbnRyeS5pY29uIHx8ICcnLFxuICAgICAgb3JkZXI6IGVudHJ5Lm9yZGVyIHx8ICdhbHBoYWJldGljYWxseScsXG4gICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nIHx8ICdjb2xsYXBzZWQnLFxuICAgICAgY2hpbGRyZW5JZHMsXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjcmVhdGVQcm9qZWN0IChlbnRyeSA9IHt9LCBwYXJlbnRJZCA9IE5hTikge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBuYW1lOiBlbnRyeS5uYW1lIHx8ICcnLFxuICAgICAgaWNvbjogZW50cnkuaWNvbiB8fCAnJyxcbiAgICAgIHBhdGhzOiBlbnRyeS5wYXRocyB8fCBbXSxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LiBJbiBjYXNlIG9mIHRoZSByb290XG4gICAqIGxldmVsLCB0aGUgb2JqZWN0IGlzIHN0b3JlZCB3aXRoIHRoZSBcImlkXCIgTmFOLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBncm91cCBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSb290IC0gaW5kaWNhdGVzIGlmIHRoaXMgbGV2ZWwgaXMgdGhlIHJvb3RcbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJlbnRJZCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIGdyb3VwXG4gICAqL1xuICBkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQgKGVudHJ5LCBpc1Jvb3QsIHBhcmVudElkKSB7XG4gICAgY29uc3QgaWQgPSBpc1Jvb3QgPyBOYU4gOiBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgY2hpbGRyZW5JZHMgPSBbXTtcblxuICAgIGVudHJ5Lmdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGdyb3VwLCBmYWxzZSwgaWQpKVxuICAgICk7XG5cbiAgICBlbnRyeS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZChwcm9qZWN0LCBpZCkpXG4gICAgKTtcblxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5jcmVhdGVHcm91cChcbiAgICAgIGVudHJ5LFxuICAgICAgY2hpbGRyZW5JZHMsXG4gICAgICBpc1Jvb3QgPyB1bmRlZmluZWQgOiBwYXJlbnRJZFxuICAgICk7XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBncm91cCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRJZCAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBwcm9qZWN0XG4gICAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCAoZW50cnksIHBhcmVudElkKSB7XG4gICAgY29uc3QgaWQgPSBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMuY3JlYXRlUHJvamVjdChlbnRyeSwgcGFyZW50SWQpO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgcHJvamVjdCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc3RhdGUgdG8gc3RvcmUgaW4gY2FjaGUgb3IgZmlsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY3VycmVudCBpZCBvZiB0aGUgZ3JvdXAgKE5hTiBmb3Igcm9vdClcbiAgICogQHBhcmFtIHtib29sZWFufSB3aXRoQ29udGV4dCAtIGZhbHNlIGZvciBzYXZpbmcgdG8gZmlsZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCwgd2l0aENvbnRleHQgPSB0cnVlKSB7XG4gICAgY29uc3QgbGV2ZWwgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGlkIHx8IE5hTik7XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICByZXR1cm4gbGV2ZWw7XG4gICAgfVxuXG4gICAgZ3JvdXAuY2hpbGRyZW5JZHMuZm9yRWFjaChjaGlsZElkID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShjaGlsZElkKTtcblxuICAgICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplZExldmVsID0gdGhpcy5zZXJpYWxpemVHcm91cEJ5SWQoY2hpbGRJZCwgd2l0aENvbnRleHQpO1xuXG4gICAgICAgIGxldmVsLmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgaWQ6IGNoaWxkSWQgfSA6IHt9LFxuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBwYXJlbnRJZDogaWQgfSA6IHt9LFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgaWNvbjogZW50cnkuaWNvbixcbiAgICAgICAgICBvcmRlcjogZW50cnkub3JkZXIsXG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IGZvbGRpbmc6IGVudHJ5LmZvbGRpbmcgfSA6IHt9LFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgaWQ6IGNoaWxkSWQgfSA6IHt9LFxuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBwYXJlbnRJZDogaWQgfSA6IHt9LFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgaWNvbjogZW50cnkuaWNvbixcbiAgICAgICAgICBwYXRoczogZW50cnkucGF0aHNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHBhcmNpYWxseSBvciBmdWxseSBhbiBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgaWQgb2YgdGhlIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZSAtIHRoZSBuZXcgc3RhdGUgKHBhcnRpYWwgcGFyYW1ldGVycyBvciBhbGwgb2YgdGhlbSlcbiAgICovXG4gIGZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5IChpZCwgc3RhdGUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4aXN0aW5nX2VudHJ5Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwge1xuICAgICAgLi4uZW50cnksXG4gICAgICAuLi5zdGF0ZVxuICAgIH0pO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZ2V0RW50cnkgKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwcGluZy5nZXQoaWQpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZGVsZXRlRW50cnkgKGlkKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICBlbnRyeS5jaGlsZHJlbklkcy5mb3JFYWNoKGNoaWxkSWQgPT4gdGhpcy5kZWxldGVFbnRyeShjaGlsZElkKSk7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5LnBhcmVudElkIHx8IGlzTmFOKGVudHJ5LnBhcmVudElkKSkge1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICAgIGNvbnN0IGlkeCA9IGdyb3VwLmNoaWxkcmVuSWRzLmluZGV4T2YoaWQpO1xuICAgICAgZ3JvdXAuY2hpbGRyZW5JZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBncm91cCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYXBwaW5nLmRlbGV0ZShpZCk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgcHJvamVjdHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIHByb2plY3RzXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgcHJvamVjdHNcbiAgICovXG4gIGdldFByb2plY3RzSW5Hcm91cCAoZ3JvdXBJZCwgbGlzdCA9IFtdKSB7XG4gICAgaWYgKHRoaXMubWFwcGluZy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoZ3JvdXBJZCB8fCBOYU4pO1xuXG4gICAgaWYgKCFncm91cCB8fCBncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICB0aGlzLmdldFByb2plY3RzSW5Hcm91cChlbnRyeUlkLCBhY2MpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICBpZDogZW50cnlJZCxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhbiBncm91cCBpZCBpdCB3aWxsIHNlYXJjaCBhbGwgZ3JvdXBzIHVuZGVybmVhdGggaXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGdyb3VwSWQgLSB0aGUgZ3JvdXAgaWQgdG8gc2VhcmNoIGZvciBncm91cHNcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdCAtIHRoZSBjb250YWluZXIgZm9yIGFsbCBncm91cHNcbiAgICogQHJldHVybnMge2FycmF5fSB0aGUgY29udGFpbmVyIGZvciBhbGwgZ3JvdXBzXG4gICAqL1xuICBnZXRHcm91cHNJbkdyb3VwIChncm91cElkLCBsaXN0ID0gW10pIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoZ3JvdXBJZCB8fCBOYU4pO1xuXG4gICAgaWYgKCFncm91cCB8fCBncm91cC50eXBlICE9PSAnZ3JvdXAnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdF9hX2dyb3VwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwLmNoaWxkcmVuSWRzLnJlZHVjZSgoYWNjLCBlbnRyeUlkKSA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICBjb25zdCBzdWJMaXN0ID0gW107XG5cbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgIGlkOiBlbnRyeUlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgZ3JvdXBzOiB0aGlzLmdldEdyb3Vwc0luR3JvdXAgKGVudHJ5SWQsIHN1Ykxpc3QpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGxpc3QpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCwgbmV3U3RhdGUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnBhcmVudElkICE9PSBuZXdTdGF0ZS5wYXJlbnRJZCkge1xuICAgICAgY29uc3Qgb2xkUGFyZW50ID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG4gICAgICBjb25zdCBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KG5ld1N0YXRlLnBhcmVudElkKTtcblxuICAgICAgb2xkUGFyZW50LmNoaWxkcmVuSWRzLnNwbGljZShvbGRQYXJlbnQuY2hpbGRyZW5JZHMuaW5kZXhPZihpZCksIDEpO1xuICAgICAgbmV3UGFyZW50LmNoaWxkcmVuSWRzLnB1c2goaWQpO1xuICAgIH1cblxuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoaWQsIG5ld1N0YXRlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdXVpZCgpO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZW50cnkpO1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuSWRzLnB1c2goaWQpO1xuICAgIH1cblxuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIHBhcmVudCk7XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgc2V0UGFyZW50T2ZFbnRyeSAoZW50cnlJZCwgcGFyZW50SWQgPSBOYU4pIHtcbiAgICBpZiAoZW50cnlJZCA9PT0gcGFyZW50SWQgfHwgZW50cnlJZCA9PT0gRE9DS19VUkkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGVudHJ5SWQpO1xuXG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9sZFBhcmVudCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuXG4gICAgbGV0IG5ld1BhcmVudCA9IHRoaXMuZ2V0RW50cnkocGFyZW50SWQpO1xuXG4gICAgaWYgKG5ld1BhcmVudC50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgIHBhcmVudElkID0gbmV3UGFyZW50LnBhcmVudElkO1xuICAgICAgbmV3UGFyZW50ID0gdGhpcy5nZXRFbnRyeShuZXdQYXJlbnQucGFyZW50SWQpO1xuICAgIH1cblxuICAgIG9sZFBhcmVudC5jaGlsZHJlbklkcy5zcGxpY2Uob2xkUGFyZW50LmNoaWxkcmVuSWRzLmluZGV4T2YoZW50cnlJZCksIDEpO1xuXG4gICAgbmV3UGFyZW50LmNoaWxkcmVuSWRzLnB1c2goZW50cnlJZCk7XG5cbiAgICBlbnRyeS5wYXJlbnRJZCA9IHBhcmVudElkO1xuXG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeUlkLCBlbnRyeSk7XG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgb2xkUGFyZW50KTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KHBhcmVudElkLCBuZXdQYXJlbnQpO1xuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGluaXRpYWxpemVTdGF0ZSAoY3VycmVudFN0YXRlKSB7XG4gICAgdGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoY3VycmVudFN0YXRlLCB0cnVlKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgb25EaWRDaGFuZ2VTdGF0ZSAoY2IpIHtcbiAgICB0aGlzLmVtaXR0ZXIub24oJ2RpZC1jaGFuZ2Utc3RhdGUnLCBjYik7XG4gIH1cbn1cblxuLy8gc2FtZSBpbnN0YW5jZSBpcyBzaGFyZWQgYWNyb3NzIHRoZSBwYWNrYWdlXG5leHBvcnQgZGVmYXVsdCBuZXcgU3RhdGUoKTtcbiJdfQ==