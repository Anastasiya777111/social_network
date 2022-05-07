const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;
console.log("IS DEV:", isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ];
  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }
  return base;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = ["babel-loader"];
  return {
    loader: "babel-loader",
    options: babelOptions(),
  };
  if (isDev) {
    loaders.push("eslint-loader");
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname),
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./src/client/index.jsx"],
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? "source-map" : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript"),
        },
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
    ],
  },
};
