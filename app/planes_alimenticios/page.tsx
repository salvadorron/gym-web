import Nutritional from "@/components/ui/nutritional";
import { getUsers } from "@/lib/data";

export default async function PlanesAlimenticiosPage() {
  
  const users = await getUsers({ roleId: 'client' })
  
  return <Nutritional users={users} />
}

