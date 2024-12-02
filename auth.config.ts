import { NextAuthConfig } from "next-auth";

 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPage = nextUrl.pathname !== '/auth/login' && nextUrl.pathname !== '/auth/register';
      if (isOnPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/training', nextUrl));
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