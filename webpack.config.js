const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
};