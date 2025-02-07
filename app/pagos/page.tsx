"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, Timer, AlertCircle } from "lucide-react"
import splash from '../../public/2.webp';
interface Payment {
  id: string
  startDate: string
  endDate: string
  amount: number
  concept: string
  membershipStatus: "Activa" | "Próxima a vencer" | "Vencida"
  paymentMethod: "Tarjeta de Crédito" | "Efectivo" | "Transferencia"
  paymentStatus: "Pagado" | "Pendiente" | "Fallido"
}

const initialPayments: Payment[] = [
  {
    id: "1",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    amount: 500,
    concept: "Membresía Mensual Premium",
    membershipStatus: "Activa",
    paymentMethod: "Tarjeta de Crédito",
    paymentStatus: "Pagado",
  },
  {
    id: "2",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    amount: 500,
    concept: "Membresía Mensual Premium",
    membershipStatus: "Vencida",
    paymentMethod: "Efectivo",
    paymentStatus: "Pagado",
  },
  {
    id: "3",
    startDate: "2023-12-01",
    endDate: "2024-01-01",
    amount: 500,
    concept: "Membresía Mensual Premium",
    membershipStatus: "Vencida",
    paymentMethod: "Transferencia",
    paymentStatus: "Pagado",
  },
]

export default function PaymentsHistoryPage() {
  const [payments] = useState<Payment[]>(initialPayments)
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)
  const currentPayment = payments[0]

  const getMembershipStatusBadge = (status: Payment["membershipStatus"]) => {
    const variants = {
      Activa: "bg-green-500/10 text-green-500 border-green-500/20",
      "Próxima a vencer": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Vencida: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: Payment["paymentStatus"]) => {
    const variants = {
      Pagado: "bg-green-500/10 text-green-500 border-green-500/20",
      Pendiente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Fallido: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
    <div className="container mx-auto p-6 space-y-6" >
      <Card className="bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Historial de Membresía y Pagos</CardTitle>
          <CardDescription className="text-gray-400">
            Gestiona tu membresía y revisa tu historial de pagos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800 border-0">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Pagado</p>
                  <h4 className="text-2xl font-bold text-white">${totalPaid}</h4>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-0">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Timer className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Estado Membresía</p>
                  <h4 className="text-lg font-bold text-white">{currentPayment.membershipStatus}</h4>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-0">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Vence el</p>
                  <h4 className="text-lg font-bold text-white">{formatDate(currentPayment.endDate)}</h4>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-0">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-400">Fecha Inicio</TableHead>
                  <TableHead className="text-gray-400">Fecha Fin</TableHead>
                  <TableHead className="text-gray-400">Concepto</TableHead>
                  <TableHead className="text-gray-400">Monto</TableHead>
                  <TableHead className="text-gray-400">Estado Membresía</TableHead>
                  <TableHead className="text-gray-400">Método de Pago</TableHead>
                  <TableHead className="text-gray-400">Estado Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="border-slate-700">
                    <TableCell className="text-white">{formatDate(payment.startDate)}</TableCell>
                    <TableCell className="text-white">{formatDate(payment.endDate)}</TableCell>
                    <TableCell className="text-white">{payment.concept}</TableCell>
                    <TableCell className="text-white">${payment.amount}</TableCell>
                    <TableCell>{getMembershipStatusBadge(payment.membershipStatus)}</TableCell>
                    <TableCell className="text-white">{payment.paymentMethod}</TableCell>
                    <TableCell>{getPaymentStatusBadge(payment.paymentStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-500">Recordatorio</h4>
              <p className="text-sm text-yellow-500/90">
                Tu membresía actual vence el {formatDate(currentPayment.endDate)}. Recuerda renovar antes de la fecha de
                vencimiento para mantener acceso continuo a las instalaciones.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

