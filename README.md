# h5活动模板

原生的h5活动基本配置。如需支持vue或react需要额外配置解析

# 关于合图

合图的文件需要放在sprites目录下，每个css中的所有sprites图片会合并为一张

# 适配方案

使用rem做适配


# TODO:
~~1. vendor单独打包~~
~~2. 抽离css~~
~~3. 使用rem适配~~
~~4. 合图~~
~~5. 内联manifest~~
~~6. 压缩html中内联js（只压缩不编译）~~
7. mock文件处理
8. 静态资源目录
9. html中image的处理（待定）
10. 添加eslint

# 关于vendor打包

目前的配置中，如果部分模块使用懒加载，则懒加载模块import的node-modules包会单独的进行打包。
```js
// webpack.prod.js
    optimization: {
        splitChunks: {
            cacheGroups: {
                asyncvendors: { // 异步加载模块来自于npm安装的包
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    reuseExistingChunk: true,
                    priority: -20,
                },
                vendors: { // 来自于npm安装的包且非异步加载的模块
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    reuseExistingChunk: false,
                    priority: -10,
                },
            }
        }
    },

```
如果希望将所有的vendor打包为一个，需将上述配置改为
```js
// webpack.prod.js
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingChunk: false,
                    priority: -10,
                },
            }
        }
    },
```


# 补充：

## 包含统计数据的文件

通过 webpack 编译源文件时，用户可以生成包含有关于模块的统计数据的 JSON 文件。这些统计数据不仅可以帮助开发者来分析应用的依赖图表，还可以优化编译的速度。

```js
webpack --profile --json > compilation-stats.json
```


## 关于polyfill
使用babel-runtime默认配置，如果需要特殊的方法需要单独添加polyfill(目前看runtime不会polyfill实例的一些方法)

## 内联rem适配和manifest
因manifest文件很小，所以可以内联处理
rem适配影响页面布局尺寸需要在最开始加载







