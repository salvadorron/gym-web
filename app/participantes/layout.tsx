import { auth } from "@/auth";
import Header from "@/components/ui/header";
import { ProtectedRouter } from "@/components/ui/protected-router";

export default async function PeopleLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();

    return (
            <ProtectedRouter roleId={session?.user.roleId} roles={['trainer']}>
                <Header user={session?.user} >
                {children}
                </Header>
            </ProtectedRouter>
        
    )
}