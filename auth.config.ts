import { NextAuthConfig } from "next-auth";
import { getClient } from "./lib/data";

 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: { auth: any, request: any }) {

      
      const isLoggedIn = !!auth?.user;


      const isOtherPage = nextUrl.pathname !== '/auth/login' && nextUrl.pathname !== '/auth/register';
      
      
      if (isOtherPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      else if (isLoggedIn) {
        const client = await getClient(auth?.user?.client?.id);
        if(auth?.user?.client && client.plans.length === 0 ) return Response.redirect(new URL('/planes', nextUrl));
        return Response.redirect(new URL('/entrenamiento', nextUrl));
      }

      return true;



    },
    jwt(props) {
      Object.assign(props.token, props.user);
      return props.token;
    },
    session({ session, token }) {
      Object.assign(session.user, token);
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;