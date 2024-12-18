import { getClient, getMemberships } from "@/lib/data";
import Membership from "../ui/membership";
import { auth } from "@/auth";
export default async function MembershipPage() {

    const memberships = await getMemberships();

    const session = await auth() as any;

    const client = await getClient(session?.user?.client?.id);

    if(!session?.user) return null

    return (
        <Membership data={memberships} client={client} />
    )
}