"use client"

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  ComposedChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { ventasMensuales, ventasPorCategoria, proyeccionDemanda } from "@/lib/erp-data"

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--foreground)",
  fontSize: 12,
  boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
}

export function VentasChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={ventasMensuales} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="ventasFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="mes" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) => `${v / 1000}k`}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number) => [`Bs ${v.toLocaleString("es-BO")}`, "Ventas"]}
        />
        <Area
          type="monotone"
          dataKey="ventas"
          stroke="var(--accent)"
          strokeWidth={2.5}
          fill="url(#ventasFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ProyeccionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={proyeccionDemanda} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="intervaloFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--info)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--info)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="mes" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="plainline" />
        <Area
          type="monotone"
          dataKey="intervalo"
          name="Intervalo de confianza"
          stroke="transparent"
          fill="url(#intervaloFill)"
        />
        <Line
          type="monotone"
          dataKey="real"
          name="Demanda real"
          stroke="var(--accent)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          connectNulls={false}
        />
        <Line
          type="monotone"
          dataKey="prediccion"
          name="Predicción IA"
          stroke="var(--info)"
          strokeWidth={2.5}
          strokeDasharray="5 4"
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

const catColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

export function CategoriasChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={ventasPorCategoria}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} fontSize={12} unit="%" />
        <YAxis
          type="category"
          dataKey="categoria"
          stroke="var(--muted-foreground)"
          tickLine={false}
          axisLine={false}
          fontSize={11}
          width={96}
        />
        <Tooltip cursor={{ fill: "var(--muted)" }} contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Participación"]} />
        <Bar dataKey="valor" radius={[0, 6, 6, 0]} barSize={20}>
          {ventasPorCategoria.map((_, i) => (
            <Cell key={i} fill={catColors[i % catColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
