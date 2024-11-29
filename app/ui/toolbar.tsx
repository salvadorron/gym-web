import { Button } from "@/components/ui/button";

export default function Toolbar() {
    return (
        <div className="inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900 sm:px-6 lg:px-8">
            
            <div className="flex items-center space-x-3">
                {/* <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                </button> */}
                {/* <Button>Registrar</Button> */}
                <Button>Membresias</Button>
                <Button>Entrenamiento</Button>
                <Button>Horario</Button>
                <Button>Perfil</Button>
            </div>
        </div>
    )
}