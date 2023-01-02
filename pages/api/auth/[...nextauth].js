import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const usersCollection = client
          .db()
          .collection(process.env.mongodb_database);
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        console.log(isValid);

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
