'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';



export default function Membership({ data, client }: { data: any[], client: any }) {
  // const router = useRouter();

    const [billingInterval, setBillingInterval] = useState('Monthly');

    const intervals = ['Monthly', 'Yearly'];

    return (
      <section className="bg-red-900 min-h-screen">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Precios de Membresias
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Empieza a mejorar tu salud y bienestar con nuestras membresías y al llega al siguiente nivel en tu entrenamiento. Cada membresía desbloquea características adicionales.
            </p>
            <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes('Monthly') && (
                <button
                  onClick={() => setBillingInterval('Monthly')}
                  type="button"
                  className={`${
                    billingInterval === 'Monthly'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Facturación mensual
                </button>
              )}
              {intervals.includes('Yearly') && (
                <button
                  onClick={() => setBillingInterval('Yearly')}
                  type="button"
                  className={`${
                    billingInterval === 'Yearly'
                      ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Facturación anual
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {data.map((product) => {

              const selectedBilling = billingInterval === product?.type

              if (!selectedBilling) return null;
              
              return (
                <div
                  key={product.id}
                  className={cn(
                    'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                    {
                      'border border-pink-500': true
                        ? product.name === 'subscription?.prices?.products?.name'
                        : product.name === 'Freelancer'
                    },
                    'flex-1', // This makes the flex item grow to fill the space
                    'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                    'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6 text-white">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-zinc-300">{product.description}</p>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold white">
                        {product?.rate.amount}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /{product?.type === 'Yearly' ? 'año' : 'mes'}
                      </span>
                    </p>
                    <Button
                      type="button"
                    //   loading={priceIdLoading === price.id}
                    //   onClick={() => handleStripeCheckout(price)}
                      className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                    >
                      {false ? 'Ver' : 'Suscribirse'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
