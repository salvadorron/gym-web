import Calendar from '@/components/ui/calendar';
import myImage from '../../public/1.webp';
import { getClient } from '@/lib/data';
import { auth } from '@/auth';

export default async function SchedulePage({ searchParams: { planId} }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    
    const client = await getClient(session.user.client.id);

    return (
    <div className="flex flex-col items-center justify-center shadow-[inset_0_0_0_500px_rgba(127,29,29,0.90)] min-h-screen pt-24" style={{ backgroundImage: `url(${myImage.src})`, backgroundSize: 'cover'}}>
        <Calendar plans={client.plans} selectedPlan={planId} />
    </div>
    )
}