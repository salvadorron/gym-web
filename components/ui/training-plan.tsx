"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Clock, Activity, Target, DollarSign } from "lucide-react"
import { Plan } from "@/lib/definitions"

interface Exercise {
  id: number
  name: string
  description: string
  difficulty: "BEGGINER" | "INTERMEDIATE" | "ADVANCED"
  equipment: string
  muscleGroup: string
  type: string
  weight: number
  reps: number
  sets: number
  notes?: string
  distance: number
  duration: number
  intensity?: "LOW" | "MEDIUM" | "HIGH"
}

interface Training {
  id: number
  name: string
  description: string
  excersises: Exercise[]
  schedule?: {
    id: number
    days: {
      id: number
      day_of_week: string
      shift: string
    }[]
  }
}

export default function TrainingPlan({ plan }: { plan: Plan | undefined }) {

  if(!plan) throw new Error('Missing Plan')

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 text-white">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">{plan.name}</h1>
            <p className="text-gray-300">Guía detallada para tu rutina de ejercicios</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent" />
        </div>

        {/* Plan Features */}
        <Card className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Características del Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {plan.features.split(",").map((feature, index) => (
                <li key={index}>{feature.trim()}</li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between text-gray-300">
              <span className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                Duración: {plan.duration === 'MONTHLY' ? "Mensual" : "Anual"}
              </span>
              <span className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-400" />
                Precio: ${plan.price}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Training Days */}
        {plan.trainings.map((training) => (
          <Card key={training.id} className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-blue-400" />
                {training.name}
              </CardTitle>
              {training.schedule && (
                <CardDescription className="text-gray-400">
                  {training.schedule.days.map((day) => `${day.day_of_week} (${mapToShift(day.shift)})`).join(", ")}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">{training.description}</p>
              {training.excersises.map((exercise) => (
                <div key={exercise.id} className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">{exercise.description}</p>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>
                          <span className="font-semibold">Dificultad:</span> {mapToDifficulty(exercise.difficulty)}
                        </li>
                        <li>
                          <span className="font-semibold">Equipo:</span> {mapToEquipment(exercise.equipment)}
                        </li>
                        <li>
                          <span className="font-semibold">Grupo muscular:</span> {mapToMuscleGroup(exercise.muscleGroup)}
                        </li>
                        <li>
                          <span className="font-semibold">Tipo:</span> {exercise.type === 'repetitions' ? "Repeticiones" : "Duración"}
                        </li>
                        {exercise.weight > 0 && (
                          <li>
                            <span className="font-semibold">Peso:</span> {exercise.weight} kg
                          </li>
                        )}
                        {exercise.reps > 0 && (
                          <li>
                            <span className="font-semibold">Repeticiones:</span> {exercise.reps}
                          </li>
                        )}
                        {exercise.sets > 0 && (
                          <li>
                            <span className="font-semibold">Series:</span> {exercise.sets}
                          </li>
                        )}
                        {exercise.distance > 0 && (
                          <li>
                            <span className="font-semibold">Distancia:</span> {exercise.distance} m
                          </li>
                        )}
                        {exercise.duration > 0 && (
                          <li>
                            <span className="font-semibold">Duración:</span> {exercise.duration} min
                          </li>
                        )}
                        {exercise.intensity && (
                          <li>
                            <span className="font-semibold">Intensidad:</span> {exercise.intensity}
                          </li>
                        )}
                      </ul>
                    </div>
                   
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Tips Section */}
        <Card className="border-none bg-gray-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="flex items-start space-x-4 relative z-10">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Consejos para tu entrenamiento</h3>
                <ul className="text-gray-300 list-disc list-inside space-y-2">
                  <li>Mantén una buena forma durante todos los ejercicios para prevenir lesiones.</li>
                  <li>
                    Respira de manera constante: exhala durante el esfuerzo e inhala al volver a la posición inicial.
                  </li>
                  <li>Hidrátate adecuadamente antes, durante y después de tu sesión de entrenamiento.</li>
                  <li>Escucha a tu cuerpo y ajusta el peso o las repeticiones según sea necesario.</li>
                  <li>Realiza un calentamiento adecuado antes de comenzar y estiramientos al finalizar.</li>
                </ul>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50" />
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Seguimiento de Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              Lleva un registro de tu progreso para mantenerte motivado y ajustar tu entrenamiento según sea necesario.
              Aquí tienes algunas formas de hacerlo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Anota los pesos, repeticiones y series de cada ejercicio en cada sesión.</li>
              <li>Toma medidas corporales mensualmente para seguir los cambios en tu composición corporal.</li>
              <li>Haz fotos de progreso cada 4-6 semanas para ver los cambios visuales.</li>
              <li>Realiza pruebas de fuerza o resistencia periódicamente para medir tu mejora en rendimiento.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function mapToMuscleGroup(value: string): string {
  
  switch(value){
    case "chest": return "Pecho"
      case "back": return "Espalda"
        case "legs": return "Piernas"
          case "shoulders": return "Hombros"
          case "arms": return "Brazos"
            default :  return "Pecho"
  }
}
function mapToDifficulty(value: string): string {
  switch(value){
    case "BEGGINER": return "Principiante"
      case "INTERMEDIATE": return "Intermedio"
        case "ADVANCED": return "Avanzado"
            default: return "Principiante"
  }
}
function mapToEquipment(value: string): string {

  switch(value){
    case "dumbbells": return "Mancuernas"
      case "barbell": return "Barra"
      case "machine": return "Máquina"
      case "bands": return "Bandas Elásticas"
      default: return "Ninguno"
  }
}

function mapToShift(value: string): string {

  switch(value){
    case "morning": return "Mañana"
      case "afternoon": return "Tarde"
      case "evenning": return "Noche"
      default: return "Mañana"
  }
}