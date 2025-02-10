'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";


export default function TrainingForm() {
     const [plans, setPlans] = useState([])
      const [newPlan, setNewPlan] = useState({ name: "", price: "", duration: "Mensual", classes: [] as string[], features: "" })
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewPlan((prev) => ({ ...prev, [name]: value }))
      }
    
      const handleDurationChange = (value: string) => {
        setNewPlan((prev) => ({ ...prev, duration: value }))
      }
    
      const handleClassesChange = (selectedClasses: string[]) => {
        setNewPlan((prev) => ({ ...prev, classes: selectedClasses }))
      }
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newPlanWithId = {
          ...newPlan,
          id: plans.length + 1,
          price: Number.parseFloat(newPlan.price),
          features: newPlan.features.split(",").map((feature) => feature.trim()),
        }
        
        setNewPlan({ name: "", price: "", duration: "Mensual", classes: [] as string[], features: "" })
        setIsDialogOpen(false)
      }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">Agregar Clase</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nueva Clase o Ejercicio</DialogTitle>
              <DialogDescription>Ingrese los detalles del nuevo plan de membresía.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre de la Clase</Label>
                <Input className="focus-visible:ring-blue-800" id="name" name="name" value={newPlan.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="price">Capacidad</Label>
                <Input className="focus-visible:ring-blue-800"
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={newPlan.price}
                  onChange={handleInputChange}
                  required />
              </div>
              <div>
                <Label htmlFor="duration">Duración</Label>
                <Select name="duration" value={newPlan.duration} onValueChange={handleDurationChange}>
                  <SelectTrigger className="focus:ring-blue-800">
                    <SelectValue placeholder="Seleccione la duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensual">Mensual</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
                <Label>Instructor</Label>
                <MultiSelect
                  options={availableClasses}
                  selected={newPlan.classes}
                  onChange={handleClassesChange}
                  placeholder="Seleccionar clases..." />
              </div> */}
              <div>
                <Label htmlFor="features">Características (separadas por comas)</Label>
                <Input className="focus-visible:ring-blue-800" id="features" name="features" value={newPlan.features} onChange={handleInputChange} required />
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800" type="submit">Guardar Plan</Button>
            </form>
          </DialogContent>
        </Dialog>
    )
}