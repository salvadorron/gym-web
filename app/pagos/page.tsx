import { auth } from "@/auth"
import ClientPayment from "@/components/ui/client_payment";
import { getClient } from "@/lib/data";


export default async function PaymentsHistoryPage() {

  const session = await auth();

  const clientId = session?.user.client?.id;

  if(!clientId) throw new Error('Missing Client');

  const client = await getClient(clientId);

  return (
    <ClientPayment payment={client.payments}/>
  )
}

