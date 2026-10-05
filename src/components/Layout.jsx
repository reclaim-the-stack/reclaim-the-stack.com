'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeroPattern } from '@/components/HeroPattern'
import { Navigation } from '@/components/Navigation'
import { SectionProvider } from '@/components/SectionProvider'

export function Layout({ children, allSections }) {
  let pathname = usePathname()

  if (pathname === '/') {
    return (
      <SectionProvider sections={[]}>
        <HeroPattern />
        <div className="mx-auto max-w-[70rem]">
          <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
            <main className="pt-8 pb-16">{children}</main>
          </div>
        </div>
      </SectionProvider>
    )
  }

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <HeroPattern />
      <motion.header layoutScroll className="lg:fixed lg:z-40">
        <Header />
      </motion.header>

      <div className="mx-auto max-w-[70rem]">
        <motion.div
          layoutScroll
          className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:mt-[6.7rem] lg:block lg:overflow-y-auto"
        >
          <Navigation className="w-[18rem]" />
        </motion.div>
        {/* NOTE: lg:pl-[19.5rem] is the size of the menu column on large displays */}
        <div className="relative px-4 pt-14 sm:px-6 lg:px-8 lg:pl-[19.5rem]">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}
