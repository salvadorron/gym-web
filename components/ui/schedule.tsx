"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Download, Moon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPlan } from "@/lib/data" // Asegúrate de que esta función exista y funcione correctamente
import { Training } from "@/lib/definitions"


// Interfaces (manténlas, son útiles)
export interface Exercise {
    name: string;
    duration?: string;
    sets?: string;
    reps?: string; // Agrega reps
    weight?: string; // Agrega weight
    equipment?: string; // Agrega equipment
    muscleGroup?: string; // Agrega muscleGroup
    type?: string; // Agrega type
    notes?: string; // Agrega notes
}

export interface DaySchedule {
    date: string;
    dayName: string;
    trainings: Training[];
}



export default function Schedule({ planId }: { planId: number }) {
   const [selectedTraining, setSelectedTraining] = useState<string>("all");
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));
    const [plan, setPlan] = useState<Training[] | null>(null); // Almacena los trainings del plan
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlanData() {
            try {
                const data = await getPlan(planId.toString());
                
                setPlan(data.trainings); // Guarda los trainings del plan
            } catch (err) {
                setError("Error"); // Guarda el mensaje de error
                console.error("Error fetching plan data:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPlanData();
    }, [planId]);

    const goToNextWeek = () => {
        setCurrentWeekStart((prevDate) => {
            const nextWeek = new Date(prevDate);
            nextWeek.setDate(prevDate.getDate() + 7);
            return nextWeek;
        });
    };

    const goToPreviousWeek = () => {
        setCurrentWeekStart((prevDate) => {
            const previousWeek = new Date(prevDate);
            previousWeek.setDate(prevDate.getDate() - 7);
            return previousWeek;
        });
    };

    const weekSchedule: DaySchedule[] = generateWeekSchedule(currentWeekStart, plan); // Pasa 'plan' a generateWeekSchedule


  const renderTrainings = (trainings: Training[]) => {
        return trainings.map((training) => (
            <div key={training.name} className="bg-slate-700 rounded-lg p-3 transition-all hover:bg-slate-600 mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                    <Moon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span className="font-medium truncate">{training.name}</span> {/* Usa training.name */}
                </div>
                <div className="text-sm text-gray-400 mb-2">{''}</div> {/* Muestra la descripción */}
                <div className="space-y-1">
                    {training.excersises.map((exercise) => (
                        <div key={exercise.name} className="text-sm text-gray-300 flex items-center justify-between whitespace-nowrap">
                            <span className="truncate max-w-[70%]">{exercise.name}</span>
                            <span className="text-gray-400 ml-2 flex-shrink-0">
                                
                                {exercise.sets && `${exercise.sets} x ${exercise.reps}`} {/* Muestra sets y reps */}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };


    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!plan) {
        return <div>No se encontró el plan de entrenamiento.</div>;
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
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function formatDate(date: Date): string {
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

function generateWeekSchedule(startDate: Date, plan: Training[] | null): DaySchedule[] {
  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]; // Corregir "Miercoles" a "Miércoles"
  const schedule: DaySchedule[] = [];

  for (let i = 0; i < 5; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = formatDate(currentDate);

      const trainingsForDay = plan ? plan.filter(training => {
          if (!training.schedule || !training.schedule.days) return false;

          return training.schedule.days.some(scheduledDay => 
              scheduledDay.day_of_week === weekDays[i] // Comparar directamente los nombres
          );
      }) : [];

      schedule.push({
          date: formattedDate,
          dayName: weekDays[i],
          trainings: trainingsForDay,
      });
  }

  return schedule;
}
