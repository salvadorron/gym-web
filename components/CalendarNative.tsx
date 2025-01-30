'use client';

import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect, useState } from 'react';
import { DaysOfWeek } from '@/lib/utils';
import { Payment, Plan } from '@/lib/definitions';
import { Button } from './ui/button';
import Link from 'next/link';
import { apiUrl } from '@/config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { usePathname, useRouter } from 'next/navigation';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface CalendarEvent {
  id: string;
  title: string; // Título del entrenamiento
  start: string;
  end: string;
  day: string;
  turno: string; // D, T, N
  dayOfWeek: string; // Lunes, Martes, etc.
}

export default function CalendarNative({ clientId, plan, selectedPlan, currentPayment }: {
  clientId: number;
  plan?: Plan;
  selectedPlan: string;
  currentPayment?: Payment;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<Record<string, Record<string, CalendarEvent[]>>>({});
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('week')); // Inicio de la semana actual (Lunes)

  // Mapeo de días de la semana en inglés a español
  const daysMap: Record<string, string> = {
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
  };

  // Obtener los días de la semana actual (Lunes a Viernes)
  const getWeekDays = (startOfWeek: dayjs.Dayjs) => {
    return Array.from({ length: 5 }).map((_, index) => startOfWeek.add(index + 1, 'day'));
  };

  // Generar eventos basados en los entrenamientos del plan
  useEffect(() => {
    if (!plan) return;

    const generatedEvents: CalendarEvent[] = [];

    plan.trainings.forEach((training: any) => {
      if (!training.schedule) return;

      training.schedule.days.forEach((day: any) => {
        const indexDay = DaysOfWeek[day.day_of_week as keyof typeof DaysOfWeek];
        const weekDays = getWeekDays(currentWeekStart);

        weekDays.forEach((date) => {
          if (date.day() === indexDay) {
            const turno = training.schedule.turn; // D, T, N
            const dayOfWeek = daysMap[date.format('dddd')]; // Convertir día en inglés a español

            generatedEvents.push({
              id: crypto.randomUUID(),
              title: training.name, // Título del entrenamiento
              start: '', // Se calculará más adelante
              end: '', // Se calculará más adelante
              day: date.format('dddd, D MMMM'),
              turno: getTurnName(turno), // Convertir D, T, N a "Día", "Tarde", "Noche"
              dayOfWeek,
            });
          }
        });
      });
    });

    // Distribuir los horarios equitativamente
    distributeEventTimes(generatedEvents);
    setEvents(generatedEvents);
    groupEventsByDayAndTurn(generatedEvents);
  }, [plan, currentPayment, currentWeekStart]);

  // Distribuir los horarios equitativamente para cada día y turno
  // Función para distribuir los horarios equitativamente
const distributeEventTimes = (events: CalendarEvent[]) => {
  const eventsByDayAndTurn = events.reduce((acc, event) => {
    const { dayOfWeek, turno } = event;

    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = {};
    }

    if (!acc[dayOfWeek][turno]) {
      acc[dayOfWeek][turno] = [];
    }

    acc[dayOfWeek][turno].push(event);
    return acc;
  }, {} as Record<string, Record<string, CalendarEvent[]>>);

  Object.keys(eventsByDayAndTurn).forEach((dayOfWeek) => {
    Object.keys(eventsByDayAndTurn[dayOfWeek]).forEach((turno) => {
      const eventsForTurn = eventsByDayAndTurn[dayOfWeek][turno];
      const totalEvents = eventsForTurn.length;

      if (totalEvents > 0) {
        const { start: turnStart, end: turnEnd } = getTimeByTurn(turno);

        // Asegurarse de que los valores de turnStart y turnEnd sean válidos
        if (!turnStart || !turnEnd) {
          console.error(`Horarios inválidos para el turno: ${turno}`);
          return;
        }

        const startTime = dayjs(turnStart, 'hh:mm');
        const endTime = dayjs(turnEnd, 'hh:mm');

        // Verificar que startTime y endTime sean válidos
        if (!startTime.isValid() || !endTime.isValid()) {
          console.error(`Horarios inválidos para el turno: ${turno}`);
          return;
        }

        const duration = endTime.diff(startTime, 'minute') / totalEvents;

        // Verificar que duration sea un número válido
        if (isNaN(duration)) {
          console.error(`Duración inválida para el turno: ${turno}`);
          return;
        }

        eventsForTurn.forEach((event, index) => {
          const eventStart = startTime.add(index * duration, 'minute').format('HH:mm');
          const eventEnd = startTime.add((index + 1) * duration, 'minute').format('HH:mm');

          event.start = eventStart;
          event.end = eventEnd;
        });
      }
    });
  });
};

  // Agrupar eventos por día y turno
  const groupEventsByDayAndTurn = (events: CalendarEvent[]) => {
    const grouped = events.reduce((acc, event) => {
      const { dayOfWeek, turno } = event;

      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = {};
      }

      if (!acc[dayOfWeek][turno]) {
        acc[dayOfWeek][turno] = [];
      }

      acc[dayOfWeek][turno].push(event);
      return acc;
    }, {} as Record<string, Record<string, CalendarEvent[]>>);

    setGroupedEvents(grouped);
  };

  // Filtrar eventos por plan seleccionado
  const filteredEvents = selectedPlan === 'all'
    ? events
    : events.filter((event) => event.title === plan?.trainings.find((t) => t.id.toString() === selectedPlan)?.name);

  // Días de la semana (Lunes a Viernes)
  const daysOfWeek = getWeekDays(currentWeekStart).map((date) => ({
    name: daysMap[date.format('dddd')], // Nombre del día en español
    date: date.format('D'), // Fecha del día (ej: 27, 28, etc.)
    fullDate: date.format('YYYY-MM-DD'), // Fecha completa para el key
  }));

  // Navegar a la semana anterior
  const goToPreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
  };

  // Navegar a la siguiente semana
  const goToNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.add(1, 'week'));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Barra de herramientas */}
      <div className="bg-[#141218] shadow rounded-md h-20 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white flex-1 text-xl">Horario de Entrenamiento</h3>
          <div className="flex gap-2 justify-center items-center">
            <Select defaultValue={selectedPlan || 'all'} onValueChange={(value) => {
              router.push(value === 'all' ? pathname : `${pathname}?planId=${value}`);
            }}>
              <SelectTrigger className="bg-[#141218] w-[200px] text-white rounded-sm border-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {plan?.trainings.map((training) => (
                  <SelectItem key={training.id} value={training.id.toString()}>{training.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href={`${apiUrl}/client/${clientId}/report`} download={"reporte_cliente.pdf"} target="_blank">
                Exportar
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navegación semanal */}
      <div className="flex justify-between items-center">
        <Button onClick={goToPreviousWeek}>Semana anterior</Button>
        <span className="text-lg font-semibold text-white">
          Semana del {currentWeekStart.locale(es).format('D MMMM')} al {currentWeekStart.add(4, 'days').locale(es).format('D MMMM')}
        </span>
        <Button onClick={goToNextWeek}>Siguiente semana</Button>
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-5 gap-4">
        {daysOfWeek.map(({ name, date, fullDate }) => (
          <div key={fullDate} className="bg-[#1E1E1E] p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-white mb-4">
              {name} {date} {/* Mostrar el nombre del día y la fecha */}
            </h2>
            {['Día', 'Tarde', 'Noche'].map((turno) => (
              <div key={`${fullDate}-${turno}`} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">{turno}</h3>
                <div className="space-y-2">
                  {groupedEvents[name]?.[turno]
                    ?.filter((event) => filteredEvents.some((e) => e.id === event.id)) // Filtrar por plan seleccionado
                    .map((event) => (
                      <div key={event.id} className="bg-[#2C2C2C] p-3 rounded-lg">
                        <h4 className="font-bold text-white">{event.title}</h4> {/* Título del entrenamiento */}
                        <p className="text-gray-400">{event.start} - {event.end}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Función para obtener la hora de inicio y fin según el turno
function getTimeByTurn(turn: string) {
  switch (turn) {
    case 'Día': // Día
      return { start: '08:00', end: '12:00' }; // 4 horas
    case 'Tarde': // Tarde
      return { start: '14:00', end: '18:00' }; // 4 horas
    case 'Noche': // Noche
      return { start: '18:00', end: '22:00' }; // 4 horas
    default:
      return { start: '00:00', end: '00:00' };
  }
}

// Función para convertir D, T, N a "Día", "Tarde", "Noche"
function getTurnName(turn: string) {
  switch (turn) {
    case 'D':
      return 'Día';
    case 'T':
      return 'Tarde';
    case 'N':
      return 'Noche';
    default:
      return 'Desconocido';
  }
}