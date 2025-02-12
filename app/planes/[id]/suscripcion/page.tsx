import { auth } from "@/auth";
import SubscriptionForm from "@/components/ui/suscription-form";
import { getPlan } from "@/lib/data";


export default async function SubscriptionPage({params}: {params: Promise<{id: string}>}) {
  
      const { id } = await params;
    
      const plan = await getPlan(id);

      const session = await auth()

      return <SubscriptionForm clientId={session?.user.client?.id} plan={plan} />
    
}