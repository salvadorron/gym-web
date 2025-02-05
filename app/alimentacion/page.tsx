import MealPlan from "@/components/meal-plan";
import splash from '../../public/2.webp';

export default function MealPlanPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
        <MealPlan />
    </div>
  )
}