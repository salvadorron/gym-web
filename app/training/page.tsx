import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function TrainingPage() {


    let training = true;

    return (
        <div className="bg-red-900 p-2 mt-24">
            <div className="container flex flex-col items-center mx-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-white font-medium text-xl text-nowrap">Entrenamiento Actual</h1>
                        <Progress value={training ? 90 : 0} color="green" className="bg-white w-[600px]" />
                        <div className="text-white flex items-center gap-4">
                            <h1 className="font-medium text-xl text-nowrap">{training ? "3/4" : "0/0"}</h1>
                            <h2 className="font-medium text-xl text-nowrap">{training ? "90%" : "0%"}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <h1 className="text-white font-medium text-xl text-nowrap">{training ? "Nivel 1" : "Nivel 0"}</h1>
                        <Separator className="h-6" orientation="vertical" />
                        <h2 className="text-white font-medium text-xl text-nowrap">{training ? "3 Sets" : "0 Sets"}</h2>
                    </div>

                    <Separator />

                    <div className="flex flex-col items-center gap-4 border-2 p-2 rounded-md min-h-[600px]">
                        <h1 className="text-white font-medium text-xl text-nowrap">Ejercicios</h1>

                    {training  ? <><div className="flex flex-col gap-4 w-full">

                            <h1 className="text-white font-medium text-xl text-nowrap">Jueves 31/06/2024</h1>

                            <div className="flex items-center gap-4 w-full bg-white shadow rounded-md p-4">
                                <h1 className="font-medium text-xl text-nowrap">Prensa de Banca</h1>
                                <Separator className="h-6" orientation="vertical" />
                                <h2 className="font-medium text-xl text-nowrap">15 Repeticiones</h2>
                            </div>

                            <div className="flex items-center gap-4 w-full  bg-white shadow rounded-md p-4">
                                <h1 className="font-medium text-xl text-nowrap">Abdominales</h1>
                                <Separator className="h-6" orientation="vertical" />
                                <h2 className="font-medium text-xl text-nowrap">15 Repeticiones</h2>
                            </div>

                        </div>
                        
                        <div className="flex flex-col gap-4 w-full">

                                <h1 className="text-white font-medium text-xl text-nowrap">Viernes 01/07/2024</h1>

                                <div className="flex items-center gap-4 w-full bg-white shadow rounded-md p-4">
                                    <h1 className="font-medium text-xl text-nowrap">Sentadillas con Barra</h1>
                                    <Separator className="h-6" orientation="vertical" />
                                    <h2 className="font-medium text-xl text-nowrap">15 Repeticiones</h2>
                                </div>

                                <div className="flex items-center gap-4 w-full  bg-white shadow rounded-md p-4">
                                    <h1 className="font-medium text-xl text-nowrap">Mancuernas</h1>
                                    <Separator className="h-6" orientation="vertical" />
                                    <h2 className="font-medium text-xl text-nowrap">15 Repeticiones</h2>
                                </div>

                            </div>
                            </> : (
                                <div className="flex flex-col justify-center gap-4 w-full">
                                    <h1 className="text-white font-medium text-xl text-nowrap">No hay entrenamientos disponibles, prueba a obtener un plan en la seccion de <Link href="/membership" className="underline">membresias</Link></h1>
                                </div>
                            )}
                </div>
                </div>
            </div>
        </div>  
    )
}