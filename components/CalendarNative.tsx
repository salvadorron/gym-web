'use client';
import type React from "react"
import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Download, ChevronDown, Sun, Sunset, Moon } from "lucide-react"
import { DayOfWeek, Plan, Training } from "@/lib/definitions"
import { dateFormatter, DaysOfWeek, getWeek } from "@/lib/utils"
import { apiUrl } from "@/config";

type Turn = "M" | "A" | "N"

const turnToFullName: Record<Turn, string> = {
  M: "Mañana",
  A: "Tarde",
  N: "Noche",
}

// Función auxiliar para generar horas de entrenamiento
function generateTrainingHours(turn: Turn, index: number, total: number): { start: string; end: string } {
  const hoursByTurn: Record<Turn, { start: number; end: number }> = {
    M: { start: 6, end: 12 },
    A: { start: 12, end: 18 },
    N: { start: 18, end: 24 },
  }

  const { start: start, end } = hoursByTurn[turn]
  const duration = (end - start) / total
  const startHour = start + duration * index
  const endHour = startHour + duration

  return {
    start: `${Math.floor(startHour).toString().padStart(2, "0")}:${((startHour % 1) * 60).toFixed(0).padStart(2, "0")}`,
    end: `${Math.floor(endHour).toString().padStart(2, "0")}:${((endHour % 1) * 60).toFixed(0).padStart(2, "0")}`,
  }
}

// Componente de tarjeta de entrenamiento
const TrainingCard: React.FC<{ training: Training; index: number; total: number }> = ({
  training,
  index,
  total,
}) => {
  const { start, end } = generateTrainingHours(training.schedule.turn as Turn, index, total)

  return (
    <div className="bg-gray-700 p-2 rounded-lg shadow-md mb-1 text-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-white">{training.name}</h3>
      </div>
      <p className="text-gray-300 text-xs">
        {start} - {end}
      </p>
      
        <ul className="mt-1 space-y-1 text-xs">
          {training.excersises.map((excercise) => (
            <li key={excercise.id} className="text-gray-400">
              {excercise.name} -{" "}
              {excercise.series > 0 ? `${excercise.series} x ${excercise.repeats}` : excercise.duration + " min"}
            </li>
          ))}
        </ul>
      
    </div>
  )
}

// Componente para el grupo de entrenamientos por turno
const TrainingGroup: React.FC<{ turn: Turn; trainings: Training[] }> = ({ turn, trainings }) => {
  const turnIcon = {
    M: <Sun className="w-4 h-4 mr-1" />,
    A: <Sunset className="w-4 h-4 mr-1" />,
    N: <Moon className="w-4 h-4 mr-1" />,
  }

  const turnColor = {
    M: "bg-yellow-800",
    A: "bg-orange-800",
    N: "bg-blue-900",
  }

  return (
    <div className={`${turnColor[turn]} p-1 rounded-lg mb-1`}>
      <div className="flex items-center mb-1">
        {turnIcon[turn]}
        <h4 className="text-sm font-semibold">{turnToFullName[turn]}</h4>
      </div>
      {trainings.map((training, index) => (
        <TrainingCard
          key={training.id}
          training={training}
          index={index}
          total={trainings.length}
        />
      ))}
    </div>
  )
}

// Componente para el selector de entrenamientos
const TrainingSelector: React.FC<{
  filter: string
  setFilter: (filtro: string) => void
  trainings: string[]
}> = ({ filter, setFilter, trainings }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white  px-3 py-1 rounded-md flex items-center justify-between text-sm"
      >
        <span className="text-nowrap">{filter || "Seleccionar entrenamiento"}</span>
        <ChevronDown className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-48 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg text-sm">
          {trainings.map((training) => (
            <li
              key={training}
              className="px-3 py-1 hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setFilter(training === "Todos" ? "" : training)
                setIsOpen(false)
              }}
            >
              {training}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Componente principal del calendario
const CalendarNative: React.FC<{ clientPlan: Plan }> = ({ clientPlan }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())
  const [filter, setFilter] = useState<string>("")

  const avalaibleTrainings = useMemo(() => {
    return ["Todos", ...clientPlan.trainings.map((t) => t.name)]
  }, [clientPlan])

  const trainingsWeek = useMemo(() => {
    const week = getWeek(currentWeek)
    return week.map((date) => {
      const weekDay = date.toLocaleDateString("en-US", { weekday: "long" }) as DayOfWeek
      const trainingsDay = clientPlan.trainings.filter(
        (training) =>
          training.schedule.days.some((day) => day.day_of_week === weekDay) &&
          (filter === "" || training.name === filter),
      )
      return { date, trainingsDay }
    })
  }, [currentWeek, clientPlan, filter])

  const nextWeek = (direction: number) => {
    const newDate = new Date(currentWeek)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentWeek(newDate)
  }

  const downloadReport = () => {
    const link = document.createElement("a");
    link.target = '_blank';
    link.href = `${apiUrl}/client/${3}/report`;
    link.download = "reporte.pdf";
    link.click();
  }

  return (
    <div className="bg-gray-900 text-white p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Calendario de Entrenamientos</h2>
        <div className="flex space-x-2">
          <TrainingSelector filter={filter} setFilter={setFilter} trainings={avalaibleTrainings} />
          <button
            onClick={downloadReport}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
          >
            <Download className="w-4 h-4 mr-1" /> Descargar
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => nextWeek(-1)} className="text-gray-300 hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold">Semana del {dateFormatter(trainingsWeek[0].date)}</h3>
        <button onClick={() => nextWeek(1)} className="text-gray-300 hover:text-white">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {trainingsWeek.map(({ date, trainingsDay }) => (
          <div key={date.toISOString()} className="bg-gray-800 p-1 rounded-lg">
            <h4 className="font-semibold mb-1 text-sm">{dateFormatter(date)}</h4>
            {(["M", "A", "N"] as Turn[]).map((turn) => {
              const trainingsTurn = trainingsDay.filter((e) => e.schedule.turn === turn)
              if (trainingsTurn.length === 0) return null
              return <TrainingGroup key={turn} turn={turn} trainings={trainingsTurn} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarNative

