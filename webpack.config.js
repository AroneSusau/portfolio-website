const path = require('path');

module.exports = {
    entry: './src/public/assets/js/app.js',
    mode: "production",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/public/assets/dist/'),
        publicPath: './assets/dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|webp|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    stats: 'errors-only'
};
