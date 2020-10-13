var webpack = require('webpack');

module.exports = {
    entry: "./src/common/index.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            url: false
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                unused: true
            }
        }),
    ]
}