import React from 'react'

type Props = {
  href?: string
  blank?: boolean
  className?: string
  children: string | React.ReactNode
}

export const ExternalLink: React.FC<Props> = ({
  href,
  blank,
  className,
  children,
}) => {
  const hrefWithFallback =
    href || (typeof children === 'string' ? children : '')

  return (
    <a
      href={hrefWithFallback}
      className={className}
      {...(blank ? { target: '_blank' } : {})}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}
