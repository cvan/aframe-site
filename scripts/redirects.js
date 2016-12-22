var fs = require('fs');
var glob = require('glob');
var join = require('path').join;

var pkgMulti = require('../package-multi');
var utils = require('../lib/utils');

var MASTER = 'master';

var aframeVersions = Object.keys(pkgMulti.dependencies.aframe);
aframeVersions.push(MASTER);

hexo.extend.generator.register('site-redirects', function () {
  return expandRedirectObjs([
    ['faq/', join('docs', hexo.config.aframe_version, 'introduction', 'faq.html')]
  ]);
});

hexo.extend.generator.register('blog-redirects', function () {
  return expandRedirectObjs([
    ['blog/2015/12/16/0.0.10-release/', 'blog/introducing-aframe/'],
    ['blog/2015/12/16/introducing-aframe/', 'blog/introducing-aframe/'],
    ['blog/2016/03/31/aframe-v0.2.0/', 'blog/aframe-v0.2.0/']
  ]);
});

hexo.extend.generator.register('community-short-url-redirects', function () {
  return expandRedirectObjs([
    ['github/', hexo.config.github.aframe.url],
    ['repo/', hexo.config.github.aframe.url],

    ['twitter/', hexo.config.twitter.url],

    ['slack/', hexo.config.slack.aframe.signup_url],
    ['chat/', hexo.config.slack.aframe.signup_url],

    ['awesome/', hexo.config.github.awesome_aframe.url],
    ['aa/', hexo.config.github.awesome_aframe.url],
    ['awesome-aframe/', hexo.config.github.awesome_aframe.url],
    ['awesomeaframe/', hexo.config.github.awesome_aframe.url],
    ['awesome-list/', hexo.config.github.awesome_aframe.url],
    ['awesomelist/', hexo.config.github.awesome_aframe.url],

    ['so/', hexo.config.stack_overflow.aframe.url],
    ['stack-overflow/', hexo.config.stack_overflow.aframe.url],
    ['stackoverflow/', hexo.config.stack_overflow.aframe.url],
    ['help/', hexo.config.stack_overflow.aframe.url],
    ['ask/', hexo.config.stack_overflow.aframe.url],
    ['questions/', hexo.config.stack_overflow.aframe.url]
  ]);
});

hexo.extend.generator.register('docs-redirects', function () {
  var redirectObjs = [
    getDocRootRedirectObjs(),
    getPreVersionedRedirectObjs(),
    getComponentSectionRedirectObjs()
  ];
  redirectObjs.push([
    ['docs/', 'docs/' + hexo.config.aframe_version + '/introduction/'],
    ['docs/guide/', 'docs/' + hexo.config.aframe_version + '/introduction/'],
    ['docs/0.3.0/guides/build-with-magicavoxel.html', 'docs/0.3.0/guides/building-with-magicavoxel.html'],
    // Pre-versioned 0.1.0 removed pages redirects.
    ['docs/core/templates.html', 'docs/0.1.0/templates.html'],
    ['docs/guide/entering-vr.html', 'docs/0.1.0/entering-vr.html'],
    // Pre-versioned 0.1.0 -> 0.2.0 redirects.
    ['docs/components/loader.html', 'docs/0.2.0/components/collada-model.html'],
    ['docs/core/animation.html', 'docs/0.2.0/core/animations.html'],
    ['docs/core/assets.html', 'docs/0.2.0/core/asset-management-system.html'],
    ['docs/core/mixin.html', 'docs/0.2.0/core/mixins.html'],
    ['docs/guide/cameras-and-lights.html', 'docs/0.2.0/guide/building-a-basic-scene.html'],
    ['docs/guide/installation.html', 'docs/0.2.0/guide/getting-started.html'],
    ['docs/guide/objects.html', 'docs/0.2.0/guides/building-a-basic-scene.html'],
    ['docs/guide/positioning.html', 'docs/0.2.0/guides/building-a-basic-scene.html#transforming-the-box'],
    ['docs/primitives/a-cube.html', 'docs/0.2.0/primitives/a-box.html'],
    ['docs/primitives/a-model.html', 'docs/0.2.0/primitives/a-collada-model.html']
  ]);

  // Flatten arrays since `redirectObjs` is an array of arrays of arrays. We just want a flat
  // array of [<from>, <to>]s.
  return expandRedirectObjs([].concat.apply([], redirectObjs));
});

/**
 * To enable more convenient data structure.
 * [fromPath, toPath] to {path: fromPath, data: redirect(hexo, toPath)}
 */
function expandRedirectObjs (redirectObjs) {
  return redirectObjs.map(function expand(redirectObj) {
    return {path: redirectObj[0], data: utils.createRedirectResponse(hexo, redirectObj[1])};
  });
}

/**
 * Redirects from '/docs/<version>/' to '/docs/<version>/guide/'.
 */
function getDocRootRedirectObjs () {
  return aframeVersions.map(function getRedirectObj (version) {
    if (version === '0.1.0' || version === '0.2.0') {
      return ['docs/' + version + '/', 'docs/' + version + '/guide/'];
    } else {
      return ['docs/' + version + '/', 'docs/' + version + '/introduction/'];
    }
  });
}

/**
 * Redirects from '/docs/<version>/components/' to '/docs/<version>/core/component.html'.
 */
function getComponentSectionRedirectObjs () {
  return aframeVersions.map(function getRedirectObj (version) {
    return ['docs/' + version + '/components/', 'docs/' + version + '/core/component.html'];
  });
}

/**
 * Get documentation paths from before docs were versioned (started versioning at 0.3.0).
 * In order to create redirects from old path structure to new path structure.
 *
 * For example:
 *   Redirect from docs/guide/getting-started.html -> docs/0.2.0/guide/getting-started.html
 *
 * And do that for every page in 0.2.0.
 */
function getPreVersionedRedirectObjs () {
  var paths = glob.sync('src/docs/0.2.0/**/*.md');
  return paths.map(function getRedirectObj (path) {
    // Pull out the last three paths and s/md/html (=> docs/<folder>/<file>.html).
    console.log('path', path);
    // Then create the redirect.
    return [path, path.replace('docs/', 'docs/0.2.0/')];
  });
}
