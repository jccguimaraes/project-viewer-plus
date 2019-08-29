import { expect } from 'chai';
import path from 'path';
import etch from 'etch';
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

describe('package lifecycle', function () {
  before(function () {
    atom.config.set(databasePath, path.resolve(__dirname, './fixtures'));
    atom.config.set(databaseName, 'state.json');

    this.pvp = new PVP();
  });

  beforeEach(async function () {
    // this.stub = sinon.stub(pkgDeps, 'install').resolves();
    await atom.packages.reset();
    await this.pvp.activate();
  });

  afterEach(async function () {
    // this.stub.restore();
    await this.pvp.deactivate();
  });

  it('should not open the view on new Atom instance', async function () {
    const dock = atom.workspace.getRightDock();

    expect(dock.getPaneItems()).to.be.empty;
  });

  it('should open the view', async function () {
    await atom.workspace.open(uri);

    const dock = atom.workspace.getRightDock();
    const paneItem = dock.getPaneItems()[0];

    // hack - force etch to update and render
    // await etch.getScheduler().getNextUpdatePromise();

    expect(dock.getPaneItems()).to.have.lengthOf(1);
    expect(paneItem).to.eql(this.pvp.mainContainer);
  });

  it('should dettach from the right dock', async function () {
    await atom.packages.deactivatePackage(packageName);

    const dock = atom.workspace.getRightDock();

    expect(dock.getPaneItems()).to.be.empty;
  });
});
