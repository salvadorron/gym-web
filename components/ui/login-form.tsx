"use client"

import { useState, useActionState } from "react"
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
import StateSelector from "./state-selector"
import MunicipalitySelector from "./municipality-selector"
import ParrishSelector from "./parrish-selector"

interface RegistrationData {
  name: string
  last_name: string
  username: string
  password: string
  age: number
  weight: number
  height: number
  gender: string
  address: string
  city: string
  zip_code: string
  state_id: string
  municipality_id: string
  parrish_id: string
  medical_conditions: string
}

interface RegisterState {
  message: string
  success: boolean
}

const initialValues = {
  name: "",
  last_name: "",
  username: "",
  password: "",
  age: 0,
  weight: 0,
  height: 0,
  gender: "",
  address: "",
  city: "",
  zip_code: "",
  state_id: "",
  municipality_id: "",
  parrish_id: "",
  medical_conditions: "",
}


export default function AuthForm() {

  const [loginErrorMessage, loginFormAction, loginIsPending] = useActionState(
    authenticate,
    undefined,
  );

  const [registerState, setRegisterState] = useState<RegisterState | undefined>(undefined) 
  const [registerSubmitting, setRegisterSubmitting] = useState<boolean>(false)
  
  const [currentStep, setCurrentStep] = useState(1)

  const [registrationData, setRegistrationData] = useState<RegistrationData>(initialValues)

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

    if (name === "state_id") {
      setRegistrationData((prev) => ({
        ...prev,
        municipality_id: "",
        parrish_id: "",
      }))
    } else if (name === "municipality_id") {
      setRegistrationData((prev) => ({
        ...prev,
        parrish_id: "",
      }))
    }
  }

  const handleAction = async () => {
    const payload = new FormData();

    for (const key of Object.keys(registrationData)){
      const value = registrationData[key as keyof RegistrationData];
      payload.append(key, value.toString())
    }

    try{
      setRegisterSubmitting(true)
      const values = await register(undefined, payload);
      setRegisterState({
        message: values.message,
        success: values.success,
      })
      setCurrentStep(1);
      setRegistrationData(initialValues);
    } catch(err){
      console.error(err);
    }
    finally {
      setRegisterSubmitting(false);
    }
  }

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
                        <Label htmlFor="last_name" className="text-white">
                          Apellido
                        </Label>
                        <Input
                          id="last_name"
                          name="last_name"
                          value={registrationData.last_name}
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
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-white">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={registrationData.password}
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
                            <SelectItem value="MALE">Masculino</SelectItem>
                            <SelectItem value="FEMALE">Femenino</SelectItem>
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
                        <StateSelector value={registrationData.state_id} onStateSelected={(value) => handleSelectChange(value, 'state_id')} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <MunicipalitySelector value={registrationData.municipality_id} stateValue={registrationData.state_id} onMunicipalitySelected={(value) => handleSelectChange(value, 'municipality_id')}  />
                      </div>
                      <div className="grid gap-2">
                        <ParrishSelector value={registrationData.parrish_id} municipalityValue={registrationData.municipality_id} onParrishSelected={(value) => handleSelectChange(value, 'parrish_id')} />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="zip_code" className="text-white">
                        Código Postal
                      </Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        value={registrationData.zip_code}
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
                      <Label htmlFor="medical_conditions" className="text-white">
                        Condiciones Médicas
                      </Label>
                      <Textarea
                        id="medical_conditions"
                        name="medical_conditions"
                        value={registrationData.medical_conditions}
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
                      type="button"
                      onClick={handleAction}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 ml-auto"
                      disabled={registerSubmitting}
                    >
                      {registerSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
                    </Button>
                  )}
                </div>
                  <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {registerState?.success === false && (
                      <>
                        <AlertCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{registerState.message}</p>
                      </>
                    )}
                    {registerState?.success === true && (
                      <>
                        <CheckIcon className="h-5 w-5 text-green-500" />
                        <p className="text-sm text-green-500">{registerState.message}</p>
                      </>
                    )}
                  </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>)
  
  
}

