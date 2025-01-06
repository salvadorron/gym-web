'use client';
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
export default function Calendar({ plans }: { plans: any[] }) {

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
    
    const dateRange = getDates(new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31));

    const events: any[] = [];

    plans.forEach((plan) => {
        plan.trainings.forEach((training: any) => {

                if(!training.schedule) return;

                const timeStart = new Date(training.schedule.time_start);
                const timeEnd = new Date(training.schedule.time_end);

                training.schedule?.days.forEach((day: any) => {
                    const indexDay = DaysOfWeek[day.day_of_week as keyof typeof DaysOfWeek];
                    const range = dateRange.filter((date) => date.getDay() === indexDay && dayjs(date).isSameOrAfter(timeStart, 'day') && dayjs(date).isSameOrBefore(timeEnd, 'day'));
                    range.forEach((date) => {
                        events.push({
                            id: crypto.randomUUID(),
                            title: training.name,
                            start: dayjs(date).format('YYYY-MM-DD'),
                            end: dayjs(date).format('YYYY-MM-DD'),
                            description: training.description
                        })
                    })
                })
            })
    })
    


    const trainings = plans.map((plan) => plan.trainings.map((training: any) => training.name)).flat();

    const plugins = [createEventsServicePlugin()]

    const calendar = useNextCalendarApp({
        locale: 'es-ES',
        views: [
            createViewMonthGrid()
        ],
        events,
        isDark: true,
        selectedDate: '2025-01-01'
    }, plugins) 

    useEffect(() => {
        calendar?.events.getAll();
    }, [])

    return (
        <div className="flex flex-col gap-1">
            <div className="bg-[#141218] shadow rounded-md h-20 p-4">
                <div className="flex justify-between items-center">
                    <h3 className='text-white text-xl'>Horario de Entrenamiento</h3>
                    <Select defaultValue='all'>
                        <SelectTrigger className="bg-[#141218] w-[200px] text-white rounded-sm border-gray-100">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {trainings.map((training) => <SelectItem key={crypto.randomUUID()} value={training}>{training}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )

}

function getDates(start: Date, end: Date) {
    const arr = [];
    for(const dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};