import { DumbbellIcon } from 'lucide-react';
import myImage from '../../public/1.webp';
export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-screen md:p-2 flex shadow-[inset_0_0_0_500px_rgba(127,29,29,0.65)]" style={{ backgroundImage: `url(${myImage.src})`, backgroundSize: 'cover'}}>
          <div className="hidden md:flex md:flex-1 items-end">
            <blockquote className="space-y-2">
              <p className="text-lg text-white">
                &ldquo;Si quieres alcanzar la excelencia en las cosas grandes, debes desarrollar el hábito en las cosas pequeñas.
                La excelencia no es una excepción, es una actitud que prevalece&rdquo;
              </p>
              <footer className="text-sm text-white">Charles R. Swindoll, político y fundador de Insight for Living</footer>
            </blockquote>
          </div>
          <div className="p-8 bg-[linear-gradient(171deg,#121212,#181818)] md:rounded-md shadow flex-grow md:flex-grow-0 flex flex-col items-center pt-48">
            {children}
          </div>
      </div>
    )

}


