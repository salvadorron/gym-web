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
      const isOnPage = nextUrl.pathname !== '/auth/login' && nextUrl.pathname !== '/auth/register';
      const isTrainingPage = nextUrl.pathname === '/training';
      const client = await getClient(auth.user.client.id);
      if(isTrainingPage && client.plans.length === 0){
        if(isLoggedIn){
          return false;
        }
      }
      if (isOnPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if(auth?.user?.client && client.plans.length === 0 ) return Response.redirect(new URL('/membership', nextUrl));
        return Response.redirect(new URL('/dashboard', nextUrl));
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
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;