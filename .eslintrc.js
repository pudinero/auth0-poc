module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    // typescript
    {
      files: ['*.ts', '*.tsx'],
      excludedFiles: ['*.svg'],
    },
  ],
};
