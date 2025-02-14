import { auth } from "@/auth";
import Header from "@/components/ui/header";
import { ProtectedRouter } from "@/components/ui/protected-router";
import { getClient } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function PaymentLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();


        const client = await getClient(session?.user.client?.id);
    
            if(session?.user.roleId === 'client'){
                if(client?.plan === null){
                    redirect('/planes')
                }
                
            }

    return (
            <ProtectedRouter roleId={session?.user.roleId} roles={['client']}>
                <Header user={session?.user} >
                {children}
                </Header>
            </ProtectedRouter>
        
    )
}