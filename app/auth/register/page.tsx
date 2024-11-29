import RegisterForm from "@/app/ui/register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function RegisterPage() {
    return (<>
        <Link
          href="/auth/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 text-white md:right-8 md:top-8"
          )}
        >
          Iniciar Session
        </Link>
        <RegisterForm />
    </>)
}