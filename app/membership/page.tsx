import { getClient, getMemberships } from "@/lib/data";
import Membership from "../ui/membership";
import { auth } from "@/auth";
export default async function MembershipPage() {

    const memberships = await getMemberships();
    const client = await getClient();

    const session = await auth();


    console.log(session);


    return (
        <Membership data={memberships} client={client} />
    )
}