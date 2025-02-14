'use client'
import { getMunicipalities } from "@/lib/data";
import { Municipality } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

export default function MunicipalitySelector({ className, value, stateValue, onMunicipalitySelected }: { className?: string, value: string, stateValue: string, onMunicipalitySelected: (value: string) => void }) {
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(stateValue) {
        setLoading(true);
            getMunicipalities(+stateValue)
            .then((currentMunicipalities) => {
                setMunicipalities(currentMunicipalities)
            })
            .finally(() => {
                setLoading(false)
            })
            
        }

    }, [stateValue])


    return (
        <>
            <Label htmlFor="municipality" className="text-white">
                Municipio
            </Label>
            <Select
                value={value}
                onValueChange={onMunicipalitySelected}
            >
                <SelectTrigger className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    <SelectValue placeholder="Seleccionar municipio" />
                </SelectTrigger>
                <SelectContent className={cn("bg-slate-800 border-slate-700 text-white", className)}>
                    {loading && <p>Cargando...</p>}
                    {!loading && municipalities?.map((municipality) => (
                        <SelectItem key={municipality.id} value={municipality.id.toString()}>
                            {municipality.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}