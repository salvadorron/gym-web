import { Client, Environment, OrdersController, CheckoutPaymentIntent } from '@paypal/paypal-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const clientId  = "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1";
const clientSecret = "EFb7f2pekUjAqdldqwvKZ7oe5NpLLjnvRahdJGGfi-BS2-j1qEBf2GhTuxumY-4C9CjS-cfIVmelGqxz";

const client = new Client({
    environment: Environment.Sandbox,
    clientCredentialsAuthCredentials: {
        oAuthClientId: clientId,
        oAuthClientSecret: clientSecret
    }
})
export async function POST(req: NextRequest){

    const data = await req.json();

    const request = new OrdersController(client);

    const order = await request.ordersCreate({
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: `${data.amount}.00`,
                    },
                    description: `Plan ${data.name}`
                },
            ],
            
        },
    })

    return NextResponse.json({
        id: order.result.id
    })
}