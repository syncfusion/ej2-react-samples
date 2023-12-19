module.exports = {
    mode : 'development',
    entry: { 'src/common/index.js': './src/common/index.js' },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'common',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: false
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            }
                        },
                    },
                ],
            },
        ]
    }
}
