'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Activity, Flame, Clock, LightbulbIcon, Heart, Dumbbell, Trophy, TrendingUp, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

export default function TrainingPlan() {

  const chartData = [
  { name: "Lun", value: 40 },
  { name: "Mar", value: 60 },
  { name: "Mie", value: 45 },
  { name: "Jue", value: 70 },
  { name: "Vie", value: 65 },
  { name: "Sab", value: 80 },
  { name: "Dom", value: 75 },
]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 p-8 text-white">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Plan de Entrenamiento Completo</h1>
              <p className="text-gray-300">Visualiza tu plan de entrenamiento actual</p>
              <div className="mt-6 space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso General</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="h-3 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent" />
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Entrenamientos", value: "24", icon: Activity, color: "from-green-500 to-emerald-600" },
              { title: "Minutos totales", value: "720", icon: Clock, color: "from-blue-500 to-blue-600" },
              { title: "Calorías quemadas", value: "4500", icon: Flame, color: "from-orange-500 to-red-600" },
            ].map((stat) => (
              <Card
                key={stat.title}
                className="group hover:shadow-lg transition-all duration-300 border-none bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Chart */}
          <Card className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Progreso Semanal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" stroke="#4B5563" />
                    <YAxis stroke="#4B5563" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "0.5rem" }}
                      itemStyle={{ color: "#E5E7EB" }}
                      labelStyle={{ color: "#9CA3AF" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: "#1F2937", stroke: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "#3B82F6" }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Goals Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Correr 5km sin parar", progress: 80, icon: Target },
              { title: "Levantar 100kg en press de banca", progress: 60, icon: Dumbbell },
            ].map((goal) => (
              <Card key={goal.title} className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2 bg-blue-900/50 rounded-lg">
                      <goal.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white">{goal.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progreso</span>
                      <span className="text-gray-200 font-medium">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Daily Tip */}
          <Card className="border-none bg-gray-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="flex items-start space-x-4 relative z-10">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <LightbulbIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Consejo del día</h3>
                  <p className="text-gray-300">
                    Recuerda mantenerte hidratado durante tus entrenamientos para un mejor rendimiento.
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50" />
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card className="border-none bg-gray-800 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-400" />
                Historial Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Entrenamiento de Fuerza", date: "9/6/2023", duration: "45 min", icon: Dumbbell },
                  { title: "Entrenamiento de Cardio", date: "7/6/2023", duration: "30 min", icon: Heart },
                ].map((session) => (
                  <div
                    key={session.title}
                    className="group flex items-center justify-between p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-900/50 rounded-lg group-hover:bg-blue-500/50 transition-colors duration-300">
                        <session.icon className="h-5 w-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{session.title}</p>
                        <p className="text-sm text-gray-400">{session.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-400">{session.duration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
  )
}

