import { NextAuthConfig } from "next-auth";
import { getClient } from "./lib/data";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname === '/auth/login' || nextUrl.pathname === '/auth/register';

      if (!isLoggedIn && !isAuthPage) {
        return false; // Redirect unauthenticated users to login page
      }

      if (isLoggedIn && isAuthPage) {
        // Redirect logged-in users away from login/register pages
        const redirectUrl = getRedirectUrl(auth.user.roleId, auth.user);
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      if (isLoggedIn && !isAuthPage) {
        // Check plan for clients
        if (auth.user.roleId === 'client' && auth.user.client) {
          const client = await getClient(auth.user.client.id);
          if (client && client.plan === null) {
            return Response.redirect(new URL('/planes', nextUrl));
          }
        }
        return true;
      }


      return true; // Allow access to auth pages if not logged in
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
