import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import splash from '../../public/2.webp';
import { auth } from '@/auth';
import { getUsersByTrainer } from '@/lib/data';


export default async function DashboardPage() {

    const session = await auth();

    if(!session?.user?.trainer) throw new Error('Missing trainer');

    const users = await getUsersByTrainer(session?.user?.trainer.id);

    return (
        <div className="flex flex-col items-center  min-h-screen pt-24 p-8 " style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
            <div className="bg-[#111111c4] border border-gray-200 rounded-md p-6 w-full flex flex-col gap-4">
                <h1 className="text-white text-xl">Listado de Participantes</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-white">Nombre</TableHead>
                            <TableHead className="text-white">Apellido</TableHead>
                            <TableHead className="text-white">Edad</TableHead>
                            <TableHead className="text-right text-white">Plan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium text-white">{user.name}</TableCell>
                                <TableCell className='text-white'>{user.lastName}</TableCell>
                                <TableCell className='text-white'>{user.age}</TableCell>
                                <TableCell className="text-right text-white">{user.client?.plan?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
            </div>
        </div>
    )
}