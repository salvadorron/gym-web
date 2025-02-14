'use client'
import { getParrishes } from "@/lib/data";
import { Parrish } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

export default function ParrishSelector({ className, value, municipalityValue, onParrishSelected }: { className?: string, value: string, municipalityValue: string, onParrishSelected: (value: string) => void }) {
    const [parrishes, setParrishes] = useState<Parrish[]>([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(municipalityValue){
            setLoading(true);
            getParrishes(+municipalityValue)
            .then((currentParrishes) => {
                setParrishes(currentParrishes)
            })
            .finally(() => {
                setLoading(false);
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
                <SelectTrigger className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    <SelectValue placeholder="Seleccionar parroquia" />
                </SelectTrigger>
                <SelectContent className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    {loading && <p>Cargando...</p>}
                    {!loading && parrishes?.map((parrish) => (
                        <SelectItem key={parrish.id} value={parrish.id.toString()}>
                            {parrish.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}