'use client'
import { getParrishes } from "@/lib/data";
import { Parrish } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export default function ParrishSelector({ value, municipalityValue, onParrishSelected }: { value: string, municipalityValue: string, onParrishSelected: (value: string) => void }) {
    const [parrishes, setParrishes] = useState<Parrish[]>([])

    useEffect(() => {
        if(municipalityValue){
            getParrishes(+municipalityValue).then((currentParrishes) => {
                setParrishes(currentParrishes)
            })
        }
    }, [municipalityValue])


    return (
        <>
            <Label htmlFor="parrish" className="text-white">
                Parroquia
            </Label>
            <Select
                value={value}
                onValueChange={onParrishSelected}
            >
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Seleccionar parroquia" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {parrishes?.map((parrish) => (
                        <SelectItem key={parrish.id} value={parrish.id.toString()}>
                            {parrish.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}