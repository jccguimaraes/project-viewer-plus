'use strict';

const path = require('path');
const { PLUGIN_NAME } = require('../bundle/constants/base');

describe('package', function () {

  // INIT - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE
  //      - KEEP IN MIND THE RELATIVE PATH OF __DIRNAME
  beforeEach(function () {
    this.CURRENT_PATH = atom.config.get(`${PLUGIN_NAME}.database.localPath`);
    atom.config.set(
      `${PLUGIN_NAME}.database.localPath`,
      path.join(__dirname, 'fixtures')
    );
  });

  afterEach(function () {
    atom.config.set(`${PLUGIN_NAME}.database.localPath`, this.CURRENT_PATH);
  });
  // END - THIS IS REALLY IMPORTANT AND SHOULD BE ON EVERY TEST FILE

  describe('when initialized with default config', function () {
    beforeEach(function () {
      waitsForPromise(() => atom.packages.activatePackage(PLUGIN_NAME));
    });

    afterEach(function () {
      waitsForPromise(() => atom.packages.deactivatePackage(PLUGIN_NAME));
    });

    it('should have activated', function () {
      expect(atom.packages.isPackageActive(PLUGIN_NAME)).toBe(true);
    });

    it('should be opened in the right dock as default', function () {
      const panels = atom.workspace.getRightDock().getPaneItems();
      const pkg = atom.packages.getActivePackage(PLUGIN_NAME);

      expect(panels.length).toBe(1);
      expect(panels[0]).toEqual(pkg.mainModule.projectViewer);
    });
  });

  describe('when initialized with dock.position set to left', function () {
    beforeEach(function () {
      atom.config.set(`${PLUGIN_NAME}.dock.position`, 'left');
      waitsForPromise(() => atom.packages.activatePackage(PLUGIN_NAME));
    });

    it('should be opened in the left dock if set in config', function () {
      const panels = atom.workspace.getLeftDock().getPaneItems();
      const pkg = atom.packages.getActivePackage(PLUGIN_NAME);

      expect(panels.length).toBe(1);
      expect(panels[0]).toEqual(pkg.mainModule.projectViewer);
    });
  });
});
