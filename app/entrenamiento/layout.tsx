import { auth } from "@/auth";
import Header from "@/components/ui/header";
import { ProtectedRouter } from "@/components/ui/protected-router";
import { getPathname } from "@/lib/getPathname";

export default async function TrainingLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();

    const pathname = await getPathname();

    return (
            <ProtectedRouter roleId={session?.user.roleId} pathname={pathname}>
                <Header roleId={session?.user.roleId} >
                {children}
                </Header>
            </ProtectedRouter>
        
    )
}