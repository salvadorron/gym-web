"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createExcercise } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

export type ExerciseType = "repetitions" | "duration"

export interface Exercise {
  id: string
  name: string
  description: string
  muscleGroup: string
  equipment: string
  difficulty: "Principiante" | "Intermedio" | "Avanzado"
  type: ExerciseType
}

export interface RepetitionExercise {
  exerciseId: string
  type: "repetitions"
  sets: number
  reps: number
  weight?: number
  notes?: string
}

export interface DurationExercise {
  exerciseId: string
  type: "duration"
  duration: number // en minutos
  intensity?: "Baja" | "Media" | "Alta"
  distance?: number // en kilómetros
  notes?: string
}

export type WorkoutExercise = RepetitionExercise | DurationExercise

export interface Workout {
  id: string
  name: string
  description: string
  date: string
  exercises: WorkoutExercise[]
}



const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  muscleGroup: z.string().min(1, {
    message: "Selecciona un grupo muscular.",
  }),
  equipment: z.string().min(1, {
    message: "Selecciona el equipamiento necesario.",
  }),
  difficulty: z.enum(["BEGGINER", "INTERMEDIATE", "ADVANCED"]),
  type: z.enum(["repetitions", "duration"], {
    required_error: "Selecciona el tipo de ejercicio",
  }),
})

export function ExerciseForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      muscleGroup: "",
      equipment: "",
      difficulty: "BEGGINER",
      type: "repetitions",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      await createExcercise(values);
      toast({
        title: 'Ejercicio creado!',
        description: 'El ejercicio fue creado exitosamente!',
        variant: 'default'
      })
      form.reset();
    } catch(err){  
      console.error(err);
      toast({
        title: 'Error!',
        description: 'Hubo un problema al intentar crear el ejercicio',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Tipo de Ejercicio</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-900">
                    <SelectValue placeholder="Selecciona el tipo de ejercicio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="repetitions">Series y Repeticiones</SelectItem>
                  <SelectItem value="duration">Duración</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-gray-300">Selecciona si el ejercicio se mide por repeticiones o por duración</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre del Ejercicio</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-blue-900" placeholder="Press de banca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Descripción</FormLabel>
              <FormControl>
                <Textarea className="focus-visible:ring-blue-900" placeholder="Describe cómo realizar el ejercicio..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="muscleGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Grupo Muscular</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-900">
                    <SelectValue placeholder="Selecciona un grupo muscular" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="chest">Pecho</SelectItem>
                  <SelectItem value="back">Espalda</SelectItem>
                  <SelectItem value="legs">Piernas</SelectItem>
                  <SelectItem value="shoulders">Hombros</SelectItem>
                  <SelectItem value="arms">Brazos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Equipamiento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-900">
                    <SelectValue placeholder="Selecciona el equipamiento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  <SelectItem value="dumbbells">Mancuernas</SelectItem>
                  <SelectItem value="barbell">Barra</SelectItem>
                  <SelectItem value="machine">Máquina</SelectItem>
                  <SelectItem value="bands">Bandas Elásticas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Dificultad</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-900">
                    <SelectValue placeholder="Selecciona la dificultad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BEGGINER">Principiante</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermedio</SelectItem>
                  <SelectItem value="ADVANCED">Avanzado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-blue-900 hover:bg-blue-800" type="submit">Guardar Ejercicio</Button>
      </form>
    </Form>
  )
}

