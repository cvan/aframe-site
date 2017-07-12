---
title: A web framework for building virtual reality experiences
type: examples
layout: index
---

<h1 class="slogan">
  A Web framework for building Virtual-Reality experiences
</h1>

<div class="intro">
  <p>Make WebVR with HTML and Entity-Component.</p>
  <p>Works on Vive, Rift, Daydream, GearVR, desktop.</p>
</div>

## Getting started

You can try out A-Frame in [many different ways](https://aframe.io/docs/0.6.0/introduction/installation.html). You can use [Glitch](https://aframe.io/docs/0.6.0/introduction/installation.html#remix-on-glitch) and other [online code editors](https://aframe.io/docs/0.6.0/introduction/installation.html#code-editors-in-the-browser).

[This **Hello, WebVR** scene](https://aframe.glitch.me/) is a good place to begin. You can [view the source here](https://glitch.com/edit/#!/aframe?path=index.html:1:0).


### JS standalone build (CDN)

To include A-Frame on your own web page, copy and paste these lines of HTML code into the <code>&lt;head&gt;</code> tag:

```html
<head>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
</head>
```

### A-Frame CLI

Try out the new **[`aframe` command-line tool](/cli/)**:

```bash
npm install -g aframe-cli
```

```bash
aframe create
aframe serve
aframe publish
```


### Install A-Frame using [npm](https://npmjs.com/package/aframe)

To use A-Frame in a [Browserify](http://browserify.org)/[Webpack](https://webpack.js.org/) project:

```bash
npm install aframe
```

```js
require('aframe');
```



<!--

### Download A-Frame, version 0.6.0

<a id="builds-prod" class="btn btn-download btn-download-prod" href="https://aframe.io/releases/0.6.0/aframe.min.js" download><span class="btn-download-label">Production (minified)</span> <br>https://aframe.io/releases/<strong class="btn-download-version">0.6.0</strong>/<strong class="btn-download-filename">aframe.min.js</strong></a>

<a id="builds-dev" class="btn btn-download btn-download-dev" href="https://aframe.io/releases/0.6.0/aframe.js" download><span class="btn-download-label">Development (uncompressed with source maps)</span> <br>https://aframe.io/releases/<strong class="btn-download-version">0.6.0</strong>/<strong class="btn-download-filename">aframe.js</strong></a>

### Starter Kit

<a class="btn btn-cta btn-kit" href="/docs/0.6.0/introduction/installation.html#download-the-boilerplate-on-github">Download Starter Kit</a>

-->
