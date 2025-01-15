import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { User } from './lib/definitions';
 

async function getUser(username: string, password: string): Promise<User | null> {
  try {
    const user = await fetch('https://gym-service.vercel.app/api/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ username, password }),
    });
    const userData = await user.json() as User;
    return userData;
  } catch (error) {
    console.log(error)
    return null;
  }
}
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

          console.log(parsedCredentials.data);
 
        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
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