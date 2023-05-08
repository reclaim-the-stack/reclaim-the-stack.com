import Link from 'next/link'
import { motion } from 'framer-motion'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { SectionProvider } from '@/components/SectionProvider'
import { HeroPattern } from '@/components/HeroPattern'

export function Layout({ children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <HeroPattern />
      <motion.header
        layoutScroll
        className="lg:pointer-events-none lg:fixed lg:z-40 lg:flex lg:pointer-events-auto lg:block"
      >
        <Header />
      </motion.header>

      <div className="max-w-[70rem] mx-auto">
        <motion.div
          layoutScroll
          className="hidden inset-y-0 lg:overflow-y-auto lg:mt-20 lg:block contents lg:fixed lg:z-40 lg:flex"
        >
          <Navigation className="w-[18rem]" />
        </motion.div>
        {/* NOTE: lg:pl-[19.5rem] is the size of the menu column on large displays */}
        <div className="relative lg:pl-[19.5rem] px-4 pt-14 sm:px-6 lg:px-8">
          <main className="pb-16 pt-8">
            <Prose as="article">
              {children}
            </Prose>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
