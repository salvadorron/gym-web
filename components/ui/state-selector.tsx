'use client'
import { getStates } from "@/lib/data";
import { State } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

export default function StateSelector({className, value, onStateSelected,  }: { className?: string, value: string, onStateSelected: (value: string) => void }) {

    const [states, setStates] = useState<State[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getStates()
        .then((currentStates) => {
            setStates(currentStates)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])


    return (
        <>
            <Label htmlFor="state" className="text-white">
                Estado
            </Label>
            <Select
                value={value}
                onValueChange={onStateSelected}
            >
                <SelectTrigger className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    {loading && <p>Cargando...</p>}
                    {!loading && states?.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                            {state.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )

}