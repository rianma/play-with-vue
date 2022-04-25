// eslint-disable-next-line @typescript-eslint/no-var-requires
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');

const publicPath = process.env.PUBLIC_PATH;

/**
 * @description Vue CLI 配置参考
 * @see https://cli.vuejs.org/zh/config/#vue-config-js
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  publicPath,
  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['javascript', 'html', 'typescript', 'json'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ttf$/,
          use: ['file-loader'],
        },
      ],
    },
  },
};

module.exports = config;
