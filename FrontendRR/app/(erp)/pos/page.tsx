"use client"

import { useMemo, useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { carritoPOS, formatBs } from "@/lib/erp-data"
import {
  Barcode,
  Plus,
  Minus,
  Trash2,
  User,
  Banknote,
  CreditCard,
  ArrowLeftRight,
  Receipt,
  Trash,
} from "lucide-react"

interface Linea {
  sku: string
  producto: string
  precio: number
  cantidad: number
  stock: number
}

const medios = [
  { id: "efectivo", label: "Efectivo", icon: Banknote },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard },
  { id: "transfer", label: "Transfer.", icon: ArrowLeftRight },
]

export default function PosPage() {
  const [items, setItems] = useState<Linea[]>(carritoPOS)
  const [medio, setMedio] = useState("efectivo")
  const [comprobante, setComprobante] = useState<"simplificada" | "electronica">("electronica")
  const [recibido, setRecibido] = useState<number>(0)

  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0), [items])
  const iva = subtotal * 0.13
  const total = subtotal + iva
  const cambio = Math.max(0, recibido - total)

  function setCantidad(sku: string, delta: number) {
    setItems((prev) =>
      prev.map((i) => (i.sku === sku ? { ...i, cantidad: Math.max(1, i.cantidad + delta) } : i)),
    )
  }
  function remove(sku: string) {
    setItems((prev) => prev.filter((i) => i.sku !== sku))
  }

  return (
    <div>
      <PageHeader
        breadcrumb="Ventas / POS"
        title="Punto de Venta"
        description="Registra ventas, genera comprobantes y gestiona el cobro al cliente."
        actions={
          <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm font-medium text-success">
            <span className="size-2 rounded-full bg-success" />
            Caja Abierta · Inventario en línea
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Ticket */}
        <section className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row">
              <div className="relative flex-1">
                <Barcode className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Escanear código de barras o escribir nombre del producto..."
                  className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
              </div>
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                <Plus className="size-4" />
                Agregar Ítem
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">Ticket Actual ({items.length} ítems)</h2>
              <button
                onClick={() => setItems([])}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-danger"
              >
                <Trash className="size-3.5" />
                Vaciar
              </button>
            </div>

            <div className="divide-y divide-border border-t border-border">
              {items.map((i) => (
                <div key={i.sku} className="flex items-center gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{i.producto}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-mono">{i.sku}</span> · Stock disp: {i.stock} u. · {formatBs(i.precio)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCantidad(i.sku, -1)}
                      aria-label="Restar"
                      className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-medium tabular-nums text-foreground">{i.cantidad}</span>
                    <button
                      onClick={() => setCantidad(i.sku, 1)}
                      aria-label="Sumar"
                      className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <div className="w-24 text-right text-sm font-semibold tabular-nums text-foreground">
                    {formatBs(i.precio * i.cantidad)}
                  </div>
                  <button
                    onClick={() => remove(i.sku)}
                    aria-label="Eliminar"
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-danger/10 hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
              {items.length === 0 && (
                <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                  El ticket está vacío. Escanea o agrega un producto para comenzar.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <User className="size-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Cliente General</p>
                <p className="text-xs text-muted-foreground">NIT: 10293847-5 · Puntos: 450</p>
              </div>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground hover:bg-muted">
              <Plus className="size-4" />
              Nuevo
            </button>
          </div>
        </section>

        {/* Cobro */}
        <aside className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">Método de Pago y Facturación</h2>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Tipo de Comprobante</p>
            <div className="grid grid-cols-2 gap-2">
              {(["simplificada", "electronica"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setComprobante(c)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                    comprobante === c
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {c === "electronica" ? "Electrónica" : "Simplificada"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Medio de Pago</p>
            <div className="grid grid-cols-3 gap-2">
              {medios.map((m) => {
                const Icon = m.icon
                return (
                  <button
                    key={m.id}
                    onClick={() => setMedio(m.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors ${
                      medio === m.id
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="size-5" />
                    {m.label}
                  </button>
                )
              })}
            </div>
          </div>

          {medio === "efectivo" && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Efectivo Recibido</p>
              <input
                type="number"
                value={recibido || ""}
                onChange={(e) => setRecibido(Number(e.target.value))}
                placeholder="0.00"
                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-right text-lg font-semibold tabular-nums outline-none focus:border-ring"
              />
              <div className="grid grid-cols-4 gap-2">
                {[20, 50, 100, 200].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRecibido((r) => r + v)}
                    className="rounded-lg border border-border py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    Bs {v}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cambio a Devolver</span>
                <span className="font-semibold text-foreground">{formatBs(cambio)}</span>
              </div>
            </div>
          )}

          <div className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums text-foreground">{formatBs(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">IVA (13%)</span>
              <span className="tabular-nums text-foreground">{formatBs(iva)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold text-foreground">Total a Pagar</span>
              <span className="text-xl font-bold tabular-nums text-foreground">{formatBs(total)}</span>
            </div>
          </div>

          <button
            disabled={items.length === 0}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Receipt className="size-4" />
            Procesar Venta (F10)
          </button>
          <button className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted">
            Cotizar
          </button>
        </aside>
      </div>
    </div>
  )
}
