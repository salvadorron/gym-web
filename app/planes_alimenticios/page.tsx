"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NutritionPlanForm } from "@/components/ui/nutritional-plan"
import splash from '../../public/2.webp';
// Datos de ejemplo
const initialMealPlans = [
  {
    id: 1,
    clientName: "Juan Pérez",
    planType: "Pérdida de peso",
    calories: 2000,
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    status: "Activo",
  },
  {
    id: 2,
    clientName: "Ana García",
    planType: "Ganancia muscular",
    calories: 3000,
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    status: "Finalizado",
  },
  {
    id: 3,
    clientName: "Pedro López",
    planType: "Mantenimiento",
    calories: 2500,
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    status: "Pendiente",
  },
]

const clients = [
  { id: "1", name: "Juan Pérez" },
  { id: "2", name: "Ana García" },
  { id: "3", name: "Pedro López" },
  { id: "4", name: "María Rodríguez" },
  { id: "5", name: "Carlos Sánchez" },
]

export default function PlanesAlimenticiosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mealPlans, setMealPlans] = useState(initialMealPlans)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreatePlan = (newPlan: any) => {
    const client = clients.find((c) => c.id === newPlan.clientId)
    const plan = {
      id: mealPlans.length + 1,
      clientName: client?.name || "Cliente Desconocido",
      planType: newPlan.goalType,
      calories: Number.parseInt(newPlan.dailyCalories),
      startDate: newPlan.startDate,
      endDate: newPlan.endDate || "No especificada",
      status: "Activo",
    }
    setMealPlans([...mealPlans, plan])
    setIsDialogOpen(false)
  }

  const filteredPlans = mealPlans.filter(
    (plan) =>
      plan.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.planType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6 p-4 pt-24 min-h-screen" style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
      <Card className="p-6 bg-gray-800 border-border">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Planes Alimenticios</h1>
            <p className="text-gray-400">Gestiona los planes alimenticios de tus clientes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-background border-border">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Plan Nutricional</DialogTitle>
                <DialogDescription>
                  Completa el formulario para crear un nuevo plan nutricional para tu cliente.
                </DialogDescription>
              </DialogHeader>
              <NutritionPlanForm onSubmit={handleCreatePlan} clients={clients} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar planes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border text-white"
              />
            </div>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="weight-loss">Pérdida de peso</SelectItem>
              <SelectItem value="muscle-gain">Ganancia muscular</SelectItem>
              <SelectItem value="maintenance">Mantenimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-900/50">
              <TableRow>
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Tipo de Plan</TableHead>
                <TableHead className="text-white">Calorías</TableHead>
                <TableHead className="text-white">Fecha Inicio</TableHead>
                <TableHead className="text-white">Fecha Fin</TableHead>
                <TableHead className="text-white">Estado</TableHead>
                <TableHead className="text-white">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium text-white">{plan.clientName}</TableCell>
                  <TableCell className="text-white">{plan.planType}</TableCell>
                  <TableCell className="text-white">{plan.calories} kcal</TableCell>
                  <TableCell className="text-white">{plan.startDate}</TableCell>
                  <TableCell className="text-white">{plan.endDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                      ${
                        plan.status === "Activo"
                          ? "bg-green-500/20 text-green-500"
                          : plan.status === "Finalizado"
                            ? "bg-gray-500/20 text-gray-500"
                            : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-background">
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

