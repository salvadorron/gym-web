'use client'

import TextBox from "./text-box";
import splash from '../../public/2.webp';
import { Button } from "./button";
import { CalendarSearchIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import dayjs from 'dayjs'
import weekOfYearPlugin from 'dayjs/plugin/weekday';
import { DaysOfWeek } from "@/lib/utils";
import { Client } from "@/lib/definitions";
dayjs.extend(weekOfYearPlugin);

export default function TrainingPlan({
    client
}: { client: Client }) {
    

    return (
        <div className="bg-red-900 p-2 min-h-screen " style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
        <div className="container flex flex-col items-center mx-auto">
            <div className="flex flex-col gap-4 w-full pt-24">
            

                <div className="flex flex-col items-center gap-4 p-2 rounded-md  min-h-[600px]">
                    <h1 className="text-white font-medium text-xl text-nowrap">Plan de Entrenamiento</h1>
                    <h2 className="text-white font-medium text-xl text-nowrap">{client.plan?.name}</h2>

                    <div className="grid grid-cols-3 gap-4">

                        {client.plan?.trainings.map((training) => { 
                                const days = training?.schedule?.days.map(day => day.day_of_week); 

                                const listDates = days?.map((currentDay) => {
                                    return nextDay(new Date(), DaysOfWeek[currentDay as keyof typeof DaysOfWeek]);
                               });

                               const datesSorted = listDates?.sort((a, b) => a.getTime() - b.getTime());

                                return <div key={crypto.randomUUID()} className="flex flex-col justify-between gap-4 w-full bg-[#111111c4] p-4 rounded-md">
                                    <div className="flex flex-col gap-4">
                                            <h1 className="text-white font-medium text-lg text-nowrap">{training.name}</h1>
                                            <div className="flex flex-end">
                                                <div className="flex justify-between gap-2">
                                                    <TimerIcon className="w-4 h-4 text-white" />
                                                    <h3 className="text-white text-sm uppercase">Proxima clase: {datesSorted === undefined || datesSorted.length === 0 ? 'No hay clases programadas' : dayjs(datesSorted[0]).format('DD/MM/YYYY')}</h3>
                                                    {/* <h3 className="text-white text-sm uppercase">{dayjs(training.schedule?.time_start).add(4, 'hour').format('HH:mm')} - {dayjs(training.schedule?.time_end).add(4, 'hour').format('HH:mm')}</h3> */}
                                                </div>
                                            </div>
                                        {training.excersises.map((excersise) => <TextBox key={crypto.randomUUID()} excersise={excersise} /> )}
                                    </div>
                                    <div className="flex justify-end  items-center">
                                            <Button  className="text-white w-full bg-[#6a0909b8]" asChild>
                                                <Link href={`/horario?planId=${training.id}`}>
                                                    Ver en Horario <CalendarSearchIcon className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                    </div> 
                            </div>
                            })
                        }
                    </div>
                    

            </div>
            </div>
        </div>
    </div>  
    )
}


function nextDay(date: Date, dayNumber: number){
    date.setDate(date.getDate() + (dayNumber+(7-date.getDay())) % 7);
    return date;
}


