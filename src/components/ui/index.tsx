import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../design-system/Icon'
import type { IconName } from '../../design-system/icons'

type Variant = 'primary' | 'secondary' | 'ghost'

/** Bouton-lien du design system. `to` = route interne, `href` = lien externe. */
export function Button({
  variant = 'secondary',
  to,
  href,
  icon,
  iconLeft,
  children,
}: {
  variant?: Variant
  to?: string
  href?: string
  icon?: IconName
  iconLeft?: IconName
  children: ReactNode
}) {
  const cls = `xt-btn xt-btn--${variant}`
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size="sm" />}
      {children}
      {icon && <Icon name={icon} size="sm" />}
    </>
  )
  if (to) return <Link to={to} className={cls}>{content}</Link>
  const external = href?.startsWith('http')
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {content}
    </a>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="xt-tag">{children}</span>
}

export function KpiStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="xt-kpi">
      <span className="xt-kpi__value">{value}</span>
      <span className="xt-kpi__label">{label}</span>
    </div>
  )
}
