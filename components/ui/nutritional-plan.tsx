"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "@/lib/definitions"

interface NutritionPlanFormProps {
  onSubmit: (plan: any) => void
  clients: User[]
}

export function NutritionPlanForm({ onSubmit, clients }: NutritionPlanFormProps) {
  const [plan, setPlan] = useState({
    user: undefined,
    planName: "",
    goalType: "",
    dailyCalories: "",
    startDate: "",
    endDate: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPlan((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setPlan((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(plan)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="bg-background-secondary border-border ">
        <CardHeader>
          <CardTitle>Crear Plan Nutricional</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user">Cliente</Label>
              <Select name="user" onValueChange={(value) => handleSelectChange("user", value)}>
                <SelectTrigger className="focus:ring-blue-900">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={JSON.stringify(client)}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="planName">Nombre del Plan</Label>
              <Input
                id="planName"
                name="planName"
                value={plan.planName}
                onChange={handleChange}
                className=" border-border focus-visible:ring-blue-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalType">Tipo de Objetivo</Label>
              <Select name="goalType" onValueChange={(value) => handleSelectChange("goalType", value)}>
                <SelectTrigger className="border-border focus:ring-blue-900">
                  <SelectValue  placeholder="Seleccionar objetivo" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="weight-loss">Pérdida de peso</SelectItem>
                  <SelectItem value="muscle-gain">Ganancia muscular</SelectItem>
                  <SelectItem value="maintenance">Mantenimiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyCalories">Calorías Diarias</Label>
              <Input
                id="dailyCalories"
                name="dailyCalories"
                type="number"
                value={plan.dailyCalories}
                onChange={handleChange}
                className="border-border focus-visible:ring-blue-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={plan.startDate}
                onChange={handleChange}
                className="border-border focus-visible:ring-blue-900 "
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={plan.endDate}
                onChange={handleChange}
                className="border-border focus-visible:ring-blue-900 "
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="breakfast">Desayuno</Label>
            <Textarea
              id="breakfast"
              name="breakfast"
              value={plan.breakfast}
              onChange={handleChange}
              className="border-border focus-visible:ring-blue-900 "
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lunch">Almuerzo</Label>
            <Textarea
              id="lunch"
              name="lunch"
              value={plan.lunch}
              onChange={handleChange}
              className="border-border focus-visible:ring-blue-900 "
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dinner">Cena</Label>
            <Textarea
              id="dinner"
              name="dinner"
              value={plan.dinner}
              onChange={handleChange}
              className="border-border focus-visible:ring-blue-900 "
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="snacks">Snacks</Label>
            <Textarea
              id="snacks"
              name="snacks"
              value={plan.snacks}
              onChange={handleChange}
              className="border-border focus-visible:ring-blue-900 "
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-blue-800/90 hover:bg-blue-700 ">
            Crear Plan Nutricional
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

