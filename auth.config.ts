import { NextAuthConfig } from "next-auth";
import { getClient } from "./lib/data";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {

    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.roleId; // Obtén el rol del usuario
      const clientId = auth?.user?.client?.id; // Obtén el clientId desde la sesión (solo para clientes)

      const isOnStartedPage = !nextUrl.pathname.startsWith('/auth');

      if (isOnStartedPage) {
        if (isLoggedIn) {
          // Redirige según el rol del usuario
          if (userRole === 'admin') {
            return true; // Permite el acceso al dashboard para administradores
          } else if (userRole === 'trainer') {
            return Response.redirect(new URL('/participantes', nextUrl));
          } else if (userRole === 'client' && clientId) {
            // Lógica específica para clientes
            const client = await getClient(clientId);
            const hasPlan = client?.plan !== null; // Verifica si el plan no es null

            if (hasPlan) {
              return Response.redirect(new URL('/entrenamiento', nextUrl));
            } else {
              return Response.redirect(new URL('/planes', nextUrl));
            }
          }
        }
        return false; // Redirige usuarios no autenticados a la página de login
      } else if (isLoggedIn) {
        // Redirige usuarios autenticados que no están en el dashboard
        if (userRole === 'admin') {
          return Response.redirect(new URL('/dashboard', nextUrl));
        } else if (userRole === 'trainer') {
          return Response.redirect(new URL('/participantes', nextUrl));
        } else if (userRole === 'client' && clientId) {
          // Lógica específica para clientes
          const client = await getClient(clientId);
          const hasPlan = client?.plan !== null; // Verifica si el plan no es null

          if (hasPlan) {
            return Response.redirect(new URL('/entrenamiento', nextUrl));
          } else {
            return Response.redirect(new URL('/planes', nextUrl));
          }
        }
      }
      return true;
    },
    jwt(props) {
      if (props.user) { // Only assign if user exists to avoid errors
        props.token.roleId = props.user.roleId; // Include roleId in the token
        Object.assign(props.token, props.user); // Assign all user properties for easier access.
      }
      return props.token;
    },
    session({ session, token }) {
      if (session?.user) { // Check if session and user exist
        Object.assign(session.user, token); // Assign all token properties to the session.user
      }
      return session;
    },
    
  },
  providers: [],
} satisfies NextAuthConfig;


function getRedirectUrl(roleId: string, user: any): string {
  switch (roleId) {
    case 'client':
      return '/entrenamiento';
    case 'trainer':
      return '/participantes';
    case 'admin':
      return '/dashboard'; // Or your admin dashboard route
    case 'superuser':
      return '/admin'; // Or your superuser dashboard route
    default:
      return '/'; // Default redirect if role is not recognized
  }
}