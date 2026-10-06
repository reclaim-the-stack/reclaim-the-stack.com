'use client'

import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'
import { CloseButton } from '@headlessui/react'

function useInitialValue(value, condition = true) {
  // eslint-disable-next-line react-hooks/refs
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}) {
  return (
    <CloseButton
      as={Link}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-stone-900 dark:text-white'
          : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="stone">
          {tag}
        </Tag>
      )}
    </CloseButton>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-stone-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-sunrise-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({ group, className }) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-stone-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-stone-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === pathname}>
                {link.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {link.href === pathname && sections.length > 0 && (
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export const navigation = [
  {
    title: 'Kubernetes Platform',
    links: [
      { title: 'Introduction', href: '/docs/kubernetes-platform/introduction' },
      { title: 'Installation', href: '/docs/kubernetes-platform/installation' },
      { title: 'Usage', href: '/docs/kubernetes-platform/usage' },
    ],
  },
  {
    title: 'Platform Components',
    links: [
      {
        title: 'Platform Components',
        href: '/docs/platform-components/introduction',
      },
      {
        title: 'Gitops: ArgoCD',
        href: '/docs/platform-components/gitops-argocd',
      },
      {
        title: 'Ingress: Cloudflared',
        href: '/docs/platform-components/ingress-cloudflared',
      },
      {
        title: 'PostgreSQL',
        href: '/docs/platform-components/postgresql-operator',
      },
      { title: 'Redis', href: '/docs/platform-components/redis-operator' },
      {
        title: 'Elasticsearch',
        href: '/docs/platform-components/elasticsearch-operator',
      },
      {
        title: 'OpenSearch',
        href: '/docs/platform-components/opensearch-operator',
      },
      {
        title: 'Secrets Management',
        href: '/docs/platform-components/secrets-management',
      },
      {
        title: 'Persistent Storage',
        href: '/docs/platform-components/persistent-storage',
      },
      { title: 'Monitoring', href: '/docs/platform-components/monitoring' },
      {
        title: 'Log Aggregation',
        href: '/docs/platform-components/log-aggregation',
      },
      { title: 'Service Mesh', href: '/docs/platform-components/service-mesh' },
    ],
  },
  {
    title: 'Guides',
    links: [
      {
        title: 'Production Checklist',
        href: '/docs/guides/production-checklist',
      },
    ],
  },
  {
    title: 'Talos Manager',
    links: [
      { title: 'Introduction', href: '/docs/talos-manager/introduction' },
      { title: 'Installation', href: '/docs/talos-manager/installation' },
      { title: 'Usage', href: '/docs/talos-manager/usage' },
    ],
  },
  {
    title: 'OpenSearch Operator',
    links: [
      { title: 'Introduction', href: '/docs/opensearch-operator/introduction' },
      { title: 'Installation', href: '/docs/opensearch-operator/installation' },
      { title: 'Usage', href: '/docs/opensearch-operator/usage' },
      { title: 'Cluster Spec', href: '/docs/opensearch-operator/cluster-spec' },
      { title: 'Operations', href: '/docs/opensearch-operator/operations' },
      { title: 'Monitoring', href: '/docs/opensearch-operator/monitoring' },
    ],
  },
]

export function Navigation(props) {
  return (
    <nav {...props}>
      <ul role="list" className="mb-20">
        {navigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  )
}
