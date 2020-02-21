const path = require('path');
const glob = require('glob')
const PATHS = {
    src: path.join(__dirname, 'src')
}

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = {
    entry: './src/public/assets/js/app.js',
    mode: "production",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/public/assets/dist/'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.(html|ico|png|svg|jpg|gif)$/,
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
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            cacheGroups: {
              styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
              },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({}),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
          }),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'src/public/assets/dist/'),
            src: '../../index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            width: 375,
            height: 565,
            ignore: ['@font-face',/url\(/],
            penthouse: {
              blockJSRequests: false,
            }
        }),
    ],
    stats: 'errors-only'
};
