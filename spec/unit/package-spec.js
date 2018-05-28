'use strict';

const sinon = require('sinon');
const sinonChai = require('sinon-chai');
require('chai').use(sinonChai);
const { testquire } = require('atom-coverage');
const path = require('path');

const { PLUGIN_NAME } = testquire('constants/base');
const ProjectViewerPlus = testquire('project-viewer-plus');

describe('ProjectViewerPlus', async function () {
  beforeEach(async function () {
    this.sandbox = sinon.createSandbox();
  });

  beforeEach(async function () {
    this.projectViewerPlus = await new ProjectViewerPlus();

    const config = await this.projectViewerPlus.config;

    config.database.localPath = path.join(__dirname, 'fixtures');
    atom.config.set(PLUGIN_NAME, config);

    await this.projectViewerPlus.activate();
  });

  afterEach(function () {
    this.sandbox.restore();
    delete this.projectViewerPlus;
  });

  it('should call database onDidChange once');

  it('should add instance to right dock', async function () {
    const rightDocks = atom.workspace.getRightDock().getPaneItems();
    const projectViewerPlus = await this.projectViewerPlus.getContainer();

    // expect(projectViewerPlus).to.equal(rightDocks[0]);
  });
});
