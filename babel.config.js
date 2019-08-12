module.exports = {
  sourceMaps: 'inline',
  plugins: [
    ['add-module-exports'],
    ['@babel/plugin-transform-modules-commonjs']
  ],
  presets: [
    '@babel/preset-react'
  ]
};
