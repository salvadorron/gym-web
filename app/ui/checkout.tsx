'use client'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { assignMembership } from '../lib/actions'
export function Checkout({ plan, clientId }: { plan: any, clientId: number }) {

    return (

            <PayPalScriptProvider options={{
                clientId: 'AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1',
                
            }} >
                <PayPalButtons className='text-white'
                    style={{ layout: 'horizontal', color: 'black', label: 'subscribe' }}
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
                            await assignMembership({ id: clientId, planId: plan.id })
                        }
                    }}
                />
            </PayPalScriptProvider>
        
    )
}