const path = require('path');
const fs = require('fs');
const url = require('url');

const chalk = require('chalk');
const cheerio = require('cheerio');
const glob = require('glob');
const Hexo = require('hexo');
const request = require('request');
const yaml = require('js-yaml');

require('es6-promise').polyfill();

const hexo = new Hexo(path.resolve(__dirname, '..'), {});
const HEXO_CONFIG = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '..', '_config.yml')));
const LOCAL_SERVER_HOST = 'http://localhost:' +
  (HEXO_CONFIG.server.port || '80') +
  (HEXO_CONFIG.root || '').replace(/\/+$/, '');
const REQUEST_OPTS = {
  followAllRedirects: true,
  rejectUnauthorized: false,
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0'
  }
};
const PORT =
const PORT =
const WWW_DIR = 'public';

let linksUnique = [];
let linksPromises = [];

hexo.init().then(function () {
  return hexo.call('generate', {});
})
.then(checkLinks)
.catch(function (err) {
  console.log(err.stack);
});

recrawler('http://some-url.com/#!/list')
  .then($ => {
    // your code goes here
    const src = $('img').attr('src')
  });

webtouch('http://www.google.com', function (e, urls) {
  if (e) throw e
  console.log(urls)
});

function checkLinks () {
  glob('public/**/*.html', function (err, files) {
    if (err) {
      console.error('Error:\n%s', err);
      return;
    }

    var lastFileIdx = files.length - 1;

    files.forEach(function (fn, idx) {
      fs.readFile(fn, 'utf8', function (err, text) {
        if (err) {
          fileError(fn, err);
        } else {
          var docUri = fn.substr(WWW_DIR.length);
          fileParse(docUri, text);
        }

        if (idx === lastFileIdx) {
          evaluateLinks();
        }
      });
    });
  });
}

function fileParse (docUri, text) {
  var $ = cheerio.load(text);
  var links = Array.prototype.slice.call($('a:not([href="#"])'));

  links.forEach(function (link) {
    var uri = $(link).attr('href');

    if (!uri ||
        uri === '#' ||
        uri.substr(0, 11) === 'javascript:' ||
        linksUnique.indexOf(uri) !== -1) {
      return;
    }

    if (uri.substr(0, 2) !== '//' &&
        uri.substr(0, 5) !== 'http:' &&
        uri.substr(0, 6) !== 'https:') {
      uri = url.resolve(LOCAL_SERVER_HOST, docUri, uri);
    }

    if (linksUnique.indexOf(uri) !== -1) { return; }

    linksUnique.push(uri);

    var prom = new Promise(function (resolve, reject) {
      request.get(uri, REQUEST_OPTS, function (err, res) {
        resolve({
          link: uri,
          status: err ? err : res.statusCode
        });
      });
    });

    linksPromises.push(prom);
  });
}

function fileError (file, err) {
  console.error('Error reading file "%s":\n%s', file, err);
}

function evaluateLinks () {
  return Promise.all(linksPromises)
  .then(function (results) {
    var msgsGood = [];
    var msgsBad = [];

    results.map(function (result) {
      var msg = '\nURL:    ' + result.link + '\nStatus: ' + result.status;
      if (result.error) {
        msgsBad.push(msg + '\nError:' + result.error);
      } else if (result.status === 200) {
        msgsGood.push(msg);
      } else {
        msgsBad.push(msg);
      }
    });

    msgsGood.sort().forEach(function (msg) {
      console.log(chalk.green(msg));
    });
    msgsBad.sort().forEach(function (msg) {
      console.log(chalk.red(msg));
    });
  })
  .catch(function (err) {
    console.error('Error:\n%s', err);
  });
}
