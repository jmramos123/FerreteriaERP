"use client"

import { useMemo, useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { ordenesCompra, formatBs } from "@/lib/erp-data"
import { Search, Download, Plus, ShoppingBag, Clock, Truck, MoreHorizontal } from "lucide-react"

export default function ComprasPage() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(
    () =>
      ordenesCompra.filter(
        (o) =>
          o.id.toLowerCase().includes(query.toLowerCase()) ||
          o.proveedor.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <div>
      <PageHeader
        breadcrumb="Compras"
        title="Órdenes de Compra"
        description="Gestiona tus abastecimientos y monitorea pedidos a proveedores."
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Download className="size-4" />
              Exportar
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="size-4" />
              Nueva Orden
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Total Compras Mes" value={formatBs(45280)} icon={ShoppingBag} tone="accent" trend="+12.5%" hint="vs mes anterior" />
        <KpiCard label="Órdenes Pendientes" value={12} icon={Clock} tone="warning" trend="3 con retraso" trendTone="danger" />
        <KpiCard label="Proveedores Activos" value={24} icon={Truck} tone="info" trend="Último contacto hace 2h" trendTone="muted" />
      </div>

      <section className="mt-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Historial de Compras</h2>
            <p className="text-sm text-muted-foreground">Visualización de las últimas transacciones de abastecimiento.</p>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por ID o Proveedor..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">ID Orden</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Proveedor</th>
                <th className="px-4 py-3 text-right font-medium">Ítems</th>
                <th className="px-4 py-3 text-right font-medium">Monto Total</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.fecha}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{o.proveedor}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{o.items}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-foreground">{formatBs(o.monto)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge estado={o.estado} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button aria-label="Acciones" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
