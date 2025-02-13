
import splash from '../../public/2.webp';
import { getClient, getTrainings } from '@/lib/data';
import { auth } from '@/auth';
import { PageProps } from '@/lib/definitions';
import CalendarNative from '@/components/ui/schedule';
import Schedule from '@/components/ui/schedule';

export default async function SchedulePage({ searchParams }: PageProps) { 

    const session = await auth();
    
    if(!session?.user?.client) throw new Error('Missing client');
    
    const client = await getClient(session.user.client.id);


    if(!client.plan){
        throw new Error('Plan is missing');
    }

    const currentPayment = client.payments[0];

    const trainings = await getTrainings();

    return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
        <Schedule planId={client.plan.id} payment={currentPayment} trainings={trainings} />
    </div>
    )
}