'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Dumbbell } from "lucide-react"
import splash from '../../public/2.webp';
import { User } from "@/lib/definitions"
import StateSelector from "./state-selector"
import MunicipalitySelector from "./municipality-selector"
import ParrishSelector from "./parrish-selector"
import { updateMember } from "@/lib/actions"
import { unstable_update } from "@/auth"


export default function Profile({ user, updateSession }: { user: User, updateSession: (user: any) => Promise<void> }) {

    const [formData, setFormData] = useState<User>(user);

    const handleAction = async (payload: FormData) => {
        
        const updatedUser = {
            address: formData.address,
            age: formData.age,
            city: formData.city,
            height: formData.height,
            name: formData.name,
            password: formData.password,
            username: formData.username,
            weight: formData.weight,
            gender: formData.gender,
            last_name: formData.lastName,
            medical_conditions: formData.medical_conditions,
            municipality_id: +formData.municipality_id,
            specialty: formData.specialty,
            parrish_id: +formData.parrish_id,
            state_id: +formData.state_id,
            role_id: user.roleId,
            zip_code: formData.zip_code
        }


        try {
            const newUser = await updateMember(updatedUser, user.id)
            await updateSession(newUser)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain' }}>
            <div className="container mx-auto p-6 space-y-6">
                <div className="space-y-6">

                    <Card className="bg-slate-900 text-white">
                        <CardHeader>
                            <CardTitle>Perfil de Usuario</CardTitle>
                            <CardDescription className="text-gray-400">Visualiza y actualiza tu información personal</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={handleAction} className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={"#"} alt={user.name} />
                                        <AvatarFallback className="text-black">
                                            {user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">{user.name}</h2>
                                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                                            {user.roleId}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4"> {/* Contenedor para los nuevos campos */}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Dos columnas para organizar los campos */}
                                        {/* Nombre */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-gray-400">Nombre</Label>
                                            <Input required id="name" name="name" value={formData.name} onChange={(evt) => setFormData({ ...formData, name: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                        {/* Apellido */}
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName" className="text-gray-400">Apellido</Label>
                                            <Input required id="lastName" name="lastName" value={formData.lastName} onChange={(evt) => setFormData({ ...formData, lastName: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-gray-400">Nombre de usuario</Label>
                                        <Input required id="username" name="username" type="username" value={formData.username} onChange={(evt) => setFormData({ ...formData, username: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-gray-400">Contraseña</Label>
                                        <Input required id="password" name="password" type="password" value={formData.password} onChange={(evt) => setFormData({ ...formData, password: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                    </div>
                                    {/* Género */}
                                    <div className="space-y-2 ">
                                        <Label htmlFor="gender" className="text-gray-400">Género</Label>
                                        <select id="gender" name="gender" value={formData.gender} onChange={(evt) => setFormData({ ...formData, gender: evt.target.value as "FEMALE" | "MALE" })} className="bg-slate-800 border-slate-700 text-white w-full rounded px-3 py-2">
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                    {/* Edad */}
                                    <div className="space-y-2">
                                        <Label htmlFor="age" className="text-gray-400">Edad</Label>
                                        <Input required id="age" name="age" type="number" value={formData.age} onChange={(evt) => setFormData({ ...formData, age: +evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                    </div>
                                    {/* Peso y Altura */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="weight" className="text-gray-400">Peso (kg)</Label>
                                            <Input required id="weight" name="weight" type="number" value={formData.weight} onChange={(evt) => setFormData({ ...formData, weight: +evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="height" className="text-gray-400">Altura (cm)</Label>
                                            <Input required id="height" name="height" type="number" value={formData.height} onChange={(evt) => setFormData({ ...formData, height: +evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                    </div>


                                    {/* Estado */}
                                    <div className="space-y-2">
                                        <StateSelector value={formData.state_id} onStateSelected={(value) => setFormData({ ...formData, state_id: value })} />
                                    </div>
                                </div>

                                {/* Municipio */}
                                <div className="space-y-2">
                                    <MunicipalitySelector value={formData.municipality_id} stateValue={formData.state_id} onMunicipalitySelected={(value) => setFormData({ ...formData, municipality_id: value })} />
                                </div>

                                {/* Parroquia */}
                                <div className="space-y-2">
                                    <ParrishSelector value={formData.parrish_id} municipalityValue={formData.municipality_id} onParrishSelected={(value) => setFormData({ ...formData, parrish_id: value })} />


                                    {/* Ciudad y Código Postal */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-gray-400">Ciudad</Label>
                                            <Input required id="city" name="city" value={formData.city} onChange={(evt) => setFormData({ ...formData, city: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip_code" className="text-gray-400">Código Postal</Label>
                                            <Input required id="zip_code" name="zip_code" value={formData.zip_code} onChange={(evt) => setFormData({ ...formData, zip_code: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                        </div>
                                    </div>

                                    {/* Dirección */}
                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-gray-400">Dirección</Label>
                                        <Input required id="address" name="address" value={formData.address} onChange={(evt) => setFormData({ ...formData, address: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                    </div>




                                    {/* Condiciones Médicas (opcional) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="medical_conditions" className="text-gray-400">Condiciones Médicas (opcional)</Label>
                                        <Input required id="medical_conditions" name="medical_conditions" value={formData.medical_conditions} onChange={(evt) => setFormData({ ...formData, medical_conditions: evt.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                                    </div>


                                </div>

                                <div className="flex justify-end">
                                    <Button className="bg-blue-500 hover:bg-blue-600" type="submit" >Guardar cambios</Button>
                                </div>
                            </form>
                        </CardContent>

                    </Card>


                </div>
            </div>
        </div>
    )
}