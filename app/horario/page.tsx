import Calendar from '@/components/ui/calendar';
import splash from '../../public/2.webp';
import { getClient } from '@/lib/data';
import dayjs from 'dayjs';
import { auth } from '@/auth';

export default async function SchedulePage({ searchParams }: { searchParams: Promise<{ planId: string }> }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const planId = (await searchParams).planId

    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    
    const client = await getClient(session.user.client.id);

    const currentPayment = client.payments.find((payment: any) =>  dayjs(payment.date).month() === dayjs().month()); // eslint-disable-line @typescript-eslint/no-explicit-any

    return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-24" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
        <Calendar plan={client.plan} selectedPlan={planId} currentPayment={currentPayment} />
    </div>
    )
}