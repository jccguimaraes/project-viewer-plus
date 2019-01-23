'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _atom = require('atom');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9zdGF0ZS5qcyJdLCJuYW1lcyI6WyJTdGF0ZSIsImNvbnN0cnVjdG9yIiwibWFwcGluZyIsIk1hcCIsImVtaXR0ZXIiLCJFbWl0dGVyIiwiZGVhY3RpdmF0ZSIsImNsZWFyIiwiY3JlYXRlR3JvdXAiLCJlbnRyeSIsImNoaWxkcmVuSWRzIiwicGFyZW50SWQiLCJOYU4iLCJ0eXBlIiwibmFtZSIsImljb24iLCJvcmRlciIsImZvbGRpbmciLCJjcmVhdGVQcm9qZWN0IiwicGF0aHMiLCJkZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQiLCJpc1Jvb3QiLCJpZCIsImdyb3VwcyIsImZvckVhY2giLCJncm91cCIsInB1c2giLCJwcm9qZWN0cyIsInByb2plY3QiLCJkZXNlcmlhbGl6ZVByb2plY3RBbmRSZXR1cm5JZCIsInVuZGVmaW5lZCIsInNldCIsInNlcmlhbGl6ZUdyb3VwQnlJZCIsImxldmVsIiwiZ2V0RW50cnkiLCJjaGlsZElkIiwic2VyaWFsaXplZExldmVsIiwiZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkiLCJzdGF0ZSIsIkVycm9yIiwiZ2V0IiwiZGVsZXRlRW50cnkiLCJpc05hTiIsImlkeCIsImluZGV4T2YiLCJzcGxpY2UiLCJkZWxldGUiLCJlbWl0IiwiZ2V0UHJvamVjdHNJbkdyb3VwIiwiZ3JvdXBJZCIsImxpc3QiLCJyZWR1Y2UiLCJhY2MiLCJlbnRyeUlkIiwiZWRpdEVudHJ5IiwiYWRkRW50cnkiLCJwYXJlbnQiLCJzZXRQYXJlbnRPZkVudHJ5Iiwib2xkUGFyZW50IiwibmV3UGFyZW50IiwiaW5pdGlhbGl6ZVN0YXRlIiwiY3VycmVudFN0YXRlIiwib25EaWRDaGFuZ2VTdGF0ZSIsImNiIiwib24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBO0FBQ0EsTUFBTUEsS0FBTixDQUFZO0FBQ1Y7QUFDQUMsZ0JBQWU7QUFDYixTQUFLQyxPQUFMLEdBQWUsSUFBSUMsR0FBSixFQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQUlDLGFBQUosRUFBZjtBQUNEOztBQUVEOzs7QUFHQUMsZUFBYztBQUNaO0FBQ0EsU0FBS0osT0FBTCxDQUFhSyxLQUFiO0FBQ0Q7O0FBRUQ7QUFDQUMsY0FBYUMsUUFBUSxFQUFyQixFQUF5QkMsY0FBYyxFQUF2QyxFQUEyQ0MsV0FBV0MsR0FBdEQsRUFBMkQ7QUFDekQsV0FBTztBQUNMQyxZQUFNLE9BREQ7QUFFTEMsWUFBTUwsTUFBTUssSUFBTixJQUFjLEVBRmY7QUFHTEMsWUFBTU4sTUFBTU0sSUFBTixJQUFjLEVBSGY7QUFJTEMsYUFBT1AsTUFBTU8sS0FBTixJQUFlLGdCQUpqQjtBQUtMQyxlQUFTUixNQUFNUSxPQUFOLElBQWlCLFdBTHJCO0FBTUxQLGlCQU5LO0FBT0xDO0FBUEssS0FBUDtBQVNEOztBQUVEO0FBQ0FPLGdCQUFlVCxRQUFRLEVBQXZCLEVBQTJCRSxXQUFXQyxHQUF0QyxFQUEyQztBQUN6QyxXQUFPO0FBQ0xDLFlBQU0sU0FERDtBQUVMQyxZQUFNTCxNQUFNSyxJQUFOLElBQWMsRUFGZjtBQUdMQyxZQUFNTixNQUFNTSxJQUFOLElBQWMsRUFIZjtBQUlMSSxhQUFPVixNQUFNVSxLQUFOLElBQWUsRUFKakI7QUFLTFI7QUFMSyxLQUFQO0FBT0Q7O0FBRUQ7Ozs7Ozs7O0FBUUFTLDhCQUE2QlgsS0FBN0IsRUFBb0NZLE1BQXBDLEVBQTRDVixRQUE1QyxFQUFzRDtBQUNwRCxVQUFNVyxLQUFLRCxTQUFTVCxHQUFULEdBQWVILE1BQU1hLEVBQU4sSUFBWSxxQkFBdEM7QUFDQSxVQUFNWixjQUFjLEVBQXBCOztBQUVBRCxVQUFNYyxNQUFOLENBQWFDLE9BQWIsQ0FBcUJDLFNBQ25CZixZQUFZZ0IsSUFBWixDQUFpQixLQUFLTiwyQkFBTCxDQUFpQ0ssS0FBakMsRUFBd0MsS0FBeEMsRUFBK0NILEVBQS9DLENBQWpCLENBREY7O0FBSUFiLFVBQU1rQixRQUFOLENBQWVILE9BQWYsQ0FBdUJJLFdBQ3JCbEIsWUFBWWdCLElBQVosQ0FBaUIsS0FBS0csNkJBQUwsQ0FBbUNELE9BQW5DLEVBQTRDTixFQUE1QyxDQUFqQixDQURGOztBQUlBLFVBQU1HLFFBQVEsS0FBS2pCLFdBQUwsQ0FDWkMsS0FEWSxFQUVaQyxXQUZZLEVBR1pXLFNBQVNTLFNBQVQsR0FBcUJuQixRQUhULENBQWQ7O0FBTUEsU0FBS1QsT0FBTCxDQUFhNkIsR0FBYixDQUFpQlQsRUFBakIsRUFBcUJHLEtBQXJCOztBQUVBLFdBQU9ILEVBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUFPLGdDQUErQnBCLEtBQS9CLEVBQXNDRSxRQUF0QyxFQUFnRDtBQUM5QyxVQUFNVyxLQUFLYixNQUFNYSxFQUFOLElBQVkscUJBQXZCO0FBQ0EsVUFBTU0sVUFBVSxLQUFLVixhQUFMLENBQW1CVCxLQUFuQixFQUEwQkUsUUFBMUIsQ0FBaEI7O0FBRUEsU0FBS1QsT0FBTCxDQUFhNkIsR0FBYixDQUFpQlQsRUFBakIsRUFBcUJNLE9BQXJCOztBQUVBLFdBQU9OLEVBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQVUscUJBQW9CVixFQUFwQixFQUF3QjtBQUN0QixVQUFNVyxRQUFRLEVBQUVWLFFBQVEsRUFBVixFQUFjSSxVQUFVLEVBQXhCLEVBQWQ7QUFDQSxVQUFNRixRQUFRLEtBQUtTLFFBQUwsQ0FBY1osTUFBTVYsR0FBcEIsQ0FBZDs7QUFFQWEsVUFBTWYsV0FBTixDQUFrQmMsT0FBbEIsQ0FBMEJXLFdBQVc7QUFDbkMsWUFBTTFCLFFBQVEsS0FBS3lCLFFBQUwsQ0FBY0MsT0FBZCxDQUFkOztBQUVBLFVBQUkxQixNQUFNSSxJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsY0FBTXVCLGtCQUFrQixLQUFLSixrQkFBTCxDQUF3QkcsT0FBeEIsQ0FBeEI7O0FBRUFGLGNBQU1WLE1BQU4sQ0FBYUcsSUFBYjtBQUNFSixjQUFJYSxPQUROO0FBRUV4QixvQkFBVVcsRUFGWjtBQUdFUixnQkFBTUwsTUFBTUssSUFIZDtBQUlFQyxnQkFBTU4sTUFBTU0sSUFKZDtBQUtFQyxpQkFBT1AsTUFBTU8sS0FMZjtBQU1FQyxtQkFBU1IsTUFBTVE7QUFOakIsV0FPS21CLGVBUEw7QUFTRCxPQVpELE1BYUssSUFBSTNCLE1BQU1JLElBQU4sS0FBZSxTQUFuQixFQUE4QjtBQUNqQ29CLGNBQU1OLFFBQU4sQ0FBZUQsSUFBZixDQUFvQjtBQUNsQkosY0FBSWEsT0FEYztBQUVsQnhCLG9CQUFVVyxFQUZRO0FBR2xCUixnQkFBTUwsTUFBTUssSUFITTtBQUlsQkMsZ0JBQU1OLE1BQU1NLElBSk07QUFLbEJJLGlCQUFPVixNQUFNVTtBQUxLLFNBQXBCO0FBT0Q7QUFDRixLQXpCRDs7QUEyQkEsV0FBT2MsS0FBUDtBQUNEOztBQUVEOzs7OztBQUtBSSxtQ0FBa0NmLEVBQWxDLEVBQXNDZ0IsS0FBdEMsRUFBNkM7QUFDM0MsVUFBTTdCLFFBQVEsS0FBS3lCLFFBQUwsQ0FBY1osRUFBZCxDQUFkOztBQUVBLFFBQUksQ0FBQ2IsS0FBTCxFQUFZO0FBQ1YsWUFBTSxJQUFJOEIsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDs7QUFFRCxTQUFLckMsT0FBTCxDQUFhNkIsR0FBYixDQUFpQlQsRUFBakIsZUFDS2IsS0FETCxFQUVLNkIsS0FGTDtBQUlEOztBQUVEO0FBQ0FKLFdBQVVaLEVBQVYsRUFBYztBQUNaLFdBQU8sS0FBS3BCLE9BQUwsQ0FBYXNDLEdBQWIsQ0FBaUJsQixFQUFqQixDQUFQO0FBQ0Q7O0FBRUQ7QUFDQW1CLGNBQWFuQixFQUFiLEVBQWlCO0FBQ2YsVUFBTWIsUUFBUSxLQUFLeUIsUUFBTCxDQUFjWixFQUFkLENBQWQ7O0FBRUEsUUFBSWIsTUFBTUksSUFBTixLQUFlLE9BQW5CLEVBQTRCO0FBQzFCSixZQUFNQyxXQUFOLENBQWtCYyxPQUFsQixDQUEwQlcsV0FBVyxLQUFLTSxXQUFMLENBQWlCTixPQUFqQixDQUFyQztBQUNEOztBQUVELFFBQUkxQixNQUFNRSxRQUFOLElBQWtCK0IsTUFBTWpDLE1BQU1FLFFBQVosQ0FBdEIsRUFBNkM7QUFDM0MsWUFBTWMsUUFBUSxLQUFLUyxRQUFMLENBQWN6QixNQUFNRSxRQUFwQixDQUFkO0FBQ0EsWUFBTWdDLE1BQU1sQixNQUFNZixXQUFOLENBQWtCa0MsT0FBbEIsQ0FBMEJ0QixFQUExQixDQUFaO0FBQ0FHLFlBQU1mLFdBQU4sQ0FBa0JtQyxNQUFsQixDQUF5QkYsR0FBekIsRUFBOEIsQ0FBOUI7QUFDQSxXQUFLTixnQ0FBTCxDQUFzQzVCLE1BQU1FLFFBQTVDLEVBQXNEYyxLQUF0RDtBQUNEOztBQUVELFNBQUt2QixPQUFMLENBQWE0QyxNQUFiLENBQW9CeEIsRUFBcEI7QUFDQSxTQUFLbEIsT0FBTCxDQUFhMkMsSUFBYixDQUFrQixrQkFBbEI7QUFDRDs7QUFFRDs7Ozs7O0FBTUFDLHFCQUFvQkMsT0FBcEIsRUFBNkJDLE9BQU8sRUFBcEMsRUFBd0M7QUFDdEMsVUFBTXpCLFFBQVEsS0FBS1MsUUFBTCxDQUFjZSxXQUFXckMsR0FBekIsQ0FBZDs7QUFFQSxRQUFJYSxNQUFNWixJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsWUFBTSxJQUFJMEIsS0FBSixDQUFVLGFBQVYsQ0FBTjtBQUNEOztBQUVELFdBQU9kLE1BQU1mLFdBQU4sQ0FBa0J5QyxNQUFsQixDQUF5QixDQUFDQyxHQUFELEVBQU1DLE9BQU4sS0FBa0I7QUFDaEQsWUFBTTVDLFFBQVEsS0FBS3lCLFFBQUwsQ0FBY21CLE9BQWQsQ0FBZDtBQUNBLFVBQUk1QyxNQUFNSSxJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsYUFBS21DLGtCQUFMLENBQXdCSyxPQUF4QixFQUFpQ0QsR0FBakM7QUFDRCxPQUZELE1BR0s7QUFDSEEsWUFBSTFCLElBQUosQ0FBUztBQUNQSixjQUFJK0IsT0FERztBQUVQdkMsZ0JBQU1MLE1BQU1LLElBRkw7QUFHUEssaUJBQU9WLE1BQU1VO0FBSE4sU0FBVDtBQUtEOztBQUVELGFBQU9pQyxHQUFQO0FBQ0QsS0FkTSxFQWNKRixJQWRJLENBQVA7QUFlRDs7QUFFRDtBQUNBSSxZQUFXaEMsRUFBWCxFQUFlYixLQUFmLEVBQXNCO0FBQ3BCLFNBQUs0QixnQ0FBTCxDQUFzQ2YsRUFBdEMsRUFBMENiLEtBQTFDO0FBQ0EsU0FBS0wsT0FBTCxDQUFhMkMsSUFBYixDQUFrQixrQkFBbEI7QUFDRDs7QUFFRDtBQUNBUSxXQUFVOUMsS0FBVixFQUFpQjtBQUNmLFFBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFFRCxVQUFNYSxLQUFLLHFCQUFYOztBQUVBLFNBQUtwQixPQUFMLENBQWE2QixHQUFiLENBQWlCVCxFQUFqQixFQUFxQmIsS0FBckI7QUFDQSxVQUFNK0MsU0FBUyxLQUFLdEIsUUFBTCxDQUFjekIsTUFBTUUsUUFBcEIsQ0FBZjtBQUNBNkMsV0FBTzlDLFdBQVAsQ0FBbUJnQixJQUFuQixDQUF3QkosRUFBeEI7QUFDQSxTQUFLZSxnQ0FBTCxDQUFzQzVCLE1BQU1FLFFBQTVDLEVBQXNENkMsTUFBdEQ7O0FBRUEsU0FBS3BELE9BQUwsQ0FBYTJDLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7O0FBRUQ7QUFDQVUsbUJBQWtCSixPQUFsQixFQUEyQjFDLFdBQVdDLEdBQXRDLEVBQTJDO0FBQ3pDLFFBQUl5QyxZQUFZMUMsUUFBaEIsRUFBMEI7QUFDeEI7QUFDRDtBQUNELFVBQU1GLFFBQVEsS0FBS3lCLFFBQUwsQ0FBY21CLE9BQWQsQ0FBZDtBQUNBLFVBQU1LLFlBQVksS0FBS3hCLFFBQUwsQ0FBY3pCLE1BQU1FLFFBQXBCLENBQWxCOztBQUVBLFFBQUlnRCxZQUFZLEtBQUt6QixRQUFMLENBQWN2QixRQUFkLENBQWhCOztBQUVBLFFBQUlnRCxVQUFVOUMsSUFBVixLQUFtQixTQUF2QixFQUFrQztBQUNoQ0YsaUJBQVdnRCxVQUFVaEQsUUFBckI7QUFDQWdELGtCQUFZLEtBQUt6QixRQUFMLENBQWN5QixVQUFVaEQsUUFBeEIsQ0FBWjtBQUNEOztBQUVEK0MsY0FBVWhELFdBQVYsQ0FBc0JtQyxNQUF0QixDQUE2QmEsVUFBVWhELFdBQVYsQ0FBc0JrQyxPQUF0QixDQUE4QlMsT0FBOUIsQ0FBN0IsRUFBcUUsQ0FBckU7O0FBRUFNLGNBQVVqRCxXQUFWLENBQXNCZ0IsSUFBdEIsQ0FBMkIyQixPQUEzQjs7QUFFQTVDLFVBQU1FLFFBQU4sR0FBaUJBLFFBQWpCOztBQUVBLFNBQUswQixnQ0FBTCxDQUFzQ2dCLE9BQXRDLEVBQStDNUMsS0FBL0M7QUFDQSxTQUFLNEIsZ0NBQUwsQ0FBc0M1QixNQUFNRSxRQUE1QyxFQUFzRCtDLFNBQXREO0FBQ0EsU0FBS3JCLGdDQUFMLENBQXNDMUIsUUFBdEMsRUFBZ0RnRCxTQUFoRDs7QUFFQSxTQUFLdkQsT0FBTCxDQUFhMkMsSUFBYixDQUFrQixrQkFBbEI7QUFDRDs7QUFFRDtBQUNBYSxrQkFBaUJDLFlBQWpCLEVBQStCO0FBQzdCLFNBQUt6QywyQkFBTCxDQUFpQ3lDLFlBQWpDLEVBQStDLElBQS9DO0FBQ0EsU0FBS3pELE9BQUwsQ0FBYTJDLElBQWIsQ0FBa0Isa0JBQWxCO0FBQ0Q7O0FBRUQ7QUFDQWUsbUJBQWtCQyxFQUFsQixFQUFzQjtBQUNwQixTQUFLM0QsT0FBTCxDQUFhNEQsRUFBYixDQUFnQixrQkFBaEIsRUFBb0NELEVBQXBDO0FBQ0Q7QUEvUFM7O0FBa1FaO2tCQUNlLElBQUkvRCxLQUFKLEUiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tICdhdG9tJztcblxuLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbmNsYXNzIFN0YXRlIHtcbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWFwcGluZyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgbWFwcGluZ1xuICAgKi9cbiAgZGVhY3RpdmF0ZSAoKSB7XG4gICAgLy8gdGhpcy5lbWl0dGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm1hcHBpbmcuY2xlYXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNyZWF0ZUdyb3VwIChlbnRyeSA9IHt9LCBjaGlsZHJlbklkcyA9IFtdLCBwYXJlbnRJZCA9IE5hTikge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgbmFtZTogZW50cnkubmFtZSB8fCAnJyxcbiAgICAgIGljb246IGVudHJ5Lmljb24gfHwgJycsXG4gICAgICBvcmRlcjogZW50cnkub3JkZXIgfHwgJ2FscGhhYmV0aWNhbGx5JyxcbiAgICAgIGZvbGRpbmc6IGVudHJ5LmZvbGRpbmcgfHwgJ2NvbGxhcHNlZCcsXG4gICAgICBjaGlsZHJlbklkcyxcbiAgICAgIHBhcmVudElkXG4gICAgfTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGNyZWF0ZVByb2plY3QgKGVudHJ5ID0ge30sIHBhcmVudElkID0gTmFOKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdwcm9qZWN0JyxcbiAgICAgIG5hbWU6IGVudHJ5Lm5hbWUgfHwgJycsXG4gICAgICBpY29uOiBlbnRyeS5pY29uIHx8ICcnLFxuICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzIHx8IFtdLFxuICAgICAgcGFyZW50SWRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBpbiB0aGUgTWFwIGFuIG9iamVjdCB3aXRoIHZhbGlkIGdyb3VwIGNvbnRlbnQuIEluIGNhc2Ugb2YgdGhlIHJvb3RcbiAgICogbGV2ZWwsIHRoZSBvYmplY3QgaXMgc3RvcmVkIHdpdGggdGhlIFwiaWRcIiBOYU4uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbnRyeSAtIGFuIG9iamVjdCBhbHJlYWR5IHZhbGlkYXRlZCB3aXRoIGdyb3VwIGNvbnRlbnRcbiAgICogQHBhcmFtIHtib29sZWFufSBpc1Jvb3QgLSBpbmRpY2F0ZXMgaWYgdGhpcyBsZXZlbCBpcyB0aGUgcm9vdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmVudElkIC0gaW5kaWNhdGVzIGlmIHRoaXMgbGV2ZWwgaXMgdGhlIHJvb3RcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGlkIG9mIHRoZSBkZXNlcmlhbGl6ZWQgZ3JvdXBcbiAgICovXG4gIGRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZCAoZW50cnksIGlzUm9vdCwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGlzUm9vdCA/IE5hTiA6IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCBjaGlsZHJlbklkcyA9IFtdO1xuXG4gICAgZW50cnkuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT5cbiAgICAgIGNoaWxkcmVuSWRzLnB1c2godGhpcy5kZXNlcmlhbGl6ZUdyb3VwQW5kUmV0dXJuSWQoZ3JvdXAsIGZhbHNlLCBpZCkpXG4gICAgKTtcblxuICAgIGVudHJ5LnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PlxuICAgICAgY2hpbGRyZW5JZHMucHVzaCh0aGlzLmRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkKHByb2plY3QsIGlkKSlcbiAgICApO1xuXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmNyZWF0ZUdyb3VwKFxuICAgICAgZW50cnksXG4gICAgICBjaGlsZHJlbklkcyxcbiAgICAgIGlzUm9vdCA/IHVuZGVmaW5lZCA6IHBhcmVudElkXG4gICAgKTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGdyb3VwKTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgaW4gdGhlIE1hcCBhbiBvYmplY3Qgd2l0aCB2YWxpZCBncm91cCBjb250ZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gZW50cnkgLSBhbiBvYmplY3QgYWxyZWFkeSB2YWxpZGF0ZWQgd2l0aCBwcm9qZWN0IGNvbnRlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmVudElkIC0gYW4gb2JqZWN0IGFscmVhZHkgdmFsaWRhdGVkIHdpdGggcHJvamVjdCBjb250ZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBpZCBvZiB0aGUgZGVzZXJpYWxpemVkIHByb2plY3RcbiAgICovXG4gIGRlc2VyaWFsaXplUHJvamVjdEFuZFJldHVybklkIChlbnRyeSwgcGFyZW50SWQpIHtcbiAgICBjb25zdCBpZCA9IGVudHJ5LmlkIHx8IHV1aWQoKTtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5jcmVhdGVQcm9qZWN0KGVudHJ5LCBwYXJlbnRJZCk7XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCBwcm9qZWN0KTtcblxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzdGF0ZSB0byBzdG9yZSBpbiBjYWNoZSBvciBmaWxlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZCAtIHRoZSBjdXJyZW50IGlkIG9mIHRoZSBncm91cCAoTmFOIGZvciByb290KVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB0aGUgc2VyaWFsaXplZCBzdGF0ZVxuICAgKi9cbiAgc2VyaWFsaXplR3JvdXBCeUlkIChpZCkge1xuICAgIGNvbnN0IGxldmVsID0geyBncm91cHM6IFtdLCBwcm9qZWN0czogW10gfTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoaWQgfHwgTmFOKTtcblxuICAgIGdyb3VwLmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB7XG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoY2hpbGRJZCk7XG5cbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZWRMZXZlbCA9IHRoaXMuc2VyaWFsaXplR3JvdXBCeUlkKGNoaWxkSWQpO1xuXG4gICAgICAgIGxldmVsLmdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIG9yZGVyOiBlbnRyeS5vcmRlcixcbiAgICAgICAgICBmb2xkaW5nOiBlbnRyeS5mb2xkaW5nLFxuICAgICAgICAgIC4uLnNlcmlhbGl6ZWRMZXZlbFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVudHJ5LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgICBsZXZlbC5wcm9qZWN0cy5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGRJZCxcbiAgICAgICAgICBwYXJlbnRJZDogaWQsXG4gICAgICAgICAgbmFtZTogZW50cnkubmFtZSxcbiAgICAgICAgICBpY29uOiBlbnRyeS5pY29uLFxuICAgICAgICAgIHBhdGhzOiBlbnRyeS5wYXRoc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgcGFyY2lhbGx5IG9yIGZ1bGx5IGFuIGV4aXN0aW5nIGVudHJ5XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBpZCBvZiB0aGUgZXhpc3RpbmcgZW50cnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIC0gdGhlIG5ldyBzdGF0ZSAocGFydGlhbCBwYXJhbWV0ZXJzIG9yIGFsbCBvZiB0aGVtKVxuICAgKi9cbiAgZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkgKGlkLCBzdGF0ZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShpZCk7XG5cbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhpc3RpbmdfZW50cnknKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuc2V0KGlkLCB7XG4gICAgICAuLi5lbnRyeSxcbiAgICAgIC4uLnN0YXRlXG4gICAgfSk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBnZXRFbnRyeSAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBwaW5nLmdldChpZCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBkZWxldGVFbnRyeSAoaWQpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoaWQpO1xuXG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdncm91cCcpIHtcbiAgICAgIGVudHJ5LmNoaWxkcmVuSWRzLmZvckVhY2goY2hpbGRJZCA9PiB0aGlzLmRlbGV0ZUVudHJ5KGNoaWxkSWQpKTtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkucGFyZW50SWQgfHwgaXNOYU4oZW50cnkucGFyZW50SWQpKSB7XG4gICAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoZW50cnkucGFyZW50SWQpO1xuICAgICAgY29uc3QgaWR4ID0gZ3JvdXAuY2hpbGRyZW5JZHMuaW5kZXhPZihpZCk7XG4gICAgICBncm91cC5jaGlsZHJlbklkcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkoZW50cnkucGFyZW50SWQsIGdyb3VwKTtcbiAgICB9XG5cbiAgICB0aGlzLm1hcHBpbmcuZGVsZXRlKGlkKTtcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdmVuIGFuIGdyb3VwIGlkIGl0IHdpbGwgc2VhcmNoIGFsbCBwcm9qZWN0cyB1bmRlcm5lYXRoIGl0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBncm91cElkIC0gdGhlIGdyb3VwIGlkIHRvIHNlYXJjaCBmb3IgcHJvamVjdHNcbiAgICogQHBhcmFtIHthcnJheX0gbGlzdCAtIHRoZSBjb250YWluZXIgZm9yIGFsbCBwcm9qZWN0c1xuICAgKiBAcmV0dXJucyB7YXJyYXl9IHRoZSBjb250YWluZXIgZm9yIGFsbCBwcm9qZWN0c1xuICAgKi9cbiAgZ2V0UHJvamVjdHNJbkdyb3VwIChncm91cElkLCBsaXN0ID0gW10pIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ2V0RW50cnkoZ3JvdXBJZCB8fCBOYU4pO1xuXG4gICAgaWYgKGdyb3VwLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90X2FfZ3JvdXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXAuY2hpbGRyZW5JZHMucmVkdWNlKChhY2MsIGVudHJ5SWQpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5nZXRFbnRyeShlbnRyeUlkKTtcbiAgICAgIGlmIChlbnRyeS50eXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgIHRoaXMuZ2V0UHJvamVjdHNJbkdyb3VwKGVudHJ5SWQsIGFjYyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgIGlkOiBlbnRyeUlkLFxuICAgICAgICAgIG5hbWU6IGVudHJ5Lm5hbWUsXG4gICAgICAgICAgcGF0aHM6IGVudHJ5LnBhdGhzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGxpc3QpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgZWRpdEVudHJ5IChpZCwgZW50cnkpIHtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGlkLCBlbnRyeSk7XG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2RpZC1jaGFuZ2Utc3RhdGUnKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLWpzZG9jICovXG4gIGFkZEVudHJ5IChlbnRyeSkge1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHV1aWQoKTtcblxuICAgIHRoaXMubWFwcGluZy5zZXQoaWQsIGVudHJ5KTtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldEVudHJ5KGVudHJ5LnBhcmVudElkKTtcbiAgICBwYXJlbnQuY2hpbGRyZW5JZHMucHVzaChpZCk7XG4gICAgdGhpcy5mdWxsT3JQYXJjaWFsVXBkYXRlRXhpc3RpbmdFbnRyeShlbnRyeS5wYXJlbnRJZCwgcGFyZW50KTtcblxuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBzZXRQYXJlbnRPZkVudHJ5IChlbnRyeUlkLCBwYXJlbnRJZCA9IE5hTikge1xuICAgIGlmIChlbnRyeUlkID09PSBwYXJlbnRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZ2V0RW50cnkoZW50cnlJZCk7XG4gICAgY29uc3Qgb2xkUGFyZW50ID0gdGhpcy5nZXRFbnRyeShlbnRyeS5wYXJlbnRJZCk7XG5cbiAgICBsZXQgbmV3UGFyZW50ID0gdGhpcy5nZXRFbnRyeShwYXJlbnRJZCk7XG5cbiAgICBpZiAobmV3UGFyZW50LnR5cGUgPT09ICdwcm9qZWN0Jykge1xuICAgICAgcGFyZW50SWQgPSBuZXdQYXJlbnQucGFyZW50SWQ7XG4gICAgICBuZXdQYXJlbnQgPSB0aGlzLmdldEVudHJ5KG5ld1BhcmVudC5wYXJlbnRJZCk7XG4gICAgfVxuXG4gICAgb2xkUGFyZW50LmNoaWxkcmVuSWRzLnNwbGljZShvbGRQYXJlbnQuY2hpbGRyZW5JZHMuaW5kZXhPZihlbnRyeUlkKSwgMSk7XG5cbiAgICBuZXdQYXJlbnQuY2hpbGRyZW5JZHMucHVzaChlbnRyeUlkKTtcblxuICAgIGVudHJ5LnBhcmVudElkID0gcGFyZW50SWQ7XG5cbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5SWQsIGVudHJ5KTtcbiAgICB0aGlzLmZ1bGxPclBhcmNpYWxVcGRhdGVFeGlzdGluZ0VudHJ5KGVudHJ5LnBhcmVudElkLCBvbGRQYXJlbnQpO1xuICAgIHRoaXMuZnVsbE9yUGFyY2lhbFVwZGF0ZUV4aXN0aW5nRW50cnkocGFyZW50SWQsIG5ld1BhcmVudCk7XG5cbiAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZGlkLWNoYW5nZS1zdGF0ZScpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUtanNkb2MgKi9cbiAgaW5pdGlhbGl6ZVN0YXRlIChjdXJyZW50U3RhdGUpIHtcbiAgICB0aGlzLmRlc2VyaWFsaXplR3JvdXBBbmRSZXR1cm5JZChjdXJyZW50U3RhdGUsIHRydWUpO1xuICAgIHRoaXMuZW1pdHRlci5lbWl0KCdkaWQtY2hhbmdlLXN0YXRlJyk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS1qc2RvYyAqL1xuICBvbkRpZENoYW5nZVN0YXRlIChjYikge1xuICAgIHRoaXMuZW1pdHRlci5vbignZGlkLWNoYW5nZS1zdGF0ZScsIGNiKTtcbiAgfVxufVxuXG4vLyBzYW1lIGluc3RhbmNlIGlzIHNoYXJlZCBhY3Jvc3MgdGhlIHBhY2thZ2VcbmV4cG9ydCBkZWZhdWx0IG5ldyBTdGF0ZSgpO1xuIl19