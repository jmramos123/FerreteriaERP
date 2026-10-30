"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { productos, kpisDashboard, formatBs } from "@/lib/erp-data"
import {
  Package,
  AlertTriangle,
  XCircle,
  Wallet,
  Search,
  Download,
  Plus,
  Pencil,
  Eye,
  Trash2,
} from "lucide-react"

const categorias = ["Todas", ...Array.from(new Set(productos.map((p) => p.categoria)))]

export default function InventarioPage() {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("Todas")

  const filtered = useMemo(() => {
    return productos.filter((p) => {
      const matchQuery =
        p.nombre.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
      const matchCat = cat === "Todas" || p.categoria === cat
      return matchQuery && matchCat
    })
  }, [query, cat])

  return (
    <div>
      <PageHeader
        breadcrumb="Gestión de Inventario"
        title="Inventario"
        description="Administra el stock centralizado de todos tus productos y sucursales."
        actions={
          <>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Download className="size-4" />
              Exportar CSV
            </button>
            <Link
              href="/inventario/nuevo"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="size-4" />
              Nuevo Producto
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Productos" value={kpisDashboard.totalProductos.toLocaleString("es-BO")} icon={Package} />
        <KpiCard label="Bajo Stock" value={kpisDashboard.bajoStock} icon={AlertTriangle} tone="warning" />
        <KpiCard label="Sin Stock" value={kpisDashboard.sinStock} icon={XCircle} tone="danger" />
        <KpiCard label="Valor Inventario" value={formatBs(kpisDashboard.valorInventario)} icon={Wallet} tone="success" />
      </div>

      <section className="mt-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por SKU, Nombre o Código..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Categoría:</span>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            >
              {categorias.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 text-right font-medium">P. Unit (Bs)</th>
                <th className="px-4 py-3 text-right font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.sku} className="transition-colors hover:bg-muted/50">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{p.nombre}</p>
                    <p className="text-xs text-muted-foreground">Act. {p.actualizado}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.categoria}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{p.precio.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold tabular-nums text-foreground">{p.stock}</span>
                    <span className="ml-1 text-xs text-muted-foreground">/ {p.minimo}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge estado={p.estado} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button aria-label="Ver" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Eye className="size-4" />
                      </button>
                      <button aria-label="Editar" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="size-4" />
                      </button>
                      <button aria-label="Eliminar" className="rounded-md p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No se encontraron productos con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Mostrando {filtered.length} de {kpisDashboard.totalProductos.toLocaleString("es-BO")} productos
          </p>
          <div className="flex items-center gap-1">
            <button className="h-8 rounded-md border border-border px-3 text-sm text-muted-foreground hover:bg-muted">
              Anterior
            </button>
            <button className="h-8 w-8 rounded-md bg-primary text-sm font-medium text-primary-foreground">1</button>
            <button className="h-8 w-8 rounded-md border border-border text-sm text-muted-foreground hover:bg-muted">2</button>
            <button className="h-8 w-8 rounded-md border border-border text-sm text-muted-foreground hover:bg-muted">3</button>
            <button className="h-8 rounded-md border border-border px-3 text-sm text-muted-foreground hover:bg-muted">
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
