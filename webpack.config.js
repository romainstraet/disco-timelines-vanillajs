"use strict";
const path = require("path");

module.exports = (env) => {
  return {
    devServer: {
      contentBase: "./public/",
    },
    devtool: "inline-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ["file-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
