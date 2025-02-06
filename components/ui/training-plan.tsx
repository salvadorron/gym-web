'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Activity, Flame, Clock, LightbulbIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

// Simulación de datos del plan (sin cambios)
const currentPlan = {
  id: "1",
  name: "Plan de Entrenamiento Completo",
  progress: 65,
  userStats: {
    completedWorkouts: 24,
    totalMinutes: 720,
    caloriesBurned: 4500,
  },
  goals: [
    { id: "g1", description: "Correr 5km sin parar", progress: 80 },
    { id: "g2", description: "Levantar 100kg en press de banca", progress: 60 },
  ],
  tip: "Recuerda mantenerte hidratado durante tus entrenamientos para un mejor rendimiento.",
  recentHistory: [
    { date: "2023-06-10", trainingName: "Entrenamiento de Fuerza", duration: 45 },
    { date: "2023-06-08", trainingName: "Entrenamiento de Cardio", duration: 30 },
  ],
  trainings: [
    {
      id: "t1",
      name: "Entrenamiento de Fuerza",
      nextDate: "2023-06-15",
      exercises: [
        {
          id: "e1",
          name: "Sentadillas",
          instructions:
            "Párate con los pies separados al ancho de los hombros. Baja tu cuerpo como si fueras a sentarte. Mantén la espalda recta. Sube lentamente.",
        },
        {
          id: "e2",
          name: "Flexiones",
          instructions:
            "Colócate en posición de plancha con las manos separadas al ancho de los hombros. Baja tu cuerpo doblando los codos. Sube empujando con los brazos.",
        },
      ],
    },
    {
      id: "t2",
      name: "Entrenamiento de Cardio",
      nextDate: "2023-06-17",
      exercises: [
        {
          id: "e3",
          name: "Carrera",
          instructions: "Corre a un ritmo constante durante 20 minutos. Mantén una respiración controlada.",
        },
        {
          id: "e4",
          name: "Saltos de cuerda",
          instructions:
            "Salta la cuerda durante 5 minutos. Mantén un ritmo constante y aterriza suavemente sobre la punta de los pies.",
        },
      ],
    },
  ],
}

export default function TrainingPlan() {
  const [expandedTraining, setExpandedTraining] = useState<string | null>(null)

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-md border-gray-700 text-gray-100">
      <CardHeader className="border-b border-gray-700 pb-4">
        <CardTitle className="text-3xl font-bold text-white">{currentPlan.name}</CardTitle>
        <CardDescription className="text-gray-400">Visualiza tu plan de entrenamiento actual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        {/* Progreso general */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Progreso General</h3>
          <Progress value={currentPlan.progress} className="h-3 bg-gray-700"  />
          <p className="text-sm text-gray-400 mt-2">{currentPlan.progress}% completado</p>
        </div>

        {/* Estadísticas del usuario */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Tus Estadísticas</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="text-purple-400 w-6 h-6" />
                <p className="text-lg font-bold">{currentPlan.userStats.completedWorkouts}</p>
              </div>
              <p className="text-sm text-gray-400">Entrenamientos</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="text-green-400 w-6 h-6" />
                <p className="text-lg font-bold">{currentPlan.userStats.totalMinutes}</p>
              </div>
              <p className="text-sm text-gray-400">Minutos totales</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Flame className="text-orange-400 w-6 h-6" />
                <p className="text-lg font-bold">{currentPlan.userStats.caloriesBurned}</p>
              </div>
              <p className="text-sm text-gray-400">Calorías quemadas</p>
            </div>
          </div>
        </div>

        {/* Objetivos */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Tus Objetivos</h3>
          {currentPlan.goals.map((goal) => (
            <div key={goal.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-300">{goal.description}</p>
                <p className="text-sm text-gray-400">{goal.progress}%</p>
              </div>
              <Progress value={goal.progress} className="h-2 bg-gray-700"  />
            </div>
          ))}
        </div>

        {/* Consejo personalizado */}
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <LightbulbIcon className="text-yellow-400 w-6 h-6" />
            <h3 className="text-xl font-semibold text-yellow-400">Consejo del día</h3>
          </div>
          <p className="text-sm text-gray-300">{currentPlan.tip}</p>
        </div>

        {/* Historial reciente */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Historial Reciente</h3>
          {currentPlan.recentHistory.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3 bg-gray-800 p-3 rounded-lg">
              <div>
                <p className="text-sm text-gray-300">{item.trainingName}</p>
                <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-white font-semibold">{item.duration} min</p>
            </div>
          ))}
        </div>

        {/* Entrenamientos */}
        <Accordion type="single" collapsible className="w-full">
          {currentPlan.trainings.map((training) => (
            <AccordionItem key={training.id} value={training.id} className="border-gray-700">
              <AccordionTrigger
                onClick={() => setExpandedTraining(training.id)}
                className="text-white hover:text-cyan-300"
              >
                {training.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 bg-gray-800 p-4 rounded-lg mt-2">
                  <p className="text-sm text-gray-400">
                    Próximo entrenamiento: {new Date(training.nextDate).toLocaleDateString()}
                  </p>
                  <h4 className="text-lg font-semibold text-white">Ejercicios:</h4>
                  <ul className="list-disc pl-5 space-y-3 text-gray-300">
                    {training.exercises.map((exercise) => (
                      <li key={exercise.id}>
                        <h5 className="font-medium text-purple-400">{exercise.name}</h5>
                        <p className="text-sm text-gray-400 mt-1">{exercise.instructions}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/schedule?training=${training.id}`} passHref>
                    <Button variant="outline" className="bg-cyan-700 text-white border-cyan-600 hover:bg-cyan-600 mt-2">
                      Ver en horario
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

