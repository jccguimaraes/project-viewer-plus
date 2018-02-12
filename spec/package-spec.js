'use strict';

const path = require('path');
const sinon = require('sinon');

const { PLUGIN_NAME } = require('./../bundle/constants/base');

describe('package', function () {

  // START - SHOULD BE IN EVERY TEST SUIT
  before(function () {
    this.sandbox = sinon.createSandbox();
  });

  beforeEach(function () {
    this.sandbox.stub(atom, 'getConfigDirPath')
      .returns(path.join(__dirname, 'fixtures'));
  });

  afterEach(function () {
    this.sandbox.restore();
  });
  // STOP - SHOULD BE IN EVERY TEST SUIT

  describe('when initialized with default config', function () {
    beforeEach(function () {
      return atom.packages.activatePackage(PLUGIN_NAME).then(() => {
        return true;
      });
    });

    afterEach(function () {
      return atom.packages.deactivatePackage(PLUGIN_NAME).then(() => {
        return true;
      });
    });

    it('should have activated', function () {
      expect(atom.packages.isPackageActive(PLUGIN_NAME)).to.be.true;
    });

    it('should be opened in the right dock as default', function () {
      const panels = atom.workspace.getRightDock().getPaneItems();
      const pkg = atom.packages.getActivePackage(PLUGIN_NAME);

      expect(panels.length).to.equal(1);
      expect(panels[0]).to.equal(pkg.mainModule.projectViewer);
    });
  });

});
