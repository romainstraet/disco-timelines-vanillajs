"use strict";

module.exports = (env) => {
  return {
    devServer: {
      contentBase: "./dist/",
    },
    devtool: "inline-source-map",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
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
