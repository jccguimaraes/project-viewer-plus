import { createRunner } from '@atom/mocha-test-runner';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';

import until from 'test-until';
import NYC from 'nyc';

chai.use(chaiAsPromised);
global.assert = chai.assert;

global.attachToDOM = function (element) {
  const { body } = document;
  body.appendChild(element);
};

until.setDefaultTimeout(parseInt(process.env.UNTIL_TIMEOUT || '3000', 10));

if (
  process.env.ATOM_GITHUB_BABEL_ENV === 'coverage' &&
  !process.env.NYC_CONFIG
) {
  const configUtil = require('nyc/lib/config-util');

  const yargs = configUtil.buildYargs();
  const config = configUtil.loadConfig({}, path.join(__dirname, '..'));
  configUtil.addCommandsAndHelp(yargs);
  const argv = yargs.config(config).parse([]);

  argv.instrumenter = require.resolve('nyc/lib/instrumenters/noop');
  argv.reporter = 'lcovonly';
  argv.cwd = path.join(__dirname, '..');
  argv.tempDirectory = path.join(__dirname, '..', '.nyc_output');

  global._nyc = new NYC(argv);

  if (argv.clean) {
    global._nyc.reset();
  }
  else {
    global._nyc.createTempDirectory();
  }
  if (argv.all) {
    global._nyc.addAllFiles();
  }

  process.env.NYC_CONFIG = JSON.stringify(argv);
  process.env.NYC_CWD = path.join(__dirname, '..');
  process.env.NYC_ROOT_ID = global._nyc.rootId;
  process.env.NYC_INSTRUMENTER = argv.instrumenter;
  process.env.NYC_PARENT_PID = process.pid;

  process.isChildProcess = true;
  global._nyc.config._processInfo = {
    ppid: '0',
    root: global._nyc.rootId
  };

  global._nyc.wrap();

  global._nycInProcess = true;
}
else if (process.env.NYC_CONFIG) {
  const parentPid = process.env.NYC_PARENT_PID || '0';
  process.env.NYC_PARENT_PID = process.pid;

  const config = JSON.parse(process.env.NYC_CONFIG);
  config.isChildProcess = true;
  config._processInfo = {
    ppid: parentPid,
    root: process.env.NYC_ROOT_ID
  };
  global._nyc = new NYC(config);
  global._nyc.wrap();
}

const testSuffixes =
  process.env.ATOM_GITHUB_TEST_SUITE === 'snapshot'
    ? ['snapshot.js']
    : ['test.js'];

const runner = createRunner(
  {
    htmlTitle: `Project Viewer Plus Package Tests - pid ${process.pid}`,
    reporter: process.env.MOCHA_REPORTER || 'list',
    overrideTestPaths: [/spec$/, /test/],
    testSuffixes
  },
  (mocha, { terminate }) => {
    // const runner = mocha.run();
    // runner.on('end', () => {
    //   global._nyc.writeCoverageFile();
    //   global._nyc.report();
    // });
    mocha.timeout(parseInt(process.env.MOCHA_TIMEOUT || '5000', 10));
  }
);

module.exports = runner;
