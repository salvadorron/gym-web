"use client"

import { useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, Download, Moon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


export interface Exercise {
  name: string
  duration?: string
  sets?: string
}

export interface Training {
  title: string
  time: string
  exercises: Exercise[]
}

export interface DaySchedule {
  date: string
  dayName: string
  trainings: Training[]
}


export default function Schedule() {
  const [selectedTraining, setSelectedTraining] = useState<string>("all")
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()))

  const goToNextWeek = useCallback(() => {
    setCurrentWeekStart((prevDate) => {
      const nextWeek = new Date(prevDate)
      nextWeek.setDate(prevDate.getDate() + 7)
      return nextWeek
    })
  }, [])

  const goToPreviousWeek = useCallback(() => {
    setCurrentWeekStart((prevDate) => {
      const previousWeek = new Date(prevDate)
      previousWeek.setDate(prevDate.getDate() - 7)
      return previousWeek
    })
  }, [])

  const weekSchedule: DaySchedule[] = generateWeekSchedule(currentWeekStart)

  const renderTrainings = (trainings: Training[]) => {
    return trainings.map((training) => (
      <div
        key={training.title}
        className="bg-slate-700 rounded-lg p-3 transition-all hover:bg-slate-600 mb-3 last:mb-0"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Moon className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span className="font-medium truncate">{training.title}</span>
        </div>
        <div className="text-sm text-gray-400 mb-2">{training.time}</div>
        <div className="space-y-1">
          {training.exercises.map((exercise) => (
            <div
              key={exercise.name}
              className="text-sm text-gray-300 flex items-center justify-between whitespace-nowrap"
            >
              <span className="truncate max-w-[70%]">{exercise.name}</span>
              <span className="text-gray-400 ml-2 flex-shrink-0">
                {exercise.duration && `- ${exercise.duration}`}
                {exercise.sets && `- ${exercise.sets}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="bg-slate-900 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Calendario de Entrenamientos</h2>
            <div className="flex items-center gap-4">
              <Select value={selectedTraining} onValueChange={setSelectedTraining}>
                <SelectTrigger className="w-[200px] bg-slate-800 border-slate-700 focus:ring-blue-500 text-white">
                  <SelectValue placeholder="Seleccionar entrenamiento" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">Todos los entrenamientos</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="strength">Fuerza</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-blue-900/50 hover:bg-blue-500/50 hover:text-white border-slate-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" className="text-white bg-blue-900/50 hover:bg-blue-500/50 hover:text-white" onClick={goToPreviousWeek}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="text-lg font-medium">Semana del {formatDate(currentWeekStart)}</h3>
            <Button variant="ghost" className="text-white bg-blue-900/50 hover:bg-blue-500/50 hover:text-white" onClick={goToNextWeek}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-4 h-[600px]">
            {weekSchedule.map((day) => (
              <div key={day.date} className="bg-slate-800 rounded-lg p-4 h-full overflow-y-auto">
                <div className="mb-4">
                  <div className="text-sm text-gray-400 capitalize">{day.dayName}</div>
                  <div className="font-medium">{day.date}</div>
                </div>

                <div className="space-y-4">
                  {day.trainings.length > 0 ? (
                    renderTrainings(day.trainings)
                  ) : (
                    <div className="text-sm text-gray-400">No hay entrenamientos programados</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

function getMonday(date: Date): Date {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
}

function generateWeekSchedule(startDate: Date): DaySchedule[] {
  const weekDays = ["lunes", "martes", "miércoles", "jueves", "viernes"]
  return weekDays.map((dayName, index) => {
    const currentDate = new Date(startDate)
    currentDate.setDate(startDate.getDate() + index)
    return {
      date: formatDate(currentDate),
      dayName,
      trainings: generateRandomTrainings(),
    }
  })
}

function generateRandomTrainings(): Training[] {
  const trainings = [
    {
      title: "Cardio General",
      time: "18:00 - 20:00",
      exercises: [
        { name: "Trotar en la caminadora", duration: "30 min" },
        { name: "Bicicleta estática", duration: "30 min" },
      ],
    },
    {
      title: "Fuerza Básica",
      time: "20:00 - 22:00",
      exercises: [
        { name: "Sentadillas con peso corporal", sets: "3 x 15" },
        { name: "Flexiones", sets: "3 x 15" },
        { name: "Abdominales", sets: "3 x 20" },
      ],
    },
    {
      title: "Yoga",
      time: "19:00 - 20:30",
      exercises: [
        { name: "Secuencia de saludo al sol", duration: "15 min" },
        { name: "Posturas de equilibrio", duration: "30 min" },
        { name: "Meditación final", duration: "15 min" },
      ],
    },
    {
      title: "HIIT",
      time: "18:00 - 19:00",
      exercises: [
        { name: "Burpees", sets: "4 x 30 seg" },
        { name: "Mountain climbers", sets: "4 x 30 seg" },
        { name: "Jumping jacks", sets: "4 x 30 seg" },
      ],
    },
  ]

  // Randomly decide if there are trainings for this day
  if (Math.random() > 0.5) {
    return []
  }

  // Randomly select 1 or 2 trainings
  const numTrainings = Math.floor(Math.random() * 2) + 1
  return trainings.sort(() => 0.5 - Math.random()).slice(0, numTrainings)
}

