import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  ShoppingCart,
  Store,
  Truck,
  BrainCircuit,
  FileBarChart,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inventario", href: "/inventario", icon: Package },
  { label: "Movimientos", href: "/movimientos", icon: ArrowLeftRight },
  { label: "Compras", href: "/compras", icon: ShoppingCart },
  { label: "Ventas / POS", href: "/pos", icon: Store },
  { label: "Proveedores", href: "/proveedores", icon: Truck },
  { label: "ML Predictivo", href: "/ml", icon: BrainCircuit },
  { label: "Reportes", href: "/reportes", icon: FileBarChart },
  { label: "Usuarios", href: "/usuarios", icon: Users },
  { label: "Configuración", href: "/configuracion", icon: Settings },
]
