const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.ts',
    target: 'node',
    resolve: {
        extensions: ['.mjs', '.ts', '.js'],
    },
    externals: ['aws-sdk'],
    output: {
        libraryTarget: 'commonjs2',
        filename: '[name]/dist/index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
};
