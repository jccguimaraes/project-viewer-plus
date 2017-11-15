Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _packages = require('./packages');

var _packages2 = _interopRequireDefault(_packages);

var _base = require('./../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing the Database
 */
let ContextSwitcher = class ContextSwitcher {

  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor() {
    if (ContextSwitcher.instance) {
      return ContextSwitcher.instance;
    }

    this.database = new _database2.default();
    this.packages = new _packages2.default();
    ContextSwitcher.instance = this;
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  savePackages(states) {
    states['tree-view'] = this.packages.treeView.save();
    states['find-and-replace'] = this.packages.findAndReplace.save();
    this.packages.statusBar.save();
    this.packages.linterUIDefault.save();
    this.packages.linter.save();
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  loadPackages(states) {
    this.packages.treeView.load(states['tree-view']).then(() => this.packages.findAndReplace.load(states['find-and-replace'])).then(() => this.packages.statusBar.load()).then(() => this.packages.linter.load()).then(() => this.packages.linterUIDefault.load());
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  saveContext(project) {
    const context = {
      current_project: null,
      next_project: project,
      key: null,
      state: null
    };

    context.current_project = this.database.content.selectedId ? this.database.content.map[this.database.content.selectedId] : { model: { paths: atom.project.getPaths() } };

    console.log('save context', context.current_project);

    // validate if same projects (paths) - tip: use atom.getStateKey

    context.key = atom.getStateKey(context.current_project.model.paths);
    context.state = atom.serialize();
    context.state.extraStates = {};

    if (context.key && context.state) {
      this.savePackages(context.state.extraStates);
      atom.getStorageFolder().storeSync(context.key, context.state);
    }

    return Promise.resolve(context);
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  loadContext(context) {
    console.log('load context', context.next_project);

    if (context.next_project.type !== 'project') {
      return Promise.reject(_base.MESSAGES.CONTEXT.NOT_A_PROJECT);
    }
    if (!this.database.content.ids.includes(context.next_project.id)) {
      return Promise.reject(_base.MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
    }

    context.key = atom.getStateKey(context.next_project.model.paths);
    context.state = atom.getStorageFolder().load(context.key);

    if (!context.state || atom.getStateKey(context.state.project.paths) !== context.key) {
      atom.project.setPaths(context.next_project.model.paths);
      atom.workspace.getCenter().paneContainer.activePane.destroy();

      this.database.content.selectedId = context.next_project.id;

      context.current_project.selected = false;
      context.next_project.selected = true;

      return Promise.resolve(context);
    }

    // this must run only if context is to be kept in same instance
    context.state.workspace.paneContainers.bottom.paneContainer = {};
    context.state.workspace.paneContainers.left.paneContainer = {};
    context.state.workspace.paneContainers.center.paneContainer = {};
    context.state.workspace.paneContainers.right.paneContainer = {};

    return atom.deserialize(context.state).then(() => {
      this.loadPackages(context.state.extraStates);

      this.database.content.selectedId = context.next_project.id;

      // TODO: needs a better mechanism because collapsing a group
      // will erase the selected project
      context.current_project.selected = false;
      context.next_project.selected = true;

      // TODO: this is bad for performance
      this.database.update();
    });
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  switchContext(project) {
    return this.saveContext(project).then(context => this.loadContext(context)).catch(reason => console.log(reason));
  }
};
exports.default = ContextSwitcher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRleHRTd2l0Y2hlciIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkYXRhYmFzZSIsInBhY2thZ2VzIiwic2F2ZVBhY2thZ2VzIiwic3RhdGVzIiwidHJlZVZpZXciLCJzYXZlIiwiZmluZEFuZFJlcGxhY2UiLCJzdGF0dXNCYXIiLCJsaW50ZXJVSURlZmF1bHQiLCJsaW50ZXIiLCJsb2FkUGFja2FnZXMiLCJsb2FkIiwidGhlbiIsInNhdmVDb250ZXh0IiwicHJvamVjdCIsImNvbnRleHQiLCJjdXJyZW50X3Byb2plY3QiLCJuZXh0X3Byb2plY3QiLCJrZXkiLCJzdGF0ZSIsImNvbnRlbnQiLCJzZWxlY3RlZElkIiwibWFwIiwibW9kZWwiLCJwYXRocyIsImF0b20iLCJnZXRQYXRocyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdGF0ZUtleSIsInNlcmlhbGl6ZSIsImV4dHJhU3RhdGVzIiwiZ2V0U3RvcmFnZUZvbGRlciIsInN0b3JlU3luYyIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZENvbnRleHQiLCJ0eXBlIiwicmVqZWN0IiwiQ09OVEVYVCIsIk5PVF9BX1BST0pFQ1QiLCJpZHMiLCJpbmNsdWRlcyIsImlkIiwiTk9fVkFMSURfUFJPSkVDVF9JRCIsInNldFBhdGhzIiwid29ya3NwYWNlIiwiZ2V0Q2VudGVyIiwicGFuZUNvbnRhaW5lciIsImFjdGl2ZVBhbmUiLCJkZXN0cm95Iiwic2VsZWN0ZWQiLCJwYW5lQ29udGFpbmVycyIsImJvdHRvbSIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsImRlc2VyaWFsaXplIiwidXBkYXRlIiwic3dpdGNoQ29udGV4dCIsImNhdGNoIiwicmVhc29uIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7OztJQUdNQSxlLEdBQU4sTUFBTUEsZUFBTixDQUFzQjs7QUFJcEI7Ozs7O0FB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LEtBQVIsQ0FBYzJCLFNBQWQsQ0FBd0JNLGNBQXhCLENBQXVDRSxJQUF2QyxDQUE0Q04sYUFBNUMsR0FBNEQsRUFBNUQ7QUFDQWpDLFlBQVFJLEtBQVIsQ0FBYzJCLFNBQWQsQ0FBd0JNLGNBQXhCLENBQXVDRyxNQUF2QyxDQUE4Q1AsYUFBOUMsR0FBOEQsRUFBOUQ7QUFDQWpDLFlBQVFJLEtBQVIsQ0FBYzJCLFNBQWQsQ0FBd0JNLGNBQXhCLENBQXVDSSxLQUF2QyxDQUE2Q1IsYUFBN0MsR0FBNkQsRUFBN0Q7O0FBRUEsV0FBT3ZCLEtBQUtnQyxXQUFMLENBQWlCMUMsUUFBUUksS0FBekIsRUFDSlAsSUFESSxDQUNDLE1BQU07QUFDVixXQUFLRixZQUFMLENBQWtCSyxRQUFRSSxLQUFSLENBQWNZLFdBQWhDOztBQUVBLFdBQUsvQixRQUFMLENBQWNvQixPQUFkLENBQXNCQyxVQUF0QixHQUFtQ04sUUFBUUUsWUFBUixDQUFxQjBCLEVBQXhEOztBQUVBO0FBQ0E7QUFDQTVCLGNBQVFDLGVBQVIsQ0FBd0JtQyxRQUF4QixHQUFtQyxLQUFuQztBQUNBcEMsY0FBUUUsWUFBUixDQUFxQmtDLFFBQXJCLEdBQWdDLElBQWhDOztBQUVBO0FBQ0EsV0FBS25ELFFBQUwsQ0FBYzBELE1BQWQ7QUFDRCxLQWJJLENBQVA7QUFjRDs7QUFFRDs7Ozs7O0FBTUFDLGdCQUFlN0MsT0FBZixFQUF3QjtBQUN0QixXQUFPLEtBQUtELFdBQUwsQ0FBaUJDLE9BQWpCLEVBQ0pGLElBREksQ0FDQ0csV0FBVyxLQUFLcUIsV0FBTCxDQUFpQnJCLE9BQWpCLENBRFosRUFFSjZDLEtBRkksQ0FFRUMsVUFBVWxDLFFBQVFDLEdBQVIsQ0FBWWlDLE1BQVosQ0FGWixDQUFQO0FBR0Q7QUFqSm1CLEM7a0JBb0pQaEUsZSIsImZpbGUiOiJjb250ZXh0LXN3aXRjaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERhdGFiYXNlIGZyb20gJy4vZGF0YWJhc2UnO1xuaW1wb3J0IFBhY2thZ2VzIGZyb20gJy4vcGFja2FnZXMnO1xuaW1wb3J0IHsgUExVR0lOX05BTUUsIE1FU1NBR0VTIH0gZnJvbSAnLi8uLi9jb25zdGFudHMvYmFzZSc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBEYXRhYmFzZVxuICovXG5jbGFzcyBDb250ZXh0U3dpdGNoZXIge1xuXG4gIHN0YXRpYyBpbnN0YW5jZTtcblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHRvZG8gaW1wcm92ZSBKU0RvY1xuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIGlmIChDb250ZXh0U3dpdGNoZXIuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBDb250ZXh0U3dpdGNoZXIuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuICAgIHRoaXMucGFja2FnZXMgPSBuZXcgUGFja2FnZXMoKTtcbiAgICBDb250ZXh0U3dpdGNoZXIuaW5zdGFuY2UgPSB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXMgLSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZVBhY2thZ2VzIChzdGF0ZXMpIHtcbiAgICBzdGF0ZXNbJ3RyZWUtdmlldyddID0gdGhpcy5wYWNrYWdlcy50cmVlVmlldy5zYXZlKCk7XG4gICAgc3RhdGVzWydmaW5kLWFuZC1yZXBsYWNlJ10gPSB0aGlzLnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlLnNhdmUoKTtcbiAgICB0aGlzLnBhY2thZ2VzLnN0YXR1c0Jhci5zYXZlKCk7XG4gICAgdGhpcy5wYWNrYWdlcy5saW50ZXJVSURlZmF1bHQuc2F2ZSgpO1xuICAgIHRoaXMucGFja2FnZXMubGludGVyLnNhdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWRQYWNrYWdlcyAoc3RhdGVzKSB7XG4gICAgdGhpcy5wYWNrYWdlcy50cmVlVmlldy5sb2FkKHN0YXRlc1sndHJlZS12aWV3J10pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlLmxvYWQoc3RhdGVzWydmaW5kLWFuZC1yZXBsYWNlJ10pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5zdGF0dXNCYXIubG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXIubG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXJVSURlZmF1bHQubG9hZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvamVjdCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZUNvbnRleHQgKHByb2plY3QpIHtcbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgY3VycmVudF9wcm9qZWN0OiBudWxsLFxuICAgICAgbmV4dF9wcm9qZWN0OiBwcm9qZWN0LFxuICAgICAga2V5OiBudWxsLFxuICAgICAgc3RhdGU6IG51bGxcbiAgICB9O1xuXG4gICAgY29udGV4dC5jdXJyZW50X3Byb2plY3QgPSB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA/XG4gICAgICB0aGlzLmRhdGFiYXNlLmNvbnRlbnQubWFwW3RoaXMuZGF0YWJhc2UuY29udGVudC5zZWxlY3RlZElkXSA6XG4gICAgICB7IG1vZGVsOiB7IHBhdGhzOiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSB9IH07XG5cbiAgICBjb25zb2xlLmxvZygnc2F2ZSBjb250ZXh0JywgY29udGV4dC5jdXJyZW50X3Byb2plY3QpO1xuXG4gICAgLy8gdmFsaWRhdGUgaWYgc2FtZSBwcm9qZWN0cyAocGF0aHMpIC0gdGlwOiB1c2UgYXRvbS5nZXRTdGF0ZUtleVxuXG4gICAgY29udGV4dC5rZXkgPSBhdG9tLmdldFN0YXRlS2V5KGNvbnRleHQuY3VycmVudF9wcm9qZWN0Lm1vZGVsLnBhdGhzKTtcbiAgICBjb250ZXh0LnN0YXRlID0gYXRvbS5zZXJpYWxpemUoKTtcbiAgICBjb250ZXh0LnN0YXRlLmV4dHJhU3RhdGVzID0ge307XG5cbiAgICBpZiAoY29udGV4dC5rZXkgJiYgY29udGV4dC5zdGF0ZSkge1xuICAgICAgdGhpcy5zYXZlUGFja2FnZXMoY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcyk7XG4gICAgICBhdG9tLmdldFN0b3JhZ2VGb2xkZXIoKS5zdG9yZVN5bmMoY29udGV4dC5rZXksIGNvbnRleHQuc3RhdGUpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWRDb250ZXh0IChjb250ZXh0KSB7XG4gICAgY29uc29sZS5sb2coJ2xvYWQgY29udGV4dCcsIGNvbnRleHQubmV4dF9wcm9qZWN0KTtcblxuICAgIGlmIChjb250ZXh0Lm5leHRfcHJvamVjdC50eXBlICE9PSAncHJvamVjdCcpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChNRVNTQUdFUy5DT05URVhULk5PVF9BX1BST0pFQ1QpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZGF0YWJhc2UuY29udGVudC5pZHMuaW5jbHVkZXMoY29udGV4dC5uZXh0X3Byb2plY3QuaWQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoTUVTU0FHRVMuQ09OVEVYVC5OT19WQUxJRF9QUk9KRUNUX0lEKTtcbiAgICB9XG5cbiAgICBjb250ZXh0LmtleSA9IGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5uZXh0X3Byb2plY3QubW9kZWwucGF0aHMpO1xuICAgIGNvbnRleHQuc3RhdGUgPSBhdG9tLmdldFN0b3JhZ2VGb2xkZXIoKS5sb2FkKGNvbnRleHQua2V5KTtcblxuICAgIGlmIChcbiAgICAgICFjb250ZXh0LnN0YXRlIHx8XG4gICAgICBhdG9tLmdldFN0YXRlS2V5KGNvbnRleHQuc3RhdGUucHJvamVjdC5wYXRocykgIT09IGNvbnRleHQua2V5XG4gICAgKSB7XG4gICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMoY29udGV4dC5uZXh0X3Byb2plY3QubW9kZWwucGF0aHMpO1xuICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkucGFuZUNvbnRhaW5lci5hY3RpdmVQYW5lLmRlc3Ryb3koKTtcblxuICAgICAgdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWQgPSBjb250ZXh0Lm5leHRfcHJvamVjdC5pZDtcblxuICAgICAgY29udGV4dC5jdXJyZW50X3Byb2plY3Quc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRleHQubmV4dF9wcm9qZWN0LnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIG11c3QgcnVuIG9ubHkgaWYgY29udGV4dCBpcyB0byBiZSBrZXB0IGluIHNhbWUgaW5zdGFuY2VcbiAgICBjb250ZXh0LnN0YXRlLndvcmtzcGFjZS5wYW5lQ29udGFpbmVycy5ib3R0b20ucGFuZUNvbnRhaW5lciA9IHt9O1xuICAgIGNvbnRleHQuc3RhdGUud29ya3NwYWNlLnBhbmVDb250YWluZXJzLmxlZnQucGFuZUNvbnRhaW5lciA9IHt9O1xuICAgIGNvbnRleHQuc3RhdGUud29ya3NwYWNlLnBhbmVDb250YWluZXJzLmNlbnRlci5wYW5lQ29udGFpbmVyID0ge307XG4gICAgY29udGV4dC5zdGF0ZS53b3Jrc3BhY2UucGFuZUNvbnRhaW5lcnMucmlnaHQucGFuZUNvbnRhaW5lciA9IHt9O1xuXG4gICAgcmV0dXJuIGF0b20uZGVzZXJpYWxpemUoY29udGV4dC5zdGF0ZSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkUGFja2FnZXMoY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcyk7XG5cbiAgICAgICAgdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWQgPSBjb250ZXh0Lm5leHRfcHJvamVjdC5pZDtcblxuICAgICAgICAvLyBUT0RPOiBuZWVkcyBhIGJldHRlciBtZWNoYW5pc20gYmVjYXVzZSBjb2xsYXBzaW5nIGEgZ3JvdXBcbiAgICAgICAgLy8gd2lsbCBlcmFzZSB0aGUgc2VsZWN0ZWQgcHJvamVjdFxuICAgICAgICBjb250ZXh0LmN1cnJlbnRfcHJvamVjdC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBjb250ZXh0Lm5leHRfcHJvamVjdC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBiYWQgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgIHRoaXMuZGF0YWJhc2UudXBkYXRlKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvamVjdCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc3dpdGNoQ29udGV4dCAocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnNhdmVDb250ZXh0KHByb2plY3QpXG4gICAgICAudGhlbihjb250ZXh0ID0+IHRoaXMubG9hZENvbnRleHQoY29udGV4dCkpXG4gICAgICAuY2F0Y2gocmVhc29uID0+IGNvbnNvbGUubG9nKHJlYXNvbikpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRTd2l0Y2hlcjtcbiJdfQ==