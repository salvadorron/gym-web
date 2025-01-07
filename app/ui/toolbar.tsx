import { signOut } from "@/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DumbbellIcon } from "lucide-react";
import Link from "next/link";

export default function Toolbar({ client, session }: { client: any, session: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    async function logOut () {
        'use server'
        await signOut({
            redirect: true,
            redirectTo: '/auth/login'
        })
    }

    return (
        <div className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800 bg-[#141218] px-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2 flex-1">
                    <DumbbellIcon className="w-6 h-6 text-white" />
                    <h1 className="text-white font-bold">SALUD Y BIENESTAR</h1>
                </div>
                <div className="flex gap-8">
                <div className="flex items-center space-x-8">
                        <Link href="/planes" className="text-white font-bold hover:border-b-2 hover:border-red-700">Planes</Link>
                    
                    {client.plans.length !== 0 && 
                        <Link href="/entrenamiento" className="text-white font-bold hover:border-b-2 hover:border-red-700">Entrenamiento</Link>
                    }
                    {client.plans.length !== 0 && 
                        <Link href="/horario" className="text-white font-bold hover:border-b-2 hover:border-red-700">Horario</Link>
                    }
                </div>

                <div className="flex items-center space-x-3 ring-white ring rounded-full hover:ring-red-400 focus:ring-red-400">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            
                            <Avatar>
                                {/* <AvatarImage src="https://github.com/" /> */}
                                <AvatarFallback>{session.user.name.charAt(0) + session.user.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuLabel className="font-normal">
                         <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{session.user.name} {session.user.lastName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {session.user.username}
                            </p>
                         </div>
                        </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Perfil</DropdownMenuItem>
                            <DropdownMenuItem onClick={logOut}>Cerrar Sesión</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                </div>
            </div>
        </div>
    )
}