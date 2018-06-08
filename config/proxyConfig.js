module.exports = {
  proxy: {
    '/': {
          target: 'http://bike.zhunilink.com:8889',  // 接口域名
          changeOrigin: true,  //是否跨域
          pathRewrite: {
            '^/': ''   //需要rewrite的,
          }
    }
  }
}
