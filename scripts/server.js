var path = require('path');
var http = require('http');
var urlParse = require('url').parse;

var bole = require('bole');
var ecstatic = require('ecstatic');
var garnish = require('garnish');

var spa_routes = {};
try {
  spa_routes = require('../spa_routes');
} catch (e) {
}

var log = bole('server');

var createServer = module.exports = function (opts) {
  if (opts.stream) {
    var pretty = garnish({
      level: opts.verbose ? 'debug' : 'info',
      name: 'server'
    });
    pretty.pipe(opts.stream);
    opts.stream = pretty;

    bole.output({
      stream: opts.stream,
      level: 'debug'
    });
  }

  var ecstaticOpts = {
    root: opts.root,
    cors: opts.coor,
    // defaultExt: true
    cache: opts.cache
  };

  function addLeadingSlash (path) {
    if (path[0] !== '/') {
      path = '/' + path;
    }
    return path;
  }

  var staticRouter = function (opts) {
    var staticHandler = ecstatic(ecstaticOpts);

    var routes = {};
    Object.keys(opts.spa_routes || {}).forEach(function (sectionFile) {
      var uris = opts.spa_routes[sectionFile];
      uris.forEach(function (uri) {
        routes[uri] = addLeadingSlash(sectionFile);
      });
    });

    var uri;
    var newUri;
    var pathname;

    return function (req, res, params) {
      uri = urlParse(req.url);
      pathname = uri.pathname;

      if (pathname.substr(-1) !== '/') {
        newUri = pathname + '/';
        if (newUri in routes) {
          res.statusCode = 302;
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Location', newUri);
          res.end('Moved to ' + newUri);
          return;
        }
      }

      // If the file exists, it'll already be routed by ecstatic.
      staticHandler(req, res, function () {
        // Otherwise, it'll fall through here.
        if (pathname in routes) {
          req.url = routes[pathname];
        }
        staticHandler(req, res);
      });

      res.once('finish', function () {
        log.info({
          method: (req.method || 'GET').toUpperCase(),
          url: req.url,
          statusCode: res.statusCode,
          colors: {
            url: 'cyan'
          }
        });
      });
    };
  };

  var httpHandler = staticRouter(opts);
  var httpServer = http.createServer(httpHandler);

  httpServer.listen(opts.port, opts.host || undefined, function () {
    var host = opts.host || 'localhost';
    var port = opts.port;
    var uri = 'http://' + host + ':' + port + '/';
    log.info({message: 'Server running at', url: uri, type: 'connect'});
  });
};

var opts = {
  cache: 0,
  cors: true,
  root: path.join(__dirname, '..'),
  host: process.env.HOST,
  port: process.env.PORT || 8080,
  stream: process.stdout,
  spa_routes: spa_routes
};

createServer(opts);
