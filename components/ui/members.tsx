'use client'
import splash from '../../public/2.webp';
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MembersTable } from '@/components/ui/members-table';
import { State, User } from '@/lib/definitions';
import { MemberForm } from './member-form';


export default function Members({ members, states }: { members: User[], states: State[] }) {



  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<User | null>(null)

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // const handleAddMember = (newMember: Member) => {
  //   setMembers([...members, { ...newMember, id: String(members.length + 1) }])
  //   setIsDialogOpen(false)
  // }

  // const handleEditMember = (updatedMember: Member) => {
  //   setMembers(members.map((member) => (member.id === updatedMember.id ? updatedMember : member)))
  //   setEditingMember(null)
  // }

  const handleDeleteMember = (id: number) => {
    members.filter((member) => member.id !== id)
  }

  return (
    <div className="space-y-6 p-4 min-h-screen text-white" style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Miembros</h1>
          <p className="text-gray-300">Administra los miembros y entrenadores del gimnasio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Miembro</DialogTitle>
              <DialogDescription>Ingresa los datos del nuevo miembro del gimnasio.</DialogDescription>
            </DialogHeader>
            <MemberForm onSubmit={(member) => {}} states={states} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar miembros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <MembersTable
        members={filteredMembers}
        onEdit={(member) => setEditingMember(member)}
        onDelete={handleDeleteMember}
      />

      {editingMember && (
        <Dialog open={true} onOpenChange={() => setEditingMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Miembro</DialogTitle>
              <DialogDescription>Modifica los datos del miembro.</DialogDescription>
            </DialogHeader>
            {/* <MemberForm member={editingMember} onSubmit={handleEditMember} /> */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

