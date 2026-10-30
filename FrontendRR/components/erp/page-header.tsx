import type { ReactNode } from "react"

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string
  description?: string
  breadcrumb?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        {breadcrumb && <p className="text-xs font-medium text-muted-foreground">{breadcrumb}</p>}
        <h1 className="text-pretty text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="max-w-2xl text-pretty text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
