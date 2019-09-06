const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        globalObject: 'this',
        publicPath: '/'
    },
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: { name: '/static/[name].[ext]' }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        proxy: {
            "/api/*":{
                target:"http://localhost:3000/",
                secure:"false"
            },
            "/orders" :{
                target:"http://localhost:3000/",
                secure:"false"
            }
        },
        port: 8000,
        publicPath: 'http://localhost:8000/',
        hotOnly: true,
        historyApiFallback: true
    }
};
