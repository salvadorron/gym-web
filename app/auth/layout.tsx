import { DumbbellIcon } from 'lucide-react';
import myImage from '../../public/1.webp';
export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="container relative grid grid-cols-1  min-h-screen flex-col items-center justify-center bg-zinc-900 max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white  dark:border-r lg:flex">
          <div className="absolute inset-0 bg-cover shadow-[inset_0_0_0_500px_rgba(127,29,29,0.64)]" style={{backgroundImage: `url(${myImage.src})`}} />
            <div className="relative z-20 flex items-center text-lg font-medium ">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg> */}
              <DumbbellIcon className="h-6 w-6 mr-2" />
              Salud y Bienestar
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;Si quieres alcanzar la excelencia en las cosas grandes, debes desarrollar el hábito en las cosas pequeñas. 
                  La excelencia no es una excepción, es una actitud que prevalece&rdquo;
                </p>
                <footer className="text-sm">Charles R. Swindoll, político y fundador de Insight for Living</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            {children}
          </div>
      </div>
    )

}