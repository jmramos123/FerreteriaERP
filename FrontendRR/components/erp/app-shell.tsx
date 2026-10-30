"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navItems } from "./nav-items"
import { Logo } from "./logo"
import { usuarioActual } from "@/lib/erp-data"
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Building2,
  HelpCircle,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className={cn("size-[18px] shrink-0", active && "text-sidebar-primary")} />
            <span className="truncate">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Logo size="sm" />
      </div>
      <NavList onNavigate={onNavigate} />
      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-[18px]" />
          Cerrar Sesión
        </Link>
        <p className="px-3 pt-3 text-[10px] leading-relaxed text-sidebar-foreground/50">
          2024 Ferretería R&amp;R — ERP v2.4.0
        </p>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar fijo (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar móvil */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-sidebar shadow-xl">
            <button
              aria-label="Cerrar menú"
              className="absolute right-3 top-4 rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur md:px-6">
          <button
            aria-label="Abrir menú"
            className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar productos, facturas o proveedores..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5 md:gap-3">
            <button className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:flex">
              <Building2 className="size-4 text-accent" />
              {usuarioActual.sucursal}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>

            <button
              aria-label="Ayuda"
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <HelpCircle className="size-5" />
            </button>

            <button
              aria-label="Notificaciones"
              className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent ring-2 ring-card" />
            </button>

            <div className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2">
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  {usuarioActual.iniciales}
                </AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium text-foreground">{usuarioActual.nombre}</p>
                <p className="text-xs text-muted-foreground">{usuarioActual.rol}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
