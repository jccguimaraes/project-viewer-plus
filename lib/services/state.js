import uuid from 'uuid';
import { Emitter } from 'atom';

import { DOCK_URI } from '../constants/base';

/* eslint-disable-next-line require-jsdoc */
class State {
  /* eslint-disable-next-line require-jsdoc */
  constructor () {
    this.mapping = new Map();
    this.emitter = new Emitter();
  }

  /**
   * Clears the mapping
   */
  deactivate () {
    this.emitter.dispose();
    this.mapping.clear();
  }

  /**
   * Clears the mapping
   */
  clearState () {
    this.mapping.clear();
    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  createGroup (entry = {}, childrenIds = [], parentId = NaN) {
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
  createProject (entry = {}, parentId = NaN) {
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
  deserializeGroupAndReturnId (entry, isRoot, parentId) {
    const id = isRoot ? NaN : entry.id || uuid();
    const childrenIds = [];

    entry.groups.forEach(group =>
      childrenIds.push(this.deserializeGroupAndReturnId(group, false, id))
    );

    entry.projects.forEach(project =>
      childrenIds.push(this.deserializeProjectAndReturnId(project, id))
    );

    const group = this.createGroup(
      entry,
      childrenIds,
      isRoot ? undefined : parentId
    );

    this.mapping.set(id, group);

    return id;
  }

  /**
   * Stores in the Map an object with valid group content.
   * @param {Object} entry - an object already validated with project content
   * @param {Object} parentId - an object already validated with project content
   * @returns {number} the id of the deserialized project
   */
  deserializeProjectAndReturnId (entry, parentId) {
    const id = entry.id || uuid();
    const project = this.createProject(entry, parentId);

    this.mapping.set(id, project);

    return id;
  }

  /**
   * Parse state to store in cache or file
   * @param {number} id - the current id of the group (NaN for root)
   * @param {boolean} withContext - false for saving to file
   * @returns {Object} the serialized state
   */
  serializeGroupById (id, withContext = true) {
    const level = { groups: [], projects: [] };
    const group = this.getEntry(id || NaN);

    if (!group) {
      return level;
    }

    group.childrenIds.forEach(childId => {
      const entry = this.getEntry(childId);

      if (entry.type === 'group') {
        const serializedLevel = this.serializeGroupById(childId, withContext);

        level.groups.push({
          ...withContext ? { id: childId } : {},
          ...withContext ? { parentId: id } : {},
          name: entry.name,
          icon: entry.icon,
          order: entry.order,
          ...withContext ? { folding: entry.folding } : {},
          ...serializedLevel
        });
      }
      else if (entry.type === 'project') {
        level.projects.push({
          ...withContext ? { id: childId } : {},
          ...withContext ? { parentId: id } : {},
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
  fullOrParcialUpdateExistingEntry (id, state) {
    const entry = this.getEntry(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, {
      ...entry,
      ...state
    });
  }

  /* eslint-disable-next-line require-jsdoc */
  getEntry (id) {
    return this.mapping.get(id);
  }

  /* eslint-disable-next-line require-jsdoc */
  deleteEntry (id) {
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
  getProjectsInGroup (groupId, list = []) {
    const group = this.getEntry(groupId || NaN);

    if (!group || group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      const entry = this.getEntry(entryId);
      if (entry.type === 'group') {
        this.getProjectsInGroup(entryId, acc);
      }
      else {
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
  getGroupsInGroup (groupId, list = []) {
    const group = this.getEntry(groupId || NaN);

    if (!group || group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      const entry = this.getEntry(entryId);
      if (entry.type === 'group') {
        const subList = [];

        acc.push({
          id: entryId,
          name: entry.name,
          groups: this.getGroupsInGroup (entryId, subList)
        });
      }

      return acc;
    }, list);
  }

  /* eslint-disable-next-line require-jsdoc */
  editEntry (id, entry) {
    this.fullOrParcialUpdateExistingEntry(id, entry);
    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  addEntry (entry) {
    if (!entry) {
      return;
    }

    const id = uuid();

    this.mapping.set(id, entry);
    const parent = this.getEntry(entry.parentId);
    parent.childrenIds.push(id);
    this.fullOrParcialUpdateExistingEntry(entry.parentId, parent);

    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  setParentOfEntry (entryId, parentId = NaN) {
    if (entryId === parentId || entryId === DOCK_URI) {
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
  initializeState (currentState) {
    this.deserializeGroupAndReturnId(currentState, true);
    this.emitter.emit('did-change-state');
  }

  /* eslint-disable-next-line require-jsdoc */
  onDidChangeState (cb) {
    this.emitter.on('did-change-state', cb);
  }
}

// same instance is shared across the package
export default new State();
