import { getClient } from "@/lib/data";
import Toolbar from "../ui/toolbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MembershipLayout({ children }: { children: React.ReactNode }) {

    const session = await auth() as any // eslint-disable-line @typescript-eslint/no-explicit-any
    const client = await getClient(session?.user.client.id)
    

    return (
        <div className="">
            <Toolbar session={session} client={client} />
            {children}
        </div>
    )
}