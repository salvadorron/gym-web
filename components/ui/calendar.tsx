'use client';
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    CalendarEventExternal,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal';
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { usePathname, useRouter } from 'next/navigation';
export default function Calendar({ plans, selectedPlan, currentPayment }: { plans: any[], selectedPlan: string, currentPayment: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    
    
    enum DaysOfWeek {
        'Sunday' = 0,
        'Monday' = 1,
        'Tuesday' = 2,
        'Wednesday' = 3,
        'Thursday' = 4,
        'Friday' = 5,
        'Saturday' = 6,
    }


    dayjs.extend(isSameOrAfter);
    dayjs.extend(isSameOrBefore);
    
    const pathname = usePathname();
    const router = useRouter();

    const dateRange = getDates(new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31));

    const events: CalendarEventExternal[] | undefined = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    plans.forEach((plan) => {
            plan.trainings.forEach((training: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any

                    if(!training.schedule) return;

                    const timeStart = dayjs(training.schedule.time_start).format('HH:mm');
                    const timeEnd = dayjs(training.schedule.time_end).format('HH:mm');
    
                    training.schedule?.days.forEach((day: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                        const indexDay = DaysOfWeek[day.day_of_week as keyof typeof DaysOfWeek];
                        const range = plan.billing_interval === 'monthly' ? 
                                    dateRange.filter((date) => date.getDay() === indexDay && dayjs(date).isSame(currentPayment.date, 'month') && dayjs(date).isAfter(currentPayment.date, 'day')) :
                                    dateRange.filter((date) => date.getDay() === indexDay && dayjs(date).isSame(currentPayment.date, 'year') && dayjs(date).isAfter(currentPayment.date, 'day')) ;

                        if(selectedPlan === training.id) return;

                        range.forEach((date) => {
                            events.push({
                                id: crypto.randomUUID(),
                                title: training.name,
                                start: dayjs(date).format('YYYY-MM-DD') + ' ' + timeStart,
                                end: dayjs(date).format('YYYY-MM-DD') +  ' ' + timeEnd,                                
                            })
                        })
                    })
                })
        })
    
    const trainings = plans.map((plan) => plan.trainings.map((training: any) => ({ name: training.name, id: training.id }))).flat(); // eslint-disable-line @typescript-eslint/no-explicit-any

    const plugins = [createEventsServicePlugin(), createEventModalPlugin()]

    const calendar = useNextCalendarApp({
        locale: 'es-ES',
        views: [
            createViewMonthGrid(),
            createViewWeek()
        ],
        events,
        defaultView: 'month',
        isDark: true,
        selectedDate: dayjs().format('YYYY-MM-DD'),
    }, plugins) 

    useEffect(() => {
        calendar?.events.getAll();
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    if(!calendar) return <div>Cargando...</div>
    


    trainings.forEach((training) => {
        if(selectedPlan === training.id.toString()) {
            const filteredEvents = events.filter((event) => event.title === training.name);
            calendar.events.set(filteredEvents);
        }
    })

    // const eventModal = ({ calendarEvent }: { calendarEvent: CalendarEventExternal }) => {
    //     return (
    //         <div className="flex flex-col gap-2 p-8 shadow rounded-lg">
    //             <h3 className="text-white font-medium">{calendarEvent.title}</h3>
    //             <p className="text-white text-sm">{calendarEvent.description}</p>
    //         </div>
    //     )
    // }
    

    return (
        <div className="flex flex-col gap-1">
            <div className="bg-[#141218] shadow rounded-md h-20 p-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-white text-xl'>Horario de Entrenamiento</h3>
                    <Select defaultValue={selectedPlan || 'all'} onValueChange={(value) => {

                        if(value === 'all') {
                            calendar.events.set(events);
                            router.push(`${pathname}`);
                            return;
                        }

                        trainings.forEach((training) => {
                            if(value === training.id.toString()) {
                                const filteredEvents = events.filter((event) => event.title === training.name);
                                calendar.events.set(filteredEvents);
                            }
                        })
                        router.push(`${pathname}?planId=${value}`);
                        
                    }}>
                        <SelectTrigger className="bg-[#141218] w-[200px] text-white rounded-sm border-gray-100">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {trainings.map((training) => <SelectItem key={crypto.randomUUID()} value={training.id.toString()}>{training.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <ScheduleXCalendar calendarApp={calendar}   />
        </div>
    )

}

function getDates(start: Date, end: Date) {
    const arr = [];
    for(const dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};