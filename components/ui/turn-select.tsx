'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function TurnSelect({ onSelectedTurn, value }: { onSelectedTurn: (turnValue: string) => void, value: string }) {
    return (
        <Select onValueChange={onSelectedTurn} value={value} >
            <SelectTrigger className="h-8">
                <SelectValue placeholder="Elige un Turno"   />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"M"}>Mañana</SelectItem>
                <SelectItem value={"T"}>Tarde</SelectItem>
                <SelectItem value={"N"}>Noche</SelectItem>
            </SelectContent>
        </Select>   

    )
}