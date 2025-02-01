import { auth } from "@/auth";
import Toolbar from "../ui/toolbar";

export default async function TrainingLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();


    if(!session?.user.admin) throw new Error('Missing Admin');


    return (
        <div>
            <Toolbar session={session} />
            {children}
        </div>
    )
}