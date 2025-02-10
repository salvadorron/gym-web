import { getClient, getMemberships } from "@/lib/data";
import { auth } from "@/auth";
import Membership from "@/components/ui/membership";
import PlanManager from "@/components/ui/plan-manager";

export default async function MembershipPage() {

    const memberships = await getMemberships();

    const session = await auth()

    if(!session) throw new Error('Missing session');

    if(session.user.roleId === 'admin') return <PlanManager planes={memberships} />

    if(!session.user.client) throw new Error('Missing client');

    const client = await getClient(session.user.client.id);

    return (
            <Membership data={memberships} client={client} />
    )
}