var utils = require('../lib/utils');

hexo.extend.generator.register('blog-post-introducing-aframe', function (locals) {
  return {
    path: 'blog/2015/12/16/0.0.10-release/',
    data: utils.createRedirectResponse(hexo, 'blog/2015/12/16/introducing-aframe/')
  };
});

hexo.extend.generator.register('docs', function (locals) {
  return {
    path: 'docs/',
    // TODO: Redirect to http://docs.aframe.io/
    data: utils.createRedirectResponse(hexo, 'docs/guide/')
  };
});

hexo.extend.generator.register('examples.json', function (locals) {
  // hexo.route.set('examples/index.json', JSON.stringify(locals.data.examples));
  return {
    path: 'examples/index.json',
    data: JSON.stringify(locals.data.examples)
  };
});

hexo.extend.generator.register('examples', function (locals) {
  var self = this;

  var routes = [];
  function addRoute (path, data, layout) {
    routes.push({
      path: path,
      data: data,
      layout: layout
    });
  }

  addRoute('guide/', utils.createRedirectResponse(hexo, 'guide/getting-started/'));

  if (locals.data.examples) {
    var examples = locals.data.examples.examples;
    var examplesLookup = {};
    var examplesRedirect = utils.createRedirectResponse(hexo, 'examples/');

    var sections = [];

    examples.forEach(function (example, idx) {
      var section = example.section;

      example.idx = idx;
      example.previous_idx = idx === 0 ? examples.length - 1 : idx - 1;
      example.next_idx = idx === examples.length - 1 ? 0 : idx + 1;

      var permalink = utils.urljoin('examples', section, example.slug, '/');
      example.type = 'examples';
      example.url = permalink;
      example.is_external = utils.isUrl(example.path);
      addRoute(permalink, example, 'examples');
      examplesLookup[permalink] = example;
      if (!self.config.examples) { return; }
      if (permalink === self.config.examples.first_example_url) {
        addRoute('examples/', example, 'examples');
      }
      // if (permalink === self.config.examples.homepage_example_url) {
      //   addRoute('/', example, 'index');
      // }

      if (sections.indexOf(section) === -1) {
        sections.push(section);
      }
    });

    sections.forEach(function (sectionSlug) {
      // TODO: Eventually build out separate pages for each category in Examples.
      addRoute('examples/' + sectionSlug + '/', examplesRedirect);
    });

    hexo.locals.set('examples_by_urls', function () {
      return examplesLookup;
    });
  }

  return routes;
});
