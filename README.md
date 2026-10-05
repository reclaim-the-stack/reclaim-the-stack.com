# reclaim-the-stack.com

This is the source code for the documentation site at https://reclaim-the-stack.com

## Getting started

To get started, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Deployment

This site is automatically built and deployed to Cloudflare Pages on git push. See https://dash.cloudflare.com/d4ef7d89d9e8c9782dde5852b7aadd31/pages/view/reclaim-the-stack for the administration dashboard.

## Global search

Search is powered by [FlexSearch](https://github.com/nextapps-de/flexsearch). The index is built automatically from the MDX pages in `src/app` at build time, see `src/mdx/search.mjs`.

## License

This site is based on the [Protocol](https://tailwindcss.com/plus/templates/protocol) template from Tailwind Plus, licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).
