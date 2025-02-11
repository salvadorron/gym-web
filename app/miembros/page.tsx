import { getStates, getUsers } from '@/lib/data';
import { User } from '@/lib/definitions';
import Members from '@/components/ui/members';


export default async function MembersPage() {

  const members: User[] = await getUsers();

  return (
    <Members members={members} />
  )
}

