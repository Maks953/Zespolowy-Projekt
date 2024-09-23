const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8000',
            // target: 'http://34.89.81.17:8000',
            //target: 'http://docker.andyw.ie:8000',
            //target: 'http://django:8000',
            //target: process.env.REACT_APP_PROXY,
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        })
    );
};
