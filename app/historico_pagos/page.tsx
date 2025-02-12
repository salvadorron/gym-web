
import Payments from "@/components/ui/payments";
import { getPayments, getUsers } from "@/lib/data"
export default async function PagosPage() {

  const users = await getUsers();

  return <Payments users={users} />

}

