const CracoLessPlugin = require("craco-less");

const CracoAntDesignPlugin = require("craco-antd");

const TerserPlugin = require("terser-webpack-plugin");

const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");

const path = require("path");

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

process.env.GENERATE_SOURCEMAP = "false";

module.exports = {
  webpack: {
    alias: {
      "@src": pathResolve("src"),
    },
    plugins: [new SimpleProgressWebpackPlugin()],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#44B979",
              "@table-header-bg": "#F5F5F5",  //配置表格背景颜色
              "@table-header-color": "@primary-color", // 配置表格头部颜色
              "@card-radius": "8px",  // 卡片圆角
              "@table-border-color": "#D0EDDD",   //table 边框线条的颜色
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    { plugin: CracoAntDesignPlugin },
    {
      plugin: new TerserPlugin({
        //禁止多线程并发
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: process.env.NODE_ENV === "production", // 生产环境下移除控制台所有的内容
            drop_debugger: false, // 移除断点
            pure_funcs:
              process.env.NODE_ENV === "production" ? ["console.log"] : "", // 生产环境下移除console
          },
        },
      }),
    },
  ],
};

