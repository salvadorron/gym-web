"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Municipality, Parrish, Role, State, User } from "@/lib/definitions"
import { getMunicipalities, getParrishes } from "@/lib/data"

interface MemberFormProps {
  member?: User
  onSubmit: (member: User) => void,
  states: State[]
}

const specialties = ["Musculación", "Cardio", "Crossfit", "Yoga", "Pilates", "Funcional"]
const genders = [{ label: "Masculino", value: 'male' }, { value: 'female', label: "Femenino" }]
const roles = [{ label: 'Entrenador', value: 'trainer' }, { label: 'Cliente', value: 'client' }, { label: 'Administrador', value: 'admin' }]

export function MemberForm({ member, onSubmit, states }: MemberFormProps) {
  const [parrishes, setParrishes] = useState<Parrish[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [formData, setFormData] = useState<Partial<User>>(
    member || {
      roleId: "trainer",
      gender: "male",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onSubmit(formData as User)
  }

  const handleChange = (field: keyof User, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="name"
            value={formData.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="lastName"
            value={formData.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="username"
            value={formData.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Rol</Label>
          <Select value={formData.roleId} onValueChange={(value: string) => handleChange("roleId", value)}>
            <SelectTrigger className="focus:ring-blue-900">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.roleId === "trainer" && (
        <div className="space-y-2">
          <Label htmlFor="specialty">Especialidad</Label>
          <Select
            value={formData.specialty}
            onValueChange={(value: string) => handleChange("specialty", value)}
          >
            <SelectTrigger className="focus:ring-blue-900">
              <SelectValue placeholder="Seleccionar especialidad" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Edad</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="age"
            type="number"
            value={formData.age || ""}
            onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weigth">Peso (kg)</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="weight"
            type="number"
            value={formData.weight || ""}
            onChange={(e) => handleChange("weight", Number.parseInt(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heigth">Altura (cm)</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="heigth"
            type="number"
            value={formData.heigth || ""}
            onChange={(e) => handleChange("heigth", Number.parseInt(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Género</Label>
        <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
          <SelectTrigger className="focus:ring-blue-900">
            <SelectValue placeholder="Seleccionar género" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="condicionesMedicas">Condiciones Médicas</Label>
        <Textarea
          className="focus-visible:ring-blue-900"
          id="medicalContiditons"
          value={formData.medicalConditions || ""}
          onChange={(e) => handleChange("medicalConditions", e.target.value)}
          placeholder="Ingrese cualquier condición médica relevante"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Select value={formData.stateId} onValueChange={async (value) => {
            const newMunicipalities = await getMunicipalities(+value);
            
            if(formData.stateId !== value){
              handleChange("municipalityId", "");
              handleChange("parrishId", "");
            }
            setMunicipalities(newMunicipalities)
            handleChange("stateId", value)
          }}>
            <SelectTrigger className="focus:ring-blue-900">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="municipalityId">Municipio</Label>
          <Select value={formData.municipalityId} onValueChange={async (value) => {
            const newParrishes = await getParrishes(+value);
            if(formData.parrishId !== value){
              handleChange("parrishId", "")
            }
            setParrishes(newParrishes);
            handleChange("municipalityId", value)
          }}>
            <SelectTrigger className="focus:ring-blue-900">
              <SelectValue placeholder="Seleccionar municipio" />
            </SelectTrigger>
            <SelectContent>
              {municipalities?.map((muncicipality) => (
                <SelectItem key={muncicipality.id} value={muncicipality.id.toString()}>
                  {muncicipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="parrishId">Parroquia</Label>
          <Select value={formData.parrishId} onValueChange={(value) => handleChange("parrishId", value)}>
            <SelectTrigger className="focus:ring-blue-900">
              <SelectValue placeholder="Seleccionar parroquia" />
            </SelectTrigger>
            <SelectContent>
              {parrishes?.map((parrish) => (
                <SelectItem key={parrish.id} value={parrish.id.toString()}>
                  {parrish.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>



      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="city"
            value={formData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">Código Postal</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="zipCode"
            value={formData.zipCode || ""}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            required
          />
        </div>


      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          className="focus-visible:ring-blue-900"
          id="address"
          value={formData.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          required
        />
      </div>



      <Button className="bg-blue-900 hover:bg-blue-800" type="submit">{member ? "Actualizar" : "Crear"} Miembro</Button>
    </form>
  )
}

