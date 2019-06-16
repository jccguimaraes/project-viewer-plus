'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _packages = require('./packages');

var _packages2 = _interopRequireDefault(_packages);

var _base = require('./../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing the context switcher
 */
class ContextSwitcher {
  /**
   * description
   *
   * @todo improve JSDoc
   */
  constructor() {
    this.packages = new _packages2.default();
  }

  /**
   * description
   *
   * @param {Object} states - description
   */
  savePackages(states) {
    states.treeView = this.packages.treeView.save();
    states.findAndReplace = this.packages.findAndReplace.save();
    this.packages.linterUIDefault.save();
    this.packages.linter.save();
  }

  /**
   * description
   *
   * @param {Object} states - description
   * @returns {Promise} description
   */
  loadOrReloadPackages(states) {
    if (!states) {
      return Promise.resolve();
    }
    return this.packages.treeView.load(states.treeView).then(() => this.packages.findAndReplace.load(states.findAndReplace)).then(() => this.packages.statusBar.reload()).then(() => this.packages.linter.load()).then(() => this.packages.linterUIDefault.load());
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  saveContext(context) {
    return new Promise(async resolve => {
      /* this.database.content.selectedId ?
        this.database.content.map[this.database.content.selectedId] : */
      context.current_project = { model: { paths: atom.project.getPaths() } };

      console.log('start save context', context.current_project);

      context.key = atom.getStateKey(context.current_project.paths);

      context.state = atom.serialize();

      context.docker = atom.workspace.getCenter();

      context.state.extraStates = {};

      if (context.key && context.state) {
        this.savePackages(context.state.extraStates);
        await atom.stateStore.save(context.key, context.state);
      }

      console.log('end save context', context);

      resolve(context);
    });
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  loadContext(context) {
    return new Promise(async (resolve, reject) => {
      console.log('start load context', context.next_project);

      context.key = atom.getStateKey(context.next_project.paths);
      context.state = await atom.stateStore.load(context.key);

      if (!context.state || atom.getStateKey(context.state.project.paths) !== context.key) {
        atom.project.setPaths(context.next_project.paths);

        const pane = atom.workspace.getCenter().paneContainer.activePane;

        if (pane) {
          pane.destroy();
        }

        // this.database.content.selectedId = context.next_project.id;

        context.current_project.selected = false;
        context.next_project.selected = true;

        return resolve(context);
      }

      atom.project.deserialize(context.state.project).then(() => atom.workspace.getCenter().deserialize(context.state.workspace.paneContainers.center, atom.deserializers)).then(() => this.loadOrReloadPackages(context.state.extraStates)).then(() => {
        // this.database.content.selectedId = context.next_project.id;

        context.current_project.selected = false;
        context.next_project.selected = true;

        // TODO: this is bad for performance
        // this.database.update();

        console.log('end load context');

        resolve(context);
      });
    });
  }

  /**
   * @param {Object} project - description
   * @returns {Promise} description
   */
  validateContext(project) {
    return new Promise((resolve, reject) => {
      if (!atom.stateStore && !atom.stateStore.save && !atom.stateStore.load) {
        reject(_base.MESSAGES.ATOM.INVALID_ATOM_API);
      }

      // else if (project.id === this.database.content.selectedId) {
      //   reject(MESSAGES.CONTEXT.SAME_PROJECT_ID);
      // }

      // else if (project.type !== 'project') {
      //   return reject(MESSAGES.CONTEXT.NOT_A_PROJECT);
      // }

      // else if (!this.database.content.ids.includes(project.id)) {
      //   return reject(MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
      // }

      resolve({
        current_project: null,
        next_project: project,
        key: null,
        state: null
      });
    });
  }

  /**
   * description
   *
   * @param {Object} project - description
   * @returns {Promise} description
   */
  switchContext(project) {
    console.log(project);

    return this.validateContext(project).then(context => this.saveContext(context)).then(context => this.loadContext(context)).catch(reason => console.log('switching error', reason));
  }
}
exports.default = ContextSwitcher;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRleHRTd2l0Y2hlciIsImNvbnN0cnVjdG9yIiwicGFja2FnZXMiLCJQYWNrYWdlcyIsInNhdmVQYWNrYWdlcyIsInN0YXRlcyIsInRyZWVWaWV3Iiwic2F2ZSIsImZpbmRBbmRSZXBsYWNlIiwibGludGVyVUlEZWZhdWx0IiwibGludGVyIiwibG9hZE9yUmVsb2FkUGFja2FnZXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvYWQiLCJ0aGVuIiwic3RhdHVzQmFyIiwicmVsb2FkIiwic2F2ZUNvbnRleHQiLCJjb250ZXh0IiwiY3VycmVudF9wcm9qZWN0IiwibW9kZWwiLCJwYXRocyIsImF0b20iLCJwcm9qZWN0IiwiZ2V0UGF0aHMiLCJjb25zb2xlIiwibG9nIiwia2V5IiwiZ2V0U3RhdGVLZXkiLCJzdGF0ZSIsInNlcmlhbGl6ZSIsImRvY2tlciIsIndvcmtzcGFjZSIsImdldENlbnRlciIsImV4dHJhU3RhdGVzIiwic3RhdGVTdG9yZSIsImxvYWRDb250ZXh0IiwicmVqZWN0IiwibmV4dF9wcm9qZWN0Iiwic2V0UGF0aHMiLCJwYW5lIiwicGFuZUNvbnRhaW5lciIsImFjdGl2ZVBhbmUiLCJkZXN0cm95Iiwic2VsZWN0ZWQiLCJkZXNlcmlhbGl6ZSIsInBhbmVDb250YWluZXJzIiwiY2VudGVyIiwiZGVzZXJpYWxpemVycyIsInZhbGlkYXRlQ29udGV4dCIsIk1FU1NBR0VTIiwiQVRPTSIsIklOVkFMSURfQVRPTV9BUEkiLCJzd2l0Y2hDb250ZXh0IiwiY2F0Y2giLCJyZWFzb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7O0FBR2UsTUFBTUEsZUFBTixDQUFzQjtBQUNuQzs7Ozs7QUFLQUMsZ0JBQWU7QUFDYixTQUFLQyxRQUFMLEdBQWdCLElBQUlDLGtCQUFKLEVBQWhCO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0FDLGVBQWNDLE1B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S2EsVUFBTCxDQUFnQnRCLElBQWxFLEVBQXdFO0FBQ3RFd0IsZUFBT2EsZUFBU0MsSUFBVCxDQUFjQyxnQkFBckI7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQXhDLGNBQVE7QUFDTk8seUJBQWlCLElBRFg7QUFFTm1CLHNCQUFjZixPQUZSO0FBR05JLGFBQUssSUFIQztBQUlORSxlQUFPO0FBSkQsT0FBUjtBQU1ELEtBdkJNLENBQVA7QUF3QkQ7O0FBRUQ7Ozs7OztBQU1Bd0IsZ0JBQWU5QixPQUFmLEVBQXdCO0FBQ3RCRSxZQUFRQyxHQUFSLENBQVlILE9BQVo7O0FBRUEsV0FBTyxLQUFLMEIsZUFBTCxDQUFxQjFCLE9BQXJCLEVBQ0pULElBREksQ0FDQ0ksV0FBVyxLQUFLRCxXQUFMLENBQWlCQyxPQUFqQixDQURaLEVBRUpKLElBRkksQ0FFQ0ksV0FBVyxLQUFLa0IsV0FBTCxDQUFpQmxCLE9BQWpCLENBRlosRUFHSm9DLEtBSEksQ0FHRUMsVUFBVTlCLFFBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQjZCLE1BQS9CLENBSFosQ0FBUDtBQUlEO0FBakxrQztrQkFBaEJ4RCxlIiwiZmlsZSI6ImNvbnRleHQtc3dpdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFja2FnZXMgZnJvbSAnLi9wYWNrYWdlcyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSwgTUVTU0FHRVMgfSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIGNvbnRleHQgc3dpdGNoZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGV4dFN3aXRjaGVyIHtcbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnBhY2thZ2VzID0gbmV3IFBhY2thZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlUGFja2FnZXMgKHN0YXRlcykge1xuICAgIHN0YXRlcy50cmVlVmlldyA9IHRoaXMucGFja2FnZXMudHJlZVZpZXcuc2F2ZSgpO1xuICAgIHN0YXRlcy5maW5kQW5kUmVwbGFjZSA9IHRoaXMucGFja2FnZXMuZmluZEFuZFJlcGxhY2Uuc2F2ZSgpO1xuICAgIHRoaXMucGFja2FnZXMubGludGVyVUlEZWZhdWx0LnNhdmUoKTtcbiAgICB0aGlzLnBhY2thZ2VzLmxpbnRlci5zYXZlKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZE9yUmVsb2FkUGFja2FnZXMgKHN0YXRlcykge1xuICAgIGlmICghc3RhdGVzKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhY2thZ2VzLnRyZWVWaWV3XG4gICAgICAubG9hZChzdGF0ZXMudHJlZVZpZXcpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlLmxvYWQoc3RhdGVzLmZpbmRBbmRSZXBsYWNlKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucGFja2FnZXMuc3RhdHVzQmFyLnJlbG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXIubG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXJVSURlZmF1bHQubG9hZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZUNvbnRleHQgKGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICAvKiB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA/XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY29udGVudC5tYXBbdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWRdIDogKi9cbiAgICAgIGNvbnRleHQuY3VycmVudF9wcm9qZWN0ID0geyBtb2RlbDogeyBwYXRoczogYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkgfSB9O1xuXG4gICAgICBjb25zb2xlLmxvZygnc3RhcnQgc2F2ZSBjb250ZXh0JywgY29udGV4dC5jdXJyZW50X3Byb2plY3QpO1xuXG4gICAgICBjb250ZXh0LmtleSA9IGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5jdXJyZW50X3Byb2plY3QucGF0aHMpO1xuXG4gICAgICBjb250ZXh0LnN0YXRlID0gYXRvbS5zZXJpYWxpemUoKTtcblxuICAgICAgY29udGV4dC5kb2NrZXIgPSBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKTtcblxuICAgICAgY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcyA9IHt9O1xuXG4gICAgICBpZiAoY29udGV4dC5rZXkgJiYgY29udGV4dC5zdGF0ZSkge1xuICAgICAgICB0aGlzLnNhdmVQYWNrYWdlcyhjb250ZXh0LnN0YXRlLmV4dHJhU3RhdGVzKTtcbiAgICAgICAgYXdhaXQgYXRvbS5zdGF0ZVN0b3JlLnNhdmUoY29udGV4dC5rZXksIGNvbnRleHQuc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmxvZygnZW5kIHNhdmUgY29udGV4dCcsIGNvbnRleHQpO1xuXG4gICAgICByZXNvbHZlKGNvbnRleHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkQ29udGV4dCAoY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc3RhcnQgbG9hZCBjb250ZXh0JywgY29udGV4dC5uZXh0X3Byb2plY3QpO1xuXG4gICAgICBjb250ZXh0LmtleSA9IGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5uZXh0X3Byb2plY3QucGF0aHMpO1xuICAgICAgY29udGV4dC5zdGF0ZSA9IGF3YWl0IGF0b20uc3RhdGVTdG9yZS5sb2FkKGNvbnRleHQua2V5KTtcblxuICAgICAgaWYgKFxuICAgICAgICAhY29udGV4dC5zdGF0ZSB8fFxuICAgICAgICBhdG9tLmdldFN0YXRlS2V5KGNvbnRleHQuc3RhdGUucHJvamVjdC5wYXRocykgIT09IGNvbnRleHQua2V5XG4gICAgICApIHtcbiAgICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzKGNvbnRleHQubmV4dF9wcm9qZWN0LnBhdGhzKTtcblxuICAgICAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkucGFuZUNvbnRhaW5lci5hY3RpdmVQYW5lO1xuXG4gICAgICAgIGlmIChwYW5lKSB7XG4gICAgICAgICAgcGFuZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGNvbnRleHQubmV4dF9wcm9qZWN0LmlkO1xuXG4gICAgICAgIGNvbnRleHQuY3VycmVudF9wcm9qZWN0LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQubmV4dF9wcm9qZWN0LnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZShjb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgYXRvbS5wcm9qZWN0XG4gICAgICAgIC5kZXNlcmlhbGl6ZShjb250ZXh0LnN0YXRlLnByb2plY3QpXG4gICAgICAgIC50aGVuKCgpID0+XG4gICAgICAgICAgYXRvbS53b3Jrc3BhY2VcbiAgICAgICAgICAgIC5nZXRDZW50ZXIoKVxuICAgICAgICAgICAgLmRlc2VyaWFsaXplKFxuICAgICAgICAgICAgICBjb250ZXh0LnN0YXRlLndvcmtzcGFjZS5wYW5lQ29udGFpbmVycy5jZW50ZXIsXG4gICAgICAgICAgICAgIGF0b20uZGVzZXJpYWxpemVyc1xuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC50aGVuKCgpID0+IHRoaXMubG9hZE9yUmVsb2FkUGFja2FnZXMoY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcykpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAvLyB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGNvbnRleHQubmV4dF9wcm9qZWN0LmlkO1xuXG4gICAgICAgICAgY29udGV4dC5jdXJyZW50X3Byb2plY3Quc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICBjb250ZXh0Lm5leHRfcHJvamVjdC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGJhZCBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAvLyB0aGlzLmRhdGFiYXNlLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coJ2VuZCBsb2FkIGNvbnRleHQnKTtcblxuICAgICAgICAgIHJlc29sdmUoY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9qZWN0IC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICB2YWxpZGF0ZUNvbnRleHQgKHByb2plY3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFhdG9tLnN0YXRlU3RvcmUgJiYgIWF0b20uc3RhdGVTdG9yZS5zYXZlICYmICFhdG9tLnN0YXRlU3RvcmUubG9hZCkge1xuICAgICAgICByZWplY3QoTUVTU0FHRVMuQVRPTS5JTlZBTElEX0FUT01fQVBJKTtcbiAgICAgIH1cblxuICAgICAgLy8gZWxzZSBpZiAocHJvamVjdC5pZCA9PT0gdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWQpIHtcbiAgICAgIC8vICAgcmVqZWN0KE1FU1NBR0VTLkNPTlRFWFQuU0FNRV9QUk9KRUNUX0lEKTtcbiAgICAgIC8vIH1cblxuICAgICAgLy8gZWxzZSBpZiAocHJvamVjdC50eXBlICE9PSAncHJvamVjdCcpIHtcbiAgICAgIC8vICAgcmV0dXJuIHJlamVjdChNRVNTQUdFUy5DT05URVhULk5PVF9BX1BST0pFQ1QpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBlbHNlIGlmICghdGhpcy5kYXRhYmFzZS5jb250ZW50Lmlkcy5pbmNsdWRlcyhwcm9qZWN0LmlkKSkge1xuICAgICAgLy8gICByZXR1cm4gcmVqZWN0KE1FU1NBR0VTLkNPTlRFWFQuTk9fVkFMSURfUFJPSkVDVF9JRCk7XG4gICAgICAvLyB9XG5cbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBjdXJyZW50X3Byb2plY3Q6IG51bGwsXG4gICAgICAgIG5leHRfcHJvamVjdDogcHJvamVjdCxcbiAgICAgICAga2V5OiBudWxsLFxuICAgICAgICBzdGF0ZTogbnVsbFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb2plY3QgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHN3aXRjaENvbnRleHQgKHByb2plY3QpIHtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0KTtcblxuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQ29udGV4dChwcm9qZWN0KVxuICAgICAgLnRoZW4oY29udGV4dCA9PiB0aGlzLnNhdmVDb250ZXh0KGNvbnRleHQpKVxuICAgICAgLnRoZW4oY29udGV4dCA9PiB0aGlzLmxvYWRDb250ZXh0KGNvbnRleHQpKVxuICAgICAgLmNhdGNoKHJlYXNvbiA9PiBjb25zb2xlLmxvZygnc3dpdGNoaW5nIGVycm9yJywgcmVhc29uKSk7XG4gIH1cbn1cbiJdfQ==