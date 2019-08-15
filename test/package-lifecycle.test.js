import { expect } from 'chai';
import path from 'path';
// import etch from 'etch';
import sinon from 'sinon';

import * as pkgDeps from 'atom-package-deps';

import PVP from '../lib/project-viewer-plus';
import {
  pvpPackage,
  databasePath,
  databaseName,
  packageName,
  uri
} from './utils';

describe('package lifecycle', () => {
  before(function () {
    atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
    atom.config.set(databaseName, 'state.json');

    this.stub = sinon.stub(pkgDeps, 'install').resolves();
    this.pvp = new PVP();
  });

  beforeEach(async function () {
    await atom.packages.reset();
    await this.pvp.activate();
  });

  afterEach(async function () {
    this.stub.reset();
    await this.pvp.deactivate();
  });

  after(function () {
    this.stub.restore();
  });

  it('should not open the view on new Atom instance', async function () {
    const dock = atom.workspace.getRightDock();

    process.nextTick(() => {
      expect(dock.getPaneItems()).to.be.empty;
    });
  });

  it('should open the view', async () => {
    const dock = atom.workspace.getRightDock();
    const paneItem = dock.getPaneItems()[0];

    await atom.workspace.open(uri);

    process.nextTick(() => {
      expect(dock.getPaneItems()).to.have.lengthOf(1);
      expect(paneItem).to.eql(pkg.mainModule.mainContainer);
    });
  });

  it('should dettach from the right dock', async () => {
    await atom.packages.deactivatePackage(packageName);

    process.nextTick(() => {
      expect(dock.getPaneItems()).to.be.empty;
    });
  });
});
