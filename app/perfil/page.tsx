import { auth, unstable_update } from "@/auth";
import Profile from "@/components/ui/profile";
import { User } from "@/lib/definitions";

export default async function ProfilePage() {

    const session = await auth();

    if(!session?.user) return 'Loading...'

    const updateSession = async (user: User) => {
        'use server'
        const updated = await unstable_update({ user })
        console.log(updated)
    }

  return (
      <Profile user={session.user} updateSession={updateSession} />
  )
}