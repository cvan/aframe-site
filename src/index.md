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

To include A-Frame on a web page, copy and paste these lines of HTML code into the <code>&lt;head&gt;</code> tag:

```html
<head>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
</head>
```

Dive right in by [remixing these projects on Glitch](https://aframe.io/docs/0.6.0/introduction/installation.html#remix-on-glitch) and other [online code editors](https://aframe.io/docs/0.6.0/introduction/installation.html#code-editors-in-the-browser).

<small class="npm-dogwhistle">
Prefer to use a [Browserify](http://browserify.org)/[Webpack](https://webpack.js.org/) build system? You guessed it: [`npm install aframe`](https://aframe.io/docs/0.6.0/introduction/installation.html#install-from-npm)
</small>

## A-Frame CLI

Try out the new **[`aframe` command-line tool](/cli/)**:

```bash
npm install -g aframe-cli
```

```bash
aframe create
aframe serve
aframe publish
```

<!--

### Download A-Frame, version 0.6.0

<a id="builds-prod" class="btn btn-download btn-download-prod" href="https://aframe.io/releases/0.6.0/aframe.min.js" download><span class="btn-download-label">Production (minified)</span> <br>https://aframe.io/releases/<strong class="btn-download-version">0.6.0</strong>/<strong class="btn-download-filename">aframe.min.js</strong></a>

<a id="builds-dev" class="btn btn-download btn-download-dev" href="https://aframe.io/releases/0.6.0/aframe.js" download><span class="btn-download-label">Development (uncompressed with source maps)</span> <br>https://aframe.io/releases/<strong class="btn-download-version">0.6.0</strong>/<strong class="btn-download-filename">aframe.js</strong></a>

### Starter Kit

<a class="btn btn-cta btn-kit" href="/docs/0.6.0/introduction/installation.html#download-the-boilerplate-on-github">Download Starter Kit</a>

### Install A-Frame using [npm](https://npmjs.com/package/aframe)

To use A-Frame in a [Browserify](http://browserify.org)/[Webpack](https://webpack.js.org/) project:

```bash
npm install aframe
```

```js
require('aframe');
```

-->
