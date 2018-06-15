/**
 * Created by zhongjx on 2018/6/10.
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: 'js/[name].[hash].js',
        publicPath: '/',
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        hot: true,
        host: '0.0.0.0', // 设置通过本机ip访问热加载页面
        // quiet: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/styles.[hash].css',
            chunkFilename: "css/[id].css"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    stats: 'minimal',
})
