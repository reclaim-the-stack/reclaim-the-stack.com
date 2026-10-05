import clsx from 'clsx'

export function Prose({ as, className, ...props }) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose dark:prose-invert',
        // `html :where(& > *)` is used to select all direct children without an increase in specificity like you'd get from just `& > *`
        'lg:[html_:where(&>*)]:max-w-3xl',
      )}
      {...props}
    />
  )
}
