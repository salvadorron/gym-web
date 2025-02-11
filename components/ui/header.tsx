import { signOut } from "@/auth";
import { Activity, CreditCard, LogOut, User as UserIcon } from "lucide-react";
import { ReactNode } from "react";
import Navigation from "./navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import Link from "next/link";
import { User } from "@/lib/definitions";
export type UserRole = "Cliente" | "Entrenador" | "Administrativo" | "Superusuario"





function getRoleBadgeVariant(roleId: string): "default" | "secondary" | "destructive" | "outline" {
  switch (roleId) {
    case "Superusuario":
      return "destructive"
    case "Administrativo":
      return "secondary"
    case "Entrenador":
      return "default"
    case "Cliente":
      return "outline"
    default:
      return "outline"
  }
}

function getRoleById(roleId: string): "Cliente" | "Entrenador" | "Administrativo" | "Superusuario" {
  switch (roleId) {
    case "client":
      return "Cliente"
    case "trainer":
      return "Entrenador"
    case "admin":
      return "Administrativo"
    default:
      return "Superusuario"
  }
}

// En una aplicación real, esto vendría de tu sistema de autenticación

export default function Header({ user, children }: { user: User | undefined, children: ReactNode }) {

  if(!user) return <p>Loading...</p>;

    async function logOutSession () {
        'use server'
        await signOut({
            redirect: true,
            redirectTo: '/auth/login'
        })
    }

    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ">
        <nav className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                SALUD Y BIENESTAR
              </span>
            </div>
            <Navigation user={user} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={'/#'} alt={user.name} />
                    <AvatarFallback>
                      {user.name.at(0)} {user.lastName.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name} {user.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.username}</p>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <Badge data-role={user.roleId} className={"data-[role=client]:bg-green-500 text-white data-[role=trainer]:bg-blue-500 data-[role=admin]:bg-red-500"} variant={getRoleBadgeVariant(user.roleId)}>{getRoleById(user.roleId)}</Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                {user.roleId === 'client' && <DropdownMenuItem asChild>
                  <Link href="/pagos" className="flex items-center cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Historial de Pago</span>
                  </Link>
                </DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOutSession} className="flex items-center text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
        {children}
        
        </div>
        // <div className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-lg ">
            
        //     <div className="flex items-center justify-between w-full">
        //         <div className="flex items-center space-x-2 flex-1">
        //             <DumbbellIcon className="w-6 h-6 text-white" />
        //             <h1 className="text-white font-bold">SALUD Y BIENESTAR</h1>
        //         </div>
        //         <div className="flex gap-8">
        //         <div className="flex items-center space-x-8">
        //             {session.user.roleId === 'client' && <Link href="/planes" className="text-white font-bold hover:border-b-2 hover:border-red-700">Planes</Link>}
                    
        //             {session.user.roleId === 'trainer' && <Link href="/participantes" className="text-white font-bold hover:border-b-2 hover:border-red-700">Participantes</Link>}

        //             {session.user.roleId === 'client' &&client?.plan !== null && 
        //                 <Link href="/entrenamiento" className="text-white font-bold hover:border-b-2 hover:border-red-700">Entrenamiento</Link>
        //             }
        //             {session.user.roleId === 'client' && client?.plan !== null && 
        //                 <Link href="/horario" className="text-white font-bold hover:border-b-2 hover:border-red-700">Horario</Link>
        //             }
        //             {session.user.roleId === 'client' && client?.plan !== null && 
        //                 <Link href="/alimentacion" className="text-white font-bold hover:border-b-2 hover:border-red-700">Alimentacion</Link>}
        //             {session.user.roleId === 'admin' && 
        //                 <Link href="/registro" className="text-white font-bold hover:border-b-2 hover:border-red-700">Registro</Link>
        //             }
        //             {session.user.roleId === 'admin' && 
        //                 <Link href="/dashboard" className="text-white font-bold hover:border-b-2 hover:border-red-700">Dashboard</Link>
        //             }
        //         </div>

        //         <div className="flex items-center space-x-3 ring-white ring rounded-full hover:ring-red-400 focus:ring-red-400">
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger>
                            
        //                     <Avatar>
        //                         {/* <AvatarImage src="https://github.com/" /> */}
        //                         <AvatarFallback>{session.user.name.charAt(0) + session.user.lastName.charAt(0)}</AvatarFallback>
        //                     </Avatar>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent side="bottom" align="end">
        //                 <DropdownMenuLabel className="font-normal">
        //                  <div className="flex flex-col space-y-1">
        //                     <p className="text-sm font-medium leading-none">{session.user.name} {session.user.lastName}</p>
        //                     <p className="text-xs leading-none text-muted-foreground">
        //                         {session.user.username}
        //                     </p>
        //                  </div>
        //                 </DropdownMenuLabel>
        //                     <DropdownMenuSeparator />
        //                     <DropdownMenuItem>Perfil</DropdownMenuItem>
        //                     <DropdownMenuItem onClick={logOut}>Cerrar Sesión</DropdownMenuItem>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //         </div>
        //         </div>
        //     </div>
        // </div>
    )
}