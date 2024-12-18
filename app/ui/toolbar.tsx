import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Toolbar({ client, session }: { client: any, session: any }) {

    async function logOut () {
        'use server'
        await signOut({
            redirect: true,
            redirectTo: '/auth/login'
        })
    }

    return (
        <div className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between w-full">
                {/* <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                </button> */}
                {/* <Button>Registrar</Button> */}
                <div className="flex items-center space-x-3">
                    <Button asChild>
                        <Link href="/membership">Membresias</Link>
                    </Button>
                    {client.plans.length !== 0 && <Button asChild>
                        <Link href="/training">Entrenamiento</Link>
                    </Button>}
                    {client.plans.length !== 0 && <Button asChild>
                        <Link href="/schedule">Horario</Link>
                    </Button>}
                </div>

                <div className="flex items-center space-x-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
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
    )
}