import uuid from 'uuid';
import { Emitter } from 'atom';

/* eslint-disable-next-line */
class State {
  /* eslint-disable-next-line */
  constructor() {
    this.mapping = new Map();
    this.emitter = new Emitter();
  }

  /**
   * Clears the mapping
   */
  deactivate () {
    // this.emitter.dispose();
    this.mapping.clear();
  }

  /**
   * Stores in the Map an object with valid group content. In case of the root
   * level, the object is stored with the "id" NaN.
   * @param {Object} entry - an object already validated with group content
   * @param {boolean} isRoot - indicates if this level is the root
   * @returns {number} the id of the deserialized group
   */
  deserializeGroupAndReturnId (entry, isRoot) {
    const id = isRoot ? NaN : entry.id || uuid();
    const type = 'group';
    const name = isRoot ? {} : { name: entry.name };
    const icon = entry.icon || '';
    const childrenIds = [];

    entry.groups.forEach(group =>
      childrenIds.push(this.deserializeGroupAndReturnId(group))
    );

    entry.projects.forEach(project =>
      childrenIds.push(this.deserializeProjectAndReturnId(project))
    );

    const group = {
      type,
      ...name,
      icon,
      order: entry.order || 'alphabetically',
      expanded: entry.expanded || false,
      childrenIds
    };

    this.mapping.set(id, group);

    return id;
  }

  /**
   * Stores in the Map an object with valid group content.
   * @param {Object} entry - an object already validated with project content
   * @returns {number} the id of the deserialized project
   */
  deserializeProjectAndReturnId (entry) {
    const id = entry.id || uuid();
    const type = 'project';
    const name = entry.name;
    const icon = entry.icon || '';
    const paths = entry.paths || [];

    const project = {
      type,
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
  serializeGroupById (id) {
    const level = { groups: [], projects: [] };
    const group = this.mapping.get(id || NaN);

    group.childrenIds.forEach(childId => {
      const entry = this.mapping.get(childId);

      if (entry.type === 'group') {
        const serializedLevel = this.serializeGroupById(childId);

        level.groups.push({
          id: childId,
          name: entry.name,
          icon: entry.icon,
          order: entry.order,
          expanded: entry.expanded,
          ...serializedLevel
        });
      }
      else if (entry.type === 'project') {
        level.projects.push({
          id: childId,
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
    const entry = this.mapping.get(id);

    if (!entry) {
      throw new Error('unexisting_entry');
    }

    this.mapping.set(id, {
      ...entry,
      ...state
    });
  }

  /**
   * Given an group id it will search all projects underneath it
   * @param {number} groupId - the group id to search for projects
   * @param {array} list - the container for all projects
   * @returns {array} the container for all projects
   */
  getProjectsInGroup (groupId, list = []) {
    const group = this.mapping.get(groupId || NaN);

    if (group.type !== 'group') {
      throw new Error('not_a_group');
    }

    return group.childrenIds.reduce((acc, entryId) => {
      const entry = this.mapping.get(entryId);
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
