import { ReactNode } from "react";
import { notFound } from "next/navigation";

export function ProtectedRouter({ children, roleId, roles }: { children: ReactNode, roleId: string | undefined, roles: string[] }) { 


  if(!roleId || !roles.includes(roleId)) {
    return notFound();
  }


  return children

}