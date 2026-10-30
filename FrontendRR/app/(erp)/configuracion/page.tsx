"use client"

import { useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { StatusBadge } from "@/components/erp/status-badge"
import { empresa, sucursales } from "@/lib/erp-data"
import { cn } from "@/lib/utils"
import { SlidersHorizontal, Store, Bell, ShieldCheck, MapPin, Printer, Plus } from "lucide-react"

type TabId = "general" | "sucursales" | "notificaciones" | "seguridad"

const tabs: { id: TabId; label: string; icon: typeof SlidersHorizontal }[] = [
  { id: "general", label: "General", icon: SlidersHorizontal },
  { id: "sucursales", label: "Sucursales", icon: Store },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "seguridad", label: "Seguridad", icon: ShieldCheck },
]

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        on ? "bg-accent" : "bg-muted-foreground/30",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-card shadow transition-transform",
          on ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        defaultValue={defaultValue}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
    </label>
  )
}

function Row({
  title,
  desc,
  children,
}: {
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  )
}

export default function ConfiguracionPage() {
  const [tab, setTab] = useState<TabId>("general")

  return (
    <div>
      <PageHeader
        breadcrumb="Inicio · Sistema"
        title="Configuración"
        description="Administra los ajustes generales, sucursales, notificaciones y seguridad del sistema."
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
            Guardar cambios
          </button>
        }
      />

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1 shadow-sm">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === "general" && (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Información de la Empresa</h2>
          <p className="mb-5 text-sm text-muted-foreground">Datos generales utilizados en facturas y reportes.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nombre comercial" defaultValue={empresa.nombre} />
            <Field label="Razón social" defaultValue={empresa.razonSocial} />
            <Field label="País" defaultValue={empresa.pais} />
            <Field label="Moneda" defaultValue={empresa.moneda} />
            <Field label="Versión del sistema" defaultValue={empresa.version} />
            <Field label="Zona horaria" defaultValue="(GMT-4) La Paz" />
          </div>
          <div className="mt-6 divide-y divide-border border-t border-border">
            <Row title="Consolidación automática de inventario" desc="Sincroniza el stock entre sucursales en tiempo real.">
              <Toggle defaultOn />
            </Row>
            <Row title="Redondeo de precios" desc="Aplica redondeo a 2 decimales en el punto de venta.">
              <Toggle defaultOn />
            </Row>
          </div>
        </section>
      )}

      {tab === "sucursales" && (
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold text-foreground">Sucursales</h2>
              <p className="text-sm text-muted-foreground">Locales registrados en el sistema.</p>
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              <Plus className="size-4" />
              Nueva sucursal
            </button>
          </div>
          <div className="divide-y divide-border">
            {sucursales.map((s) => (
              <div key={s.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/12 text-accent">
                    <Store className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{s.nombre}</p>
                      <StatusBadge tone="neutral">{s.tipo}</StatusBadge>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {s.direccion}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Printer className="size-3.5" />
                      {s.impresora} · {s.reglas}
                    </p>
                  </div>
                </div>
                <StatusBadge estado={s.estado} />
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === "notificaciones" && (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Preferencias de Notificación</h2>
          <p className="mb-2 text-sm text-muted-foreground">Define qué alertas deseas recibir y por qué medio.</p>
          <div className="divide-y divide-border border-t border-border">
            <Row title="Alertas de stock crítico" desc="Notificar cuando un producto baje del mínimo.">
              <Toggle defaultOn />
            </Row>
            <Row title="Órdenes de compra pendientes" desc="Recordatorio de órdenes sin recibir.">
              <Toggle defaultOn />
            </Row>
            <Row title="Resumen diario de ventas" desc="Reporte automático al cierre de cada jornada.">
              <Toggle defaultOn />
            </Row>
            <Row title="Recomendaciones de IA" desc="Sugerencias de abastecimiento del modelo predictivo.">
              <Toggle />
            </Row>
            <Row title="Notificaciones por correo" desc="Enviar copias de las alertas al email del administrador.">
              <Toggle defaultOn />
            </Row>
          </div>
        </section>
      )}

      {tab === "seguridad" && (
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-foreground">Seguridad y Acceso</h2>
          <p className="mb-2 text-sm text-muted-foreground">Controles de autenticación y políticas de sesión.</p>
          <div className="divide-y divide-border border-t border-border">
            <Row title="Autenticación de dos factores (2FA)" desc="Requiere un código adicional al iniciar sesión.">
              <Toggle defaultOn />
            </Row>
            <Row title="Cierre de sesión automático" desc="Cerrar sesión tras 30 minutos de inactividad.">
              <Toggle defaultOn />
            </Row>
            <Row title="Registro de auditoría" desc="Guardar historial de acciones de los usuarios.">
              <Toggle defaultOn />
            </Row>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Caducidad de contraseña (días)" defaultValue="90" />
            <Field label="Intentos de acceso permitidos" defaultValue="5" />
          </div>
          <div className="mt-6 rounded-lg border border-danger/25 bg-danger/8 p-4">
            <p className="text-sm font-medium text-danger">Zona de riesgo</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Restablecer las sesiones forzará el cierre de sesión de todos los usuarios activos.
            </p>
            <button className="mt-3 inline-flex h-9 items-center rounded-lg border border-danger/30 bg-card px-3 text-sm font-medium text-danger transition-colors hover:bg-danger/10">
              Cerrar todas las sesiones
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
