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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9zZXJ2aWNlcy9jb250ZXh0LXN3aXRjaGVyLmpzIl0sIm5hbWVzIjpbIkNvbnRleHRTd2l0Y2hlciIsImNvbnN0cnVjdG9yIiwiaW5zdGFuY2UiLCJkYXRhYmFzZSIsInBhY2thZ2VzIiwic2F2ZVBhY2thZ2VzIiwic3RhdGVzIiwidHJlZVZpZXciLCJzYXZlIiwiZmluZEFuZFJlcGxhY2UiLCJsaW50ZXJVSURlZmF1bHQiLCJsaW50ZXIiLCJsb2FkT3JSZWxvYWRQYWNrYWdlcyIsIlByb21pc2UiLCJyZXNvbHZlIiwibG9hZCIsInRoZW4iLCJzdGF0dXNCYXIiLCJyZWxvYWQiLCJzYXZlQ29udGV4dCIsImNvbnRleHQiLCJjdXJyZW50X3Byb2plY3QiLCJjb250ZW50Iiwic2VsZWN0ZWRJZCIsIm1hcCIsIm1vZGVsIiwicGF0aHMiLCJhdG9tIiwicHJvamVjdCIsImdldFBhdGhzIiwia2V5IiwiZ2V0U3RhdGVLZXkiLCJzdGF0ZSIsInNlcmlhbGl6ZSIsImRvY2tlciIsIndvcmtzcGFjZSIsImdldENlbnRlciIsImV4dHJhU3RhdGVzIiwic3RhdGVTdG9yZSIsImxvYWRDb250ZXh0IiwicmVqZWN0IiwibmV4dF9wcm9qZWN0Iiwic2V0UGF0aHMiLCJwYW5lIiwicGFuZUNvbnRhaW5lciIsImFjdGl2ZVBhbmUiLCJkZXN0cm95IiwiaWQiLCJzZWxlY3RlZCIsImRlc2VyaWFsaXplIiwicGFuZUNvbnRhaW5lcnMiLCJjZW50ZXIiLCJkZXNlcmlhbGl6ZXJzIiwidXBkYXRlIiwidmFsaWRhdGVDb250ZXh0IiwiQVRPTSIsIklOVkFMSURfQVRPTV9BUEkiLCJDT05URVhUIiwiU0FNRV9QUk9KRUNUX0lEIiwidHlwZSIsIk5PVF9BX1BST0pFQ1QiLCJpZHMiLCJpbmNsdWRlcyIsIk5PX1ZBTElEX1BST0pFQ1RfSUQiLCJzd2l0Y2hDb250ZXh0IiwiY2F0Y2giLCJyZWFzb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFD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QztBQUNuQyxlQUFPbkIsT0FBTyxlQUFTaUIsT0FBVCxDQUFpQkcsYUFBeEIsQ0FBUDtBQUNELE9BRkksTUFJQSxJQUFJLENBQUMsS0FBS3pELFFBQUwsQ0FBY21CLE9BQWQsQ0FBc0J1QyxHQUF0QixDQUEwQkMsUUFBMUIsQ0FBbUNsQyxRQUFRbUIsRUFBM0MsQ0FBTCxFQUFxRDtBQUN4RCxlQUFPUCxPQUFPLGVBQVNpQixPQUFULENBQWlCTSxtQkFBeEIsQ0FBUDtBQUNEOztBQUVEakQsY0FBUTtBQUNOTyx5QkFBaUIsSUFEWDtBQUVOb0Isc0JBQWNiLE9BRlI7QUFHTkUsYUFBSyxJQUhDO0FBSU5FLGVBQU87QUFKRCxPQUFSO0FBTUQsS0F2Qk0sQ0FBUDtBQXdCRDs7QUFFRDs7Ozs7O0FBTUFnQyxnQkFBZXBDLE9BQWYsRUFBd0I7QUFDdEIsV0FBTyxLQUFLMEIsZUFBTCxDQUFxQjFCLE9BQXJCLEVBQ0paLElBREksQ0FDQ0ksV0FBVyxLQUFLRCxXQUFMLENBQWlCQyxPQUFqQixDQURaLEVBRUpKLElBRkksQ0FFQ0ksV0FBVyxLQUFLbUIsV0FBTCxDQUFpQm5CLE9BQWpCLENBRlosRUFHSjZDLEtBSEksQ0FHRUMsVUFBVSxzQkFBTyxpQkFBUCxFQUEwQkEsTUFBMUIsQ0FIWixDQUFQO0FBSUQ7QUFqTG1CLEM7a0JBb0xQbEUsZSIsImZpbGUiOiJjb250ZXh0LXN3aXRjaGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRldmxvZyBmcm9tICcuL2RldmxvZyc7XG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnLi9kYXRhYmFzZSc7XG5pbXBvcnQgUGFja2FnZXMgZnJvbSAnLi9wYWNrYWdlcyc7XG5pbXBvcnQgeyBQTFVHSU5fTkFNRSwgTUVTU0FHRVMgfSBmcm9tICcuLy4uL2NvbnN0YW50cy9iYXNlJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIERhdGFiYXNlXG4gKi9cbmNsYXNzIENvbnRleHRTd2l0Y2hlciB7XG5cbiAgc3RhdGljIGluc3RhbmNlO1xuXG4gIC8qKlxuICAgKiBkZXNjcmlwdGlvblxuICAgKlxuICAgKiBAdG9kbyBpbXByb3ZlIEpTRG9jXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgaWYgKENvbnRleHRTd2l0Y2hlci5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIENvbnRleHRTd2l0Y2hlci5pbnN0YW5jZTtcbiAgICB9XG4gICAgQ29udGV4dFN3aXRjaGVyLmluc3RhbmNlID0gdGhpcztcblxuICAgIHRoaXMuZGF0YWJhc2UgPSBuZXcgRGF0YWJhc2UoKTtcbiAgICB0aGlzLnBhY2thZ2VzID0gbmV3IFBhY2thZ2VzKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlcyAtIGRlc2NyaXB0aW9uXG4gICAqL1xuICBzYXZlUGFja2FnZXMgKHN0YXRlcykge1xuICAgIHN0YXRlcy50cmVlVmlldyA9IHRoaXMucGFja2FnZXMudHJlZVZpZXcuc2F2ZSgpO1xuICAgIHN0YXRlcy5maW5kQW5kUmVwbGFjZSA9IHRoaXMucGFja2FnZXMuZmluZEFuZFJlcGxhY2Uuc2F2ZSgpO1xuICAgIHRoaXMucGFja2FnZXMubGludGVyVUlEZWZhdWx0LnNhdmUoKTtcbiAgICB0aGlzLnBhY2thZ2VzLmxpbnRlci5zYXZlKCk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlcyAtIGRlc2NyaXB0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBkZXNjcmlwdGlvblxuICAgKi9cbiAgbG9hZE9yUmVsb2FkUGFja2FnZXMgKHN0YXRlcykge1xuICAgIGlmICghc3RhdGVzKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhY2thZ2VzLnRyZWVWaWV3LmxvYWQoc3RhdGVzLnRyZWVWaWV3KVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5wYWNrYWdlcy5maW5kQW5kUmVwbGFjZS5sb2FkKHN0YXRlcy5maW5kQW5kUmVwbGFjZSkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLnBhY2thZ2VzLnN0YXR1c0Jhci5yZWxvYWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucGFja2FnZXMubGludGVyLmxvYWQoKSlcbiAgICAgIC50aGVuKCgpID0+IHRoaXMucGFja2FnZXMubGludGVyVUlEZWZhdWx0LmxvYWQoKSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHNhdmVDb250ZXh0IChjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgY29udGV4dC5jdXJyZW50X3Byb2plY3QgPSB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA/XG4gICAgICAgIHRoaXMuZGF0YWJhc2UuY29udGVudC5tYXBbdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWRdIDpcbiAgICAgICAgeyBtb2RlbDogeyBwYXRoczogYXRvbS5wcm9qZWN0LmdldFBhdGhzKCkgfSB9O1xuXG4gICAgICBkZXZsb2coJ3N0YXJ0IHNhdmUgY29udGV4dCcsIGNvbnRleHQuY3VycmVudF9wcm9qZWN0KTtcblxuICAgICAgY29udGV4dC5rZXkgPSBhdG9tLmdldFN0YXRlS2V5KGNvbnRleHQuY3VycmVudF9wcm9qZWN0Lm1vZGVsLnBhdGhzKTtcblxuICAgICAgY29udGV4dC5zdGF0ZSA9IGF0b20uc2VyaWFsaXplKCk7XG5cbiAgICAgIGNvbnRleHQuZG9ja2VyID0gYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCk7XG5cbiAgICAgIGNvbnRleHQuc3RhdGUuZXh0cmFTdGF0ZXMgPSB7fTtcblxuICAgICAgaWYgKGNvbnRleHQua2V5ICYmIGNvbnRleHQuc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zYXZlUGFja2FnZXMoY29udGV4dC5zdGF0ZS5leHRyYVN0YXRlcyk7XG4gICAgICAgIGF3YWl0IGF0b20uc3RhdGVTdG9yZS5zYXZlKGNvbnRleHQua2V5LCBjb250ZXh0LnN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgZGV2bG9nKCdlbmQgc2F2ZSBjb250ZXh0JywgY29udGV4dCk7XG5cbiAgICAgIHJlc29sdmUoY29udGV4dCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIGxvYWRDb250ZXh0IChjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGRldmxvZygnc3RhcnQgbG9hZCBjb250ZXh0JywgY29udGV4dC5uZXh0X3Byb2plY3QpO1xuXG4gICAgICBjb250ZXh0LmtleSA9IGF0b20uZ2V0U3RhdGVLZXkoY29udGV4dC5uZXh0X3Byb2plY3QubW9kZWwucGF0aHMpO1xuICAgICAgY29udGV4dC5zdGF0ZSA9IGF3YWl0IGF0b20uc3RhdGVTdG9yZS5sb2FkKGNvbnRleHQua2V5KTtcblxuICAgICAgaWYgKFxuICAgICAgICAhY29udGV4dC5zdGF0ZSB8fFxuICAgICAgICBhdG9tLmdldFN0YXRlS2V5KGNvbnRleHQuc3RhdGUucHJvamVjdC5wYXRocykgIT09IGNvbnRleHQua2V5XG4gICAgICApIHtcbiAgICAgICAgYXRvbS5wcm9qZWN0LnNldFBhdGhzKGNvbnRleHQubmV4dF9wcm9qZWN0Lm1vZGVsLnBhdGhzKTtcblxuICAgICAgICBjb25zdCBwYW5lID0gYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkucGFuZUNvbnRhaW5lci5hY3RpdmVQYW5lO1xuXG4gICAgICAgIGlmIChwYW5lKSB7XG4gICAgICAgICAgcGFuZS5kZXN0cm95KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGFiYXNlLmNvbnRlbnQuc2VsZWN0ZWRJZCA9IGNvbnRleHQubmV4dF9wcm9qZWN0LmlkO1xuXG4gICAgICAgIGNvbnRleHQuY3VycmVudF9wcm9qZWN0LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQubmV4dF9wcm9qZWN0LnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZShjb250ZXh0KTtcbiAgICAgIH1cblxuICAgICAgYXRvbS5wcm9qZWN0LmRlc2VyaWFsaXplKGNvbnRleHQuc3RhdGUucHJvamVjdClcbiAgICAgICAgLnRoZW4oKCkgPT4gYXRvbS53b3Jrc3BhY2UuZ2V0Q2VudGVyKCkuZGVzZXJpYWxpemUoXG4gICAgICAgICAgY29udGV4dC5zdGF0ZS53b3Jrc3BhY2UucGFuZUNvbnRhaW5lcnMuY2VudGVyLCBhdG9tLmRlc2VyaWFsaXplcnNcbiAgICAgICAgKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2FkT3JSZWxvYWRQYWNrYWdlcyhjb250ZXh0LnN0YXRlLmV4dHJhU3RhdGVzKSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZGF0YWJhc2UuY29udGVudC5zZWxlY3RlZElkID0gY29udGV4dC5uZXh0X3Byb2plY3QuaWQ7XG5cbiAgICAgICAgICBjb250ZXh0LmN1cnJlbnRfcHJvamVjdC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRleHQubmV4dF9wcm9qZWN0LnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIFRPRE86IHRoaXMgaXMgYmFkIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgIHRoaXMuZGF0YWJhc2UudXBkYXRlKCk7XG5cbiAgICAgICAgICBkZXZsb2coJ2VuZCBsb2FkIGNvbnRleHQnKTtcblxuICAgICAgICAgIHJlc29sdmUoY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9qZWN0IC0gZGVzY3JpcHRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9IGRlc2NyaXB0aW9uXG4gICAqL1xuICB2YWxpZGF0ZUNvbnRleHQgKHByb2plY3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFhdG9tLnN0YXRlU3RvcmUgJiYgIWF0b20uc3RhdGVTdG9yZS5zYXZlICYmICFhdG9tLnN0YXRlU3RvcmUubG9hZCkge1xuICAgICAgICByZWplY3QoTUVTU0FHRVMuQVRPTS5JTlZBTElEX0FUT01fQVBJKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAocHJvamVjdC5pZCA9PT0gdGhpcy5kYXRhYmFzZS5jb250ZW50LnNlbGVjdGVkSWQpIHtcbiAgICAgICAgcmVqZWN0KE1FU1NBR0VTLkNPTlRFWFQuU0FNRV9QUk9KRUNUX0lEKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAocHJvamVjdC50eXBlICE9PSAncHJvamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChNRVNTQUdFUy5DT05URVhULk5PVF9BX1BST0pFQ1QpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICghdGhpcy5kYXRhYmFzZS5jb250ZW50Lmlkcy5pbmNsdWRlcyhwcm9qZWN0LmlkKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KE1FU1NBR0VTLkNPTlRFWFQuTk9fVkFMSURfUFJPSkVDVF9JRCk7XG4gICAgICB9XG5cbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBjdXJyZW50X3Byb2plY3Q6IG51bGwsXG4gICAgICAgIG5leHRfcHJvamVjdDogcHJvamVjdCxcbiAgICAgICAga2V5OiBudWxsLFxuICAgICAgICBzdGF0ZTogbnVsbFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZGVzY3JpcHRpb25cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb2plY3QgLSBkZXNjcmlwdGlvblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gZGVzY3JpcHRpb25cbiAgICovXG4gIHN3aXRjaENvbnRleHQgKHByb2plY3QpIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUNvbnRleHQocHJvamVjdClcbiAgICAgIC50aGVuKGNvbnRleHQgPT4gdGhpcy5zYXZlQ29udGV4dChjb250ZXh0KSlcbiAgICAgIC50aGVuKGNvbnRleHQgPT4gdGhpcy5sb2FkQ29udGV4dChjb250ZXh0KSlcbiAgICAgIC5jYXRjaChyZWFzb24gPT4gZGV2bG9nKCdzd2l0Y2hpbmcgZXJyb3InLCByZWFzb24pKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0U3dpdGNoZXI7XG4iXX0=