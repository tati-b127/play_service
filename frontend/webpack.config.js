// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    // hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.SourceMapDevToolPlugin({}),
    new CopyPlugin({
      patterns: [
        // { from: "./src/fonts", to: "./fonts" },
        { from: "./src/img", to: "./img" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        // test: /\.(ts|tsx)$/i,
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //     type: 'asset/resource',
      //     // use: ['file-loader']
      //     // options: {
      //     //     name: 'src/img/[name].[ext]',
      //     //     // context: 'src/img',
      //     //     // outputPath: 'img',
      //     // },
      // },
      // {
      //     test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      //     type: 'asset/resource',
      //     // options: {
      //     //     name: '[name].[ext]',
      //     //     // context: 'src/fonts',
      //     //     // outputPath: 'fonts',
      //     // },
      // },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      images: path.resolve(__dirname, "src/img/"),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
