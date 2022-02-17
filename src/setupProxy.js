const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    // app.use( proxy( 标识，配置 ) )
    // https://m.lagou.com/listmore.json
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://3.141.23.218:5000',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        })    
    )
  }