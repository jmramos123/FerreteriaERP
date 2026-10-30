import Image from "next/image"
import Link from "next/link"
import { PageHeader } from "@/components/erp/page-header"
import { StatusBadge } from "@/components/erp/status-badge"
import { UploadCloud, X, Save, ArrowUpRight, ArrowDownRight, RefreshCcw, Barcode } from "lucide-react"

function Field({
  label,
  defaultValue,
  placeholder,
  textarea,
  suffix,
}: {
  label: string
  defaultValue?: string
  placeholder?: string
  textarea?: boolean
  suffix?: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative">
        {textarea ? (
          <textarea
            defaultValue={defaultValue}
            placeholder={placeholder}
            rows={3}
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
        ) : (
          <input
            defaultValue={defaultValue}
            placeholder={placeholder}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
        )}
        {suffix}
      </div>
    </div>
  )
}

const movimientosProducto = [
  { label: "Recepción OC #4492", delta: 10, tiempo: "Hace 2 días" },
  { label: "Venta Ticket #A-891", delta: -2, tiempo: "Hace 3 días" },
  { label: "Venta Ticket #A-885", delta: -1, tiempo: "Hace 5 días" },
  { label: "Ajuste de Inventario", delta: 5, tiempo: "12 May 2024" },
  { label: "Venta Ticket #A-870", delta: -3, tiempo: "10 May 2024" },
]

export default function NuevoProductoPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Inventario > Nuevo Producto"
        title="Gestión de Producto"
        description="Configura la información técnica, precios y existencias de tus artículos."
        actions={
          <>
            <Link
              href="/inventario"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <X className="size-4" />
              Cancelar
            </Link>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Save className="size-4" />
              Guardar Cambios
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Columna principal */}
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">Información General</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Datos básicos y clasificación del producto en el catálogo.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nombre del Producto" defaultValue="Taladro Percutor 20V DeWalt" />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Categoría</label>
                <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring">
                  <option>Herramientas Eléctricas</option>
                  <option>Herramientas Manuales</option>
                  <option>Construcción</option>
                  <option>Pinturería</option>
                </select>
              </div>
              <Field label="SKU (Stock Keeping Unit)" defaultValue="HER-7742-XP" />
              <Field
                label="Código de Barras"
                defaultValue="7840123456789"
                suffix={<Barcode className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />}
              />
              <div className="sm:col-span-2">
                <Field
                  label="Descripción Detallada"
                  textarea
                  defaultValue="Taladro percutor inalámbrico con motor sin escobillas (brushless), incluye 2 baterías de 2.0Ah y cargador rápido. Mandril metálico de alta resistencia."
                />
              </div>
              <div className="sm:col-span-2">
                <Field label="Proveedor Principal" defaultValue="Distribuidora Nacional de Herramientas" />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-semibold text-foreground">Precios e Inventario</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Control de costos, márgenes de utilidad y gestión de existencias.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Precio de Compra (Bs)" defaultValue="850.00" />
              <Field label="Precio de Venta (Bs)" defaultValue="1200.00" />
              <Field label="Stock Actual" defaultValue="15" />
              <Field label="Stock Mínimo (Alerta)" defaultValue="5" />
              <div className="sm:col-span-2">
                <Field label="Ubicación en Almacén" defaultValue="Estantería C-12" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-success/8 px-4 py-3">
              <span className="text-sm font-medium text-foreground">Margen Bruto</span>
              <span className="text-lg font-semibold text-success">29.17%</span>
            </div>
          </section>
        </div>

        {/* Columna lateral */}
        <div className="space-y-4">
          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 font-semibold text-foreground">Galería de Imágenes</h2>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background py-8 text-center">
              <UploadCloud className="mb-2 size-7 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Haz clic o arrastra una imagen</p>
              <p className="text-xs text-muted-foreground">Soporta JPG, PNG de hasta 5MB</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src="/images/taladro-producto.png"
                    alt="Taladro Percutor 20V DeWalt"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-semibold text-foreground">Últimos Movimientos</h2>
              <button className="text-xs font-medium text-accent hover:underline">Ver todo</button>
            </div>
            <div className="divide-y divide-border">
              {movimientosProducto.map((m) => {
                const up = m.delta > 0
                return (
                  <div key={m.label} className="flex items-center gap-3 px-5 py-3">
                    <div className={`flex size-7 shrink-0 items-center justify-center rounded-full ${up ? "bg-success/12 text-success" : "bg-info/12 text-info"}`}>
                      {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.tiempo}</p>
                    </div>
                    <span className={`text-sm font-semibold ${up ? "text-success" : "text-info"}`}>
                      {up ? "+" : ""}
                      {m.delta} u.
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-xl border border-accent/30 bg-accent/8 p-5">
            <div className="mb-2 flex items-center gap-2">
              <RefreshCcw className="size-4 text-accent" />
              <h2 className="text-sm font-semibold text-foreground">Sincronización Multi-Sucursal</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Este producto está disponible en 2 sucursales. Los cambios de precio se aplicarán de forma global,
              mientras que el stock se gestiona por ubicación.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <StatusBadge tone="accent">Sucursal Central</StatusBadge>
              <StatusBadge tone="neutral">Sucursal El Alto</StatusBadge>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
