'use client'

import TextBox from "./text-box";
import splash from '../../public/2.webp';
import { Button } from "./button";
import { CalendarSearchIcon, TimerIcon } from "lucide-react";
import Link from "next/link";
import dayjs from 'dayjs'
import weekOfYearPlugin from 'dayjs/plugin/weekday';
enum DaysOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}


export default function TrainingPlan({
    client
}: { client: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    
    dayjs.extend(weekOfYearPlugin);

    const getNextDay = (day: string[]) => {
        const currentDate = dayjs();
        const days = day.map(day => {
            const nextDay = currentDate.weekday(DaysOfWeek[day as keyof typeof DaysOfWeek]);
            return nextDay;
        })

        let nextDay = days[0];

        days.forEach(day => {
            if (day.isBefore(nextDay)) {
                nextDay = day;
            }
        })

        return nextDay

    }

    return (
        <div className="bg-red-900 p-2 min-h-screen " style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
        <div className="container flex flex-col items-center mx-auto">
            <div className="flex flex-col gap-4 w-full pt-24">

            

                <div className="flex flex-col items-center gap-4 p-2 rounded-md  min-h-[600px]">
                    <h1 className="text-white font-medium text-xl text-nowrap">Plan de Entrenamiento</h1>
                    <h2 className="text-white font-medium text-xl text-nowrap">{client.plan.name}</h2>

                    <div className="grid grid-cols-3 gap-4">

                        {client.plan.trainings.map((training: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                const days = training?.schedule?.days.map((day: any ) => day.day_of_week); // eslint-disable-line @typescript-eslint/no-explicit-any

                                return <div key={crypto.randomUUID()} className="flex flex-col justify-between gap-4 w-full bg-[#111111c4] p-4 rounded-md">
                                    <div className="flex flex-col gap-4">
                                            <h1 className="text-white font-medium text-lg text-nowrap">{training.name}</h1>
                                            <div className="flex flex-end">
                                                <div className="flex justify-between gap-2">
                                                    <TimerIcon className="w-4 h-4 text-white" />
                                                    <h3 className="text-white text-sm uppercase">Proxima clase: {days === undefined || days.length === 0 ? 'No hay clases programadas' : getNextDay(days).format('DD/MM/YYYY')}</h3>
                                                </div>
                                            </div>
                                        
                                    {training.excersises.map((excersise: any) => <TextBox key={crypto.randomUUID()} excersise={excersise} /> // eslint-disable-line @typescript-eslint/no-explicit-any
                                    
                                    )}
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