import { auth } from "@/auth";
import Toolbar from "../ui/toolbar";
import { getClient } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function TrainingLayout({ children }: { children: React.ReactNode }) {

    const session = await auth() as any // eslint-disable-line @typescript-eslint/no-explicit-any
    const client = await getClient(session?.user.client.id)
    console.log(client);

    if(client.plan === null) redirect('/planes');

    return (
        <div>
            <Toolbar client={client} session={session} />
            {children}
        </div>
    )
}