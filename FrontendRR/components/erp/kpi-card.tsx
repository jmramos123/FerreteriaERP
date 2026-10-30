import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Tone = "default" | "success" | "warning" | "danger" | "info" | "accent"

const iconTone: Record<Tone, string> = {
  default: "bg-muted text-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-danger/12 text-danger",
  info: "bg-info/12 text-info",
  accent: "bg-accent/12 text-accent",
}

export function KpiCard({
  label,
  value,
  hint,
  trend,
  trendTone = "success",
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: string | number
  hint?: string
  trend?: string
  trendTone?: "success" | "danger" | "muted"
  icon?: LucideIcon
  tone?: Tone
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div className={cn("flex size-9 items-center justify-center rounded-lg", iconTone[tone])}>
            <Icon className="size-[18px]" />
          </div>
        )}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {(trend || hint) && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          {trend && (
            <span
              className={cn(
                "font-medium",
                trendTone === "success" && "text-success",
                trendTone === "danger" && "text-danger",
                trendTone === "muted" && "text-muted-foreground",
              )}
            >
              {trend}
            </span>
          )}
          {hint}
        </p>
      )}
    </div>
  )
}
