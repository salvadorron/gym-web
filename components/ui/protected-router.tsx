import { ReactNode } from "react";
import routes from "../../lib/routes";
import { notFound } from "next/navigation";

export function ProtectedRouter({ children, roleId, pathname }: { children: ReactNode, roleId: string | undefined, pathname: string }) {

  const accessRoutes = [...routes, 
    {
      path: '/pagos',
      roles: ['client', 'trainer', 'admin', 'superuser']
    },
    {
      path: '/perfil',
      roles: ['client', 'trainer', 'admin', 'superuser']
    }
  ]

  const isAuthorized = accessRoutes.some((route) => {
    if(!roleId) {
      return false;
    }
    return route.path === pathname && route.roles.includes(roleId)
  });

  if(!isAuthorized) {
    return notFound();
  }


  return children

}