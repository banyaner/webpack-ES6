/**
 * Created by zhongjx on 2018/6/6.
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJS = require('uglify-js') // 处理内联函数的压缩
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    target: 'web',
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    formatter: require("eslint-friendly-formatter"),
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'img/',   // 图片打包后存放的目录
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:7].[ext]',
                            outputPath: 'font/',
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'), // root目录
            verbose: true,
            dry: false,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                minifyJS: function (code) {
                    return (UglifyJS.minify(code)).code
                },
                collapseWhitespace: true,
            },
            inlineSource: 'manifest',
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static',
        }]),
    ],
}
