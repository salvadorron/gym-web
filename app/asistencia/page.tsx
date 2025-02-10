"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import splash from '../../public/2.webp';
// Datos de ejemplo
const attendanceData = [
  {
    id: 1,
    name: "Juan Pérez",
    schedule: "07:00 AM",
    status: "present",
    checkin: "07:05 AM",
  },
  { id: 2, name: "María García", schedule: "08:00 AM", status: "absent", checkin: "" },
  { id: 3, name: "Carlos Rodríguez", schedule: "09:00 AM", status: "present", checkin: "09:10 AM" },
  { id: 4, name: "Ana Martínez", schedule: "10:00 AM", status: "pending", checkin: "" },
  { id: 5, name: "Luis Sánchez", schedule: "11:00 AM", status: "present", checkin: "11:02 AM" },
]

export default function AsistenciaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6 min-h-screen p-4 pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
      <Card className="p-6 bg-gray-800 border-border">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Control de Asistencia</h1>
          <p className="text-gray-400">Gestiona la asistencia de tus clientes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-1 p-4 bg-background border-border">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          </Card>

          <Card className="lg:col-span-2 p-4 bg-background border-border">
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Horario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.schedule}</TableCell>
                      <TableCell>
                        {record.status === "present" ? (
                          <span className="flex items-center text-green-500">
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Presente
                          </span>
                        ) : record.status === "absent" ? (
                          <span className="flex items-center text-red-500">
                            <XCircle className="mr-2 h-4 w-4" />
                            Ausente
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-500">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Pendiente
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{record.checkin}</TableCell>
                      <TableCell>
                        <Select defaultValue={record.status}>
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Cambiar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Presente</SelectItem>
                            <SelectItem value="absent">Ausente</SelectItem>
                            <SelectItem value="pending">Pendiente</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}

