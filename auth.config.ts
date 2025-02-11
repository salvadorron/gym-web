import { NextAuthConfig } from "next-auth";
import { getClient } from "./lib/data";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {

    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const roleId = auth?.user.roleId;
      const isOnPage = !nextUrl.pathname.startsWith('/auth');
      if (isOnPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const redirectUrl = getRedirectUrl(roleId);
        return Response.redirect(new URL(redirectUrl, nextUrl));
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


function getRedirectUrl(roleId: string | undefined): string {
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