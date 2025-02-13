"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@/lib/definitions"
import StateSelector from '@/components/ui/state-selector'
import MunicipalitySelector from '@/components/ui/municipality-selector'
import ParrishSelector from '@/components/ui/parrish-selector'

interface MemberFormProps {
  member?: User
  onSubmit: (member: User, resetForm: () => void) => void,
}

const specialties = ["Musculación", "Cardio", "Crossfit", "Yoga", "Pilates", "Funcional"]
const genders = [{ label: "Masculino", value: 'MALE' }, { value: 'FEMALE', label: "Femenino" }]
const roles = [{ label: 'Entrenador', value: 'trainer' }, { label: 'Cliente', value: 'client' }, { label: 'Administrador', value: 'admin' }]

type Member = User & { specialty?: string }


const initialValues: Member = {
  id: 0,
  name: "",
  lastName: "",
  username: "",
  password: "",
  roleId: 'client',
  specialty: "",
  age: 0,
  medical_conditions: "",
  weight: 0,
  height: 0,
  zip_code: "",
  city: "",
  address: "",
  state_id: "",
  municipality_id: "",
  parrish_id: "",
  gender: 'MALE'
}

export function MemberForm({ member, onSubmit }: MemberFormProps) {
  const [formData, setFormData] = useState<Member>(
    member || initialValues
  )
  
  const resetForm = () => setFormData(initialValues);

  const handleSubmit = () => {
	const payload = {...formData, specialty: formData.roleId === 'trainer' ? formData.specialty : undefined} as Member;
    onSubmit(payload, resetForm)
  }

  const handleChange = (field: keyof Member, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
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
          <Label htmlFor="password">Contraseña</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="password"
            value={formData.password || ""}
			type="password"
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 col-span-full">
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
            value={formData?.specialty}
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
          <Label htmlFor="weight">Peso (kg)</Label>
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
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="height"
            type="number"
            value={formData.height || ""}
            onChange={(e) => handleChange("height", Number.parseInt(e.target.value))}
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
        <Label htmlFor="medical_conditions">Condiciones Médicas</Label>
        <Textarea
          className="focus-visible:ring-blue-900"
          id="medicalContiditons"
          value={formData.medical_conditions || ""}
          onChange={(e) => handleChange("medical_conditions", e.target.value)}
          placeholder="Ingrese cualquier condición médica relevante"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <StateSelector className="bg-white text-black border-gray-300" value={formData.state_id} onStateSelected={(value) => handleChange('state_id', value)} />
        </div>
        <div className="space-y-2">
          <MunicipalitySelector className="bg-white text-black border-gray-300" value={formData.municipality_id} stateValue={formData.state_id} onMunicipalitySelected={(value) => handleChange('municipality_id', value)} />
        </div>
        <div className="space-y-2">
          <ParrishSelector className="bg-white text-black border-gray-300" value={formData.parrish_id} municipalityValue={formData.municipality_id} onParrishSelected={(value) => handleChange('parrish_id', value)} />
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
          <Label htmlFor="zip_code">Código Postal</Label>
          <Input
            className="focus-visible:ring-blue-900"
            id="zip_code"
            value={formData.zip_code || ""}
            onChange={(e) => handleChange("zip_code", e.target.value)}
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



      <Button className="bg-blue-900 hover:bg-blue-800" onClick={handleSubmit} >{member ? "Actualizar" : "Crear"} Miembro</Button>
    </div>
  )
}

