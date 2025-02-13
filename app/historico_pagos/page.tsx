
import Payments from "@/components/ui/payments";
import { getUsers } from "@/lib/data"
export default async function PagosPage() {

  const users = await getUsers();

  return <Payments users={users} />

}

