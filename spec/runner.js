const createRunner = require('atom-mocha-test-runner').createRunner;

// optional options to customize the runner
const extraOptions = {
  reporter: 'spec'
};

const optionalConfigurationFunction = function (mocha) {
  // If provided, atom-mocha-test-runner will pass the mocha instance
  // to this function, so you can do whatever you'd like to it.
  return mocha;
};

module.exports = createRunner(extraOptions, optionalConfigurationFunction);
