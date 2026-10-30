import { cn } from "@/lib/utils"

export function Logo({
  className,
  size = "md",
  showText = true,
}: {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}) {
  const box = size === "lg" ? "size-12 text-lg" : size === "sm" ? "size-8 text-xs" : "size-10 text-sm"
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-accent font-bold tracking-tight text-accent-foreground shadow-sm",
          box,
        )}
        aria-hidden="true"
      >
        R&amp;R
      </div>
      {showText && (
        <div className="leading-tight">
          <p className="font-semibold tracking-tight">Ferretería R&amp;R</p>
          <p className="text-[11px] text-muted-foreground">Sistema de Gestión ERP</p>
        </div>
      )}
    </div>
  )
}
