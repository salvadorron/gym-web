'use client'
import splash from '../../public/2.webp';
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Progress } from "./progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Users, DollarSign, Calendar, TrendingUp } from "lucide-react"

const membershipData = [
    { name: "Ene", total: 150 },
    { name: "Feb", total: 160 },
    { name: "Mar", total: 170 },
    { name: "Abr", total: 180 },
    { name: "May", total: 190 },
    { name: "Jun", total: 200 },
]

const classAttendanceData = [
    { name: "Yoga", attendance: 85 },
    { name: "Spinning", attendance: 70 },
    { name: "Zumba", attendance: 60 },
    { name: "Pilates", attendance: 50 },
    { name: "Boxeo", attendance: 40 },
]
export default function Dashboard() {

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">Tablero</h1>
                <p className="text-gray-300">Resumen general del gimnasio</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white ">Miembros Totales</CardTitle>
                        <Users className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-300">1,234</div>
                        <p className="text-xs text-gray-300">+20.1% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Ingresos Mensuales</CardTitle>
                        <DollarSign className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-300">$45,678</div>
                        <p className="text-xs text-gray-300">+15% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Clases Activas</CardTitle>
                        <Calendar className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-300">12</div>
                        <p className="text-xs text-gray-300">+2 nuevas clases este mes</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-white">Tasa de Retención</CardTitle>
                        <TrendingUp className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-300">89%</div>
                        <p className="text-xs text-gray-300">+2.5% desde el mes pasado</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-gray-800 border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Crecimiento de Membresías</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={membershipData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800 border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Asistencia por Clase</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={classAttendanceData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Bar dataKey="attendance" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="bg-gray-800 border-none col-span-4">
                    <CardHeader>
                        <CardTitle className="text-white">Membresías Activas por Tipo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">Premium</span>
                                        <span className="text-gray-300">45%</span>
                                    </div>
                                    <span className="text-white">450</span>
                                </div>
                                <Progress value={45} className="h-2 progress-gradient" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">Estándar</span>
                                        <span className="text-gray-300">35%</span>
                                    </div>
                                    <span className="text-white">350</span>
                                </div>
                                <Progress value={35} className="h-2 progress-gradient" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">Básico</span>
                                        <span className="text-gray-300">20%</span>
                                    </div>
                                    <span className="text-white">200</span>
                                </div>
                                <Progress value={20} className="h-2 progress-gradient" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-gray-800 border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Próximas Renovaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Carlos Pérez", date: "15 Nov 2023", type: "Premium" },
                                { name: "Ana García", date: "18 Nov 2023", type: "Estándar" },
                                { name: "Luis Torres", date: "20 Nov 2023", type: "Básico" },
                            ].map((member) => (
                                <div key={member.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-white">{member.name}</p>
                                        <p className="text-sm text-gray-300">{member.type}</p>
                                    </div>
                                    <div className="text-sm text-gray-300">{member.date}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}