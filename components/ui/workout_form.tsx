"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { createTraining } from "@/lib/actions"
import { title } from "process"
import { useToast } from "@/hooks/use-toast"
import { Exercise } from "@/lib/definitions"

export type ExerciseType = "repetitions" | "duration"




const exerciseBaseSchema = z.object({
  id: z.string(),
  notes: z.string().optional(),
})

const repetitionExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal("repetitions"),
  sets: z.coerce.number().min(1),
  reps: z.coerce.number().min(1),
  weight: z.coerce.number().optional(),
})

const durationExerciseSchema = exerciseBaseSchema.extend({
  type: z.literal("duration"),
  duration: z.coerce.number().min(1),
  intensity: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  distance: z.coerce.number().optional(),
})

const workoutSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  exercises: z.array(z.discriminatedUnion("type", [repetitionExerciseSchema, durationExerciseSchema])),
})


export function WorkoutForm({ data }: { data: Exercise[] }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof workoutSchema>>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      name: "",
      description: "",
      exercises: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  })

  async function onSubmit(values: z.infer<typeof workoutSchema>) {
    try {
      await createTraining(values);
      toast({
        title: 'Entrenamiento creado!',
        description: 'El entrenamiento fue creado exitosamente!',
        variant: 'default'
      })
    } catch(err){
      console.error(err);
      toast({
        title: 'Error!',
        description: 'Hubo un error al intentar crear el entrenamiento.',
        variant: 'destructive'
      })
    }
  }

  const addExercise = (type: "repetitions" | "duration") => {
    if (type === "repetitions") {
      append({
        type: "repetitions",
        id: "",
        sets: 3,
        reps: 12,
        weight: 0,
        notes: "",
      })
    } else {
      append({
        type: "duration",
        id: "",
        duration: 30,
        intensity: "MEDIUM",
        distance: 0,
        notes: "",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre del Entrenamiento</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-blue-900" placeholder="Entrenamiento de Pecho" {...field} />
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
                <Textarea className="focus-visible:ring-blue-900" placeholder="Describe el entrenamiento..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Ejercicios</h3>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => addExercise("repetitions")}>
                <Plus className="mr-2 h-4 w-4" />
                Ejercicio con Repeticiones
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => addExercise("duration")}>
                <Plus className="mr-2 h-4 w-4" />
                Ejercicio por Duración
              </Button>
            </div>
          </div>

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="flex items-start justify-between">
                    <FormField
                      control={form.control}
                      name={`exercises.${index}.id`}
                      render={({ field: exerciseField }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-white">Ejercicio</FormLabel>
                          <Select onValueChange={exerciseField.onChange} defaultValue={exerciseField.value}>
                            <FormControl>
                              <SelectTrigger className="focus:ring-blue-900" >
                                <SelectValue placeholder="Selecciona un ejercicio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {data
                                .filter((exercise) => exercise.type === field.type)
                                .map((exercise) => (
                                  <SelectItem key={exercise.id} value={exercise.id}>
                                    {exercise.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" className="mt-8" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {field.type === "repetitions" ? (
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.sets`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Series</FormLabel>
                            <FormControl>
                              <Input className="focus-visible:ring-blue-900" type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.reps`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Repeticiones</FormLabel>
                            <FormControl>
                              <Input className="focus-visible:ring-blue-900" type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.weight`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Peso (kg)</FormLabel>
                            <FormControl>
                              <Input className="focus-visible:ring-blue-900" type="number" min={0} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Duración (min)</FormLabel>
                            <FormControl>
                              <Input className="focus-visible:ring-blue-900" type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.intensity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Intensidad</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="focus:ring-blue-900">
                                  <SelectValue placeholder="Selecciona intensidad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="LOW">Baja</SelectItem>
                                <SelectItem value="MEDIUM">Media</SelectItem>
                                <SelectItem value="HIGH">Alta</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.distance`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Distancia (km)</FormLabel>
                            <FormControl>
                              <Input className="focus-visible:ring-blue-900" type="number" min={0} step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name={`exercises.${index}.notes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Notas</FormLabel>
                        <FormControl>
                          <Textarea className="focus-visible:ring-blue-900" placeholder="Notas adicionales..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="bg-blue-900 hover:bg-blue-800" type="submit">Guardar Entrenamiento</Button>
      </form>
    </Form>
  )
}

