"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Logo } from "@/components/erp/logo"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <Logo size="lg" showText={false} className="mb-4" />
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Iniciar Sesión</h1>
            <p className="mt-1.5 text-pretty text-sm text-muted-foreground">
              Bienvenido al sistema de gestión de Ferretería R&amp;R
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Correo Electrónico o Usuario
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="text"
                    defaultValue="r.rodriguez@ferreteria.com"
                    placeholder="nombre@empresa.com"
                    className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    defaultValue="ferreteria2024"
                    placeholder="••••••••"
                    className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 rounded border-input accent-accent"
                  />
                  Recordar mi sesión en este equipo
                </label>
              </div>

              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Entrar al Sistema
              </button>

              <a
                href="#"
                className="text-center text-sm font-medium text-accent transition-colors hover:underline"
              >
                ¿Olvidó su contraseña?
              </a>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Español (BO) / Bolivianos (Bs)
          </p>
        </div>
      </div>

      <footer className="border-t border-border px-4 py-5">
        <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Ayuda
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacidad
            </Link>
          </div>
          <p className="text-pretty">
            © 2024 FERRETERÍA R&amp;R S.R.L. — Sistema de Gestión de Inventarios y Ventas · v2.4.0 Estándar
          </p>
        </div>
      </footer>
    </main>
  )
}
