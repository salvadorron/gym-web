"use client"

import { useState } from "react"
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import splash from '../../public/2.webp';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer, DISPATCH_ACTION, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js"
import { Checkout } from "./checkout"
import { Plan } from "@/lib/definitions"


export default function SubscriptionForm({ plan, clientId }: { plan?: Plan, clientId: number | undefined }) {

  const [schedule, setSchedule] = useState<any[]>([
    { day: "Lunes", selected: false, shift: "" },
    { day: "Martes", selected: false, shift: "" },
    { day: "Miércoles", selected: false, shift: "" },
    { day: "Jueves", selected: false, shift: "" },
    { day: "Viernes", selected: false, shift: "" }
  ])

  if(!clientId) throw new Error('Missing Client')

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule]
    newSchedule[index].selected = !newSchedule[index].selected
    setSchedule(newSchedule)
  }

  const setShift = (index: number, shift: string) => {
    const newSchedule = [...schedule]
    newSchedule[index].shift = shift
    setSchedule(newSchedule)
  }

  const isScheduleValid = () => {
    return schedule.some((day) => day.selected && day.shift !== "")
  }

  if (!plan) {
    return <div className="text-white">Error: Plan information is missing.</div>
  }


  return (
    <div className="min-h-screen p-8" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain' }}>
    <Card className="w-full max-w-2xl mx-auto bg-[#1a2332] text-white">
      {/* Plan Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <div className="relative p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
              <Badge variant="secondary" className="mb-4">
                Membresía {plan.duration === "MONTHLY" ? "Mensual" : "Anual"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${plan.price}</div>
              <div className="text-sm text-gray-200">{plan.duration === "MONTHLY" ? "/mes" : "/año"}</div>
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="grid grid-cols-2 gap-4">
            {plan.features.split(',').map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">Horario de Entrenamiento</CardTitle>
        <CardDescription className="text-gray-400">
          Selecciona tus días y turnos de entrenamiento
        </CardDescription>
      </CardHeader>

      <CardContent>
          <div className="space-y-6">
            {schedule.map((day, index) => (
              <div key={day.day} className="flex space-x-4 p-4 rounded-lg bg-[#232b3b]">
                <Button
                  data-selected={day.selected}
                  onClick={() => toggleDay(index)}
                  className="w-32 flex justify-start data-[selected=true]:bg-blue-500/50 data-[selected=true]:text-white data-[selected=false]:bg-blue-900/50"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {day.day}
                </Button>
                {day.selected && (
                  <Select value={day.shift} onValueChange={(value) => setShift(index, value)}>
                    <SelectTrigger className="w-[250px] focus:ring-blue-500 text-black">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Mañana (6:00 - 12:00)</SelectItem>
                      <SelectItem value="afternoon">Tarde (12:00 - 18:00)</SelectItem>
                      <SelectItem value="evening">Noche (18:00 - 22:00)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
      </CardContent>

      <CardFooter className="flex justify-between ">
         
        <Checkout plan={plan} clientId={+clientId} schedule={schedule} />
        
      </CardFooter>
    </Card>
    </div>
  )
}