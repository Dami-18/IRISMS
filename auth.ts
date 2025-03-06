import NextAuth, { User } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./src/lib/zod";
import { saltAndHashPassword } from "./src/utils/password"; // to write own logic for hashing and salting, don't know this path giving error
import { getUserFromDb } from "./src/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      // Type will be determined by the database
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists, these logics are yet to be implemented
          user = await getUserFromDb(email, pwHash);

          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.");
          }

          // return user object with their profile data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
