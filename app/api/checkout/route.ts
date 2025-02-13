import { Client, Environment, OrdersController, CheckoutPaymentIntent } from '@paypal/paypal-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const clientId  = "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1";
const clientSecret = "EFb7f2pekUjAqdldqwvKZ7oe5NpLLjnvRahdJGGfi-BS2-j1qEBf2GhTuxumY-4C9CjS-cfIVmelGqxz";

const environment = process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox;

const client = new Client({
    environment: environment,
    clientCredentialsAuthCredentials: {
        oAuthClientId: clientId,
        oAuthClientSecret: clientSecret
    }
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        // 1. Manejo de decimales y conversión a string
        const amount = parseFloat(data.price.toString().replace(',', '.')).toFixed(2); // Convierte a número, reemplaza coma por punto y fija 2 decimales.

        const request = new OrdersController(client);

        const order = await request.ordersCreate({
            body: {
                intent: CheckoutPaymentIntent.Capture,
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: "USD",
                            value: amount, // Valor como string y con formato correcto
                        },
                        description: `Plan ${data.name}`
                    },
                ],
            },
        });

        return NextResponse.json({ id: order.result.id });

    } catch (error) {
        console.error("Error creating PayPal order:", error); // Log para depuración

        return new NextResponse(JSON.stringify({ error: 'Failed to create order' }), {
            status: 500, // Código de error 500 (Internal Server Error)
            headers: { 'Content-Type': 'application/json' },
        });
    }
}