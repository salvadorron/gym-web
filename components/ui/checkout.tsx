'use client'
import { assignPlan } from '@/lib/actions';
import { Plan } from '@/lib/definitions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { useState } from 'react';
export function Checkout({ plan, clientId, selectedDays, selectedTurn }: { plan: Plan, clientId: number, selectedDays: number[], selectedTurn: string }) {


    const initialOptions = {
        clientId: "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1", // Reemplaza con tu ID de cliente real
        currency: "USD", // Cambia a la moneda que necesites
        intent: "capture", // O "authorize" según tus requerimientos
      };
    
      const [orderId, setOrderId] = useState(null);
    
    const handleClick = async () => {
        try {
            const response = await fetch('/api/checkout', { // Crea una ruta en tu backend para crear la orden
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(JSON.stringify(plan)),
            });
      
            const data = await response.json();
            setOrderId(data.id); // Guarda el ID de la orden
      
            // Redirige al usuario a la página de pago de PayPal
            window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
          } catch (error) {
            console.error("Error al crear la orden:", error);
            // Maneja el error, por ejemplo, mostrando un mensaje al usuario
          }
    }


    return (

            <PayPalScriptProvider options={initialOptions}>
                <Button onClick={handleClick}>Comprar</Button>
                {/* <PayPalButtons className='text-white'
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
                    
                /> */}
            </PayPalScriptProvider>
        
    )
}