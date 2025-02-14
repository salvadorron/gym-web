'use client'

import { Plan, User } from "@/lib/definitions";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search } from "lucide-react";
import splash from '../../public/2.webp';
import jsPDF from "jspdf";
import autotable from "jspdf-autotable";

export default function Participantes({ users, plans }: { users: User[], plans: Plan[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("all"); // Nuevo filtro por sexo

  const filteredClients = users.filter((user) => {
    const searchMatch = `${user.name} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const planMatch = planFilter === "all" || user.client?.plan?.id.toString() === planFilter;
    const statusMatch = statusFilter === "all" || user.client?.payments[0]?.status === statusFilter;
    const dateMatch = !dateFilter || 
      new Date(user.client?.payments[0]?.startDate || 0).toISOString().split('T')[0] === dateFilter;
    const genderMatch = genderFilter === "all" || user.gender === genderFilter; // Filtro por sexo

    return searchMatch && planMatch && statusMatch && dateMatch && genderMatch;
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const headers = [
      'Nombre',
      'Sexo', // Nueva columna en el PDF
      'Plan',
      'Inicio',
      'Vencimiento',
      'Estado',
      'Localización'
    ];
    
    const data = filteredClients.map(user => [
      `${user.name} ${user.lastName}`,
      user.gender === "MALE" ? "Masculino" : "Femenino", // Mostrar sexo en el PDF
      user.client?.plan?.name || 'N/A',
      user.client?.payments[0]?.startDate ? new Date(user.client.payments[0].startDate).toLocaleDateString() : 'N/A',
      user.client?.payments[0]?.endDate ? new Date(user.client.payments[0].endDate).toLocaleDateString() : 'N/A',
      user.client?.payments[0]?.status === 'active' && "Activo" || 'N/A',
      `${user.city}, ${user.state?.name}`
    ]);

    doc.text('Reporte de Clientes', 14, 15);
    autotable(doc, {
      head: [headers],
      body: data,
      startY: 25,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.save('reporte-clientes.pdf');
  };

  return (
    <div className="space-y-6 pt-24 min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain' }}>
      <Card className="p-6 bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl text-white font-bold">Gestión de Clientes</h1>
            <p className="text-gray-400">{filteredClients.length} clientes encontrados</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="relative col-span-2">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o apellido"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border text-white"
            />
          </div>
          
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Todos los planes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los planes</SelectItem>
              {plans.map(plan => (
                <SelectItem key={plan.id} value={plan.id.toString()}>{plan.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Estado de pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="expired">Expirado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="border-border">
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="MALE">Masculino</SelectItem>
              <SelectItem value="FEMALE">Femenino</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-border"
          />
        </div>

        {/* Tabla */}
        <div className="rounded-lg border border-border overflow-x-auto">
          <Table className="min-w-[1000px]">
            <TableHeader className="bg-blue-900/50">
              <TableRow>
                <TableHead className="text-white">Cliente</TableHead>
                <TableHead className="text-white">Sexo</TableHead> {/* Nueva columna en la tabla */}
                <TableHead className="text-white">Plan</TableHead>
                <TableHead className="text-white">Fecha Inicio</TableHead>
                <TableHead className="text-white">Fecha Fin</TableHead>
                <TableHead className="text-white">Estado</TableHead>
                <TableHead className="text-white">Ubicación</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {filteredClients.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-800/50">
                  <TableCell className="font-medium text-white">
                    <p>{user.name} {user.lastName}</p>
                    <p className="text-xs text-gray-400">{user.age} años</p>
                  </TableCell>
                  
                  <TableCell className="text-white">
                    <p>{user.gender === "MALE" ? "Masculino" : "Femenino"}</p> {/* Mostrar sexo */}
                  </TableCell>

                  <TableCell className="text-white">
                    <p>{user.client?.plan?.name || 'N/A'}</p>
                    <p className="text-xs text-gray-400">{user.client?.plan?.duration === 'MONTHLY' ? "Mensual" : "Anual"}</p>
                  </TableCell>

                  <TableCell className="text-white">
                    <p>
                    {user.client?.payments[0]?.startDate ? 
                      new Date(user.client.payments[0].startDate).toLocaleDateString() : 'N/A'}</p>
                  </TableCell>

                  <TableCell className="text-white">
                    <p>
                    {user.client?.payments[0]?.endDate ? 
                      new Date(user.client.payments[0].endDate).toLocaleDateString() : 'N/A'}</p>
                  </TableCell>

                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.client?.payments[0]?.status === 'active' ? 'bg-green-500/20 text-green-500' :
                      user.client?.payments[0]?.status === 'expired' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {user.client?.payments[0]?.status === "active" && "Activo" || 'N/A'}
                    </span>
                  </TableCell>

                  <TableCell className="text-white">
                    <p>{user.city}</p>
                    <p className="text-xs text-gray-400">{user.state?.name}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar a PDF
          </Button>
        </div>
      </Card>
    </div>
  );
}