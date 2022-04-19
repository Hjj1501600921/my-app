import { ConfigProvider } from "antd";
//由于antd是英文的，所以给他转一下中文
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //挂载redux的一个方法
import "./index.less";
import store from "./redux/configStore";
import * as serviceWorker from "./serviceWorker";
//引入写好的路由
import Routes from "./routes/Routes";
moment.locale("zh-cn");

//antd 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 import { Button } from 'antd' 就会有按需加载的效果。

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    {/* store (Redux Store): 应用程序中唯一的 Redux store 对象   挂载redux在出口这个位置 */}
    <Provider store={store}>
      <Routes/>
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//这个地方有一些不明白，后期可以作为一个重点内容学习一下

//serviceWorker 一个服务器与浏览器之间的中间人角色
serviceWorker.unregister();
