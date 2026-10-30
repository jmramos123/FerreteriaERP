"use client"

import { useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { proveedores, formatBs } from "@/lib/erp-data"
import {
  Wallet,
  Truck,
  Star,
  Phone,
  Mail,
  MapPin,
  Plus,
  Search,
  FileText,
  Building2,
} from "lucide-react"

const tabs = ["Directorio", "Comparador de Precios", "Historial de Órdenes"]
const deudaTotal = proveedores.reduce((acc, p) => acc + p.saldo, 0)

function Stars({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < Math.round(value) ? "fill-warning text-warning" : "text-border"}`}
        />
      ))}
      <span className="ml-1 text-xs font-medium text-muted-foreground">{value.toFixed(1)}</span>
    </span>
  )
}

export default function ProveedoresPage() {
  const [tab, setTab] = useState("Directorio")
  const [selected, setSelected] = useState(proveedores[0])

  return (
    <div>
      <PageHeader
        breadcrumb="Proveedores"
        title="Gestión de Proveedores"
        description="Administra tus relaciones comerciales, deudas y compara precios de mercado."
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="size-4" />
            Nueva Orden
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <KpiCard label="Deuda Total a Pagar" value={formatBs(deudaTotal)} icon={Wallet} tone="danger" trend="+12%" hint="vs mes anterior" trendTone="danger" />
        <KpiCard label="Proveedores Activos" value={proveedores.length * 4 + 4} icon={Truck} tone="info" trend="2 registrados esta semana" trendTone="muted" />
      </div>

      <div className="mt-4 flex items-center gap-1 rounded-lg bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Directorio */}
        <section className="space-y-3 lg:col-span-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar proveedor..."
              className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
          {proveedores.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className={`flex w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors sm:flex-row sm:items-center sm:justify-between ${
                selected.id === p.id ? "border-accent ring-1 ring-accent" : "border-border hover:border-accent/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Building2 className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{p.nombre}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <Stars value={p.rating} />
                    <span className="text-xs text-muted-foreground">· {p.categoria}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 sm:gap-8">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Saldo Pendiente</p>
                  <p className={`text-sm font-semibold ${p.saldo > 0 ? "text-danger" : "text-success"}`}>
                    {formatBs(p.saldo)}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-muted-foreground">Última Compra</p>
                  <p className="text-sm text-foreground">{p.ultimaCompra}</p>
                </div>
              </div>
            </button>
          ))}
          <p className="text-xs text-muted-foreground">Mostrando {proveedores.length} de 28 proveedores</p>
        </section>

        {/* Ficha de Proveedor */}
        <aside className="space-y-4">
          <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Ficha de Proveedor</p>
              <h2 className="mt-1 font-semibold text-foreground">{selected.nombre}</h2>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge tone="accent">Proveedor Estratégico</StatusBadge>
                <Stars value={selected.rating} />
              </div>
            </div>

            <div className="space-y-3 border-b border-border p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Datos de Contacto</p>
              <p className="text-sm font-medium text-foreground">{selected.contacto}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-accent" />
                  {selected.telefono}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-accent" />
                  {selected.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-accent" />
                  {selected.direccion}
                </p>
              </div>
            </div>

            <div className="space-y-2 border-b border-border p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Resumen Financiero</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Crédito Máximo</span>
                <span className="font-medium text-foreground">{formatBs(selected.creditoMaximo)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Saldo Deudor</span>
                <span className="font-semibold text-danger">{formatBs(selected.saldo)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Próximo Vencimiento</span>
                <span className="font-medium text-foreground">{selected.proximoVencimiento}</span>
              </div>
            </div>

            <div className="space-y-2 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Documentos Adjuntos</p>
              {["Contrato_Marco_2024.pdf", "Lista_Precios_Mayo.xlsx", "NIT_Certificado.pdf"].map((doc) => (
                <div key={doc} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="truncate text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          </section>

          <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="size-4" />
            Nueva Orden de Compra
          </button>
        </aside>
      </div>
    </div>
  )
}
