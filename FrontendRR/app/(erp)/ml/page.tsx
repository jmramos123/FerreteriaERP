import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { ProyeccionChart } from "@/components/erp/dashboard-charts"
import { recomendacionesML, mapaCalor } from "@/lib/erp-data"
import { cn } from "@/lib/utils"
import { BrainCircuit, Target, TrendingUp, AlertTriangle, Sparkles, RefreshCw, Settings2 } from "lucide-react"

const calorTono: Record<string, string> = {
  ALTA: "bg-danger/15 text-danger",
  MEDIA: "bg-warning/20 text-warning-foreground",
  BAJA: "bg-success/15 text-success",
}

const meses = ["Jun", "Jul", "Ago", "Sep", "Oct"]

export default function MlPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inicio · Inteligencia"
        title="ML Predictivo"
        description="Modelos de predicción de demanda y recomendaciones de abastecimiento generadas por IA."
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Settings2 className="size-4" />
              Parámetros
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
              <RefreshCw className="size-4" />
              Reentrenar modelo
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Precisión del Modelo" value="94.2%" icon={Target} tone="success" trend="+1.8%" hint="vs versión anterior" />
        <KpiCard label="Demanda Proyectada" value="1.180 u." icon={TrendingUp} tone="info" trend="Junio 2024" trendTone="muted" />
        <KpiCard label="Productos Analizados" value="1.240" icon={BrainCircuit} tone="accent" hint="catálogo completo" />
        <KpiCard label="Alertas Predictivas" value="4" icon={AlertTriangle} tone="warning" trend="Requieren acción" trendTone="muted" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Proyección de Demanda</h2>
              <p className="text-sm text-muted-foreground">Demanda real vs predicción IA (unidades / mes)</p>
            </div>
            <StatusBadge tone="info">Modelo v2.4</StatusBadge>
          </div>
          <ProyeccionChart />
        </section>

        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Sparkles className="size-4 text-accent" />
            <h2 className="font-semibold text-foreground">Recomendaciones IA</h2>
          </div>
          <div className="divide-y divide-border">
            {recomendacionesML.map((r) => (
              <div key={r.producto} className="px-5 py-3.5">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{r.producto}</p>
                  <StatusBadge estado={r.prioridad} />
                </div>
                <p className="text-xs text-muted-foreground">{r.motivo}</p>
                <p className="mt-2 text-sm font-semibold text-accent">{r.accion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-semibold text-foreground">Mapa de Calor de Demanda</h2>
          <p className="text-sm text-muted-foreground">Intensidad de demanda proyectada por categoría y mes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="w-56 px-2 pb-2 text-left text-xs font-medium text-muted-foreground">Categoría</th>
                {meses.map((m) => (
                  <th key={m} className="px-2 pb-2 text-center text-xs font-medium text-muted-foreground">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mapaCalor.map((fila) => (
                <tr key={fila.categoria}>
                  <td className="px-2 text-sm font-medium text-foreground">{fila.categoria}</td>
                  {fila.valores.map((v, i) => (
                    <td key={i}>
                      <div
                        className={cn(
                          "flex h-11 items-center justify-center rounded-md text-xs font-semibold",
                          calorTono[v],
                        )}
                      >
                        {v}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
