import { NextAuthConfig } from "next-auth";
import { getClient } from "./lib/data";
import { NextResponse } from "next/server";
import { User } from "./lib/definitions";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {

    

    async authorized({ auth, request: { nextUrl } }) {

      const isLoggedIn = !!auth?.user;
      const isOnPage = !nextUrl.pathname.startsWith('/auth');
      if (isOnPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        const redirectUrl = getRedirectUrl(auth.user);
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }
      return true;
    },
    jwt(props) {
      if (props.user) { // Only assign if user exists to avoid errors
        props.token.roleId = props.user.roleId; // Include roleId in the token
        Object.assign(props.token, props.user); // Assign all user properties for easier access.
      }

      if(props.trigger === 'update') {
        console.log(props)
        Object.assign(props.token, {
          ...props.token,
          ...props.session.user
        });
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


function getRedirectUrl(user: User): string {
  const roleId = user.roleId;
  switch (roleId) {
    case 'client':
      return user.client?.plan ? '/entrenamiento' : '/planes';
    case 'trainer':
      return '/participantes';
    case 'admin':
      return '/miembros'; // Or your admin dashboard route
    case 'superuser':
      return '/admin'; // Or your superuser dashboard route
    default:
      return '/'; // Default redirect if role is not recognized
  }
}