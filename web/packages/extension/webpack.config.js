/* eslint-env node */

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
    let mode = "production";
    if (argv && argv.mode) {
        mode = argv.mode;
    }

    console.log(`Building ${mode}...`);

    return {
        mode,
        entry: {
            ruffle: path.resolve(__dirname, "js/index.js"),
            main: path.resolve(__dirname, "js/main.js"),
            settings: path.resolve(__dirname, "js/settings.js"),
            lv0: path.resolve(__dirname, "js/lv0.js"),
        },
        output: {
            path: path.resolve(__dirname, "build/dist"),
            filename: "[name].js",
            publicPath: "",
            chunkFilename: "core.ruffle.js",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.wasm$/i,
                    use: ["file-loader"],
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{ from: "LICENSE*" }, { from: "README.md" }],
            }),
        ],
    };
};
