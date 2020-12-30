// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
// proxy middleware options
const options = {
  target: 'http://nada', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path', // rewrite path
    '^/api/remove/path': '/path', // remove base path
  },
  secure: false,
  loglevel: 'debug',
  // Custom router function (string target)
  router: function(req) {
	  
    console.log("-------------------------------");
    //console.log(JSON.stringify(req));
    console.log("req.url:"+req.url);
    console.log("headers:");
    console.log(req.headers);
    console.log("envio a req.headers.host");
    console.log("-------------------------------");
    return "http://"+req.headers.host;
  },
  
  onProxyReq: function(proxyReq, req, res) {
    console.log("onProxyReq");
    // add custom header to request
    proxyReq.setHeader('x-added-proxyReq', 'foobar');
    console.log("headers:");
    console.log(req.headers);
    // or log the req
  },
  onProxyRes: function(proxyRes, req, res) {
  	console.log("onProxyRes");
    proxyRes.headers['x-added-proxyRes'] = 'foobar'; // add new header to response
    delete proxyRes.headers['x-removed']; // remove header from response
    console.log("headers:");
    console.log(proxyRes.headers);
  },
  
};
 
// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);
 
// mount `exampleProxy` in web server
const app = express();
app.use('/', exampleProxy);
app.listen(8080);
