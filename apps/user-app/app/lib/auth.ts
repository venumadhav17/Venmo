import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Phone number",
          type: "text",
          placeholder: "joe@example.com"
        },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: any) {
        // Do zod and otp validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            email: credentials?.email
          }
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id,
              email: existingUser.email
            };
          }
          return null;
        }

        try {
          const newUser = await db.user.create({
            data: {
              email: credentials?.email,
              password: hashedPassword
            }
          });
          return {
            id: newUser.id.toString(),
            email: newUser.email
          };
        } catch (e) {
          console.error(e);
        }
        return null;
      }
    })
  ]
};
