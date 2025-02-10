"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, UserPlus } from "lucide-react"
import splash from '../../public/2.webp';
// Datos de ejemplo
const clients = [
  {
    id: 1,
    name: "Juan Pérez",
    plan: "Premium",
    trainer: "Carlos González",
    startDate: "2024-01-15",
    status: "Activo",
    progress: 75,
  },
  {
    id: 2,
    name: "María García",
    plan: "Básico",
    trainer: "Ana Martínez",
    startDate: "2024-02-20",
    status: "Inactivo",
    progress: 25,
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    plan: "Premium",
    trainer: "Luis Sánchez",
    startDate: "2024-03-10",
    status: "Activo",
    progress: 90,
  },
  {
    id: 4,
    name: "Ana Martínez",
    plan: "Estándar",
    trainer: "Carlos González",
    startDate: "2024-04-05",
    status: "Pendiente",
    progress: 50,
  },
  {
    id: 5,
    name: "Luis Sánchez",
    plan: "Premium",
    trainer: "Ana Martínez",
    startDate: "2024-05-12",
    status: "Activo",
    progress: 100,
  },
]

export default function ParticipantesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = planFilter === "all" || client.plan === planFilter
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesPlan && matchesStatus
  })

  const generateReport = () => {
    // Lógica para generar reporte
    console.log("Generando reporte...")
  }

  return (
    <div className="space-y-6 pt-24 min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
      <Card className="p-6 bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl text-white font-bold">Gestión de Clientes</h1>
            <p className="text-gray-400">Administra y monitorea el progreso de tus clientes</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-white"
              />
            </div>
          </div>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Filtrar por plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los planes</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Estándar">Estándar</SelectItem>
              <SelectItem value="Básico">Básico</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={generateReport} className="border-border">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-900/50 text-white">
              <TableRow>
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Plan</TableHead>
                <TableHead className="text-white">Entrenador</TableHead>
                <TableHead className="text-white">Fecha de Inicio</TableHead>
                <TableHead className="text-white">Estado</TableHead>
                <TableHead className="text-white">Progreso</TableHead>
                <TableHead className="text-white">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium text-white">{client.name}</TableCell>
                  <TableCell className="text-white">{client.plan}</TableCell>
                  <TableCell className="text-white">{client.trainer}</TableCell>
                  <TableCell className="text-white">{client.startDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                      ${
                        client.status === "Activo"
                          ? "bg-green-500/20 text-green-500"
                          : client.status === "Inactivo"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${client.progress}%` }} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="hover:bg-background text-white">
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

