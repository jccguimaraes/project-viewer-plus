module.exports = {
  sourceMaps: 'inline',
  plugins: [
    ['add-module-exports'],
    ['@babel/plugin-transform-modules-commonjs'],
    ['@babel/plugin-proposal-object-rest-spread']
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
          node: 'current',
          chrome: '66'
        }
      }
    ],
    '@babel/preset-react'
  ]
};
