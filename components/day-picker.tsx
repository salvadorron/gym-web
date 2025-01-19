'use client'

import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css'
import '../app/day-picker.style.css';
import { useEffect } from "react";
import dayjs from 'dayjs';



export default function DayPicker () {
    
    const plugins = [createEventsServicePlugin()]


    const calendar = useNextCalendarApp({
        locale: 'es-ES',
        views: [
            createViewWeek()
        ],
        datePicker: {
            disabled: true,
        },
        isResponsive: true,
        defaultView: 'week',
        minDate: '2022-01-19',
        maxDate: '2025-01-24',
        
        isDark: true,
        selectedDate: dayjs().format('YYYY-MM-DD'),
    }, plugins) 

    useEffect(() => {
        calendar?.events.getAll();
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    if(!calendar) return <div>Cargando...</div>


    return (
        <div className="flex flex-col">
            <ScheduleXCalendar calendarApp={calendar}  />
        </div>
    )
}