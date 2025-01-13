import { auth } from "@/auth";
import TrainingPlan from "@/components/ui/training-plan";
import { getClient } from "@/lib/data";

export default async function TrainingPage() {

    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    const client = await getClient(session.user.client.id);

    return <TrainingPlan client={client} />
}