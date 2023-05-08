# reclaim-the-stack.com

This is the source code for the documentation site at https://reclaim-the-stack.com

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
cp .env.example .env.local
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Global search

This site uses [Algolia DocSearch](https://docsearch.algolia.com) for the global search. The following [environment variables](https://nextjs.org/docs/basic-features/environment-variables) are used to integrate with Algolia:

```
NEXT_PUBLIC_DOCSEARCH_APP_ID=
NEXT_PUBLIC_DOCSEARCH_API_KEY=
NEXT_PUBLIC_DOCSEARCH_INDEX_NAME=
```

## License

This site is using Tailwind UI, licensed under the [Tailwind UI license](https://tailwindui.com/license).
