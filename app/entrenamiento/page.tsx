import { auth } from "@/auth";
import TrainingPlan from "@/components/ui/training-plan";
import { getClient } from "@/lib/data";
import splash from '../../public/2.webp';

export default async function TrainingPage() {

    const session = await auth();

    if(!session?.user.client) throw new Error('Missing client');

    const client = await getClient(session.user.client.id);

    return (
    <div className="pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
        <TrainingPlan  />
    </div>
    )
}