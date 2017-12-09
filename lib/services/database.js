import { Emitter, File, CompositeDisposable, watchPath } from 'atom';
import path from 'path';
import uuid from 'uuid';
import devlog from './devlog';
import {
  PLUGIN_NAME, DESERIALIZER, DATABASE_FILE, ACTION
} from './../constants/base';

/**
 * A singleton class representing all related operations
 * with the content management.
 */
class Database {

  static instance;

  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor () {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;

    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();

    this.disposables.add(this.emitter);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  destroy () {
    devlog('database destroyed');
    this.disposables.dispose();
    Database.instance = null;
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @returns {Promise} description
   */
  initialize () {
    const DB_FILE = path.join(
      atom.config.get(`${PLUGIN_NAME}.database.localPath`),
      DATABASE_FILE
    );

    return watchPath(
      atom.config.get(`${PLUGIN_NAME}.database.localPath`), {}, events => {
        for (const event of events) {
          if (
            (event.path === DB_FILE && event.action === ACTION.MODIFIED) ||
            (event.action === ACTION.RENAMED && event.path === DB_FILE)
          ) {
            this.readContent();
          }
          else if (
            (event.path === DB_FILE && event.action === ACTION.DELETED) ||
            (event.action === ACTION.RENAMED && event.oldPath === DB_FILE)
          ) {
            this.content = undefined;
            this.update();
          }
        }
      })
      .then(pathWatcher => {
        this.file = new File(DB_FILE);
        this.disposables.add(pathWatcher);
        return this.file.exists();
      })
      .then(exists => exists ? this.readContent() : Promise.reject())
      .catch(() => {
        this.emitter.emit('did-error', {
          type: 'info',
          description: 'No database file was found.',
        });
      });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @returns {Object} description
   */
  serialize () {
    return { deserializer: DESERIALIZER, data: this.content };
  }

  /**
   * description
   * This method should only be invoked when external changes to the database
   * file exists because there is no way know what has been changed.
   *
   * @todo improve JSDoc
   */
  update () {
    devlog('update');
    this.emitter.emit('did-change-content', this.content);
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  createDatabase () {
    devlog('created');
    this.file.create()
      .then(() => this.file.write(JSON.stringify({
        groups: [],
        projects: []
      }, null, 2)));
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  recoverDatabase () {
    devlog('recovered');
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Object} parentGroup - current parent group content
   * @returns {Object} denormalized object content to be saved
   */
  denormalizeContent (parentGroup) {
    const denormalized = {
      ...parentGroup.model,
      groups: [],
      projects: []
    };

    parentGroup.children.forEach(childId => {
      const child = this.content.map[childId];
      if (child.type === 'group') {
        denormalized.groups.push(this.denormalizeContent(child));
      }
      else if (child.type === 'project') {
        denormalized.projects.push({ ...child.model });
      }
    });

    return denormalized;
  }

  /**
   * A custom made normalizr to fit the purpose.
   *
   * @todo improve JSDoc
   * @todo normalize model content such as project -> paths
   *
   * @param {Object} content - a representation of a denormalized group/project.
   * @param {string} type - describes if content is a group or a project.
   * @param {string} parentId - if the content belongs to a group.
   *
   * @returns {Object} the current normalized group/project.
   */
  normalizeContent (content, type, parentId) {
    const { groups, projects, ...model } = content;

    const subContent = {
      id: uuid(),
      type,
      model,
      children: [],
      parentId
    };

    this.content.map[subContent.id] = subContent;
    this.content.ids.push(subContent.id);

    if (groups) {
      groups.forEach(group => {
        const child = this.normalizeContent(group, 'group', subContent.id);
        this.content.map[subContent.id].children.push(child.id);
      });
    }
    if (projects) {
      projects.forEach(project => {
        const child = this.normalizeContent(project, 'project', subContent.id);
        this.content.map[subContent.id].children.push(child.id);
      });
    }

    return this.content.map[subContent.id];
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {string} content - content that was retrieved from the file() =>() .
   */
  processContent (content) {
    try {
      this.content = {
        map: {},
        ids: [],
        parentId: null,
        selectedId: null
      };
      this.normalizeContent(JSON.parse(content), 'group');

      this.update();
    }
    catch (e) {
      this.emitter.emit('did-error', {
        type: 'info',
        description: e
      });
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  readContent () {
    this.file.read(true).then(content => {
      this.processContent(content);
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  saveContent () {
    const parentGroupId = this.content.ids.find(id =>
      this.content.map[id].parentId === undefined
    );

    const normalized = this.denormalizeContent(
      this.content.map[parentGroupId]
    );

    this.file.write(JSON.stringify(normalized, null, 2));
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  setInitialSelectedProject () {
    const currentStateKey = atom.getStateKey(atom.project.getPaths());

    this.content.ids.some(id => {
      const content = this.content.map[id];

      if (content.type === 'group') {
        return false;
      }

      if (currentStateKey === atom.getStateKey(content.model.paths)) {
        content.selected = true;
        this.content.selectedId = id;
        return true;
      }
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   * @param {boolean} oneTime - description
   */
  onDidChange (callback, oneTime) {
    if (oneTime) {
      this.emitter.once('did-change-content', callback);
    }
    else {
      this.emitter.on('did-change-content', callback);
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidError (callback) {
    this.emitter.on('did-error', callback);
  }
}

export default Database;
