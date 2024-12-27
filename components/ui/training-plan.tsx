'use client'

import { useState } from "react";
import { Button } from "./button";
import { ArrowDown, ArrowDownIcon, ArrowLeft, ArrowRight, ChevronDown, ChevronsDown } from "lucide-react";

export default function TrainingPlan({
    plans
}: { plans: any[] }) {

    const [index, setIndex] = useState(0);

    const isValidBack = index > 0;
    const isValidNext = index < plans.length - 1;
    
    const handleBack = () => {
        if(!isValidBack) return;
        setIndex(index - 1);
    }

    const handleNext = () => {
        if(!isValidNext) return;
        setIndex(index + 1);
    }




    return (
        <div className="bg-red-900 p-2 mt-20">
        <div className="container flex flex-col items-center mx-auto">
            <div className="flex flex-col gap-4 w-full pt-20">

            

                <div className="flex flex-col items-center gap-4 border-2 p-2 rounded-md  min-h-[600px]">
                    <h1 className="text-white font-medium text-xl text-nowrap">Plan de Entrenamiento</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" disabled={!isValidBack} onClick={handleBack}><ArrowLeft className="w-6 h-6" /></Button>
                        <h2 className="text-white font-medium text-xl text-nowrap">{plans[index].name}</h2>
                        <Button variant="outline" disabled={!isValidNext} onClick={handleNext}><ArrowRight className="w-6 h-6" /></Button>
                    </div>
                    {plans.map((plan: any) => {

                        return plan.trainings.map((training: any) => {

                            return <div key={crypto.randomUUID()} className="flex flex-col gap-4 w-full">
                                <h1 className="text-white font-medium text-xl text-nowrap">{training.name}</h1>

                                {training.excersises.map((excersise: any) => (

                                    <div key={crypto.randomUUID()} className="flex items-center  justify-between gap-4 w-full bg-white shadow rounded-md p-4">
                                        <h1 className="font-medium text-xl text-nowrap">{excersise.name}</h1>
                                        <div className="flex items-center gap-4">
                                            {excersise.repeats !== 0 && <h2 className="font-medium text-xl text-nowrap">{excersise.repeats} repeticiones</h2>}
                                            {excersise.series !== 0 && <h2 className="font-medium text-xl text-nowrap">{excersise.series} series</h2>}
                                            <Button variant="ghost"><ChevronsDown className="w-6 h-6" /></Button>
                                        </div>
                                    </div>


                                ))}
                            </div>
                        })
                    })
                    }

            </div>
            </div>
        </div>
    </div>  
    )
}