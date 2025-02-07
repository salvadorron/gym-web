import { getClient, getMemberships } from "@/lib/data";
import { auth } from "@/auth";
import Membership from "@/components/ui/membership";

export default async function MembershipPage() {

    const memberships = await getMemberships();

    const session = await auth()

    if(!session?.user?.client) {
        throw new Error('Missing client');
    }

    const client = await getClient(session?.user?.client?.id);

    return (
            <Membership data={memberships} client={client} />
    )
}