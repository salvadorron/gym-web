import MealPlan from "@/components/ui/meal-plan";
import splash from '../../public/2.webp';
import { auth } from "@/auth";
import { getNutritionalPlan } from "@/lib/data";

export default async function MealPlanPage() {

  const session = await auth();

  const nutritionalPlan = await getNutritionalPlan(session?.user.nutritional_plan_id || -1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
        <MealPlan nutritionalPlan={nutritionalPlan} />
    </div>
  )
}