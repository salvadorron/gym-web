'use client'

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
import { User } from "@/lib/definitions"
import { assignNutritionalPlan } from "@/lib/actions"


export default function Nutritional({ users }: { users: User[] }) {
const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleCreatePlan = async (newPlan: any) => {
    const user = JSON.parse(newPlan.user);

    const plan = {
      userId: user.id.toString(),
      planName: newPlan.planName,
      planType: newPlan.goalType,
      dinner: newPlan.dinner,
      breakfast: newPlan.breakfast,
      lunch: newPlan.lunch,
      snacks: newPlan.snacks,
      calories: newPlan.dailyCalories,
      startDate: newPlan.startDate,
      endDate: newPlan.endDate || "No especificada",
      status: "Activo",
    }

    try{
      const response = await assignNutritionalPlan(plan);
      console.log(response)
    }catch(err){
      console.log(err)
    }
    console.log(plan)
    setIsDialogOpen(false)
  }

  const plans = users.filter(user => user.nutritional_plan)

  const filteredPlans = plans.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nutritional_plan?.planType.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <Button className="bg-blue-900/50 hover:bg-blue-800/50">
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
              <NutritionPlanForm onSubmit={handleCreatePlan} clients={users} />
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
                className="pl-10 bg-background text-black border-border"
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-white">{user.name}</TableCell>
                  <TableCell className="text-white">{getTypePlan(user.nutritional_plan?.planType)}</TableCell>
                  <TableCell className="text-white">{user.nutritional_plan?.calories} kcal</TableCell>
                  <TableCell className="text-white">{user.nutritional_plan?.startDate ? new Date(user.nutritional_plan.startDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell className="text-white">{user.nutritional_plan?.endDate ? new Date(user.nutritional_plan?.endDate).toLocaleDateString() : ''}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}


function getTypePlan(value: string | undefined) {

  switch(value){
    case "weight-loss": return "Pérdida de peso"
    case "muscle-gain": return 'Ganancia muscular'
    case "maintenance": return 'Mantenimiento'
    default: return 'Todos los tipos' 
  }
}