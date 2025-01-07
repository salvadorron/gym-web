'use client'

import { useState } from "react";
import { CalendarSearchIcon, ChevronsDown } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function TextBox({ trainingId, excersise }: { trainingId: string, excersise: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const [openBox, setOpenBox] = useState(false);
    const router = useRouter();

    return (
        <div className="flex flex-col items-center  justify-between gap-4 w-full bg-[#141218] shadow rounded-md p-4">


            <div className="flex items-center justify-between w-full hover:cursor-pointer" onClick={() => setOpenBox(!openBox)}>
                <h1 className="font-medium text-xl text-nowrap text-white">{excersise.name}</h1>
                <div className="flex items-center gap-4">
                    {excersise.repeats !== 0 && <h2 className="font-medium text-xl text-nowrap text-white">{excersise.repeats} repeticiones</h2>}
                    {excersise.series !== 0 && <h2 className="font-medium text-xl text-nowrap text-white">{excersise.series} series</h2>}
                    <ChevronsDown className="w-5 h-5 text-white" />
                </div>
            </div>
            <div data-open={openBox} className="data-[open=true]:flex flex-col gap-2 w-full data-[open=true]:opacity-100 opacity-0 hidden animate-in" >
                <div className="w-full bg-[#17131b] shadow-sm border-l-4 border-green-700 p-4">
                    {excersise.description.split('.').map((line: string) => <p key={crypto.randomUUID()} className="text-sm font-medium text-white">{line.length !== 0 && `${line}.`}</p>)}
                </div>
                <div className="flex justify-end">
                <Button variant={'ghost'} className="text-white h-8 " onClick={() => router.push(`/horario/?planId=${trainingId}`)}>
                    Ver Calendario <CalendarSearchIcon className="w-4 h-4"/>
                </Button>
                </div>
            </div>
        </div>
    )
}