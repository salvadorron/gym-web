'use client'
import { assignPlan } from '@/lib/actions';
import { Plan } from '@/lib/definitions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation';
export function Checkout({ plan, clientId, selectedDays, selectedTurn }: { plan: Plan, clientId: number, selectedDays: number[], selectedTurn: string }) {


    const router = useRouter();


    const isAllNoneSelected = selectedDays.every(day => day === 0)
    

    return (

            <PayPalScriptProvider options={{
                clientId: 'AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1',
                
            }} >
                <PayPalButtons className='text-white'
                    disabled={ isAllNoneSelected || selectedTurn.length === 0}
                    message={{ position: 'bottom' }}
                    style={{ layout: 'horizontal', color: 'black', label: 'subscribe', disableMaxWidth: true }}
                    createOrder={async () => {
                        const res = await fetch('/api/checkout', {
                            method: 'POST',
                            body: JSON.stringify(plan),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        const data = await res.json()

                        return data.id;
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order?.capture()
                        if(order?.status === 'COMPLETED') {

                                console.log({
                                    id: clientId, 
                                    planId: plan.id, 
                                    payment: {
                                            method: 'Paypal',
                                            description: 'Paypal Subscription',
                                            amount: plan.amount,
                                        },
                                    days: selectedDays,
                                    turn: selectedTurn,
                            })
                            
                                //router.push('/entrenamiento');

                        }
                    }}
                    
                />
            </PayPalScriptProvider>
        
    )
}