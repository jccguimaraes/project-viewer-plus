import { Emitter, File, CompositeDisposable, watchPath } from 'atom';
import path from 'path';
import uuid from 'uuid';
import {
  PLUGIN_NAME,
  DESERIALIZER,
  DATABASE_FILE,
  LEGACY_DATABASE_FILE,
  ACTION,
  EMITTER
} from './../constants/base';
import icons from './../constants/icons';

/**
 * A class representing all related operations with file content management.
 */
export default class FileContent {
  /**
   * description
   */
  constructor () {
    this.disposables = new CompositeDisposable();
    this.emitter = new Emitter();
    this.loading = false;
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  destroy () {
    this.disposables.dispose();
  }

  /**
   * @returns {Promise} description
   */
  watcher () {
    const DB_FILE = path.join(
      atom.config.get(`${PLUGIN_NAME}.database.localPath`),
      DATABASE_FILE
    );

    this.loading = true;

    return watchPath(
      atom.config.get(`${PLUGIN_NAME}.database.localPath`),
      {},
      async events => {
        for (const event of events) {
          if (
            (event.path === DB_FILE && event.action === ACTION.MODIFIED) ||
            (event.action === ACTION.RENAMED && event.path === DB_FILE)
          ) {
            this.emitter.emit('file-content-change', await this.readFile());
          }
          else if (
            (event.path === DB_FILE && event.action === ACTION.DELETED) ||
            (event.action === ACTION.RENAMED && event.oldPath === DB_FILE)
          ) {
            this.content = undefined;
            this.emitter.emit('file-content-change', undefined);
            // this.update();
          }
        }
      }
    ).then(pathWatcher => {
      this.file = new File(DB_FILE);
      this.disposables.add(pathWatcher);
      this.loading = false;
    });
  }

  /**
   * description
   */
  async initialize () {
    await this.watcher();
  }

  /**
   *
   * @returns {Promise}
   */
  async readFile () {
    return await this.file
      .exists()
      .then(exists => (exists ? this.readContent() : Promise.reject()));
  }

  /**
   * @todo improve JSDoc
   */
  openFile () {
    const DB_FILE = path.join(
      atom.config.get(`${PLUGIN_NAME}.database.localPath`),
      DATABASE_FILE
    );

    if (!DB_FILE) {
      return;
    }

    atom.workspace.open(DB_FILE);
  }

  /**
   * description
   * This method should only be invoked when external changes to the database
   * file exists because there is no way know what has been changed.
   * @todo improve JSDoc
   */
  update () {
    this.emitter.emit(EMITTER.CHANGE_CONTENT, this.content);
  }

  /**
   * @todo improve JSDoc
   */
  async createDatabase () {
    this.file
      .exists()
      .then(exists => (exists ? this.file.create() : Promise.reject()))
      .then(() =>
        this.file.write(JSON.stringify({ groups: [], projects: [] }, null, 2))
      )
      .then(() => {
        console.log('created');
        // this.readContent()
      })
      .catch(() => {
        console.log('not created');
      });
  }

  /**
   * @todo improve JSDoc
   * @param {Object} parentGroup - current parent group content
   * @returns {Object} denormalized object content to be saved
   */
  denormalizeContent (parentGroup) {
    const denormalized = {
      ...parentGroup.model,
      expanded: parentGroup.expanded,
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
   * description
   *
   * @todo improve JSDoc
   * @returns {Promise}
   */
  async readContent () {
    return await this.file.read(true).then(content => {
      try {
        return JSON.parse(content);
      }
      catch (e) {
        return;
      }

      // const root = {
      //   id: uuid(),
      //   type: 'group',
      //   expanded: true,
      //   model: {},
      //   children: [],
      //   parentId: undefined
      // };
      //
      // const ids = [root.id];
      // const map = Array.from(this.state.list()).reduce(
      //   (acc, val) => {
      //     const id = val[0];
      //     const resource = {
      //       ...val[1],
      //       id
      //     };
      //     acc[id] = resource;
      //     ids.push(id);
      //
      //     if (resource.type === 'group') {
      //       acc[id].children = [];
      //     }
      //     if (resource.parentId) {
      //       acc[resource.parentId].children.push(id);
      //     }
      //     else {
      //       acc[root.id].children.push(id);
      //     }
      //     return acc;
      //   },
      //   { [root.id]: root }
      // );
      //
      // this.content = {
      //   ids,
      //   map,
      //   parentId: null,
      //   selectedId: null
      // };
      // this.update();
    });
  }

  /**
   * description
   *
   * @todo improve JSDoc
   */
  saveContent () {
    const parentGroupId = this.content.ids.find(
      id => this.content.map[id].parentId === undefined
    );

    const normalized = this.denormalizeContent(this.content.map[parentGroupId]);

    this.file.write(JSON.stringify(normalized, null, 2));
  }

  /**
   * @todo improve JSDoc
   */
  readLegacyContent () {
    this.legacyFile.read(true).then(content => {
      try {
        const legacyContent = JSON.parse(content);
        console.log('readLegacyContent', legacyContent);
      }
      catch (e) {
        this.emitter.emit(EMITTER.ERROR, {
          type: 'error',
          description: MESSAGES.EMITTER.BAD_LEGACY_CONTENT
        });
      }
    });
  }

  /**
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidFileContentChange (callback) {
    this.emitter.on('file-content-change', callback);
  }

  /**
   * @todo improve JSDoc
   * @param {Function} callback - description
   * @param {boolean} oneTime - description
   */
  onDidChange (callback, oneTime) {
    if (oneTime) {
      this.emitter.once(EMITTER.CHANGE_CONTENT, callback);
    }
    else {
      this.emitter.on(EMITTER.CHANGE_CONTENT, callback);
    }
  }

  /**
   * description
   *
   * @todo improve JSDoc
   * @param {Function} callback - description
   */
  onDidError (callback) {
    this.emitter.on(EMITTER.ERROR, callback);
  }
}
