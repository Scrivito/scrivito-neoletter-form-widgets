/* eslint-disable import/no-nodejs-modules */
/* eslint-disable import/no-commonjs */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const packageJson = require("./package.json");

const SRC_PATH = path.join(__dirname, "src");
const BUILD_PATH = path.resolve(__dirname, "build");

const PEER_DEPENDENCIES = packageJson.peerDependencies;
const DEPENDENCIES = packageJson.dependencies || {};

module.exports = (_env, argv) => {
  const plugins = [
    new CopyWebpackPlugin({
      patterns: [
        { from: "../LICENSE", to: BUILD_PATH },
        { from: "../package.json", to: BUILD_PATH },
        { from: "../readme.md", to: BUILD_PATH },
        { from: "../src/index.d.ts", to: BUILD_PATH },
        {
          from: "../src/assets/stylesheets/scrivitoExtensions.scss",
          to: BUILD_PATH
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "index.css"
    })
  ];

  if (argv.mode === "production") {
    plugins.unshift(new CleanWebpackPlugin());
  }

  return {
    context: SRC_PATH,
    entry: { index: "./index.ts" },
    output: {
      path: BUILD_PATH,
      library: "scrivito-form-widgets",
      libraryTarget: "umd",
      chunkLoading: false
    },
    externals: [
      ...Object.keys(DEPENDENCIES),
      ...Object.keys(PEER_DEPENDENCIES)
    ],
    plugins,

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [SRC_PATH],
          use: [
            {
              loader: "ts-loader"
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          include: [SRC_PATH],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-react",
                  [
                    "@babel/preset-env",
                    {
                      debug: false,
                      modules: false,
                      shippedProposals: false,
                      useBuiltIns: false
                    }
                  ]
                ],
                cacheDirectory: "tmp/babel-cache"
              }
            }
          ]
        },
        {
          test: /\.(svg|gif)$/,
          use: ["url-loader"]
        },
        {
          test: /\.scss$/,
          use: [
            argv.mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    }
  };
};
