import Calendar from '@/components/ui/calendar';
import splash from '../../public/2.webp';
import { getClient } from '@/lib/data';
import dayjs from 'dayjs';
import { auth } from '@/auth';
import { PageProps } from '@/lib/definitions';
import CalendarNative from '@/components/CalendarNative';

export default async function SchedulePage({ searchParams }: PageProps) { 

    const session = await auth();
    
    if(!session?.user?.client) throw new Error('Missing client');
    
    const client = await getClient(session.user.client.id);

    const currentPayment = client.payments.find((payment) =>  dayjs(payment.date).month() === dayjs().month()); 

    return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
            <CalendarNative
                clientId={client.id}
                plan={client.plan} // Tus datos del plan
                selectedPlan="all"
                currentPayment={currentPayment} // Tus datos de pago
            />
    </div>
    )
}