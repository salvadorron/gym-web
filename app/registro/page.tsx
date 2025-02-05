import splash from '../../public/2.webp';

export default function RegisterPage() {
    return (
        <div className="pt-24 p-8 min-h-screen" style={{ backgroundImage: ` url(${splash.src})`, backgroundSize: 'contain', }}>
            <p className="text-white text-xl">Registrar Personal</p>
        </div>
    )
}