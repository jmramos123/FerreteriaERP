"use client"

import { useState } from "react"
import { PageHeader } from "@/components/erp/page-header"
import { KpiCard } from "@/components/erp/kpi-card"
import { StatusBadge } from "@/components/erp/status-badge"
import { usuarios } from "@/lib/erp-data"
import { Users, ShieldCheck, UserCheck, UserX, Search, Plus, MoreVertical } from "lucide-react"

const rolTono: Record<string, "accent" | "info" | "warning" | "neutral"> = {
  Administrador: "accent",
  Vendedor: "info",
  Almacén: "warning",
  Auditor: "neutral",
}

export default function UsuariosPage() {
  const [busqueda, setBusqueda] = useState("")
  const [rol, setRol] = useState("todos")

  const filas = usuarios.filter((u) => {
    const okRol = rol === "todos" || u.rol === rol
    const okBusqueda =
      busqueda === "" ||
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())
    return okRol && okBusqueda
  })

  const activos = usuarios.filter((u) => u.estado === "Activo").length
  const suspendidos = usuarios.filter((u) => u.estado === "Suspendido").length
  const admins = usuarios.filter((u) => u.rol === "Administrador").length

  return (
    <div>
      <PageHeader
        breadcrumb="Inicio · Administración"
        title="Usuarios"
        description="Gestiona las cuentas, roles y permisos del personal de Ferretería R&R."
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
            <Plus className="size-4" />
            Crear usuario
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Usuarios" value={usuarios.length} icon={Users} hint="cuentas registradas" />
        <KpiCard label="Activos" value={activos} icon={UserCheck} tone="success" trend="En operación" trendTone="muted" />
        <KpiCard label="Suspendidos" value={suspendidos} icon={UserX} tone="warning" trend="Acceso restringido" trendTone="muted" />
        <KpiCard label="Administradores" value={admins} icon={ShieldCheck} tone="accent" hint="acceso total" />
      </div>

      <section className="mt-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-semibold text-foreground">Listado de Usuarios</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar usuario..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent sm:w-64"
              />
            </div>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-accent"
            >
              <option value="todos">Todos los roles</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Almacén">Almacén</option>
              <option value="Auditor">Auditor</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3">Usuario</th>
                <th className="px-5 py-3">Rol</th>
                <th className="px-5 py-3">Sucursal</th>
                <th className="px-5 py-3">Último Acceso</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filas.map((u) => (
                <tr key={u.email} className="transition-colors hover:bg-muted/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                        {u.iniciales}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{u.nombre}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={rolTono[u.rol] ?? "neutral"}>{u.rol}</StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{u.sucursal}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.ultimoAcceso}</td>
                  <td className="px-5 py-3">
                    <StatusBadge estado={u.estado} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      aria-label={`Acciones para ${u.nombre}`}
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No se encontraron usuarios para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
