import { Emitter } from 'atom';
import uuid from 'uuid';

/** State management */
export default class State {

  /**
   * Creates a State instance
   * @param {Object} content - Content from any resource
   */
  constructor (content) {
    this.emitter = new Emitter();
    this.state = new Map();
  }

  /**
   * Atom's internal serialization method.
   * @returns {Object} description
   */
  serialize () {
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

      mapping[value.model.id] = {
        ...resource,
        expanded: value.expanded
      };

      if (value.parentId && value.type === 'group') {
        mapping[value.parentId].groups.push(mapping[value.model.id]);
      }
      else if (value.parentId && value.type === 'project') {
        mapping[value.parentId].projects.push(mapping[value.model.id]);
      }
      else if (!value.parentId && value.type === 'group') {
        data.groups.push(mapping[value.model.id]);
      }
      else if (!value.parentId && value.type === 'project') {
        data.projects.push(mapping[value.model.id]);
      }
    });

    return data;
  }

  /**
   * Simple wrapper to detect if state is empty or not
   * @returns {boolean} true if state is empty
   */
  isEmpty () {
    return this.state.size === 0;
  }

  /**
   * Wrapper to just clear the state Map
   */
  clear () {
    this.state.clear();
  }

  /**
   * Wrapper to just get an iterator
   * @returns {Iterator} An iterator of the current state Map
   */
  list () {
    return this.state.entries();
  }

  /**
   * Wrapper to just get all the created ids
   * @returns {Iterator} An iterator of the current state Map
   */
  ids () {
    return this.state.keys();
  }

  /**
   * Retrieves an entry from the state Map
   * @param {number} id - A valid reference to an entry
   * @returns {Object|undefined} If id is set it will retrieve the associated
   * entry, or undefined if none exists
   */
  getEntry (id) {
    return this.state.get(id);
  }

  /**
   * Wrapper to retrieve a group
   * @param {number} id - A valid reference to a group
   * @returns {Object|undefined} If id refers to a group it will return that
   * group Object, or undefined if none exists
   */
  getGroup (id) {
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
  getProject (id) {
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
  setGroup (candidate, optional = {}) {
    if (!candidate.hasOwnProperty('name')) {
      return;
    }

    return {
      type: 'group',
      expanded: false,
      parentId: optional.parentId,
      model: {
        id: candidate.id || uuid(),
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
  setProject (candidate, optional = {}) {
    if (!candidate.hasOwnProperty('name')) {
      return;
    }

    return {
      type: 'project',
      parentId: optional.parentId,
      model: {
        id: candidate.id || uuid(),
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
  build (content, parentId, currentIds = []) {
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
  update (content) {
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
  setItem (entry) {
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

      entry = {
        ...oldEntry,
        updatedAt: Date.now()
      };
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
  removeItem (optional) {
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
  onDidUpdateContent (callback) {
    this.emitter.on('state-update-content', callback);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidErrorContent (callback) {
    this.emitter.on('state-error-content', callback);
  }
}
