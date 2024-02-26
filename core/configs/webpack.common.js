const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin')

const dirApp = path.join(process.cwd(), "app");
const dirStyles = path.join(process.cwd(), "styles");
const dirShared = path.join(process.cwd(), "shared");
const dirPublic = path.join(process.cwd(), "public");

module.exports = {
  entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],

  output: {
    path: dirPublic,
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@": dirApp,
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpe?g|svg|woff2?|fnt|webp|mp4|ogg|mp3|wav|bin|glb|gltf|md)$/,
        type: "asset/resource",
        generator: {
          filename: "[hash].[ext]",
        },
      },
      {
        test: /\.(glsl|vert|frag)$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: dirShared,
          to: dirPublic,
          noErrorOnMissing: true,
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  infrastructureLogging: { level: "error" },
  stats: "minimal",
};
