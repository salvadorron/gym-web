import { auth } from "@/auth"
import ClientPayment from "@/components/ui/client_payment";


export default async function PaymentsHistoryPage() {

  const session = await auth();

  return (
    <ClientPayment payment={session?.user.client?.payments || []}/>
  )
}

