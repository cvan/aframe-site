(function () {

var path = window.location.pathname;
var pathWithSlash = forceTrailingSlash(path);

function forceTrailingSlash (str) {
  if (str.substr(-1) !== '/') {
    str += '/';
  }
  return str;
}

function stripTrailingSlashes (str) {
  return str.replace(/\/+$/, '');
}

var examples = {
  "title": "Examples",
  "examples": [
    {
      "section": "showcase",
      "slug": "helloworld",
      "path": "boilerplate-helloworld/",
      "title": "Hello World"
    },
    {
      "section": "showcase",
      "slug": "anime-UI",
      "path": "showcase-anime-UI/",
      "title": "Anime UI"
    },
    {
      "section": "showcase",
      "slug": "composite",
      "path": "showcase-composite/",
      "title": "Composite"
    },
    {
      "section": "showcase",
      "slug": "videosphere",
      "path": "template-videosphere/",
      "title": "360 Video"
    },
    {
      "section": "showcase",
      "slug": "curved-mockups",
      "path": "showcase-curved-mockups/",
      "title": "Curved Mockups"
    },
    {
      "section": "showcase",
      "slug": "spheres-and-fog",
      "path": "showcase-spheres-and-fog/",
      "title": "Spheres & Fog"
    },
    {
      "section": "showcase",
      "slug": "shopping",
      "path": "showcase-shopping/",
      "title": "Shopping"
    },
    {
      "section": "showcase",
      "slug": "warps",
      "path": "animation-warps/",
      "title": "Warp"
    },
    {
      "section": "showcase",
      "slug": "generic-logo",
      "path": "animation-generic-logo/",
      "title": "Logo"
    },
    {
      "section": "showcase",
      "slug": "unfold",
      "path": "animation-unfold/",
      "title": "Unfold"
    },
    {
      "section": "showcase",
      "slug": "sky",
      "path": "template-sky/",
      "title": "Panorama"
    },
    {
      "section": "showcase",
      "slug": "cursor",
      "path": "interaction-cursor/",
      "title": "Cursor & Hover"
    },
    {
      "section": "showcase",
      "slug": "lookat",
      "path": "interaction-lookat/",
      "title": "Look At"
    },
    {
      "section": "showcase",
      "slug": "basics",
      "path": "entitycomponent-basics/",
      "title": "Entity-Component"
    }
  ]
};

var examplesSubnav = document.querySelector('#examplesSubnav');
var examplesRoutes = {};

if (examplesSubnav) {
  var li;
  var a;
  var span;
  var url;
  var className = '';

  examples.examples.forEach(function (item, idx) {
    url = '/examples/' + item.section + '/' + item.slug + '/';

    className = url === pathWithSlash ? ' current' : '';

    li = document.createElement('li');
    li.setAttribute('data-url', url);
    li.className = 'subnav-item' + className;

    a = document.createElement('a');
    a.setAttribute('href', url);
    a.className = 'subnav-link' + className;

    span = document.createElement('span');
    span.className = 'sidebar__link__text';
    span.textContent = item.title;

    a.appendChild(span);
    li.appendChild(a);
    examplesSubnav.appendChild(li);

    item.url = url;
    item.li = li;
    item.a = a;
    item.span = span;

    examplesRoutes[url] = item;
    if (idx === 0) {
      examplesRoutes.__default__ = item;
    }
  });
}

var exampleIframe = document.querySelector('#exampleIframe');

var html = document.documentElement;
var defaultTitle = html.getAttribute('data-title');

function getTitle (title) {
  return defaultTitle.replace('{title}', title);
}

if (exampleIframe) {
  var currentExample;
  if (pathWithSlash in examplesRoutes) {
    currentExample = examplesRoutes[pathWithSlash];
  }
  if (!currentExample) {
    currentExample = examplesRoutes.__default__;
  }

  document.title = getTitle(currentExample.title);

  currentExample.li.classList.add('current');
  currentExample.a.classList.add('current');

  var baseUrl = exampleIframe.getAttribute('data-original-base-url');
  var externalUrl = baseUrl + currentExample.path;
  exampleIframe.setAttribute('data-path', currentExample.path);
  exampleIframe.setAttribute('src', externalUrl);

  var exampleViewsource = document.querySelector('#exampleViewsource');
  if (exampleViewsource) {
    var slug = stripTrailingSlashes(currentExample.path);
    var sourceUrl = exampleViewsource.getAttribute('data-href').replace('{slug}', slug);
    exampleViewsource.setAttribute('href', sourceUrl);
  }
}

var body = document.body;

// To customise the base URL for the <iframe>'d examples, do this in the Console:
//
//   localStorage.examples_base_url = 'http://localhost:9000/examples/'
//
// To revert back to normal:
//
//   delete localStorage.examples_base_url
//
// And be sure to refresh the page :)
var customExamplesBaseUrl;
try {
  customExamplesBaseUrl = window.localStorage.examples_base_url;
} catch (e) {
}
var isOnline = navigator.onLine;
if (!isOnline) {
  console.warn('You appear to be offline. ' +
    'You can point the examples at your local server though:\n' +
    "localStorage.examples_base_url = 'http://localhost:9000/examples/'");
}
if (customExamplesBaseUrl) {
  // When you're on the airplane and Gogo Inflight Internet or Bongo Wireless
  // have got you down, you can load the examples from your local `aframe`
  // dev server, for example.
  $$('iframe.example__iframe').forEach(function (iframe) {
    var iframePath = iframe.getAttribute('data-path');
    if (iframePath.indexOf('//') !== -1) { return; }  // Ignore external URLs.
    iframe.setAttribute('src', customExamplesBaseUrl + iframePath);
  });
}

// Trigger `:active` styles when we "click" on examples, previous/next links.
var SHOW_ACTIVE_STYLES_ON_CLICK = true;

function clickEl (el) {
  if (!el) { return; }
  if (SHOW_ACTIVE_STYLES_ON_CLICK && el.classList) { el.classList.add('click'); }
  el.click();
}

function getCurrentNavLink () {
  return document.querySelector('.examples-subnav .subnav-link.current');
}

function getNavLinks () {
  return document.querySelectorAll('.examples-subnav .subnav-link');
}

var navLinks = getNavLinks();
if (navLinks.length) {
  body.addEventListener('keyup', function (e) {
    if (document.activeElement !== body) { return; }

    var left = e.keyCode === 37;
    var right = e.keyCode === 39;
    // var up = e.keyCode === 38;
    // var down = e.keyCode === 40;
    if (!left && !right) { return; }

    navLinks = getNavLinks();
    if (!navLinks) { return; }

    var currentLink = getCurrentNavLink();
    if (!currentLink) {
      window.location.href = 'examples/';
      return;
    }

    var destIdx;
    var clicked = false;
    if (left) {
      destIdx = currentLink.closest('[data-idx]').getAttribute('data-previous-idx');
      if ('examplePrev' in window) {
        clickEl(examplePrev);
        clicked = true;
      }
    }
    if (right) {
      destIdx = currentLink.closest('[data-idx]').getAttribute('data-next-idx');
      if ('exampleNext' in window) {
        clickEl(exampleNext);
        clicked = true;
      }
    }

    if (destIdx) {
      currentLink.classList.remove('current');
    }

    var destLink = navLinks[destIdx];
    if (destLink) {
      clickEl(destLink);
      if (!clicked) {
        destLink.click();
      }
    }
  });
}

})();
