const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib/[name].js',
    clean: true,
  },
  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
  },
  target: 'node',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/template', to: 'template' },
      ],
    }),
  ],
};
