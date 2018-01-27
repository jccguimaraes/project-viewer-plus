'use strict';

const path = require('path');
const ContextSwitcher = require('../../bundle/services/context-switcher');
const { PLUGIN_NAME, MESSAGES } = require('../../bundle/constants/base');

describe('context-switcher', function () {

  // INIT - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE
  //      - KEEP IN MIND THE RELATIVE PATH OF __DIRNAME
  beforeEach(function () {
    this.CURRENT_PATH = atom.config.get(`${PLUGIN_NAME}.database.localPath`);
    atom.config.set(
      `${PLUGIN_NAME}.database.localPath`,
      path.join(__dirname, '..', 'fixtures')
    );
  });

  afterEach(function () {
    atom.config.set(`${PLUGIN_NAME}.database.localPath`, this.CURRENT_PATH);
  });
  // END - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE

  beforeEach(function () {
    spyOn(atom.getStorageFolder(), 'storeSync');

    atom.project.getPaths().forEach(
      projPath => atom.project.removePath(projPath)
    );
  });

  beforeEach(function () {
    waitsForPromise(() => atom.packages.activatePackage(PLUGIN_NAME));
    waitsForPromise(() => atom.packages.activatePackage('tree-view'));
    waitsForPromise(() => atom.packages.activatePackage('status-bar'));

    // for some reason the returned Promise just hangs in pending state
    waitsFor(() => atom.packages.activatePackage('find-and-replace'));
  });

  beforeEach(function () {
    this.ctx = new ContextSwitcher();

    waitsFor(() => this.ctx.database.content);
  });

  afterEach(function () {
    waitsForPromise(() => atom.packages.deactivatePackage(PLUGIN_NAME));
    waitsForPromise(() => atom.packages.deactivatePackage('tree-view'));
    waitsForPromise(() => atom.packages.deactivatePackage('status-bar'));
    waitsForPromise(() => atom.packages.deactivatePackage('find-and-replace'));
  });

  it('should return a singleton', function () {
    expect(ContextSwitcher.instance).toBe(this.ctx);
  });

  describe('when saving a state', function () {

    describe('when no paths', function () {

      it('should not save the state', function () {
        expect(this.ctx.database.content.selectedId).toBeNull;

        this.ctx.saveContext();

        expect(atom.getStorageFolder().storeSync).not.toHaveBeenCalled();
        expect(this.ctx.database.content.selectedId).toBeNull;
      });
    });
  });

  describe('when loading a state', function () {

    describe('when there is a selected project', function () {

      beforeEach(function () {
        this.ctx.database.content.selectedId = 1;
      });

      it('should not load if not a project', function () {
        expect(this.ctx.database.content.selectedId).toBe(1);

        const context = {
          next_project: this.ctx.database.content.map[
            this.ctx.database.content.ids[1]
          ]
        };

        this.ctx.loadContext(context)
          .catch(message => {
            expect(message).toBe(MESSAGES.CONTEXT.NOT_A_PROJECT);
            expect(this.ctx.database.content.selectedId).toBe(1);
          });
      });

      it('should not load if no valid id', function () {
        expect(this.ctx.database.content.selectedId).toBe(1);

        const context = {
          next_project: { type: 'project', id: 1 }
        };

        this.ctx.loadContext(context)
          .catch(message => {
            expect(message).toBe(MESSAGES.CONTEXT.NO_VALID_PROJECT_ID);
            expect(this.ctx.database.content.selectedId).toBe(1);
          });
      });
    });
  });

  describe('context switching', function () {

    it('should switch context if save and load successed', function () {

      spyOn(this.ctx, 'saveContext').andReturn(Promise.resolve());
      spyOn(this.ctx, 'loadContext').andReturn(Promise.resolve());

      this.ctx.switchContext()
        .then(() => {
          expect(this.ctx.saveContext).toHaveBeenCalled();
          expect(this.ctx.loadContext).toHaveBeenCalled();
        });
    });

    it('should not switch context if save fails', function () {

      spyOn(this.ctx, 'saveContext').andReturn(Promise.reject());
      spyOn(this.ctx, 'loadContext').andReturn(Promise.resolve());

      this.ctx.switchContext()
        .then(() => {
          expect(this.ctx.saveContext).toHaveBeenCalled();
          expect(this.ctx.loadContext).not.toHaveBeenCalled();
        });
    });
  });
});
