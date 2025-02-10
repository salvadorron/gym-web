"use client"

import { useState, useEffect, useActionState } from "react"
import { Activity, AlertCircleIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { authenticate, register } from "@/lib/actions"

interface RegistrationData {
  name: string
  lastName: string
  username: string
  age: number
  weight: number
  height: number
  gender: string
  address: string
  city: string
  postalCode: string
  state: string
  municipality: string
  parish: string
  medicalConditions: string
}

interface Location {
  id: string
  name: string
}



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {} // eslint-disable-line @typescript-eslint/no-empty-object-type

export default function AuthForm() {

  const [loginErrorMessage, loginFormAction, loginIsPending] = useActionState(
    authenticate,
    undefined,
  );
  
    const [registerFormState, registerFormAction, registerIsPending] = useActionState(
      register,
      undefined
    );

  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    name: "",
    lastName: "",
    username: "",
    age: 0,
    weight: 0,
    height: 0,
    gender: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    municipality: "",
    parish: "",
    medicalConditions: "",
  })
  const [states, setStates] = useState<Location[]>([])
  const [municipalities, setMunicipalities] = useState<Location[]>([])
  const [parishes, setParishes] = useState<Location[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string, name: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "state") {
      fetchMunicipalities(value)
      setRegistrationData((prev) => ({
        ...prev,
        municipality: "",
        parish: "",
      }))
    } else if (name === "municipality") {
      fetchParishes(value)
      setRegistrationData((prev) => ({
        ...prev,
        parish: "",
      }))
    }
  }

  const fetchStates = async () => {
    // Simular una llamada a la API
    const mockStates = [
      { id: "1", name: "Estado 1" },
      { id: "2", name: "Estado 2" },
      { id: "3", name: "Estado 3" },
    ]
    setStates(mockStates)
  }

  const fetchMunicipalities = async (stateId: string) => {
    // Simular una llamada a la API basada en el estado seleccionado
    const mockMunicipalities = [
      { id: "1", name: "Municipio 1" },
      { id: "2", name: "Municipio 2" },
      { id: "3", name: "Municipio 3" },
    ]
    setMunicipalities(mockMunicipalities)
  }

  const fetchParishes = async (municipalityId: string) => {
    // Simular una llamada a la API basada en el municipio seleccionado
    const mockParishes = [
      { id: "1", name: "Parroquia 1" },
      { id: "2", name: "Parroquia 2" },
      { id: "3", name: "Parroquia 3" },
    ]
    setParishes(mockParishes)
  }

  useEffect(() => {
    fetchStates()
  }, [])


  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1f2e] p-4 relative overflow-hidden">
      <Image
        src="https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_1280,c_limit/fitness%20portada.jpg"
        alt="Fondo de gimnasio"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <Card className="w-full max-w-[600px] bg-[#1e2536] border-slate-800 relative z-10">
        <CardHeader className="space-y-1 flex items-center text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-8 w-8 text-indigo-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Salud y Bienestar
            </span>
          </div>
          <CardTitle className="text-2xl text-white">Bienvenido</CardTitle>
          
          <CardDescription className="text-slate-400">
            {currentStep === 0
              ? "Iniciar Sesión"
              : currentStep === 1
                ? "Información Personal"
                : currentStep === 2
                  ? "Información de Contacto"
                  : "Información Médica"}
                  {currentStep === 0 && <div className="text-center text-white p-4">
                <p className="text-slate-300">Por favor, inicia sesión para acceder a tu cuenta.</p>
              </div>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="login"
            className="w-full"
            onValueChange={(value) => setCurrentStep(value === "login" ? 0 : 1)}
          >
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger value="login" className="data-[state=active]:bg-slate-700">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-slate-700">
                Registrarse
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              
              <form action={loginFormAction}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="login-username" className="text-white">
                      Usuario
                    </Label>
                    <Input
                      id="login-username"
                      name="login-username"
                      type="text"
                      className="bg-slate-800 border-slate-700 text-white"
                      disabled={loginIsPending}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="login-password" className="text-white">
                      Contraseña
                    </Label>
                    <Input
                      id="login-password"
                      name="login-password"
                      type="password"
                      className="bg-slate-800 border-slate-700 text-white"
                      disabled={loginIsPending}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                    disabled={loginIsPending}
                  >
                    {loginIsPending ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                  <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {loginErrorMessage && (
                      <>
                        <AlertCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{loginErrorMessage}</p>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form action={registerFormAction}>
                {currentStep === 1 && (
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-white">
                          Nombre
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={registrationData.name}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName" className="text-white">
                          Apellido
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={registrationData.lastName}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="username" className="text-white">
                        Usuario
                      </Label>
                      <Input
                        id="username"
                        name="username"
                        value={registrationData.username}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="age" className="text-white">
                          Edad
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          value={registrationData.age || ""}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                          min="0"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="gender" className="text-white">
                          Género
                        </Label>
                        <Select
                          value={registrationData.gender}
                          onValueChange={(value) => handleSelectChange(value, "gender")}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="male">Masculino</SelectItem>
                            <SelectItem value="female">Femenino</SelectItem>
                            <SelectItem value="other">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="weight" className="text-white">
                          Peso (kg)
                        </Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          value={registrationData.weight || ""}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="height" className="text-white">
                          Altura (cm)
                        </Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          value={registrationData.height || ""}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="address" className="text-white">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={registrationData.address}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city" className="text-white">
                          Ciudad
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={registrationData.city}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-700 text-white"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="state" className="text-white">
                          Estado
                        </Label>
                        <Select
                          value={registrationData.state}
                          onValueChange={(value) => handleSelectChange(value, "state")}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            {states.map((state) => (
                              <SelectItem key={state.id} value={state.id}>
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="municipality" className="text-white">
                          Municipio
                        </Label>
                        <Select
                          value={registrationData.municipality}
                          onValueChange={(value) => handleSelectChange(value, "municipality")}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Seleccionar municipio" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            {municipalities.map((municipality) => (
                              <SelectItem key={municipality.id} value={municipality.id}>
                                {municipality.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="parish" className="text-white">
                          Parroquia
                        </Label>
                        <Select
                          value={registrationData.parish}
                          onValueChange={(value) => handleSelectChange(value, "parish")}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue placeholder="Seleccionar parroquia" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            {parishes.map((parish) => (
                              <SelectItem key={parish.id} value={parish.id}>
                                {parish.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="postalCode" className="text-white">
                        Código Postal
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={registrationData.postalCode}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white"
                        required
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="medicalConditions" className="text-white">
                        Condiciones Médicas
                      </Label>
                      <Textarea
                        id="medicalConditions"
                        name="medicalConditions"
                        value={registrationData.medicalConditions}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-700 text-white min-h-[100px]"
                        placeholder="Describe cualquier condición médica relevante..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  {currentStep > 1 && (
                    <Button type="button" onClick={prevStep} className="bg-slate-700 hover:bg-slate-600">
                      Anterior
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 ml-auto"
                    >
                      Siguiente
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 ml-auto"
                      disabled={registerIsPending}
                    >
                      {registerIsPending ? "Creando cuenta..." : "Crear Cuenta"}
                    </Button>
                  )}
                  <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {registerFormState?.success === false && (
                      <>
                        <AlertCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{registerFormState.message}</p>
                      </>
                    )}
                    {registerFormState?.success === true && (
                      <>
                        <CheckIcon className="h-5 w-5 text-green-500" />
                        <p className="text-sm text-green-500">{registerFormState.message}</p>
                      </>
                    )}
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>)
  
  
}

