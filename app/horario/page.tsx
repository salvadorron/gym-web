
import splash from '../../public/2.webp';
import { getClient } from '@/lib/data';
import { auth } from '@/auth';
import { PageProps } from '@/lib/definitions';
import CalendarNative from '@/components/ui/calendar-native';

export default async function SchedulePage({ searchParams }: PageProps) { 

    const session = await auth();
    
    if(!session?.user?.client) throw new Error('Missing client');
    
    const client = await getClient(session.user.client.id);

    //const currentPayment = client.payments.find((payment) =>  dayjs(payment.date).month() === dayjs().month()); 


    if(!client.plan){
        throw new Error('Plan is missing');
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
            <CalendarNative
                clientPlan={client.plan} // Tus datos de pago
            />
    </div>
    )
}