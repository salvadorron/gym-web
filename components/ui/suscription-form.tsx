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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

export interface SubscriptionPlan {
    id: string
    name: string
    type: "monthly" | "annual"
    price: number
    benefits: string[]
  }
  

type ScheduleDay = {
  day: string
  selected: boolean
  shift: string
}

export default function SubscriptionForm({ plan }: { plan?: SubscriptionPlan }) {
  const [step, setStep] = useState(1)
  const [schedule, setSchedule] = useState<ScheduleDay[]>([
    { day: "Lunes", selected: false, shift: "" },
    { day: "Martes", selected: false, shift: "" },
    { day: "Miércoles", selected: false, shift: "" },
    { day: "Jueves", selected: false, shift: "" },
    { day: "Viernes", selected: false, shift: "" },
    { day: "Sábado", selected: false, shift: "" },
  ])
  const [paymentMethod, setPaymentMethod] = useState("")

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

   const initialOptions = {
          clientId: "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1", // Reemplaza con tu ID de cliente real
          currency: "USD", // Cambia a la moneda que necesites
          intent: "capture", // O "authorize" según tus requerimientos
        };
      
        const [orderId, setOrderId] = useState(null);
      
      const handleClick = async () => {
        try {
          const response = await fetch('/api/checkout', { // Crea una ruta en tu backend para crear la orden
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: 400,
              descripion: 'Plan Basico' // Reemplaza con el monto correcto
            }),
          });
    
          const data = await response.json();
          setOrderId(data.id); // Guarda el ID de la orden
    
          // Abre la ventana emergente de PayPal
          const popup = window.open(`https://www.paypal.com/checkoutnow?token=${data.id}`, 'paypal_popup', 'width=600,height=400');
    
          // Escucha el evento 'message' para saber cuando se cierra la ventana emergente
          window.addEventListener('message', (event) => {
            if (event.source === popup) {
              // La ventana emergente se ha cerrado
              console.log('Ventana emergente cerrada');
              // Puedes realizar acciones aquí, como actualizar el estado de la orden
            }
          });
        } catch (error) {
          console.error("Error al crear la orden:", error);
          // Maneja el error, por ejemplo, mostrando un mensaje al usuario
        }
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
                Membresía {plan.type === "monthly" ? "Mensual" : "Anual"}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${plan.price}</div>
              <div className="text-sm text-gray-200">{plan.type === "monthly" ? "/mes" : "/año"}</div>
            </div>
          </div>

          <Separator className="my-4 bg-white/20" />

          <div className="grid grid-cols-2 gap-4">
            {plan.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{step === 1 ? "Horario de Entrenamiento" : "Método de Pago"}</CardTitle>
        <CardDescription className="text-gray-400">
          {step === 1 ? "Selecciona tus días y turnos de entrenamiento" : "Selecciona tu método de pago preferido"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {step === 1 ? (
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
        ) : (
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 ">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#232b3b]">
              <RadioGroupItem value="pago-movil" id="pago-movil" className="border-blue-500 text-blue-500" />
              <Label htmlFor="pago-movil" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Pago Móvil
              </Label>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#232b3b]">
              <RadioGroupItem value="zelle" id="zelle" className="border-blue-500 text-blue-500" />
              <Label htmlFor="zelle" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Zelle
              </Label>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#232b3b]">
              <RadioGroupItem value="paypal" id="paypal" className="border-blue-500 text-blue-500"/>
              <Label htmlFor="paypal" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Paypal
              </Label>
            </div>
          </RadioGroup>
        )}
      </CardContent>

      <CardFooter className="flex justify-between ">
        {step === 2 && (
          <Button className="text-black" variant="outline" onClick={() => setStep(1)}>
            Atrás
          </Button>
        )}
         <PayPalScriptProvider options={initialOptions}>
        <Button
          className="ml-auto bg-blue-900/50 hover:bg-blue-500/50"
          disabled={step === 1 ? !isScheduleValid() : !paymentMethod}
          onClick={() => {
            if (step === 1) {
              setStep(2)
            } else {
              // Handle subscription submission
              handleClick()
              console.log("Plan:", plan)
              console.log("Schedule:", schedule)
              console.log("Payment Method:", paymentMethod)
            }
          }}
        >
          {step === 1 ? "Continuar" : "Confirmar Suscripción"}
        </Button>
        
        </PayPalScriptProvider>
      </CardFooter>
    </Card>
    </div>
  )
}

