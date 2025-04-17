const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        open: true,
    }
};