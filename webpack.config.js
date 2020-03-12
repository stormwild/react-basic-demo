const path = require('path');
let mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    entry: './src/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};