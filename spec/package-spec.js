'use strict';

const { PLUGIN_NAME } = require('../bundle/constants/base');

describe("package", function () {

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
