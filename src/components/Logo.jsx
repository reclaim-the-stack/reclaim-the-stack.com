import clsx from 'clsx'

export function Logo({ className, ...props }) {
  return (
    <span className={clsx(className, 'font-matiz text-sunrise-500')} {...props}>
      RECLAIM THE STACK!
    </span>
  )
}
