'use client'
import { getStates } from "@/lib/data";
import { State } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export default function StateSelector({ value, onStateSelected,  }: { value: string, onStateSelected: (value: string) => void }) {

    const [states, setStates] = useState<State[]>([])

    useEffect(() => {
        getStates().then((currentStates) => {
            setStates(currentStates)
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
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {states.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                            {state.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )

}