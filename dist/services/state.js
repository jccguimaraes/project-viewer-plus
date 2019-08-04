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
  constructor() {
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


  editEntry(id, entry) {
    this.fullOrParcialUpdateExistingEntry(id, entry);
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
    parent.childrenIds.push(id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImRpc3Bvc2UiLCJjbGVhciIsImNsZWFyU3RhdGUiLCJlbWl0IiwiY3JlYXRlR3JvdXAiLCJlbnRyeSIsImNoaWxkcmVuSWRzIiwicGFyZW50SWQiLCJOYU4iLCJ0eXBlIiwibmFtZSIsImljb24iLCJvcmRlciIsImZvbGRpbmciLCJjcmVhdGVQcm9qZWN0IiwicGF0aHMiLCJkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQiLCJpc1Jvb3QiLCJpZCIsImdyb3VwcyIsImZvckVhY2giLCJncm91cCIsInB1c2giLCJwcm9qZWN0cyIsInByb2plY3QiLCJkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCIsInVuZGVmaW5lZCIsInNldCIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsIndpdGhDb250ZXh0IiwibGV2ZWwiLCJnZXRFbnRyeSIsImNoaWxkSWQiLCJzZXJpYWxpemVkTGV2ZWwiLCJmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSIsInN0YXRlIiwiRXJyb3IiLCJnZXQiLCJkZWxldGVFbnRyeSIsImlzTmFOIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImRlbGV0ZSIsImdldFByb2plY3RzSW5Hcm91cCIsImdyb3VwSWQiLCJsaXN0IiwicmVkdWNlIiwiYWNjIiwiZW50cnlJZCIsImdldEdyb3Vwc0luR3JvdXAiLCJzdWJMaXN0IiwiZWRpdEVudHJ5IiwiYWRkRW50cnkiLCJwYXJlbnQiLCJzZXRQYXJlbnRPZkVudHJ5IiwiRE9DS19VUkkiLCJvbGRQYXJlbnQiLCJuZXdQYXJlbnQiLCJpbml0aWFsaXplU3RhdGUiLCJjdXJyZW50U3RhdGUiLCJvbkRpZENoYW5nZVN0YXRlIiwiY2IiLCJvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztB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ZXNDb250ZW50IjpbImltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gJ2F0b20nO1xuXG5pbXBvcnQgeyBET0NLX1VSSSB9IGZyb20gJy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmNsYXNzIFN0YXRlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWFwcGluZyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgbWFwcGluZ1xuICAgKi9cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm1hcHBpbmcuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIG1hcHBpbmdcbiAgICovXG4gIGNsZWFyU3RhdGUgKCkge1xuICAgIHRoaXMubWFwcGluZy5jbGVhcigpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjcmVhdGVHcm91cCAoZW50cnkgPSB7fSwgY2hpbGRyZW5JZHMgPSBbXSwgcGFyZW50SWQgPSBOYU4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgIG5hbWU6IGVudHJ5Lm5hbWUgfHwgJycsXG4gICAgICBpY29uOiBlbnRyeS5pY29uIHx8ICcnLFxuICAgICAgb3JkZXI6IGVudHJ5Lm9yZGVyIHx8ICdhbHBoYWJldGljYWxseScsXG4gICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nIHx8ICdjb2xsYXBzZWQnLFxuICAgICAgY2hpbGRyZW5JZHMsXG4gICAgICBwYXJlbnRJZFxuICAgIH07XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBjcmVhdGVQcm9qZWN0IChlbnRyeSA9IHt9LCBwYXJlbnRJZCA9IE5hTikge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAncHJvamVjdCcsXG4gICAgICBuYW1lOiBlbnRyeS5uYW1lIHx8ICcnLFxuICAgICAgaWNvbjogZW50cnkuaWNvbiB8fCAnJyxcbiAgICAgIHBhdGhzOiBlbnRyeS5wYXRocyB8fCBbXSxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LiBJbiBjYXNlIG9mIHRoZSByb290XG4gICAqIGxldmVsLCB0aGUgb2JqZWN0IGlzIHN0b3JlZCB3aXRoIHRoZSBcImlkXCIgTmFOLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBncm91cCBjb250ZW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNSb290IC0gaW5kaWNhdGVzIGlmIHRoaXMgbGV2ZWwgaXMgdGhlIHJvb3RcbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJlbnRJZCAtIGluZGljYXRlcyBpZiB0aGlzIGxldmVsIGlzIHRoZSByb290XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIGdyb3VwXG4gICAqL1xuICBkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQgKGVudHJ5LCBpc1Jvb3QsIHBhcmVudElkKSB7XG4gICAgY29uc3QgaWQgPSBpc1Jvb3QgPyBOYU4gOiBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgY2hpbGRyZW5JZHMgPSBbXTtcblxuICAgIGVudHJ5Lmdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+XG4gICAgICBjaGlsZHJlbklkcy5wdXNoKHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGdyb3VwLCBmYWxzZSwgaWQpKVxuICAgICk7XG5cbiAgICBlbnRyeS5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZChwcm9qZWN0LCBpZCkpXG4gICAgKTtcblxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5jcmVhdGVHcm91cChcbiAgICAgIGVudHJ5LFxuICAgICAgY2hpbGRyZW5JZHMsXG4gICAgICBpc1Jvb3QgPyB1bmRlZmluZWQgOiBwYXJlbnRJZFxuICAgICk7XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBncm91cCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIGluIHRoZSBNYXAgYW4gb2JqZWN0IHdpdGggdmFsaWQgZ3JvdXAgY29udGVudC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVudHJ5IC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJlbnRJZCAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIHByb2plY3QgY29udGVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgaWQgb2YgdGhlIGRlc2VyaWFsaXplZCBwcm9qZWN0XG4gICAqL1xuICBkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCAoZW50cnksIHBhcmVudElkKSB7XG4gICAgY29uc3QgaWQgPSBlbnRyeS5pZCB8fCB1dWlkKCk7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMuY3JlYXRlUHJvamVjdChlbnRyeSwgcGFyZW50SWQpO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgcHJvamVjdCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2Ugc3RhdGUgdG8gc3RvcmUgaW4gY2FjaGUgb3IgZmlsZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSB0aGUgY3VycmVudCBpZCBvZiB0aGUgZ3JvdXAgKE5hTiBmb3Igcm9vdClcbiAgICogQHBhcmFtIHtib29sZWFufSB3aXRoQ29udGV4dCAtIGZhbHNlIGZvciBzYXZpbmcgdG8gZmlsZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCwgd2l0aENvbnRleHQgPSB0cnVlKSB7XG4gICAgY29uc3QgbGV2ZWwgPSB7IGdyb3VwczogW10sIHByb2plY3RzOiBbXSB9O1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShpZCB8fCBOYU4pO1xuXG4gICAgaWYgKCFncm91cCkge1xuICAgICAgcmV0dXJuIGxldmVsO1xuICAgIH1cblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQsIHdpdGhDb250ZXh0KTtcblxuICAgICAgICBsZXZlbC5ncm91cHMucHVzaCh7XG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IGlkOiBjaGlsZElkIH0gOiB7fSxcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgcGFyZW50SWQ6IGlkIH0gOiB7fSxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgb3JkZXI6IGVudHJ5Lm9yZGVyLFxuICAgICAgICAgIC4uLndpdGhDb250ZXh0ID8geyBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nIH0gOiB7fSxcbiAgICAgICAgICAuLi5zZXJpYWxpemVkTGV2ZWxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlbnRyeS50eXBlID09PSAncHJvamVjdCcpIHtcbiAgICAgICAgbGV2ZWwucHJvamVjdHMucHVzaCh7XG4gICAgICAgICAgLi4ud2l0aENvbnRleHQgPyB7IGlkOiBjaGlsZElkIH0gOiB7fSxcbiAgICAgICAgICAuLi53aXRoQ29udGV4dCA/IHsgcGFyZW50SWQ6IGlkIH0gOiB7fSxcbiAgICAgICAgICBuYW1lOiBlbnRyeS5uYW1lLFxuICAgICAgICAgIGljb246IGVudHJ5Lmljb24sXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBwYXJjaWFsbHkgb3IgZnVsbHkgYW4gZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gdGhlIGlkIG9mIHRoZSBleGlzdGluZyBlbnRyeVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgLSB0aGUgbmV3IHN0YXRlIChwYXJ0aWFsIHBhcmFtZXRlcnMgb3IgYWxsIG9mIHRoZW0pXG4gICAqL1xuICBmdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeSAoaWQsIHN0YXRlKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldEVudHJ5KGlkKTtcblxuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5leGlzdGluZ19lbnRyeScpO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIHtcbiAgICAgIC4uLmVudHJ5LFxuICAgICAgLi4uc3RhdGVcbiAgICB9KTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGdldEVudHJ5IChpZCkge1xuICAgIHJldHVybiB0aGlzLm1hcHBpbmcuZ2V0KGlkKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGRlbGV0ZUVudHJ5IChpZCkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgZW50cnkuY2hpbGRyZW5JZHMuZm9yRWFjaChjaGlsZElkID0+IHRoaXMuZGVsZXRlRW50cnkoY2hpbGRJZCkpO1xuICAgIH1cblxuICAgIGlmIChlbnRyeS5wYXJlbnRJZCB8fCBpc05hTihlbnRyeS5wYXJlbnRJZCkpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG4gICAgICBjb25zdCBpZHggPSBncm91cC5jaGlsZHJlbklkcy5pbmRleE9mKGlkKTtcbiAgICAgIGdyb3VwLmNoaWxkcmVuSWRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgZ3JvdXApO1xuICAgIH1cblxuICAgIHRoaXMubWFwcGluZy5kZWxldGUoaWQpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2l2ZW4gYW4gZ3JvdXAgaWQgaXQgd2lsbCBzZWFyY2ggYWxsIHByb2plY3RzIHVuZGVybmVhdGggaXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGdyb3VwSWQgLSB0aGUgZ3JvdXAgaWQgdG8gc2VhcmNoIGZvciBwcm9qZWN0c1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqIEByZXR1cm5zIHthcnJheX0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIHByb2plY3RzXG4gICAqL1xuICBnZXRQcm9qZWN0c0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90X2FfZ3JvdXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuY2hpbGRyZW5JZHMucmVkdWNlKChhY2MsIGVudHJ5SWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdHNJbkdyb3VwKGVudHJ5SWQsIGFjYyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgIGlkOiBlbnRyeUlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGdyb3VwIGlkIGl0IHdpbGwgc2VhcmNoIGFsbCBncm91cHMgdW5kZXJuZWF0aCBpdFxuICAgKiBAcGFyYW0ge251bWJlcn0gZ3JvdXBJZCAtIHRoZSBncm91cCBpZCB0byBzZWFyY2ggZm9yIGdyb3Vwc1xuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gdGhlIGNvbnRhaW5lciBmb3IgYWxsIGdyb3Vwc1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHRoZSBjb250YWluZXIgZm9yIGFsbCBncm91cHNcbiAgICovXG4gIGdldEdyb3Vwc0luR3JvdXAgKGdyb3VwSWQsIGxpc3QgPSBbXSkge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5nZXRFbnRyeShncm91cElkIHx8IE5hTik7XG5cbiAgICBpZiAoIWdyb3VwIHx8IGdyb3VwLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90X2FfZ3JvdXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuY2hpbGRyZW5JZHMucmVkdWNlKChhY2MsIGVudHJ5SWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHN1Ykxpc3QgPSBbXTtcblxuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgaWQ6IGVudHJ5SWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBncm91cHM6IHRoaXMuZ2V0R3JvdXBzSW5Hcm91cCAoZW50cnlJZCwgc3ViTGlzdClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbGlzdCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBlZGl0RW50cnkgKGlkLCBlbnRyeSkge1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoaWQsIGVudHJ5KTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgYWRkRW50cnkgKGVudHJ5KSB7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdXVpZCgpO1xuXG4gICAgdGhpcy5tYXBwaW5nLnNldChpZCwgZW50cnkpO1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuICAgIHBhcmVudC5jaGlsZHJlbklkcy5wdXNoKGlkKTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBwYXJlbnQpO1xuXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIHNldFBhcmVudE9mRW50cnkgKGVudHJ5SWQsIHBhcmVudElkID0gTmFOKSB7XG4gICAgaWYgKGVudHJ5SWQgPT09IHBhcmVudElkIHx8IGVudHJ5SWQgPT09IERPQ0tfVVJJKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICBjb25zdCBvbGRQYXJlbnQgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcblxuICAgIGxldCBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KHBhcmVudElkKTtcblxuICAgIGlmIChuZXdQYXJlbnQudHlwZSA9PT0gJ3Byb2plY3QnKSB7XG4gICAgICBwYXJlbnRJZCA9IG5ld1BhcmVudC5wYXJlbnRJZDtcbiAgICAgIG5ld1BhcmVudCA9IHRoaXMuZ2V0RW50cnkobmV3UGFyZW50LnBhcmVudElkKTtcbiAgICB9XG5cbiAgICBvbGRQYXJlbnQuY2hpbGRyZW5JZHMuc3BsaWNlKG9sZFBhcmVudC5jaGlsZHJlbklkcy5pbmRleE9mKGVudHJ5SWQpLCAxKTtcblxuICAgIG5ld1BhcmVudC5jaGlsZHJlbklkcy5wdXNoKGVudHJ5SWQpO1xuXG4gICAgZW50cnkucGFyZW50SWQgPSBwYXJlbnRJZDtcblxuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnlJZCwgZW50cnkpO1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIG9sZFBhcmVudCk7XG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShwYXJlbnRJZCwgbmV3UGFyZW50KTtcblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBpbml0aWFsaXplU3RhdGUgKGN1cnJlbnRTdGF0ZSkge1xuICAgIHRoaXMuZGVzZXJpYWxpemVHcm91cEFuZFJldHVybklkKGN1cnJlbnRTdGF0ZSwgdHJ1ZSk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIG9uRGlkQ2hhbmdlU3RhdGUgKGNiKSB7XG4gICAgdGhpcy5lbWl0dGVyLm9uKCdkaWQtY2hhbmdlLXN0YXRlJywgY2IpO1xuICB9XG59XG5cbi8vIHNhbWUgaW5zdGFuY2UgaXMgc2hhcmVkIGFjcm9zcyB0aGUgcGFja2FnZVxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXRlKCk7XG4iXX0=