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
import { Member, State, User } from '@/lib/definitions';
import { MemberForm } from './member-form';
import { createMember, updateMember, deleteMember } from '@/lib/actions'


export default function Members({ members }: { members: User[] }) {



  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<User | null>(null)

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

   const handleAddMember = async (newMember: Member, resetForm: () => void) => {
     try {
       await createMember({
         name: newMember.name,
         last_name: newMember.lastName,
         age: newMember.age,
         username: newMember.username,
         password: newMember.password,
         role_id: newMember.roleId,
         medical_conditions: newMember.medicalConditions,
         weight: newMember.weight,
         height: newMember.height,
         zip_code: newMember.zipCode,
         city: newMember.city,
         address: newMember.address,
         state_id: +newMember.stateId,
         municipality_id: +newMember.municipalityId,
         parrish_id: +newMember.parrishId,
         gender: newMember.gender,
         specialty: newMember.specialty
       });
       resetForm();
       setIsDialogOpen(false);
     } catch (err) {
       console.log(err)
     } 
   
   }

   const handleEditMember = async (updatedMember: Member, resetForm: () => void) => {
    try {
      await updateMember({
        name: updatedMember.name,
        last_name: updatedMember.lastName,
        age: updatedMember.age,
        username: updatedMember.username,
        password: updatedMember.password,
        role_id: updatedMember.roleId,
        medical_conditions: updatedMember.medicalConditions,
        weight: updatedMember.weight,
        height: updatedMember.height,
        zip_code: updatedMember.zipCode,
        city: updatedMember.city,
        address: updatedMember.address,
        state_id: +updatedMember.stateId,
        municipality_id: +updatedMember.municipalityId,
        parrish_id: +updatedMember.parrishId,
        gender: updatedMember.gender,
        specialty: updatedMember.specialty
      }, updatedMember.id);
      resetForm();
      setIsDialogOpen(false);
      setEditingMember(null)
    } catch (err) {
      console.log(err)
    } 
  
  }

  const handleDeleteMember = async (id: number) => {
    const data = await deleteMember(id);
    console.log(data);
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
            <MemberForm onSubmit={handleAddMember} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar miembros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm text-black"
        />
      </div>

      <MembersTable
        members={filteredMembers}
        onEdit={(member) => setEditingMember({
          ...member,
          medicalConditions: member.medical_conditions,
          zipCode: member.zip_code,
          stateId: member.state_id?.toString(),
          parrishId: member.parrish_id?.toString(),
          municipalityId: member.municipality_id?.toString()
        })}
        onDelete={handleDeleteMember}
      />

      {editingMember && (
        <Dialog open={true} onOpenChange={() => setEditingMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Miembro</DialogTitle>
              <DialogDescription>Modifica los datos del miembro.</DialogDescription>
            </DialogHeader>
            <MemberForm member={editingMember} onSubmit={handleEditMember} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

