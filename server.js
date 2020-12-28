const http      = require('http');
const httpProxy = require('http-proxy');
const proxy     = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
  console.log("algo llego");

  console.log(req.headers);
  
  console.log(req.url);
  proxy.web(req, res, { target: req.url });
}).listen(8080, () => {
  console.log("Waiting for requests...");
});
