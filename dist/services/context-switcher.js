'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _devlog = require('./devlog');

var _devlog2 = _interopRequireDefault(_devlog);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _packages = require('./packages');

var _packages2 = _interopRequireDefault(_packages);

var _base = require('./../constants/base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    ContextSwitcher.instance = this;

    this.database = new _database2.default();
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
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve) {
        context.current_project = _this.database.content.selectedId ? _this.database.content.map[_this.database.content.selectedId] : { model: { paths: atom.project.getPaths() } };

        (0, _devlog2.default)('start save context', context.current_project);

        context.key = atom.getStateKey(context.current_project.model.paths);

        context.state = atom.serialize();

        context.docker = atom.workspace.getCenter();

        context.state.extraStates = {};

        if (context.key && context.state) {
          _this.savePackages(context.state.extraStates);
          yield atom.stateStore.save(context.key, context.state);
        }

        (0, _devlog2.default)('end save context', context);

        resolve(context);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
  }

  /**
   * description
   *
   * @param {Object} context - description
   * @returns {Promise} description
   */
  loadContext(context) {
    var _this2 = this;

    return new Promise((() => {
      var _ref2 = _asyncToGenerator(function* (resolve, reject) {
        (0, _devlog2.default)('start load context', context.next_project);

        context.key = atom.getStateKey(context.next_project.model.paths);
        context.state = yield atom.stateStore.load(context.key);

        if (!context.state || atom.getStateKey(context.state.project.paths) !== context.key) {
          atom.project.setPaths(context.next_project.model.paths);

          const pane = atom.workspace.getCenter().paneContainer.activePane;

          if (pane) {
            pane.destroy();
          }

          _this2.database.content.selectedId = context.next_project.id;

          context.current_project.selected = false;
          context.next_project.selected = true;

          return resolve(context);
        }

        atom.project.deserialize(context.state.project).then(function () {
          return atom.workspace.getCenter().deserialize(context.state.workspace.paneContainers.center, atom.deserializers);
        }).then(function () {
          return _this2.loadOrReloadPackages(context.state.extraStates);
        }).then(function () {
          _this2.database.content.selectedId = context.next_project.id;

          context.current_project.selected = false;
          context.next_project.selected = true;

          // TODO: this is bad for performance
          _this2.database.update();

          (0, _devlog2.default)('end load context');

          resolve(context);
        });
      });

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    })());
  }

  /**
   * @param {Object} project - description
   * @returns {Promise} description
   */
  validateContext(project) {
    return new Promise((resolve, reject) => {
      if (!atom.stateStore && !atom.stateStore.save && !atom.stateStore.load) {
        reject(_base.MESSAGES.ATOM.INVALID_ATOM_API);
      } else if (project.id === this.database.content.selectedId) {
        reject(_base.MESSAGES.CONTEXT.SAME_PROJECT_ID);
      } else if (project.type !== 'project') {
        return reject(_base.MESSAGES.CONTEXT.NOT_A_PROJECT);
      } else if (!this.database.content.ids.includes(project.id)) {
        return reject(_base.MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
      }

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
    return this.validateContext(project).then(context => this.saveContext(context)).then(context => this.loadContext(context)).catch(reason => (0, _devlog2.default)('switching error', reason));
  }
};
exports.default = ContextSwitcher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRleHRTd2l0Y2hlciIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkYXRhYmFzZSIsIkRhdGFiYXNlIiwicGFja2FnZXMiLCJQYWNrYWdlcyIsInNhdmVQYWNrYWdlcyIsInN0YXRlcyIsInRyZWVWaWV3Iiwic2F2ZSIsImZpbmRBbmRSZXBsYWNlIiwibGludGVyVUlEZWZhdWx0IiwibGludGVyIiwibG9hZE9yUmVsb2FkUGFja2FnZXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsImxvYWQiLCJ0aGVuIiwic3RhdHVzQmFyIiwicmVsb2FkIiwic2F2ZUNvbnRleHQiLCJjb250ZXh0IiwiY3VycmVudF9wcm9qZWN0IiwiY29udGVudCIsInNlbGVjdGVkSWQiLCJtYXAiLCJtb2RlbCIsInBhdGhzIiwiYXRvbSIsInByb2plY3QiLCJnZXRQYXRocyIsImtleSIsImdldFN0YXRlS2V5Iiwic3RhdGUiLCJzZXJpYWxpemUiLCJkb2NrZXIiLCJ3b3Jrc3BhY2UiLCJnZXRDZW50ZXIiLCJleHRyYVN0YXRlcyIsInN0YXRlU3RvcmUiLCJsb2FkQ29udGV4dCIsInJlamVjdCIsIm5leHRfcHJvamVjdCIsInNldFBhdGhzIiwicGFuZSIsInBhbmVDb250YWluZXIiLCJhY3RpdmVQYW5lIiwiZGVzdHJveSIsImlkIiwic2VsZWN0ZWQiLCJkZXNlcmlhbGl6ZSIsInBhbmVDb250YWluZXJzIiwiY2VudGVyIiwiZGVzZXJpYWxpemVycyIsInVwZGF0ZSIsInZhbGlkYXRlQ29udGV4dCIsIk1FU1NBR0VTIiwiQVRPTSIsIklOVkFMSURfQVRPTV9BUEkiLCJDT05URVhUIiwiU0FNRV9QUk9KRUNUX0lEIiwidHlwZSIsIk5PVF9BX1BST0pFQ1QiLCJpZHMiLCJpbmNsdWRlcyIsIk5PX1ZBTElEX1BST0pFQ1RfSUQiLCJzd2l0Y2hDb250ZXh0IiwiY2F0Y2giLCJyZWFzb24iXSwibWFw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ZUFBeEI7QUFDRCxPQUZJLE1BSUEsSUFBSS9CLFFBQVFnQyxJQUFSLEtBQWlCLFNBQXJCLEVBQWdDO0FBQ25DLGVBQU9wQixPQUFPZSxlQUFTRyxPQUFULENBQWlCRyxhQUF4QixDQUFQO0FBQ0QsT0FGSSxNQUlBLElBQUksQ0FBQyxLQUFLNUQsUUFBTCxDQUFjcUIsT0FBZCxDQUFzQndDLEdBQXRCLENBQTBCQyxRQUExQixDQUFtQ25DLFFBQVFtQixFQUEzQyxDQUFMLEVBQXFEO0FBQ3hELGVBQU9QLE9BQU9lLGVBQVNHLE9BQVQsQ0FBaUJNLG1CQUF4QixDQUFQO0FBQ0Q7O0FBRURsRCxjQUFRO0FBQ05PLHlCQUFpQixJQURYO0FBRU5vQixzQkFBY2IsT0FGUjtBQUdORSxhQUFLLElBSEM7QUFJTkUsZUFBTztBQUpELE9BQVI7QUFNRCxLQXZCTSxDQUFQO0FBd0JEOztBQUVEOzs7Ozs7QUFNQWlDLGdCQUFlckMsT0FBZixFQUF3QjtBQUN0QixXQUFPLEtBQUswQixlQUFMLENBQXFCMUIsT0FBckIsRUFDSlosSUFESSxDQUNDSSxXQUFXLEtBQUtELFdBQUwsQ0FBaUJDLE9BQWpCLENBRFosRUFFSkosSUFGSSxDQUVDSSxXQUFXLEtBQUttQixXQUFMLENBQWlCbkIsT0FBakIsQ0FGWixFQUdKOEMsS0FISSxDQUdFQyxVQUFVLHNCQUFPLGlCQUFQLEVBQTBCQSxNQUExQixDQUhaLENBQVA7QUFJRDtBQWpMbUIsQztrQkFvTFByRSxlIiwiZmlsZSI6ImNvbnRleHQtc3dpdGNoZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGV2bG9nIGZyb20gJy4vZGV2bG9nJztcbmltcG9ydCBEYXRhYmFzZSBmcm9tICcuL2RhdGFiYXNlJztcbmltcG9ydCBQYWNrYWdlcyBmcm9tICcuL3BhY2thZ2VzJztcbmltcG9ydCB7IFBMVUdJTl9OQU1FLCBNRVNTQUdFUyB9IGZyb20gJy4vLi4vY29uc3RhbnRzL2Jhc2UnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgRGF0YWJhc2VcbiAqL1xuY2xhc3MgQ29udGV4dFN3aXRjaGVyIHtcblxuICBzdGF0aWMgaW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIGRlc2NyaXB0aW9uXG4gICAqXG4gICAqIEB0b2RvIGltcHJvdmUgSlNEb2NcbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBpZiAoQ29udGV4dFN3aXRjaGVyLmluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gQ29udGV4dFN3aXRjaGVyLmluc3RhbmNlO1xuICAgIH1cbiAgICBDb250ZXh0U3dpdGNoZXIuaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy5kYXRhYmFzZSA9IG5ldyBEYXRhYmFzZSgpO1xuICAgIHRoaXMucGFja2FnZXMgPSBuZXcgUGFja2FnZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzIC0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNhdmVQYWNrYWdlcyAoc3RhdGVzKSB7XG4gICAgc3RhdGVzLnRyZWVWaWV3ID0gdGhpcy5wYWNrYWdlcy50cmVlVmlldy5zYXZlKCk7XG4gICAgc3RhdGVzLmZpbmRBbmRSZXBsYWNlID0gdGhpcy5wYWNrYWdlcy5maW5kQW5kUmVwbGFjZS5zYXZlKCk7XG4gICAgdGhpcy5wYWNrYWdlcy5saW50ZXJVSURlZmF1bHQuc2F2ZSgpO1xuICAgIHRoaXMucGFja2FnZXMubGludGVyLnNhdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVzIC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICBsb2FkT3JSZWxvYWRQYWNrYWdlcyAoc3RhdGVzKSB7XG4gICAgaWYgKCFzdGF0ZXMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFja2FnZXMudHJlZVZpZXcubG9hZChzdGF0ZXMudHJlZVZpZXcpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBhY2thZ2VzLmZpbmRBbmRSZXBsYWNlLmxvYWQoc3RhdGVzLmZpbmRBbmRSZXBsYWNlKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucGFja2FnZXMuc3RhdHVzQmFyLnJlbG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXIubG9hZCgpKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5saW50ZXJVSURlZmF1bHQubG9hZCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc2F2ZUNvbnRleHQgKGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBjb250ZXh0LmN1cnJlbnRfcHJvamVjdCA9IHRoaXMuZGF0YWJhc2UuY29udGVudC5zZWxlY3RlZElkID9cbiAgICAgICAgdGhpcy5kYXRhYmFzZS5jb250ZW50Lm1hcFt0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZF0gOlxuICAgICAgICB7IG1vZGVsOiB7IHBhdGhzOiBhdG9tLnByb2plY3QuZ2V0UGF0aHMoKSB9IH07XG5cbiAgICAgIGRldmxvZygnc3RhcnQgc2F2ZSBjb250ZXh0JywgY29udGV4dC5jdXJyZW50X3Byb2plY3QpO1xuXG4gICAgICBjb250ZXh0LmtleSA9IGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5jdXJyZW50X3Byb2plY3QubW9kZWwucGF0aHMpO1xuXG4gICAgICBjb250ZXh0LnN0YXRlID0gYXRvbS5zZXJpYWxpemUoKTtcblxuICAgICAgY29udGV4dC5kb2NrZXIgPSBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKTtcblxuICAgICAgY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcyA9IHt9O1xuXG4gICAgICBpZiAoY29udGV4dC5rZXkgJiYgY29udGV4dC5zdGF0ZSkge1xuICAgICAgICB0aGlzLnNhdmVQYWNrYWdlcyhjb250ZXh0LnN0YXRlLmV4dHJhU3RhdGVzKTtcbiAgICAgICAgYXdhaXQgYXRvbS5zdGF0ZVN0b3JlLnNhdmUoY29udGV4dC5rZXksIGNvbnRleHQuc3RhdGUpO1xuICAgICAgfVxuXG4gICAgICBkZXZsb2coJ2VuZCBzYXZlIGNvbnRleHQnLCBjb250ZXh0KTtcblxuICAgICAgcmVzb2x2ZShjb250ZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZENvbnRleHQgKGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZGV2bG9nKCdzdGFydCBsb2FkIGNvbnRleHQnLCBjb250ZXh0Lm5leHRfcHJvamVjdCk7XG5cbiAgICAgIGNvbnRleHQua2V5ID0gYXRvbS5nZXRTdGF0ZUtleShjb250ZXh0Lm5leHRfcHJvamVjdC5tb2RlbC5wYXRocyk7XG4gICAgICBjb250ZXh0LnN0YXRlID0gYXdhaXQgYXRvbS5zdGF0ZVN0b3JlLmxvYWQoY29udGV4dC5rZXkpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFjb250ZXh0LnN0YXRlIHx8XG4gICAgICAgIGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5zdGF0ZS5wcm9qZWN0LnBhdGhzKSAhPT0gY29udGV4dC5rZXlcbiAgICAgICkge1xuICAgICAgICBhdG9tLnByb2plY3Quc2V0UGF0aHMoY29udGV4dC5uZXh0X3Byb2plY3QubW9kZWwucGF0aHMpO1xuXG4gICAgICAgIGNvbnN0IHBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKS5wYW5lQ29udGFpbmVyLmFjdGl2ZVBhbmU7XG5cbiAgICAgICAgaWYgKHBhbmUpIHtcbiAgICAgICAgICBwYW5lLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY29udGVudC5zZWxlY3RlZElkID0gY29udGV4dC5uZXh0X3Byb2plY3QuaWQ7XG5cbiAgICAgICAgY29udGV4dC5jdXJyZW50X3Byb2plY3Quc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29udGV4dC5uZXh0X3Byb2plY3Quc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiByZXNvbHZlKGNvbnRleHQpO1xuICAgICAgfVxuXG4gICAgICBhdG9tLnByb2plY3QuZGVzZXJpYWxpemUoY29udGV4dC5zdGF0ZS5wcm9qZWN0KVxuICAgICAgICAudGhlbigoKSA9PiBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKS5kZXNlcmlhbGl6ZShcbiAgICAgICAgICBjb250ZXh0LnN0YXRlLndvcmtzcGFjZS5wYW5lQ29udGFpbmVycy5jZW50ZXIsIGF0b20uZGVzZXJpYWxpemVyc1xuICAgICAgICApKVxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLmxvYWRPclJlbG9hZFBhY2thZ2VzKGNvbnRleHQuc3RhdGUuZXh0cmFTdGF0ZXMpKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWQgPSBjb250ZXh0Lm5leHRfcHJvamVjdC5pZDtcblxuICAgICAgICAgIGNvbnRleHQuY3VycmVudF9wcm9qZWN0LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgY29udGV4dC5uZXh0X3Byb2plY3Quc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBiYWQgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgICAgdGhpcy5kYXRhYmFzZS51cGRhdGUoKTtcblxuICAgICAgICAgIGRldmxvZygnZW5kIGxvYWQgY29udGV4dCcpO1xuXG4gICAgICAgICAgcmVzb2x2ZShjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb2plY3QgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHZhbGlkYXRlQ29udGV4dCAocHJvamVjdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWF0b20uc3RhdGVTdG9yZSAmJiAhYXRvbS5zdGF0ZVN0b3JlLnNhdmUgJiYgIWF0b20uc3RhdGVTdG9yZS5sb2FkKSB7XG4gICAgICAgIHJlamVjdChNRVNTQUdFUy5BVE9NLklOVkFMSURfQVRPTV9BUEkpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChwcm9qZWN0LmlkID09PSB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCkge1xuICAgICAgICByZWplY3QoTUVTU0FHRVMuQ09OVEVYVC5TQU1FX1BST0pFQ1RfSUQpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChwcm9qZWN0LnR5cGUgIT09ICdwcm9qZWN0Jykge1xuICAgICAgICByZXR1cm4gcmVqZWN0KE1FU1NBR0VTLkNPTlRFWFQuTk9UX0FfUFJPSkVDVCk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKCF0aGlzLmRhdGFiYXNlLmNvbnRlbnQuaWRzLmluY2x1ZGVzKHByb2plY3QuaWQpKSB7XG4gICAgICAgIHJldHVybiByZWplY3QoTUVTU0FHRVMuQ09OVEVYVC5OT19WQUxJRF9QUk9KRUNUX0lEKTtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGN1cnJlbnRfcHJvamVjdDogbnVsbCxcbiAgICAgICAgbmV4dF9wcm9qZWN0OiBwcm9qZWN0LFxuICAgICAgICBrZXk6IG51bGwsXG4gICAgICAgIHN0YXRlOiBudWxsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvamVjdCAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgc3dpdGNoQ29udGV4dCAocHJvamVjdCkge1xuICAgIHJldHVybiB0aGlzLnZhbGlkYXRlQ29udGV4dChwcm9qZWN0KVxuICAgICAgLnRoZW4oY29udGV4dCA9PiB0aGlzLnNhdmVDb250ZXh0KGNvbnRleHQpKVxuICAgICAgLnRoZW4oY29udGV4dCA9PiB0aGlzLmxvYWRDb250ZXh0KGNvbnRleHQpKVxuICAgICAgLmNhdGNoKHJlYXNvbiA9PiBkZXZsb2coJ3N3aXRjaGluZyBlcnJvcicsIHJlYXNvbikpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRTd2l0Y2hlcjtcbiJdfQ==