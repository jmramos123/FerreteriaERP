// Datos simulados (mock) coherentes con una ferretería boliviana.
// Todo es frontend, sin backend real.

export const empresa = {
  nombre: "Ferretería R&R",
  razonSocial: "FERRETERÍA R&R S.R.L.",
  version: "v2.4.0 Estándar",
  moneda: "Bs",
  pais: "Bolivia",
}

export const usuarioActual = {
  nombre: "Ricardo Rodríguez",
  rol: "Administrador",
  email: "r.rodriguez@ferreteria.com",
  iniciales: "RR",
  sucursal: "Sucursal Central",
}

export const sucursales = [
  {
    id: "central",
    nombre: "Sucursal Central",
    tipo: "Principal",
    direccion: "Av. Montes #1234, La Paz",
    impresora: "PRN-MAIN-01",
    estado: "Activa",
    reglas: "Consolidación automática habilitada",
  },
  {
    id: "elalto",
    nombre: "Sucursal El Alto",
    tipo: "Secundaria",
    direccion: "Calle 5, La Ceja, El Alto",
    impresora: "PRN-ALTO-02",
    estado: "Activa",
    reglas: "Consolidación automática habilitada",
  },
]

export type EstadoStock = "Crítico" | "Bajo" | "Saludable" | "Sin Stock"

export interface Producto {
  sku: string
  nombre: string
  actualizado: string
  categoria: string
  precio: number
  stock: number
  minimo: number
  estado: EstadoStock
}

export const productos: Producto[] = [
  {
    sku: "HER-442-BOL",
    nombre: "Martillo de Uña Curva 16oz Mango Fibra",
    actualizado: "2024-05-15",
    categoria: "Herramientas Manuales",
    precio: 85.5,
    stock: 4,
    minimo: 10,
    estado: "Crítico",
  },
  {
    sku: "PIN-901-LIT",
    nombre: "Pintura Látex Interior Blanca 4L",
    actualizado: "2024-05-18",
    categoria: "Pinturería",
    precio: 120.0,
    stock: 45,
    minimo: 20,
    estado: "Saludable",
  },
  {
    sku: "ELE-112-MET",
    nombre: "Cable Eléctrico Cobre 12AWG (m)",
    actualizado: "2024-05-10",
    categoria: "Electricidad",
    precio: 350.0,
    stock: 12,
    minimo: 15,
    estado: "Bajo",
  },
  {
    sku: "CON-556-TUB",
    nombre: 'Tubo PVC Sanitario 4" x 6m',
    actualizado: "2024-05-20",
    categoria: "Construcción",
    precio: 45.0,
    stock: 8,
    minimo: 5,
    estado: "Saludable",
  },
  {
    sku: "FER-002-TOR",
    nombre: 'Tornillo para Madera 2" (Bolsa 50u)',
    actualizado: "2024-05-19",
    categoria: "Ferretería General",
    precio: 25.0,
    stock: 120,
    minimo: 50,
    estado: "Saludable",
  },
  {
    sku: "HER-7742-XP",
    nombre: "Taladro Percutor 20V DeWalt Brushless",
    actualizado: "2024-05-21",
    categoria: "Herramientas Eléctricas",
    precio: 1200.0,
    stock: 15,
    minimo: 5,
    estado: "Saludable",
  },
  {
    sku: "CON-CEM-010",
    nombre: "Cemento Portland IP-40 50kg",
    actualizado: "2024-05-20",
    categoria: "Construcción",
    precio: 62.0,
    stock: 3,
    minimo: 30,
    estado: "Crítico",
  },
  {
    sku: "SEG-CAS-220",
    nombre: "Casco de Seguridad Industrial",
    actualizado: "2024-05-17",
    categoria: "Seguridad",
    precio: 45.9,
    stock: 0,
    minimo: 10,
    estado: "Sin Stock",
  },
  {
    sku: "FON-LLA-118",
    nombre: 'Llave de Paso PVC 1/2"',
    actualizado: "2024-05-16",
    categoria: "Fontanería",
    precio: 18.5,
    stock: 64,
    minimo: 25,
    estado: "Saludable",
  },
  {
    sku: "HER-SIE-088",
    nombre: 'Sierra Circular 7-1/4" 1800W',
    actualizado: "2024-05-22",
    categoria: "Herramientas Eléctricas",
    precio: 540.0,
    stock: 9,
    minimo: 8,
    estado: "Saludable",
  },
]

export const kpisDashboard = {
  totalProductos: 1240,
  bajoStock: 18,
  sinStock: 3,
  valorInventario: 145200,
}

export const ventasMensuales = [
  { mes: "Ene", ventas: 32400, meta: 30000 },
  { mes: "Feb", ventas: 28900, meta: 30000 },
  { mes: "Mar", ventas: 35600, meta: 32000 },
  { mes: "Abr", ventas: 41200, meta: 35000 },
  { mes: "May", ventas: 45280, meta: 38000 },
  { mes: "Jun", ventas: 39800, meta: 40000 },
]

export const ventasPorCategoria = [
  { categoria: "Construcción", valor: 38 },
  { categoria: "Herramientas", valor: 27 },
  { categoria: "Electricidad", valor: 16 },
  { categoria: "Pinturería", valor: 11 },
  { categoria: "Fontanería", valor: 8 },
]

export const movimientos = [
  {
    id: "MOV-7241",
    fecha: "24/05/2024",
    hora: "09:15 AM",
    producto: "Martillo de Acero 16oz Forjado",
    sku: "HER-MAR-001",
    tipo: "Entrada",
    cantidad: 50,
    sucursal: "Sucursal Central",
    usuario: "Carlos Mendoza",
    motivo: "Recepción de Orden de Compra #PO-882",
    referencia: "FACT-2024-991",
  },
  {
    id: "MOV-7242",
    fecha: "24/05/2024",
    hora: "10:30 AM",
    producto: "Taladro Percutor 20V Brushless",
    sku: "HER-TAL-042",
    tipo: "Salida",
    cantidad: 2,
    sucursal: "Sucursal Central",
    usuario: "Lucía Fernández",
    motivo: "Venta Ticket #A-891",
    referencia: "A-891",
  },
  {
    id: "MOV-7243",
    fecha: "23/05/2024",
    hora: "04:45 PM",
    producto: "Cemento Sol 42.5kg",
    sku: "CON-CEM-010",
    tipo: "Ajuste",
    cantidad: -3,
    sucursal: "Sucursal El Alto",
    usuario: "Roberto Gómez",
    motivo: "Ajuste por merma en almacén",
    referencia: "AJU-1182",
  },
  {
    id: "MOV-7244",
    fecha: "23/05/2024",
    hora: "11:20 AM",
    producto: "Pintura Látex Mate Blanca 5G",
    sku: "PIN-LAT-B05",
    tipo: "Entrada",
    cantidad: 20,
    sucursal: "Sucursal Central",
    usuario: "Carlos Mendoza",
    motivo: "Recepción de Orden de Compra #PO-879",
    referencia: "FACT-2024-988",
  },
  {
    id: "MOV-7245",
    fecha: "22/05/2024",
    hora: "02:00 PM",
    producto: 'Sierra Circular 7-1/4" 1800W',
    sku: "HER-SIE-088",
    tipo: "Salida",
    cantidad: 1,
    sucursal: "Sucursal El Alto",
    usuario: "Ana Martínez",
    motivo: "Venta Ticket #A-870",
    referencia: "A-870",
  },
]

export const ordenesCompra = [
  {
    id: "OC-2024-001",
    fecha: "12/10/2023",
    proveedor: "Indumetal S.A.",
    items: 12,
    monto: 1540.5,
    estado: "Recibido",
  },
  {
    id: "OC-2024-002",
    fecha: "14/10/2023",
    proveedor: "Suministros El Cóndor",
    items: 5,
    monto: 890.0,
    estado: "Pendiente",
  },
  {
    id: "OC-2024-003",
    fecha: "15/10/2023",
    proveedor: "Pernos y Más S.R.L.",
    items: 45,
    monto: 2300.2,
    estado: "Pendiente",
  },
  {
    id: "OC-2024-004",
    fecha: "16/10/2023",
    proveedor: "Distribuidora Central",
    items: 2,
    monto: 450.0,
    estado: "Cancelado",
  },
  {
    id: "OC-2024-005",
    fecha: "18/10/2023",
    proveedor: "Herramientas Premium",
    items: 150,
    monto: 12450.0,
    estado: "Recibido",
  },
]

export const proveedores = [
  {
    id: "prov-1",
    nombre: "Ferretería Industrial El Cóndor",
    categoria: "Construcción",
    rating: 4.8,
    telefono: "+591 789 45612",
    saldo: 15420.5,
    ultimaCompra: "2024-05-15",
    contacto: "Carlos Méndez (Gerente Comercial)",
    email: "cmendez@elcondor.com",
    direccion: "Av. Juan de la Rosa #452, Cochabamba",
    creditoMaximo: 100000,
    proximoVencimiento: "25 Mayo, 2024",
  },
  {
    id: "prov-2",
    nombre: "Suministros Globales S.R.L.",
    categoria: "Herramientas Eléctricas",
    rating: 4.2,
    telefono: "+591 2 4455887",
    saldo: 2100.2,
    ultimaCompra: "2024-05-10",
    contacto: "María Vargas",
    email: "ventas@globales.com",
    direccion: "Av. 6 de Agosto #1200, La Paz",
    creditoMaximo: 50000,
    proximoVencimiento: "30 Mayo, 2024",
  },
  {
    id: "prov-3",
    nombre: "Tech & Tools Bolivia",
    categoria: "Herramientas Manuales",
    rating: 4.9,
    telefono: "+591 712 33445",
    saldo: 0,
    ultimaCompra: "2024-05-18",
    contacto: "Jorge Salinas",
    email: "contacto@techtools.bo",
    direccion: "Calle Comercio #88, Santa Cruz",
    creditoMaximo: 75000,
    proximoVencimiento: "—",
  },
  {
    id: "prov-4",
    nombre: "Cerámicas del Oriente",
    categoria: "Acabados",
    rating: 4.0,
    telefono: "+591 3 9876543",
    saldo: 12300.75,
    ultimaCompra: "2023-12-10",
    contacto: "Patricia Roca",
    email: "info@ceramicasoriente.com",
    direccion: "Parque Industrial PI-12, Santa Cruz",
    creditoMaximo: 60000,
    proximoVencimiento: "10 Junio, 2024",
  },
  {
    id: "prov-5",
    nombre: "Distribuidora Nacional de Herramientas",
    categoria: "Herramientas Eléctricas",
    rating: 4.6,
    telefono: "+591 2 2998877",
    saldo: 8750.0,
    ultimaCompra: "2024-05-12",
    contacto: "Luis Pereira",
    email: "compras@dnh.com.bo",
    direccion: "Av. Buenos Aires #340, La Paz",
    creditoMaximo: 90000,
    proximoVencimiento: "05 Junio, 2024",
  },
  {
    id: "prov-6",
    nombre: "Pernos y Más S.R.L.",
    categoria: "Ferretería General",
    rating: 4.3,
    telefono: "+591 4 4567890",
    saldo: 3400.0,
    ultimaCompra: "2024-05-08",
    contacto: "Sandra Quispe",
    email: "ventas@pernosymas.com",
    direccion: "Av. América #560, Cochabamba",
    creditoMaximo: 40000,
    proximoVencimiento: "20 Junio, 2024",
  },
]

export const carritoPOS = [
  {
    sku: "SKU-7721",
    producto: "Martillo Galponero 20oz Premium",
    precio: 45.5,
    cantidad: 2,
    stock: 15,
  },
  {
    sku: "SKU-1029",
    producto: "Taladro Percutor DeWalt 20V Max",
    precio: 890.0,
    cantidad: 1,
    stock: 4,
  },
  {
    sku: "SKU-4402",
    producto: 'Pack Tornillos Madera 2" (50 unidades)',
    precio: 12.0,
    cantidad: 5,
    stock: 120,
  },
]

export const recomendacionesML = [
  {
    prioridad: "Alta",
    producto: "Cemento Portland 50kg",
    motivo: "Pico estacional (Construcción Verano)",
    accion: "Comprar 120 unidades",
  },
  {
    prioridad: "Sugerido",
    producto: "Pintura Látex Blanca 20L",
    motivo: "Tendencia de crecimiento +15%",
    accion: "Aumentar stock en 45 unidades",
  },
  {
    prioridad: "Sugerido",
    producto: 'Tubería PVC 1/2"',
    motivo: "Demanda estable pero stock bajo",
    accion: "Reponer 200 unidades",
  },
  {
    prioridad: "Liquidación",
    producto: "Calentador de Agua 50L",
    motivo: "Fin de temporada (Invierno) — Sobre-stock",
    accion: "Liquidación sugerida",
  },
]

export const proyeccionDemanda = [
  { mes: "Ene", real: 820, prediccion: 800, intervalo: 900 },
  { mes: "Feb", real: 760, prediccion: 780, intervalo: 880 },
  { mes: "Mar", real: 910, prediccion: 900, intervalo: 1000 },
  { mes: "Abr", real: 1020, prediccion: 980, intervalo: 1100 },
  { mes: "May", real: 1120, prediccion: 1080, intervalo: 1200 },
  { mes: "Jun", real: null, prediccion: 1180, intervalo: 1320 },
  { mes: "Jul", real: null, prediccion: 1240, intervalo: 1400 },
  { mes: "Ago", real: null, prediccion: 1160, intervalo: 1320 },
]

export const mapaCalor = [
  {
    categoria: "Materiales de Obra",
    valores: ["ALTA", "ALTA", "MEDIA", "BAJA", "BAJA"],
  },
  {
    categoria: "Pinturas",
    valores: ["MEDIA", "BAJA", "MEDIA", "ALTA", "ALTA"],
  },
  {
    categoria: "Herramientas Eléctricas",
    valores: ["MEDIA", "MEDIA", "MEDIA", "MEDIA", "MEDIA"],
  },
  {
    categoria: "Fontanería",
    valores: ["BAJA", "BAJA", "MEDIA", "MEDIA", "ALTA"],
  },
  {
    categoria: "Electricidad",
    valores: ["MEDIA", "MEDIA", "BAJA", "BAJA", "MEDIA"],
  },
]

export const ventasDiarias = [
  {
    referencia: "F-29304",
    fecha: "2024-05-20",
    cliente: "Construcciones El Sol",
    sucursal: "Sucursal Central",
    monto: 12450.0,
    estado: "Completado",
  },
  {
    referencia: "F-29305",
    fecha: "2024-05-20",
    cliente: "Juan Pérez",
    sucursal: "Sucursal El Alto",
    monto: 450.2,
    estado: "Completado",
  },
  {
    referencia: "F-29306",
    fecha: "2024-05-21",
    cliente: "Ferretería La Amistad",
    sucursal: "Sucursal Central",
    monto: 3200.0,
    estado: "Pendiente",
  },
  {
    referencia: "F-29307",
    fecha: "2024-05-21",
    cliente: "María Rodríguez",
    sucursal: "Sucursal Central",
    monto: 89.9,
    estado: "Completado",
  },
  {
    referencia: "F-29308",
    fecha: "2024-05-22",
    cliente: "Edificaciones Modernas",
    sucursal: "Sucursal El Alto",
    monto: 45000.0,
    estado: "Anulado",
  },
]

export const plantillasReporte = [
  {
    grupo: "Ventas",
    items: [
      { nombre: "Ventas Diarias Detalladas", desc: "Registro completo de transacciones por día." },
      { nombre: "Ventas por Sucursal", desc: "Comparativa de rendimiento entre locales." },
    ],
  },
  {
    grupo: "Inventario",
    items: [
      { nombre: "Valoración de Inventario", desc: "Costo total y precio de venta del stock actual." },
      { nombre: "Productos Bajo Stock", desc: "Listado de artículos para reposición." },
    ],
  },
  {
    grupo: "Proveedores",
    items: [{ nombre: "Desempeño de Proveedores", desc: "Tiempos de entrega y cumplimiento." }],
  },
  {
    grupo: "Finanzas",
    items: [{ nombre: "Estado de Resultados (P&L)", desc: "Resumen financiero de ingresos y gastos." }],
  },
]

export const usuarios = [
  {
    nombre: "Ricardo Rodríguez",
    email: "r.rodriguez@ferreteria.com",
    rol: "Administrador",
    sucursal: "Sucursal Central",
    ultimoAcceso: "Hace 5 minutos",
    iniciales: "RR",
    estado: "Activo",
  },
  {
    nombre: "Marta Sánchez",
    email: "m.sanchez@ferreteria.com",
    rol: "Vendedor",
    sucursal: "Sucursal El Alto",
    ultimoAcceso: "Hace 2 horas",
    iniciales: "MS",
    estado: "Activo",
  },
  {
    nombre: "Carlos Pinedo",
    email: "c.pinedo@ferreteria.com",
    rol: "Almacén",
    sucursal: "Sucursal Central",
    ultimoAcceso: "Ayer, 18:45",
    iniciales: "CP",
    estado: "Activo",
  },
  {
    nombre: "Lucía Méndez",
    email: "l.mendez@ferreteria.com",
    rol: "Vendedor",
    sucursal: "Sucursal Central",
    ultimoAcceso: "Hace 15 minutos",
    iniciales: "LM",
    estado: "Activo",
  },
  {
    nombre: "Jorge Vaca",
    email: "j.vaca@ferreteria.com",
    rol: "Auditor",
    sucursal: "Sucursal El Alto",
    ultimoAcceso: "05 May 2024",
    iniciales: "JV",
    estado: "Suspendido",
  },
]

export const actividadReciente = [
  { tipo: "Venta Registrada", detalle: "FAC-4592", tiempo: "Hoy, 10:24 AM", color: "success" },
  { tipo: "Inicio de Sesión", detalle: "Sucursal Central", tiempo: "Hoy, 08:15 AM", color: "info" },
  { tipo: "Cambio de Stock", detalle: "SKU-8821", tiempo: "Ayer, 04:30 PM", color: "warning" },
]

export function formatBs(value: number): string {
  return "Bs " + value.toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
