import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "accent"

const toneClasses: Record<Tone, string> = {
  success: "bg-success/12 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-danger/12 text-danger border-danger/25",
  info: "bg-info/12 text-info border-info/25",
  neutral: "bg-muted text-muted-foreground border-border",
  accent: "bg-accent/12 text-accent border-accent/25",
}

// Mapea estados de negocio a un tono visual.
const estadoTono: Record<string, Tone> = {
  Crítico: "danger",
  "Sin Stock": "danger",
  Bajo: "warning",
  Saludable: "success",
  Activo: "success",
  Recibido: "success",
  Completado: "success",
  Aprobado: "success",
  Pendiente: "warning",
  Suspendido: "warning",
  Cancelado: "danger",
  Anulado: "danger",
  Entrada: "success",
  Salida: "info",
  Ajuste: "warning",
  Alta: "danger",
  Sugerido: "info",
  Liquidación: "warning",
}

export function StatusBadge({
  children,
  tone,
  estado,
  className,
}: {
  children?: ReactNode
  tone?: Tone
  estado?: string
  className?: string
}) {
  const resolved: Tone = tone ?? (estado ? (estadoTono[estado] ?? "neutral") : "neutral")
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        toneClasses[resolved],
        className,
      )}
    >
      {children ?? estado}
    </span>
  )
}
