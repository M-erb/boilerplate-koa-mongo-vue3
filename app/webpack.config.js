const path = require('path')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const ENV = argv.mode || 'development' // production|development
  console.log('webpack ENV: ', ENV)

  const config = {
    name: 'app-config',
    entry: {
      main: './src/main.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../public/app-assets')
    },
    mode: ENV,
    watch: false,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src/')
      },
      modules: ['node_modules'],
      extensions: ['.js', '.json', '.vue']
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.p?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2015'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]'
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(pdf|xlsx|docx|pptx|mp4|xml)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'files/[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: ENV === 'production', // ENV
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true
        })
      ],
      removeEmptyChunks: true
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: ENV
      }),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  }

  return config
}
