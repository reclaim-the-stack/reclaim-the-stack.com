import clsx from 'clsx'

const variantStyles = {
  medium: 'rounded-lg px-1.5 ring-1 ring-inset',
}

const colorStyles = {
  sunrise: {
    small: 'text-sunrise-500 dark:text-sunrise-400',
    medium:
      'ring-sunrise-300 dark:ring-sunrise-400/30 bg-sunrise-400/10 text-sunrise-500 dark:text-sunrise-400',
  },
  sky: {
    small: 'text-sky-500',
    medium:
      'ring-sky-300 bg-sky-400/10 text-sky-500 dark:ring-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400',
  },
  amber: {
    small: 'text-amber-500',
    medium:
      'ring-amber-300 bg-amber-400/10 text-amber-500 dark:ring-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400',
  },
  rose: {
    small: 'text-red-500 dark:text-rose-500',
    medium:
      'ring-rose-200 bg-rose-50 text-red-500 dark:ring-rose-500/20 dark:bg-rose-400/10 dark:text-rose-400',
  },
  stone: {
    small: 'text-stone-400 dark:text-stone-500',
    medium:
      'ring-stone-200 bg-stone-50 text-stone-500 dark:ring-stone-500/20 dark:bg-stone-400/10 dark:text-stone-400',
  },
}

const valueColorMap = {
  get: 'sunrise',
  post: 'sky',
  put: 'amber',
  delete: 'rose',
}

export function Tag({
  children,
  variant = 'medium',
  color = valueColorMap[children.toLowerCase()] ?? 'sunrise',
}) {
  return (
    <span
      className={clsx(
        'font-mono text-[0.625rem] font-semibold leading-6',
        variantStyles[variant],
        colorStyles[color][variant]
      )}
    >
      {children}
    </span>
  )
}
