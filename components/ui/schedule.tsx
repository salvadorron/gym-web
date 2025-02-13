"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CloudSun, Download, Moon, Sun } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPlan } from "@/lib/data" // Asegúrate de que esta función exista y funcione correctamente
import { Client, Training } from "@/lib/definitions"
import jsPDF from "jspdf"
import autotable from 'jspdf-autotable'


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

  export type Payment = {
    id: number 
    client: Client
    client_id:number
    amount: string
    method: string
    description: string
    startDate: string
    endDate: string
    status: "active" | "expired"
  }
  



export default function Schedule({ planId, payment }: { planId: number, payment: Payment }) {
  const [selectedTraining, setSelectedTraining] = useState<string>("all");
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));
    const [plan, setPlan] = useState<Training[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchPlanData() {
          try {
              const data = await getPlan(planId.toString());
              setPlan(data.trainings);
          } catch (err) {
              setError("Error cargando el plan");
              console.error("Error fetching plan data:", err);
          } finally {
              setLoading(false);
          }
      }
      fetchPlanData();
  }, [planId]);

  const filteredWeekSchedule = generateWeekSchedule(currentWeekStart, plan, payment)
  .map(day => ({
      ...day,
      trainings: day.trainings.filter(training => selectedTraining === "all" || training.name.toLowerCase().includes(selectedTraining.toLowerCase()))}));

const generateReport = () => {
  const doc = new jsPDF();
  let yPos = 15;
  
  doc.setFontSize(18);
  doc.text(`Reporte de Entrenamientos - Semana del ${formatDate(currentWeekStart)}`, 14, yPos);
  yPos += 10;

  filteredWeekSchedule.forEach(day => {
      doc.setFontSize(14);
      doc.text(`${day.dayName} ${day.date}`, 14, yPos);
      yPos += 8;

      const headers = ["Hora", "Entrenamiento", "Ejercicios"];
      const data = day.trainings.map(training => {
          const dayIndex = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].indexOf(day.dayName);
          return [
              getTrainingTimeLabel(dayIndex),
              training.name,
              training.excersises.map(e => e.name).join(", ")
          ];
      });

      autotable(doc, {
          startY: yPos,
          head: [headers],
          body: data,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [41, 128, 185], textColor: 255 },
          bodyStyles: { cellWidth: 'wrap' }
      });
      
      
      yPos = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10; //ts-eslint
  });

  doc.save(`reporte-entrenamientos-${formatDate(currentWeekStart)}.pdf`);
};

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


    const renderTrainings = (trainings: Training[], dayIndex: number) => { // Añadimos dayIndex como argumento
       

        const getTrainingIcon = (dayIndex: number): JSX.Element | null => {
            switch (dayIndex) {
                case 0: // Lunes
                case 2: // Miércoles
                case 4: // Viernes
                    return <Sun className="w-4 h-4 text-yellow-400 flex-shrink-0" />; // Icono de sol para la mañana
                case 1: // Martes
                    return <CloudSun className="w-4 h-4 text-blue-400 flex-shrink-0" />; // Icono de sol con nubes para la tarde
                case 3: // Jueves
                    return <Moon className="w-4 h-4 text-gray-600 flex-shrink-0" />; // Icono de luna para la noche
                default:
                    return null; // Icono por defecto o nulo si no coincide con ningún horario
            }
        };

        return trainings.map((training) => (
            <div key={training.name} className="bg-slate-700 rounded-lg p-3 transition-all hover:bg-slate-600 mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-1.5">
                    {getTrainingIcon(dayIndex)} {/* Icono dinámico */}
                    <span className="font-medium truncate">{training.name}</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">{getTrainingTimeLabel(dayIndex)}</div> {/* Texto del horario */}
                <div className="space-y-1">
                    {training.excersises.map((exercise) => (
                        <div key={exercise.name} className="text-sm text-gray-300 flex items-center justify-between whitespace-nowrap">
                            <span className="truncate max-w-[70%]">{exercise.name}</span>
                            <span className="text-gray-400 ml-2 flex-shrink-0">
                                {exercise.sets && `${exercise.sets} x ${exercise.reps}`}
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
                  {plan.map(training => (
                  <SelectItem key={training.id} value={training.name}>{training.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={generateReport} variant="outline" className="bg-blue-900/50 hover:bg-blue-500/50 hover:text-white border-slate-700 text-white">
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
            {filteredWeekSchedule.map((day, dayIndex) => (
              <div key={day.date} className="bg-slate-800 rounded-lg p-4 h-full overflow-y-auto">
                <div className="mb-4">
                  <div className="text-sm text-gray-400 capitalize">{day.dayName}</div>
                  <div className="font-medium">{day.date}</div>
                </div>

                <div className="space-y-4">
                  {day.trainings.length > 0 ? (
                    renderTrainings(day.trainings, dayIndex)
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

function generateWeekSchedule(startDate: Date, plan: Training[] | null, payment: Payment): DaySchedule[] {
  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const schedule: DaySchedule[] = [];

  if (!payment) return []; // Manejar el caso donde payment es null o undefined

  const startDatePayment = new Date(payment.startDate);
  const endDatePayment = new Date(payment.endDate);

  for (let i = 0; i < 5; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const formattedDate = formatDate(currentDate);
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); //Fecha sin hora

      const trainingsForDay = plan ? plan.filter(training => {
          if (!training.schedule || !training.schedule.days) return false;

          return training.schedule.days.some(scheduledDay =>
              scheduledDay.day_of_week === weekDays[i]
          ) && currentDateOnly >= startDatePayment && currentDateOnly <= endDatePayment; // Filtrar por rango de fechas del pago
      }) : [];

      schedule.push({
          date: formattedDate,
          dayName: weekDays[i],
          trainings: trainingsForDay,
      });
  }

  return schedule;
}

const getTrainingTimeLabel = (dayIndex: number): string => {
  switch (dayIndex) {
      case 0: // Lunes
      case 2: // Miércoles
      case 4: // Viernes
          return "Día (6:00-12:00)"; // Mañana
      case 1: // Martes
          return "Tarde (12:00-18:00)"; // Tarde
      case 3: // Jueves
          return "Noche (18:00-22:00)"; // Noche
      default:
          return ""; // Manejar otros días si es necesario
  }
};