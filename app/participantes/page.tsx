import { auth } from "@/auth"
import Participantes from "@/components/ui/participantes";
import { getMemberships, getUsers } from "@/lib/data"

export default async function ParticipantesPage() {

  const session = await auth();

  const trainerId = session?.user.trainer?.id

  const users = await getUsers({ trainerId })

  const plans = await getMemberships()


  return <Participantes plans={plans} users={users}  />
}

