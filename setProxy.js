const { createProxyMiddleware } = require("http-proxy-middleware");
// 代理请求
const url = 'http://127.0.0.1:7002'
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: url,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
