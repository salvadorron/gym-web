'use client'
import { assignPlan } from '@/lib/actions';
import { Plan } from '@/lib/definitions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { useState } from 'react';
export function Checkout({ plan, clientId, schedule }: { plan: Plan, clientId: number, schedule: any }) {


    const initialOptions = {
        clientId: "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1", // Reemplaza con tu ID de cliente real
      };



    return (

            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons className='text-white'
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
                                            amount: plan.price,
                                        },
                                    schedule
                            })
                            
                                //router.push('/entrenamiento');

                        }
                    }}
                    
                />
            </PayPalScriptProvider>
        
    )
}