import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { VentasChart, CategoriasChart } from "@/components/erp/dashboard-charts"
import {
  kpisDashboard,
  productos,
  movimientos,
  formatBs,
  recomendacionesML,
} from "@/lib/erp-data"
import {
  Package,
  AlertTriangle,
  XCircle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Settings2,
  Download,
  Sparkles,
} from "lucide-react"

export default function DashboardPage() {
  const alertas = productos.filter((p) => p.estado === "Crítico" || p.estado === "Bajo" || p.estado === "Sin Stock")

  return (
    <div>
      <PageHeader
        breadcrumb="Inicio"
        title="Dashboard"
        description="Resumen general de operaciones, ventas e inventario de Ferretería R&R."
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Download className="size-4" />
            Exportar resumen
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Productos" value={kpisDashboard.totalProductos.toLocaleString("es-BO")} icon={Package} hint="catálogo activo" />
        <KpiCard label="Bajo Stock" value={kpisDashboard.bajoStock} icon={AlertTriangle} tone="warning" trend="Requiere atención" trendTone="muted" />
        <KpiCard label="Sin Stock" value={kpisDashboard.sinStock} icon={XCircle} tone="danger" trend="Reposición urgente" trendTone="danger" />
        <KpiCard label="Valor Inventario" value={formatBs(kpisDashboard.valorInventario)} icon={Wallet} tone="success" trend="+4.2%" hint="vs mes anterior" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Ventas Mensuales</h2>
              <p className="text-sm text-muted-foreground">Evolución de ingresos (Bs) — últimos 6 meses</p>
            </div>
            <StatusBadge tone="success">+18% YTD</StatusBadge>
          </div>
          <VentasChart />
        </section>

        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="font-semibold text-foreground">Ventas por Categoría</h2>
            <p className="text-sm text-muted-foreground">Participación del mes actual</p>
          </div>
          <CategoriasChart />
        </section>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Alertas de stock */}
        <section className="rounded-xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning-foreground" />
              <h2 className="font-semibold text-foreground">Alertas de Stock</h2>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{alertas.length} productos</span>
          </div>
          <div className="divide-y divide-border">
            {alertas.map((p) => (
              <div key={p.sku} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{p.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.sku} · {p.categoria}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{p.stock} u.</p>
                    <p className="text-xs text-muted-foreground">mín: {p.minimo}</p>
                  </div>
                  <StatusBadge estado={p.estado} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Últimos movimientos */}
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-semibold text-foreground">Últimos Movimientos</h2>
            <p className="text-xs text-muted-foreground">Sucursal Central</p>
          </div>
          <div className="divide-y divide-border">
            {movimientos.slice(0, 5).map((m) => {
              const entrada = m.cantidad > 0
              return (
                <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                      entrada ? "bg-success/12 text-success" : "bg-info/12 text-info"
                    }`}
                  >
                    {entrada ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{m.producto}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.usuario} · {m.hora}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${entrada ? "text-success" : "text-info"}`}>
                    {entrada ? "+" : ""}
                    {m.cantidad}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Panel de análisis IA */}
      <section className="mt-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent/12 text-accent">
              <Sparkles className="size-[18px]" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Panel de Análisis Predictivo</h2>
              <p className="text-sm text-muted-foreground">Recomendaciones de abastecimiento generadas por IA</p>
            </div>
          </div>
          <button className="hidden h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex">
            <Settings2 className="size-4" />
            Parámetros
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {recomendacionesML.map((r) => (
            <div key={r.producto} className="rounded-lg border border-border bg-background p-4">
              <div className="mb-2 flex items-center justify-between">
                <StatusBadge estado={r.prioridad} />
              </div>
              <p className="text-sm font-medium text-foreground">{r.producto}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.motivo}</p>
              <p className="mt-3 text-sm font-semibold text-accent">{r.accion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
