'use client'
import { assignPlan } from '@/lib/actions';
import { Plan, SuscriptionSchedule } from '@/lib/definitions';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation';

export function Checkout({ plan, clientId, schedule, completed }: { plan: Plan, clientId: number, completed: boolean, schedule: SuscriptionSchedule[] }) {


    const router = useRouter();

    const initialOptions = {
        clientId: "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1", // Reemplaza con tu ID de cliente real
      };
      
     return completed && <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
        message={{ position: 'bottom' }}
        style={{ layout: 'vertical', color: 'black', label: 'subscribe' }}
        createOrder={async () => {
            try {
                const res = await fetch('/api/checkout', {
                    method: 'POST',
                    body: JSON.stringify(plan),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) { // Verifica si la respuesta es exitosa
                    const errorData = await res.json(); // Intenta obtener el error del servidor
                    throw new Error(errorData.error || 'Failed to create order'); // Lanza el error
                }

                const data = await res.json();
                return data.id;

            } catch (error) {
                console.error("Error creating order:", error);
                // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
                alert("Error al crear la orden. Por favor, inténtalo de nuevo.");
                return null; // Importante: retorna null para indicar que la creación del pedido falló
            }
        }}
        onApprove={async (data, actions) => {
            try {
                const order = await actions.order?.capture();

                if (order?.status === 'COMPLETED') {
                  await assignPlan({
                        id: clientId, // Usa el id del order, no el clientId
                        planId: plan.id,
                        payment: {
                            method: 'Paypal',
                            description: 'Paypal Subscription',
                            amount: plan.price,
                            startDate: new Date(),
                            endDate: getDuration(plan.duration),
                            status: "active"
                        },
                        schedule // Si `schedule` está definido, inclúyelo
                    });

                    // Redirige al usuario DESPUÉS de completar el pago y registrar la información en tu backend.
                    router.push('/entrenamiento'); // Usa el router para la redirección

                } else {
                  console.error("Order not completed:", order);
                  alert("El pago no se ha completado. Por favor, inténtalo de nuevo.");
                }

            } catch (error) {
                console.error("Error capturing order:", error);
                alert("Error al capturar el pago. Por favor, inténtalo de nuevo.");
            }
        }}
    />
</PayPalScriptProvider>
        
    
}

function getDuration (type: "YEARLY" | "MONTHLY" = "MONTHLY"): Date {
    const dateValue = new Date()

    if(type === "MONTHLY") {
        dateValue.setMonth(dateValue.getMonth() + 1)
    }
    else {
        dateValue.setFullYear(dateValue.getFullYear() + 1)
    }

    return dateValue;
}