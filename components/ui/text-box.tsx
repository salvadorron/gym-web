'use client'

import { useState } from "react";
import { ChevronsDown } from "lucide-react";

export default function TextBox({ excersise }: { excersise: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const [openBox, setOpenBox] = useState(false);

    return (
        <div className="flex flex-col items-center  justify-between gap-4 w-full bg-white shadow rounded-md p-4">


            <div className="flex items-center justify-between w-full hover:cursor-pointer" onClick={() => setOpenBox(!openBox)}>
                <h1 className="font-medium text-xl text-nowrap">{excersise.name}</h1>
                <div className="flex items-center gap-4">
                    {excersise.repeats !== 0 && <h2 className="font-medium text-xl text-nowrap">{excersise.repeats} repeticiones</h2>}
                    {excersise.series !== 0 && <h2 className="font-medium text-xl text-nowrap">{excersise.series} series</h2>}
                    <ChevronsDown className="w-5 h-5 " />
                </div>
            </div>
            <div data-open={openBox} className="data-[open=true]:block data-[open=true]:opacity-100 opacity-0 hidden w-full bg-yellow-50 animate-in shadow-sm border-l-4 border-yellow-400 p-4">
                {excersise.description.split('.').map((line: string) => <p key={crypto.randomUUID()} className="text-sm font-medium">{line.length !== 0 && `${line}.`}</p>)}
            </div>
        </div>
    )
}