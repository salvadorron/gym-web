'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import splash from '../../public/2.webp';
import { useState } from 'react';
import { Client, Plan } from '@/lib/definitions';


export default function Membership({ data, client }: { data: Plan[], client: Client }) {

    const [billingInterval, setBillingInterval] = useState('MONTHLY');

    const intervals = ['MONTHLY', 'YEARLY'];

    const sortingData = data.sort((a, b) => a.price - b.price);

    return (
      <section className="flex flex-col items-center justify-center min-h-screen pt-8" style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8  ">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Membresias de Entrenamiento
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-gray-300 sm:text-center sm:text-2xl">
            Empieza a mejorar tu salud y bienestar con nuestros planes y al llega al siguiente nivel en tu entrenamiento. Cada plan desbloquea características adicionales.
            </p>
            <div className="relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes('MONTHLY') && (
                <button
                  onClick={() => setBillingInterval('MONTHLY')}
                  type="button"
                  className={`${
                    billingInterval === 'MONTHLY'
                      ? 'relative w-1/2 bg-gray-800 border-gray-700 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-gray-300'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:blue-blue-400 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Facturación mensual
                </button>
              )}
              {intervals.includes('YEARLY') && (
                <button
                  onClick={() => setBillingInterval('YEARLY')}
                  type="button"
                  className={`${
                    billingInterval === 'YEARLY'
                      ? 'relative w-1/2 bg-gray-800 border-gray-700 shadow-sm text-white'
                      : 'ml-0.5 relative w-1/2 border border-transparent text-gray-300'
                  } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Facturación anual
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {sortingData.map((product) => {

              const selectedBilling = billingInterval === product?.duration

              if (!selectedBilling) return null;
              
              return (
                <div
                  key={product.id}
                  className={cn(
                    'flex flex-col shadow-sm divide-y divide-zinc-600 rounded-xl border border-gray-700 bg-gray-800 ',
                    'flex-1', // This makes the flex item grow to fill the space
                    'basis-1/5', // Assuming you want each card to take up roughly a third of the container's width
                    'max-w-md' // Sets a maximum width to the cards to prevent them from getting too large
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6 text-white">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-gray-300 min-h-40 text-justify">{product.features}</p>
                    <p className="mt-8">
                      <span className="text-5xl text-white font-extrabold">
                        {product?.price}
                      </span>
                      <span className="text-base font-medium text-gray-300">
                        /{billingInterval === 'YEARLY' ? 'año' : 'mes'}
                      </span>
                    </p>
                    {client.plan?.id === product.id ? ( 
                      <Button
                      type="button"
                      className="block w-full mt-8 text-sm font-semibold text-center bg-blue-900/50 hover:bg-blue-500/50  text-white rounded-md "
                      asChild
                    >
                      <Link href={`/entrenamiento`}>
                        Ver
                      </Link>
                    </Button>
                    ) : (
                    <Button
                      type="submit"
                      className="block w-full mt-8 text-sm font-semibold text-center  bg-blue-900/50 hover:bg-blue-500/50 text-white rounded-md"
                      asChild
                    >
                      <Link href={`/planes/${product.id}/suscripcion/`}>
                        Suscribirse
                      </Link>
                    </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
