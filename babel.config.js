module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '~/Components': './src/Components',
          '~/Configs': './src/Configs',
          '~/Constants': './src/Constants',
          '~/Hooks': './src/Hooks',
          '~/Routes': './src/Routes',
          '~/Styles': './src/Styles',
          '~/Screens': './src/Screens',
          '~/Utils': './src/Utils',
          '~/Contexts': './src/Contexts',
          '~/Assets': './src/Assets',
        },
      },
    ],
  ],
};
