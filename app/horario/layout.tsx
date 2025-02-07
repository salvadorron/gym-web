import { auth } from "@/auth";
import Header from "@/components/ui/header";
import { ProtectedRouter } from "@/components/ui/protected-router";


export default async function ScheduleLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();

    return (
            <ProtectedRouter roleId={session?.user.roleId} pathname={'/horario'}>
                <Header roleId={session?.user.roleId} >
                {children}
                </Header>
            </ProtectedRouter>
        
    )
}