import SubscriptionForm from "@/components/ui/suscription-form";

export interface SubscriptionPlan {
    id: string
    name: string
    type: "monthly" | "annual"
    price: number
    benefits: string[]
  }

export default async function SubscriptionPage() {
    
    const plan: SubscriptionPlan = {
      id: "premium-monthly",
      name: "Plan Premium",
      type: "monthly",
      price: 49.99,
      benefits: [
        "Acceso ilimitado al gimnasio",
        "Clases grupales incluidas",
        "Evaluación física mensual",
        "Programa personalizado",
        "Acceso a la app móvil",
        "Seguimiento nutricional",
      ],
    }
    
    
      return <SubscriptionForm plan={plan} />
    
}