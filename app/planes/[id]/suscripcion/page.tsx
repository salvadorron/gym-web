import { Checkout } from "@/app/ui/checkout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getClient, getPlan } from "@/lib/data";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import myImage from '../../../../public/1.webp';
import { redirect } from "next/navigation";

export default async function CheckoutPage({ params }: { params: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const plan = await getPlan(params.id);
    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const client = await getClient(session?.user?.client?.id);

    if(client.plans.length === 0) redirect('/planes');

    const isSelled = client?.plans?.some((currentPlan: any) => currentPlan.id === plan.id) // eslint-disable-line @typescript-eslint/no-explicit-any

    if(isSelled){
        return (
            <div className="shadow-[inset_0_0_0_700px_rgba(127,29,29,0.90)] min-h-screen " style={{ backgroundImage: `url(${myImage.src})`, backgroundSize: 'cover'}}>
                <div className="container mx-auto flex flex-col pt-24 max-w-3xl">
                    <div className="bg-[#141218] flex-grow grid grid-cols-1 shadow-md p-2 border pt-8 justify-items-center rounded-md min-h-[800px]">

                        <div className="flex flex-grow gap-4 p-2">
                            <Button className="h-6" asChild>
                                <Link href={'/planes'}>
                                    <ArrowLeftCircle className="w-6 h-6" />
                                </Link>
                            </Button>
                            <div className="h-full rounded-lg">
                                <h1 className="text-white">Plan {plan.name}</h1>
                                <div className="flex items-center gap-1">
                                    <h2 className="font-bold text-2xl text-white">US${plan.amount}</h2>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-xs text-yellow-700">por</p>
                                        <p className="text-xs text-yellow-700">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                                    </div>
                                </div>
                                <p className="text-yellow-700">{plan.description}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="shadow-[inset_0_0_0_700px_rgba(127,29,29,0.90)] min-h-screen" style={{ backgroundImage: `url(${myImage.src})`, backgroundSize: 'cover'}}>
            <div className="container mx-auto flex flex-col pt-24 max-w-3xl ">
                <div className="bg-[#141218] flex flex-col gap-8 shadow-md p-2 border rounded-md min-h-[800px]">

                    <div className="flex gap-4 p-2">
                        <Button className="h-6" asChild>
                            <Link href={'/planes'}>
                                <ArrowLeftCircle className="w-6 h-6" />
                            </Link>
                        </Button>
                        <div className="h-full rounded-lg">
                            <h1 className="text-white">Suscribirse al Plan {plan.name}</h1>
                            <div className="flex items-center gap-1">
                                <h2 className="font-bold text-2xl text-white">US${plan.amount}</h2>
                                <div className="flex flex-col justify-between">
                                    <p className="text-xs text-yellow-700">por</p>
                                    <p className="text-xs text-yellow-700">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                                </div>
                            </div>
                            <p className="text-yellow-700 text-justify">{plan.description}</p>
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