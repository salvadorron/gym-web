'use client'
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, CreditCard, DollarSign } from "lucide-react"
import splash from '../../public/2.webp';
import { User } from "@/lib/definitions"

export default function Payments({ users }: { users: User[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
  
    // //const filteredPayments = payments.filter((payment) => {
    //     const matchesSearch =
    //       payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //       payment.concept.toLowerCase().includes(searchTerm.toLowerCase())
    //     const matchesStatus =
    //       statusFilter === "all" || payment.membershipStatus.toLowerCase() === statusFilter.toLowerCase()
    //     return matchesSearch && matchesStatus
    //  // })
  
    //const totalPagado = payments.reduce((sum, payment) => sum + payment.amount, 0)
    //const membresiasActivas = payments.filter((p) => p.membershipStatus === "Activa").length
  
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
                <p className="text-2xl font-bold text-gray-300">${0}</p>
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
                <p className="text-2xl font-bold text-gray-300">{0}</p>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                return user.client?.payments.map(payment => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{payment.startDate.toLocaleString()}</TableCell>
                  <TableCell>{payment.endDate.toLocaleString()}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "active" ? "default" : "destructive"}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                </TableRow>
                ))
    })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
