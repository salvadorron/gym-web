import { getClient } from "@/lib/data";
import Toolbar from "../ui/toolbar";
import { auth } from "@/auth";

export default async function MembershipLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();

    if(!session?.user?.client) {
        throw new Error('Missing client');
    }

    const client = await getClient(session?.user.client.id)
    

    return (
        <div className="">
            <Toolbar session={session} client={client} />
            {children}
        </div>
    )
}