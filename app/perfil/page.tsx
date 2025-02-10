"use client"

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


export interface User {
    name: string
    lastName: string
    username: string
    role: string
    avatarUrl: string
    age: number;
    weight: number;
    height: number;
    gender: string;
    medicalConditions: string;
    goals: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
    municipality: string;
    parish: string;
    stats: {
        completedWorkouts: number
        totalMinutes: number
        totalCalories: number
        progress: number
    }
}

const initialUser: User = {
    name: "Juan",
    lastName: "Pérez",
    username: "juan@ejemplo.com",
    role: "Entrenador",
    avatarUrl: "/placeholder.svg",
    age: 30,
    weight: 80,
    height: 180,
    gender: "Masculino",
    medicalConditions: "",
    goals: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    municipality: "",
    parish: "", // Datos iniciales para la parroquia
    stats: {
        completedWorkouts: 24,
        totalMinutes: 720,
        totalCalories: 4500,
        progress: 65,
    },
}

const venezuela: Record<string, Record<string, string[]>> = {
    "Amazonas": {
        "Municipio1": ["Parroquia1", "Parroquia2"],
        "Municipio2": ["Parroquia3", "Parroquia4"]
    },
    "Anzoátegui": {
        "Municipio3": ["Parroquia5", "Parroquia6"],
        "Municipio4": ["Parroquia7", "Parroquia8"]
    },
    // ... (resto de los estados)
};


export default function ProfilePage() {
    const [user, setUser] = useState<User>(initialUser);
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUser((prevUser) => ({ ...prevUser, [name]: value }))
    }

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newState = e.target.value;
        setSelectedState(newState);
        setSelectedMunicipality(""); // Resetear municipio y parroquia
        setUser((prevUser) => ({ ...prevUser, state: newState, municipality: "", parish: "" }));
    };

    const handleMunicipalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMunicipality = e.target.value;
        setSelectedMunicipality(newMunicipality);
        setUser((prevUser) => ({ ...prevUser, municipality: newMunicipality, parish: "" }));
    };

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
                          <div className="space-y-6">
                              <div className="flex items-center space-x-4">
                                  <Avatar className="h-20 w-20">
                                      <AvatarImage src={user.avatarUrl} alt={user.name} />
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
                                          {user.role}
                                      </Badge>
                                  </div>
                              </div>

                              <div>
                                  <h3 className="text-lg font-semibold mb-2">Progreso General</h3>
                                  <Progress value={user.stats.progress} className="h-2 mb-2" />
                                  <p className="text-sm text-gray-400">{user.stats.progress}% completado</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <Card className="bg-slate-800 border-0">
                                      <CardContent className="p-4 flex items-center space-x-4">
                                          <div className="p-2 bg-green-500/10 rounded-lg">
                                              <Dumbbell className="h-5 w-5 text-green-500" />
                                          </div>
                                          <div>
                                              <p className="text-sm text-gray-400">Entrenamientos</p>
                                              <h4 className="text-2xl font-bold text-white">{user.stats.completedWorkouts}</h4>
                                          </div>
                                      </CardContent>
                                  </Card>

                                  <Card className="bg-slate-800 border-0">
                                      <CardContent className="p-4 flex items-center space-x-4">
                                          <div className="p-2 bg-blue-500/10 rounded-lg">
                                              <Clock className="h-5 w-5 text-blue-500" />
                                          </div>
                                          <div>
                                              <p className="text-sm text-gray-400">Minutos totales</p>
                                              <h4 className="text-2xl font-bold text-white">{user.stats.totalMinutes}</h4>
                                          </div>
                                      </CardContent>
                                  </Card>

                                  <Card className="bg-slate-800 border-0">
                                      <CardContent className="p-4 flex items-center space-x-4">
                                          <div className="p-2 bg-orange-500/10 rounded-lg">
                                              <Activity className="h-5 w-5 text-orange-500" />
                                          </div>
                                          <div>
                                              <p className="text-sm text-gray-400">Calorías quemadas</p>
                                              <h4 className="text-2xl font-bold text-white">{user.stats.totalCalories}</h4>
                                          </div>
                                      </CardContent>
                                  </Card>
                              </div>

                              <div className="space-y-4"> {/* Contenedor para los nuevos campos */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Dos columnas para organizar los campos */}
                                {/* Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-400">Nombre</Label>
                                    <Input id="name" name="name" value={user.name} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                                {/* Apellido */}
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-gray-400">Apellido</Label>
                                    <Input id="lastName" name="lastName" value={user.lastName} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-gray-400">Nombre de usuario</Label>
                                <Input id="username" name="username" type="username" value={user.username} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            {/* Género */}
                            <div className="space-y-2 ">
                                <Label htmlFor="gender" className="text-gray-400">Género</Label>
                                <select id="gender" name="gender" value={user.gender} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white w-full rounded px-3 py-2">
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            {/* Edad */}
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-gray-400">Edad</Label>
                                <Input id="age" name="age" type="number" value={user.age} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            {/* Peso y Altura */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="weight" className="text-gray-400">Peso (kg)</Label>
                                    <Input id="weight" name="weight" type="number" value={user.weight} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height" className="text-gray-400">Altura (cm)</Label>
                                    <Input id="height" name="height" type="number" value={user.height} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </div>
                            

                                        {/* Estado */}
                <div className="space-y-2">
                    <Label htmlFor="state" className="text-gray-400">Estado</Label>
                    <select id="state" name="state" value={user.state} onChange={handleStateChange} className="bg-slate-800 border-slate-700 text-white rounded w-full px-3 py-2">
                        <option value="">Selecciona un estado</option>
                        {Object.keys(venezuela).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                </div>

                {/* Municipio */}
                <div className="space-y-2">
                    <Label htmlFor="municipality" className="text-gray-400">Municipio</Label>
                    <select id="municipality" name="municipality" value={user.municipality} onChange={handleMunicipalityChange} className="bg-slate-800 border-slate-700 w-full text-white rounded px-3 py-2" disabled={!selectedState}>
                        <option value="">Selecciona un municipio</option>
                        {selectedState && Object.keys(venezuela[selectedState]).map((municipality) => (
                            <option key={municipality} value={municipality}>{municipality}</option>
                        ))}
                    </select>
                </div>

                {/* Parroquia */}
                <div className="space-y-2">
                    <Label htmlFor="parish" className="text-gray-400">Parroquia</Label>
                    <select id="parish" name="parish" value={user.parish} onChange={handleInputChange} className="bg-slate-800 border-slate-700 p-2 w-full text-white rounded px-3 py-2" disabled={!selectedMunicipality}>
                        <option value="">Selecciona una parroquia</option>
                        {selectedMunicipality && venezuela[selectedState][selectedMunicipality].map((parish) => (
                            <option key={parish} value={parish}>{parish}</option>
                        ))}
                    </select>


                            {/* Ciudad y Código Postal */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-gray-400">Ciudad</Label>
                                    <Input id="city" name="city" value={user.city} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="postalCode" className="text-gray-400">Código Postal</Label>
                                    <Input id="postalCode" name="postalCode" value={user.postalCode} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                </div>
                            </div>

                                  {/* Dirección */}
                                  <div className="space-y-2">
                                      <Label htmlFor="address" className="text-gray-400">Dirección</Label>
                                      <Input id="address" name="address" value={user.address} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                                  </div>

                 
                        
                        
                            {/* Condiciones Médicas (opcional) */}
                            <div className="space-y-2">
                                <Label htmlFor="medicalConditions" className="text-gray-400">Condiciones Médicas (opcional)</Label>
                                <Input id="medicalConditions" name="medicalConditions" value={user.medicalConditions} onChange={handleInputChange} className="bg-slate-800 border-slate-700 text-white" />
                            </div>

                           
                        </div>

                              <div className="flex justify-end">
                                  <Button className="bg-blue-500 hover:bg-blue-600">Guardar cambios</Button>
                              </div>
                          </div>
                      </CardContent>
                      
                  </Card>
                  
                  
              </div>
          </div>
      </div>
  )
}