'use client'
import { useEffect, useState } from "react"
import TurnSelect from "./turn-select"
import DayPicker from "../day-picker"
import { Checkout } from "@/app/ui/checkout"
import { Plan } from "@/lib/definitions"

export default function PurchaseSchedule({ plan, clientId }: { plan: Plan, clientId: number }) {
    const [selectedDays, setSelectedDays] = useState([0,0,0,0,0])
    const [turnValue, setTurnValue] = useState<string>("")

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center p-4">
                <h2 className="text-white text-lg uppercase">Turno</h2>
                <TurnSelect onSelectedTurn={setTurnValue} value={turnValue} />
            </div>
                <DayPicker  onSelectedDays={setSelectedDays} value={selectedDays} />
            <div className="w-full overflow-auto max-h-[680px]">
                <Checkout plan={plan} clientId={clientId} selectedDays={selectedDays} selectedTurn={turnValue} />
            </div>
        </div>
    )
}