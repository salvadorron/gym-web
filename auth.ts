import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
 

async function getUser(username: string, password: string): Promise<User | undefined> {
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
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
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
          const user = await getUser(username, password);
          if (user?.statusCode === 401) return null;
          return user;
        }
 
        console.log('Credenciales Invalidas');
        return null;
      },
    }),
  ],
});