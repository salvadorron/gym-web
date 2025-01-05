import { Checkout } from "@/app/ui/checkout";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getClient, getPlan } from "@/lib/data";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({ params }: { params: any }) { // eslint-disable-line @typescript-eslint/no-explicit-any

    const plan = await getPlan(params.id);
    const session = await auth() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    const client = await getClient(session?.user?.client?.id);

    const isSelled = client?.plans?.some((currentPlan: any) => currentPlan.id === plan.id) // eslint-disable-line @typescript-eslint/no-explicit-any

    if(isSelled){
        return (
            <div className="container mx-auto flex flex-col h-[800px] max-w-5xl mt-8 ">
            <div className="bg-white flex-grow grid grid-cols-1 shadow-md p-2 border rounded-md">
                
                <div className="flex flex-grow gap-4 p-2">
                    <Button className="h-6" asChild>
                        <Link href={'/membership'}>
                            <ArrowLeftCircle className="w-6 h-6" />
                        </Link>
                    </Button>
                    <div className="h-full rounded-lg border-black">
                        <h1 className="text-gray-700">Plan {plan.name}</h1>
                        <div className="flex items-center gap-1">
                            <h2 className="font-bold text-2xl">US${plan.amount}</h2>
                            <div className="flex flex-col justify-between">
                                <p className="text-xs text-gray-700">por</p>
                                <p className="text-xs text-gray-700">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{plan.description}</p>
                    </div>
                </div>
            
            </div>
        </div>
        )
    }


    return (
        <div className="container mx-auto flex flex-col h-[800px] max-w-5xl mt-8 ">
            <div className="bg-white flex-grow grid grid-cols-2 shadow-md p-2 border rounded-md">
                
                <div className="flex flex-1 gap-4 p-2 border-r-4">
                    <Button className="h-6" asChild>
                        <Link href={'/membership'}>
                            <ArrowLeftCircle className="w-6 h-6" />
                        </Link>
                    </Button>
                    <div className="h-full rounded-lg border-black">
                        <h1 className="text-gray-700">Suscribirse al Plan {plan.name}</h1>
                        <div className="flex items-center gap-1">
                            <h2 className="font-bold text-2xl">US${plan.amount}</h2>
                            <div className="flex flex-col justify-between">
                                <p className="text-xs text-gray-700">por</p>
                                <p className="text-xs text-gray-700">{plan.billing_interval === 'monthly' ? "mes" : "año"}</p>
                            </div>
                        </div>
                        <p className="text-gray-700">{plan.description}</p>
                    </div>
                </div>
                <div className="flex flex-col flex-1 bg-gray-100 items-center justify-center p-2">
                    <div className="w-full overflow-auto max-h-[680px]">
                        <Checkout plan={plan} clientId={session?.user.client.id} />
                    </div>
                </div>
            
            </div>
        </div>
    )
}