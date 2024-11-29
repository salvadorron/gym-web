import Image from 'next/image';
import LoginForm from '../../ui/login-form';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
 
export default function LoginPage() {
  return (
    <>
      <Link
        href="/auth/register"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 text-white md:right-8 md:top-8"
        )}
      >
        Registrarse
      </Link>
    <LoginForm />
    </>
  )
}