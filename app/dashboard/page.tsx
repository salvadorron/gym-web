import Dashboard from '@/components/ui/dashboard';
import splash from '../../public/2.webp';

export default function DashboardPage() {
  return <div className="min-h-screen p-4 " style={{ backgroundImage: `url(${splash.src})`, backgroundSize: 'contain'}}>
    <Dashboard />
    </div>
}

