import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@/components/Layout'
import * as mdxComponents from '@/components/mdx'
import { useMobileNavigationStore } from '@/components/MobileNavigation'

import '@/styles/tailwind.css'
import 'focus-visible'

function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)

export default function App({ Component, pageProps }) {
  let router = useRouter()

  return (
    <>
      <Head>
        {router.pathname === '/' ? (
          <title>Reclaim the Stack Documentation</title>
        ) : (
          <title>{`${pageProps.title} - Reclaim the Stack Documentation`}</title>
        )}
        <meta name="description" content={pageProps.description} />
        <link href="https://fonts.cdnfonts.com/css/matiz" rel="stylesheet" />
        <meta property='og:image' content='https://reclaim-the-stack.com/og-logo.png' />
        <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
      </Head>
      <MDXProvider components={mdxComponents}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </MDXProvider>
    </>
  )
}
