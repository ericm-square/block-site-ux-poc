# Market Web Components

- [Web Component Crash Course](docs/get-started/web-components.stories.mdx)
- [Making Components](docs/contribute/making-components.stories.mdx)
- [Storybook](docs/contribute/storybook.stories.mdx)

## Built with [Stencil](https://stenciljs.com/docs)

_Stencil is a compiler for building fast web apps using Web Components._

_Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec._

_Stencil components are just Web Components, so they work in any major framework or with no framework at all._

## Local development

To get started, first clone our monorepo to your local machine. Before doing so you'll need to set up [git lfs](https://git-lfs.github.com) (our iOS snapshot test images [use it](https://github.com/squareup/market/tree/main/ios#git-lfs)) so your download doesn't hang. Here are the commands you'll need to run to do all of that:

```bash
brew install git-lfs
git lfs install
git clone org-49461806@github.com:squareup/market.git
cd market
```

To start the local dev servers ([Stencil](https://stenciljs.com/docs), which builds the web components, and [Storybook](https://storybook.js.org/), which we use as a development sandbox):

```bash
# in market/web/web-components
yarn start
```

Storybook should be visible at http://localhost:6006. Note that currently, it will hot reload when you've made changes to component files (`/src/components`), but you will need to stop and restart the server in order to see changes you've made to global CSS files (`/src/styles`).

For more information on Storybook and how we're using it, see [this doc](docs/contribute/storybook.stories.mdx).

## Running tests

```bash
# in market/web/web-components
yarn test
```

## Production build

To build the system for production, run:

```bash
# in market/web/web-components
yarn build
```

### Error: Can't resolve '../dist/esm/loader.js'

If you are running your local version of `@market/web-components` in another app, you may encounter the following error:
```
ERROR in /Users/ldap/Development/market/web/web-components/loader/index.js
Module not found: Error: Can't resolve '../dist/esm/loader.js' in '/Users/quinton/Development/market/web/web-components/loader'
 @ /Users/ldap/Development/market/web/web-components/loader/index.js 16:0-38 16:0-38
 @ /private/var/folders/6g/h02671ns5jn800wj8bx2l9vr0000gn/T/broccoli-7301WfBEehjvPjkt/cache-285-bundler/staging/app.js
 @ multi /private/var/folders/6g/h02671ns5jn800wj8bx2l9vr0000gn/T/broccoli-7301WfBEehjv
```
When this happens, it's because your local `@market/web-components` has not been built! Run `yarn build` to resolve the issue.

## Storybook documentation

The Storybook corresponding to the most recent `@market/web-components` release can be found at [go/marketstorybook](https://go/marketstorybook).
