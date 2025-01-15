import NextAuth from "next-auth"
import { User as UserType } from '../lib/definitions';
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType
  }

  interface User extends UserType {}

  
}