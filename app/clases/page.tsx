import { ExerciseForm } from "@/components/ui/excercise_form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkoutForm } from "@/components/ui/workout_form"
import splash from '../../public/2.webp';
import { getExcersises } from "@/lib/data";

export default async function WorkoutsPage() {
  const excercises = await getExcersises(); 
  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
    <div className="container py-10 ">
      <Tabs defaultValue="workout" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workout">Nuevo Entrenamiento</TabsTrigger>
          <TabsTrigger value="exercise">Nuevo Ejercicio</TabsTrigger>
        </TabsList>
        <TabsContent value="workout" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Crear Nuevo Entrenamiento</h2>
            <p className="text-gray-300">Agrega un nuevo entrenamiento con sus ejercicios</p>
          </div>
          <WorkoutForm data={excercises} />
        </TabsContent>
        <TabsContent value="exercise" className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Registrar Nuevo Ejercicio</h2>
            <p className="text-gray-300">Agrega un nuevo ejercicio a la biblioteca</p>
          </div>
          <ExerciseForm />
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}
