module.exports = {
  sourceMaps: 'inline',
  plugins: [
    // "@babel/plugin-proposal-class-properties",
    '@babel/plugin-proposal-object-rest-spread'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          electron: process.versions.electron || process.env.ELECTRON_VERSION
        }
      }
    ],
    '@babel/preset-react'
  ],
  env: {
    coverage: {
      plugins: ['babel-plugin-istanbul']
    }
  }
};
