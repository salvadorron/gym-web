import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { getUser } from './lib/data';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 'login-username': z.string(), 'login-password': z.string().min(6) })
          .safeParse(credentials);
          console.log(parsedCredentials.data);

          console.log(parsedCredentials.error);
 
        if (parsedCredentials.success) {
          
          const { ['login-username']: username, ['login-password']: password } = parsedCredentials.data;
          
          const user = await getUser(username, password)
          
          if(!user) return null;
          
          return {
            ...user,
            id: user.id.toString()
          }
        }
 
        console.log('Credenciales Invalidas');
        return null;
      },
    }),
  ],
});