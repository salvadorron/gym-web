import { Client, Environment, OrdersController } from '@paypal/paypal-server-sdk'
import { NextResponse } from 'next/server';

const clientId  = "AXzR3wNQfyW6kwOouGKu72YM93siSXCO2QSA_nD3l05tTNj-SAXnjvb5CyQjNbzTUtzjFUaX94Q5qhA1";
const clientSecret = "EFb7f2pekUjAqdldqwvKZ7oe5NpLLjnvRahdJGGfi-BS2-j1qEBf2GhTuxumY-4C9CjS-cfIVmelGqxz";

const client = new Client({
    environment: Environment.Sandbox,
    clientCredentialsAuthCredentials: {
        oAuthClientId: clientId,
        oAuthClientSecret: clientSecret
    }
})

export async function POST(request: Request) {
    try{
        const { orderID } = await request.json();
        const requestPaypal = new OrdersController(client);

        console.log(orderID);
        const response = await requestPaypal.ordersCapture({
            id: orderID
        });
        


        console.log(response)

        return NextResponse.json(response.result);

    } catch(err){
        console.log('Error al capturar la orden: ', err);
        return NextResponse.json(
            {error: 'Error al capturar la orden', status: 500}
        )
    
    }
}