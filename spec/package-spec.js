'use strict';

const path = require('path');
const sinon = require('sinon');

const ProjectViewerPlus = require('./../bundle/main');
const { PLUGIN_NAME } = require('./../bundle/constants/base');
let sandbox;

describe('package', function () {

  // START - SHOULD BE IN EVERY TEST SUIT
  before(function () {
    sandbox = sinon.createSandbox();
    return atom.packages.activatePackage('file-icons').then(() => true);
  });

  before(function () {
    sandbox = sinon.createSandbox();
  });

  beforeEach(function () {
    const config = ProjectViewerPlus.config;
    config.database.localPath = path.join(__dirname, 'fixtures');
    return atom.config.set(PLUGIN_NAME, config);
  });

  afterEach(function () {
    sandbox.restore();
  });
  // STOP - SHOULD BE IN EVERY TEST SUIT

  it('when activated', function () {
    ProjectViewerPlus.activate();
    console.log(atom.config.get(PLUGIN_NAME));
  });

});
