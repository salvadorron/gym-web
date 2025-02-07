import { ReactNode } from "react";
import routes from "../../lib/routes";
import { notFound } from "next/navigation";

export function ProtectedRouter({ children, roleId, pathname }: { children: ReactNode, roleId: string | undefined, pathname: string }) {

  const isAuthorized = routes.some((route) => {
    if(!roleId) {
      console.log('Sin Role')
      return false;
    }
    return route.path === pathname && route.roles.includes(roleId)
  });

  if(!isAuthorized) {
    return notFound();
  }


  return children

}