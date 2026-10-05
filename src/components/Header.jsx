import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { forwardRef } from 'react'

import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
} from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CloseButton } from '@headlessui/react'

export const Header = forwardRef(function Header({ className, ...props }, ref) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], ['50%', '90%'])
  let bgOpacityDark = useTransform(scrollY, [0, 72], ['20%', '80%'])

  return (
    <motion.div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'top-0 z-50 h-[73px] w-screen items-center justify-between gap-12 border-b border-sunrise-300/10 px-4 pt-5 transition sm:px-6 lg:z-30 lg:px-0',
        !isInsideMobileNavigation && 'backdrop-blur-xs dark:backdrop-blur-sm',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-stone-900'
          : 'bg-white/(--bg-opacity-light) dark:bg-stone-900/(--bg-opacity-dark)',
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div className="mx-auto flex items-center justify-between lg:w-[70rem]">
        <CloseButton
          as={Link}
          className="hidden lg:block"
          href="/"
          aria-label="Home"
        >
          <Logo className="text-2xl" />
        </CloseButton>
        <Search />
        <div className="flex items-center gap-5 lg:hidden">
          <MobileNavigation />
        </div>
        <CloseButton
          as={Link}
          className="pl-4 lg:hidden"
          href="/"
          aria-label="Home"
        >
          <Logo className="text-xl sm:text-2xl" />
        </CloseButton>
        <div className="flex items-center gap-5">
          <div className="hidden md:block md:h-5 md:w-px md:bg-stone-900/10 md:dark:bg-white/15" />
          <div className="flex gap-4">
            <MobileSearch />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.div>
  )
})
