import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL('https://reclaim-the-stack.com'),
  title: {
    template: '%s - Reclaim the Stack Documentation',
    default: 'Reclaim the Stack Documentation',
  },
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    images: '/og-logo.png',
  },
}

export default async function RootLayout({ children }) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link href="https://fonts.cdnfonts.com/css/matiz" rel="stylesheet" />
      </head>
      <body className="flex min-h-full bg-white antialiased dark:bg-cod-950">
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
