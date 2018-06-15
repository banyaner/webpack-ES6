/**
 * Created by zhongjx on 2018/6/10.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin') // 内联代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.common.js')
const argv = require('yargs').argv
const pkg = require('../package.json')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none', // 生成source map慢
    output: {
        filename: 'js/[name].[contenthash].js',
        publicPath: argv.cdn ? `${pkg.cdn}/${pkg.name}/` : './',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: argv.cdn ? `${pkg.cdn}/${pkg.name}/` : '../', // 正确配置引用图片或字体的位置
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.HashedModuleIdsPlugin(),
        new UglifyJsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackInlineSourcePlugin(),
        new BundleAnalyzerPlugin(), // bundle分析，可注释掉
    ],
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                asyncvendors: { // 异步加载模块来自于npm安装的包
                    test: /node_modules/,
                    chunks: 'async',
                    reuseExistingChunk: true,
                    priority: -20,
                },
                vendors: { // 来自于npm安装的包且非异步加载的模块或自定义lib下的文件
                    test: /(node_modules)|(src\/js\/lib)/,
                    chunks: 'initial',
                    reuseExistingChunk: false,
                    priority: -10,
                },
            }
        }
    },
    performance: {
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        },
        hints: "warning",
    },
    stats: 'normal',
})
