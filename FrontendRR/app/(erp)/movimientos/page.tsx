"use client"

import { useMemo, useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { StatusBadge } from "@/components/erp/status-badge"
import { movimientos } from "@/lib/erp-data"
import { Search, Download, Plus, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Fingerprint } from "lucide-react"

const tipos = ["Todos", "Entrada", "Salida", "Ajuste"]

export default function MovimientosPage() {
  const [query, setQuery] = useState("")
  const [tipo, setTipo] = useState("Todos")
  const [selected, setSelected] = useState(movimientos[0])

  const filtered = useMemo(
    () =>
      movimientos.filter((m) => {
        const matchQuery =
          m.producto.toLowerCase().includes(query.toLowerCase()) ||
          m.sku.toLowerCase().includes(query.toLowerCase())
        const matchTipo = tipo === "Todos" || m.tipo === tipo
        return matchQuery && matchTipo
      }),
    [query, tipo],
  )

  return (
    <div>
      <PageHeader
        breadcrumb="Gestión de Inventario"
        title="Movimientos de Inventario"
        description="Consulta el historial completo de entradas, salidas y ajustes de stock."
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Download className="size-4" />
              Exportar Reporte
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Plus className="size-4" />
              Nuevo Ajuste
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Registro de auditoría */}
        <section className="rounded-xl border border-border bg-card shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filtrar por producto o SKU..."
                className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              {tipos.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    tipo === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Fecha y Hora</th>
                  <th className="px-4 py-3 font-medium">Producto</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Sucursal</th>
                  <th className="px-4 py-3 font-medium">Usuario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((m) => {
                  const entrada = m.cantidad > 0
                  return (
                    <tr
                      key={m.id}
                      onClick={() => setSelected(m)}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        selected.id === m.id ? "bg-accent/8" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-muted-foreground">
                        <p className="text-foreground">{m.fecha}</p>
                        <p className="text-xs">{m.hora}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{m.producto}</p>
                        <p className="font-mono text-xs text-muted-foreground">{m.sku}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5">
                          {entrada ? (
                            <ArrowUpRight className="size-4 text-success" />
                          ) : (
                            <ArrowDownRight className="size-4 text-info" />
                          )}
                          <StatusBadge estado={m.tipo} />
                          <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                            {entrada ? "+" : ""}
                            {m.cantidad}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{m.sucursal}</td>
                      <td className="px-4 py-3 text-muted-foreground">{m.usuario}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-xs text-muted-foreground">Mostrando {filtered.length} de 128 movimientos</p>
            <div className="flex items-center gap-1">
              <button className="h-8 rounded-md border border-border px-3 text-sm text-muted-foreground hover:bg-muted">Anterior</button>
              <button className="h-8 w-8 rounded-md bg-primary text-sm font-medium text-primary-foreground">1</button>
              <button className="h-8 w-8 rounded-md border border-border text-sm text-muted-foreground hover:bg-muted">2</button>
              <button className="h-8 rounded-md border border-border px-3 text-sm text-muted-foreground hover:bg-muted">Siguiente</button>
            </div>
          </div>
        </section>

        {/* Detalle de auditoría */}
        <aside className="space-y-4">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-accent" />
              <h2 className="font-semibold text-foreground">Detalle del Movimiento</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Producto</p>
                <p className="font-medium text-foreground">{selected.producto}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Motivo Detallado</p>
                <p className="text-foreground">{selected.motivo}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Documento de Referencia</p>
                <p className="font-mono text-foreground">{selected.referencia}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cantidad</span>
                <span className="font-semibold text-foreground">
                  {selected.cantidad > 0 ? "+" : ""}
                  {selected.cantidad} unidades
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Responsable</span>
                <span className="font-medium text-foreground">{selected.usuario}</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-secondary p-5">
            <div className="mb-3 flex items-center gap-2">
              <Fingerprint className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Auditoría del Sistema</h2>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">ID de Transacción</dt>
                <dd className="font-mono text-foreground">{selected.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Timestamp</dt>
                <dd className="font-mono text-foreground">
                  {selected.fecha} — {selected.hora}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">IP Responsable</dt>
                <dd className="font-mono text-foreground">192.168.1.142</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  )
}
