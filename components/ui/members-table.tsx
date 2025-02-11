import { Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/definitions"

export type Role = "miembro" | "entrenador" | "admin"

export type Specialty = "musculación" | "cardio" | "crossfit" | "yoga" | "pilates" | "funcional"

export interface Member {
  id: string
  nombre: string
  apellido: string
  usuario: string
  role: Role
  avatar?: string
  edad: number
  peso: number
  altura: number
  genero: "masculino" | "femenino" | "otro"
  condicionesMedicas?: string
  direccion: string
  ciudad: string
  codigoPostal: string
  estado: string
  municipio: string
  parroquia: string
  especialidad?: Specialty
}



interface MembersTableProps {
  members: User[]
  onEdit: (member: User) => void
  onDelete: (id: number) => void
}

export function MembersTable({ members, onEdit, onDelete }: MembersTableProps) {
  return (
    <div className="rounded-md border bg-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Usuario</TableHead>
            <TableHead className="text-white">Nombre</TableHead>
            <TableHead className="text-white">Rol</TableHead>
            <TableHead className="text-white">Edad</TableHead>
            <TableHead className="text-white">Ciudad</TableHead>
            <TableHead className="text-white">Especialidad</TableHead>
            <TableHead className="text-white">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.username}</TableCell>
              <TableCell>{`${member.name} ${member.lastName}`}</TableCell>
              <TableCell>
                <Badge data-role={member.roleId} className="data-[role=trainer]:bg-blue-900 data-[role=trainer]:text-white bg-white text-black hover:bg-white hover:text-black ">{getRoleName(member.roleId)}</Badge>
              </TableCell>
              <TableCell>{member.age}</TableCell>
              <TableCell>{member.city}</TableCell> 
              <TableCell>{member.speciality && <Badge className="text-white" variant="outline">{member.trainer?.specialty}</Badge>}</TableCell> 
              <TableCell>
                 <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(member.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function getRoleName(roleId: string) {

	switch(roleId){
		case "client": return "Cliente"
		case "trainer": return "Entrenador"
		case "admin": return "Administrador"
		default: return "SuperUsuario"
	}

}