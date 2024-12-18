import { auth } from "@/auth";
import Toolbar from "../ui/toolbar";
import { getClient } from "@/lib/data";

export default async function ScheduleLayout({ children }: { children: React.ReactNode }) {

    const session = await auth() as any
    const client = await getClient(session?.user.client.id)


    return (
        <div className="min-h-screen bg-red-900">
            <Toolbar session={session} client={client} />
            {children}
        </div>
    )
}