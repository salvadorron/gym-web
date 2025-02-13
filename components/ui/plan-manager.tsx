"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import splash from '../../public/2.webp';
import { getTrainings } from "@/lib/data"
import { Plan } from "@/lib/definitions"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./form"
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { createPlan } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  price: z.string().min(2, {
    message: "El precio debe tener al menos 2 caracteres.",
  }),
  duration: z.enum(['MONTHLY', 'YEARLY'], {
    message: "La duracion debe tener al menos 2 caracteres",
  }),
  trainings: z.array(z.string()).min(1, {
    message: "Selecciona al menos un elemento",
  }),
  features: z.string().min(2, {
    message: 'La duracion debe tener al menos 2 caracteres'
  })
})



export default function PlanManager({ planes }: { planes: Plan[] }) {
  const { toast } = useToast()
  const [trainings, setTrainings] = useState<string[]>([]);
  const [plans, setPlans] = useState<Plan[]>(planes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      duration: "MONTHLY",
      trainings: [],
      features: ""
    }
  });


  const loadTrainings = async () => {
    const currentTrainings = await getTrainings();
    const filteredTrainings = currentTrainings.map(item => item.name);
    setTrainings(filteredTrainings);
  }

    async function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        const currentTrainings = await getTrainings();
        const selectedTrainings = currentTrainings.filter(training => values.trainings.includes(training.name));
        const newPlan = await createPlan({ ...values, trainings: selectedTrainings });
        setPlans([...planes, newPlan]);
        toast({
          title: 'El plan se ha creado',
          description: 'El plan se ha creado exitosamente!',
          variant: 'default'
        })
        form.reset();
        setIsDialogOpen(false);
      } catch(err){
        console.error(err);
        toast({
          title: 'Error!',
          description: 'Ha ocurrido un error al intentar crear el plan',
          variant: 'destructive'
        })
      }
    }

  useEffect(() => {
    loadTrainings();
  }, [])

  return (
    <div className="space-y-6 p-4 min-h-screen " style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Planes de Membresía</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">Agregar Plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Plan</DialogTitle>
              <DialogDescription>Ingrese los detalles del nuevo plan de membresía.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
            <FormItem>    
                <FormLabel htmlFor="name">Nombre del Plan</FormLabel>
              <FormControl>
                <Input {...field} className="focus-visible:ring-blue-800" id="name" name="name" required />
              </FormControl>
            </FormItem>
            )}
          />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
              <FormItem>
                  <FormLabel htmlFor="price">Precio</FormLabel>
                <FormControl>
                  <Input {...field} className="focus-visible:ring-blue-800"
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                  />
                </FormControl>
              </FormItem>
              )} />
              <FormField control={form.control} name="duration" render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="duration">Duración</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} name="duration">
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-800">
                    <SelectValue placeholder="Seleccione la duración" />
                  </SelectTrigger>
                </FormControl>
                  <SelectContent>
                    <SelectItem value="MONTHLY">Mensual</SelectItem>
                    <SelectItem value="YEARLY">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
              )} />
              <FormField control={form.control} name="trainings" render={({ field }) => (
            <FormItem>
              <FormLabel>Clases Incluidas</FormLabel>
              <FormControl>
                <MultiSelect
                  options={trainings}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Seleccionar clases..."
                />
              </FormControl>
            </FormItem>
              )} />
              <FormField control={form.control} name="features" render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor="features">Características (separadas por comas)</FormLabel>
                  <FormControl>
                    <Input {...field} className="focus-visible:ring-blue-800" id="features" name="features" required />
                  </FormControl>
                </FormItem>
              )} />
              <Button className="bg-blue-900 hover:bg-blue-800" type="submit">Guardar Plan</Button>
            </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans?.map((plan) => (
          <Card key={crypto.randomUUID()} className="bg-gray-800 text-white border-none">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${plan.price}</p>
              <p className="text-muted-foreground">{plan.duration === 'MONTHLY' ? 'Mensual' : 'Anual'}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Clases Incluidas:</h4>
                <ul className="list-disc list-inside">
                  {plan.trainings?.map((className, index) => (
                    <li key={index}>{className.name}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Características:</h4>
                <ul className="list-disc list-inside">
                  {plan?.features.split(',').map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

