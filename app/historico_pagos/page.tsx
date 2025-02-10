"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, DollarSign, AlertTriangle } from "lucide-react"
import splash from '../../public/2.webp';
// Datos de ejemplo
const payments = [
  {
    id: 1,
    clientName: "Juan Pérez",
    startDate: "31 de enero de 2024",
    endDate: "29 de febrero de 2024",
    concept: "Membresía Mensual Premium",
    amount: 500,
    membershipStatus: "Activa",
    paymentMethod: "Tarjeta de Crédito",
    paymentStatus: "Pagado",
  },
  {
    id: 2,
    clientName: "María García",
    startDate: "31 de diciembre de 2023",
    endDate: "31 de enero de 2024",
    concept: "Membresía Mensual Premium",
    amount: 500,
    membershipStatus: "Vencida",
    paymentMethod: "Efectivo",
    paymentStatus: "Pagado",
  },
  {
    id: 3,
    clientName: "Carlos López",
    startDate: "30 de noviembre de 2023",
    endDate: "31 de diciembre de 2023",
    concept: "Membresía Mensual Premium",
    amount: 500,
    membershipStatus: "Vencida",
    paymentMethod: "Transferencia",
    paymentStatus: "Pagado",
  },
  // Más datos de ejemplo...
]

export default function PagosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.concept.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || payment.membershipStatus.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const totalPagado = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const membresiasActivas = payments.filter((p) => p.membershipStatus === "Activa").length

  return (
    <div className="space-y-6 p-4 text-white min-h-screen " style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
      <div>
        <h1 className="text-2xl font-bold text-gray-300">Historial de Membresía y Pagos</h1>
        <p className="text-white">Gestiona tu membresía y revisa tu historial de pagos</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/20 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-white">Total Pagado</p>
              <p className="text-2xl font-bold text-gray-300">${totalPagado}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-green-500/20 p-3">
              <CreditCard className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-white">Membresías Activas</p>
              <p className="text-2xl font-bold text-gray-300">{membresiasActivas}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-purple-500/20 p-3">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-white">Próximo Vencimiento</p>
              <p className="text-2xl font-bold text-gray-300">29 de febrero de 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar por nombre o concepto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] text-black">
            <SelectValue placeholder="Estado de membresía" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="activa">Activa</SelectItem>
            <SelectItem value="vencida">Vencida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Cliente</TableHead>
              <TableHead className="text-white">Fecha Inicio</TableHead>
              <TableHead className="text-white">Fecha Fin</TableHead>
              <TableHead className="text-white">Concepto</TableHead>
              <TableHead className="text-white">Monto</TableHead>
              <TableHead className="text-white">Estado Membresía</TableHead>
              <TableHead className="text-white">Método de Pago</TableHead>
              <TableHead className="text-white">Estado Pago</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.clientName}</TableCell>
                <TableCell>{payment.startDate}</TableCell>
                <TableCell>{payment.endDate}</TableCell>
                <TableCell>{payment.concept}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>
                  <Badge variant={payment.membershipStatus === "Activa" ? "default" : "destructive"}>
                    {payment.membershipStatus}
                  </Badge>
                </TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                    {payment.paymentStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

