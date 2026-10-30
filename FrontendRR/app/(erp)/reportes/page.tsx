"use client"

import { useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { StatusBadge } from "@/components/erp/status-badge"
import { ventasDiarias, plantillasReporte, sucursales, formatBs } from "@/lib/erp-data"
import { FileBarChart, FileSpreadsheet, FileText, Filter, Search } from "lucide-react"

export default function ReportesPage() {
  const [sucursal, setSucursal] = useState("todas")
  const [estado, setEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")

  const filas = ventasDiarias.filter((v) => {
    const okSucursal = sucursal === "todas" || v.sucursal === sucursal
    const okEstado = estado === "todos" || v.estado === estado
    const okBusqueda =
      busqueda === "" ||
      v.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.referencia.toLowerCase().includes(busqueda.toLowerCase())
    return okSucursal && okEstado && okBusqueda
  })

  const total = filas.reduce((acc, v) => acc + v.monto, 0)

  return (
    <div>
      <PageHeader
        breadcrumb="Inicio · Análisis"
        title="Reportes"
        description="Genera y exporta reportes operativos, de ventas e inventario de Ferretería R&R."
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <FileSpreadsheet className="size-4" />
              Exportar Excel
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
              <FileText className="size-4" />
              Exportar PDF
            </button>
          </>
        }
      />

      {/* Plantillas de reporte */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plantillasReporte.map((g) => (
          <section key={g.grupo} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent/12 text-accent">
                <FileBarChart className="size-4" />
              </div>
              <h2 className="font-semibold text-foreground">{g.grupo}</h2>
            </div>
            <div className="space-y-3">
              {g.items.map((item) => (
                <button
                  key={item.nombre}
                  className="w-full rounded-lg border border-border bg-background p-3 text-left transition-colors hover:border-accent/40 hover:bg-muted"
                >
                  <p className="text-sm font-medium text-foreground">{item.nombre}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Filtros + tabla */}
      <section className="mt-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Reporte de Ventas Diarias</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por cliente o referencia..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            />
          </div>
          <select
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="todas">Todas las sucursales</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.nombre}>
                {s.nombre}
              </option>
            ))}
          </select>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
          >
            <option value="todos">Todos los estados</option>
            <option value="Completado">Completado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Anulado">Anulado</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3">Referencia</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Sucursal</th>
                <th className="px-5 py-3 text-right">Monto</th>
                <th className="px-5 py-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filas.map((v) => (
                <tr key={v.referencia} className="transition-colors hover:bg-muted/60">
                  <td className="px-5 py-3 font-medium text-foreground">{v.referencia}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.fecha}</td>
                  <td className="px-5 py-3 text-foreground">{v.cliente}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.sucursal}</td>
                  <td className="px-5 py-3 text-right font-semibold text-foreground">{formatBs(v.monto)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge estado={v.estado} />
                  </td>
                </tr>
              ))}
              {filas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No se encontraron resultados para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <p className="text-sm text-muted-foreground">{filas.length} registros encontrados</p>
          <p className="text-sm font-semibold text-foreground">Total: {formatBs(total)}</p>
        </div>
      </section>
    </div>
  )
}
