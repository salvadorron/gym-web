import { Checkout } from "@/app/ui/checkout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getClient, getPlan } from "@/lib/data";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import splash from '../../../../public/2.webp';

export default async function CheckoutPage({ params }: { params: Promise<{id: string}> }) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const planId = (await params).id
    const plan = await getPlan(planId);
    const client = await getClient(session?.user?.client?.id);

    const isSelled = client?.plan?.id === +planId // eslint-disable-line @typescript-eslint/no-explicit-any

    if(isSelled){
        return (
            <div className=" min-h-screen " style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
                <div className="container mx-auto flex flex-col pt-24 max-w-3xl">
                    <div className="bg-[#111111c4] flex-grow grid grid-cols-1 shadow-md p-2 border pt-8 justify-items-center rounded-md min-h-[800px]">
                        <div className="flex flex-grow gap-4 p-2">
                            <Button className="h-6" asChild>
                                <Link href={'/planes'}>
                                    <ArrowLeftCircle className="w-6 h-6" />
                                </Link>
                            </Button>
                            <div className="h-full rounded-lg">
                                <h1 className="text-white">Plan {plan.name}</h1>
                                <div className="flex items-center gap-2">
                                <h2 className="font-bold text-2xl text-white">USD</h2>
                                <span className="text-gray-500 text-2xl font-bold">${plan.amount}</span>
                                <div className="flex flex-col justify-between">
                                    <p className="text-xs text-white">por</p>
                                    <p className="text-xs text-white">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                                </div>
                            </div>
                                <p className="text-white">{plan.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen" style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'cover'}}>
            <div className="container mx-auto flex flex-col pt-24 max-w-3xl ">
                <div className="bg-[#111111c4] flex flex-col gap-8 shadow-md p-2 border rounded-md min-h-[800px]">

                    <div className="flex gap-4 p-2">
                        <Button className="h-6" asChild>
                            <Link href={'/planes'}>
                                <ArrowLeftCircle className="w-6 h-6" />
                            </Link>
                        </Button>
                        <div className="h-full rounded-lg">
                            <h1 className="text-white">Suscribirse al Plan {plan.name}</h1>
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-2xl text-white">USD</h2>
                                <span className="text-gray-500 text-2xl font-bold">${plan.amount}</span>
                                <div className="flex flex-col justify-between">
                                    <p className="text-xs text-white">por</p>
                                    <p className="text-xs text-white">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                                </div>
                            </div>
                            <p className="text-white text-justify">{plan.description}</p>
                        </div>
                    </div>
                    <div className="w-full overflow-auto max-h-[680px]">
                        <Checkout plan={plan} clientId={session?.user.client.id} />
                    </div>

                </div>
            </div>
        </div>
    )
}