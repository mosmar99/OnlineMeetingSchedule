const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const path = require("path");

module.exports = (_, argv) => {
    let public_url = argv.mode === "development" ? "file:/"+path.resolve(__dirname, "public") : "<future-url>"

    const config = {
        stats: 'errors-only',
        entry: {
            main: path.resolve(__dirname, "./client/index.js")
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "deploy"),
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: "public/index.html"
            }),
            new InterpolateHtmlPlugin({
                PUBLIC_URL: public_url
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "public",
                        globOptions: {
                            ignore: [ "**/*.html" ]
                        }
                    }
                ]
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: { loader: "babel-loader" }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: "asset/resource"
                }
            ],
        }
    }

    return config;
}