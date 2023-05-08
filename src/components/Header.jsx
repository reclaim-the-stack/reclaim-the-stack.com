import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from '@/components/Button'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { useMobileNavigationStore } from '@/components/MobileNavigation'
import { ModeToggle } from '@/components/ModeToggle'
import { MobileSearch, Search } from '@/components/Search'

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'w-screen top-0 z-50 items-center justify-between gap-12 px-4 transition pt-4 h-[68px] border-b border-sunrise-300/10 sm:px-6 lg:px-0 lg:z-30',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-stone-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-stone-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div className="flex lg:w-[70rem] mx-auto justify-between items-center">
        <Link className="hidden lg:block" href="/" aria-label="Home">
          <h1 className="font-matiz text-2xl text-sunrise-500">RECLAIM THE STACK!</h1>
        </Link>
        <Search />
        <div className="flex items-center gap-5 lg:hidden">
          <MobileNavigation />
        </div>
        <Link className="lg:hidden pl-4" href="/" aria-label="Home">
          <h1 className="font-matiz text-2xl text-sunrise-500">RECLAIM THE STACK!</h1>
        </Link>
        <div className="flex items-center gap-5">
          <div className="hidden md:block md:h-5 md:w-px md:bg-stone-900/10 md:dark:bg-white/15" />
          <div className="flex gap-4">
            <MobileSearch />
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  )
})
