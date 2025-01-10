'use client'

import TextBox from "./text-box";
import myImage from '../../public/1.webp';

export default function TrainingPlan({
    plans
}: { plans: any[] }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    // const [index, setIndex] = useState(0);

    // const isValidBack = index > 0;
    // const isValidNext = index < plans.length - 1;
    
    // // const handleBack = () => {
    // //     if(!isValidBack) return;
    // //     setIndex(index - 1);
    // // }

    // // const handleNext = () => {
    // //     if(!isValidNext) return;
    // //     setIndex(index + 1);
    // // }

    return (
        <div className="bg-red-900 p-2 min-h-screen shadow-[inset_0_0_0_800px_rgba(127,29,29,0.65)] " style={{backgroundImage: `url(${myImage.src})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="container flex flex-col items-center mx-auto">
            <div className="flex flex-col gap-4 w-full pt-24">

            

                <div className="flex flex-col items-center gap-4 p-2 rounded-md  min-h-[600px]">
                    <h1 className="text-white font-medium text-xl text-nowrap">Plan de Entrenamiento</h1>
                    <h2 className="text-white font-medium text-xl text-nowrap">{plans[0].name}</h2>
                    {plans.map((plan: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any

                        return plan.trainings.map((training: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any

                            return <div key={crypto.randomUUID()} className="flex flex-col gap-4 w-full">
                                <h1 className="text-white font-medium text-xl text-nowrap">{training.name}</h1>
                                {training.excersises.map((excersise: any) => <TextBox key={crypto.randomUUID()} trainingId={training.id} excersise={excersise} /> // eslint-disable-line @typescript-eslint/no-explicit-any
                             )} 
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