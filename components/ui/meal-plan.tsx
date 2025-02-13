import { NutritionalPlan } from "@/lib/definitions"
import { CalendarDays, Clock, Flame, Utensils } from "lucide-react"

interface Comida {
  nombre: string
  hora: string
  alimentos: string[]
  calorias: number
}

interface PlanDiario {
  fecha: string
  comidas: Comida[]
}

const nutritionalPlan: PlanDiario = {
  fecha: "2025-02-04",
  comidas: [
    {
      nombre: "Desayuno",
      hora: "07:00",
      alimentos: ["Avena con frutas", "Claras de huevo", "Batido de proteínas"],
      calorias: 450,
    },
    {
      nombre: "Almuerzo",
      hora: "12:00",
      alimentos: ["Pechuga de pollo a la parrilla", "Arroz integral", "Ensalada mixta"],
      calorias: 650,
    },
    {
      nombre: "Merienda",
      hora: "16:00",
      alimentos: ["Yogur griego", "Nueces", "Manzana"],
      calorias: 300,
    },
    {
      nombre: "Cena",
      hora: "20:00",
      alimentos: ["Salmón al horno", "Quinoa", "Vegetales al vapor"],
      calorias: 550,
    },
  ],
}


const header = [{meal: "breakfast", time: '7:00'}, {meal: "lunch", time: '12:00'}, {meal: "snacks", time: '16:00'}, {meal: "dinner", time: '20:00'}]

export default function MealPlan({ nutritionalPlan }: { nutritionalPlan: NutritionalPlan | undefined }) {
  if (!nutritionalPlan) return (
    <div className=" bg-gray-900/90 text-gray-100 w-full max-w-4xl rounded-xl">
      <header className=" p-6 shadow-lg rounded-t-xl">
        <h1 className="text-3xl font-bold text-center text-white">Plan Nutricional</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <p>No se han asignado un plan nutricional actualmente</p>
      </main>
    </div>
  )


  return (
    <div className=" bg-gray-900/90 text-gray-100 w-full max-w-4xl rounded-xl">
      <header className=" p-6 shadow-lg rounded-t-xl">
        <h1 className="text-3xl font-bold text-center text-white">Plan Nutricional</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-gray-300">
            <CalendarDays className="w-6 h-6" />
            <span className="text-xl font-semibold">{nutritionalPlan.startDate}</span>
          </div>
          <div className=" px-4 py-2 rounded-full text-white shadow">
            <span className="font-bold">
              Total Calorías: {nutritionalPlan.calories}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {header.map((comida, index) => (
            <div
              key={index}
              className="bg-gray-800 border-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-red-500/20 transition-shadow duration-300"
            >
              <div className=" p-4">
                <h2 className="text-2xl font-bold text-white">{comida.meal}</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4 ">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>{comida.time}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {JSON.parse(JSON.stringify(nutritionalPlan))[comida.meal].split(',').map((alimento: string, idx: number) => (
                    <li key={idx} className="flex items-center space-x-2 text-gray-300">
                      <Utensils className="w-4 h-4 text-red-400" />
                      <span>{alimento}</span>
                    </li>
                  ))}
                </ul>
                {/* <div className="flex justify-end items-center space-x-2">
                <Flame className="text-orange-400 w-5 h-5" />
                  <span className=" bg-gray-800 text-sm font-semibold text-white">
                    {comida.calorias} calorías
                  </span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

