# aframe-site

Powers the **[A-Frame Site](https://aframe.io/)**.

This site is built using [hexo](http://hexo.io/). Site content is written in
[Markdown](http://daringfireball.net/projects/markdown/syntax) (and located in
the [`src/`](src/) directory). Pull requests are welcome!


## Local Development

To install the dependencies and start the local development server:

    npm install && npm run installdocs && npm start

If you are testing something related to the A-Frame examples, you can set up
local configuration settings to point the examples to your local A-Frame
examples:

    cp _config.local.yml.dist _config.local.yml

Then load __[`http://localhost:4000/`](http://localhost:4000/)__!

You may need to occasionally need to restart the server if you cause breaking
changes. Just proceed as usual. When developing on the site scripts,
generators, and helpers in `scripts/`, you will need to restart the server on
every change.


### Testing Documentation

Documentation lives in the [A-Frame GitHub
repo](https://github.com/aframevr/aframe/tree/master/docs).

First, clone the [A-Frame GitHub repo](https://github.com/aframevr/aframe).

    cd aframe
    npm link

And then link `aframe-site` to `aframe`:

    cd aframe-site
    npm link aframe

Then the `master` documentation will update as you work on them from the
A-Frame repository. This works because we have pointed the A-Frame site, via a
soft symbolic link, to the documentation installed in
`node_modules/aframe/docs/`.

Old versions of documentation are handled through `multidep.json`. Run `npm run
bumpdocs` to try to pull the latest documentation from GitHub branches (e.g.,
`aframevr/aframe#docs-v0.3.0).


## Deployment

To deploy this to production (GitHub Pages):

    npm run deploy

This will push the site files to
[aframevr/aframevr.github.io](https://github.com/aframevr/aframevr.github.io).
It will soon be **[live](https://aframe.io/)**!


## Search

The documentation search service is hosted by [Algolia
DocSearch](https://community.algolia.com/docsearch/). The indexing
configuration can be found at the [DocSearch config
repo](https://github.com/algolia/docsearch-configs/blob/master/configs/aframe.json).


## Credits

Source adopted from the awesome [@vuejs](https://github.com/vuejs/)
[site](https://github.com/vuejs/vuejs.org/).


## Licenses

### License for code

Code is licensed under [The MPL 2.0 License](LICENSE).

https://www.mozilla.org/MPL/2.0/

<details>
> The MPL grants you freedom to use the software for most common purposes. However, you must disclose any modified files under the MPL and distribute instructions to obtain the original MPL'd work alongside your work. The main goal of this license is to ensure that any modifications built on top of the original software is open sourced and returned to the community. The MPL is a good midway license; it isn’t very strict and has only straightforward requirements.
</details>

Read more at [TLDRLegal](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2)).

https://tldrlegal.com/license/mit-license



### License for assets

Assets are licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

> This license allows adaptations of your work to be shared in any way, and your work to be used commercially, as long as it's attributed to you. This is a Free Culture License.

