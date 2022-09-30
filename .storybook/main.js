const path = require('path');
const paths = require('../config/paths');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sassRegex = /\.(scss|sass)$/;
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/**/*.stories.@(md)x'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    // '@whitespace/storybook-addon-html'
  ],
  previewHead: head => head,
  webpackFinal: async (config, { configType }) => {

    config.entry.push(`${paths.appSrc}/asset/scss/global.scss`);

    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, `${paths.appSrc}`)
    ];

    const fileLoaderRule = config.module.rules.find(
      (rule) => !Array.isArray(rule.test) && (rule.test.test('.svg') || rule.test.test('.woff'))
    );
    fileLoaderRule.exclude = /\.svg|woff$/;

    config.module.rules.push({
      test: /\.woff$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/media/[name].[ext]',
        esModule: false
      }
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|jsx|tsx|mdx)$/,
      include: /svg/,
      exclude: /node_modules/,
      use: ['@svgr/webpack']
    });

    config.module.rules.unshift({
      test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      issuer: /\.(scss)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        esModule: false
      }
    });

    if(configType === 'DEVELOPMENT') {

      config.module.rules.push({
        test: sassRegex,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: `${paths.appSrc}/asset/scss/helper/**/*.scss`
            }
          }
        ]
      });
      
    }

    else {
      config.module.rules.push({
        test: sassRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',      
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: `${paths.appSrc}/asset/scss/helper/**/*.scss`,
              sourceMap: false,
              minimize: false,
              outputStyle: 'expanded'
            }
          }
        ]
      });
    }
    return { 
      ...config,
      devtool: false,
      plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.SourceMapDevToolPlugin({
          exclude: ['main.css'],
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: 'src/asset/js', to: 'asset/js' }
          ]
        }),
        ...config.plugins
      ]
    }
  },
};
